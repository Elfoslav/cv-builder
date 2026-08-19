import { SkillBar } from "@/components/cv/SkillBar";
import type { SkillGroupWithItems } from "./SkillsView";
import { SkillGroupHeading } from "./SkillGroupHeading";

/** Classic animated progress bars, grouped in two columns. */
export const SkillBars = ({ groups }: { groups: SkillGroupWithItems[] }) => (
  <div className="cv-skills grid gap-x-8 gap-y-6 md:grid-cols-2 print-grid-2">
    {groups.map(({ group, items }) => (
      <div key={group.id} className="avoid-break">
        <SkillGroupHeading name={group.name} />
        <div className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
          {items.map((s) => (
            <SkillBar key={s.id} name={s.name} percentage={s.percentage} color={s.color} />
          ))}
        </div>
      </div>
    ))}
  </div>
);