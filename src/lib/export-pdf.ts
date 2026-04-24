import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

// A4 in mm
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

/**
 * Render an element to a multi-page A4 PDF using html2canvas + jsPDF.
 *
 * Strategy:
 * - Force the element to a fixed pixel width matching A4 at our chosen DPI
 *   so layout in the canvas matches what we expect on the printed page.
 * - Render to a single tall canvas at scale=2 for crisp output.
 * - Slice the canvas into A4-sized page-height chunks and place each on a
 *   new PDF page. This avoids text being cut horizontally and produces
 *   a real multi-page PDF instead of a giant single-page image.
 */
export async function exportElementToPDF(
  element: HTMLElement,
  filename: string,
): Promise<void> {
  // Render at 96 DPI base; html2canvas scale=2 doubles physical resolution.
  // 794 px ≈ 210mm at 96 DPI.
  const RENDER_WIDTH_PX = 794;
  const SCALE = 2;

  // Clone to avoid mutating the live DOM (e.g. forced width breaking the UI).
  const clone = element.cloneNode(true) as HTMLElement;

  // Off-screen container with a fixed A4-equivalent width.
  const wrapper = document.createElement("div");
  wrapper.style.position = "fixed";
  wrapper.style.left = "-100000px";
  wrapper.style.top = "0";
  wrapper.style.width = `${RENDER_WIDTH_PX}px`;
  wrapper.style.background = getComputedStyle(document.body).backgroundColor || "#ffffff";
  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  // Force the cloned root to the target width so flex/grid layout reflows
  // to a predictable A4-friendly size.
  clone.style.width = `${RENDER_WIDTH_PX}px`;
  clone.style.maxWidth = "none";

  try {
    // Wait a frame so fonts/layout settle.
    await new Promise((r) => requestAnimationFrame(() => r(null)));
    if (document.fonts && (document.fonts as FontFaceSet).ready) {
      try {
        await (document.fonts as FontFaceSet).ready;
      } catch {
        // ignore — proceed even if fonts API is unavailable.
      }
    }

    const canvas = await html2canvas(clone, {
      scale: SCALE,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: RENDER_WIDTH_PX,
    });

    const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });

    // Pixel-per-mm of the rendered canvas.
    const pxPerMm = canvas.width / A4_WIDTH_MM;
    const pageHeightPx = Math.floor(A4_HEIGHT_MM * pxPerMm);

    let renderedHeightPx = 0;
    let pageIndex = 0;

    while (renderedHeightPx < canvas.height) {
      const sliceHeight = Math.min(pageHeightPx, canvas.height - renderedHeightPx);

      // Create a per-page canvas to avoid huge images on each page.
      const pageCanvas = document.createElement("canvas");
      pageCanvas.width = canvas.width;
      pageCanvas.height = sliceHeight;
      const ctx = pageCanvas.getContext("2d");
      if (!ctx) throw new Error("Could not get 2D context for PDF page slice");

      // White background so transparent areas don't render as black in PDF.
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
      ctx.drawImage(
        canvas,
        0, renderedHeightPx,
        canvas.width, sliceHeight,
        0, 0,
        canvas.width, sliceHeight,
      );

      const imgData = pageCanvas.toDataURL("image/jpeg", 0.95);
      const pageHeightMm = sliceHeight / pxPerMm;

      if (pageIndex > 0) pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, 0, A4_WIDTH_MM, pageHeightMm, undefined, "FAST");

      renderedHeightPx += sliceHeight;
      pageIndex += 1;
    }

    pdf.save(filename);
  } finally {
    document.body.removeChild(wrapper);
  }
}
