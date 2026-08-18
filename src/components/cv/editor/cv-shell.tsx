import { Fragment, type ReactNode } from "react";
import { CVData, SectionKey } from "@/lib/cv-types";
import { SectionHeader } from "@/components/cv/SectionHeader";
import { SkillBar } from "@/components/cv/SkillBar";
import { TimelineItem } from "@/components/cv/TimelineItem";
import { ProjectCard } from "@/components/cv/ProjectCard";
import { Hero } from "@/components/cv/Hero";
import {
  Code2, Coffee, Gamepad2, Mountain, Music, Book, Camera, Bike, Plane, Dumbbell, Flower2,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Mountain, Coffee, Music, Code2, Gamepad2, Book, Camera, Bike, Plane, Dumbbell, Flower2,
};

const splitTags = (s: string) => s.split(",").map((t) => t.trim()).filter(Boolean);

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

const EmptyState = ({ label }: { label: string }) => (
  <div className="rounded-md border border-dashed border-border px-4 py-6 text-center text-sm text-muted-foreground print:hidden">
    {label}
  </div>
);

export const CVShell = ({
  data, wrap, onDownload, hideEmpty,
}: {
  data: CVData;
  wrap: WrapSection;
  onDownload?: () => void;
  /** When true (print/export), empty sections are omitted entirely. */
  hideEmpty?: boolean;
}) => {
  const L = data.labels;

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

  const groupedSkills = data.skillGroups
    .map((g) => ({ group: g, items: data.skills.filter((s) => s.group === g.id) }))
    .filter((g) => g.items.length > 0);

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
    switch (meta.key) {
      case "hero":
        return <Hero data={data} onDownload={onDownload} />;
      case "about":
        return (
          <section className="mb-12">
            <SectionHeader index={meta.index} title={meta.title} subtitle={meta.subtitle} />
            {data.about ? (
              <div className="space-y-4 text-muted-foreground">
                {data.about.split("\n\n").map((p, i) => (
                  <p key={i} className="text-base leading-relaxed">{p}</p>
                ))}
              </div>
            ) : (
              <EmptyState label="Add a short introduction…" />
            )}
          </section>
        );
      case "experience":
        return (
          <section className="mb-12">
            <SectionHeader index={meta.index} title={meta.title} subtitle={meta.subtitle} />
            {data.experience.length ? (
              <div>
                {data.experience.map((e) => (
                  <TimelineItem key={e.id} period={e.period} title={e.title} subtitle={e.company} location={e.location} tags={splitTags(e.tags)}>
                    {e.description}
                  </TimelineItem>
                ))}
              </div>
            ) : (
              <EmptyState label="No experience entries yet" />
            )}
          </section>
        );
      case "education":
        return (
          <section className="mb-12">
            <SectionHeader index={meta.index} title={meta.title} subtitle={meta.subtitle} />
            {data.education.length ? (
              <div>
                {data.education.map((e) => (
                  <TimelineItem key={e.id} period={e.period} title={e.title} subtitle={e.school} location={e.location} tags={splitTags(e.tags)}>
                    {e.description}
                  </TimelineItem>
                ))}
              </div>
            ) : (
              <EmptyState label="No education entries yet" />
            )}
          </section>
        );
      case "skills":
        return (
          <section className="mb-12 avoid-break">
            <SectionHeader index={meta.index} title={meta.title} subtitle={meta.subtitle} />
            {groupedSkills.length ? (
              <div className="grid gap-x-8 gap-y-6 md:grid-cols-2 print-grid-2">
                {groupedSkills.map(({ group, items }) => (
                  <div key={group.id} className="avoid-break">
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-accent">{group.name}</h3>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                      {items.map((s) => (
                        <SkillBar key={s.id} name={s.name} percentage={s.percentage} color={s.color} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState label="No skills yet" />
            )}
          </section>
        );
      case "projects":
        return (
          <section className="mb-12 avoid-break">
            <SectionHeader index={meta.index} title={meta.title} subtitle={meta.subtitle} />
            {data.projects.length ? (
              <div className="grid gap-2 md:grid-cols-2 print-grid-2-tight">
                {data.projects.map((p) => (
                  <ProjectCard
                    key={p.id}
                    name={p.name}
                    period={p.period}
                    description={p.description}
                    stack={splitTags(p.stack)}
                    stars={p.stars}
                    repo={p.repo}
                    link={p.link}
                  />
                ))}
              </div>
            ) : (
              <EmptyState label="No projects yet" />
            )}
          </section>
        );
      case "hobbies":
        return (
          <section className="mb-12 avoid-break">
            <SectionHeader index={meta.index} title={meta.title} subtitle={meta.subtitle} />
            {data.hobbies.length ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-5 print-grid-5">
                {data.hobbies.map((hb) => {
                  const Icon = ICON_MAP[hb.icon] ?? Code2;
                  return (
                    <div key={hb.id} className="group flex flex-col items-center gap-3 rounded-lg border border-border bg-gradient-card p-5 text-center">
                      <Icon className="h-7 w-7 text-primary transition-transform group-hover:scale-110" />
                      <span className="text-xs text-muted-foreground">{hb.label}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyState label="No hobbies yet" />
            )}
          </section>
        );
      case "footer":
        return (
          <footer className="border-t border-border pt-10">
            <div className="flex flex-col items-center justify-between gap-4 text-center text-xs text-muted-foreground md:flex-row md:text-left">
              <div>{L.footerThanks}</div>
              <div>{L.footerCopyright || `© ${new Date().getFullYear()} ${data.name}`}</div>
            </div>
          </footer>
        );
    }
  };

  return (
    <div className="bg-background">
      <Fragment key="hero">{wrap(metas.hero, content(metas.hero))}</Fragment>
      <main className="container mx-auto max-w-5xl px-6 pt-8 pb-20">
        {order.filter((k) => k !== "hero").map((k) => {
          const meta = metas[k];
          return <Fragment key={k}>{wrap(meta, content(meta))}</Fragment>;
        })}
      </main>
    </div>
  );
};
