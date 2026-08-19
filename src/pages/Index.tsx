import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Link } from "react-router-dom";
import { EditableCVPreview } from "@/components/cv/editor/EditableCVPreview";
import { CVPreview } from "@/components/cv/CVPreview";
import { LanguageSwitcher } from "@/components/cv/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/cv/ThemeSwitcher";
import { useCVData } from "@/lib/use-cv-data";
import { Button } from "@/components/ui/button";
import {
  Printer, Download, Loader2, Languages, Palette, Upload, FileJson,
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { exportElementToPDF } from "@/lib/export-pdf";
import { toast as sonnerToast } from "sonner";
import { toast as uiToast } from "@/hooks/use-toast";
import { CVData, defaultLabels } from "@/lib/cv-types";
import { DEFAULT_SECTION_DESIGNS } from "@/lib/section-designs";
import { type ThemeId } from "@/lib/themes";

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

  useEffect(() => {
    const name = data.name?.trim() || "CV";
    const role = data.role?.trim();
    const title = role ? `${name} — ${role} CV` : `${name} — CV`;
    document.title = title;

    const desc = `CV of ${name}${role ? `, ${role.toLowerCase()}` : ""}. Skills, experience, projects, and education.`;
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
    setMeta('meta[name="description"]', 'name="description"', desc);
    setMeta('meta[name="author"]', 'name="author"', name);
    setMeta('meta[property="og:title"]', 'property="og:title"', title);
    setMeta('meta[property="og:description"]', 'property="og:description"', desc);
  }, [data.name, data.role]);

  const handlePrint = () => window.print();

  // Render a clean CVData snapshot into an off-screen DOM node, export it, then unmount.
  const exportCVOffscreen = async (langData: CVData, fileName: string, themeId: ThemeId) => {
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
      await exportElementToPDF(cvRoot, fileName);
    } finally {
      root.unmount();
      host.remove();
    }
  };

  const handleDownloadPDF = async () => {
    if (exporting) return;
    setExporting(true);
    const safeName = safeFileName(data.name);
    try {
      await exportCVOffscreen(data, `${safeName} - CV.pdf`, theme);
      sonnerToast.success('Choose "Save as PDF" in the print dialog');
    } catch (err) {
      console.error("PDF export failed", err);
      sonnerToast.error("PDF export failed. Try the Print option as a fallback.");
    } finally {
      setExporting(false);
    }
  };

  const exportLanguage = async (langData: CVData, langName: string) => {
    const name = safeFileName(langData.name);
    const lang = safeFileName(langName, "lang");
    await exportCVOffscreen(langData, `${name} - CV (${lang}).pdf`, theme);
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
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
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
        const parsed = JSON.parse(String(reader.result)) as Partial<CVData>;
        setData((prev) => ({
          ...prev,
          ...parsed,
          labels: { ...defaultLabels, ...(parsed.labels ?? {}) },
          sectionDesigns: {
            ...DEFAULT_SECTION_DESIGNS,
            ...prev.sectionDesigns,
            ...(parsed.sectionDesigns ?? {}),
          },
        }));
        uiToast({ title: "Imported", description: "CV data loaded successfully." });
      } catch {
        uiToast({ title: "Import failed", description: "Invalid JSON file.", variant: "destructive" });
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-background print:block print:h-auto">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2">
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" className="gap-2" asChild title="Editor design drafts">
              <Link to="/drafts">
                <Palette className="h-4 w-4" />
                <span className="text-xs font-medium">Drafts</span>
              </Link>
            </Button>
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

          <div className="flex items-center gap-1">
            <Button size="sm" variant="ghost" title="Export JSON" onClick={exportJSON}>
              <FileJson className="h-4 w-4" />
              <span className="text-xs font-medium">JSON</span>
            </Button>
            <label className="inline-flex">
              <Button size="sm" variant="ghost" asChild title="Import JSON">
                <span className="cursor-pointer">
                  <Upload className="h-4 w-4" />
                  <span className="text-xs font-medium">Import</span>
                </span>
              </Button>
              <input type="file" accept="application/json" className="hidden" onChange={importJSON} />
            </label>
            <Button size="sm" variant="ghost" className="gap-2" onClick={handlePrint}>
              <Printer className="h-4 w-4" />
              <span className="text-xs font-medium">Print</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="gap-2" disabled={exporting}>
                  {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                  <span className="text-xs font-medium">{exporting ? "Generating…" : "Download PDF"}</span>
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
                    <DropdownMenuLabel className="text-xs text-muted-foreground">
                      All languages
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={handleDownloadAllPDFs} disabled={exporting}>
                      <Languages className="mr-2 h-4 w-4" />
                      Download all ({languages.length})
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto print:overflow-visible">
        <EditableCVPreview data={data} setData={setData} theme={theme} />
      </div>
    </div>
  );
};

export default Index;