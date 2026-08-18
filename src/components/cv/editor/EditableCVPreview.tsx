import { useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { CVData } from "@/lib/cv-types";
import { useCVActions, ListKey, SectionKey, ITEM_LABEL, blankItem } from "./use-cv-actions";
import { CVShell, SectionMeta } from "./cv-shell";
import { buildForm } from "./section-forms";
import { snapshotSection, restoreSection, type SectionSnapshot } from "./section-snapshot";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, Check, Pencil, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LIST_KEYS: SectionKey[] = ["experience", "education", "projects", "hobbies"];

interface EditableCVPreviewProps {
  data: CVData;
  setData: Dispatch<SetStateAction<CVData>>;
  onDownload?: () => void;
}

export const EditableCVPreview = ({ data, setData, onDownload }: EditableCVPreviewProps) => {
  const actions = useCVActions(setData);
  return (
    <CVShell
      data={data}
      onDownload={onDownload}
      wrap={(meta, content) => <EditableSection meta={meta} content={content} data={data} actions={actions} />}
    />
  );
};

const EditableSection = ({
  meta, content, data, actions,
}: {
  meta: SectionMeta;
  content: ReactNode;
  data: CVData;
  actions: ReturnType<typeof useCVActions>;
}) => {
  const [editing, setEditing] = useState(false);
  const [snapshot, setSnapshot] = useState<SectionSnapshot | null>(null);
  const isList = LIST_KEYS.includes(meta.key);
  const isHero = meta.key === "hero";

  // A section with no content is still shown on screen (so you can add to it),
  // but it is hidden in print/export output via the `.empty-section` rule.
  const isEmpty =
    meta.key === "about"
      ? !data.about
      : meta.key === "experience"
        ? data.experience.length === 0
        : meta.key === "education"
          ? data.education.length === 0
          : meta.key === "skills"
            ? data.skills.length === 0
            : meta.key === "projects"
              ? data.projects.length === 0
              : meta.key === "hobbies"
                ? data.hobbies.length === 0
                : false;

  const startEditing = () => {
    setSnapshot(snapshotSection(data, meta.key));
    setEditing(true);
  };

  const add = () => {
    const k = meta.key as ListKey;
    // Snapshot before appending so Cancel discards the freshly added entry.
    setSnapshot(snapshotSection(data, meta.key));
    actions.appendItem(k, blankItem(k));
    setEditing(true);
  };

  const done = () => {
    setEditing(false);
    setSnapshot(null);
  };

  const cancel = () => {
    if (snapshot) actions.setData((prev) => restoreSection(prev, meta.key, snapshot));
    setEditing(false);
    setSnapshot(null);
  };

  return (
    <div
      className={cn(
        "group/section relative transition-all",
        isEmpty && "empty-section",
        editing &&
          "mb-12 rounded-2xl border-2 border-dashed border-primary/50 bg-primary/[0.02] p-3 pt-4 print:mb-0 print:border-0 print:bg-transparent print:p-0",
      )}
    >
      {!editing && (
        <div
          className={cn(
            "absolute right-0 top-0 z-20 flex items-center gap-0.5 rounded-full border border-border bg-background/90 p-0.5 shadow-sm backdrop-blur print:hidden",
            isHero && "top-4 right-6",
          )}
        >
          {meta.key !== "hero" && meta.key !== "footer" && (
            <>
              <Button
                size="icon"
                variant="ghost"
                disabled={!meta.canMoveUp}
                onClick={() => actions.moveSection(meta.key, -1)}
                className="h-6 w-6 text-muted-foreground hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
                title="Move section up"
              >
                <ArrowUp className="h-3 w-3" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                disabled={!meta.canMoveDown}
                onClick={() => actions.moveSection(meta.key, 1)}
                className="h-6 w-6 text-muted-foreground hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
                title="Move section down"
              >
                <ArrowDown className="h-3 w-3" />
              </Button>
            </>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={startEditing}
            className="h-6 gap-1 rounded-full px-2 text-[11px] text-foreground hover:bg-muted hover:text-primary"
          >
            <Pencil className="h-3 w-3" /> Edit
          </Button>
        </div>
      )}

      {editing ? (
        <div className="grid gap-6 lg:grid-cols-2 print:block">
          <div className="min-w-0">{content}</div>
          <div className="min-w-0 rounded-xl border border-border bg-card p-4 shadow-sm print:hidden">
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="truncate text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Editing — {meta.title}
              </span>
              <div className="flex shrink-0 items-center gap-1.5">
                <Button size="sm" variant="ghost" className="h-7" onClick={cancel}>
                  <X className="h-3.5 w-3.5" /> Cancel
                </Button>
                <Button size="sm" className="h-7" onClick={done}>
                  <Check className="h-3.5 w-3.5" /> Done
                </Button>
              </div>
            </div>
            {buildForm(meta.key, data, actions)}
          </div>
        </div>
      ) : (
        <>
          {content}
          {isList && (
            <div className="mt-3 print:hidden">
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
