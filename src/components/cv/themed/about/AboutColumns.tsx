import { splitParagraphs } from "@/components/cv/cv-utils";

/** Paragraphs flow into two balanced columns. */
export const AboutColumns = ({ about }: { about: string }) => (
  <div className="grid gap-4 text-muted-foreground md:grid-cols-2 md:gap-x-8">
    {splitParagraphs(about).map((p, i) => (
      <p key={i} className="text-base leading-relaxed">{p}</p>
    ))}
  </div>
);