import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import {
  CVData, CVLabels, defaultCV, defaultLabels, SkillGroup, SectionKey, SECTION_KEYS,
  DEFAULT_CARD_COLUMNS, DEFAULT_SKILL_COLUMNS, type CardColumnsMap, type SkillColumnsMap,
} from "./cv-types";
import { DEFAULT_SECTION_DESIGNS, type SectionDesigns } from "./section-designs";
import { DEFAULT_THEME, THEME_IDS, type ThemeId } from "./themes";
import { toast } from "sonner";

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
  /** Global color theme applied to the whole resume. */
  theme: ThemeId;
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

/** Coerces stored columns per section into valid card column counts. */
const normalizeColumns = <T extends CardColumnsMap | SkillColumnsMap>(
  defaults: T,
  raw?: Partial<T>,
): T => {
  const out = { ...defaults, ...(raw ?? {}) } as T;
  (Object.keys(out) as (keyof T)[]).forEach((k) => {
    if (![1, 2, 3, 4, 5, 6].includes(out[k] as number)) out[k] = defaults[k];
  });
  return out;
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
    sectionDesigns: {
      ...DEFAULT_SECTION_DESIGNS,
      ...((parsed as { sectionDesigns?: Partial<SectionDesigns> }).sectionDesigns ?? {}),
    },
    cardColumns: normalizeColumns(DEFAULT_CARD_COLUMNS, (parsed as { cardColumns?: Partial<CardColumnsMap> }).cardColumns),
    skillColumns: normalizeColumns(DEFAULT_SKILL_COLUMNS, (parsed as { skillColumns?: Partial<SkillColumnsMap> }).skillColumns),
  } as CVData;

  // Old design ids → the new variant naming.
  const projects = merged.sectionDesigns.projects as string;
  if (projects === "cards" || projects === "cards-gradient") merged.sectionDesigns.projects = "cards-gradient-soft";
  else if (projects === "rows-plain") merged.sectionDesigns.projects = "rows";
  else if (projects === "rows") merged.sectionDesigns.projects = "rows-gradient";
  if (merged.sectionDesigns.experience === "cards" || merged.sectionDesigns.experience === "cards-gradient") {
    merged.sectionDesigns.experience = "cards-gradient-soft";
  }
  if (merged.sectionDesigns.education === "cards" || merged.sectionDesigns.education === "cards-gradient") {
    merged.sectionDesigns.education = "cards-gradient-soft";
  }
  if (merged.sectionDesigns.hobbies === "cards") merged.sectionDesigns.hobbies = "cards-gradient-soft";

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

const normalizeTheme = (raw?: unknown): ThemeId =>
  THEME_IDS.includes(raw as ThemeId) ? (raw as ThemeId) : DEFAULT_THEME;

/**
 * Validates and normalizes an arbitrary parsed object into a MultiCVStore, or
 * returns null if it isn't a usable store. Shared by initial load and by the
 * "Back up all" import so both apply the same migration/validation.
 */
export const normalizeStore = (parsed: unknown): MultiCVStore | null => {
  const p = parsed as Partial<MultiCVStore> | null;
  if (!p || !Array.isArray(p.languages) || p.languages.length === 0) return null;
  const languages = p.languages
    .filter((l) => l && typeof l === "object")
    .map((l) => ({
      id: typeof l.id === "string" && l.id ? l.id : uid(),
      name: typeof l.name === "string" && l.name.trim() ? l.name : "Untitled",
      data: migrateData((l.data ?? {}) as Partial<CVData>),
    }));
  if (languages.length === 0) return null;
  const activeId = languages.some((l) => l.id === p.activeId) ? (p.activeId as string) : languages[0].id;
  return { languages, activeId, theme: normalizeTheme(p.theme) };
};

const loadStore = (): MultiCVStore => {
  if (typeof window === "undefined") {
    const id = uid();
    return { languages: [{ id, name: "English", data: defaultCV }], activeId: id, theme: DEFAULT_THEME };
  }

  const tryParseStore = (raw: string | null, source: string): MultiCVStore | null => {
    if (!raw) return null;
    try {
      const store = normalizeStore(JSON.parse(raw));
      if (store) return store;
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
        theme: DEFAULT_THEME,
      };
    }
  } catch (err) {
    console.error("[cv-store] Failed to parse legacy v1 key:", err);
  }

  const id = uid();
  return { languages: [{ id, name: "English", data: defaultCV }], activeId: id, theme: DEFAULT_THEME };
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
  theme: ThemeId;
  setTheme: (theme: ThemeId) => void;
} => {
  const [store, setStore] = useState<MultiCVStore>(() => loadStore());
  const loadedRef = useRef(false);
  const saveFailedRef = useRef(false);

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
      saveFailedRef.current = false;
    } catch (err) {
      console.error("[cv-store] Failed to save CV data to localStorage:", err);
      // Notify once (not on every keystroke) so the user knows edits aren't
      // persisting — e.g. storage is full or blocked. Cleared on next success.
      if (!saveFailedRef.current) {
        saveFailedRef.current = true;
        toast.error("Couldn't save your changes — your browser storage may be full. Export a backup to be safe.");
      }
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

  const setTheme = useCallback((theme: ThemeId) => {
    setStore((prev) => (prev.theme === theme ? prev : { ...prev, theme }));
  }, []);

  const addLanguage = useCallback((name: string, copyFromActive: boolean) => {
    setStore((prev) => {
      const id = uid();
      const source = prev.languages.find((l) => l.id === prev.activeId);
      const data = copyFromActive && source
        ? JSON.parse(JSON.stringify(source.data)) as CVData
        : defaultCV;
      return {
        ...prev,
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
      return { ...prev, languages, activeId };
    });
  }, []);

  /** Replace the entire store from an imported full backup. Returns false if
   *  the payload isn't a valid store (caller shows an error). */
  const replaceStore = useCallback((parsed: unknown): boolean => {
    const next = normalizeStore(parsed);
    if (!next) return false;
    setStore(next);
    return true;
  }, []);

  return {
    store,
    data: active.data,
    setData,
    languages: store.languages,
    activeId: store.activeId,
    setActiveId,
    addLanguage,
    renameLanguage,
    deleteLanguage,
    replaceStore,
    theme: store.theme,
    setTheme,
  };
};
