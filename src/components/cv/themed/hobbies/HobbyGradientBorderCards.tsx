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
      <div className="cv-hobby-card relative rounded-lg p-px shadow-card">
        {/* Soft gradient outline — matched to the badge/pill/chip border weight. */}
        <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-primary opacity-30" />
        <div className="relative flex h-full flex-col rounded-[calc(var(--radius)-2px)] bg-card p-5 text-center">
          <HobbyCardContent hobby={hb} />
        </div>
      </div>
    )}
  />
);