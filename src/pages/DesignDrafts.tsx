import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useDraftData } from "@/components/cv/drafts/useDraftData";
import { DraftInline } from "@/components/cv/drafts/DraftInline";
import { DraftDrawer } from "@/components/cv/drafts/DraftDrawer";
import { DraftFloating } from "@/components/cv/drafts/DraftFloating";
import { ArrowLeft, RotateCcw, MousePointerClick } from "lucide-react";

const DRAFT_META = [
  {
    id: "inline",
    name: "A · Split inline editor",
    desc: "Hover any section to reveal its Edit button. Clicking it splits the section into a live preview on the left and the form on the right — you see every change as you type.",
    hints: [
      "Hover a section header → Edit button",
      "Section opens side-by-side: preview + form",
      "List sections get a dashed “+ Add entry” button",
    ],
  },
  {
    id: "drawer",
    name: "B · Toolbar + drawer",
    desc: "Every section gets a slim toolbar with explicit Edit and Add buttons. The form slides in from the right, leaving the CV fully visible for reference.",
    hints: [
      "Slim toolbar above every section",
      "Edit opens a right-side drawer with the form",
      "Add creates an entry and opens it in the drawer",
    ],
  },
  {
    id: "floating",
    name: "C · Floating popover",
    desc: "A small Edit button sits on every section header. Click it for a compact popover form that floats over the content, plus inline “+ Add” chips to grow lists directly in the CV.",
    hints: [
      "Always-visible Edit button on each header",
      "Compact popover form, scrollable for lists",
      "“+ Add” chips append entries straight into the CV",
    ],
  },
];

export const DesignDrafts = () => {
  const { data, helpers, reset } = useDraftData();

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
              <h1 className="text-sm font-semibold">CV editor — design drafts</h1>
              <p className="text-xs text-muted-foreground">
                Three live prototypes for editing sections directly in the CV. All edits are demo-only.
              </p>
            </div>
          </div>
          <Button size="sm" variant="outline" onClick={reset}>
            <RotateCcw className="h-3.5 w-3.5" /> Reset demo
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-6">
        <div className="mb-6 grid gap-3 md:grid-cols-3">
          {DRAFT_META.map((d) => (
            <div key={d.id} className="rounded-lg border border-border bg-card p-3 text-xs">
              <div className="mb-1 font-semibold">{d.name}</div>
              <p className="mb-2 text-muted-foreground">{d.desc}</p>
              <ul className="space-y-0.5 text-muted-foreground">
                {d.hints.map((hint) => (
                  <li key={hint} className="flex gap-1.5">
                    <MousePointerClick className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                    {hint}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Tabs defaultValue="inline" className="w-full">
          <TabsList className="mb-4">
            {DRAFT_META.map((d) => (
              <TabsTrigger key={d.id} value={d.id}>{d.name}</TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="inline" className="rounded-xl border border-border bg-background shadow-sm">
            <DraftInline data={data} h={helpers} />
          </TabsContent>
          <TabsContent value="drawer" className="rounded-xl border border-border bg-background shadow-sm">
            <DraftDrawer data={data} h={helpers} />
          </TabsContent>
          <TabsContent value="floating" className="rounded-xl border border-border bg-background shadow-sm">
            <DraftFloating data={data} h={helpers} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default DesignDrafts;
