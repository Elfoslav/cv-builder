import { type Project } from "@/lib/cv-types";
import { type ProjectLayout } from "@/lib/section-designs";
import { splitTags } from "@/components/cv/cv-utils";
import { type ListEntry } from "@/components/cv/themed/shared/types";
import { ListCards } from "@/components/cv/themed/shared/ListCards";
import { ListFlatCards } from "@/components/cv/themed/shared/ListFlatCards";
import { ListAccentCards } from "@/components/cv/themed/shared/ListAccentCards";
import { ListRows } from "@/components/cv/themed/shared/ListRows";
import { ListTimeline } from "@/components/cv/themed/shared/ListTimeline";
import { ProjectsRows } from "./ProjectsRows";

interface ProjectsViewProps {
  projects: Project[];
  variant: ProjectLayout;
}

const toEntry = (p: Project): ListEntry => ({
  id: p.id,
  period: p.period,
  title: p.name,
  description: p.description,
  tags: splitTags(p.stack),
  compact: true,
  links: { stars: p.stars, repo: p.repo, link: p.link },
});

export const ProjectsView = ({ projects, variant }: ProjectsViewProps) => {
  const entries = projects.map(toEntry);
  if (variant === "cards-flat") return <ListFlatCards items={entries} />;
  if (variant === "cards-accent") return <ListAccentCards items={entries} />;
  if (variant === "rows") return <ProjectsRows projects={projects} />;
  if (variant === "rows-plain") return <ListRows items={entries} />;
  if (variant === "timeline") return <ListTimeline items={entries} />;
  return <ListCards items={entries} />;
};