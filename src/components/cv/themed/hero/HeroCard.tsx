import { type CVData } from "@/lib/cv-types";
import { BioText } from "@/components/cv/BioText";
import { HeroContact } from "./HeroContact";

/** The entire header enclosed in a flat bordered card. */
export const HeroCard = ({ data }: { data: CVData }) => (
  <section className="cv-hero border-b border-border">
    <div className="py-10 print:py-5">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
          {data.name || "Your Name"}
        </h1>
        <p className="mt-1 text-lg font-medium text-accent">{data.role}</p>
        <BioText bio={data.bio} className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground" />
        <HeroContact data={data} className="mt-5 grid max-w-2xl grid-cols-1 gap-3 text-sm sm:grid-cols-2" />
      </div>
    </div>
  </section>
);