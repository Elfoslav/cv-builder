import { Hero } from "@/components/cv/Hero";
import { SectionHeader } from "@/components/cv/SectionHeader";
import { SkillBar } from "@/components/cv/SkillBar";
import { TimelineItem } from "@/components/cv/TimelineItem";
import { ProjectCard } from "@/components/cv/ProjectCard";
import { Code2, Coffee, Gamepad2, Mountain, Music } from "lucide-react";

const skills = {
  languages: [
    { name: "TypeScript", percentage: 95, color: "cyan" as const },
    { name: "Python", percentage: 88, color: "yellow" as const },
    { name: "Go", percentage: 78, color: "green" as const },
    { name: "Rust", percentage: 65, color: "pink" as const },
  ],
  frameworks: [
    { name: "React / Next.js", percentage: 96, color: "cyan" as const },
    { name: "Node.js", percentage: 92, color: "green" as const },
    { name: "PostgreSQL", percentage: 85, color: "purple" as const },
    { name: "Docker / K8s", percentage: 80, color: "yellow" as const },
  ],
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />

      <main className="container mx-auto max-w-5xl px-6 py-20">
        {/* About */}
        <section className="mb-24">
          <SectionHeader index="01" title="About Me" command="about.md" />
          <div className="prose prose-invert max-w-none space-y-4 text-muted-foreground">
            <p className="text-base leading-relaxed">
              I'm a software engineer with{" "}
              <span className="font-mono text-primary">8+ years</span> of experience
              designing and shipping web platforms used by millions. I love turning
              hard problems into elegant abstractions and mentoring engineers to do
              their best work.
            </p>
            <p className="text-base leading-relaxed">
              My sweet spot is the seam between product and infrastructure — building
              high-leverage tools, polishing developer experience, and obsessing over
              the last 5% of UX that turns a good product into a great one.
            </p>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-24">
          <SectionHeader index="02" title="Technical Skills" command="skills.json" />
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="mb-6 font-mono text-sm uppercase tracking-wider text-accent">
                {"// Languages"}
              </h3>
              <div className="space-y-5">
                {skills.languages.map((s) => (
                  <SkillBar key={s.name} {...s} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-6 font-mono text-sm uppercase tracking-wider text-accent">
                {"// Frameworks & Tools"}
              </h3>
              <div className="space-y-5">
                {skills.frameworks.map((s) => (
                  <SkillBar key={s.name} {...s} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="mb-24">
          <SectionHeader index="03" title="Work Experience" command="experience.log" />
          <div>
            <TimelineItem
              period="2022 — Present"
              title="Senior Software Engineer"
              subtitle="Vercel"
              location="Remote"
              tags={["Next.js", "Edge Runtime", "TypeScript", "Turborepo"]}
            >
              Lead engineer on the build pipeline team. Reduced average build times by
              42% across the platform and shipped incremental static regeneration for
              millions of sites. Mentored 5 junior engineers.
            </TimelineItem>
            <TimelineItem
              period="2019 — 2022"
              title="Full-Stack Engineer"
              subtitle="Stripe"
              location="Berlin"
              tags={["Ruby", "React", "GraphQL", "PostgreSQL"]}
            >
              Built developer-facing tooling for the Stripe Dashboard, including the
              API logs viewer used by 200k+ developers. Owned end-to-end the redesign
              of the webhook delivery system.
            </TimelineItem>
            <TimelineItem
              period="2017 — 2019"
              title="Software Engineer"
              subtitle="Shopify"
              location="Remote"
              tags={["Rails", "React", "MySQL"]}
            >
              Worked on merchant-facing analytics. Migrated a legacy reporting service
              to a real-time event-driven architecture serving 1M+ stores.
            </TimelineItem>
          </div>
        </section>

        {/* Education */}
        <section className="mb-24">
          <SectionHeader index="04" title="Education" command="education.yml" />
          <div>
            <TimelineItem
              period="2013 — 2017"
              title="B.Sc. Computer Science"
              subtitle="Technical University of Munich"
              location="Munich, Germany"
              tags={["Distributed Systems", "Algorithms", "Compilers"]}
            >
              Graduated with honors (1.3 GPA). Thesis on distributed consensus
              algorithms. Teaching assistant for Data Structures and Algorithms.
            </TimelineItem>
            <TimelineItem
              period="2020"
              title="AWS Certified Solutions Architect"
              subtitle="Amazon Web Services"
              tags={["AWS", "Cloud Architecture"]}
            >
              Professional-level certification covering scalable cloud architecture.
            </TimelineItem>
          </div>
        </section>

        {/* Projects */}
        <section className="mb-24">
          <SectionHeader index="05" title="Featured Projects" command="projects/*" />
          <div className="grid gap-5 md:grid-cols-2">
            <ProjectCard
              name="orbit-cli"
              description="A blazing-fast TypeScript monorepo task runner written in Rust. Drop-in replacement for turbo with smarter caching."
              stack={["Rust", "Node.js", "Tokio"]}
              stars={3400}
              repo="https://github.com"
            />
            <ProjectCard
              name="kanban-zero"
              description="Local-first project management app with end-to-end encryption and CRDT-based real-time sync."
              stack={["TypeScript", "Yjs", "IndexedDB"]}
              stars={1820}
              repo="https://github.com"
              link="https://example.com"
            />
            <ProjectCard
              name="prismatic"
              description="Open-source design system generator that produces React, Vue, and Svelte components from a single source."
              stack={["TypeScript", "AST", "Vite"]}
              stars={952}
              repo="https://github.com"
            />
            <ProjectCard
              name="lattice-db"
              description="Embedded SQL database for the browser. SQLite-compatible, persisted to OPFS, with full-text search."
              stack={["WASM", "C++", "TypeScript"]}
              stars={2100}
              repo="https://github.com"
              link="https://example.com"
            />
          </div>
        </section>

        {/* Hobbies */}
        <section className="mb-24">
          <SectionHeader index="06" title="When I'm Offline" command="hobbies/" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {[
              { icon: Mountain, label: "Mountain biking" },
              { icon: Coffee, label: "Specialty coffee" },
              { icon: Music, label: "Synthwave" },
              { icon: Code2, label: "Open source" },
              { icon: Gamepad2, label: "Indie games" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="group flex flex-col items-center gap-3 rounded-lg border border-border bg-gradient-card p-5 text-center transition-all hover:border-primary/50 hover:shadow-glow"
              >
                <Icon className="h-7 w-7 text-primary transition-transform group-hover:scale-110" />
                <span className="font-mono text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border pt-10">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="font-mono text-xs text-muted-foreground">
              <span className="text-primary">$</span> echo "Thanks for reading."
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              © {new Date().getFullYear()} Alex Morgan · Built with{" "}
              <span className="text-primary">React</span> &{" "}
              <span className="text-accent">Tailwind</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
