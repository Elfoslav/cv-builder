import { type Hobby } from "@/lib/cv-types";
import { type CardColumns } from "@/lib/cv-types";
import { CVCard } from "@/components/cv/CVCard";
import { ListCardGrid } from "@/components/cv/themed/shared/ListCardGrid";
import { HobbyCardContent } from "./HobbyCardContent";

/** Flat horizontal tiles with an icon badge — mirrors the list "Flat cards" look. */
export const HobbyFlatCards = ({ hobbies, columns = 4 }: { hobbies: Hobby[]; columns?: CardColumns }) => (
  <ListCardGrid
    items={hobbies}
    columns={columns}
    getKey={(h) => h.id}
    stackedClass="space-y-2"
    render={(hb) => (
      <CVCard tone="flat" className="cv-hobby-card cv-hobby-tile rounded-md px-3 py-2.5">
        <HobbyCardContent hobby={hb} horizontal />
      </CVCard>
    )}
  />
);