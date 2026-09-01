export type HomeVariant = "airy" | "bento" | "focus" | "classic" | "centered" | "split" | "minimal" | "editorial";

export const HOME_VARIANTS: Record<HomeVariant, { label: string; desc: string }> = {
  airy: { label: "Airy", desc: "Single column, big whitespace — calm, not crowded" },
  bento: { label: "Bento", desc: "3 large cards — curated, airy" },
  focus: { label: "Focus", desc: "Alternating rows — editorial, scannable" },
  classic: { label: "Classic", desc: "Fanned stack + 6-card bento — dense" },
  centered: { label: "Centered", desc: "Centered hero, single large preview — focused" },
  split: { label: "Split", desc: "Dark split — hero left, preview right" },
  minimal: { label: "Minimal", desc: "Whitespace, thin type, no shadows" },
  editorial: { label: "Editorial", desc: "Left-aligned, big type, fanned resumes — bold" },
};

export const DEFAULT_HOME_VARIANT: HomeVariant = "airy";
