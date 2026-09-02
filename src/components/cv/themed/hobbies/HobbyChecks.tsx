import { Check } from "lucide-react";
import { type Hobby } from "@/lib/cv-types";

/** Checkbox-style list, two columns. */
export const HobbyChecks = ({ hobbies }: { hobbies: Hobby[] }) => (
  <ul className="grid grid-cols-1 gap-2.5 md:grid-cols-2 print-grid-2-tight">
    {hobbies.map((hb) => (
      <li
        key={hb.id}
        className="cv-hobby-check flex items-center gap-2.5 text-sm text-foreground"
      >
        <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
        {hb.label}
      </li>
    ))}
  </ul>
);