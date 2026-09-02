import { type Hobby, type CardColumns } from "@/lib/cv-types";
import { type HobbyLayout } from "@/lib/section-designs";
import { HobbyGradientSoftCards } from "./HobbyGradientSoftCards";
import { HobbyGradientBorderCards } from "./HobbyGradientBorderCards";
import { HobbyGradientBandCards } from "./HobbyGradientBandCards";
import { HobbyGradientHeadlineCards } from "./HobbyGradientHeadlineCards";
import { HobbyFlatCards } from "./HobbyFlatCards";
import { HobbyAccentCards } from "./HobbyAccentCards";
import { HobbyPills } from "./HobbyPills";
import { HobbyChecks } from "./HobbyChecks";

interface HobbiesViewProps {
  hobbies: Hobby[];
  variant: HobbyLayout;
  /** Columns for the shared card designs; ignored by pills / checklist. */
  columns?: CardColumns;
}

export const HobbiesView = ({ hobbies, variant, columns = 4 }: HobbiesViewProps) => {
  switch (variant) {
    case "cards-gradient-border":
      return <HobbyGradientBorderCards hobbies={hobbies} columns={columns} />;
    case "cards-gradient-band":
      return <HobbyGradientBandCards hobbies={hobbies} columns={columns} />;
    case "cards-gradient-headline":
      return <HobbyGradientHeadlineCards hobbies={hobbies} columns={columns} />;
    case "cards-flat":
      return <HobbyFlatCards hobbies={hobbies} columns={columns} />;
    case "cards-accent":
      return <HobbyAccentCards hobbies={hobbies} columns={columns} />;
    case "pills":
      return <HobbyPills hobbies={hobbies} />;
    case "checks":
      return <HobbyChecks hobbies={hobbies} />;
    default:
      return <HobbyGradientSoftCards hobbies={hobbies} columns={columns} />;
  }
};