import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AppTopbar } from "@/components/layout/AppTopbar";
import { APP_NAME } from "@/lib/app";
import { ShowcaseHome } from "@/components/landing/ShowcaseHome";
import { StripHero } from "@/components/landing/heroes";
import { ArrowRight } from "lucide-react";

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
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-primary text-[11px] font-bold tracking-tight text-primary-foreground shadow-sm">
              CR
            </span>
            <span className="hidden sm:inline">{APP_NAME}</span>
            <span className="sm:hidden">CR Builder</span>
            <span className="hidden rounded-full border bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:inline-flex">
              Beta
            </span>
          </Link>
        }
        center={
          <>
            <button
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
            >
              Features
            </button>
            <Link
              to="/themes"
              className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
            >
              Themes
            </Link>
            <button
              onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
            >
              How it works
            </button>
          </>
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

      <StripHero />

      <ShowcaseHome />

      <footer className="border-t border-border py-8 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Built for resumes that don&apos;t look like templates.
      </footer>
    </div>
  );
}
