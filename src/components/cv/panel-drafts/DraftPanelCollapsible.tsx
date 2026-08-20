import { useState } from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Check, X, ChevronDown, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePanelDraft } from "./usePanelDraft";
import { DesignControls } from "./DesignControls";
import { MockContentFields } from "./MockContentFields";

/**
 * Draft B — Collapsible design block.
 * Content fields sit in the panel; a foldable “Design options” group sits below
 * them and stays collapsed by default. Expand only when you want to tune layout.
 */
export const DraftPanelCollapsible = () => {
  const draft = usePanelDraft();
  const [open, setOpen] = useState(false);
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

      <Collapsible open={open} onOpenChange={setOpen} className="mt-4 border-t pt-4">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-full justify-between gap-2 text-xs font-medium" type="button">
            <span className="flex items-center gap-1.5">
              <SlidersHorizontal className="h-3.5 w-3.5 text-primary" /> Design options
            </span>
            <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3">
          <DesignControls draft={draft} />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};