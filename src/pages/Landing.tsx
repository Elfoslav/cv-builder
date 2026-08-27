import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { APP_NAME } from "@/lib/app";
import {
	ArrowRight,
	Check,
	Eye,
	FileCheck2,
	Languages,
	LayoutGrid,
	Lock,
	Palette,
	X,
} from "lucide-react";

type Feature = {
	icon: typeof Palette;
	title: string;
	body: string;
};

const FEATURES: Feature[] = [
	{
		icon: Palette,
		title: "Real themes, not swatches",
		body: "Dozens of full color themes re-skin the entire CV through design tokens — background, headings, cards, skill bars, and footer all change together.",
	},
	{
		icon: LayoutGrid,
		title: "A design for every section",
		body: "Experience, education, skills, projects, and hobbies each ship with multiple layout variants. Mix a timeline for work, cards for projects, dots for skills.",
	},
	{
		icon: FileCheck2,
		title: "Print-perfect export",
		body: "Resumes render off-screen at the exact page width, so the PDF you export is pixel-identical to the preview. No reflow, no surprises.",
	},
	{
		icon: Eye,
		title: "Live preview while you edit",
		body: "On wide screens the editor and a print-width preview sit side by side, so you see every change exactly as it will print.",
	},
	{
		icon: Languages,
		title: "One CV, many languages",
		body: "Author the same resume in multiple languages and export each version — without duplicating your work.",
	},
	{
		icon: Lock,
		title: "Local-first & private",
		body: "Your CV is saved in your browser. No account, no upload, no lock-in — it's yours to keep.",
	},
];

const GENERIC = [
	"One fixed template per resume",
	"A single accent color",
	"Export looks different from the preview",
	"Account required, your data in the cloud",
	"One language per document",
	"Paywall to download the file",
];

const OURS = [
	"Themes plus a design variant for every section",
	"Fully re-skinned color themes",
	"What you see is what you export",
	"Local-first — saved in your browser, no account",
	"One CV in many languages",
	"Export anytime, no paywall",
];

export default function Landing() {
	useEffect(() => {
		const previous = document.title;
		document.title = `${APP_NAME} — Build a resume that's unmistakably yours`;
		const meta = document.querySelector('meta[name="description"]');
		const original = meta?.getAttribute("content") ?? null;
		meta?.setAttribute(
			"content",
			"Custom Resume Builder: real themes, a different design for every section, and PDFs that match the preview exactly. Local-first and multi-language.",
		);
		return () => {
			document.title = previous;
			if (meta && original !== null) meta.setAttribute("content", original);
		};
	}, []);

	return (
		<div className="min-h-screen bg-background text-foreground">
			<header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
				<div className="page-container flex items-center justify-between gap-4 py-3">
					<Link to="/" className="flex items-center gap-2 font-semibold">
						<span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-primary text-xs font-bold text-primary-foreground">
							CR
						</span>
						{APP_NAME}
					</Link>
					<nav className="flex items-center gap-2">
						{import.meta.env.DEV && (
							<Button asChild variant="ghost" size="sm">
								<Link to="/drafts">Drafts</Link>
							</Button>
						)}
						<Button asChild size="sm">
							<Link to="/resume-builder">
								Open builder
								<ArrowRight className="h-4 w-4" />
							</Link>
						</Button>
					</nav>
				</div>
			</header>

			<section className="page-container py-16 text-center sm:py-24">
				<Badge variant="secondary" className="mb-4">
					Custom Resume Builder
				</Badge>
				<h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
					Build a resume that's unmistakably yours.
				</h1>
				<p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
					Real color themes, a different design for every section, and PDFs that
					match the preview exactly — all in your browser, no account required.
				</p>
				<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
					<Button asChild size="lg">
						<Link to="/resume-builder">
							Open the builder
							<ArrowRight className="h-4 w-4" />
						</Link>
					</Button>
					<Button asChild size="lg" variant="outline">
						<Link to="#features">See what's different</Link>
					</Button>
				</div>

				<div className="relative mx-auto mt-14 max-w-3xl">
					<div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
						<div className="h-24 bg-gradient-primary" />
						<div className="space-y-3 p-6 text-left">
							<div className="h-5 w-44 rounded bg-foreground/80" />
							<div className="h-3 w-60 rounded bg-muted-foreground/40" />
							<div className="mt-4 h-3 w-full rounded bg-muted" />
							<div className="h-3 w-5/6 rounded bg-muted" />
							<div className="h-3 w-2/3 rounded bg-muted" />
							<div className="grid grid-cols-3 gap-3 pt-4">
								<div className="h-16 rounded-lg bg-muted" />
								<div className="h-16 rounded-lg bg-muted" />
								<div className="h-16 rounded-lg bg-muted" />
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id="features" className="page-container py-12">
				<h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
					Everything a template can't do
				</h2>
				<p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
					Generic builders lock you into one layout. Custom Resume Builder gives
					you the building blocks to make something that actually fits you.
				</p>
				<div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{FEATURES.map((feature) => {
						const Icon = feature.icon;
						return (
							<div
								key={feature.title}
								className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
							>
								<div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
									<Icon className="h-5 w-5" />
								</div>
								<h3 className="font-semibold">{feature.title}</h3>
								<p className="mt-2 text-sm text-muted-foreground">
									{feature.body}
								</p>
							</div>
						);
					})}
				</div>
			</section>

			<section className="page-container py-12">
				<h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
					How we compare
				</h2>
				<div className="mt-10 grid gap-4 md:grid-cols-2">
					<div className="rounded-2xl border border-border bg-card p-6">
						<h3 className="mb-4 font-semibold text-muted-foreground">
							Typical resume builder
						</h3>
						<ul className="space-y-3">
							{GENERIC.map((item) => (
								<li
									key={item}
									className="flex items-start gap-2 text-sm text-muted-foreground"
								>
									<X className="mt-0.5 h-4 w-4 shrink-0" />
									{item}
								</li>
							))}
						</ul>
					</div>
					<div className="rounded-2xl border border-primary/40 bg-primary/5 p-6">
						<h3 className="mb-4 font-semibold text-primary">
							{APP_NAME}
						</h3>
						<ul className="space-y-3">
							{OURS.map((item) => (
								<li
									key={item}
									className="flex items-start gap-2 text-sm text-foreground"
								>
									<Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
									{item}
								</li>
							))}
						</ul>
					</div>
				</div>
			</section>

			<section className="page-container py-16 text-center">
				<h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
					Start building — no signup needed.
				</h2>
				<p className="mx-auto mt-3 max-w-xl text-muted-foreground">
					Open the builder and your CV is saved right in your browser. Come back
					anytime, export when you're ready.
				</p>
				<div className="mt-8 flex justify-center">
					<Button asChild size="lg">
						<Link to="/resume-builder">
							Open the builder
							<ArrowRight className="h-4 w-4" />
						</Link>
					</Button>
				</div>
			</section>

			<footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
				© {new Date().getFullYear()} {APP_NAME}
			</footer>
		</div>
	);
}
