import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { type CardColumns } from "@/lib/cv-types";

const OPTIONS: { value: CardColumns; name: string }[] = [
  { value: 1, name: "1 column" },
  { value: 2, name: "2 columns" },
  { value: 3, name: "3 columns" },
];

interface CardColumnsPickerProps {
  value: CardColumns;
  onChange: (columns: CardColumns) => void;
  label?: string;
  className?: string;
}

/** Small select for setting how many columns the card designs render in. */
export const CardColumnsPicker = ({
  value, onChange, label = "Columns", className,
}: CardColumnsPickerProps) => (
  <div className={cn("mb-4", className)}>
    <div className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
      {label}
    </div>
    <Select value={String(value)} onValueChange={(v) => onChange(Number(v) as CardColumns)}>
      <SelectTrigger className="h-9 text-xs" aria-label={label}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {OPTIONS.map((o) => (
          <SelectItem key={o.value} value={String(o.value)}>{o.name}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);