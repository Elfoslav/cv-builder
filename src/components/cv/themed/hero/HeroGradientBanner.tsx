import { type CVData } from "@/lib/cv-types";
import { HeroContact } from "./HeroContact";

/** Name and role sit on a vivid gradient banner; bio and contact below. */
export const HeroGradientBanner = ({ data }: { data: CVData }) => (
  <section className="cv-hero border-b border-border">
    <div className="container mx-auto max-w-5xl px-6 py-10 print:py-5">
      <div className="rounded-xl bg-gradient-primary px-6 py-8 shadow-card">
        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
          {data.name || "Your Name"}
        </h1>
        <p className="mt-1.5 text-lg font-medium text-white/85 md:text-xl">{data.role}</p>
      </div>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{data.bio}</p>
      <HeroContact data={data} className="mt-6 grid max-w-2xl grid-cols-1 gap-3 text-sm sm:grid-cols-2" />
    </div>
  </section>
);