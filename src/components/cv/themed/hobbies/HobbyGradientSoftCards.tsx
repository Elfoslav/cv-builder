import { type Hobby } from "@/lib/cv-types";
import { type CardColumns } from "@/lib/cv-types";
import { CVCard } from "@/components/cv/CVCard";
import { ListCardGrid } from "@/components/cv/themed/shared/ListCardGrid";
import { HobbyCardContent } from "./HobbyCardContent";

/** Soft gradient icon cards — mirrors the list "Soft gradient cards" look. */
export const HobbyGradientSoftCards = ({ hobbies, columns = 4 }: { hobbies: Hobby[]; columns?: CardColumns }) => (
  <ListCardGrid
    items={hobbies}
    columns={columns}
    getKey={(h) => h.id}
    render={(hb) => (
      <CVCard tone="gradient" className="cv-hobby-card flex flex-col rounded-lg p-5">
        <HobbyCardContent hobby={hb} />
      </CVCard>
    )}
  />
);