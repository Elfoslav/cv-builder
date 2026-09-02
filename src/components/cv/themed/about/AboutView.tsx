import { type AboutLayout } from "@/lib/section-designs";
import { AboutParagraphs } from "./AboutParagraphs";
import { AboutHighlights } from "./AboutHighlights";
import { AboutColumns } from "./AboutColumns";

interface AboutViewProps {
  about: string;
  variant: AboutLayout;
}

export const AboutView = ({ about, variant }: AboutViewProps) => {
  if (variant === "highlights") return <AboutHighlights about={about} />;
  if (variant === "columns") return <AboutColumns about={about} />;
  return <AboutParagraphs about={about} />;
};