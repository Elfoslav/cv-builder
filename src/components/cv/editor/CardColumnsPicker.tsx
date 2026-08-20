import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FieldLabel } from "@/components/cv/FieldLabel";
import { type CardColumns } from "@/lib/cv-types";

const OPTIONS: { value: CardColumns; name: string }[] = [
  { value: 1, name: "1 column" },
  { value: 2, name: "2 columns" },
  { value: 3, name: "3 columns" },
  { value: 4, name: "4 columns" },
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
    <FieldLabel label={label} />
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