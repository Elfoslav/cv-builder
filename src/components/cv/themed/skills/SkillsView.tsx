import { type Skill, type SkillGroup, type SkillColumnsMap } from "@/lib/cv-types";
import { type SkillLayout } from "@/lib/section-designs";
import { SkillBars } from "./SkillBars";
import { SkillChips } from "./SkillChips";
import { SkillDots } from "./SkillDots";

export interface SkillGroupWithItems {
  group: SkillGroup;
  items: Skill[];
}

interface SkillsViewProps {
  groups: SkillGroupWithItems[];
  variant: SkillLayout;
  /** Column counts for the skill groups and the skills inside them. */
  columns: SkillColumnsMap;
}

export const SkillsView = ({ groups, variant, columns }: SkillsViewProps) => {
  if (variant === "chips") return <SkillChips groups={groups} columns={columns} />;
  if (variant === "dots") return <SkillDots groups={groups} columns={columns} />;
  return <SkillBars groups={groups} columns={columns} />;
};