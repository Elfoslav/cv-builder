import type { SkillGroupWithItems } from "./SkillsView";
import { SkillGroupHeading } from "./SkillGroupHeading";

/** Type-driven list: a small dot per skill with a percentage on the right. */
export const SkillDots = ({ groups }: { groups: SkillGroupWithItems[] }) => (
  <div className="space-y-6">
    {groups.map(({ group, items }) => (
      <div key={group.id} className="avoid-break">
        <SkillGroupHeading name={group.name} />
        <ul className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2 print-grid-2">
          {items.map((s) => (
            <li key={s.id} className="flex items-center gap-2.5 text-sm">
              <span className="cv-skill-dot h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span className="font-medium text-foreground">{s.name}</span>
              <span className="ml-auto text-[11px] text-muted-foreground">{s.percentage}%</span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);