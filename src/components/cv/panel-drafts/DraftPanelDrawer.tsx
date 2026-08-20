import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePanelDraft } from "./usePanelDraft";
import { DesignControls } from "./DesignControls";
import { MockContentFields } from "./MockContentFields";

/**
 * Draft C — Design slide-over.
 * Content inputs take the whole panel; a “Design” button in the header opens
 * section design + columns in a right-side slide-over that keeps the form visible.
 */
export const DraftPanelDrawer = () => {
  const draft = usePanelDraft();
  const [open, setOpen] = useState(false);
  return (
    <div className="relative max-w-md overflow-hidden rounded-lg border border-border bg-background shadow-sm">
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="truncate text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Editing — Skills
          </span>
          <div className="flex shrink-0 items-center gap-1.5">
            <Button size="sm" variant="outline" className="h-7 gap-1.5" type="button" onClick={() => setOpen(true)}>
              <SlidersHorizontal className="h-3.5 w-3.5" /> Design
            </Button>
            <Button size="sm" variant="ghost" className="h-7" type="button">
              <X className="h-3.5 w-3.5" /> Cancel
            </Button>
            <Button size="sm" className="h-7" type="button">
              <Check className="h-3.5 w-3.5" /> Done
            </Button>
          </div>
        </div>
        <MockContentFields />
      </div>

      {open && (
        <button
          aria-label="Close design drawer"
          className="absolute inset-0 z-10 cursor-default bg-background/50"
          type="button"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        className={cn(
          "absolute inset-y-0 right-0 z-20 w-4/5 max-w-56 border-l border-border bg-card p-4 shadow-xl transition-transform",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Design</span>
          <Button size="icon" variant="ghost" className="h-6 w-6" type="button" onClick={() => setOpen(false)}>
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
        <DesignControls draft={draft} />
      </aside>
    </div>
  );
};