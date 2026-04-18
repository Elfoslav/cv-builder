import { Github, Linkedin, Mail, MapPin, Phone, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="grid-bg absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-glow" />
      <div className="container relative mx-auto px-6 py-20 md:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5">
            <span className="h-2 w-2 animate-blink rounded-full bg-primary" />
            <span className="font-mono text-xs text-primary">available_for_hire = true</span>
          </div>

          <div className="mb-2 font-mono text-sm text-muted-foreground">
            <span className="text-primary">const</span>{" "}
            <span className="text-accent">developer</span> ={" "}
            <span className="text-terminal-yellow">{"{"}</span>
          </div>

          <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-foreground md:text-7xl">
            Alex Morgan
            <span className="ml-1 inline-block h-12 w-1 animate-blink bg-primary md:h-16" />
          </h1>

          <p className="mb-2 font-mono text-lg text-accent md:text-xl">
            <span className="text-muted-foreground">role:</span> "Senior Full-Stack Engineer"
          </p>

          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            I build performant, accessible web applications with a focus on developer
            experience. Passionate about clean code, distributed systems, and shipping
            products that make a difference.
          </p>

          <div className="mt-2 font-mono text-sm text-muted-foreground">
            <span className="text-terminal-yellow">{"}"}</span>;
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" className="gap-2 bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90">
              <Download className="h-4 w-4" />
              Download CV
            </Button>
            <Button size="lg" variant="outline" className="gap-2 border-border" asChild>
              <a href="mailto:alex@morgan.dev">
                <Mail className="h-4 w-4" />
                Get in touch
              </a>
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
            <ContactItem icon={<Mail className="h-4 w-4" />} label="alex@morgan.dev" href="mailto:alex@morgan.dev" />
            <ContactItem icon={<Phone className="h-4 w-4" />} label="+1 (555) 234-7890" href="tel:+15552347890" />
            <ContactItem icon={<MapPin className="h-4 w-4" />} label="Berlin, Germany" />
            <div className="flex items-center gap-3">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-muted-foreground transition-colors hover:text-primary">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-muted-foreground transition-colors hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactItem = ({ icon, label, href }: { icon: React.ReactNode; label: string; href?: string }) => {
  const content = (
    <div className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary">
      <span className="text-primary">{icon}</span>
      <span className="truncate font-mono text-xs">{label}</span>
    </div>
  );
  return href ? <a href={href}>{content}</a> : content;
};
