import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AppTopbar } from "@/components/layout/AppTopbar";
import { ArrowLeft, Check, Eye, Layers, Palette, Type, SlidersHorizontal, PenLine } from "lucide-react";
import { APP_NAME } from "@/lib/app";
import { THEMES } from "@/lib/themes";
import { SECTION_DESIGN_OPTIONS } from "@/lib/section-designs";
import { DRAWER_VARIANTS, type DrawerVariant, DEFAULT_DRAWER_VARIANT } from "@/lib/drawer-variants";
import { cn } from "@/lib/utils";
import { toast as sonnerToast } from "sonner";

function DrawerPreview({ variant }: { variant: DrawerVariant }) {
  const content = (
    <>
      <div className="h-2 w-16 rounded bg-foreground/70" />
      <div className="h-5 w-12 rounded bg-primary" />
    </>
  );
  if (variant === "tabs") {
    return (
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="flex items-center justify-between gap-2 border-b bg-muted/30 px-3 py-2">{content}</div>
        <div className="flex gap-1 border-b bg-card px-2 py-1.5">
          <div className="flex-1 rounded bg-secondary py-1 text-center font-mono text-[10px]">Design</div>
          <div className="flex-1 rounded bg-primary py-1 text-center font-mono text-[10px] text-primary-foreground">Content</div>
        </div>
        <div className="p-3">
          <div className="h-2 w-20 rounded bg-foreground/60" />
          <div className="mt-2 space-y-1">
            <div className="h-8 rounded border bg-secondary/30" />
            <div className="h-8 rounded border bg-secondary/30" />
          </div>
        </div>
      </div>
    );
  }
  if (variant === "flat") {
    return (
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="flex items-center justify-between gap-2 border-b bg-muted/30 px-3 py-2">{content}</div>
        <div className="p-3">
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="h-3 w-3 text-primary" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Design</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="mt-2 h-6 rounded border bg-secondary/30" />
          <div className="mt-3 flex items-center gap-1.5 border-t pt-3">
            <PenLine className="h-3 w-3 text-primary" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Content</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="mt-2 space-y-1">
            <div className="h-7 rounded border" />
            <div className="h-7 rounded border" />
          </div>
        </div>
      </div>
    );
  }
  if (variant === "compact") {
    return (
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="flex items-center justify-between gap-2 border-b bg-muted/30 px-3 py-2">{content}</div>
        <div className="p-2">
          <div className="rounded-lg border bg-card p-2">
            <div className="flex items-center gap-1">
              <SlidersHorizontal className="h-3 w-3 text-primary" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Design</span>
            </div>
            <div className="mt-1.5 h-5 rounded bg-secondary/50" />
          </div>
          <div className="mt-2 rounded-lg border bg-card p-2">
            <div className="flex items-center gap-1">
              <PenLine className="h-3 w-3 text-primary" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Content</span>
            </div>
            <div className="mt-1.5 h-6 rounded border" />
          </div>
        </div>
      </div>
    );
  }
  if (variant === "glass") {
    return (
      <div className="overflow-hidden rounded-xl border border-white/40 bg-white/70 shadow-[0_8px_24px_hsl(var(--foreground)/0.08)] backdrop-blur">
        <div className="flex items-center justify-between gap-2 border-b border-white/30 bg-white/40 px-3 py-2">{content}</div>
        <div className="bg-gradient-to-b from-white/60 to-white/20 p-3 backdrop-blur-sm">
          <div className="rounded-xl border border-white/40 bg-white/70 p-3 shadow-sm backdrop-blur">
            <div className="h-2 w-12 rounded bg-primary/80" />
            <div className="mt-2 h-6 rounded bg-secondary/50" />
          </div>
          <div className="mt-2 rounded-xl border border-white/40 bg-white/70 p-3 shadow-sm backdrop-blur">
            <div className="h-2 w-14 rounded bg-foreground/70" />
            <div className="mt-2 h-6 rounded border" />
          </div>
        </div>
      </div>
    );
  }
  if (variant === "timeline") {
    return (
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="flex items-center justify-between gap-2 border-b bg-muted/30 px-3 py-2">{content}</div>
        <div className="relative p-3 pl-8">
          <div className="absolute left-[16px] top-3 h-[calc(100%-24px)] w-px bg-gradient-to-b from-primary via-primary/40 to-transparent" />
          <div className="relative">
            <div className="absolute -left-[22px] flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-sm ring-2 ring-background">1</div>
            <div className="rounded-xl border bg-card p-2.5 shadow-sm">
              <div className="h-2 w-12 rounded bg-primary/80" />
              <div className="mt-1.5 h-5 rounded bg-secondary/50" />
            </div>
          </div>
          <div className="relative mt-3">
            <div className="absolute -left-[22px] flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-card shadow-sm ring-2 ring-background">2</div>
            <div className="rounded-xl border bg-card p-2.5 shadow-sm">
              <div className="h-2 w-14 rounded bg-foreground/70" />
              <div className="mt-1.5 h-6 rounded border" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (variant === "bento") {
    return (
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="flex items-center justify-between gap-2 border-b bg-muted/30 px-3 py-2">{content}</div>
        <div className="bg-muted/20 p-3">
          <div className="rounded-xl border bg-card p-2.5 shadow-sm">
            <div className="h-2 w-12 rounded bg-primary/80" />
            <div className="mt-1.5 h-5 rounded bg-secondary/50" />
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="rounded-xl border bg-card p-2">
              <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Columns</div>
              <div className="mt-1 h-4 rounded bg-secondary" />
            </div>
            <div className="rounded-xl border bg-card p-2">
              <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Preview</div>
              <div className="mt-1 h-8 rounded-lg bg-gradient-primary opacity-80" />
            </div>
          </div>
          <div className="mt-2 rounded-xl border bg-card p-2.5 shadow-sm">
            <div className="h-2 w-14 rounded bg-foreground/70" />
            <div className="mt-1.5 h-6 rounded border" />
          </div>
        </div>
      </div>
    );
  }
  if (variant === "command") {
    return (
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="flex items-center justify-between gap-2 border-b bg-muted/30 px-3 py-2">{content}</div>
        <div className="border-b bg-card/80 p-2 backdrop-blur">
          <div className="flex items-center gap-2 rounded-lg border bg-muted/50 px-2.5 py-1.5">
            <PenLine className="h-3 w-3 text-muted-foreground" />
            <div className="h-2 flex-1 rounded bg-muted-foreground/20" />
            <span className="rounded border bg-card px-1 py-0.5 font-mono text-[9px] text-muted-foreground">⌘K</span>
          </div>
        </div>
        <div className="p-3">
          <div className="h-2 w-12 rounded bg-primary/80" />
          <div className="mt-2 h-6 rounded bg-secondary/50" />
          <div className="mt-2 h-6 rounded border" />
        </div>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <div className="flex items-center justify-between gap-2 border-b bg-muted/30 px-3 py-2">{content}</div>
      <div className="p-3">
        <div className="rounded-xl border bg-card p-3 shadow-sm">
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="h-3 w-3 text-primary" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Design</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="mt-2 h-6 rounded bg-secondary/50" />
        </div>
        <div className="mt-2 rounded-xl border bg-card p-3 shadow-sm">
          <div className="flex items-center gap-1.5">
            <PenLine className="h-3 w-3 text-primary" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Content</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="mt-2 h-6 rounded border" />
        </div>
      </div>
    </div>
  );
}

export const DesignDrafts = () => {
  const [activeDrawer, setActiveDrawer] = useState<DrawerVariant>(DEFAULT_DRAWER_VARIANT);
  useEffect(() => {
    document.title = `Design drafts — ${APP_NAME}`;
    const saved = localStorage.getItem("cv-builder:drawer-variant") as DrawerVariant | null;
    if (saved && saved in DRAWER_VARIANTS) setActiveDrawer(saved);
  }, []);

  const setDrawerVariant = (v: DrawerVariant) => {
    localStorage.setItem("cv-builder:drawer-variant", v);
    setActiveDrawer(v);
    sonnerToast.success(`Drawer set to "${DRAWER_VARIANTS[v].label}" — open any section to see it`);
  };

  return (
    <div className="min-h-screen bg-muted/30 print:hidden">
      <AppTopbar
        left={
          <div className="flex items-center gap-3">
            <Button asChild size="sm" variant="ghost">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" /> Editor
              </Link>
            </Button>
            <div>
              <h1 className="text-sm font-semibold leading-none">Design drafts</h1>
              <p className="text-xs text-muted-foreground">Themes and per-section layouts — explore and pick</p>
            </div>
          </div>
        }
        right={
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/resume-builder">
              <Eye className="h-4 w-4" /> Open builder
            </Link>
          </Button>
        }
      />

      <main className="page-container py-8">
        {/* Drawer variants — the edit drawer you asked to compare */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground shadow-sm">
            <SlidersHorizontal className="h-3 w-3" /> Edit drawer
          </div>
          <h2 className="mt-3 text-2xl font-[800] tracking-[-0.03em]">Drawer variants</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Try the 4 drawer layouts. Click <span className="font-medium text-foreground">Use this</span> — it saves to{" "}
            <code className="rounded bg-secondary px-1 py-0.5 font-mono text-xs">localStorage</code> and the builder picks it up on next open.
            Current:{" "}
            <span className="rounded-full bg-foreground px-2 py-0.5 font-mono text-xs text-card">{DRAWER_VARIANTS[activeDrawer].label}</span>
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(Object.entries(DRAWER_VARIANTS) as [DrawerVariant, (typeof DRAWER_VARIANTS)[DrawerVariant]][]).map(([id, v]) => {
            const isActive = id === activeDrawer;
            return (
              <div
                key={id}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all",
                  isActive ? "border-primary shadow-[0_8px_24px_hsl(var(--primary)/0.12)]" : "hover:border-primary/30 hover:shadow-md"
                )}
              >
                {isActive && (
                  <div className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground shadow-sm">
                    <Check className="h-3 w-3" /> Active
                  </div>
                )}
                <div className="p-3">
                  <DrawerPreview variant={id} />
                </div>
                <div className="flex flex-1 flex-col p-4 pt-0">
                  <h3 className="text-sm font-semibold leading-none">{v.label}</h3>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-muted-foreground">{v.desc}</p>
                  <Button
                    size="sm"
                    variant={isActive ? "secondary" : "default"}
                    className="mt-3 w-full"
                    onClick={() => setDrawerVariant(id)}
                    disabled={isActive}
                  >
                    {isActive ? "Active" : "Use this"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Themes */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground shadow-sm">
            <Palette className="h-3 w-3" /> Themes
          </div>
          <h2 className="mt-3 text-2xl font-[800] tracking-[-0.03em]">Color themes</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Every theme re-skins the whole resume via <code className="rounded bg-secondary px-1 py-0.5 font-mono text-xs">data-theme</code> tokens.
            Try them in the builder’s theme switcher.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {THEMES.map((t) => (
            <div key={t.id} data-theme={t.id} className="cv-theme group overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:shadow-md">
              <div className="h-2 w-full bg-gradient-primary" />
              <div className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold" style={{ fontFamily: "var(--theme-heading)" }}>
                    {t.name}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{t.id}</span>
                </div>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{t.tagline}</p>
                <div className="mt-3 flex gap-1.5">
                  {t.swatches.map((c) => (
                    <span key={c} className="h-6 w-6 rounded-full border shadow-sm" style={{ background: c }} title={c} />
                  ))}
                </div>
                <ul className="mt-3 space-y-1 text-xs leading-5 text-muted-foreground">
                  {t.notes.slice(0, 2).map((n) => (
                    <li key={n} className="flex gap-1.5">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Section designs */}
        <div className="mx-auto mt-12 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground shadow-sm">
            <Layers className="h-3 w-3" /> Section designs
          </div>
          <h2 className="mt-3 text-2xl font-[800] tracking-[-0.03em]">Per-section layouts</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Each section has its own variants. Change them per-section in the edit drawer when a section is open.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {(Object.entries(SECTION_DESIGN_OPTIONS) as [keyof typeof SECTION_DESIGN_OPTIONS, (typeof SECTION_DESIGN_OPTIONS)[keyof typeof SECTION_DESIGN_OPTIONS]][]).map(
            ([section, options]) => (
              <div key={section} className="rounded-2xl border bg-card p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <Type className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold capitalize">{section}</h3>
                  <span className="ml-auto rounded-full bg-secondary px-2 py-0.5 font-mono text-xs text-muted-foreground">
                    {options.length} variants
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {options.map((o) => (
                    <span
                      key={o.id}
                      className="inline-flex items-center gap-1 rounded-full border bg-secondary/50 px-2.5 py-1 text-xs"
                      title={o.desc}
                    >
                      <span className="font-medium">{o.name}</span>
                      {o.group && <span className="font-mono text-[10px] text-muted-foreground">· {o.group}</span>}
                    </span>
                  ))}
                </div>
              </div>
            )
          )}
        </div>

        <div className="mt-8 rounded-xl border border-dashed bg-card/50 p-4 text-center text-xs text-muted-foreground">
          Open <Link to="/resume-builder" className="font-medium text-primary underline">/resume-builder</Link> →{" "}
          <span className="rounded border bg-secondary px-1.5 py-0.5 font-mono">Edit</span> on any section to try its designs live.
          Edit highlight is locked to <span className="font-medium text-foreground">dashed</span> (no background) to avoid clashing.
        </div>
      </main>
    </div>
  );
};

export default DesignDrafts;
