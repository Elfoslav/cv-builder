import { Button } from "@/components/ui/button";
import { Check, X, SlidersHorizontal } from "lucide-react";
import { usePanelDraft } from "./usePanelDraft";
import { DesignControls } from "./DesignControls";
import { MockContentFields } from "./MockContentFields";

/**
 * Draft D — Divided fieldset.
 * A single scrollable panel where a clearly labeled “Design” group sits below
 * the content, separated by a heading and a divider. No state, everything in view.
 */
export const DraftPanelSplit = () => {
  const draft = usePanelDraft();
  return (
    <div className="max-w-md rounded-lg border border-border bg-background p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="truncate text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Editing — Skills
        </span>
        <div className="flex shrink-0 items-center gap-1.5">
          <Button size="sm" variant="ghost" className="h-7" type="button">
            <X className="h-3.5 w-3.5" /> Cancel
          </Button>
          <Button size="sm" className="h-7" type="button">
            <Check className="h-3.5 w-3.5" /> Done
          </Button>
        </div>
      </div>

      <MockContentFields />

      <div className="mt-4 flex items-center gap-2 border-t pt-4">
        <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Design</span>
        <div className="h-px flex-1 bg-border" />
      </div>
      <div className="mt-3">
        <DesignControls draft={draft} />
      </div>
    </div>
  );
};