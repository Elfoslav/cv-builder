import { useEffect, useRef, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { CVData, type CardColumns, type CardColumnsMap } from "@/lib/cv-types";
import { useCVActions, ListKey, SectionKey, ITEM_LABEL, blankItem } from "./use-cv-actions";
import { CVShell, SectionMeta } from "./cv-shell";
import { buildForm } from "./section-forms";
import { snapshotSection, restoreSection, type SectionSnapshot } from "./section-snapshot";
import { Button } from "@/components/ui/button";
import {
  Select, SelectGroup, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { ArrowDown, ArrowUp, Check, Pencil, Plus, X, SlidersHorizontal, PenLine } from "lucide-react";
import { cn } from "@/lib/utils";
import { DEFAULT_THEME, type ThemeId } from "@/lib/themes";
import { type SectionDesigns, SECTION_DESIGN_OPTIONS } from "@/lib/section-designs";
import { CardColumnsPicker } from "./CardColumnsPicker";
import { FieldLabel } from "@/components/cv/FieldLabel";

const LIST_KEYS: SectionKey[] = ["experience", "education", "projects", "hobbies"];
const DRAWER_TRANSITION_MS = 300;

interface EditableCVPreviewProps {
  data: CVData;
  setData: Dispatch<SetStateAction<CVData>>;
  /** Global color theme applied via `data-theme` tokens. */
  theme?: ThemeId;
}

export const EditableCVPreview = ({ data, setData, theme = DEFAULT_THEME }: EditableCVPreviewProps) => {
  const actions = useCVActions(setData);
  const closeTimerRef = useRef<number | null>(null);
  const [editingKey, setEditingKey] = useState<SectionKey | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [snapshot, setSnapshot] = useState<SectionSnapshot | null>(null);

  useEffect(() => () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
    }
  }, []);

  const openEditor = (key: SectionKey, nextSnapshot: SectionSnapshot | null) => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setSnapshot(nextSnapshot);
    setEditingKey(key);
    setDrawerVisible(false);
    window.requestAnimationFrame(() => setDrawerVisible(true));
  };

  const closeEditor = () => {
    setDrawerVisible(false);
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = window.setTimeout(() => {
      setEditingKey(null);
      setSnapshot(null);
      closeTimerRef.current = null;
    }, DRAWER_TRANSITION_MS);
  };

  const handleStartEditing = (key: SectionKey) => {
    openEditor(key, snapshotSection(data, key));
  };

  const handleAddAndEdit = (key: ListKey) => {
    openEditor(key, snapshotSection(data, key));
    actions.appendItem(key, blankItem(key));
  };

  const handleDone = () => {
    closeEditor();
  };

  const handleCancel = () => {
    if (editingKey && snapshot) {
      actions.setData((prev) => restoreSection(prev, editingKey, snapshot));
    }
    closeEditor();
  };

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
            isEditing={editingKey === meta.key}
            onStartEditing={handleStartEditing}
            onAddAndEdit={handleAddAndEdit}
          />
        )}
      />
      <EditorDrawer
        editingKey={editingKey}
        visible={drawerVisible}
        data={data}
        actions={actions}
        onDone={handleDone}
        onCancel={handleCancel}
      />
    </div>
  );
};

const EditableSection = ({
  meta, content, data, actions, isEditing, onStartEditing, onAddAndEdit,
}: {
  meta: SectionMeta;
  content: ReactNode;
  data: CVData;
  actions: ReturnType<typeof useCVActions>;
  isEditing: boolean;
  onStartEditing: (key: SectionKey) => void;
  onAddAndEdit: (key: ListKey) => void;
}) => {
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

  return (
    <div
      className={cn(
        "group/section relative transition-[background-color,border-color,box-shadow] duration-300",
        isEmpty && "empty-section",
        isEditing &&
          "cv-section-edit mb-12 rounded-2xl border-2 border-dashed border-primary/50 bg-primary/[0.02] p-3 pt-4 shadow-[0_0_0_1px_hsl(var(--primary)/0.08)] print:mb-0 print:border-0 print:bg-transparent print:p-0 print:shadow-none",
      )}
    >
      {!isEditing && (
        <div
          className={cn(
            "absolute right-0 top-0 z-20 flex items-center gap-0.5 rounded-full border border-border bg-background/90 p-0.5 shadow-sm backdrop-blur print:hidden",
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
            onClick={() => onStartEditing(meta.key)}
            className="h-6 gap-1 rounded-full px-2 text-[11px] text-foreground hover:bg-muted hover:text-primary"
          >
            <Pencil className="h-3 w-3" /> Edit
          </Button>
        </div>
      )}

      {content}

      {!isEditing && isList && (
        <div className="mt-3 print:hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddAndEdit(meta.key as ListKey)}
            className="w-full gap-1.5 border-dashed"
          >
            <Plus className="h-3.5 w-3.5" /> Add {ITEM_LABEL[meta.key as ListKey]}
          </Button>
        </div>
      )}
    </div>
  );
};

const EditorDrawer = ({
  editingKey, visible, data, actions, onDone, onCancel,
}: {
  editingKey: SectionKey | null;
  visible: boolean;
  data: CVData;
  actions: ReturnType<typeof useCVActions>;
  onDone: () => void;
  onCancel: () => void;
}) => {
  if (!editingKey) return null;

  const meta = getEditorMeta(editingKey, data);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 print:hidden"
      aria-hidden={!visible}
    >
      <div
        className={cn(
          "absolute inset-0 bg-background/40 backdrop-blur-[2px] transition-opacity duration-300",
          visible ? "opacity-100" : "opacity-0",
        )}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`Edit ${meta.title}`}
        className={cn(
          "pointer-events-auto absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col border-l border-border bg-card shadow-2xl transition-transform duration-300 ease-out sm:w-[420px]",
          visible ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Editing
            </p>
            <h3 className="truncate text-sm font-semibold text-foreground">Editing — {meta.title}</h3>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <Button size="sm" variant="ghost" className="h-8" onClick={onCancel}>
              <X className="h-3.5 w-3.5" /> Cancel
            </Button>
            <Button size="sm" className="h-8" onClick={onDone}>
              <Check className="h-3.5 w-3.5" /> Done
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Design
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <DesignPicker className="mb-0 mt-3" meta={meta} data={data} actions={actions} />

          <div className="mt-5 flex items-center gap-2 border-t border-border pt-5">
            <PenLine className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Content
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="mt-3">{buildForm(meta.key, data, actions)}</div>
        </div>
      </aside>
    </div>
  );
};

const getEditorMeta = (key: SectionKey, data: CVData): SectionMeta => {
  const L = data.labels;

  switch (key) {
    case "hero":
      return { key, title: "Profile header", subtitle: "Name, role, bio & contact" };
    case "about":
      return { key, title: L.aboutTitle, subtitle: L.aboutSubtitle };
    case "experience":
      return { key, title: L.experienceTitle, subtitle: L.experienceSubtitle, count: data.experience.length };
    case "education":
      return { key, title: L.educationTitle, subtitle: L.educationSubtitle, count: data.education.length };
    case "skills":
      return { key, title: L.skillsTitle, subtitle: L.skillsSubtitle, count: data.skills.length };
    case "projects":
      return { key, title: L.projectsTitle, subtitle: L.projectsSubtitle, count: data.projects.length };
    case "hobbies":
      return { key, title: L.hobbiesTitle, subtitle: L.hobbiesSubtitle, count: data.hobbies.length };
    case "footer":
      return { key, title: "Footer", subtitle: "Closing message & copyright" };
  }
};

/** Sections whose design select shares the card layouts with a columns setting. */
const CARD_LAYOUT_KEYS: (keyof CardColumnsMap)[] = ["experience", "education", "projects", "hobbies"];

const isCardDesign = (value: string) =>
  value.startsWith("cards-gradient") || value === "cards-flat" || value === "cards-accent";

/** Select items, grouped by `group` label when the options carry one. */
const renderOptions = <T extends { id: string; name: string; group?: string }>(
  options: readonly T[],
): ReactNode => {
  const groups = Array.from(new Set(options.map((o) => o.group).filter((g): g is string => Boolean(g))));
  if (groups.length === 0) {
    return options.map((o) => (
      <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>
    ));
  }
  return groups.map((group) => (
    <SelectGroup key={group}>
      <SelectLabel>{group}</SelectLabel>
      {options.filter((o) => o.group === group).map((o) => (
        <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>
      ))}
    </SelectGroup>
  ));
};

const DesignPicker = ({
  meta, data, actions, className,
}: {
  meta: SectionMeta;
  data: CVData;
  actions: ReturnType<typeof useCVActions>;
  className?: string;
}) => {
  const key = meta.key as keyof SectionDesigns;
  const options = SECTION_DESIGN_OPTIONS[key];
  const value = data.sectionDesigns[key];
  const cardKey = CARD_LAYOUT_KEYS.find((k) => k === meta.key);
  const showColumns = cardKey !== undefined && isCardDesign(value);
  return (
    <div className={cn("mb-4 print:hidden", className)}>
      <FieldLabel label="Section design" />
      <Select value={value} onValueChange={(v) => actions.setSectionDesign(key, v as typeof value)}>
        <SelectTrigger aria-label="Section design">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>{renderOptions(options)}</SelectContent>
      </Select>

      {showColumns && cardKey && (
        <CardColumnsField
          section={cardKey}
          value={(data.cardColumns?.[cardKey] ?? 2) as CardColumns}
          onChange={(cols) => actions.setCardColumns(cardKey, cols)}
        />
      )}
    </div>
  );
};

const CardColumnsField = ({
  section, value, onChange,
}: {
  section: keyof CardColumnsMap;
  value: CardColumns;
  onChange: (cols: CardColumns) => void;
}) => (
  <div className="mt-3">
    <FieldLabel label="Card columns" />
    <CardColumnsPicker
      section={section}
      value={value}
      onChange={onChange}
    />
  </div>
);
