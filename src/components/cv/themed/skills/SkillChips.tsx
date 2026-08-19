import type { SkillGroupWithItems } from "./SkillsView";
import { SkillGroupHeading } from "./SkillGroupHeading";

/** Compact pill tags, one row per group. */
export const SkillChips = ({ groups }: { groups: SkillGroupWithItems[] }) => (
  <div className="space-y-6">
    {groups.map(({ group, items }) => (
      <div key={group.id} className="avoid-break">
        <SkillGroupHeading name={group.name} />
        <div className="flex flex-wrap gap-2">
          {items.map((s) => (
            <span
              key={s.id}
              className="cv-skill-chip rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-foreground"
            >
              {s.name}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
);