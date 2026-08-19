import { Check } from "lucide-react";
import { type AboutLayout } from "@/lib/section-designs";

interface AboutViewProps {
  about: string;
  variant: AboutLayout;
}

const splitParagraphs = (about: string): string[] => about.split("\n\n").filter(Boolean);

/** Split into paragraphs, one after the other (the default look). */
const Paragraphs = ({ about }: { about: string }) => (
  <div className="space-y-4 text-muted-foreground">
    {splitParagraphs(about).map((p, i) => (
      <p key={i} className="text-base leading-relaxed">{p}</p>
    ))}
  </div>
);

/** Each paragraph becomes a marked highlight line. */
const Highlights = ({ about }: { about: string }) => (
  <ul className="space-y-3">
    {splitParagraphs(about).map((p, i) => (
      <li key={i} className="flex gap-3 text-muted-foreground">
        <Check className="mt-1 h-4 w-4 shrink-0 text-primary" />
        <p className="text-base leading-relaxed">{p}</p>
      </li>
    ))}
  </ul>
);

/** Paragraphs flow into two balanced columns. */
const Columns = ({ about }: { about: string }) => (
  <div className="grid gap-4 text-muted-foreground md:grid-cols-2 md:gap-x-8">
    {splitParagraphs(about).map((p, i) => (
      <p key={i} className="text-base leading-relaxed">{p}</p>
    ))}
  </div>
);

export const AboutView = ({ about, variant }: AboutViewProps) => {
  if (variant === "highlights") return <Highlights about={about} />;
  if (variant === "columns") return <Columns about={about} />;
  return <Paragraphs about={about} />;
};