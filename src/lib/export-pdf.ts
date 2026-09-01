/**
 * Reliable PDF export via the browser's native print engine.
 *
 * Why not html2canvas + jsPDF?
 *   That approach rasterizes the page into JPEGs and stitches them into a PDF.
 *   It frequently produces visual issues: blurry text, shifted layouts, broken
 *   gradients/shadows, missing webfonts, and unsupported CSS color functions.
 *
 * What this does instead:
 *   1. Builds a self-contained HTML document containing the cloned CV markup
 *      plus every stylesheet currently applied in the app (Tailwind, fonts,
 *      design tokens, the print stylesheet).
 *   2. Loads it inside a hidden same-origin iframe.
 *   3. Calls the iframe's `window.print()`. The user picks "Save as PDF" in
 *      the native dialog and gets crisp vector text, real selectable content,
 *      and pixel-accurate colors — exactly matching the on-screen design's
 *      `@media print` rules.
 *
 * The `filename` is set as the iframe document title so most browsers use it
 * as the default "Save as PDF" filename.
 */
export async function exportElementToPDF(
  element: HTMLElement,
  filename: string,
): Promise<void> {
  // Strip the .pdf extension for the document title — browsers append it.
  const docTitle = filename.replace(/\.pdf$/i, "");

  // Inline readable CSS rules instead of relying only on <link>/<style> tags.
  // This keeps export styling stable in the print iframe, including Vite/Tailwind
  // injected styles that can otherwise fail to resolve before printing.
  const styleTags = collectDocumentStyles();

  // Clone the element so we don't disturb the live DOM.
  const clone = element.cloneNode(true) as HTMLElement;

  // Carry the CV's theme onto the print document's <html> so the themed
  // background propagates across the whole sheet — including the `@page`
  // margin area, which the root element's background paints in print.
  const themeAttr = element.getAttribute("data-theme");

  // Remove any elements explicitly hidden in print — they shouldn't take up
  // space or affect layout in the print document either.
  clone.querySelectorAll(".print\\:hidden, [data-print-hide]").forEach((n) => n.remove());

  const html = `<!DOCTYPE html>
<html lang="en"${themeAttr ? ` data-theme="${escapeHtml(themeAttr)}"` : ""}>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(docTitle)}</title>
${styleTags}
<style>
  /* Force the print stylesheet on screen too — the iframe never enters a
     real "print" media state until window.print() is called, but we want
     the layout to settle before then. */
  html, body {
    margin: 0;
    padding: 0;
    /* Themed (via the <html> data-theme) so the whole sheet — including the
       @page margin area — carries the CV's background color, not white. */
    background: hsl(var(--background));
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  /* Hide anything tagged for screen-only inside the cloned tree. */
  .print\\:hidden { display: none !important; }
</style>
</head>
<body>
${clone.outerHTML}
</body>
</html>`;

  // Create a hidden iframe to host the print document.
  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.position = "fixed";
  iframe.style.left = "-10000px";
  iframe.style.top = "0";
  iframe.style.width = "794px";
  iframe.style.height = "1123px";
  iframe.style.border = "0";
  iframe.style.opacity = "0";
  iframe.style.pointerEvents = "none";
  document.body.appendChild(iframe);

  try {
    const doc = iframe.contentDocument;
    if (!doc) throw new Error("Could not access print iframe document");

    doc.open();
    doc.write(html);
    doc.close();

    // Wait for the iframe to finish loading its resources (fonts, etc.).
    await new Promise<void>((resolve) => {
      if (iframe.contentDocument?.readyState === "complete") {
        resolve();
      } else {
        iframe.addEventListener("load", () => resolve(), { once: true });
      }
    });

    await waitForStylesheets(doc);

    // Wait for webfonts inside the iframe to be ready so text isn't laid out
    // with fallback metrics and then re-flowed mid-print.
    const iframeDoc = iframe.contentDocument!;
    const iframeFonts = (iframeDoc as Document & { fonts?: FontFaceSet }).fonts;
    if (iframeFonts?.ready) {
      try {
        await iframeFonts.ready;
      } catch {
        // Non-fatal — proceed even if the fonts API rejects.
      }
    }

    // Give layout one more frame to settle after fonts load.
    await new Promise((r) => requestAnimationFrame(() => r(null)));

    // Trigger the native print dialog. The user chooses "Save as PDF".
    const win = iframe.contentWindow;
    if (!win) throw new Error("Could not access print iframe window");
    win.focus();
    win.print();

    // Give the browser a moment to spawn the print dialog before we tear
    // down the iframe — removing it too early can cancel the print job in
    // some browsers.
    await new Promise((r) => setTimeout(r, 1000));
  } finally {
    iframe.remove();
  }
}

function collectDocumentStyles(): string {
  const css: string[] = [];
  const fallbacks: string[] = [];

  Array.from(document.styleSheets).forEach((sheet) => {
    try {
      const rules = Array.from(sheet.cssRules)
        .map((rule) => rule.cssText)
        .join("\n");
      if (rules) css.push(rules);
    } catch {
      const owner = sheet.ownerNode as HTMLElement | null;
      if (owner?.outerHTML) fallbacks.push(owner.outerHTML);
    }
  });

  return `${fallbacks.join("\n")}\n<style>${css.join("\n")}</style>`;
}

async function waitForStylesheets(doc: Document): Promise<void> {
  const links = Array.from(doc.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'));
  await Promise.all(
    links.map(
      (link) =>
        new Promise<void>((resolve) => {
          if (link.sheet) {
            resolve();
            return;
          }
          link.addEventListener("load", () => resolve(), { once: true });
          link.addEventListener("error", () => resolve(), { once: true });
        }),
    ),
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
