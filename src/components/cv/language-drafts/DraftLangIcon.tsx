import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { useDraftActions, type DraftLangProps } from "./useLangDraft";
import { LangMenuContent, LangDialogs } from "./LangShared";

/** B · Icon-only button: narrowest trigger. Active language shown as a tooltip. */
export const DraftLangIcon = (props: DraftLangProps) => {
  const m = useDraftActions(props);
  const active = m.languages.find((l) => l.id === m.activeId);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            title={`Language — ${active?.name}`}
          >
            <Languages className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-52">
          <LangMenuContent m={m} />
        </DropdownMenuContent>
      </DropdownMenu>
      <LangDialogs m={m} />
    </>
  );
};