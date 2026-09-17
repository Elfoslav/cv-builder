import { type Hobby } from "@/lib/cv-types";
import { type CardColumns } from "@/lib/cv-types";
import { CVCard } from "@/components/cv/CVCard";
import { ListCardGrid } from "@/components/cv/themed/shared/ListCardGrid";
import { HobbyCardContent } from "./HobbyCardContent";

/** Icon tiles with the same gradient accent bar as the list accent cards. */
export const HobbyAccentCards = ({ hobbies, columns = 4 }: { hobbies: Hobby[]; columns?: CardColumns }) => (
  <ListCardGrid
    items={hobbies}
    columns={columns}
    getKey={(h) => h.id}
    stackedClass="space-y-2"
    render={(hb) => (
      <CVCard accent className="cv-hobby-card rounded-md px-3 py-2.5">
        <HobbyCardContent hobby={hb} horizontal />
      </CVCard>
    )}
  />
);