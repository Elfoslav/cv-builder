import { type CVData } from "@/lib/cv-types";
import { HeroContact } from "./HeroContact";

/** The entire header enclosed in a flat bordered card. */
export const HeroCard = ({ data }: { data: CVData }) => (
  <section className="cv-hero border-b border-border">
    <div className="container mx-auto max-w-5xl px-6 py-10 print:py-5">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
          {data.name || "Your Name"}
        </h1>
        <p className="mt-1 text-lg font-medium text-accent md:text-xl">{data.role}</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{data.bio}</p>
        <HeroContact data={data} className="mt-5 grid max-w-2xl grid-cols-1 gap-3 text-sm sm:grid-cols-2" />
      </div>
    </div>
  </section>
);