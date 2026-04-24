import { useEffect, useRef, useState } from "react";
import { CVPreview } from "@/components/cv/CVPreview";
import { CVEditor } from "@/components/cv/CVEditor";
import { LanguageSwitcher } from "@/components/cv/LanguageSwitcher";
import { useCVData } from "@/lib/use-cv-data";
import { Button } from "@/components/ui/button";
import { PanelLeftClose, PanelLeftOpen, Printer, Download, Loader2 } from "lucide-react";
import { exportElementToPDF } from "@/lib/export-pdf";
import { toast } from "sonner";

const Index = () => {
  const {
    data, setData,
    languages, activeId, setActiveId,
    addLanguage, renameLanguage, deleteLanguage,
  } = useCVData();
  const [editorOpen, setEditorOpen] = useState(true);

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

  const handleDownload = () => window.print();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background print:block print:h-auto">
      {editorOpen && (
        <aside className="hidden w-[420px] shrink-0 flex-col border-r border-border bg-card lg:flex print:hidden">
          <LanguageSwitcher
            languages={languages}
            activeId={activeId}
            setActiveId={setActiveId}
            addLanguage={addLanguage}
            renameLanguage={renameLanguage}
            deleteLanguage={deleteLanguage}
          />
          <div className="flex-1 overflow-hidden">
            <CVEditor data={data} setData={setData} />
          </div>
        </aside>
      )}

      <div className="relative flex-1 overflow-y-auto print:overflow-visible">
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-background/80 px-4 py-2 backdrop-blur-md print:hidden">
          <Button
            size="sm"
            variant="ghost"
            className="hidden gap-2 lg:inline-flex"
            onClick={() => setEditorOpen((v) => !v)}
          >
            {editorOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
            <span className="text-xs font-medium">{editorOpen ? "Hide editor" : "Show editor"}</span>
          </Button>
          <span className="text-xs text-muted-foreground lg:hidden">
            Resize window to ≥1024px to edit
          </span>
          <Button size="sm" variant="ghost" className="gap-2" onClick={handleDownload}>
            <Printer className="h-4 w-4" />
            <span className="text-xs font-medium">Print / PDF</span>
          </Button>
        </div>

        <CVPreview data={data} onDownload={handleDownload} />
      </div>
    </div>
  );
};

export default Index;
