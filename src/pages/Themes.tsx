import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AppTopbar } from "@/components/layout/AppTopbar";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { OpenBuilderButton } from "@/components/layout/OpenBuilderButton";
import { ArrowLeft, Palette } from "lucide-react";
import { APP_NAME } from "@/lib/app";
import { THEMES } from "@/lib/themes";
import { ThemeCard } from "@/components/themes/ThemeCard";

export const Themes = () => {
  useEffect(() => {
    document.title = `Themes — ${APP_NAME}`;
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AppTopbar
        left={<BrandLogo shortName="CR Builder" />}
        right={<OpenBuilderButton />}
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
            <ThemeCard key={t.id} theme={t} />
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
