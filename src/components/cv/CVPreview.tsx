import { Hero } from "@/components/cv/Hero";
import { SectionHeader } from "@/components/cv/SectionHeader";
import { SkillBar } from "@/components/cv/SkillBar";
import { TimelineItem } from "@/components/cv/TimelineItem";
import { ProjectCard } from "@/components/cv/ProjectCard";
import { CVData } from "@/lib/cv-types";
import {
  Code2, Coffee, Gamepad2, Mountain, Music,
  Book, Camera, Bike, Plane, Dumbbell, Flower2, LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Mountain, Coffee, Music, Code2, Gamepad2, Book, Camera, Bike, Plane, Dumbbell, Flower2,
};

const splitTags = (s: string) =>
  s.split(",").map((t) => t.trim()).filter(Boolean);

interface CVPreviewProps {
  data: CVData;
  onDownload?: () => void;
}

export const CVPreview = ({ data, onDownload }: CVPreviewProps) => {
  const groupedSkills = data.skillGroups
    .map((g) => ({ group: g, items: data.skills.filter((s) => s.group === g.id) }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="bg-background">
      <Hero data={data} onDownload={onDownload} />

      <main className="container mx-auto max-w-5xl px-6 py-20">
        {data.about && (
          <section className="mb-24">
            <SectionHeader index="01" title="About Me" subtitle="Introduction" />
            <div className="space-y-4 text-muted-foreground">
              {data.about.split("\n\n").map((p, i) => (
                <p key={i} className="text-base leading-relaxed">{p}</p>
              ))}
            </div>
          </section>
        )}

        {groupedSkills.length > 0 && (
          <section className="mb-24">
            <SectionHeader index="02" title="Skills" subtitle="What I work with" />
            <div className="grid gap-10 md:grid-cols-2 print-grid-2">
              {groupedSkills.map(({ group, items }) => (
                <div key={group.id}>
                  <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-accent">
                    {group.name}
                  </h3>
                  <div className="space-y-5">
                    {items.map((s) => (
                      <SkillBar key={s.id} name={s.name} percentage={s.percentage} color={s.color} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="mb-24">
            <SectionHeader index="03" title="Work Experience" subtitle="Career history" />
            <div>
              {data.experience.map((e) => (
                <TimelineItem
                  key={e.id}
                  period={e.period}
                  title={e.title}
                  subtitle={e.company}
                  location={e.location}
                  tags={splitTags(e.tags)}
                >
                  {e.description}
                </TimelineItem>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section className="mb-24">
            <SectionHeader index="04" title="Education" subtitle="Academic background" />
            <div>
              {data.education.map((e) => (
                <TimelineItem
                  key={e.id}
                  period={e.period}
                  title={e.title}
                  subtitle={e.school}
                  location={e.location}
                  tags={splitTags(e.tags)}
                >
                  {e.description}
                </TimelineItem>
              ))}
            </div>
          </section>
        )}

        {data.projects.length > 0 && (
          <section className="mb-24">
            <SectionHeader index="05" title="Featured Projects" subtitle="Things I've built" />
            <div className="grid gap-5 md:grid-cols-2 print-grid-2-tight">
              {data.projects.map((p) => (
                <ProjectCard
                  key={p.id}
                  name={p.name}
                  description={p.description}
                  stack={splitTags(p.stack)}
                  stars={p.stars}
                  repo={p.repo}
                  link={p.link}
                />
              ))}
            </div>
          </section>
        )}

        {data.hobbies.length > 0 && (
          <section className="mb-24">
            <SectionHeader index="06" title="Interests" subtitle="Outside of work" />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5 print-grid-5">
              {data.hobbies.map((h) => {
                const Icon = ICON_MAP[h.icon] ?? Code2;
                return (
                  <div
                    key={h.id}
                    className="group flex flex-col items-center gap-3 rounded-lg border border-border bg-gradient-card p-5 text-center transition-all hover:border-primary/50 hover:shadow-glow"
                  >
                    <Icon className="h-7 w-7 text-primary transition-transform group-hover:scale-110" />
                    <span className="text-xs text-muted-foreground">{h.label}</span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <footer className="border-t border-border pt-10">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-xs text-muted-foreground md:flex-row md:text-left">
            <div>Thanks for taking the time to read my CV.</div>
            <div>
              © {new Date().getFullYear()} {data.name}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};
