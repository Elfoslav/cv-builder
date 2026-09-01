import { type CVData } from "@/lib/cv-types";
import { HeroContact } from "./HeroContact";

/** Flat header whose name is set in gradient text under a full-width gradient rule. */
export const HeroGradientHeadline = ({ data }: { data: CVData }) => (
  <section className="cv-hero border-b border-border">
    <div className="py-12 print:py-6">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">{data.role}</p>
      {/* leading-[1.15] + pb-1: `text-5xl` sets line-height:1, which clips bold
         descenders (e.g. the "g" tail) once the name is painted with
         background-clip:text. The extra line box + padding gives them room. */}
      <h1 className="mt-3 pb-1 text-5xl font-extrabold leading-[1.15] tracking-tight text-gradient-primary">
        {data.name || "Your Name"}
      </h1>
      <div aria-hidden className="mt-5 h-0.5 w-full bg-gradient-primary" />
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">{data.bio}</p>
      <HeroContact data={data} className="mt-6 grid max-w-2xl grid-cols-1 gap-3 text-sm sm:grid-cols-2" />
    </div>
  </section>
);