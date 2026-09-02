import { type CVData } from "@/lib/cv-types";
import { BioText } from "@/components/cv/BioText";
import { HeroContact } from "./HeroContact";

/** Reference look: gradient glow with a keyboard-grid backdrop. */
export const HeroGradient = ({ data }: { data: CVData }) => (
  <section className="cv-hero relative overflow-hidden border-b border-border">
    <div className="grid-bg pointer-events-none absolute inset-0" />
    <div className="pointer-events-none absolute inset-0 bg-gradient-glow" />
      <div className="relative py-10 print:py-4">
      <h1 className="mb-3 text-5xl font-extrabold tracking-tight text-foreground">
        {data.name || "Your Name"}
      </h1>
      <p className="mb-5 text-xl font-medium text-accent">{data.role}</p>
      <BioText bio={data.bio} className="max-w-2xl text-base leading-relaxed text-muted-foreground" />
      <HeroContact data={data} className="mt-6 grid grid-cols-2 gap-4 text-sm" />
    </div>
  </section>
);
