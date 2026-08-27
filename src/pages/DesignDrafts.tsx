import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AppTopbar } from "@/components/layout/AppTopbar";
import { ArrowLeft } from "lucide-react";
import { APP_NAME } from "@/lib/app";

export const DesignDrafts = () => {
  useEffect(() => {
    document.title = `Design drafts — ${APP_NAME}`;
  }, []);

  return (
    <div className="min-h-screen bg-muted/30 print:hidden">
      <AppTopbar
        left={
          <div className="flex items-center gap-3">
            <Button asChild size="sm" variant="ghost">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" /> Editor
              </Link>
            </Button>
            <div>
              <h1 className="text-sm font-semibold leading-none">Design drafts</h1>
              <p className="text-xs text-muted-foreground">
                Prototypes and explorations — all edits are demo-only.
              </p>
            </div>
          </div>
        }
      />

      <main className="page-container py-6">
        <p className="py-12 text-center text-sm text-muted-foreground">
          No drafts yet.
        </p>
      </main>
    </div>
  );
};

export default DesignDrafts;
