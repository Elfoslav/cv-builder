import { useState } from "react";

export const SECTION_DESIGNS = [
  { id: "cards-gradient-soft", name: "Gradient cards" },
  { id: "cards-flat", name: "Flat cards" },
  { id: "cards-accent", name: "Accent cards" },
  { id: "rows", name: "Compact rows" },
  { id: "timeline", name: "Timeline" },
];

export interface PanelDraft {
  sectionDesign: string;
  groupColumns: number;
  skillColumns: number;
  setSectionDesign: (id: string) => void;
  setGroupColumns: (n: number) => void;
  setSkillColumns: (n: number) => void;
}

/** Mock design state shared by every panel-draft. Content fields are plain static inputs. */
export const usePanelDraft = (): PanelDraft => {
  const [sectionDesign, setSectionDesign] = useState(SECTION_DESIGNS[0].id);
  const [groupColumns, setGroupColumns] = useState(2);
  const [skillColumns, setSkillColumns] = useState(1);
  return { sectionDesign, groupColumns, skillColumns, setSectionDesign, setGroupColumns, setSkillColumns };
};