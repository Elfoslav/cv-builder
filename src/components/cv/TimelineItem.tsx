import { ReactNode } from "react";

interface TimelineItemProps {
	period: string;
	title: string;
	subtitle?: string;
	location?: string;
	children: ReactNode;
	tags?: string[];
}

export const TimelineItem = ({
	period,
	title,
	subtitle,
	location,
	children,
	tags,
}: TimelineItemProps) => {
	return (
		<div className="cv-timeline-item relative pl-8 pb-8 last:pb-0">
			<div className="cv-dot absolute left-0 top-2 h-3 w-3 rounded-full bg-primary shadow-glow" />
			<div className="cv-line absolute left-[5px] top-5 h-full w-px bg-border" />
			<div className="text-xs font-semibold uppercase tracking-wider text-primary">{period}</div>
			<h3 className="mt-2 text-xl font-semibold text-foreground">{title}</h3>
			{(subtitle || location) && (
				<div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
					{subtitle && <span className="font-medium text-accent">{subtitle}</span>}
					{location && (
						<>
							<span>·</span>
							<span>{location}</span>
						</>
					)}
				</div>
			)}
			<div className="mt-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
			{tags && tags.length > 0 && (
				<div className="mt-4 flex flex-wrap gap-2">
					{tags.map((tag) => (
						<span
							key={tag}
							className="rounded-full border border-border bg-secondary/50 px-3 py-0.5 text-xs text-foreground"
						>
							{tag}
						</span>
					))}
				</div>
			)}
		</div>
	);
};
