import { Link } from "react-router-dom";
import { type ReactNode, type ComponentType, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useDraftData } from "@/components/cv/drafts/useDraftData";
import { DraftInline } from "@/components/cv/drafts/DraftInline";
import { DraftDrawer } from "@/components/cv/drafts/DraftDrawer";
import { DraftFloating } from "@/components/cv/drafts/DraftFloating";
import { DraftLangIcon } from "@/components/cv/language-drafts/DraftLangIcon";
import { DraftLangPills } from "@/components/cv/language-drafts/DraftLangPills";
import { LanguageSwitcher } from "@/components/cv/LanguageSwitcher";
import { useLangDraft, toDraftProps, type DraftLangProps } from "@/components/cv/language-drafts/useLangDraft";
import { CVShell } from "@/components/cv/editor/cv-shell";
import { Fragment } from "react";
import { type CVData } from "@/lib/cv-types";
import { THEMES, type ThemeId } from "@/lib/themes";
import { APP_NAME } from "@/lib/app";
import { ArrowLeft, RotateCcw, MousePointerClick, Languages, Palette } from "lucide-react";

const DRAFT_META = [
  {
    id: "inline",
    name: "A · Split inline editor",
    desc: "Hover any section to reveal its Edit button. Clicking it splits the section into a live preview on the left and the form on the right — you see every change as you type.",
    hints: [
      "Hover a section header → Edit button",
      "Section opens side-by-side: preview + form",
      "List sections get a dashed “+ Add entry” button",
    ],
  },
  {
    id: "drawer",
    name: "B · Toolbar + drawer",
    desc: "Every section gets a slim toolbar with explicit Edit and Add buttons. The form slides in from the right, leaving the CV fully visible for reference.",
    hints: [
      "Slim toolbar above every section",
      "Edit opens a right-side drawer with the form",
      "Add creates an entry and opens it in the drawer",
    ],
  },
  {
    id: "floating",
    name: "C · Floating popover",
    desc: "A small Edit button sits on every section header. Click it for a compact popover form that floats over the content, plus inline “+ Add” chips to grow lists directly in the CV.",
    hints: [
      "Always-visible Edit button on each header",
      "Compact popover form, scrollable for lists",
      "“+ Add” chips append entries straight into the CV",
    ],
  },
];

const LANG_DRAFT_META = [
  {
    id: "lang-menu",
    name: "A · Compact dropdown",
    desc: "One small button showing the active language. Clicking it opens a menu to switch languages and to add, rename, or delete a CV version. Slimmest vertical footprint.",
    hints: [
      "Single row, ~32px tall (was ~90px)",
      "Switch + all management in one menu",
      "Shows active language at a glance",
    ],
  },
  {
    id: "lang-icon",
    name: "B · Icon only",
    desc: "Just the languages icon. The most minimal option — active language is shown in a tooltip. Perfect when space is extremely tight.",
    hints: [
      "Narrowest possible trigger",
      "Tooltip shows the active language",
      "All actions live in the popover menu",
    ],
  },
  {
    id: "lang-pills",
    name: "C · Inline pills",
    desc: "Every language is a small pill in a single row, so switching is one click with no menu. A tiny gear opens add / rename / delete.",
    hints: [
      "One click to switch languages",
      "Single row, still compact",
      "Gear menu for management",
    ],
  },
];

const MockTopbar = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center gap-2 border-b border-border bg-background px-4 py-2">
    <span className="text-xs font-medium text-muted-foreground">Drafts</span>
    {children}
    <div className="ml-auto flex items-center gap-1 text-[10px] text-muted-foreground">
      <span>Print</span>
      <span>·</span>
      <span>JSON</span>
      <span>·</span>
      <span>PDF</span>
    </div>
  </div>
);

/** Feeds a language draft component with mock state, like the /drafts page. */
const LangDraftDemo = ({ Draft }: { Draft: ComponentType<DraftLangProps> }) => {
  const m = useLangDraft();
  return <Draft {...toDraftProps(m)} />;
};

/** Renders a full resume in a given color theme, showcasing its curated section designs. */
const ThemeCV = ({ data, theme }: { data: CVData; theme: ThemeId }) => {
  const t = THEMES.find((x) => x.id === theme)!;
  return (
    <div
      data-theme={theme}
      className="cv-theme overflow-hidden rounded-xl border border-border bg-background shadow-sm"
    >
      <CVShell
        data={data}
        hideEmpty
        designs={t.showcase}
        wrap={(meta, content) => <Fragment key={meta.key}>{content}</Fragment>}
      />
    </div>
  );
};

const ThemeMetaCard = ({ id }: { id: ThemeId }) => {
  const t = THEMES.find((x) => x.id === id)!;
  return (
    <div className="rounded-lg border border-border bg-card p-3 text-xs">
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="font-semibold">{t.name}</span>
        <span className="flex gap-1">
          {t.swatches.map((c) => (
            <span key={c} className="h-3 w-3 rounded-full border border-border" style={{ background: c }} />
          ))}
        </span>
      </div>
      <div className="mb-1 text-[11px] font-medium text-accent">{t.tagline}</div>
      <p className="mb-2 text-muted-foreground">{t.desc}</p>
      <ul className="space-y-0.5 text-muted-foreground">
        {t.notes.map((note) => (
          <li key={note} className="flex gap-1.5">
            <MousePointerClick className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const DesignDrafts = () => {
  const { data, helpers, reset } = useDraftData();

  useEffect(() => {
    document.title = `Design drafts — ${APP_NAME}`;
  }, []);

  return (
    <div className="min-h-screen bg-muted/30 print:hidden">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-3">
          <div className="flex items-center gap-3">
            <Button asChild size="sm" variant="ghost">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" /> Editor
              </Link>
            </Button>
            <div>
              <h1 className="text-sm font-semibold">CV editor — design drafts</h1>
              <p className="text-xs text-muted-foreground">
                Three live prototypes for editing sections directly in the CV. All edits are demo-only.
              </p>
            </div>
          </div>
          <Button size="sm" variant="outline" onClick={reset}>
            <RotateCcw className="h-3.5 w-3.5" /> Reset demo
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-6">
        <div className="mb-6 grid gap-3 md:grid-cols-3">
          {DRAFT_META.map((d) => (
            <div key={d.id} className="rounded-lg border border-border bg-card p-3 text-xs">
              <div className="mb-1 font-semibold">{d.name}</div>
              <p className="mb-2 text-muted-foreground">{d.desc}</p>
              <ul className="space-y-0.5 text-muted-foreground">
                {d.hints.map((hint) => (
                  <li key={hint} className="flex gap-1.5">
                    <MousePointerClick className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                    {hint}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Tabs defaultValue="inline" className="w-full">
          <TabsList className="mb-4">
            {DRAFT_META.map((d) => (
              <TabsTrigger key={d.id} value={d.id}>{d.name}</TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="inline" className="rounded-xl border border-border bg-background shadow-sm">
            <DraftInline data={data} h={helpers} />
          </TabsContent>
          <TabsContent value="drawer" className="rounded-xl border border-border bg-background shadow-sm">
            <DraftDrawer data={data} h={helpers} />
          </TabsContent>
          <TabsContent value="floating" className="rounded-xl border border-border bg-background shadow-sm">
            <DraftFloating data={data} h={helpers} />
          </TabsContent>
        </Tabs>

        <section className="mt-12">
          <div className="mb-4">
            <h2 className="flex items-center gap-1.5 text-sm font-semibold">
              <Languages className="h-4 w-4 text-primary" /> Topbar language switcher — compact drafts
            </h2>
            <p className="text-xs text-muted-foreground">
              The current switcher is a two-row block (~90px tall). These versions fit in one row (~32px).
            </p>
          </div>

          <div className="mb-6 grid gap-3 md:grid-cols-3">
            {LANG_DRAFT_META.map((d) => (
              <div key={d.id} className="rounded-lg border border-border bg-card p-3 text-xs">
                <div className="mb-1 font-semibold">{d.name}</div>
                <p className="mb-2 text-muted-foreground">{d.desc}</p>
                <ul className="space-y-0.5 text-muted-foreground">
                  {d.hints.map((hint) => (
                    <li key={hint} className="flex gap-1.5">
                      <MousePointerClick className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                      {hint}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Tabs defaultValue="lang-menu" className="w-full">
            <TabsList className="mb-4">
              {LANG_DRAFT_META.map((d) => (
                <TabsTrigger key={d.id} value={d.id}>{d.name}</TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="lang-menu" className="rounded-xl border border-border bg-background shadow-sm">
              <MockTopbar><LangDraftDemo Draft={LanguageSwitcher} /></MockTopbar>
            </TabsContent>
            <TabsContent value="lang-icon" className="rounded-xl border border-border bg-background shadow-sm">
              <MockTopbar><LangDraftDemo Draft={DraftLangIcon} /></MockTopbar>
            </TabsContent>
            <TabsContent value="lang-pills" className="rounded-xl border border-border bg-background shadow-sm">
              <MockTopbar><LangDraftDemo Draft={DraftLangPills} /></MockTopbar>
            </TabsContent>
          </Tabs>
        </section>

        <section className="mt-12">
          <div className="mb-4">
            <h2 className="flex items-center gap-1.5 text-sm font-semibold">
              <Palette className="h-4 w-4 text-primary" /> Resume themes — design drafts
            </h2>
            <p className="text-xs text-muted-foreground">
              Eight color themes re-skin the whole resume via `data-theme` tokens (picked from a selector in the
              topbar). Section layouts are independent now — each section has its own design picker in the editor
              (e.g. skills as bars, chips, or a dot list). These tabs showcase each palette with a curated combo of
              section designs.
            </p>
          </div>

          <div className="mb-6 grid gap-3 md:grid-cols-4">
            {THEMES.map((t) => (
              <ThemeMetaCard key={t.id} id={t.id} />
            ))}
          </div>

          <Tabs defaultValue="indigo" className="w-full">
            <TabsList className="mb-4">
              {THEMES.map((t) => (
                <TabsTrigger key={t.id} value={t.id}>{t.name}</TabsTrigger>
              ))}
            </TabsList>
            {THEMES.map((t) => (
              <TabsContent
                key={t.id}
                value={t.id}
                className="rounded-xl border border-border bg-background shadow-sm"
              >
                <ThemeCV data={data} theme={t.id} />
              </TabsContent>
            ))}
          </Tabs>
        </section>
      </main>
    </div>
  );
};

export default DesignDrafts;
