/**
 * Per-section layout designs.
 *
 * A "section design" is an independent, per-section layout choice (e.g.
 * skills rendered as bars, chips, or a dot list). It is orthogonal to the
 * color theme: the color theme re-skins the whole resume via `data-theme`
 * tokens, while each section design only changes how that one section is
 * structured. Designs are stored on the CV data and picked from the editor.
 */

export type HeroLayout = "gradient" | "plain" | "center";
export type AboutLayout = "paragraphs" | "highlights" | "columns";
export type SkillLayout = "bars" | "chips" | "dots";
/**
 * Shared layout id for every list-style section (experience, education,
 * projects): cards (gradient/flat/accent), card rows (gradient/flat/accent),
 * plain rows, or a vertical timeline.
 */
export type ListLayout =
  | "timeline"
  | "cards-gradient"
  | "cards-flat"
  | "cards-accent"
  | "rows"
  | "rows-gradient"
  | "rows-flat"
  | "rows-accent";
export type HobbyLayout =
  | "cards"
  | "cards-flat"
  | "cards-accent"
  | "pills"
  | "checks";
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
  projects: "cards-gradient",
  hobbies: "cards",
  footer: "split",
};

export interface DesignOption {
  id: string;
  name: string;
  desc: string;
}

const LIST_DESIGN_OPTIONS = [
  { id: "timeline", name: "Timeline", desc: "Vertical timeline with a glowing dot per entry." },
  { id: "cards-gradient", name: "Gradient cards", desc: "Elevated cards with a gradient accent line and soft glow." },
  { id: "cards-flat", name: "Flat cards", desc: "Minimal, low-contrast cards — no shadows or gradients, great for print." },
  { id: "cards-accent", name: "Accent cards", desc: "Cards with a colored accent bar along the left edge." },
  { id: "rows-gradient", name: "Gradient card rows", desc: "Stacked card rows with a gradient glow — one entry per line." },
  { id: "rows-flat", name: "Flat card rows", desc: "Minimal card rows — clean, low-contrast, great for print." },
  { id: "rows-accent", name: "Accent card rows", desc: "Card rows with a colored accent bar along the left edge." },
  { id: "rows", name: "Plain rows", desc: "Border-separated rows, period above the title — no card." },
] as const satisfies readonly {
  id: ListLayout;
  name: string;
  desc: string;
}[];

/** Options shown by each section's design picker, keyed by section. */
export const SECTION_DESIGN_OPTIONS: {
  [K in keyof SectionDesigns]: { id: SectionDesigns[K]; name: string; desc: string }[];
} = {
  hero: [
    { id: "gradient", name: "Gradient hero", desc: "Reference look: gradient glow with a keyboard-grid backdrop." },
    { id: "plain", name: "Plain header", desc: "No decorative overlays — name, role and bio on a clean background." },
    { id: "center", name: "Centered", desc: "Name, role and bio centered, contact inline below." },
  ],
  about: [
    { id: "paragraphs", name: "Paragraphs", desc: "Split into paragraphs, one after the other." },
    { id: "highlights", name: "Key highlights", desc: "Each paragraph becomes a marked highlight line." },
    { id: "columns", name: "Two columns", desc: "Paragraphs flow into two balanced columns." },
  ],
  experience: LIST_DESIGN_OPTIONS,
  education: LIST_DESIGN_OPTIONS,
  skills: [
    { id: "bars", name: "Progress bars", desc: "Classic animated bars with percentages." },
    { id: "chips", name: "Chips", desc: "Compact pill tags per group." },
    { id: "dots", name: "Dot list", desc: "Type-driven list with a percentage at the end." },
  ],
  projects: LIST_DESIGN_OPTIONS,
  hobbies: [
    { id: "cards", name: "Icon cards", desc: "Big rounded icon cards in a row." },
    { id: "cards-flat", name: "Flat tiles", desc: "Compact horizontal tiles with an icon badge and label." },
    { id: "cards-accent", name: "Accent cards", desc: "Icon cards with a gradient underline." },
    { id: "pills", name: "Pills", desc: "Icon + label pills, wrapped to multiple lines." },
    { id: "checks", name: "Checklist", desc: "Checkbox-style list, two columns." },
  ],
  footer: [
    { id: "split", name: "Split", desc: "Thanks left, copyright right (centered on small screens)." },
    { id: "center", name: "Centered", desc: "Both lines centered and stacked." },
  ],
};