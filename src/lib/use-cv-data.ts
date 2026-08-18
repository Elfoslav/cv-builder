import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import {
  CVData, CVLabels, defaultCV, defaultLabels, SkillGroup, SectionKey, SECTION_KEYS,
} from "./cv-types";

const STORAGE_KEY = "cv-builder-data-v1";
const STORAGE_KEY_MULTI = "cv-builder-data-v2";
const STORAGE_KEY_MULTI_BAK = "cv-builder-data-v2.bak";

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

/**
 * Normalizes a stored section order: drops unknown keys, appends any missing
 * sections, and pins hero first / footer last.
 */
const normalizeSectionOrder = (stored?: SectionKey[]): SectionKey[] => {
  const valid = new Set(SECTION_KEYS);
  const incoming = Array.isArray(stored)
    ? stored.filter((k): k is SectionKey => valid.has(k))
    : [];
  SECTION_KEYS.forEach((k) => {
    if (!incoming.includes(k)) incoming.push(k);
  });
  const movable = incoming.filter((k) => k !== "hero" && k !== "footer");
  return ["hero", ...movable, "footer"];
};

const migrateData = (parsed: Partial<CVData> & { skills?: Array<{ group?: string }> }): CVData => {
  // Per-key fallback: only fill in missing top-level fields, never overwrite existing user values.
  const merged: CVData = {
    name: parsed.name ?? defaultCV.name,
    role: parsed.role ?? defaultCV.role,
    bio: parsed.bio ?? defaultCV.bio,
    about: parsed.about ?? defaultCV.about,
    email: parsed.email ?? defaultCV.email,
    phone: parsed.phone ?? defaultCV.phone,
    location: parsed.location ?? defaultCV.location,
    github: parsed.github ?? defaultCV.github,
    linkedin: parsed.linkedin ?? defaultCV.linkedin,
    skills: parsed.skills ?? defaultCV.skills,
    skillGroups: parsed.skillGroups ?? defaultCV.skillGroups,
    experience: parsed.experience ?? defaultCV.experience,
    education: parsed.education ?? defaultCV.education,
    projects: parsed.projects ?? defaultCV.projects,
    hobbies: parsed.hobbies ?? defaultCV.hobbies,
    labels: { ...defaultLabels, ...((parsed as { labels?: Partial<CVLabels> }).labels ?? {}) },
    sectionOrder: normalizeSectionOrder((parsed as { sectionOrder?: SectionKey[] }).sectionOrder),
  } as CVData;

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

  const tryParseStore = (raw: string | null, source: string): MultiCVStore | null => {
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw) as MultiCVStore;
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
      console.error(`[cv-store] ${source} is malformed (no languages array). Raw:`, raw);
      return null;
    } catch (err) {
      console.error(`[cv-store] Failed to parse ${source}:`, err, "Raw:", raw);
      return null;
    }
  };

  // Try main key, then backup, then legacy single-CV key.
  const fromMain = tryParseStore(localStorage.getItem(STORAGE_KEY_MULTI), STORAGE_KEY_MULTI);
  if (fromMain) return fromMain;

  const fromBackup = tryParseStore(localStorage.getItem(STORAGE_KEY_MULTI_BAK), STORAGE_KEY_MULTI_BAK);
  if (fromBackup) {
    console.warn("[cv-store] Recovered CV data from backup key.");
    return fromBackup;
  }

  try {
    const rawLegacy = localStorage.getItem(STORAGE_KEY);
    if (rawLegacy) {
      const parsed = JSON.parse(rawLegacy) as Partial<CVData>;
      const id = uid();
      return {
        languages: [{ id, name: "English", data: migrateData(parsed) }],
        activeId: id,
      };
    }
  } catch (err) {
    console.error("[cv-store] Failed to parse legacy v1 key:", err);
  }

  const id = uid();
  return { languages: [{ id, name: "English", data: defaultCV }], activeId: id };
};

export const useCVData = (): {
  data: CVData;
  setData: Dispatch<SetStateAction<CVData>>;
  languages: CVLanguage[];
  activeId: string;
  setActiveId: (id: string) => void;
  addLanguage: (name: string, copyFromActive: boolean) => void;
  renameLanguage: (id: string, name: string) => void;
  deleteLanguage: (id: string) => void;
} => {
  const [store, setStore] = useState<MultiCVStore>(() => loadStore());
  const loadedRef = useRef(false);

  useEffect(() => {
    // Skip the very first effect run so we never overwrite storage with the
    // initial-mount value before the user has had a chance to edit anything.
    if (!loadedRef.current) {
      loadedRef.current = true;
      return;
    }
    try {
      const serialized = JSON.stringify(store);
      // Write rolling backup BEFORE overwriting main key, so a failure mid-save
      // still leaves a recoverable copy.
      const previous = localStorage.getItem(STORAGE_KEY_MULTI);
      if (previous) {
        try {
          localStorage.setItem(STORAGE_KEY_MULTI_BAK, previous);
        } catch (bakErr) {
          console.error("[cv-store] Failed to write backup:", bakErr);
        }
      }
      localStorage.setItem(STORAGE_KEY_MULTI, serialized);
    } catch (err) {
      console.error("[cv-store] Failed to save CV data to localStorage:", err);
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
    languages: store.languages,
    activeId: store.activeId,
    setActiveId,
    addLanguage,
    renameLanguage,
    deleteLanguage,
  };
};
