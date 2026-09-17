import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared theme-showcase primitives used across the homepage heroes and the
 * Showcase gallery. Kept in one place so the themed resume tile and the
 * scrolling marquee aren't re-implemented per hero variant.
 */

export type ShowcaseTheme = { theme: string; name: string; role: string; accent: string };

/**
 * A compact themed résumé tile (skeleton content), re-skinned by `data-theme`.
 * This is the single source for the strip/gallery previews.
 */
export function ThemePreview({ theme, accent, name, role }: ShowcaseTheme) {
  return (
    <div
      data-theme={theme}
      className="cv-theme w-[220px] shrink-0 overflow-hidden rounded-2xl border bg-card shadow-[0_16px_40px_hsl(var(--foreground)/0.14)]"
    >
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

/**
 * A seamless horizontal marquee. Handles the edge fades, the CSS animation
 * (keyframes `cv-marquee` live in index.css) and the item doubling needed for a
 * gapless loop — callers only supply the data and how to render one item.
 * Pauses on hover and respects reduced-motion.
 */
export function ThemeMarquee<T>({
  items,
  renderItem,
  durationSec = 32,
  fade = true,
  gapClass = "gap-5",
  className,
}: {
  items: readonly T[];
  renderItem: (item: T, index: number) => ReactNode;
  durationSec?: number;
  fade?: boolean;
  gapClass?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {fade && (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-28" />
        </>
      )}
      <div
        className={cn(
          "flex w-max items-start py-2 will-change-transform [animation:cv-marquee_var(--marquee-duration)_linear_infinite] hover:[animation-play-state:paused] motion-reduce:[animation:none]",
          gapClass,
        )}
        style={{ ["--marquee-duration" as string]: `${durationSec}s` }}
      >
        {[...items, ...items].map((item, i) => (
          <Fragment key={i}>{renderItem(item, i)}</Fragment>
        ))}
      </div>
    </div>
  );
}
