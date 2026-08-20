import { type CVData } from "@/lib/cv-types";
import { type HeroLayout } from "@/lib/section-designs";
import { HeroGradient } from "./HeroGradient";
import { HeroCentered } from "./HeroCentered";
import { HeroGradientBanner } from "./HeroGradientBanner";
import { HeroGradientBorder } from "./HeroGradientBorder";
import { HeroGradientHeadline } from "./HeroGradientHeadline";
import { HeroPlain } from "./HeroPlain";
import { HeroSplit } from "./HeroSplit";
import { HeroCompact } from "./HeroCompact";
import { HeroCenteredFlat } from "./HeroCenteredFlat";
import { HeroCard } from "./HeroCard";

/** Picks the hero design variant per the section design id. */
export const HeroView = ({ data, variant }: { data: CVData; variant: HeroLayout }) => {
  switch (variant) {
    case "center":
      return <HeroCentered data={data} />;
    case "gradient-banner":
      return <HeroGradientBanner data={data} />;
    case "gradient-border":
      return <HeroGradientBorder data={data} />;
    case "gradient-headline":
      return <HeroGradientHeadline data={data} />;
    case "plain":
      return <HeroPlain data={data} />;
    case "split":
      return <HeroSplit data={data} />;
    case "compact":
      return <HeroCompact data={data} />;
    case "flat-center":
      return <HeroCenteredFlat data={data} />;
    case "card":
      return <HeroCard data={data} />;
    default:
      return <HeroGradient data={data} />;
  }
};