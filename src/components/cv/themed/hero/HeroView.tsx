import { type CVData } from "@/lib/cv-types";
import { type HeroLayout } from "@/lib/section-designs";
import { HeroGradient } from "./HeroGradient";
import { HeroCentered } from "./HeroCentered";
import { HeroPlain } from "./HeroPlain";
import { HeroSplit } from "./HeroSplit";
import { HeroCompact } from "./HeroCompact";

/** Picks the hero design variant per the section design id. */
export const HeroView = ({ data, variant }: { data: CVData; variant: HeroLayout }) => {
  if (variant === "center") return <HeroCentered data={data} />;
  if (variant === "plain") return <HeroPlain data={data} />;
  if (variant === "split") return <HeroSplit data={data} />;
  if (variant === "compact") return <HeroCompact data={data} />;
  return <HeroGradient data={data} />;
};