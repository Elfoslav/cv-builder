import { Check } from "lucide-react";
import { splitParagraphs } from "@/components/cv/cv-utils";

/** Each paragraph becomes a marked highlight line. */
export const AboutHighlights = ({ about }: { about: string }) => (
  <ul className="space-y-3">
    {splitParagraphs(about).map((p, i) => (
      <li key={i} className="flex gap-3 text-muted-foreground">
        <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
        <p className="text-base leading-relaxed">{p}</p>
      </li>
    ))}
  </ul>
);