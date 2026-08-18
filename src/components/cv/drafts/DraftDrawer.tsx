import { useState, type ReactNode } from "react";
import { CVData } from "@/lib/cv-types";
import { CVActions, ListKey, SectionKey, ITEM_LABEL, blankItem } from "./useDraftData";
import { CVShell, SectionMeta } from "@/components/cv/editor/cv-shell";
import { buildForm } from "@/components/cv/editor/section-forms";
import { Button } from "@/components/ui/button";
import {
  Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { Check, Pencil, Plus } from "lucide-react";

const LIST_KEYS: SectionKey[] = ["experience", "education", "projects", "hobbies"];

interface OpenState {
  key: SectionKey;
  title: string;
}

export const DraftDrawer = ({ data, h }: { data: CVData; h: CVActions }) => {
  const [open, setOpen] = useState<OpenState | null>(null);

  const edit = (meta: SectionMeta) => setOpen({ key: meta.key, title: meta.title });

  const add = (meta: SectionMeta) => {
    const k = meta.key as ListKey;
    h.appendItem(k, blankItem(k));
    setOpen({ key: meta.key, title: meta.title });
  };

  const wrap = (meta: SectionMeta, content: ReactNode): ReactNode => {
    const isList = LIST_KEYS.includes(meta.key);
    return (
      <div className="group/drawer relative">
        <div className="mb-3 flex items-center justify-between gap-2 rounded-md border border-dashed border-border/70 bg-card/60 px-2.5 py-1.5 text-[11px] text-muted-foreground">
          <span className="truncate font-medium">
            {meta.title}
            {typeof meta.count === "number" && (
              <span className="ml-1.5 text-muted-foreground/70">
                · {meta.count} item{meta.count === 1 ? "" : "s"}
              </span>
            )}
          </span>
          <div className="flex shrink-0 gap-1">
            {isList && (
              <Button size="sm" variant="ghost" className="h-6 gap-1 text-[11px]" onClick={() => add(meta)}>
                <Plus className="h-3 w-3" /> Add
              </Button>
            )}
            <Button size="sm" variant="ghost" className="h-6 gap-1 text-[11px]" onClick={() => edit(meta)}>
              <Pencil className="h-3 w-3" /> Edit
            </Button>
          </div>
        </div>
        {content}
      </div>
    );
  };

  return (
    <>
      <CVShell data={data} wrap={wrap} />

      <Sheet open={open !== null} onOpenChange={(v) => { if (!v) setOpen(null); }}>
        <SheetContent className="w-full max-w-[460px] overflow-y-auto sm:max-w-[460px]">
          <SheetHeader className="mb-4">
            <SheetTitle>Edit {open?.title}</SheetTitle>
            <SheetDescription>Changes apply to the CV preview instantly.</SheetDescription>
          </SheetHeader>
          {open && buildForm(open.key, data, h)}
          <SheetFooter className="mt-6">
            <Button onClick={() => setOpen(null)}>
              <Check className="h-3.5 w-3.5" /> Done
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};
