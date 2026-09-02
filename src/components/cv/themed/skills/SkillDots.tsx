import { type SkillColumnsMap } from "@/lib/cv-types";
import { cardGridClass } from "@/components/cv/cv-utils";
import type { SkillGroupWithItems } from "./SkillsView";
import { SkillGroupHeading } from "./SkillGroupHeading";

/** Type-driven list: a small dot per skill with a percentage on the right. */
export const SkillDots = ({ groups, columns }: { groups: SkillGroupWithItems[]; columns: SkillColumnsMap }) => (
  <div className={cardGridClass(columns.groups, "space-y-6", "gap-x-8 gap-y-6")}>
    {groups.map(({ group, items }) => (
      <div key={group.id} className="cv-skill-group">
        <SkillGroupHeading name={group.name} />
        <ul className={cardGridClass(columns.skills, "grid grid-cols-1 gap-y-2", "gap-x-6 gap-y-2")}>
          {items.map((s) => (
            <li key={s.id} className="cv-skill-dot flex items-center gap-2.5 text-sm">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span className="font-medium text-foreground">{s.name}</span>
              <span className="ml-auto text-[11px] text-muted-foreground">{s.percentage}%</span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);