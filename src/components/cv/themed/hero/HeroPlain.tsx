import { type CVData } from "@/lib/cv-types";
import { HeroContact } from "./HeroContact";

/**
 * Editorial flat header: a gradient accent rule, a small-caps kicker role
 * and no decorative overlays — clearly distinct from the gradient hero.
 */
export const HeroPlain = ({ data }: { data: CVData }) => (
  <section className="cv-hero border-b border-border">
    <div className="mx-auto max-w-[703px] px-6 py-10 print:py-5">
      <div className="mb-5 h-1 w-10 rounded-full bg-gradient-primary" />
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">{data.role}</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        {data.name || "Your Name"}
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{data.bio}</p>
      <HeroContact data={data} className="mt-7 grid max-w-2xl grid-cols-1 gap-3 text-sm sm:grid-cols-2" />
    </div>
  </section>
);