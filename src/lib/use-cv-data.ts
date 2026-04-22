import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CVData, defaultCV, SkillGroup } from "./cv-types";

const STORAGE_KEY = "cv-builder-data-v1";

const migrate = (parsed: Partial<CVData> & { skills?: Array<{ group?: string }> }): CVData => {
  const merged: CVData = { ...defaultCV, ...parsed } as CVData;

  // Migrate legacy "languages" / "frameworks" group keys to dynamic groups
  const legacyMap: Record<string, { id: string; name: string }> = {
    languages: { id: "g_lang", name: "Programming Languages" },
    frameworks: { id: "g_tools", name: "Tools & Technologies" },
  };

  const groups: SkillGroup[] = Array.isArray(merged.skillGroups) && merged.skillGroups.length > 0
    ? merged.skillGroups
    : [...defaultCV.skillGroups];

  const groupIds = new Set(groups.map((g) => g.id));

  merged.skills = (merged.skills ?? []).map((s) => {
    if (s.group && legacyMap[s.group]) {
      const target = legacyMap[s.group];
      if (!groupIds.has(target.id)) {
        groups.push(target);
        groupIds.add(target.id);
      }
      return { ...s, group: target.id };
    }
    if (!s.group || !groupIds.has(s.group)) {
      return { ...s, group: groups[0]?.id ?? "g_lang" };
    }
    return s;
  });

  merged.skillGroups = groups;
  return merged;
};

export const useCVData = (): {
  data: CVData;
  setData: Dispatch<SetStateAction<CVData>>;
  reset: () => void;
} => {
  const [data, setData] = useState<CVData>(() => {
    if (typeof window === "undefined") return defaultCV;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultCV;
      const parsed = JSON.parse(raw) as Partial<CVData>;
      return migrate(parsed);
    } catch {
      return defaultCV;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore quota errors
    }
  }, [data]);

  const reset = () => setData(defaultCV);

  return { data, setData, reset };
};
