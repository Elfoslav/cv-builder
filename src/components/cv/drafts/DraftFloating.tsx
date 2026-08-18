import { useState, type ReactNode } from "react";
import { CVData } from "@/lib/cv-types";
import { CVActions, ListKey, SectionKey, ITEM_LABEL, blankItem } from "./useDraftData";
import { CVShell, SectionMeta } from "@/components/cv/editor/cv-shell";
import { buildForm } from "@/components/cv/editor/section-forms";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, Pencil, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const LIST_KEYS: SectionKey[] = ["experience", "education", "projects", "hobbies"];

export const DraftFloating = ({ data, h }: { data: CVData; h: CVActions }) => {
  const [openKey, setOpenKey] = useState<SectionKey | null>(null);

  const wrap = (meta: SectionMeta, content: ReactNode): ReactNode => (
    <FloatingSection
      meta={meta}
      content={content}
      data={data}
      h={h}
      open={openKey === meta.key}
      onOpenChange={(v) => setOpenKey(v ? meta.key : null)}
    />
  );

  return <CVShell data={data} wrap={wrap} />;
};

const FloatingSection = ({
  meta, content, data, h, open, onOpenChange,
}: {
  meta: SectionMeta;
  content: ReactNode;
  data: CVData;
  h: CVActions;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const isList = LIST_KEYS.includes(meta.key);
  const isHero = meta.key === "hero";

  const add = () => {
    const k = meta.key as ListKey;
    h.appendItem(k, blankItem(k));
  };

  return (
    <div className="group/float relative">
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className={cn(
              "absolute right-0 top-0 z-20 h-7 gap-1 rounded-full border-border bg-background/85 px-2.5 text-[11px] shadow-sm backdrop-blur transition-colors hover:border-primary/50 hover:text-primary",
              isHero && "top-4 right-4",
            )}
          >
            <Pencil className="h-3 w-3" /> Edit
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" sideOffset={8} className="w-[400px] max-h-[80vh] overflow-y-auto p-0">
          <div className="sticky top-0 z-10 flex items-center justify-between gap-2 border-b border-border bg-popover px-4 py-2.5">
            <span className="truncate text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Edit {meta.title}
            </span>
            <Button size="sm" className="h-6 shrink-0 gap-1 text-[11px]" onClick={() => onOpenChange(false)}>
              <Check className="h-3 w-3" /> Done
            </Button>
          </div>
          <div className="p-4">{buildForm(meta.key, data, h)}</div>
        </PopoverContent>
      </Popover>

      {content}

      {isList && (
        <div className="mt-3">
          <Button variant="outline" size="sm" onClick={add} className="w-full gap-1.5 border-dashed">
            <Plus className="h-3.5 w-3.5" /> Add {ITEM_LABEL[meta.key as ListKey]}
          </Button>
        </div>
      )}
    </div>
  );
};
