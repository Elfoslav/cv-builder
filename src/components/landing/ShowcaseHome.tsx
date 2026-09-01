import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ColorfulComparison, ColorfulCta, HowItWorks, FEATURES, HUES, SHOWCASE_THEMES } from "./shared";
import { ArrowRight } from "lucide-react";

export function ShowcaseHome() {
  return (
    <>
      {/* THEME GALLERY — marquee strip */}
      <section id="themes-gallery" className="relative border-y bg-secondary/20 py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50" />
        <div className="page-container relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground shadow-sm">
            <span className="h-2 w-2 rounded-full bg-terminal-purple" /> The theme gallery
          </span>
          <h2 className="mt-5 text-3xl font-[800] tracking-[-0.03em] sm:text-[2.6rem]">One resume, multiple looks</h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-muted-foreground">
            Each theme re-skins the entire CV through design tokens — not just an accent color. Switch anytime; your content stays put.
          </p>
        </div>

        <div className="relative mt-10 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-28" />
          <div className="flex w-max animate-[marquee_32s_linear_infinite] items-start gap-5 py-2 will-change-transform hover:[animation-play-state:paused] motion-reduce:animate-none">
            {[...SHOWCASE_THEMES, ...SHOWCASE_THEMES].map((t, i) => (
              <div key={`${t.theme}-${i}`} className={cn(i % 2 === 0 ? "translate-y-2" : "-translate-y-2")}>
                <div data-theme={t.theme} className="cv-theme w-[220px] shrink-0 overflow-hidden rounded-2xl border bg-card shadow-[0_16px_40px_hsl(var(--foreground)/0.14)]">
                  <div className="bg-background p-4">
                    <div className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">Resume — {t.accent}</div>
                    <div className="mt-1 text-[13px] font-extrabold leading-none tracking-tight" style={{ fontFamily: "var(--theme-heading)" }}>
                      {t.name}
                    </div>
                    <div className="text-[10px] font-medium text-primary">{t.role}</div>
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
              </div>
            ))}
          </div>
          <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
        </div>

        <div className="mt-8 flex justify-center">
          <Button asChild variant="outline" size="lg" className="rounded-full bg-card px-7">
            <Link to="/themes">
              Browse themes <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        </div>
      </section>

      <HowItWorks />

      {/* FEATURES — colorful, vivid, not plain */}
      <section id="features" className="relative overflow-hidden border-y bg-secondary/30">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-primary/5 blur-[50px]" />
          <div className="absolute inset-0 grid-bg opacity-[0.15]" />
        </div>
        <div className="page-container py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground shadow-sm">
              <span className="h-2 w-2 rounded-full bg-terminal-cyan" />
              <span className="h-2 w-2 rounded-full bg-terminal-purple" />
              <span className="h-2 w-2 rounded-full bg-terminal-pink" />
              Why it&apos;s different
            </span>
            <h2 className="mt-4 text-3xl font-[800] tracking-[-0.03em] sm:text-[2.6rem]">Everything a template can&apos;t do</h2>
            <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-7 text-muted-foreground">
              Templates lock you into one look. Here, themes and section designs are orthogonal — combine any theme with any layout.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.filter((f) => f.title !== "Real themes, not swatches").map((f) => {
              const hue = HUES[f.hue];
              return (
                <div
                  key={f.title}
                  className={cn(
                    "group relative flex flex-col overflow-hidden rounded-[24px] border bg-card p-7 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_32px_hsl(var(--foreground)/0.08)]",
                    hue.ring
                  )}
                >
                  <div className={cn("pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl opacity-60 transition-opacity group-hover:opacity-80", hue.blob)} />
                  <div className={cn("relative flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-sm", hue.chip)}>
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="relative mt-5 text-[15px] font-bold tracking-tight">{f.title}</h3>
                  <p className="relative mt-2 text-[13px] leading-6 text-muted-foreground">{f.body}</p>
                  <div className={cn("pointer-events-none absolute inset-x-0 bottom-0 h-1", hue.chip)} />
                </div>
              );
            })}
          </div>

          <div className="mx-auto mt-8 flex max-w-5xl justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 font-mono text-xs shadow-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-terminal-green" />
              <span className="font-medium">All local, all printable</span>
              <span className="h-3 w-px bg-border" />
              <span className="text-muted-foreground">no account needed</span>
            </div>
          </div>
        </div>
      </section>

      <ColorfulComparison />
      <ColorfulCta />
    </>
  );
}
