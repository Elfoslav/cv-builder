import { useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { CVData, type CardColumns, type CardColumnsMap } from "@/lib/cv-types";
import { useCVActions, ListKey, SectionKey, ITEM_LABEL, blankItem } from "./use-cv-actions";
import { CVShell, SectionMeta } from "./cv-shell";
import { buildForm } from "./section-forms";
import { snapshotSection, restoreSection, type SectionSnapshot } from "./section-snapshot";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { ArrowDown, ArrowUp, Check, Pencil, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { DEFAULT_THEME, type ThemeId } from "@/lib/themes";
import { type SectionDesigns, SECTION_DESIGN_OPTIONS } from "@/lib/section-designs";
import { CardColumnsPicker } from "./CardColumnsPicker";

const LIST_KEYS: SectionKey[] = ["experience", "education", "projects", "hobbies"];

interface EditableCVPreviewProps {
  data: CVData;
  setData: Dispatch<SetStateAction<CVData>>;
  /** Global color theme applied via `data-theme` tokens. */
  theme?: ThemeId;
}

export const EditableCVPreview = ({ data, setData, theme = DEFAULT_THEME }: EditableCVPreviewProps) => {
  const actions = useCVActions(setData);
  // Tracks which section (if any) is being edited so the CV can expand to
  // use the full width while a section is open, giving the preview more room.
  const [editingKey, setEditingKey] = useState<SectionKey | null>(null);
  return (
    <div data-theme={theme} className={cn("cv-theme", editingKey && "cv-editing")}>
      <CVShell
        data={data}
        wrap={(meta, content) => (
          <EditableSection
            meta={meta}
            content={content}
            data={data}
            actions={actions}
            onEditingChange={setEditingKey}
          />
        )}
      />
    </div>
  );
};

const EditableSection = ({
  meta, content, data, actions, onEditingChange,
}: {
  meta: SectionMeta;
  content: ReactNode;
  data: CVData;
  actions: ReturnType<typeof useCVActions>;
  onEditingChange: (key: SectionKey | null) => void;
}) => {
  const [editing, setEditing] = useState(false);
  const [snapshot, setSnapshot] = useState<SectionSnapshot | null>(null);
  const isList = LIST_KEYS.includes(meta.key);

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
    onEditingChange(meta.key);
  };

  const add = () => {
    const k = meta.key as ListKey;
    // Snapshot before appending so Cancel discards the freshly added entry.
    setSnapshot(snapshotSection(data, meta.key));
    actions.appendItem(k, blankItem(k));
    setEditing(true);
    onEditingChange(meta.key);
  };

  const done = () => {
    setEditing(false);
    setSnapshot(null);
    onEditingChange(null);
  };

  const cancel = () => {
    if (snapshot) actions.setData((prev) => restoreSection(prev, meta.key, snapshot));
    setEditing(false);
    setSnapshot(null);
    onEditingChange(null);
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
            "absolute z-20 flex items-center gap-0.5 rounded-full border border-border bg-background/90 p-0.5 shadow-sm backdrop-blur print:hidden",
            meta.key === "hero"
              ? "top-10 lg:right-[calc((100%-64rem)/2+1.5rem)]"
              : "right-0 top-0",
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
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] print:block">
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
            <DesignPicker meta={meta} data={data} actions={actions} />
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

/** Sections whose design select shares the card layouts with a columns setting. */
const CARD_LAYOUT_KEYS: (keyof CardColumnsMap)[] = ["experience", "education", "projects"];

const isCardDesign = (value: string) =>
  value === "cards-gradient" || value === "cards-flat" || value === "cards-accent";

const DesignPicker = ({
  meta, data, actions,
}: {
  meta: SectionMeta;
  data: CVData;
  actions: ReturnType<typeof useCVActions>;
}) => {
  const key = meta.key as keyof SectionDesigns;
  const options = SECTION_DESIGN_OPTIONS[key];
  const value = data.sectionDesigns[key];
  const cardKey = CARD_LAYOUT_KEYS.find((k) => k === meta.key);
  const showColumns = cardKey !== undefined && isCardDesign(value);
  return (
    <div className="mb-4 print:hidden">
      <div className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Section design
      </div>
      <Select value={value} onValueChange={(v) => actions.setSectionDesign(key, v as typeof value)}>
        <SelectTrigger className="h-9 text-xs" aria-label="Section design" title={options.find((o) => o.id === value)?.desc}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {showColumns && cardKey && (
        <CardColumnsPicker
          className="mt-3 mb-0"
          value={data.cardColumns[cardKey]}
          onChange={(columns: CardColumns) => actions.setCardColumns(cardKey, columns)}
        />
      )}
    </div>
  );
};
