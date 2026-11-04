import { SkillBar } from "@/components/cv/SkillBar";
import { type SkillColumnsMap } from "@/lib/cv-types";
import { cn } from "@/lib/utils";
import { cardGridClass } from "@/components/cv/cv-utils";
import type { SkillGroupWithItems } from "./SkillsView";
import { SkillGroupHeading } from "./SkillGroupHeading";

/** Classic animated progress bars, grouped in a configurable number of columns. */
export const SkillBars = ({ groups, columns }: { groups: SkillGroupWithItems[]; columns: SkillColumnsMap }) => (
  <div className={cn("cv-skills", cardGridClass(columns.groups, "space-y-6", "gap-x-8 gap-y-6"))}>
    {groups.map(({ group, items }) => (
      <div key={group.id} className="cv-skill-group">
        <SkillGroupHeading name={group.name} />
        <div className={cardGridClass(columns.skills, "grid grid-cols-1 gap-y-2.5", "gap-x-6 gap-y-2.5")}>
          {items.map((s) => (
            <SkillBar key={s.id} name={s.name} percentage={s.percentage} color={s.color} />
          ))}
        </div>
      </div>
    ))}
  </div>
);