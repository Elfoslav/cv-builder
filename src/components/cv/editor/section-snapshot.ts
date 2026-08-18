import { CVData, CVLabels, SectionKey } from "@/lib/cv-types";

/**
 * A deep copy of everything the editor can touch for one section. Used by the
 * Cancel button to discard any changes made while that section was open.
 */
export interface SectionSnapshot {
  fields: Partial<CVData>;
  labels: Partial<CVLabels>;
}

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const pick = <T extends object, K extends keyof T>(obj: T, keys: readonly K[]): Pick<T, K> => {
  const out = {} as Pick<T, K>;
  keys.forEach((k) => { out[k] = obj[k]; });
  return out;
};

export const snapshotSection = (data: CVData, key: SectionKey): SectionSnapshot => {
  const L = data.labels;
  switch (key) {
    case "hero":
      return {
        fields: pick(data, [
          "name", "role", "bio", "email", "phone", "location", "github", "linkedin",
        ] as const),
        labels: {},
      };
    case "about":
      return { fields: { about: data.about }, labels: pick(L, ["aboutTitle", "aboutSubtitle"] as const) };
    case "skills":
      return {
        fields: { skills: clone(data.skills), skillGroups: clone(data.skillGroups) },
        labels: pick(L, ["skillsTitle", "skillsSubtitle"] as const),
      };
    case "experience":
      return { fields: { experience: clone(data.experience) }, labels: pick(L, ["experienceTitle", "experienceSubtitle"] as const) };
    case "education":
      return { fields: { education: clone(data.education) }, labels: pick(L, ["educationTitle", "educationSubtitle"] as const) };
    case "projects":
      return { fields: { projects: clone(data.projects) }, labels: pick(L, ["projectsTitle", "projectsSubtitle"] as const) };
    case "hobbies":
      return { fields: { hobbies: clone(data.hobbies) }, labels: pick(L, ["hobbiesTitle", "hobbiesSubtitle"] as const) };
    case "footer":
      return { fields: {}, labels: pick(L, ["footerThanks", "footerCopyright"] as const) };
  }
};

export const restoreSection = (
  data: CVData,
  key: SectionKey,
  snapshot: SectionSnapshot,
): CVData => {
  const next = { ...data, ...snapshot.fields };
  const labelKeys = Object.keys(snapshot.labels) as (keyof CVLabels)[];
  if (labelKeys.length > 0) {
    next.labels = { ...data.labels, ...snapshot.labels };
  }
  return next;
};
