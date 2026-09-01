import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MiniResume, SHOWCASE_THEMES } from "./shared";
import type { HeroVariant } from "@/lib/hero-variants";
import {
  ArrowRight,
  BadgeDollarSign,
  Check,
  ChevronDown,
  Eye,
  FileCheck2,
  HardDrive,
  Languages,
  Layers,
  Lock,
  Monitor,
  Palette,
  Sparkles,
  UserX,
  Zap,
} from "lucide-react";

/* ------------------------------------------------------------------ *
 * Shared hero content — identical message across every variant so the
 * switcher only changes layout & color treatment, never the value prop.
 * (Best practice: one clear headline, one dominant CTA, visible trust.)
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

function Ctas({ align = "start" }: { align?: "start" | "center" }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", align === "center" && "justify-center")}>
      <Button asChild size="lg" className="h-11 rounded-full px-7 text-[14px] shadow-glow">
        <Link to="/resume-builder">
          Build your resume
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
      <Button asChild size="lg" variant="outline" className="h-11 rounded-full bg-card/80 px-6 backdrop-blur">
        <Link to="#features">How it&apos;s different</Link>
      </Button>
    </div>
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

/** Shared multi-hue backdrop used by several variants. */
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

/* ------------------------------------------------------------------ *
 * 1. Fanned — split layout, fanned stack of themed resumes (the base)
 * ------------------------------------------------------------------ */
function FannedHero() {
  return (
    <section className="relative overflow-hidden">
      <ColorBackdrop />
      <div className="page-container">
        <div className="grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-24">
          <div className="relative">
            <Badge />
            <Headline className="mt-6 text-[2.6rem] sm:text-[3.4rem] lg:text-[4.15rem]" />
            <Subcopy className="mt-5 max-w-[52ch]" />
            <div className="mt-8">
              <Ctas />
            </div>
            <Trust className="mt-8 border-t border-dashed pt-6" />
          </div>

          <div className="relative hidden h-[560px] select-none lg:block">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute left-6 top-10 hidden -rotate-[8deg] opacity-90 xl:block">
                <MiniResume theme="minimal" name="Maya Chen" role="Backend Engineer" accent="Minimal" rotated="" />
              </div>
              <div className="absolute right-6 top-8 hidden rotate-[7deg] opacity-90 xl:block">
                <MiniResume theme="sunset" name="Jonah Park" role="Product Designer" accent="Sunset" rotated="" />
              </div>
              <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rotate-[-1deg]">
                <div className="relative">
                  <div className="pointer-events-none absolute -inset-3 -z-10 rounded-[20px] bg-gradient-primary opacity-25 blur-[18px]" />
                  <MiniResume theme="indigo" name="Alex Rivera" role="Product Designer" accent="Indigo" rotated="" />
                  <div className="pointer-events-none absolute -bottom-3 -right-3 flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-xs font-medium shadow-md">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-terminal-green" />
                    print-width preview
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border bg-card/90 px-3 py-1.5 text-xs shadow-sm backdrop-blur">
              <Monitor className="h-3.5 w-3.5 text-primary" />
              <span className="font-medium">Side-by-side editor</span>
              <span className="text-muted-foreground">— see changes live</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * 2. Spotlight — centered, one dominant CTA, a single hero resume
 * ------------------------------------------------------------------ */
function SpotlightHero() {
  return (
    <section className="relative overflow-hidden">
      <ColorBackdrop />
      <div className="page-container pb-4 pt-16 text-center sm:pt-20">
        <div className="mx-auto max-w-3xl">
          <Badge />
          <Headline className="mx-auto mt-7 text-[2.75rem] sm:text-[3.75rem] lg:text-[4.5rem]" />
          <Subcopy className="mx-auto mt-6 max-w-[48ch]" />
          <div className="mt-9">
            <Ctas align="center" />
          </div>
          <Trust align="center" className="mt-7" />
        </div>

        {/* single spotlighted resume */}
        <div className="relative mx-auto mt-14 flex h-[380px] max-w-md items-center justify-center sm:h-[440px]">
          <div className="pointer-events-none absolute inset-0 -z-10 mx-auto h-[320px] w-[320px] self-center rounded-full bg-gradient-primary opacity-20 blur-[60px]" />
          <MiniResume theme="indigo" name="Alex Rivera" role="Product Designer" accent="Indigo" rotated="rotate-[-1deg]" />
          <div className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border bg-card/90 px-3 py-1.5 text-xs font-medium shadow-md backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-terminal-green" />
            print-width preview
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * 3. Strip — headline over a colorful row of themed resume previews
 * ------------------------------------------------------------------ */
function StripPreview({ theme, accent, name, role }: { theme: string; accent: string; name: string; role: string }) {
  return (
    <div data-theme={theme} className="cv-theme w-[220px] shrink-0 overflow-hidden rounded-2xl border bg-card shadow-[0_16px_40px_hsl(var(--foreground)/0.14)]">
      <div className="bg-background p-4">
        <div className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">Resume — {accent}</div>
        <div className="mt-1 text-[13px] font-extrabold leading-none tracking-tight" style={{ fontFamily: "var(--theme-heading)" }}>
          {name}
        </div>
        <div className="text-[10px] font-medium text-primary">{role}</div>
        <div className="mt-3 h-px w-full bg-border" />
        <div className="mt-3 space-y-2">
          <div className="rounded-lg border bg-card p-2">
            <div className="h-1.5 w-16 rounded bg-foreground/75" />
            <div className="mt-1 h-1 w-full rounded bg-muted" />
          </div>
          <div className="rounded-lg bg-secondary p-2">
            <div className="space-y-1">
              <div className="h-1.5 rounded bg-primary" style={{ width: "85%" }} />
              <div className="h-1.5 rounded bg-primary/60" style={{ width: "60%" }} />
            </div>
          </div>
        </div>
      </div>
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
  const toGallery = () =>
    document.getElementById("themes-gallery")?.scrollIntoView({ behavior: "smooth", block: "start" });

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
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth", block: "start" })}
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
      <button
        onClick={toGallery}
        aria-label="Scroll to the theme gallery"
        className="group relative mx-auto mb-6 flex flex-col items-center gap-1 text-muted-foreground transition hover:text-foreground"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">Browse themes</span>
        <ChevronDown className="h-4 w-4 animate-bounce motion-reduce:animate-none" />
      </button>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * 4a. Strip Left — left-aligned headline + buttons
 * ------------------------------------------------------------------ */
function StripLeftHero() {
  return (
    <section className="relative overflow-hidden">
      <ColorBackdrop />
      <div className="page-container pb-4 pt-16 sm:pt-20">
        <div className="max-w-3xl">
          <Badge />
          <Headline className="mt-7 text-[2.6rem] sm:text-[3.5rem] lg:text-[4.15rem]" />
          <Subcopy className="mt-4 max-w-[46ch]" />
          <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-11 rounded-full px-7 shadow-glow">
              <Link to="/resume-builder">
                Build your resume <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="h-11 rounded-full px-6"
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            >
              How it&apos;s different <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <Trust className="mt-6" />
        </div>
      </div>
      <div className="relative mt-8 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-28" />
        <div className="group flex w-max animate-[marquee_28s_linear_infinite] items-start gap-5 py-2 will-change-transform hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[...SHOWCASE_THEMES, ...SHOWCASE_THEMES].map((t, i) => (
            <div key={`${t.theme}-${i}-left`} className={cn(i % 2 === 0 ? "translate-y-1" : "-translate-y-1")}>
              <StripPreview theme={t.theme} accent={t.accent} name={t.name} role={t.role} />
            </div>
          ))}
        </div>
        <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * 4b. Strip Split — copy left, two previews right
 * ------------------------------------------------------------------ */
function StripSplitHero() {
  return (
    <section className="relative overflow-hidden">
      <ColorBackdrop />
      <div className="page-container py-14 sm:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.9fr] lg:gap-10">
          <div>
            <Badge />
            <Headline className="mt-6 text-[2.5rem] sm:text-[3.2rem] lg:text-[3.6rem]" />
            <Subcopy className="mt-4 max-w-[48ch]" />
            <div className="mt-6 flex flex-col gap-3">
              <Button asChild size="lg" className="h-11 w-fit rounded-full px-7 shadow-glow">
                <Link to="/resume-builder">
                  Build your resume <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-11 w-fit rounded-full bg-card px-6"
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth", block: "start" })}
              >
                How it&apos;s different
              </Button>
            </div>
            <Trust className="mt-6" />
          </div>
          <div className="relative hidden grid-cols-2 gap-4 lg:grid">
            <div className="space-y-4">
              <StripPreview theme="indigo" accent="Indigo" name="Alex Rivera" role="Product Designer" />
              <StripPreview theme="forest" accent="Forest" name="Maya Chen" role="Backend Engineer" />
            </div>
            <div className="space-y-4 pt-6">
              <StripPreview theme="sunset" accent="Sunset" name="Jonah Park" role="Product Designer" />
              <StripPreview theme="minimal" accent="Minimal" name="Sam Lee" role="Data Analyst" />
            </div>
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden border-t bg-muted/20 py-2">
        <div className="flex w-max animate-[marquee_40s_linear_infinite] gap-5 will-change-transform hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[...SHOWCASE_THEMES, ...SHOWCASE_THEMES].map((t, i) => (
            <div key={`${t.theme}-${i}-split-strip`} className="opacity-60">
              <div data-theme={t.theme} className="cv-theme flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs shadow-sm">
                <span className="h-2 w-2 rounded-full bg-primary" /> {t.accent}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * 4c. Strip Minimal — thin type, single CTA, no trust row
 * ------------------------------------------------------------------ */
function StripMinimalHero() {
  return (
    <section className="relative overflow-hidden">
      <ColorBackdrop />
      <div className="page-container py-20 text-center sm:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Strip — minimal</div>
          <h1 className="mx-auto mt-4 max-w-2xl text-[2.7rem] font-[300] leading-[0.95] tracking-[-0.03em] sm:text-[3.4rem]">
            Resumes that don&apos;t look like templates.
          </h1>
          <p className="mx-auto mt-4 max-w-[44ch] text-[15px] leading-6 text-muted-foreground">
            Pick a theme. Pick a layout per section. Export is pixel-perfect.
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild size="lg" className="h-11 rounded-full px-8 shadow-glow">
              <Link to="/resume-builder">
                Build your resume <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden py-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-28" />
        <div className="flex w-max animate-[marquee_36s_linear_infinite] gap-6 py-2 will-change-transform hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[...SHOWCASE_THEMES, ...SHOWCASE_THEMES].map((t, i) => (
            <div key={`${t.theme}-${i}-minimal`} className="opacity-90">
              <StripPreview theme={t.theme} accent={t.accent} name={t.name} role={t.role} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * 4. Editor — product shot: the live editor + print-width preview
 * ------------------------------------------------------------------ */
function EditorHero() {
  return (
    <section className="relative overflow-hidden">
      <ColorBackdrop />
      <div className="page-container">
        <div className="grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:py-24">
          <div className="relative">
            <Badge />
            <Headline className="mt-6 text-[2.5rem] sm:text-[3.3rem] lg:text-[3.9rem]" />
            <Subcopy className="mt-5 max-w-[50ch]" />
            <div className="mt-8">
              <Ctas />
            </div>
            <Trust className="mt-8 border-t border-dashed pt-6" />
          </div>

          {/* stylized editor window */}
          <div className="relative">
            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[28px] bg-gradient-primary opacity-15 blur-[30px]" />
            <div className="overflow-hidden rounded-2xl border bg-card shadow-[0_30px_80px_hsl(var(--foreground)/0.18)]">
              {/* window chrome */}
              <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-2.5">
                <span className="h-3 w-3 rounded-full bg-terminal-pink/70" />
                <span className="h-3 w-3 rounded-full bg-terminal-yellow/80" />
                <span className="h-3 w-3 rounded-full bg-terminal-green/70" />
                <div className="ml-3 flex items-center gap-1.5 rounded-md border bg-card px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
                  <Monitor className="h-3 w-3" /> resume-builder
                </div>
                <span className="ml-auto flex items-center gap-1.5 rounded-full bg-terminal-green/10 px-2 py-0.5 font-mono text-[9px] font-medium text-terminal-green">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-terminal-green" /> live
                </span>
              </div>
              <div className="grid grid-cols-[1fr_1.1fr]">
                {/* editor drawer */}
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
                {/* live print-width preview */}
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
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * 5. Gradient — bold full-bleed color wash, glass headline card
 * ------------------------------------------------------------------ */
function GradientHero() {
  return (
    <section className="relative overflow-hidden bg-foreground text-card">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-24 h-[520px] w-[520px] rounded-full bg-terminal-purple/40 blur-[100px]" />
        <div className="absolute -top-16 right-[-6rem] h-[480px] w-[480px] rounded-full bg-terminal-cyan/35 blur-[100px]" />
        <div className="absolute bottom-[-10rem] left-1/3 h-[440px] w-[440px] rounded-full bg-terminal-pink/30 blur-[100px]" />
      </div>

      <div className="page-container relative py-20 text-center sm:py-28">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-card/20 bg-card/10 px-3 py-1.5 text-xs backdrop-blur">
          <span className="flex h-5 items-center gap-1.5 rounded-full bg-card px-2.5 text-[10px] font-bold uppercase tracking-widest text-foreground">
            <Sparkles className="h-3 w-3" /> New
          </span>
          <span className="font-mono text-[11px] tracking-wide text-card/70">8 themes • 30+ section designs • print-perfect</span>
        </div>

        <h1 className="mx-auto mt-7 max-w-4xl text-[2.9rem] font-[800] leading-[0.95] tracking-[-0.04em] sm:text-[4rem] lg:text-[4.75rem]">
          <span className="block">Resumes that</span>
          <span className="block bg-gradient-to-r from-terminal-cyan via-card to-terminal-pink bg-clip-text text-transparent">don&apos;t look</span>
          <span className="block">like templates.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-[46ch] text-[17px] leading-7 text-card/75">
          Pick a real theme, not just a color. Give every section its own layout. What you see is what you export — all in your browser.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="h-12 rounded-full bg-card px-8 text-[14px] text-foreground hover:bg-card/90">
            <Link to="/resume-builder">
              Build your resume
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-card/25 bg-transparent px-7 text-card hover:bg-card/10 hover:text-card">
            <Link to="#features">How it&apos;s different</Link>
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-widest text-card/60">
          <span className="inline-flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5" /> No account
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5" /> No paywall
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5" /> No lock-in
          </span>
        </div>

        {/* floating theme chips */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          {["indigo", "sunset", "ocean", "forest", "earthy", "minimal", "slate", "classic"].map((t) => (
            <span key={t} data-theme={t} className="cv-theme inline-flex items-center gap-2 rounded-full border border-card/20 bg-card/10 px-3 py-1.5 text-xs capitalize text-card backdrop-blur">
              <span className="h-3 w-3 rounded-full bg-primary" /> {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * 6. Airy — single column, big whitespace, calm
 * ------------------------------------------------------------------ */
function AiryHero() {
  return (
    <section className="relative overflow-hidden">
      <ColorBackdrop />
      <div className="page-container py-16 text-center sm:py-20">
        <div className="mx-auto max-w-3xl">
          <Badge />
          <Headline className="mx-auto mt-7 text-[2.8rem] sm:text-[3.6rem] lg:text-[4rem]" />
          <Subcopy className="mx-auto mt-4 max-w-[48ch]" />
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Ctas align="center" />
          </div>
          <Trust align="center" className="mt-6 justify-center" />
        </div>
        <div className="relative mx-auto mt-12 max-w-[560px]">
          <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[24px] bg-gradient-primary opacity-10 blur-2xl" />
          <MiniResume theme="indigo" name="Alex Rivera" role="Product Designer" accent="Indigo" rotated="rotate-[-1deg]" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * 7. Bento — 3 large cards, curated
 * ------------------------------------------------------------------ */
function BentoHero() {
  return (
    <section className="relative overflow-hidden">
      <ColorBackdrop />
      <div className="page-container py-14 text-center sm:py-16">
        <div className="mx-auto max-w-3xl">
          <Badge />
          <Headline className="mx-auto mt-6 text-[2.7rem] sm:text-[3.5rem]" />
          <Subcopy className="mx-auto mt-4 max-w-[52ch]" />
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Ctas align="center" />
          </div>
        </div>
        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border bg-card p-5 text-left shadow-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Palette className="h-4 w-4" />
            </div>
            <h3 className="mt-3 text-sm font-semibold">Real themes</h3>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">Every token changes.</p>
          </div>
          <div className="rounded-2xl border bg-card p-5 text-left shadow-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-foreground">
              <Layers className="h-4 w-4" />
            </div>
            <h3 className="mt-3 text-sm font-semibold">Per-section</h3>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">Timeline, cards, bars.</p>
          </div>
          <div className="rounded-2xl border bg-card p-5 text-left shadow-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <FileCheck2 className="h-4 w-4" />
            </div>
            <h3 className="mt-3 text-sm font-semibold">Print-perfect</h3>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">What you see is what prints.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * 8. Focus — alternating editorial rows
 * ------------------------------------------------------------------ */
function FocusHero() {
  return (
    <section className="relative overflow-hidden">
      <ColorBackdrop />
      <div className="page-container py-14 sm:py-16">
        <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-2">
          <div>
            <Badge />
            <Headline className="mt-6 text-[2.6rem] sm:text-[3.4rem]" />
            <Subcopy className="mt-4 max-w-[50ch]" />
            <div className="mt-7">
              <Ctas />
            </div>
            <Trust className="mt-6" />
          </div>
          <div className="relative mx-auto w-full max-w-[420px] lg:mx-0">
            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[24px] bg-gradient-primary opacity-15 blur-2xl" />
            <MiniResume theme="indigo" name="Alex Rivera" role="Product Designer" accent="Indigo" rotated="rotate-[-1deg]" />
          </div>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Languages className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-medium">Multi-language</div>
              <div className="text-xs text-muted-foreground">One CV, many exports</div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Lock className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-medium">Local-first</div>
              <div className="text-xs text-muted-foreground">No account, private</div>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Eye className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-medium">Live preview</div>
              <div className="text-xs text-muted-foreground">Side-by-side editing</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const HERO_COMPONENTS: Record<HeroVariant, () => JSX.Element> = {
  fanned: FannedHero,
  spotlight: SpotlightHero,
  strip: StripHero,
  "strip-left": StripLeftHero,
  "strip-split": StripSplitHero,
  "strip-minimal": StripMinimalHero,
  editor: EditorHero,
  gradient: GradientHero,
  airy: AiryHero,
  bento: BentoHero,
  focus: FocusHero,
};
