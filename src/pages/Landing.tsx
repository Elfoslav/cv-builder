import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AppTopbar } from "@/components/layout/AppTopbar";
import { APP_NAME } from "@/lib/app";
import {
  ArrowRight,
  Check,
  Eye,
  FileCheck2,
  Languages,
  LayoutGrid,
  Lock,
  Palette,
  Sparkles,
  X,
  Zap,
  Layers,
  Monitor,
} from "lucide-react";

type Feature = {
  icon: typeof Palette;
  title: string;
  body: string;
};

const FEATURES: Feature[] = [
  {
    icon: Palette,
    title: "Real themes, not swatches",
    body: "Eight full themes re-skin the entire CV through design tokens — background, headings, cards, skill bars, and footer all change together.",
  },
  {
    icon: LayoutGrid,
    title: "A design for every section",
    body: "Experience, education, skills, projects, and hobbies each ship with multiple layouts. Mix a timeline for work, cards for projects, dots for skills.",
  },
  {
    icon: FileCheck2,
    title: "Print-perfect export",
    body: "Resumes render off-screen at the exact page width, so the PDF you export is pixel-identical to the preview. No reflow.",
  },
  {
    icon: Eye,
    title: "Live preview while you edit",
    body: "On wide screens the editor and a print-width preview sit side by side, so you see every change exactly as it will print.",
  },
  {
    icon: Languages,
    title: "One CV, many languages",
    body: "Author the same resume in multiple languages and export each version — without duplicating your work.",
  },
  {
    icon: Lock,
    title: "Local-first & private",
    body: "Your CV is saved in your browser. No account, no upload, no lock-in — it's yours to keep.",
  },
];

const GENERIC = [
  "One fixed template per resume",
  "A single accent color",
  "Export looks different from the preview",
  "Account required, your data in the cloud",
  "One language per document",
  "Paywall to download the file",
];

const OURS = [
  "Themes plus a design variant for every section",
  "Fully re-skinned color themes",
  "What you see is what you export",
  "Local-first — saved in your browser, no account",
  "One CV in many languages",
  "Export anytime, no paywall",
];

function MiniResume({
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
                <div className="h-1.5 w-full rounded bg-primary" style={{ width: "88%" }} />
                <div className="h-1.5 w-full rounded bg-primary/70" style={{ width: "72%" }} />
                <div className="h-1.5 w-full rounded bg-primary/50" style={{ width: "60%" }} />
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

export default function Landing() {
  useEffect(() => {
    const previous = document.title;
    document.title = `${APP_NAME} — Build a resume that's unmistakably yours`;
    const meta = document.querySelector('meta[name="description"]');
    const original = meta?.getAttribute("content") ?? null;
    meta?.setAttribute(
      "content",
      "Custom Resume Builder: real themes, a different design for every section, and PDFs that match the preview exactly. Local-first and multi-language."
    );
    return () => {
      document.title = previous;
      if (meta && original !== null) meta.setAttribute("content", original);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <AppTopbar
        left={
          <Link to="/" className="flex items-center gap-2.5 font-semibold">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-primary text-[11px] font-bold tracking-tight text-primary-foreground shadow-sm">
              CR
            </span>
            <span className="hidden sm:inline">{APP_NAME}</span>
            <span className="sm:hidden">CR Builder</span>
          </Link>
        }
        right={
          <>
            {import.meta.env.DEV && (
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Link to="/drafts">Drafts</Link>
              </Button>
            )}
            <Button asChild size="sm" className="shadow-sm">
              <Link to="/resume-builder">
                Open builder
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </>
        }
      />

      {/* HERO — editorial, not centered SaaS */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-glow" />
          <div className="absolute inset-0 grid-bg opacity-[0.55]" />
          <div className="absolute -top-32 left-1/2 h-[520px] w-[880px] -translate-x-1/2 rounded-full bg-primary/10 blur-[80px]" />
          <div className="absolute -bottom-32 right-1/2 h-[420px] w-[720px] translate-x-1/3 rounded-full bg-accent/10 blur-[70px]" />
        </div>

        <div className="page-container">
          <div className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:py-20">
            {/* Left — copy */}
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs shadow-sm">
                <span className="flex h-5 items-center gap-1.5 rounded-full bg-primary px-2.5 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                  <Sparkles className="h-3 w-3" /> New
                </span>
                <span className="font-mono text-[11px] tracking-wide text-muted-foreground">
                  8 themes • 30+ section designs • print-perfect
                </span>
              </div>

              <h1 className="mt-6 text-[2.6rem] font-[800] leading-[0.9] tracking-[-0.04em] sm:text-[3.4rem] lg:text-[4.15rem]">
                <span className="block">Resumes that</span>
                <span className="block text-gradient-primary">don&apos;t look</span>
                <span className="block">like templates.</span>
              </h1>

              <p className="mt-5 max-w-[52ch] text-[17px] leading-7 text-muted-foreground">
                Pick a real theme, not just a color. Give every section its own layout — timeline,
                cards, bars, checks. What you see is what you export. All in your browser.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="h-11 rounded-full px-7 text-[14px] shadow-glow">
                  <Link to="/resume-builder">
                    Build your resume
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-11 rounded-full bg-card px-6">
                  <Link to="#features">How it&apos;s different</Link>
                </Button>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5" /> No account
                </span>
                <span className="h-3 w-px bg-border" />
                <span className="inline-flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5" /> No paywall
                </span>
                <span className="h-3 w-px bg-border" />
                <span className="inline-flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5" /> No lock-in
                </span>
              </div>

              <div className="mt-8 flex items-center gap-3 border-t border-dashed pt-6">
                <div className="flex -space-x-2">
                  <div className="h-7 w-7 rounded-full border-2 border-background bg-gradient-primary" title="Indigo" />
                  <div data-theme="sunset" className="cv-theme h-7 w-7 rounded-full border-2 border-background bg-primary" title="Sunset" />
                  <div data-theme="forest" className="cv-theme h-7 w-7 rounded-full border-2 border-background bg-primary" title="Forest" />
                  <div data-theme="classic" className="cv-theme h-7 w-7 rounded-full border-2 border-background bg-primary" title="Classic" />
                  <div data-theme="minimal" className="cv-theme h-7 w-7 rounded-full border-2 border-background bg-primary" title="Minimal" />
                </div>
                <p className="font-mono text-xs text-muted-foreground">8 themes • try them live in the builder</p>
              </div>
            </div>

            {/* Right — fanned resume stack */}
            <div className="relative hidden h-[560px] select-none lg:block">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* back left */}
                <div className="absolute left-6 top-10 hidden -rotate-[8deg] opacity-90 xl:block">
                  <MiniResume theme="minimal" name="Maya Chen" role="Backend Engineer" accent="Minimal" rotated="" />
                </div>
                {/* back right */}
                <div className="absolute right-6 top-8 hidden rotate-[7deg] opacity-90 xl:block">
                  <MiniResume theme="sunset" name="Jonah Park" role="Product Designer" accent="Sunset" rotated="" />
                </div>
                {/* front center - indigo */}
                <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rotate-[-1deg]">
                  <div className="relative">
                    <div className="pointer-events-none absolute -inset-3 -z-10 rounded-[20px] bg-gradient-primary opacity-20 blur-[18px]" />
                    <MiniResume theme="indigo" name="Alex Rivera" role="Product Designer" accent="Indigo" rotated="" />
                    <div className="pointer-events-none absolute -bottom-3 -right-3 flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-xs font-medium shadow-md">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-terminal-green" />
                      print-width preview
                    </div>
                  </div>
                </div>
              </div>

              {/* floating badge */}
              <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border bg-card/90 px-3 py-1.5 text-xs shadow-sm backdrop-blur">
                <Monitor className="h-3.5 w-3.5 text-primary" />
                <span className="font-medium">Side-by-side editor</span>
                <span className="text-muted-foreground">— see changes live</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES — bento, not uniform cards */}
      <section id="features" className="page-container py-10 sm:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-widest">
            Why it&apos;s different
          </Badge>
          <h2 className="mt-4 text-3xl font-[800] tracking-[-0.03em] sm:text-[2.4rem]">Everything a template can&apos;t do</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-6 text-muted-foreground">
            Templates lock you into one look. Here, themes and section designs are orthogonal — combine any theme with any layout.
          </p>
        </div>

        <div className="mt-10 grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-12">
          {/* Large — themes */}
          <div className="group relative overflow-hidden rounded-[24px] border bg-card p-6 md:col-span-7 md:p-7">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/15" />
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Palette className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-bold tracking-tight">Real themes, not swatches</h3>
            <p className="mt-2 max-w-[46ch] text-sm leading-6 text-muted-foreground">
              Every token changes — background, headings, cards, timelines, skill bars and footer. Not just an accent color.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span data-theme="indigo" className="cv-theme inline-flex items-center gap-2 rounded-full border bg-background px-2.5 py-1 text-xs">
                <span className="h-3 w-3 rounded-full bg-primary" /> Indigo
              </span>
              <span data-theme="sunset" className="cv-theme inline-flex items-center gap-2 rounded-full border bg-background px-2.5 py-1 text-xs">
                <span className="h-3 w-3 rounded-full bg-primary" /> Sunset
              </span>
              <span data-theme="ocean" className="cv-theme inline-flex items-center gap-2 rounded-full border bg-background px-2.5 py-1 text-xs">
                <span className="h-3 w-3 rounded-full bg-primary" /> Ocean
              </span>
              <span data-theme="classic" className="cv-theme inline-flex items-center gap-2 rounded-full border bg-background px-2.5 py-1 text-xs">
                <span className="h-3 w-3 rounded-full bg-primary" /> Classic
              </span>
              <span data-theme="forest" className="cv-theme inline-flex items-center gap-2 rounded-full border bg-background px-2.5 py-1 text-xs">
                <span className="h-3 w-3 rounded-full bg-primary" /> Forest
              </span>
            </div>
          </div>

          {/* Small — per section */}
          <div className="group relative overflow-hidden rounded-[24px] border bg-card p-6 md:col-span-5 md:p-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-foreground">
              <LayoutGrid className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-bold tracking-tight">A design for every section</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Experience as timeline or cards. Projects as soft cards or plain rows. Skills as bars, chips, or dots. Hobbies as pills or checks.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-2 font-mono text-[10px]">
              <div className="rounded-lg border bg-secondary/50 px-2 py-2 text-center">Timeline</div>
              <div className="rounded-lg border bg-secondary/50 px-2 py-2 text-center">Cards</div>
              <div className="rounded-lg border bg-secondary/50 px-2 py-2 text-center">Rows</div>
            </div>
          </div>

          {/* Small — print */}
          <div className="group relative overflow-hidden rounded-[24px] border bg-card p-6 md:col-span-5 md:p-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-bold tracking-tight">Print-perfect export</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Off-screen fixed-width render, so the PDF is pixel-identical to the preview. No reflow. No surprises.</p>
            <div className="mt-6 flex items-center gap-2 rounded-full border bg-secondary px-3 py-2 font-mono text-xs">
              <span className="h-2 w-2 rounded-full bg-terminal-green" /> 703px content width — matches print
            </div>
          </div>

          {/* Large — live preview */}
          <div className="group relative overflow-hidden rounded-[24px] border bg-foreground p-6 text-card md:col-span-7 md:p-7">
            <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Eye className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-bold tracking-tight text-card">Live preview while you edit</h3>
            <p className="mt-2 max-w-[46ch] text-sm leading-6 text-card/70">
              On wide screens the drawer docks next to a live, print-width preview. On narrow screens it overlays. You never guess.
            </p>
            <div className="mt-6 flex gap-2">
              <div className="h-16 flex-1 rounded-xl border border-card/15 bg-card/10 p-2">
                <div className="h-2 w-12 rounded bg-card/60" />
                <div className="mt-2 h-1 w-full rounded bg-card/25" />
                <div className="mt-1 h-1 w-3/4 rounded bg-card/25" />
              </div>
              <div className="hidden h-16 w-[120px] rounded-xl bg-primary p-2 sm:block">
                <div className="h-2 w-8 rounded bg-primary-foreground/80" />
                <div className="mt-2 space-y-1">
                  <div className="h-1 w-full rounded bg-primary-foreground/60" />
                  <div className="h-1 w-2/3 rounded bg-primary-foreground/40" />
                </div>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="group relative overflow-hidden rounded-[24px] border bg-card p-6 md:col-span-7 md:p-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-foreground">
              <Languages className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-bold tracking-tight">One CV, many languages</h3>
            <p className="mt-2 max-w-[46ch] text-sm leading-6 text-muted-foreground">
              Author the same resume in multiple languages and export each version — without duplicating your work.
            </p>
            <div className="mt-6 flex flex-wrap gap-1.5 font-mono text-xs">
              <span className="rounded-full bg-foreground px-3 py-1.5 text-card">EN — Product Designer</span>
              <span className="rounded-full border bg-secondary px-3 py-1.5">DE — Produktdesigner</span>
              <span className="rounded-full border bg-secondary px-3 py-1.5">FR — Designer Produit</span>
            </div>
          </div>

          {/* Private */}
          <div className="group relative overflow-hidden rounded-[24px] border bg-card p-6 md:col-span-5 md:p-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-foreground">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-bold tracking-tight">Local-first & private</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Your CV is saved in your browser. No account, no upload, no lock-in — it&apos;s yours to keep.
            </p>
            <div className="mt-6 rounded-xl border bg-secondary/60 px-3 py-2 font-mono text-[11px] leading-4">
              <span className="text-muted-foreground">localStorage</span> — cv-builder:data
              <span className="ml-2 inline-flex rounded bg-card px-1.5 py-0.5 text-[10px]">encrypted at rest</span>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON — editorial table, not two cards */}
      <section className="page-container py-4 sm:py-6">
        <div className="overflow-hidden rounded-[28px] border bg-card">
          <div className="grid md:grid-cols-[1.05fr_1.15fr]">
            <div className="p-7 sm:p-8">
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">The usual way</div>
              <h2 className="mt-2 text-2xl font-[800] tracking-[-0.02em]">Typical resume builder</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Templates, paywalls, and exports that surprise you.</p>
              <ul className="mt-6 space-y-3">
                {GENERIC.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border bg-secondary">
                      <X className="h-3 w-3 text-muted-foreground" />
                    </span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative border-t bg-foreground p-7 text-card sm:p-8 md:border-l md:border-t-0">
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/20 blur-2xl" />
              <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-card/60 flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5" /> Custom Resume Builder
              </div>
              <h2 className="mt-2 text-2xl font-[800] tracking-[-0.02em] text-card">How we do it</h2>
              <p className="mt-2 text-sm leading-6 text-card/70">Themes + section designs, print-perfect, local-first.</p>
              <ul className="mt-6 space-y-3">
                {OURS.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-card">{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-8 w-full rounded-full bg-card text-foreground hover:bg-card/90 sm:w-auto">
                <Link to="/resume-builder">
                  Try the builder <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA — dark, distinctive */}
      <section className="page-container py-10 sm:py-14">
        <div className="relative overflow-hidden rounded-[28px] border bg-foreground p-8 text-card sm:p-10 lg:p-12">
          <div className="pointer-events-none absolute inset-0 bg-gradient-glow opacity-[0.35]" />
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/25 blur-[60px]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-accent/20 blur-[60px]" />
          <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-[800] tracking-[-0.03em] sm:text-4xl">Start building — no signup needed.</h2>
              <p className="mt-3 max-w-xl text-[15px] leading-6 text-card/70">
                Open the builder and your CV is saved right in your browser. Come back anytime, export when you&apos;re ready.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-full bg-card px-8 text-foreground hover:bg-card/90">
                <Link to="/resume-builder">
                  Open the builder <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-card/20 bg-transparent px-8 text-card hover:bg-card/10 hover:text-card"
              >
                <Link to="/drafts">Browse themes</Link>
              </Button>
            </div>
          </div>
          <div className="relative mt-8 flex flex-wrap gap-2 border-t border-card/10 pt-6 font-mono text-[11px] uppercase tracking-widest text-card/50">
            <span>© {new Date().getFullYear()} Custom Resume Builder</span>
            <span className="hidden sm:inline">•</span>
            <span>Local-first</span>
            <span>•</span>
            <span>Print-perfect PDF</span>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Built for resumes that don&apos;t look like templates.
      </footer>
    </div>
  );
}
