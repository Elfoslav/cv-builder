import { type SkillColumnsMap } from "@/lib/cv-types";
import { cardGridClass } from "@/components/cv/cv-utils";
import type { SkillGroupWithItems } from "./SkillsView";
import { SkillGroupHeading } from "./SkillGroupHeading";

/** Compact pill tags, grouped in a configurable number of columns. */
export const SkillChips = ({ groups, columns }: { groups: SkillGroupWithItems[]; columns: SkillColumnsMap }) => (
  <div className={cardGridClass(columns.groups, "space-y-6", "gap-x-8 gap-y-6")}>
    {groups.map(({ group, items }) => (
      <div key={group.id} className="cv-skill-group">
        <SkillGroupHeading name={group.name} />
        <div className={cardGridClass(columns.skills, "flex flex-wrap gap-2", "gap-2")}>
          {items.map((s) => (
            <span
              key={s.id}
              className="cv-skill-chip rounded-full border border-primary/25 bg-primary/[0.06] px-3 py-1 text-xs font-medium text-primary"
            >
              {s.name}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
);