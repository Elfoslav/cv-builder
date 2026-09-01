import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ArrowUpDown,
  Check,
  Eye,
  FileCheck2,
  Languages,
  LayoutGrid,
  Lock,
  Palette,
  X,
} from "lucide-react";

/**
 * Content + building blocks shared across the colorful homepage variants
 * (src/components/landing/*Home.tsx). Copy stays identical between variants
 * so switching only changes layout and color treatment, not the message.
 */

/**
 * A vivid accent hue per feature. Each variant leans on these so the page
 * reads as colorful and lively rather than a wall of one-color cards. Values
 * are the project's `terminal-*` / semantic tokens (see tailwind.config.ts),
 * paired here as ready-to-use utility fragments.
 */
export type Hue = {
  /** solid icon-chip background */
  chip: string;
  /** soft tinted card background */
  tint: string;
  /** matching text color */
  text: string;
  /** matching border color */
  ring: string;
  /** decorative blur blob */
  blob: string;
};

export const HUES: Record<string, Hue> = {
  cyan: { chip: "bg-terminal-cyan", tint: "bg-terminal-cyan/[0.07]", text: "text-terminal-cyan", ring: "border-terminal-cyan/25", blob: "bg-terminal-cyan/20" },
  purple: { chip: "bg-terminal-purple", tint: "bg-terminal-purple/[0.07]", text: "text-terminal-purple", ring: "border-terminal-purple/25", blob: "bg-terminal-purple/20" },
  pink: { chip: "bg-terminal-pink", tint: "bg-terminal-pink/[0.07]", text: "text-terminal-pink", ring: "border-terminal-pink/25", blob: "bg-terminal-pink/20" },
  green: { chip: "bg-terminal-green", tint: "bg-terminal-green/[0.07]", text: "text-terminal-green", ring: "border-terminal-green/25", blob: "bg-terminal-green/20" },
  amber: { chip: "bg-terminal-yellow", tint: "bg-terminal-yellow/[0.08]", text: "text-terminal-yellow", ring: "border-terminal-yellow/30", blob: "bg-terminal-yellow/25" },
  indigo: { chip: "bg-primary", tint: "bg-primary/[0.06]", text: "text-primary", ring: "border-primary/25", blob: "bg-primary/20" },
};

export type Feature = {
  icon: typeof Palette;
  hue: keyof typeof HUES;
  title: string;
  body: string;
};

export const FEATURES: Feature[] = [
  {
    icon: Palette,
    hue: "indigo",
    title: "Real themes, not swatches",
    body: "Eight full themes re-skin the entire CV through design tokens — background, headings, cards, skill bars, and footer all change together.",
  },
  {
    icon: LayoutGrid,
    hue: "purple",
    title: "A design for every section",
    body: "Experience, education, skills, projects, and hobbies each ship with multiple layouts. Mix a timeline for work, cards for projects, dots for skills.",
  },
  {
    icon: FileCheck2,
    hue: "green",
    title: "Print-perfect export",
    body: "Resumes render off-screen at the exact page width, so the PDF you export is pixel-identical to the preview. No reflow.",
  },
  {
    icon: Eye,
    hue: "cyan",
    title: "Live preview while you edit",
    body: "On wide screens the editor and a print-width preview sit side by side, so you see every change exactly as it will print.",
  },
  {
    icon: Languages,
    hue: "amber",
    title: "One CV, many languages",
    body: "Author the same resume in multiple languages and export each version — without duplicating your work.",
  },
  {
    icon: Lock,
    hue: "pink",
    title: "Local-first & private",
    body: "Your CV is saved in your browser. No account, no upload, no lock-in — it's yours to keep.",
  },
  {
    icon: ArrowUpDown,
    hue: "indigo",
    title: "Reorder sections freely",
    body: "Drag your CV into the shape that tells your story — move experience, skills, or projects up or down. The header stays first, the footer last.",
  },
];

/**
 * Paired contrasts for the comparison section — each row states the shift
 * from the "usual" resume-builder pain to how this tool changes it. Framed as
 * a before → after argument, deliberately NOT a restatement of the feature
 * cards above.
 */
export const CONTRASTS: { from: string; to: string }[] = [
  { from: "Locked to one fixed template", to: "Any theme, combined with any section layout" },
  { from: "A preview that lies about the export", to: "A PDF pixel-identical to what you see" },
  { from: "Your data lives in someone's cloud", to: "Everything stays in your browser" },
  { from: "One language, or duplicate the whole doc", to: "One CV, exported in every language" },
  { from: "A paywall at the download button", to: "Export anytime — no account, no fee" },
];

/** Themes shown in the hero fan / gallery, in display order. */
export const SHOWCASE_THEMES: { theme: string; name: string; role: string; accent: string }[] = [
  { theme: "indigo", name: "Alex Rivera", role: "Product Designer", accent: "Indigo" },
  { theme: "sunset", name: "Jonah Park", role: "Brand Designer", accent: "Sunset" },
  { theme: "ocean", name: "Priya Nair", role: "Data Scientist", accent: "Ocean" },
  { theme: "forest", name: "Sam Okafor", role: "Backend Engineer", accent: "Forest" },
  { theme: "earthy", name: "Lena Vogt", role: "UX Researcher", accent: "Earthy" },
  { theme: "minimal", name: "Maya Chen", role: "Software Engineer", accent: "Minimal" },
];

export function MiniResume({
  theme,
  name,
  role,
  accent,
  rotated,
}: {
  theme: string;
  name: string;
  role: string;
  accent: string;
  rotated: string;
}) {
  return (
    <div
      data-theme={theme}
      className={`cv-theme absolute w-[320px] overflow-hidden rounded-[16px] border bg-card shadow-[0_20px_60px_hsl(var(--foreground)/0.18)] ${rotated}`}
    >
      <div className="bg-background p-5">
        <div className="mb-4 border-b border-border pb-4">
          <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Resume — {accent}</div>
          <div className="mt-1 text-[15px] font-extrabold leading-none tracking-tight" style={{ fontFamily: "var(--theme-heading)" }}>
            {name}
          </div>
          <div className="text-[11px] font-medium text-primary">{role}</div>
          <div className="mt-2 space-y-1">
            <div className="h-1.5 w-full rounded bg-muted" />
            <div className="h-1.5 w-5/6 rounded bg-muted" />
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <div className="mb-2 flex items-center gap-1.5">
              <div className="h-1 w-6 rounded bg-primary" />
              <div className="font-mono text-[8px] font-bold uppercase tracking-widest text-muted-foreground">Experience</div>
            </div>
            <div className="space-y-2">
              <div className="rounded-lg border bg-card p-2.5">
                <div className="h-2 w-24 rounded bg-foreground/80" />
                <div className="mt-1 h-1.5 w-32 rounded bg-muted-foreground/50" />
                <div className="mt-2 h-1 w-full rounded bg-muted" />
                <div className="mt-1 h-1 w-4/5 rounded bg-muted" />
              </div>
              <div className="rounded-lg border bg-card p-2.5 opacity-60">
                <div className="h-2 w-20 rounded bg-foreground/70" />
                <div className="mt-1 h-1.5 w-28 rounded bg-muted-foreground/40" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-secondary p-2.5">
              <div className="font-mono text-[8px] font-bold uppercase tracking-widest text-muted-foreground">Skills</div>
              <div className="mt-1.5 space-y-1">
                <div className="h-1.5 rounded bg-primary" style={{ width: "88%" }} />
                <div className="h-1.5 rounded bg-primary/70" style={{ width: "72%" }} />
                <div className="h-1.5 rounded bg-primary/50" style={{ width: "60%" }} />
              </div>
            </div>
            <div className="rounded-lg border p-2.5">
              <div className="font-mono text-[8px] font-bold uppercase tracking-widest text-muted-foreground">Interests</div>
              <div className="mt-1.5 flex flex-wrap gap-1">
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[8px] font-medium">Photo</span>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[8px] font-medium">Bike</span>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[8px] font-medium">Code</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** The three steps from blank page to exported PDF. */
const STEPS: { icon: typeof Palette; hue: keyof typeof HUES; title: string; body: string }[] = [
  {
    icon: Palette,
    hue: "indigo",
    title: "Pick a theme",
    body: "Start from one of eight themes. Each re-skins the whole résumé through design tokens — background, headings, cards, and all.",
  },
  {
    icon: Eye,
    title: "Make it yours",
    hue: "purple",
    body: "Fill in your content and choose a layout for each section, watching a live, print-width preview update as you type.",
  },
  {
    icon: FileCheck2,
    hue: "green",
    title: "Export your PDF",
    body: "Download a PDF that's pixel-identical to the preview. No account, no upload — your CV stays saved in your browser.",
  },
];

/**
 * "How it works" — a simple three-step path from blank page to exported PDF.
 * Anchored so the top-nav "How it works" link can scroll to it.
 */
export function HowItWorks() {
  return (
    <section id="how-it-works" className="page-container py-16 sm:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground shadow-sm">
          <span className="h-2 w-2 rounded-full bg-terminal-green" /> How it works
        </span>
        <h2 className="mt-4 text-3xl font-[800] tracking-[-0.03em] sm:text-[2.6rem]">From blank page to PDF in three steps</h2>
      </div>

      <ol className="relative mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-3">
        {/* connecting line on desktop */}
        <div className="pointer-events-none absolute inset-x-[16.66%] top-[2.75rem] hidden h-px bg-border sm:block" />
        {STEPS.map((s, i) => {
          const hue = HUES[s.hue];
          return (
            <li key={s.title} className="relative flex flex-col items-center rounded-[24px] border bg-card p-7 text-center shadow-sm">
              <div className={cn("flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-sm", hue.chip)}>
                <s.icon className="h-6 w-6" />
              </div>
              <div className="mt-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Step {i + 1}</div>
              <h3 className="mt-1 text-lg font-bold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{s.body}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/**
 * Shared comparison — a set of before → after contrast rows. Each row pairs a
 * familiar pain with how this tool resolves it, so the section reads as an
 * argument rather than re-listing the feature cards above.
 */
export function ColorfulComparison() {
  return (
    <section className="page-container py-10 sm:py-14">
      <div className="overflow-hidden rounded-[32px] border bg-card shadow-card">
        <div className="border-b bg-secondary/30 px-8 py-8 text-center sm:px-10">
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Typical builder → this builder</div>
          <h2 className="mx-auto mt-2 max-w-xl text-2xl font-[800] tracking-[-0.02em] sm:text-[1.9rem]">
            The same résumé, without the usual compromises
          </h2>
        </div>

        <ul className="divide-y">
          {CONTRASTS.map((c) => (
            <li key={c.to} className="grid items-center gap-3 px-6 py-5 sm:grid-cols-[1fr_auto_1fr] sm:gap-5 sm:px-10">
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border bg-secondary">
                  <X className="h-3 w-3" />
                </span>
                <span className="line-through decoration-muted-foreground/40">{c.from}</span>
              </div>
              <ArrowRight className="hidden h-4 w-4 shrink-0 text-muted-foreground/50 sm:block" />
              <div className="flex items-center gap-2.5 text-sm font-medium">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground">
                  <Check className="h-3 w-3" />
                </span>
                <span>{c.to}</span>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex justify-center border-t bg-secondary/30 px-8 py-7">
          <Button asChild size="lg" className="rounded-full px-8 shadow-glow">
            <Link to="/resume-builder">
              Build your resume <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/** Shared final CTA — one bold, colorful gradient panel. */
export function ColorfulCta() {
  return (
    <section className="page-container py-6 pb-16">
      <div className="relative overflow-hidden rounded-[32px] border bg-foreground p-8 text-card sm:p-12 lg:p-16">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-terminal-purple/30 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-terminal-cyan/30 blur-[80px]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-terminal-pink/20 blur-[80px]" />
        <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-3xl font-[800] tracking-[-0.03em] sm:text-4xl lg:text-[2.75rem]">Start building — no signup needed.</h2>
            <p className="mt-3 max-w-xl text-[15px] leading-6 text-card/70">
              Open the builder and your CV is saved right in your browser. Come back anytime, export when you&apos;re ready.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-full bg-card px-8 text-foreground hover:bg-card/90">
              <Link to="/resume-builder">
                Build your resume <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-card/20 bg-transparent px-8 text-card hover:bg-card/10 hover:text-card"
            >
              <Link to="/themes">Browse themes</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
