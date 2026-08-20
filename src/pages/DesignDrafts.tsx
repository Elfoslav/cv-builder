import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { APP_NAME } from "@/lib/app";

export const DesignDrafts = () => {
  useEffect(() => {
    document.title = `Design drafts — ${APP_NAME}`;
  }, []);

  return (
    <div className="min-h-screen bg-muted/30 print:hidden">
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-3">
          <div className="flex items-center gap-3">
            <Button asChild size="sm" variant="ghost">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" /> Editor
              </Link>
            </Button>
            <div>
              <h1 className="text-sm font-semibold">Design drafts</h1>
              <p className="text-xs text-muted-foreground">
                Prototypes and explorations — all edits are demo-only.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-6">
        <p className="py-12 text-center text-sm text-muted-foreground">
          No drafts yet.
        </p>
      </main>
    </div>
  );
};

export default DesignDrafts;
