import { type Hobby } from "@/lib/cv-types";
import { type CardColumns } from "@/lib/cv-types";
import { CVCard } from "@/components/cv/CVCard";
import { ListCardGrid } from "@/components/cv/themed/shared/ListCardGrid";
import { HobbyCardContent } from "./HobbyCardContent";

/** Flat icon cards whose label is set in gradient text — the hobby analogue of gradient-headline cards. */
export const HobbyGradientHeadlineCards = ({ hobbies, columns = 4 }: { hobbies: Hobby[]; columns?: CardColumns }) => (
  <ListCardGrid
    items={hobbies}
    columns={columns}
    getKey={(h) => h.id}
    render={(hb) => (
      <CVCard tone="flat" className="cv-hobby-card flex flex-col rounded-lg p-5">
        <HobbyCardContent hobby={hb} labelClass="text-gradient-primary" />
      </CVCard>
    )}
  />
);