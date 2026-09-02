import { type CVData } from "@/lib/cv-types";
import { BioText } from "@/components/cv/BioText";
import { HeroContact } from "./HeroContact";

/**
 * Editorial flat header: a gradient accent rule, a small-caps kicker role
 * and no decorative overlays — clearly distinct from the gradient hero.
 */
export const HeroPlain = ({ data }: { data: CVData }) => (
  <section className="cv-hero border-b border-border">
    <div className="py-10 print:py-5">
      <div className="mb-5 h-1 w-10 rounded-full bg-gradient-primary" />
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">{data.role}</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground">
        {data.name || "Your Name"}
      </h1>
      <BioText bio={data.bio} className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground" />
      <HeroContact data={data} className="mt-7 grid max-w-2xl grid-cols-1 gap-3 text-sm sm:grid-cols-2" />
    </div>
  </section>
);