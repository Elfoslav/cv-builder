import { useEffect, useRef, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { CVData, type CardColumns, type CardColumnsMap } from "@/lib/cv-types";
import { useCVActions, SectionKey } from "./use-cv-actions";
import { CVShell, SectionMeta } from "./cv-shell";
import { buildForm } from "./section-forms";
import { snapshotSection, restoreSection, type SectionSnapshot } from "./section-snapshot";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Select, SelectGroup, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { ArrowDown, ArrowUp, Check, Pencil, X, SlidersHorizontal, PenLine } from "lucide-react";
import { cn } from "@/lib/utils";
import { DEFAULT_THEME, type ThemeId } from "@/lib/themes";
import { type SectionDesigns, SECTION_DESIGN_OPTIONS } from "@/lib/section-designs";
import { CardColumnsPicker } from "./CardColumnsPicker";
import { FieldLabel } from "@/components/cv/FieldLabel";
import { EDIT_VARIANTS, DEFAULT_EDIT_VARIANT } from "@/lib/edit-variants";
import { DEFAULT_DRAWER_VARIANT, type DrawerVariant } from "@/lib/drawer-variants";

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
  const editVariant = DEFAULT_EDIT_VARIANT;
  const [drawerVariant] = useState<DrawerVariant>(() => {
    const saved = localStorage.getItem("cv-builder:drawer-variant") as DrawerVariant | null;
    return saved &&
      ["polished", "flat", "compact", "tabs", "glass", "timeline", "bento", "command"].includes(saved)
      ? saved
      : DEFAULT_DRAWER_VARIANT;
  });
  // On wide viewports the edit panel docks beside a live, print-width preview
  // so edits are visible as they happen; on narrow screens it overlays instead.
  const isWide = useMediaQuery("(min-width: 1280px)");

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
      <div className="xl:flex xl:items-stretch xl:gap-6">
        <div className="xl:flex xl:min-w-0 xl:flex-1 xl:justify-center">
          <div className="mx-auto w-full max-w-[735px] print:mx-0 print:max-w-none">
            <div className="overflow-hidden rounded-xl border bg-background shadow-[0_8px_32px_hsl(var(--foreground)/0.08)] print:rounded-none print:border-0 print:shadow-none">
          <CVShell
            data={data}
            wrap={(meta, content) => (
              <EditableSection
                meta={meta}
                content={content}
                data={data}
                actions={actions}
                isEditing={editingKey === meta.key}
                editVariant={editVariant}
                onStartEditing={handleStartEditing}
              />
            )}
          />
            </div>
            <div className="mt-3 hidden justify-center print:hidden xl:flex">
              <span className="rounded-full border bg-card px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground shadow-sm">
                Print width • 703px • matches PDF
              </span>
            </div>
          </div>
        </div>
        <EditorDrawer
          editingKey={editingKey}
          visible={drawerVisible}
          isWide={isWide}
          data={data}
          actions={actions}
          drawerVariant={drawerVariant}
          onDone={handleDone}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

const EditableSection = ({
  meta,
  content,
  data,
  actions,
  isEditing,
  editVariant,
  onStartEditing,
}: {
  meta: SectionMeta;
  content: ReactNode;
  data: CVData;
  actions: ReturnType<typeof useCVActions>;
  isEditing: boolean;
  editVariant: EditVariant;
  onStartEditing: (key: SectionKey) => void;
}) => {

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

  const variantClass = EDIT_VARIANTS[editVariant].className;
  return (
    <div
      className={cn(
        "group/section relative",
        isEmpty && "empty-section",
        isEditing && "cv-section-edit mb-12 print:mb-0",
      )}
    >
      {isEditing && (
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 -mx-8 rounded-xl print:hidden",
            meta.key === "hero" ? "top-0" : meta.key === "footer" ? "top-7" : "-top-3",
            "-bottom-3",
            variantClass
          )}
          aria-hidden
        />
      )}
      <div className="relative">
      {!isEditing && (
        <div
          className={cn(
            "absolute right-0 z-20 flex items-center gap-0.5 rounded-full border border-border bg-background/90 p-0.5 shadow-sm backdrop-blur print:hidden",
            meta.key === "hero" ? "top-10" : "top-0",
          )}
        >
          {meta.key !== "hero" && meta.key !== "footer" && (
            <>
              <Button
                size="icon"
                variant="ghost"
                disabled={!meta.canMoveUp}
                onClick={() => actions.moveSection(meta.key, -1)}
                className="h-7 w-7 text-muted-foreground disabled:pointer-events-none disabled:opacity-30"
                title="Move section up"
              >
                <ArrowUp className="h-3 w-3" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                disabled={!meta.canMoveDown}
                onClick={() => actions.moveSection(meta.key, 1)}
                className="h-7 w-7 text-muted-foreground disabled:pointer-events-none disabled:opacity-30"
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
            className="h-7 gap-1 px-2 text-xs text-foreground"
          >
            <Pencil className="h-3 w-3" /> Edit
          </Button>
        </div>
      )}

      {content}
      </div>
    </div>
  );
};

const EditorDrawer = ({
  editingKey,
  visible,
  isWide,
  data,
  actions,
  drawerVariant,
  onDone,
  onCancel,
}: {
  editingKey: SectionKey | null;
  visible: boolean;
  isWide: boolean;
  data: CVData;
  actions: ReturnType<typeof useCVActions>;
  drawerVariant: DrawerVariant;
  onDone: () => void;
  onCancel: () => void;
}) => {
  const [activeTab, setActiveTab] = useState<"design" | "content">("design");
  if (!editingKey) return null;

  const meta = getEditorMeta(editingKey, data);

  return (
    <div
      className={cn(
        "print:hidden",
        isWide
          ? cn(
              "relative z-10 flex shrink-0 flex-col transition-[width,opacity] duration-300 ease-out",
              visible ? "w-[440px] opacity-100" : "w-0 opacity-0",
            )
          : "pointer-events-none fixed inset-0 z-40",
      )}
      aria-hidden={!visible}
    >
      {!isWide && (
        <div
          className={cn(
            "absolute inset-0 bg-background/40 backdrop-blur-[2px] transition-opacity duration-300",
            visible ? "opacity-100" : "opacity-0",
          )}
        />
      )}
      <aside
        role="dialog"
        aria-modal={!isWide}
        aria-label={`Edit ${meta.title}`}
        className={cn(
          "flex flex-col border-border",
          drawerVariant === "glass" ? "bg-card/70 backdrop-blur-2xl" : "bg-card",
          isWide
            ? "sticky top-0 h-[calc(100vh-3.5rem)] w-full overflow-hidden rounded-l-xl border shadow-[0_8px_40px_hsl(var(--foreground)/0.08)] xl:border-l"
            : "pointer-events-auto absolute inset-y-0 right-0 w-full max-w-[440px] rounded-l-xl border-l shadow-2xl transition-transform duration-300 ease-out sm:w-[420px]",
          drawerVariant === "glass" && "border-white/10 shadow-[0_8px_40px_hsl(var(--foreground)/0.12)]",
          !isWide && (visible ? "translate-x-0" : "translate-x-full"),
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between gap-3 border-b px-5 py-4 backdrop-blur-sm",
            drawerVariant === "glass" ? "bg-white/40" : "bg-muted/30"
          )}
        >
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Editing
            </p>
            <h3 className="truncate text-sm font-semibold text-foreground">Editing — {meta.title}</h3>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <Button size="sm" variant="ghost" onClick={onCancel}>
              <X className="h-3.5 w-3.5" /> Cancel
            </Button>
            <Button size="sm" onClick={onDone}>
              <Check className="h-3.5 w-3.5" /> Done
            </Button>
          </div>
        </div>

        {drawerVariant === "tabs" ? (
          <div className="flex-1 overflow-y-auto">
            <div className="sticky top-0 z-10 flex gap-1 border-b bg-card px-2 py-2">
              <Button
                size="sm"
                variant={activeTab === "design" ? "secondary" : "ghost"}
                className="flex-1"
                onClick={() => setActiveTab("design")}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" /> Design
              </Button>
              <Button
                size="sm"
                variant={activeTab === "content" ? "secondary" : "ghost"}
                className="flex-1"
                onClick={() => setActiveTab("content")}
              >
                <PenLine className="h-3.5 w-3.5" /> Content
              </Button>
            </div>
            <div className="p-5">
              {activeTab === "design" ? (
                <DesignPicker meta={meta} data={data} actions={actions} />
              ) : (
                buildForm(meta.key, data, actions)
              )}
            </div>
          </div>
        ) : drawerVariant === "flat" ? (
          <div className="flex-1 overflow-y-auto px-5 py-6">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Design</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <DesignPicker className="mt-3" meta={meta} data={data} actions={actions} />
            <div className="mt-6 flex items-center gap-2 border-t pt-6">
              <PenLine className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Content</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="mt-3">{buildForm(meta.key, data, actions)}</div>
          </div>
        ) : drawerVariant === "compact" ? (
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="rounded-lg border bg-card p-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-3 w-3 text-primary" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Design</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <DesignPicker className="mt-2 text-sm" meta={meta} data={data} actions={actions} />
            </div>
            <div className="mt-3 rounded-lg border bg-card p-3">
              <div className="flex items-center gap-2">
                <PenLine className="h-3 w-3 text-primary" />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Content</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="mt-2 text-sm">{buildForm(meta.key, data, actions)}</div>
            </div>
          </div>
        ) : drawerVariant === "glass" ? (
          <div className="flex-1 overflow-y-auto bg-gradient-to-b from-white/60 to-white/20 px-5 py-6 backdrop-blur-sm">
            <div className="rounded-xl border border-white/40 bg-white/70 p-4 shadow-[0_8px_24px_hsl(var(--foreground)/0.06)] backdrop-blur">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-primary text-white shadow-sm">
                  <SlidersHorizontal className="h-3 w-3" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Design</span>
                <div className="h-px flex-1 bg-border/50" />
              </div>
              <DesignPicker className="mb-0 mt-3" meta={meta} data={data} actions={actions} />
            </div>
            <div className="mt-4 rounded-xl border border-white/40 bg-white/70 p-4 shadow-[0_8px_24px_hsl(var(--foreground)/0.06)] backdrop-blur">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-foreground text-card shadow-sm">
                  <PenLine className="h-3 w-3" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Content</span>
                <div className="h-px flex-1 bg-border/50" />
              </div>
              <div className="mt-3">{buildForm(meta.key, data, actions)}</div>
            </div>
          </div>
        ) : drawerVariant === "timeline" ? (
          <div className="flex-1 overflow-y-auto px-5 py-6">
            <div className="relative pl-8">
              <div className="absolute left-[11px] top-2 h-[calc(100%-16px)] w-px bg-gradient-to-b from-primary via-primary/40 to-transparent" />
              <div className="relative">
                <div className="absolute -left-[30px] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground shadow-sm ring-4 ring-background">
                  1
                </div>
                <div className="rounded-xl border bg-card p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Design • Step 1</span>
                  </div>
                  <DesignPicker className="mb-0 mt-3" meta={meta} data={data} actions={actions} />
                </div>
              </div>
              <div className="relative mt-6">
                <div className="absolute -left-[30px] flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-[11px] font-bold text-card shadow-sm ring-4 ring-background">
                  2
                </div>
                <div className="rounded-xl border bg-card p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <PenLine className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Content • Step 2</span>
                  </div>
                  <div className="mt-3">{buildForm(meta.key, data, actions)}</div>
                </div>
              </div>
            </div>
          </div>
        ) : drawerVariant === "bento" ? (
          <div className="flex-1 overflow-y-auto bg-muted/20 p-4">
            <div className="grid gap-3">
              <div className="rounded-xl border bg-card p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Design</span>
                </div>
                <DesignPicker className="mt-3" meta={meta} data={data} actions={actions} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border bg-card p-3">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Columns</div>
                  <div className="mt-2 text-xs text-muted-foreground">Cards per row</div>
                  <div className="mt-2 h-6 rounded bg-secondary" />
                </div>
                <div className="rounded-xl border bg-card p-3">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Preview</div>
                  <div className="mt-2 h-14 rounded-lg bg-gradient-primary opacity-80" />
                </div>
              </div>
              <div className="rounded-xl border bg-card p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <PenLine className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Content</span>
                </div>
                <div className="mt-3">{buildForm(meta.key, data, actions)}</div>
              </div>
            </div>
          </div>
        ) : drawerVariant === "command" ? (
          <div className="flex-1 overflow-y-auto">
            <div className="sticky top-0 z-10 border-b bg-card/80 p-3 backdrop-blur">
              <div className="flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-2">
                <PenLine className="h-3.5 w-3.5 text-muted-foreground" />
                <input
                  placeholder="Search fields…"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  readOnly
                />
                <span className="rounded border bg-card px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">⌘K</span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Design</span>
                <span className="ml-auto font-mono text-[10px] text-muted-foreground">↵ to apply</span>
              </div>
              <DesignPicker className="mt-3" meta={meta} data={data} actions={actions} />
              <div className="mt-6 flex items-center gap-2 border-t pt-6">
                <PenLine className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Content</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="mt-3">{buildForm(meta.key, data, actions)}</div>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-5 py-6">
            <div className="rounded-xl border bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Design</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <DesignPicker className="mb-0 mt-3" meta={meta} data={data} actions={actions} />
            </div>
            <div className="mt-4 rounded-xl border bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <PenLine className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Content</span>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="mt-3">{buildForm(meta.key, data, actions)}</div>
            </div>
          </div>
        )}
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
      maxColumns={6}
    />
  </div>
);
