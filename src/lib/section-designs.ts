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
export type ProjectLayout =
  | "cards-gradient"
  | "cards-flat"
  | "cards-accent"
  | "rows"
  | "rows-plain"
  | "timeline";
export type TimelineLayout =
  | "timeline"
  | "cards-gradient"
  | "cards-flat"
  | "cards-accent"
  | "rows";
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
  experience: TimelineLayout;
  education: TimelineLayout;
  skills: SkillLayout;
  projects: ProjectLayout;
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

const TIMELINE_OPTIONS: { id: TimelineLayout; name: string; desc: string }[] = [
  { id: "timeline", name: "Timeline", desc: "Vertical timeline with a glowing dot per entry." },
  { id: "cards-gradient", name: "Gradient cards", desc: "Warm elevated cards, one per entry." },
  { id: "cards-flat", name: "Flat cards", desc: "Minimal, low-contrast cards for clean print output." },
  { id: "cards-accent", name: "Accent cards", desc: "Cards with a colored accent bar along the left edge." },
  { id: "rows", name: "Rows", desc: "Compact rows with a fixed period column on the left." },
];

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
  experience: TIMELINE_OPTIONS,
  education: TIMELINE_OPTIONS,
  skills: [
    { id: "bars", name: "Progress bars", desc: "Classic animated bars with percentages." },
    { id: "chips", name: "Chips", desc: "Compact pill tags per group." },
    { id: "dots", name: "Dot list", desc: "Type-driven list with a percentage at the end." },
  ],
  projects: [
    { id: "cards-gradient", name: "Gradient cards", desc: "Elevated cards with a gradient accent line and soft glow." },
    { id: "cards-flat", name: "Flat cards", desc: "Minimal, low-contrast cards — no shadows or gradients, great for print." },
    { id: "cards-accent", name: "Accent cards", desc: "Featured cards with a colored accent bar along the left edge." },
    { id: "rows", name: "Card rows", desc: "Stacked card rows — one project per line." },
    { id: "rows-plain", name: "Plain rows", desc: "Education-style: fixed period column with border separators, no card." },
    { id: "timeline", name: "Timeline", desc: "Glowing-dot entries with the period on the line." },
  ],
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