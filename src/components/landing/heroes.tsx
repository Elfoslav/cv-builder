import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn, scrollToId } from "@/lib/utils";
import {
  ArrowRight,
  BadgeDollarSign,
  ChevronDown,
  HardDrive,
  Layers,
  Lock,
  Monitor,
  Sparkles,
  UserX,
  Zap,
} from "lucide-react";

/* ------------------------------------------------------------------ *
 * Homepage hero (StripHero) and its shared pieces.
 * ------------------------------------------------------------------ */

function Badge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "inline-flex max-w-full flex-wrap items-center justify-center gap-1.5 rounded-full border bg-card/80 px-3 py-1.5 text-xs shadow-sm backdrop-blur sm:gap-2",
        className
      )}
    >
      <span className="flex h-5 shrink-0 items-center gap-1.5 rounded-full bg-gradient-primary px-2.5 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
        <Sparkles className="h-3 w-3" /> New
      </span>
      <span className="hidden h-3 w-px shrink-0 bg-border sm:block" />
      <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap font-mono text-[11px] tracking-wide text-muted-foreground">
        <HardDrive className="h-3 w-3 shrink-0" /> Local-first
      </span>
      <span className="h-3 w-px shrink-0 bg-border" />
      <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap font-mono text-[11px] tracking-wide text-muted-foreground">
        <UserX className="h-3 w-3 shrink-0" /> No account
      </span>
      <span className="h-3 w-px shrink-0 bg-border" />
      <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap font-mono text-[11px] tracking-wide text-muted-foreground">
        <BadgeDollarSign className="h-3 w-3 shrink-0" /> No paywall
      </span>
    </div>
  );
}

function Headline({ className }: { className?: string }) {
  return (
    <h1 className={cn("font-[800] leading-[0.9] tracking-[-0.04em]", className)}>
      <span className="block">Resumes that</span>
      <span className="block text-gradient-primary">don&apos;t look</span>
      <span className="block">like templates.</span>
    </h1>
  );
}

function Subcopy({ className }: { className?: string }) {
  return (
    <p className={cn("text-[17px] leading-7 text-muted-foreground", className)}>
      Pick a real theme, not just a color. Give every section its own layout — timeline, cards, bars, checks. What you see is
      what you export. All in your browser.
    </p>
  );
}

function Trust({ align = "start", className }: { align?: "start" | "center"; className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground",
        align === "center" && "justify-center",
        className
      )}
    >
      <span className="inline-flex items-center gap-1.5">
        <Lock className="h-3.5 w-3.5 text-terminal-green" /> No account
      </span>
      <span className="h-3 w-px bg-border" />
      <span className="inline-flex items-center gap-1.5">
        <Zap className="h-3.5 w-3.5 text-terminal-yellow" /> No paywall
      </span>
      <span className="h-3 w-px bg-border" />
      <span className="inline-flex items-center gap-1.5">
        <Layers className="h-3.5 w-3.5 text-terminal-cyan" /> No lock-in
      </span>
    </div>
  );
}

/** Shared multi-hue backdrop. */
function ColorBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-glow" />
      <div className="absolute inset-0 grid-bg opacity-[0.5]" />
      <div className="absolute -top-40 left-[12%] h-[440px] w-[440px] rounded-full bg-terminal-purple/20 blur-[90px]" />
      <div className="absolute -top-24 right-[8%] h-[420px] w-[420px] rounded-full bg-terminal-cyan/20 blur-[90px]" />
      <div className="absolute bottom-[-8rem] left-1/2 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-terminal-pink/15 blur-[90px]" />
    </div>
  );
}

/** A stylized "live editor + print-width preview" window — the hero product shot. */
function EditorWindow() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[28px] bg-gradient-primary opacity-15 blur-[30px]" />
      <div className="overflow-hidden rounded-2xl border bg-card shadow-[0_30px_80px_hsl(var(--foreground)/0.18)]">
        <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-terminal-pink/70" />
          <span className="h-3 w-3 rounded-full bg-terminal-yellow/80" />
          <span className="h-3 w-3 rounded-full bg-terminal-green/70" />
          <div className="ml-3 flex items-center gap-1.5 rounded-md border bg-card px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
            <Monitor className="h-3 w-3" /> resume-builder
          </div>
          <span className="ml-auto flex items-center gap-1.5 rounded-full bg-terminal-green/10 px-2 py-0.5 font-mono text-[9px] font-medium text-terminal-green">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-terminal-green motion-reduce:animate-none" /> live
          </span>
        </div>
        <div className="grid grid-cols-[1fr_1.1fr]">
          <div className="space-y-3 border-r bg-muted/20 p-4">
            <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Edit · Experience</div>
            <div className="space-y-2">
              <div className="rounded-lg border bg-card p-2.5">
                <div className="h-1.5 w-12 rounded bg-muted-foreground/40" />
                <div className="mt-1.5 h-2 w-24 rounded bg-foreground/70" />
              </div>
              <div className="rounded-lg border bg-card p-2.5">
                <div className="h-1.5 w-10 rounded bg-muted-foreground/40" />
                <div className="mt-1.5 h-2 w-20 rounded bg-foreground/60" />
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="rounded-full bg-primary px-2 py-0.5 text-[9px] font-medium text-primary-foreground">Timeline</span>
              <span className="rounded-full border bg-card px-2 py-0.5 text-[9px]">Cards</span>
              <span className="rounded-full border bg-card px-2 py-0.5 text-[9px]">Rows</span>
            </div>
          </div>
          <div data-theme="indigo" className="cv-theme relative">
            <div className="bg-background p-4">
              <div className="text-[13px] font-extrabold leading-none tracking-tight" style={{ fontFamily: "var(--theme-heading)" }}>
                Alex Rivera
              </div>
              <div className="text-[10px] font-medium text-primary">Product Designer</div>
              <div className="mt-3 space-y-2">
                <div className="rounded-lg border bg-card p-2.5">
                  <div className="h-2 w-24 rounded bg-foreground/80" />
                  <div className="mt-1 h-1 w-full rounded bg-muted" />
                  <div className="mt-1 h-1 w-4/5 rounded bg-muted" />
                </div>
                <div className="rounded-lg bg-secondary p-2.5">
                  <div className="font-mono text-[8px] font-bold uppercase tracking-widest text-muted-foreground">Skills</div>
                  <div className="mt-1.5 space-y-1">
                    <div className="h-1.5 rounded bg-primary" style={{ width: "88%" }} />
                    <div className="h-1.5 rounded bg-primary/70" style={{ width: "70%" }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute -bottom-2.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border bg-card px-2.5 py-1 text-[10px] font-medium shadow-md">
              <span className="h-1.5 w-1.5 rounded-full bg-terminal-green" /> print-width preview
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StripHero() {
  const toGallery = () => scrollToId("themes-gallery");

  return (
    <section className="relative flex min-h-[calc(100svh_-_3.5rem)] flex-col overflow-hidden border-b bg-gradient-to-b from-background via-background to-secondary/20">
      <ColorBackdrop />
      <div className="page-container flex flex-1 items-center py-12 lg:py-14">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* copy */}
          <div className="text-center lg:text-left">
            <Badge />
            <Headline className="mt-6 text-[2.5rem] leading-[1.02] sm:text-[3.2rem] lg:text-[3.9rem]" />
            <Subcopy className="mx-auto mt-5 max-w-[52ch] lg:mx-0" />
            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Button asChild size="lg" className="h-11 rounded-full px-7 text-[14px] shadow-glow">
                <Link to="/resume-builder">
                  Build your resume <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-11 rounded-full bg-card/80 px-6 backdrop-blur"
                onClick={() => scrollToId("features")}
              >
                How it&apos;s different
              </Button>
            </div>
            <Trust className="mt-8 justify-center border-t border-dashed pt-6 lg:justify-start" />
          </div>

          {/* product visual (desktop) */}
          <div className="relative hidden lg:block">
            <EditorWindow />
          </div>
        </div>
      </div>

      {/* scroll cue → theme gallery */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toGallery}
        aria-label="Scroll to the theme gallery"
        className="group relative mx-auto mb-6 flex flex-col items-center gap-1 rounded-full text-muted-foreground hover:text-foreground"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">Browse themes</span>
        <ChevronDown className="h-4 w-4 animate-bounce motion-reduce:animate-none" />
      </Button>
    </section>
  );
}
