export type EditVariant =
  | "dashed"
  | "ring"
  | "accent"
  | "elevated"
  | "minimal"
  | "dotted"
  | "glow"
  | "double"
  | "underline"
  | "corners";

export const EDIT_VARIANTS: Record<
  EditVariant,
  { label: string; desc: string; className: string }
> = {
  dashed: {
    label: "Dashed outline",
    desc: "Full resume width — dashed border, no fill",
    className: "rounded-xl border-2 border-dashed border-primary/40",
  },
  ring: {
    label: "Ring + tint",
    desc: "Solid ring, no fill",
    className: "rounded-xl ring-2 ring-primary/15 border border-primary/10",
  },
  accent: {
    label: "Accent bar",
    desc: "Left 4px primary bar + subtle shadow",
    className:
      "rounded-xl border-l-4 border-primary bg-card shadow-sm shadow-primary/5",
  },
  elevated: {
    label: "Elevated card",
    desc: "Floating paper with strong shadow",
    className:
      "rounded-xl border bg-card shadow-[0_12px_32px_hsl(var(--foreground)/0.10)]",
  },
  minimal: {
    label: "Minimal",
    desc: "No chrome, just spacing — print-true",
    className: "rounded-xl",
  },
  dotted: {
    label: "Dotted",
    desc: "Fine dotted border — lighter than dashed",
    className: "rounded-xl border-2 border-dotted border-primary/30",
  },
  glow: {
    label: "Glow ring",
    desc: "Soft outer glow, no background",
    className:
      "rounded-xl ring-2 ring-primary/20 shadow-[0_0_24px_hsl(var(--primary)/0.18)] border border-primary/10",
  },
  double: {
    label: "Double frame",
    desc: "Double border — editorial, strong",
    className: "rounded-xl border-2 border-primary/20 shadow-[inset_0_0_0_1px_hsl(var(--primary)/0.15)]",
  },
  underline: {
    label: "Underline",
    desc: "Only bottom 3px bar + subtle ring",
    className: "rounded-xl border-b-[3px] border-primary shadow-sm",
  },
  corners: {
    label: "Corner brackets",
    desc: "Four corner marks — Figma-like selection",
    className:
      "rounded-xl border border-primary/25 bg-transparent shadow-[0_0_0_1px_hsl(var(--primary)/0.08)]",
  },
};

export const DEFAULT_EDIT_VARIANT: EditVariant = "dashed";
