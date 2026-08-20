import { type CVData } from "@/lib/cv-types";
import { HeroContact } from "./HeroContact";

/** Reference look: gradient glow with a keyboard-grid backdrop. */
export const HeroGradient = ({ data }: { data: CVData }) => (
  <section className="cv-hero relative overflow-hidden border-b border-border">
    <div className="grid-bg absolute inset-0" />
    <div className="absolute inset-0 bg-gradient-glow" />
    <div className="container relative mx-auto max-w-5xl px-6 py-10 md:py-6 print:py-4">
      <h1 className="mb-3 text-5xl font-extrabold tracking-tight text-foreground md:text-5xl">
        {data.name || "Your Name"}
      </h1>
      <p className="mb-5 text-xl font-medium text-accent md:text-2xl">{data.role}</p>
      <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">{data.bio}</p>
      <HeroContact data={data} className="mt-6 grid grid-cols-2 gap-4 text-sm md:grid-cols-4" />
    </div>
  </section>
);