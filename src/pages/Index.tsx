import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Link, useSearchParams } from "react-router-dom";
import { EditableCVPreview } from "@/components/cv/editor/EditableCVPreview";
import { CVPreview } from "@/components/cv/CVPreview";
import { LanguageSwitcher } from "@/components/cv/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/cv/ThemeSwitcher";
import { useCVData } from "@/lib/use-cv-data";
import { Button } from "@/components/ui/button";
import { AppTopbar } from "@/components/layout/AppTopbar";
import { BrandLogo } from "@/components/layout/BrandLogo";
import {
  Download, Loader2, Languages, Upload, FileJson, MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { exportElementToPDF } from "@/lib/export-pdf";
import { toast as sonnerToast } from "sonner";
import { toast as uiToast } from "@/hooks/use-toast";
import { CVData, defaultLabels, DEFAULT_CARD_COLUMNS, DEFAULT_SKILL_COLUMNS, type CardColumnsMap, type SkillColumnsMap } from "@/lib/cv-types";
import { DEFAULT_SECTION_DESIGNS } from "@/lib/section-designs";
import { THEME_IDS, type ThemeId } from "@/lib/themes";
import { APP_NAME, APP_TITLE, APP_DESCRIPTION } from "@/lib/app";

const safeFileName = (name: string, fallback = "CV") =>
  (name?.trim() || fallback).replace(/[^a-z0-9-_ ]/gi, "").trim() || fallback;

const Index = () => {
  const {
    data, setData,
    languages, activeId, setActiveId,
    addLanguage, renameLanguage, deleteLanguage,
    theme, setTheme,
  } = useCVData();
  const [exporting, setExporting] = useState(false);
  const importInput = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Apply theme from ?theme= query (e.g. /resume-builder?theme=ocean from Themes "Try" buttons)
  useEffect(() => {
    const param = searchParams.get("theme");
    if (param && (THEME_IDS as readonly string[]).includes(param)) {
      setTheme(param as ThemeId);
      const next = new URLSearchParams(searchParams);
      next.delete("theme");
      setSearchParams(next, { replace: true });
    }
  }, [searchParams, setSearchParams, setTheme]);

  useEffect(() => {
    document.title = APP_TITLE;
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        const [key, val] = attr.split("=");
        el.setAttribute(key, val.replace(/"/g, ""));
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };
    setMeta('meta[name="description"]', 'name="description"', APP_DESCRIPTION);
    setMeta('meta[name="author"]', 'name="author"', APP_NAME);
    setMeta('meta[property="og:title"]', 'property="og:title"', APP_TITLE);
    setMeta('meta[property="og:description"]', 'property="og:description"', APP_DESCRIPTION);
  }, []);

  // Render a clean CVData snapshot into an off-screen DOM node, hand the CV
  // root to `fn` (which must trigger the native print dialog), then unmount.
  // Both Print and Download PDF go through this fixed-width pipeline so the
  // editor's live viewport width never reflows the grid or flex items.
  const runCVPrintFlow = async (langData: CVData, themeId: ThemeId, fn: (cvRoot: HTMLElement) => Promise<void>) => {
    const host = document.createElement("div");
    host.style.position = "fixed";
    host.style.left = "-10000px";
    host.style.top = "0";
    host.style.width = "1024px";
    host.style.pointerEvents = "none";
    host.setAttribute("aria-hidden", "true");
    document.body.appendChild(host);

    const root = createRoot(host);
    try {
      await new Promise<void>((resolve) => {
        root.render(<CVPreview data={langData} theme={themeId} />);
        // Wait two frames so layout settles before snapshotting.
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      });
      // Export the rendered CV root, NOT the off-screen host container — its
      // inline `left: -10000px` positioning would push the whole CV off the
      // print page and produce a blank PDF.
      const cvRoot = host.firstElementChild as HTMLElement | null;
      if (!cvRoot) throw new Error("CV failed to render off-screen");
      await fn(cvRoot);
    } finally {
      root.unmount();
      host.remove();
    }
  };

  const printCV = async (langData: CVData, fileName: string, themeId: ThemeId) => {
    await runCVPrintFlow(langData, themeId, (cvRoot) => exportElementToPDF(cvRoot, fileName));
  };

  const handleDownloadPDF = async () => {
    if (exporting) return;
    setExporting(true);
    const safeName = safeFileName(data.name);
    try {
      await printCV(data, `${safeName} - CV.pdf`, theme);
      sonnerToast.success('Print dialog opened — pick "Save as PDF" (or a printer)');
    } catch (err) {
      console.error("PDF export failed", err);
      sonnerToast.error("Couldn't open the print dialog. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  const exportLanguage = async (langData: CVData, langName: string) => {
    const name = safeFileName(langData.name);
    const lang = safeFileName(langName, "lang");
    await printCV(langData, `${name} - CV (${lang}).pdf`, theme);
  };

  const handleDownloadAllPDFs = async () => {
    if (exporting) return;
    setExporting(true);
    try {
      for (const lang of languages) {
        await exportLanguage(lang.data, lang.name);
        // Small delay so the print dialog doesn't get stomped by the next call.
        await new Promise((r) => setTimeout(r, 400));
      }
      sonnerToast.success(`Generated ${languages.length} PDF${languages.length > 1 ? "s" : ""}. Save each in the print dialog.`);
    } catch (err) {
      console.error("Bulk PDF export failed", err);
      sonnerToast.error("Bulk PDF export failed. Try downloading languages one by one.");
    } finally {
      setExporting(false);
    }
  };

  const exportJSON = () => {
    // Include the global color theme alongside the CV data so an import can
    // restore the full look. Older files without `theme` still import fine.
    const blob = new Blob([JSON.stringify({ ...data, theme }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${safeFileName(data.name)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    uiToast({ title: "Exported", description: "Your CV data was downloaded." });
  };

  const importJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as Partial<CVData> & { theme?: string };
        // `theme` is stored globally (not on CVData), so pull it out and apply
        // it separately when the file carries a valid one.
        const { theme: importedTheme, ...cvParsed } = parsed;
        if (importedTheme && (THEME_IDS as readonly string[]).includes(importedTheme)) {
          setTheme(importedTheme as ThemeId);
        }
        setData((prev) => ({
          ...prev,
          ...cvParsed,
          labels: { ...defaultLabels, ...(cvParsed.labels ?? {}) },
          sectionDesigns: {
            ...DEFAULT_SECTION_DESIGNS,
            ...prev.sectionDesigns,
            ...(cvParsed.sectionDesigns ?? {}),
          },
          cardColumns: {
            ...DEFAULT_CARD_COLUMNS,
            ...prev.cardColumns,
            ...(cvParsed.cardColumns as Partial<CardColumnsMap> | undefined),
          },
          skillColumns: {
            ...DEFAULT_SKILL_COLUMNS,
            ...prev.skillColumns,
            ...(cvParsed.skillColumns as Partial<SkillColumnsMap> | undefined),
          },
        }));
        uiToast({ title: "Imported", description: "CV data loaded successfully." });
      } catch {
        uiToast({ title: "Import failed", description: "That file isn't a valid CV backup.", variant: "destructive" });
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background print:block print:h-auto">
      <AppTopbar
        className="print:hidden"
        left={
          <>
            <BrandLogo title="Back to homepage" nameClass="hidden lg:inline" />
            <div className="hidden h-6 w-px bg-border sm:block" />
            <Link
              to="/themes"
              className="hidden font-mono text-xs tracking-wide text-muted-foreground underline-offset-4 hover:text-foreground hover:underline sm:inline"
              title="Browse themes"
            >
              Themes
            </Link>
            <div className="flex items-center gap-1.5">
              <LanguageSwitcher
                languages={languages}
                activeId={activeId}
                setActiveId={setActiveId}
                addLanguage={addLanguage}
                renameLanguage={renameLanguage}
                deleteLanguage={deleteLanguage}
              />
              <ThemeSwitcher theme={theme} setTheme={setTheme} />
            </div>
          </>
        }
        center={
          <span className="hidden min-w-0 max-w-[32ch] truncate text-sm font-medium text-foreground lg:block" title={`${data.name} — ${data.role}`}>
            {data.name} — {data.role || "Resume"}
          </span>
        }
        right={
          <div className="flex items-center gap-1.5">
            {/* Secondary actions, tucked into an overflow menu to keep the bar calm */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="ghost" className="gap-1.5" aria-label="More actions">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="hidden text-xs font-medium sm:inline">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="text-xs text-muted-foreground">Back up your CV</DropdownMenuLabel>
                <DropdownMenuItem onClick={exportJSON}>
                  <FileJson className="mr-2 h-4 w-4" />
                  Export data
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => importInput.current?.click()}>
                  <Upload className="mr-2 h-4 w-4" />
                  Import data
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Primary action */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="gap-2" disabled={exporting}>
                  {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                  {exporting ? (
                    <span className="text-xs font-medium">Generating…</span>
                  ) : (
                    <span className="text-xs font-medium">
                      <span className="hidden sm:inline">Download </span>PDF
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={handleDownloadPDF} disabled={exporting}>
                  <Download className="mr-2 h-4 w-4" />
                  Current language
                </DropdownMenuItem>
                {languages.length > 1 && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-xs text-muted-foreground">All languages</DropdownMenuLabel>
                    <DropdownMenuItem onClick={handleDownloadAllPDFs} disabled={exporting}>
                      <Languages className="mr-2 h-4 w-4" />
                      Download all ({languages.length})
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <input
              ref={importInput}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={importJSON}
            />
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto bg-muted/20 print:bg-background print:overflow-visible">
        <div className="page-container py-6 print:px-0 print:py-0 sm:py-8">
          <EditableCVPreview data={data} setData={setData} theme={theme} />
        </div>
      </div>
    </div>
  );
};

export default Index;