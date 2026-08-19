import { SkillBar } from "@/components/cv/SkillBar";
import { type Skill, type SkillGroup } from "@/lib/cv-types";
import { type SkillLayout } from "@/lib/section-designs";

export interface SkillGroupWithItems {
  group: SkillGroup;
  items: Skill[];
}

interface SkillsViewProps {
  groups: SkillGroupWithItems[];
  variant: SkillLayout;
}

const GroupHeading = ({ name }: { name: string }) => (
  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent">{name}</h3>
);

/** Classic animated progress bars, grouped in two columns. */
const Bars = ({ groups }: { groups: SkillGroupWithItems[] }) => (
  <div className="cv-skills grid gap-x-8 gap-y-6 md:grid-cols-2 print-grid-2">
    {groups.map(({ group, items }) => (
      <div key={group.id} className="avoid-break">
        <GroupHeading name={group.name} />
        <div className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
          {items.map((s) => (
            <SkillBar key={s.id} name={s.name} percentage={s.percentage} color={s.color} />
          ))}
        </div>
      </div>
    ))}
  </div>
);

/** Compact pill tags, one row per group. */
const Chips = ({ groups }: { groups: SkillGroupWithItems[] }) => (
  <div className="space-y-6">
    {groups.map(({ group, items }) => (
      <div key={group.id} className="avoid-break">
        <GroupHeading name={group.name} />
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

/** Type-driven list: a small dot per skill with a percentage on the right. */
const Dots = ({ groups }: { groups: SkillGroupWithItems[] }) => (
  <div className="space-y-6">
    {groups.map(({ group, items }) => (
      <div key={group.id} className="avoid-break">
        <GroupHeading name={group.name} />
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

export const SkillsView = ({ groups, variant }: SkillsViewProps) => {
  if (variant === "chips") return <Chips groups={groups} />;
  if (variant === "dots") return <Dots groups={groups} />;
  return <Bars groups={groups} />;
};