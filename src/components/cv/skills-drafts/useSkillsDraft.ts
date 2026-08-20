import { useState } from "react";

export interface MockSkill {
  id: string;
  name: string;
  percentage: number;
  group: string;
}

export interface MockGroup {
  id: string;
  name: string;
}

const INITIAL_GROUPS: MockGroup[] = [
  { id: "g_lang", name: "Programming Languages" },
  { id: "g_tools", name: "Tools & Technologies" },
  { id: "g_design", name: "Design" },
];

const INITIAL_SKILLS: MockSkill[] = [
  { id: "s1", name: "TypeScript", percentage: 95, group: "g_lang" },
  { id: "s2", name: "Python", percentage: 88, group: "g_lang" },
  { id: "s3", name: "Go", percentage: 70, group: "g_lang" },
  { id: "s4", name: "React / Next.js", percentage: 96, group: "g_tools" },
  { id: "s5", name: "Node.js", percentage: 90, group: "g_tools" },
  { id: "s6", name: "PostgreSQL", percentage: 82, group: "g_tools" },
  { id: "s7", name: "Docker / K8s", percentage: 74, group: "g_tools" },
  { id: "s8", name: "Figma", percentage: 60, group: "g_design" },
  { id: "s9", name: "Design Systems", percentage: 45, group: "g_design" },
];

let counter = 0;
export const uid = () => `skill-${++counter}-${Math.random().toString(36).slice(2, 6)}`;

export interface SkillsDraft {
  groups: MockGroup[];
  skills: MockSkill[];
  addGroup: (name: string) => void;
  renameGroup: (id: string, name: string) => void;
  deleteGroup: (id: string) => void;
  moveGroup: (id: string, dir: -1 | 1) => void;
  addSkill: (groupId: string, name?: string, percentage?: number) => void;
  patchSkill: (id: string, patch: Partial<MockSkill>) => void;
  deleteSkill: (id: string) => void;
  moveSkill: (id: string, dir: -1 | 1) => void;
  skillsIn: (groupId: string) => MockSkill[];
}

/** Mock state + actions shared by every skills-editor draft. */
export const useSkillsDraft = (): SkillsDraft => {
  const [groups, setGroups] = useState<MockGroup[]>(INITIAL_GROUPS);
  const [skills, setSkills] = useState<MockSkill[]>(INITIAL_SKILLS);

  const addGroup = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (groups.some((g) => g.name.toLowerCase() === trimmed.toLowerCase())) return;
    setGroups((gs) => [...gs, { id: uid(), name: trimmed }]);
  };

  const renameGroup = (id: string, name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setGroups((gs) => gs.map((g) => (g.id === id ? { ...g, name: trimmed } : g)));
  };

  const deleteGroup = (id: string) => {
    if (groups.length <= 1) return;
    const fallback = groups.find((g) => g.id !== id)!.id;
    setGroups((gs) => gs.filter((g) => g.id !== id));
    setSkills((ss) => ss.map((s) => (s.group === id ? { ...s, group: fallback } : s)));
  };

  const moveGroup = (id: string, dir: -1 | 1) => {
    setGroups((gs) => {
      const idx = gs.findIndex((g) => g.id === id);
      const target = idx + dir;
      if (idx < 0 || target < 0 || target >= gs.length) return gs;
      const next = [...gs];
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };

  const addSkill = (groupId: string, name?: string, percentage?: number) => {
    const trimmed = name?.trim();
    setSkills((ss) => [
      ...ss,
      { id: uid(), name: trimmed ?? "New skill", percentage: percentage ?? 50, group: groupId },
    ]);
  };

  const patchSkill = (id: string, patch: Partial<MockSkill>) =>
    setSkills((ss) => ss.map((s) => (s.id === id ? { ...s, ...patch } : s)));

  const deleteSkill = (id: string) => setSkills((ss) => ss.filter((s) => s.id !== id));

  const moveSkill = (id: string, dir: -1 | 1) => {
    setSkills((prev) => {
      const skill = prev.find((s) => s.id === id);
      if (!skill) return prev;
      const sameGroup = prev.map((s, i) => ({ s, i })).filter(({ s }) => s.group === skill.group).map(({ i }) => i);
      const pos = sameGroup.findIndex((i) => prev[i].id === id);
      const target = pos + dir;
      if (pos < 0 || target < 0 || target >= sameGroup.length) return prev;
      const next = [...prev];
      [next[sameGroup[pos]], next[sameGroup[target]]] = [next[sameGroup[target]], next[sameGroup[pos]]];
      return next;
    });
  };

  const skillsIn = (groupId: string) => skills.filter((s) => s.group === groupId);

  return {
    groups, skills,
    addGroup, renameGroup, deleteGroup, moveGroup,
    addSkill, patchSkill, deleteSkill, moveSkill, skillsIn,
  };
};