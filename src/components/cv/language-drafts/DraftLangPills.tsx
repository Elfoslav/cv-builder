import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDraftActions, type DraftLangProps } from "./useLangDraft";
import { LangMenuContent, LangDialogs } from "./LangShared";

/** C · Inline pills: all languages visible in one row; settings in a gear menu. */
export const DraftLangPills = (props: DraftLangProps) => {
  const m = useDraftActions(props);

  return (
    <>
      <div className="flex items-center gap-1">
        {m.languages.map((l) => {
          const active = l.id === m.activeId;
          return (
            <Button
              key={l.id}
              size="sm"
              variant="ghost"
              onClick={() => m.setActiveId(l.id)}
              className={cn(
                "h-7 rounded-full border px-2.5 text-xs",
                active
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background text-muted-foreground hover:text-foreground",
              )}
            >
              {l.name}
            </Button>
          );
        })}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7" title="Language settings">
              <Settings2 className="h-3.5 w-3.5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-52">
            <LangMenuContent m={m} />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <LangDialogs m={m} />
    </>
  );
};