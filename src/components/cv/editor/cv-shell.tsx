import { Fragment, type ReactNode } from "react";
import { CVData, SectionKey } from "@/lib/cv-types";
import { DEFAULT_SECTION_DESIGNS, type SectionDesigns } from "@/lib/section-designs";
import { SectionHeader } from "@/components/cv/SectionHeader";
import { Hero } from "@/components/cv/Hero";
import { EmptyState, groupSkills, splitTags } from "@/components/cv/cv-utils";
import { SkillsView } from "@/components/cv/themed/skills";
import { ProjectsView } from "@/components/cv/themed/projects";
import { TimelineView, type TimelineEntry } from "@/components/cv/themed/timeline";
import { HobbiesView } from "@/components/cv/themed/hobbies";
import { AboutView } from "@/components/cv/themed/AboutView";
import { FooterView } from "@/components/cv/themed/FooterView";

export interface SectionMeta {
  key: SectionKey;
  title: string;
  subtitle?: string;
  count?: number;
  index?: string;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
}

export type WrapSection = (meta: SectionMeta, content: ReactNode) => ReactNode;

export const CVShell = ({
  data, wrap, onDownload, hideEmpty, designs,
}: {
  data: CVData;
  wrap: WrapSection;
  onDownload?: () => void;
  /** When true (print/export), empty sections are omitted entirely. */
  hideEmpty?: boolean;
  /** Optional per-section design overrides (used by the drafts showcase). */
  designs?: Partial<SectionDesigns>;
}) => {
  const L = data.labels;

  const d: SectionDesigns = { ...DEFAULT_SECTION_DESIGNS, ...data.sectionDesigns, ...designs };

  // Display order comes from persisted data; hero & footer are pinned at the ends.
  const order = Array.isArray(data.sectionOrder) && data.sectionOrder.length
    ? data.sectionOrder
    : (["hero", "about", "experience", "education", "skills", "projects", "hobbies", "footer"] as SectionKey[]);
  const headerOrder = order.filter((k) => k !== "hero" && k !== "footer");

  const isSectionEmpty = (key: SectionKey): boolean => {
    switch (key) {
      case "about": return !data.about;
      case "experience": return data.experience.length === 0;
      case "education": return data.education.length === 0;
      case "skills": return data.skills.length === 0;
      case "projects": return data.projects.length === 0;
      case "hobbies": return data.hobbies.length === 0;
      default: return false;
    }
  };

  const groupedSkills = groupSkills(data);

  const toTimelineEntry = (entry: {
    id: string;
    period: string;
    title: string;
    subtitle: string;
    location: string;
    description: string;
    tags: string;
  }): TimelineEntry => ({
    id: entry.id, period: entry.period, title: entry.title, subtitle: entry.subtitle,
    location: entry.location, description: entry.description, tags: splitTags(entry.tags),
  });

  const metas: Record<SectionKey, SectionMeta> = {
    hero: { key: "hero", title: "Profile header", subtitle: "Name, role, bio & contact" },
    about: { key: "about", title: L.aboutTitle, subtitle: L.aboutSubtitle },
    experience: { key: "experience", title: L.experienceTitle, subtitle: L.experienceSubtitle, count: data.experience.length },
    education: { key: "education", title: L.educationTitle, subtitle: L.educationSubtitle, count: data.education.length },
    skills: { key: "skills", title: L.skillsTitle, subtitle: L.skillsSubtitle, count: data.skills.length },
    projects: { key: "projects", title: L.projectsTitle, subtitle: L.projectsSubtitle, count: data.projects.length },
    hobbies: { key: "hobbies", title: L.hobbiesTitle, subtitle: L.hobbiesSubtitle, count: data.hobbies.length },
    footer: { key: "footer", title: "Footer", subtitle: "Closing message & copyright" },
  };

  // In export mode the numbering follows only the sections that will be shown.
  const numbered = hideEmpty
    ? headerOrder.filter((k) => !isSectionEmpty(k))
    : headerOrder;
  numbered.forEach((k, i) => {
    metas[k].index = String(i + 1).padStart(2, "0");
    metas[k].canMoveUp = i > 0;
    metas[k].canMoveDown = i < numbered.length - 1;
  });

  const content = (meta: SectionMeta): ReactNode => {
    if (hideEmpty && meta.key !== "hero" && meta.key !== "footer" && isSectionEmpty(meta.key)) {
      return null;
    }
    const section = (children: ReactNode, extraClass = "mb-12") => (
      <section className={`${extraClass}`}>
        <SectionHeader index={meta.index} title={meta.title} subtitle={meta.subtitle} />
        {children}
      </section>
    );
    switch (meta.key) {
      case "hero":
        return <Hero data={data} onDownload={onDownload} variant={d.hero} />;
      case "about":
        return data.about
          ? section(<AboutView about={data.about} variant={d.about} />)
          : section(<EmptyState label="Add a short introduction…" />);
      case "experience":
        return data.experience.length
          ? section(<TimelineView items={data.experience.map(toTimelineEntry)} variant={d.experience} />)
          : section(<EmptyState label="No experience entries yet" />);
      case "education":
        return data.education.length
          ? section(<TimelineView items={data.education.map(toTimelineEntry)} variant={d.education} />)
          : section(<EmptyState label="No education entries yet" />);
      case "skills":
        return groupedSkills.length
          ? section(<SkillsView groups={groupedSkills} variant={d.skills} />, "mb-12 avoid-break")
          : section(<EmptyState label="No skills yet" />, "mb-12 avoid-break");
      case "projects":
        return data.projects.length
          ? section(<ProjectsView projects={data.projects} variant={d.projects} />, "mb-12 avoid-break")
          : section(<EmptyState label="No projects yet" />, "mb-12 avoid-break");
      case "hobbies":
        return data.hobbies.length
          ? section(<HobbiesView hobbies={data.hobbies} variant={d.hobbies} />, "mb-12 avoid-break")
          : section(<EmptyState label="No hobbies yet" />, "mb-12 avoid-break");
      case "footer":
        return (
          <FooterView
            thanks={L.footerThanks}
            copyright={L.footerCopyright || `© ${new Date().getFullYear()} ${data.name}`}
            variant={d.footer}
          />
        );
    }
  };

  return (
    <div className="bg-background">
      <Fragment key="hero">{wrap(metas.hero, content(metas.hero))}</Fragment>
      <main className="cv-main container mx-auto max-w-5xl px-6 pt-8 pb-20">
        {order.filter((k) => k !== "hero").map((k) => {
          const meta = metas[k];
          return <Fragment key={k}>{wrap(meta, content(meta))}</Fragment>;
        })}
      </main>
    </div>
  );
};