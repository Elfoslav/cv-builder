export type HeroVariant =
  | "fanned"
  | "spotlight"
  | "strip"
  | "strip-left"
  | "strip-split"
  | "strip-minimal"
  | "editor"
  | "gradient"
  | "airy"
  | "bento"
  | "focus";

export const HERO_VARIANTS: Record<HeroVariant, { label: string; desc: string }> = {
  fanned: { label: "Fanned", desc: "Split layout — copy left, a fanned stack of themed resumes right" },
  spotlight: { label: "Spotlight", desc: "Centered, focused — one big resume under a single strong CTA" },
  strip: { label: "Strip", desc: "Headline over a colorful row — centered, marquee" },
  "strip-left": { label: "Strip Left", desc: "Left-aligned headline + subcopy + buttons, strip below" },
  "strip-split": { label: "Strip Split", desc: "Copy left, strip preview right — split 50/50" },
  "strip-minimal": { label: "Strip Minimal", desc: "Thin type, no trust row, single CTA — ultra calm" },
  editor: { label: "Editor", desc: "Product shot — the live editor + print-width preview in context" },
  gradient: { label: "Gradient", desc: "Bold full-bleed color wash with a glass headline card" },
  airy: { label: "Airy", desc: "Single column, big whitespace — calm, not crowded" },
  bento: { label: "Bento", desc: "3 large cards — curated, airy, not 6" },
  focus: { label: "Focus", desc: "Alternating rows — editorial, scannable, less grid" },
};

export const DEFAULT_HERO_VARIANT: HeroVariant = "fanned";
