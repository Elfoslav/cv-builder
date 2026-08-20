import { type CVData } from "@/lib/cv-types";
import { HeroContact } from "./HeroContact";

/** Name, role and bio centered, contact inline below. */
export const HeroCentered = ({ data }: { data: CVData }) => (
  <section className="cv-hero relative overflow-hidden border-b border-border">
    <div className="grid-bg absolute inset-0" />
    <div className="absolute inset-0 bg-gradient-glow" />
    <div className="container relative mx-auto max-w-5xl px-6 py-10 md:py-6 print:py-4">
      <div className="flex flex-col items-center text-center">
        <h1 className="mb-3 text-5xl font-extrabold tracking-tight text-foreground md:text-5xl">
          {data.name || "Your Name"}
        </h1>
        <p className="mb-4 text-lg font-medium text-accent md:text-xl">{data.role}</p>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">{data.bio}</p>
        <HeroContact data={data} className="mt-6 grid max-w-xl grid-cols-1 gap-4 text-sm sm:grid-cols-2 md:grid-cols-2" />
      </div>
    </div>
  </section>
);