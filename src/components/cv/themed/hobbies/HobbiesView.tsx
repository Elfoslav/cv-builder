import { type Hobby } from "@/lib/cv-types";
import { type HobbyLayout } from "@/lib/section-designs";
import { HobbyCards } from "./HobbyCards";
import { HobbyFlatCards } from "./HobbyFlatCards";
import { HobbyAccentCards } from "./HobbyAccentCards";
import { HobbyPills } from "./HobbyPills";
import { HobbyChecks } from "./HobbyChecks";

interface HobbiesViewProps {
  hobbies: Hobby[];
  variant: HobbyLayout;
}

export const HobbiesView = ({ hobbies, variant }: HobbiesViewProps) => {
  if (variant === "cards-flat") return <HobbyFlatCards hobbies={hobbies} />;
  if (variant === "cards-accent") return <HobbyAccentCards hobbies={hobbies} />;
  if (variant === "pills") return <HobbyPills hobbies={hobbies} />;
  if (variant === "checks") return <HobbyChecks hobbies={hobbies} />;
  return <HobbyCards hobbies={hobbies} />;
};