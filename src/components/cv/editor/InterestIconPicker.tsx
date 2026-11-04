import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { HOBBY_ICONS, type HobbyIconName } from "@/lib/cv-types";
import { ICON_MAP } from "@/components/cv/hobby-icons";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export const InterestIconPicker = ({ value, label, onChange }: {
  value: HobbyIconName;
  label: string;
  onChange: (value: HobbyIconName) => void;
}) => {
  const [open, setOpen] = useState(false);
  const SelectedIcon = value === "none" ? null : ICON_MAP[value];
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button type="button" variant="outline" role="combobox" aria-expanded={open} aria-label={`Icon for ${label}`} className="w-full shrink-0 justify-between font-normal sm:w-40">
          <span className="flex min-w-0 items-center gap-2 truncate">
            {SelectedIcon && <SelectedIcon aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-primary" />}
            <span className="truncate">{value === "none" ? "No icon" : value}</span>
          </span>
          <ChevronsUpDown aria-hidden="true" className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-56 p-0">
        <Command label="Search interest icons">
          <CommandInput placeholder="Search icons..." aria-label="Search interest icons" />
          <CommandList>
            <CommandEmpty>No icons found.</CommandEmpty>
            {HOBBY_ICONS.map((icon) => {
              const Icon = icon === "none" ? null : ICON_MAP[icon];
              const name = icon === "none" ? "No icon" : icon;
              return (
                <CommandItem key={icon} value={name} onSelect={() => { onChange(icon); setOpen(false); }}>
                  <Check aria-hidden="true" className={cn("mr-2 h-4 w-4", value === icon ? "opacity-100" : "opacity-0")} />
                  {Icon && <Icon aria-hidden="true" className="mr-2 h-4 w-4 text-primary" />}
                  {name}
                </CommandItem>
              );
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
