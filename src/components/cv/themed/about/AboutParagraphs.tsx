import { splitParagraphs } from "@/components/cv/cv-utils";

/** Split into paragraphs, one after the other (the default look). */
export const AboutParagraphs = ({ about }: { about: string }) => (
  <div className="space-y-4 text-muted-foreground">
    {splitParagraphs(about).map((p, i) => (
      <p key={i} className="text-base leading-relaxed">{p}</p>
    ))}
  </div>
);