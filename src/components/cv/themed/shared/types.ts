/**
 * Shared, section-agnostic list entry model.
 *
 * Experience, education and projects are all rendered by the same set of
 * re-usable list-design components (ListCards, ListRows, ListTimeline, …).
 * Each section's `<Section>View` maps its own data into this shape; extra
 * project-only data (external links, GitHub stars, compact tag pills) is
 * carried as optional `links` / `compact` and activates a slightly denser
 * presentation so the shared components can also render projects faithfully.
 */

export interface ListLinks {
  stars?: number;
  repo?: string;
  link?: string;
}

export interface ListEntry {
  id: string;
  period?: string;
  title: string;
  subtitle?: string;
  location?: string;
  description: string;
  tags: string[];
  /** Project-only extras: external links + GitHub stars. */
  links?: ListLinks;
  /** Projects use smaller tag pills and the `cv-project-*` print hooks. */
  compact?: boolean;
}