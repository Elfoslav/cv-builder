import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { ResumeTheme } from "@/lib/themes";

/**
 * A single theme's info card on the /themes gallery: gradient accent bar,
 * name + id, tagline, description, color swatches, highlight notes, and a
 * "Try" CTA that opens the builder pre-set to this theme. Re-skins itself via
 * `data-theme` so each card previews its own palette.
 */
export function ThemeCard({ theme }: { theme: ResumeTheme }) {
  return (
    <div
      data-theme={theme.id}
      className="cv-theme group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:shadow-md"
    >
      <div className="h-2 w-full bg-gradient-primary" />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold" style={{ fontFamily: "var(--theme-heading)" }}>
            {theme.name}
          </h3>
          <span className="rounded-full bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {theme.id}
          </span>
        </div>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">{theme.tagline}</p>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">{theme.desc}</p>
        <div className="mt-3 flex gap-1.5">
          {theme.swatches.map((c) => (
            <span key={c} className="h-7 w-7 rounded-full border shadow-sm" style={{ background: c }} title={c} />
          ))}
        </div>
        <ul className="mt-3 space-y-1 text-xs leading-5 text-muted-foreground">
          {theme.notes.map((n) => (
            <li key={n} className="flex gap-1.5">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
              {n}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-4">
          <Button asChild size="sm" variant="outline" className="w-full">
            <Link to={`/resume-builder?theme=${theme.id}`}>Try {theme.name}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
