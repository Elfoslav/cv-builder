import { type Project } from "@/lib/cv-types";
import { type ProjectLayout } from "@/lib/section-designs";
import { ProjectsCards } from "./ProjectsCards";
import { ProjectsFlatCards } from "./ProjectsFlatCards";
import { ProjectsAccentCards } from "./ProjectsAccentCards";
import { ProjectsRows } from "./ProjectsRows";
import { ProjectsRowsPlain } from "./ProjectsRowsPlain";
import { ProjectsTimeline } from "./ProjectsTimeline";

interface ProjectsViewProps {
  projects: Project[];
  variant: ProjectLayout;
}

export const ProjectsView = ({ projects, variant }: ProjectsViewProps) => {
  if (variant === "cards-flat") return <ProjectsFlatCards projects={projects} />;
  if (variant === "cards-accent") return <ProjectsAccentCards projects={projects} />;
  if (variant === "rows") return <ProjectsRows projects={projects} />;
  if (variant === "rows-plain") return <ProjectsRowsPlain projects={projects} />;
  if (variant === "timeline") return <ProjectsTimeline projects={projects} />;
  return <ProjectsCards projects={projects} />;
};