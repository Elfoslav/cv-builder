import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronDown, Palette } from "lucide-react";
import { THEMES, type ThemeId } from "@/lib/themes";

interface ThemeSwitcherProps {
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
}

/** Compact color-theme picker, styled to match the language switcher. */
export const ThemeSwitcher = ({ theme, setTheme }: ThemeSwitcherProps) => {
  const [open, setOpen] = useState(false);
  const active = THEMES.find((t) => t.id === theme);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-7 gap-1.5 px-2 text-xs" title="Color theme">
          <Palette className="h-3.5 w-3.5 text-primary" />
          <span className="max-w-24 truncate">{active?.name}</span>
          <ChevronDown className="h-3 w-3 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel className="text-xs text-muted-foreground">Color theme</DropdownMenuLabel>
        {THEMES.map((t) => (
          <DropdownMenuItem key={t.id} onClick={() => { setTheme(t.id); setOpen(false); }}>
            <span className="flex items-center gap-2">
              <span className="flex gap-0.5">
                {t.swatches.slice(0, 3).map((c) => (
                  <span key={c} className="h-3 w-3 rounded-full border border-border" style={{ background: c }} />
                ))}
              </span>
              <span className="flex-1">{t.name}</span>
              {t.id === theme && <Check className="h-3.5 w-3.5 text-primary" />}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};