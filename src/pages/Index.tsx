import { useState } from "react";
import { CVPreview } from "@/components/cv/CVPreview";
import { CVEditor } from "@/components/cv/CVEditor";
import { useCVData } from "@/lib/use-cv-data";
import { Button } from "@/components/ui/button";
import { PanelLeftClose, PanelLeftOpen, Printer } from "lucide-react";

const Index = () => {
  const { data, setData, reset } = useCVData();
  const [editorOpen, setEditorOpen] = useState(true);

  const handleDownload = () => window.print();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background print:block print:h-auto">
      {editorOpen && (
        <aside className="hidden w-[420px] shrink-0 border-r border-border bg-card lg:block print:hidden">
          <CVEditor data={data} setData={setData} reset={reset} />
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
