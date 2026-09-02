import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AppTopbar } from "@/components/layout/AppTopbar";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { OpenBuilderButton } from "@/components/layout/OpenBuilderButton";
import { APP_NAME } from "@/lib/app";
import { scrollToId } from "@/lib/utils";
import { ShowcaseHome } from "@/components/landing/ShowcaseHome";
import { StripHero } from "@/components/landing/heroes";

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
        left={<BrandLogo beta shortName="CR Builder" />}
        center={
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToId("features")}
            >
              Features
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link to="/themes">Themes</Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToId("how-it-works")}
            >
              How it works
            </Button>
          </>
        }
        right={<OpenBuilderButton />}
      />

      <StripHero />

      <ShowcaseHome />

      <footer className="border-t border-border py-8 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Built for resumes that don&apos;t look like templates.
      </footer>
    </div>
  );
}
