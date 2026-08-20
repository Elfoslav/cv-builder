import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { usePanelDraft } from "./usePanelDraft";
import { DesignControls } from "./DesignControls";
import { MockContentFields } from "./MockContentFields";

/**
 * Draft A — Content & Design tabs.
 * Two tabs inside the edit panel: Content (what you type) and Design
 * (section design + columns). One context at a time, zero scrolling.
 */
const PanelHeader = () => (
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
);

export const DraftPanelTabs = () => {
  const draft = usePanelDraft();
  return (
    <div className="max-w-md rounded-lg border border-border bg-background p-4 shadow-sm">
      <PanelHeader />
      <Tabs defaultValue="content">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
        </TabsList>
        <TabsContent value="content" className="mt-3">
          <MockContentFields />
        </TabsContent>
        <TabsContent value="design" className="mt-3">
          <DesignControls draft={draft} />
        </TabsContent>
      </Tabs>
    </div>
  );
};