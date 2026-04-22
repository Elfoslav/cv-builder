import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { CVData, defaultCV, SkillGroup } from "./cv-types";

const STORAGE_KEY = "cv-builder-data-v1";
const STORAGE_KEY_MULTI = "cv-builder-data-v2";

export interface CVLanguage {
  id: string;
  name: string; // e.g. "English", "Deutsch", "Français"
  data: CVData;
}

export interface MultiCVStore {
  languages: CVLanguage[];
  activeId: string;
}

const uid = () => Math.random().toString(36).slice(2, 9);

const migrateData = (parsed: Partial<CVData> & { skills?: Array<{ group?: string }> }): CVData => {
  const merged: CVData = { ...defaultCV, ...parsed } as CVData;

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

const loadStore = (): MultiCVStore => {
  if (typeof window === "undefined") {
    const id = uid();
    return { languages: [{ id, name: "English", data: defaultCV }], activeId: id };
  }
  try {
    const rawMulti = localStorage.getItem(STORAGE_KEY_MULTI);
    if (rawMulti) {
      const parsed = JSON.parse(rawMulti) as MultiCVStore;
      if (parsed && Array.isArray(parsed.languages) && parsed.languages.length > 0) {
        const languages = parsed.languages.map((l) => ({
          ...l,
          data: migrateData(l.data as Partial<CVData>),
        }));
        const activeId = languages.some((l) => l.id === parsed.activeId)
          ? parsed.activeId
          : languages[0].id;
        return { languages, activeId };
      }
    }

    // Migrate legacy single-CV storage
    const rawLegacy = localStorage.getItem(STORAGE_KEY);
    if (rawLegacy) {
      const parsed = JSON.parse(rawLegacy) as Partial<CVData>;
      const id = uid();
      return {
        languages: [{ id, name: "English", data: migrateData(parsed) }],
        activeId: id,
      };
    }
  } catch {
    // fall through to default
  }
  const id = uid();
  return { languages: [{ id, name: "English", data: defaultCV }], activeId: id };
};

export const useCVData = (): {
  data: CVData;
  setData: Dispatch<SetStateAction<CVData>>;
  reset: () => void;
  languages: CVLanguage[];
  activeId: string;
  setActiveId: (id: string) => void;
  addLanguage: (name: string, copyFromActive: boolean) => void;
  renameLanguage: (id: string, name: string) => void;
  deleteLanguage: (id: string) => void;
} => {
  const [store, setStore] = useState<MultiCVStore>(() => loadStore());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MULTI, JSON.stringify(store));
    } catch {
      // ignore
    }
  }, [store]);

  const active = store.languages.find((l) => l.id === store.activeId) ?? store.languages[0];

  const setData: Dispatch<SetStateAction<CVData>> = useCallback((value) => {
    setStore((prev) => {
      const current = prev.languages.find((l) => l.id === prev.activeId);
      if (!current) return prev;
      const nextData = typeof value === "function"
        ? (value as (p: CVData) => CVData)(current.data)
        : value;
      return {
        ...prev,
        languages: prev.languages.map((l) =>
          l.id === prev.activeId ? { ...l, data: nextData } : l,
        ),
      };
    });
  }, []);

  const reset = useCallback(() => {
    setStore((prev) => ({
      ...prev,
      languages: prev.languages.map((l) =>
        l.id === prev.activeId ? { ...l, data: defaultCV } : l,
      ),
    }));
  }, []);

  const setActiveId = useCallback((id: string) => {
    setStore((prev) => (prev.languages.some((l) => l.id === id) ? { ...prev, activeId: id } : prev));
  }, []);

  const addLanguage = useCallback((name: string, copyFromActive: boolean) => {
    setStore((prev) => {
      const id = uid();
      const source = prev.languages.find((l) => l.id === prev.activeId);
      const data = copyFromActive && source
        ? JSON.parse(JSON.stringify(source.data)) as CVData
        : defaultCV;
      return {
        languages: [...prev.languages, { id, name: name.trim() || "Untitled", data }],
        activeId: id,
      };
    });
  }, []);

  const renameLanguage = useCallback((id: string, name: string) => {
    setStore((prev) => ({
      ...prev,
      languages: prev.languages.map((l) =>
        l.id === id ? { ...l, name: name.trim() || l.name } : l,
      ),
    }));
  }, []);

  const deleteLanguage = useCallback((id: string) => {
    setStore((prev) => {
      if (prev.languages.length <= 1) return prev;
      const languages = prev.languages.filter((l) => l.id !== id);
      const activeId = prev.activeId === id ? languages[0].id : prev.activeId;
      return { languages, activeId };
    });
  }, []);

  return {
    data: active.data,
    setData,
    reset,
    languages: store.languages,
    activeId: store.activeId,
    setActiveId,
    addLanguage,
    renameLanguage,
    deleteLanguage,
  };
};
