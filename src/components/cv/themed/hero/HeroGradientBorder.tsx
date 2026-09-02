import { type CVData } from "@/lib/cv-types";
import { BioText } from "@/components/cv/BioText";
import { HeroContact } from "./HeroContact";

/** The whole header framed by a thin primary→accent gradient outline. */
export const HeroGradientBorder = ({ data }: { data: CVData }) => (
  <section className="cv-hero border-b border-border">
    <div className="py-10 print:py-5">
      <div className="rounded-lg bg-gradient-primary p-px shadow-card">
        <div className="rounded-[calc(var(--radius)-2px)] bg-card p-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
            {data.name || "Your Name"}
          </h1>
          <p className="mt-1 text-lg font-medium text-accent">{data.role}</p>
          <BioText bio={data.bio} className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground" />
          <HeroContact data={data} className="mt-5 grid max-w-2xl grid-cols-1 gap-3 text-sm sm:grid-cols-2" />
        </div>
      </div>
    </div>
  </section>
);