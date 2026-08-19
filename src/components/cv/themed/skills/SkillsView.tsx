import { type Skill, type SkillGroup } from "@/lib/cv-types";
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
}

export const SkillsView = ({ groups, variant }: SkillsViewProps) => {
  if (variant === "chips") return <SkillChips groups={groups} />;
  if (variant === "dots") return <SkillDots groups={groups} />;
  return <SkillBars groups={groups} />;
};