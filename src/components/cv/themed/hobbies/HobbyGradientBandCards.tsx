import { type Hobby } from "@/lib/cv-types";
import { type CardColumns } from "@/lib/cv-types";
import { CVCard } from "@/components/cv/CVCard";
import { ListCardGrid } from "@/components/cv/themed/shared/ListCardGrid";
import { HobbyCardContent } from "./HobbyCardContent";

/** Icon cards topped with the same gradient band as the list cards. */
export const HobbyGradientBandCards = ({ hobbies, columns = 4 }: { hobbies: Hobby[]; columns?: CardColumns }) => (
  <ListCardGrid
    items={hobbies}
    columns={columns}
    getKey={(h) => h.id}
    render={(hb) => (
      <CVCard className="cv-hobby-card relative flex flex-col overflow-hidden rounded-lg p-5 pt-6">
        <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-primary" />
        <HobbyCardContent hobby={hb} />
      </CVCard>
    )}
  />
);