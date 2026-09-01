import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AppTopbar } from "@/components/layout/AppTopbar";
import { ArrowLeft, ArrowRight, Palette } from "lucide-react";
import { APP_NAME } from "@/lib/app";
import { THEMES } from "@/lib/themes";

export const Themes = () => {
  useEffect(() => {
    document.title = `Themes — ${APP_NAME}`;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AppTopbar
        left={
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-primary text-[11px] font-bold tracking-tight text-primary-foreground shadow-sm">
              CR
            </span>
            <span className="hidden sm:inline">{APP_NAME}</span>
            <span className="sm:hidden">CR Builder</span>
          </Link>
        }
        right={
          <Button asChild size="sm" className="shadow-sm">
            <Link to="/resume-builder">
              Open builder
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        }
      />

      <main className="page-container py-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground shadow-sm">
            <Palette className="h-3 w-3" /> 8 themes
          </div>
          <h1 className="mt-4 text-3xl font-[800] tracking-[-0.03em] sm:text-4xl">Find your look</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Every theme re-skins the whole resume — background, headings, cards, timelines, skill bars and footer — via{" "}
            <code className="rounded bg-secondary px-1 py-0.5 font-mono text-xs">data-theme</code> tokens. Try them live in the builder.
          </p>
          <div className="mt-6 flex justify-center gap-2">
            <Button asChild size="lg" className="rounded-full px-7">
              <Link to="/resume-builder">Open builder</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full bg-card px-7">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" /> Back to home
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {THEMES.map((t) => (
            <div
              key={t.id}
              data-theme={t.id}
              className="cv-theme group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:shadow-md"
            >
              <div className="h-2 w-full bg-gradient-primary" />
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold" style={{ fontFamily: "var(--theme-heading)" }}>
                    {t.name}
                  </h3>
                  <span className="rounded-full bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {t.id}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{t.tagline}</p>
                <p className="mt-2 text-xs leading-5 text-muted-foreground line-clamp-2">{t.desc}</p>
                <div className="mt-3 flex gap-1.5">
                  {t.swatches.map((c) => (
                    <span key={c} className="h-7 w-7 rounded-full border shadow-sm" style={{ background: c }} title={c} />
                  ))}
                </div>
                <ul className="mt-3 space-y-1 text-xs leading-5 text-muted-foreground">
                  {t.notes.map((n) => (
                    <li key={n} className="flex gap-1.5">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {n}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-4">
                  <Button asChild size="sm" variant="outline" className="w-full rounded-full">
                    <Link to="/resume-builder">Try {t.name}</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-xl border bg-card p-6 text-center shadow-sm">
          <h3 className="font-semibold">How themes work</h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Themes are pure CSS — the builder just sets <code className="rounded bg-secondary px-1 py-0.5 font-mono text-xs">data-theme</code> on the resume wrapper.
            Every section reads the same tokens, so you can mix any theme with any section layout. Your content never moves.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Themes;
