import { type Project } from "@/lib/cv-types";
import { type CardColumns } from "@/lib/cv-types";
import { type ListLayout } from "@/lib/section-designs";
import { splitTags } from "@/components/cv/cv-utils";
import { type ListEntry } from "@/components/cv/themed/shared/types";
import { ListGradientSoftCards } from "@/components/cv/themed/shared/ListGradientSoftCards";
import { ListGradientBorderCards } from "@/components/cv/themed/shared/ListGradientBorderCards";
import { ListGradientBandCards } from "@/components/cv/themed/shared/ListGradientBandCards";
import { ListGradientCornerCards } from "@/components/cv/themed/shared/ListGradientCornerCards";
import { ListGradientHeadlineCards } from "@/components/cv/themed/shared/ListGradientHeadlineCards";
import { ListFlatCards } from "@/components/cv/themed/shared/ListFlatCards";
import { ListAccentCards } from "@/components/cv/themed/shared/ListAccentCards";
import { ListRows } from "@/components/cv/themed/shared/ListRows";
import { ListCardRows } from "@/components/cv/themed/shared/ListCardRows";
import { ListTimeline } from "@/components/cv/themed/shared/ListTimeline";

interface ProjectsViewProps {
  projects: Project[];
  variant: ListLayout;
  /** Columns for the card designs; 2 is the default for projects. */
  columns?: CardColumns;
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

export const ProjectsView = ({ projects, variant, columns = 2 }: ProjectsViewProps) => {
  const entries = projects.map(toEntry);
  if (variant === "cards-gradient-soft") return <ListGradientSoftCards items={entries} columns={columns} />;
  if (variant === "cards-gradient-border") return <ListGradientBorderCards items={entries} columns={columns} />;
  if (variant === "cards-gradient-band") return <ListGradientBandCards items={entries} columns={columns} />;
  if (variant === "cards-gradient-corner") return <ListGradientCornerCards items={entries} columns={columns} />;
  if (variant === "cards-gradient-headline") return <ListGradientHeadlineCards items={entries} columns={columns} />;
  if (variant === "cards-flat") return <ListFlatCards items={entries} columns={columns} />;
  if (variant === "cards-accent") return <ListAccentCards items={entries} columns={columns} />;
  if (variant === "rows") return <ListRows items={entries} />;
  if (variant === "rows-gradient") return <ListCardRows items={entries} />;
  if (variant === "rows-flat") return <ListCardRows items={entries} tone="flat" />;
  if (variant === "rows-accent") return <ListCardRows items={entries} tone="accent" />;
  if (variant === "timeline") return <ListTimeline items={entries} />;
  return <ListGradientSoftCards items={entries} columns={columns} />;
};