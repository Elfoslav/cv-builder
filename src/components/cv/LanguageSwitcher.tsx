import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Languages } from "lucide-react";
import { useDraftActions, type DraftLangProps } from "./language-drafts/useLangDraft";
import { LangMenuContent, LangDialogs } from "./language-drafts/LangShared";

/**
 * Compact language switcher (design variant A).
 * One small trigger (icon + active language); switching and all
 * add/rename/delete actions live in the dropdown menu.
 */
export const LanguageSwitcher = (props: DraftLangProps) => {
  const m = useDraftActions(props);
  const active = m.languages.find((l) => l.id === m.activeId);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1.5 px-2">
            <Languages className="h-3.5 w-3.5 text-primary" />
            <span className="max-w-24 truncate">{active?.name}</span>
            <ChevronDown className="h-3 w-3 opacity-60" />
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