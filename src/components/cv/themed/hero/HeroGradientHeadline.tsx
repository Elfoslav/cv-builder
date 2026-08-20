import { type CVData } from "@/lib/cv-types";
import { HeroContact } from "./HeroContact";

/** Flat header whose name is set in gradient text under a full-width gradient rule. */
export const HeroGradientHeadline = ({ data }: { data: CVData }) => (
  <section className="cv-hero border-b border-border">
    <div className="container mx-auto max-w-5xl px-6 py-12 print:py-6">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">{data.role}</p>
      <h1 className="mt-3 text-5xl font-extrabold tracking-tight text-gradient-primary md:text-6xl">
        {data.name || "Your Name"}
      </h1>
      <div aria-hidden className="mt-5 h-0.5 w-full bg-gradient-primary" />
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">{data.bio}</p>
      <HeroContact data={data} className="mt-6 grid max-w-2xl grid-cols-1 gap-3 text-sm sm:grid-cols-2" />
    </div>
  </section>
);