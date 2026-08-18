import { useState, type ReactNode } from "react";
import { CVData } from "@/lib/cv-types";
import { CVActions, ListKey, SectionKey, ITEM_LABEL, blankItem } from "./useDraftData";
import { CVShell, SectionMeta } from "@/components/cv/editor/cv-shell";
import { buildForm } from "@/components/cv/editor/section-forms";
import { Button } from "@/components/ui/button";
import { Check, Pencil, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const LIST_KEYS: SectionKey[] = ["experience", "education", "projects", "hobbies"];

export const DraftInline = ({ data, h }: { data: CVData; h: CVActions }) => (
  <CVShell
    data={data}
    wrap={(meta, content) => <InlineSection meta={meta} content={content} data={data} h={h} />}
  />
);

const InlineSection = ({
  meta, content, data, h,
}: {
  meta: SectionMeta;
  content: ReactNode;
  data: CVData;
  h: CVActions;
}) => {
  const [editing, setEditing] = useState(false);
  const isList = LIST_KEYS.includes(meta.key);

  const add = () => {
    const k = meta.key as ListKey;
    h.appendItem(k, blankItem(k));
    setEditing(true);
  };

  return (
    <div
      className={cn(
        "group/section relative transition-all",
        editing && "mb-12 rounded-2xl border-2 border-dashed border-primary/50 bg-primary/[0.02] p-3 pt-4",
      )}
    >
      {!editing && (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setEditing(true)}
          className="absolute right-0 top-0 z-20 h-7 gap-1 rounded-full border border-border bg-background/90 px-2.5 text-[11px] opacity-0 shadow-sm backdrop-blur transition-opacity group-hover/section:opacity-100"
        >
          <Pencil className="h-3 w-3" /> Edit
        </Button>
      )}

      {editing ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="min-w-0">{content}</div>
          <div className="min-w-0 rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="truncate text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Editing — {meta.title}
              </span>
              <Button size="sm" className="h-7 shrink-0" onClick={() => setEditing(false)}>
                <Check className="h-3.5 w-3.5" /> Done
              </Button>
            </div>
            {buildForm(meta.key, data, h)}
          </div>
        </div>
      ) : (
        <>
          {content}
          {isList && (
            <div className="mt-3">
              <Button variant="outline" size="sm" onClick={add} className="w-full gap-1.5 border-dashed">
                <Plus className="h-3.5 w-3.5" /> Add {ITEM_LABEL[meta.key as ListKey]}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
