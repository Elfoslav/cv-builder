export type DrawerVariant =
  | "polished"
  | "flat"
  | "compact"
  | "tabs"
  | "glass"
  | "timeline"
  | "bento"
  | "command";

export const DRAWER_VARIANTS: Record<
  DrawerVariant,
  { label: string; desc: string; badge: string }
> = {
  polished: {
    label: "Polished",
    desc: "Current — rounded cards, muted header, separate Design/Content cards",
    badge: "Default",
  },
  flat: {
    label: "Flat",
    desc: "No cards, just dividers — minimal, print-true, airy",
    badge: "Minimal",
  },
  compact: {
    label: "Compact",
    desc: "Tighter padding, denser — more form visible at once",
    badge: "Dense",
  },
  tabs: {
    label: "Tabs",
    desc: "Design / Content as tabs — focused, less scrolling",
    badge: "Tabbed",
  },
  glass: {
    label: "Glass",
    desc: "Frosted glass — translucent, backdrop-blur, soft gradient border",
    badge: "Frosted",
  },
  timeline: {
    label: "Timeline",
    desc: "Vertical stepper — Design → Content as a journey with progress",
    badge: "Stepper",
  },
  bento: {
    label: "Bento",
    desc: "2×2 bento grid — Design, Columns, Content, Preview in cards",
    badge: "Grid",
  },
  command: {
    label: "Command",
    desc: "Palette-style — search, keyboard hints, focused input",
    badge: "Palette",
  },
};

export const DEFAULT_DRAWER_VARIANT: DrawerVariant = "glass";
