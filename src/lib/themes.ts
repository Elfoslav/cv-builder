/**
 * Resume themes.
 *
 * A theme is a small set of CSS-variable overrides applied via a
 * `data-theme` attribute on the CV wrapper element (see `.cv-theme`
 * rules in index.css). Because every CV component styles itself from
 * the shared HSL tokens (`--primary`, `--accent`, `--gradient-*`, …),
 * swapping the attribute re-skins the entire document with no JS changes.
 *
 * Draft designs for the themes live on the /drafts page; the swatches
 * below must stay in sync with the `[data-theme="{id}"]` blocks in
 * index.css.
 */

import { DEFAULT_SECTION_DESIGNS, type SectionDesigns } from "./section-designs";

export const THEME_IDS = [
  "indigo", "classic", "minimal", "earthy", "ocean", "sunset", "forest", "slate",
] as const;

export type ThemeId = (typeof THEME_IDS)[number];

export interface ResumeTheme {
  id: ThemeId;
  name: string;
  tagline: string;
  desc: string;
  /** Hex/CSS colors used for the little preview chips on the drafts page. */
  swatches: string[];
  notes: string[];
  /**
   * Curated per-section designs shown on the /drafts theme showcase. The
   * live editor uses the designs stored on each CV, not these.
   */
  showcase: SectionDesigns;
}

export const DEFAULT_THEME: ThemeId = "indigo";

export const THEMES: ResumeTheme[] = [
  {
    id: "indigo",
    name: "Modern Indigo",
    tagline: "Vibrant, rounded, gradient accents",
    desc: "The reference look: a bold indigo→cyan gradient hero, rounded chips and cards, glowing timeline dots, and skill bars.",
    swatches: ["#4f46e5", "#0ea5e9", "#ffffff", "#eef2ff"],
    notes: [
      "Gradient hero with keyboard grid backdrop",
      "Rounded cards, chip tags, progress skill bars",
      "Best default for scan-friendly CVs",
    ],
    showcase: DEFAULT_SECTION_DESIGNS,
  },
  {
    id: "classic",
    name: "Classic Serif",
    tagline: "Professional paper, navy & serif",
    desc: "A traditional résumé: cream paper, deep navy headings set in serif, diamond timeline bullets, and restrained color.",
    swatches: ["#1f3a5f", "#2f6f85", "#f5efdd", "#3f4a5a"],
    notes: [
      "Serif type throughout — reads traditional",
      "Diamond timeline markers, square corners",
      "Print-friendly paper palette",
    ],
    showcase: { ...DEFAULT_SECTION_DESIGNS, skills: "bars", projects: "cards-gradient" },
  },
  {
    id: "minimal",
    name: "Minimal Mono",
    tagline: "Monochrome, italic rules, type-driven",
    desc: "Stripped back to typography: grayscale palette, monospace headings, hard corners, and no shadows or gradients.",
    swatches: ["#242424", "#5c5c5c", "#fcfcfc", "#e0e0e0"],
    notes: [
      "Monospace headings, flat grayscale surfaces",
      "No gradients — not even in the hero",
      "2px rules replace glow-heavy borders",
      "Skills as dot lists, projects & timeline as rows",
    ],
    showcase: { ...DEFAULT_SECTION_DESIGNS, skills: "dots", projects: "rows", experience: "rows", education: "rows", hobbies: "pills" },
  },
  {
    id: "earthy",
    name: "Earthy Warm",
    tagline: "Terracotta, amber & soft cream",
    desc: "A warm, friendly take with a terracotta→amber gradient, large rounded corners, and hushed warm surfaces.",
    swatches: ["#b3541e", "#d97706", "#faf5eb", "#e8dec9"],
    notes: [
      "Warm terracotta/amber accents",
      "Extra-soft rounded corners on cards",
      "Cream paper background",
      "Skills as chips, timeline as warm cards, interests as pills",
    ],
    showcase: { ...DEFAULT_SECTION_DESIGNS, skills: "chips", experience: "cards-gradient", education: "cards-gradient", hobbies: "pills" },
  },
  {
    id: "ocean",
    name: "Oceanic",
    tagline: "Deep teal, fresh water accents",
    desc: "A crisp maritime palette — deep teal primary, mint-cyan accents, and a faint sea-tinted background.",
    swatches: ["#1f7a8c", "#22a7bd", "#f4fbfd", "#d8eef4"],
    notes: [
      "Deep teal → mint gradient",
      "Ring-style timeline markers",
      "Cool, fresh white-and-teal surfaces",
      "Skills as chips, projects as rows, interests as pills",
    ],
    showcase: { ...DEFAULT_SECTION_DESIGNS, skills: "chips", projects: "rows", hobbies: "pills" },
  },
  {
    id: "sunset",
    name: "Sunset",
    tagline: "Pink-to-amber, gradient name",
    desc: "The bold one: rose→orange gradient on the name, tinted pink surfaces, and soft rounded corners.",
    swatches: ["#e11d74", "#f97316", "#fff5f7", "#fadbe8"],
    notes: [
      "Gradient headline text",
      "Rose-tinted cards and chips",
      "Large rounded corners",
      "Skills as dot lists, timeline as cards, interests as pills",
    ],
    showcase: { ...DEFAULT_SECTION_DESIGNS, skills: "dots", experience: "cards-gradient", education: "cards-gradient", hobbies: "pills" },
  },
  {
    id: "forest",
    name: "Forest",
    tagline: "Deep green & quiet sage",
    desc: "A grounded, natural palette — deep evergreen primary, sage surfaces, and slightly square corners.",
    swatches: ["#2f7d5a", "#5fb98a", "#f6faf7", "#deeae1"],
    notes: [
      "Evergreen → leaf gradient",
      "Sage-tinted, low-contrast surfaces",
      "Slightly square corners",
      "Projects as rows, timeline as cards, interests as checklists",
    ],
    showcase: { ...DEFAULT_SECTION_DESIGNS, skills: "bars", projects: "rows", experience: "cards-gradient", education: "cards-gradient", hobbies: "checks" },
  },
  {
    id: "slate",
    name: "Slate",
    tagline: "Corporate cool-gray & navy",
    desc: "A dependable corporate profile: cool slate-blue accents, navy-ish totals, sharp corners, and no card shadows.",
    swatches: ["#3b5b80", "#5f7fa8", "#f7f9fc", "#dfe6ee"],
    notes: [
      "Cool blue-gray, sans-serif",
      "Sharp corners, flat surfaces",
      "Calm, executive-report feel",
      "Skills as dot lists, projects & timeline as rows",
    ],
    showcase: { ...DEFAULT_SECTION_DESIGNS, skills: "dots", projects: "rows", experience: "rows", education: "rows", hobbies: "pills" },
  },
];