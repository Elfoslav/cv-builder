import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { LEVELS, levelToPercentage, percentageToLevel, type Level } from "@/lib/skill-levels";

/** Compact proficiency dropdown used by the skills editor and its drafts. */
export const LevelSelect = ({
  value,
  onChange,
  className,
}: {
  value: number;
  onChange: (pct: number) => void;
  className?: string;
}) => (
  <Select value={percentageToLevel(value)} onValueChange={(v) => onChange(levelToPercentage(v as Level))}>
    <SelectTrigger className={`h-7 w-28 text-xs ${className ?? ""}`}>
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      {LEVELS.map((l) => (
        <SelectItem key={l} value={l}>
          {l}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);