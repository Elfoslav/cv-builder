import { useMemo, type Dispatch, type SetStateAction } from "react";
import { CVData, CVLabels } from "@/lib/cv-types";
import { type SectionDesigns } from "@/lib/section-designs";

export type { ListKey, SectionKey } from "@/lib/cv-types";

export interface CVActions {
  setData: Dispatch<SetStateAction<CVData>>;
  update: <K extends keyof CVData>(key: K, value: CVData[K]) => void;
  patchItem: <K extends ListKey>(key: K, id: string, patch: Partial<CVData[K][number]>) => void;
  removeItem: (key: ListKey, id: string) => void;
  appendItem: <K extends ListKey>(key: K, item: CVData[K][number]) => void;
  moveItem: (key: ListKey, id: string, dir: -1 | 1) => void;
  setLabel: (key: keyof CVLabels, value: string) => void;
  moveSection: (key: SectionKey, dir: -1 | 1) => void;
  setSectionDesign: <K extends keyof SectionDesigns>(key: K, design: SectionDesigns[K]) => void;
}

export const ITEM_LABEL: Record<ListKey, string> = {
  experience: "experience entry",
  education: "education entry",
  projects: "project",
  hobbies: "hobby",
  skills: "skill",
};

const uid = () => Math.random().toString(36).slice(2, 9);

export const blankItem = <K extends ListKey>(key: K): CVData[K][number] => {
  const id = uid();
  switch (key) {
    case "experience":
      return {
        id, period: "2025 — Present", title: "Role", company: "Company",
        location: "", description: "", tags: "",
      } as CVData[K][number];
    case "education":
      return {
        id, period: "", title: "Degree", school: "School",
        location: "", description: "", tags: "",
      } as CVData[K][number];
    case "projects":
      return { id, name: "Project", period: "", description: "", stack: "" } as CVData[K][number];
    case "hobbies":
      return { id, label: "Hobby", icon: "Code2" } as CVData[K][number];
    case "skills":
      return { id, name: "Skill", percentage: 50, color: "green", group: "" } as CVData[K][number];
  }
};

export const useCVActions = (setData: Dispatch<SetStateAction<CVData>>): CVActions =>
  useMemo(
    () => ({
      setData,
      update: (key, value) => setData((prev) => ({ ...prev, [key]: value })),
      patchItem: (key, id, patch) =>
        setData((prev) => ({
          ...prev,
          [key]: (prev[key] as Array<{ id: string }>).map((item) =>
            item.id === id ? { ...item, ...patch } : item,
          ),
        }) as CVData),
      removeItem: (key, id) =>
        setData((prev) => ({
          ...prev,
          [key]: (prev[key] as Array<{ id: string }>).filter((item) => item.id !== id),
        }) as CVData),
      appendItem: (key, item) =>
        setData((prev) => ({
          ...prev,
          [key]: [...(prev[key] as Array<unknown>), item],
        }) as CVData),
      moveItem: (key, id, dir) =>
        setData((prev) => {
          const list = [...(prev[key] as Array<{ id: string }>)];
          const idx = list.findIndex((it) => it.id === id);
          const target = idx + dir;
          if (idx < 0 || target < 0 || target >= list.length) return prev;
          [list[idx], list[target]] = [list[target], list[idx]];
          return { ...prev, [key]: list } as CVData;
        }),
      setLabel: (key, value) =>
        setData((prev) => ({ ...prev, labels: { ...prev.labels, [key]: value } })),
      moveSection: (key, dir) =>
        setData((prev) => {
          const order = [...prev.sectionOrder];
          const idx = order.indexOf(key);
          // Hero (index 0) and footer (last) are pinned in place.
          if (idx < 1 || idx >= order.length - 1) return prev;
          const target = idx + dir;
          if (target < 1 || target >= order.length - 1) return prev;
          [order[idx], order[target]] = [order[target], order[idx]];
          return { ...prev, sectionOrder: order };
        }),
      setSectionDesign: (key, design) =>
        setData((prev) => ({
          ...prev,
          sectionDesigns: { ...prev.sectionDesigns, [key]: design },
        })),
    }),
    [setData],
  );
