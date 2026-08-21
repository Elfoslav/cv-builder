import { type Hobby } from "@/lib/cv-types";
import { type CardColumns } from "@/lib/cv-types";
import { ListCardGrid } from "@/components/cv/themed/shared/ListCardGrid";
import { HobbyCardContent } from "./HobbyCardContent";

/** Icon cards framed by the same thin gradient outline as the list cards. */
export const HobbyGradientBorderCards = ({ hobbies, columns = 4 }: { hobbies: Hobby[]; columns?: CardColumns }) => (
  <ListCardGrid
    items={hobbies}
    columns={columns}
    getKey={(h) => h.id}
    render={(hb) => (
      <div className="cv-hobby-card rounded-lg bg-gradient-primary p-px shadow-card">
        <div className="flex h-full flex-col rounded-[calc(var(--radius)-2px)] bg-card p-5 text-center">
          <HobbyCardContent hobby={hb} />
        </div>
      </div>
    )}
  />
);