import { Github, Linkedin, Mail, MapPin, Phone, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CVData } from "@/lib/cv-types";
import { type HeroLayout } from "@/lib/section-designs";
import { cn } from "@/lib/utils";

interface HeroProps {
	data: CVData;
	onDownload?: () => void;
	/** Section design: gradient (default), plain header, or centered. */
	variant?: HeroLayout;
}

export const Hero = ({ data, onDownload, variant = "gradient" }: HeroProps) => {
	const centered = variant === "center";
	const plain = variant === "plain";

	return (
		<section className="cv-hero relative overflow-hidden border-b border-border">
			{!plain && (
				<>
					<div className="grid-bg absolute inset-0" />
					<div className="absolute inset-0 bg-gradient-glow" />
				</>
			)}
			<div className={cn("container relative mx-auto px-6", plain ? "py-8 print:py-5" : "py-10 md:py-6 print:py-4")}>
				<div className={cn("mx-auto max-w-4xl", centered && "flex flex-col items-center text-center")}>
					<h1 className="mb-3 text-5xl font-extrabold tracking-tight text-foreground md:text-5xl">
						{data.name || "Your Name"}
					</h1>

					<p className={cn("font-medium text-accent", centered ? "mb-4 text-lg md:text-xl" : "mb-5 text-xl md:text-2xl")}>
						{data.role}
					</p>

					<p className={cn("max-w-2xl text-base leading-relaxed text-muted-foreground", centered && "mx-auto")}>
						{data.bio}
					</p>

					{!plain && (
						<div className={cn("mt-8 flex flex-wrap gap-3 print:hidden", centered && "items-center justify-center")}>
							<Button
								size="lg"
								onClick={onDownload}
								className="gap-2 bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90"
							>
								<Download className="h-4 w-4" />
								Download CV
							</Button>
							{data.email && (
								<Button size="lg" variant="outline" className="gap-2 border-border" asChild>
									<a href={`mailto:${data.email}`}>
										<Mail className="h-4 w-4" />
										Get in touch
									</a>
								</Button>
							)}
						</div>
					)}

					<div
						className={cn(
							"mt-10 grid grid-cols-2 gap-4 text-sm md:grid-cols-4",
							plain && "mt-6",
							centered && "max-w-xl grid-cols-1 sm:grid-cols-2 md:grid-cols-2",
						)}
					>
						{data.email && (
							<ContactItem
								icon={<Mail className="h-4 w-4" />}
								label={data.email}
								href={`mailto:${data.email}`}
							/>
						)}
						{data.phone && (
							<ContactItem
								icon={<Phone className="h-4 w-4" />}
								label={data.phone}
								href={`tel:${data.phone}`}
							/>
						)}
						{data.location && (
							<ContactItem icon={<MapPin className="h-4 w-4" />} label={data.location} />
						)}
						<div className="flex items-center gap-3">
							{data.github && (
								<a
									href={data.github}
									target="_blank"
									rel="noreferrer"
									aria-label="GitHub"
									className="text-muted-foreground transition-colors hover:text-primary"
								>
									<Github className="h-5 w-5" />
								</a>
							)}
							{data.linkedin && (
								<a
									href={data.linkedin}
									target="_blank"
									rel="noreferrer"
									aria-label="LinkedIn"
									className="text-muted-foreground transition-colors hover:text-primary"
								>
									<Linkedin className="h-5 w-5" />
								</a>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

const ContactItem = ({
	icon,
	label,
	href,
}: {
	icon: React.ReactNode;
	label: string;
	href?: string;
}) => {
	const content = (
		<div className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary">
			<span className="text-primary">{icon}</span>
			<span className="truncate text-sm">{label}</span>
		</div>
	);
	return href ? <a href={href}>{content}</a> : content;
};