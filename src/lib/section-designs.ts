/**
 * Per-section layout designs.
 *
 * A "section design" is an independent, per-section layout choice (e.g.
 * skills rendered as bars, chips, or a dot list). It is orthogonal to the
 * color theme: the color theme re-skins the whole resume via `data-theme`
 * tokens, while each section design only changes how that one section is
 * structured. Designs are stored on the CV data and picked from the editor.
 */

export type HeroLayout =
  | "gradient"
  | "center"
  | "gradient-banner"
  | "gradient-border"
  | "gradient-headline"
  | "plain"
  | "split"
  | "compact"
  | "flat-center"
  | "card";
export type AboutLayout = "paragraphs" | "highlights" | "columns";
export type SkillLayout = "bars" | "chips" | "dots";
/**
 * The shared "card tile" family used by every card-style section (experience,
 * education, projects, hobbies). Picking e.g. "Soft gradient cards" in one
 * section renders the same treatment in the others.
 */
export type CardLayout =
  | "cards-gradient-soft"
  | "cards-gradient-border"
  | "cards-gradient-band"
  | "cards-gradient-headline"
  | "cards-flat"
  | "cards-accent";
/**
 * Shared layout id for every list-style section (experience, education,
 * projects): the card family plus card rows (gradient/flat/accent), plain
 * rows, or a vertical timeline.
 */
export type ListLayout = CardLayout | "timeline" | "rows" | "rows-gradient" | "rows-flat" | "rows-accent";
/** Hobbies render as cards from the shared family, or pill / checklist lists. */
export type HobbyLayout = CardLayout | "pills" | "checks";
export type FooterLayout = "split" | "center";

/** Layout id for every editable CV section. */
export interface SectionDesigns {
  hero: HeroLayout;
  about: AboutLayout;
  experience: ListLayout;
  education: ListLayout;
  skills: SkillLayout;
  projects: ListLayout;
  hobbies: HobbyLayout;
  footer: FooterLayout;
}

export const DEFAULT_SECTION_DESIGNS: SectionDesigns = {
  hero: "gradient",
  about: "paragraphs",
  experience: "timeline",
  education: "timeline",
  skills: "bars",
  projects: "cards-gradient-soft",
  hobbies: "cards-gradient-soft",
  footer: "split",
};

export interface DesignOption {
  id: string;
  name: string;
  desc: string;
  /** Optional group label shown in the pickup so related options stand apart. */
  group?: string;
}

/** The shared card-family options reused by every card-style section. */
export const CARD_DESIGN_OPTIONS = [
  { group: "Gradient", id: "cards-gradient-soft", name: "Soft gradient cards", desc: "Gradient-filled cards with a gentle glow — the default card look." },
  { group: "Gradient", id: "cards-gradient-border", name: "Gradient border cards", desc: "Cards framed by a thin primary-to-accent gradient outline." },
  { group: "Gradient", id: "cards-gradient-band", name: "Gradient band cards", desc: "Cards topped with a gradient accent band." },
  { group: "Gradient", id: "cards-gradient-headline", name: "Gradient headline cards", desc: "Flat print-friendly cards with gradient-text headings." },
  { group: "Non-gradient", id: "cards-flat", name: "Flat cards", desc: "Minimal, low-contrast cards — no shadows or gradients, great for print." },
  { group: "Non-gradient", id: "cards-accent", name: "Accent cards", desc: "Cards with a colored accent bar along the left edge." },
] as const satisfies readonly {
  id: CardLayout;
  name: string;
  desc: string;
  group: "Gradient" | "Non-gradient";
}[];

const LIST_DESIGN_OPTIONS = [
  { group: "Non-gradient", id: "timeline", name: "Timeline", desc: "Vertical timeline with a glowing dot per entry." },
  ...CARD_DESIGN_OPTIONS,
  { group: "Gradient", id: "rows-gradient", name: "Gradient card rows", desc: "Stacked card rows with a gradient glow — one entry per line." },
  { group: "Non-gradient", id: "rows-flat", name: "Flat card rows", desc: "Minimal card rows — clean, low-contrast, great for print." },
  { group: "Non-gradient", id: "rows-accent", name: "Accent card rows", desc: "Card rows with a colored accent bar along the left edge." },
  { group: "Non-gradient", id: "rows", name: "Plain rows", desc: "Border-separated rows, period above the title — no card." },
] as const satisfies readonly {
  id: ListLayout;
  name: string;
  desc: string;
  group: "Gradient" | "Non-gradient";
}[];

/** Options shown by each section's design picker, keyed by section. */
export const SECTION_DESIGN_OPTIONS: {
  [K in keyof SectionDesigns]: { id: SectionDesigns[K]; name: string; desc: string; group?: string }[];
} = {
  hero: [
    { group: "Gradient", id: "gradient", name: "Gradient glow", desc: "Reference look: gradient glow with a keyboard-grid backdrop." },
    { group: "Gradient", id: "center", name: "Centered glow", desc: "Centered identity over a gradient glow and grid backdrop." },
    { group: "Gradient", id: "gradient-banner", name: "Gradient banner", desc: "Name and role sit on a vivid gradient banner; bio and contact below." },
    { group: "Gradient", id: "gradient-border", name: "Gradient frame", desc: "The header framed by a thin primary→accent gradient outline." },
    { group: "Gradient", id: "gradient-headline", name: "Gradient headline", desc: "Flat header with the name set in gradient text under a gradient rule." },
    { group: "Non-gradient", id: "plain", name: "Editorial", desc: "Editorial flat header — accent rule, kicker role, no decorations." },
    { group: "Non-gradient", id: "split", name: "Split header", desc: "Identity on the left, contact stacked in a side column." },
    { group: "Non-gradient", id: "compact", name: "Compact header", desc: "Name and contact on one line, bio underneath — tight spacing." },
    { group: "Non-gradient", id: "flat-center", name: "Centered flat", desc: "Plain centered header — no glow, contact in a row below." },
    { group: "Non-gradient", id: "card", name: "Card header", desc: "The whole header enclosed in a flat bordered card." },
  ],
  about: [
    { group: "Stacked", id: "paragraphs", name: "Paragraphs", desc: "Split into paragraphs, one after the other." },
    { group: "Stacked", id: "highlights", name: "Key highlights", desc: "Each paragraph becomes a marked highlight line." },
    { group: "Columns", id: "columns", name: "Two columns", desc: "Paragraphs flow into two balanced columns." },
  ],
  experience: LIST_DESIGN_OPTIONS,
  education: LIST_DESIGN_OPTIONS,
  skills: [
    { group: "Progress", id: "bars", name: "Progress bars", desc: "Classic animated bars with percentages." },
    { group: "Compact", id: "chips", name: "Chips", desc: "Compact pill tags per group." },
    { group: "Compact", id: "dots", name: "Dot list", desc: "Type-driven list with a percentage at the end." },
  ],
  projects: LIST_DESIGN_OPTIONS,
  hobbies: [
    ...CARD_DESIGN_OPTIONS,
    { group: "Non-gradient", id: "pills", name: "Pills", desc: "Icon + label pills, wrapped to multiple lines." },
    { group: "Non-gradient", id: "checks", name: "Checklist", desc: "Checkbox-style list, two columns." },
  ],
  footer: [
    { group: "Alignment", id: "split", name: "Split", desc: "Thanks left, copyright right (centered on small screens)." },
    { group: "Alignment", id: "center", name: "Centered", desc: "Both lines centered and stacked." },
  ],
};