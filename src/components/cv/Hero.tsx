import { Github, Linkedin, Mail, MapPin, Phone, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CVData } from "@/lib/cv-types";

interface HeroProps {
  data: CVData;
  onDownload?: () => void;
}

export const Hero = ({ data, onDownload }: HeroProps) => {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="grid-bg absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-glow" />
      <div className="container relative mx-auto px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          {data.available && (
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5">
              <span className="h-2 w-2 animate-blink rounded-full bg-primary" />
              <span className="text-xs font-medium text-primary">Available for new opportunities</span>
            </div>
          )}

          <h1 className="mb-3 text-5xl font-extrabold tracking-tight text-foreground md:text-7xl">
            {data.name || "Your Name"}
          </h1>

          <p className="mb-5 text-xl font-medium text-accent md:text-2xl">
            {data.role}
          </p>

          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {data.bio}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={onDownload}
              className="gap-2 bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-90"
            >
              <Download className="h-4 w-4" />
              Download CV
            </Button>
            {data.email && (
              <Button size="lg" variant="outline" className="gap-2 border-border" asChild>
                <a href={`mailto:${data.email}`}>
                  <Mail className="h-4 w-4" />
                  Get in touch
                </a>
              </Button>
            )}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
            {data.email && (
              <ContactItem icon={<Mail className="h-4 w-4" />} label={data.email} href={`mailto:${data.email}`} />
            )}
            {data.phone && (
              <ContactItem icon={<Phone className="h-4 w-4" />} label={data.phone} href={`tel:${data.phone}`} />
            )}
            {data.location && (
              <ContactItem icon={<MapPin className="h-4 w-4" />} label={data.location} />
            )}
            <div className="flex items-center gap-3">
              {data.github && (
                <a href={data.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-muted-foreground transition-colors hover:text-primary">
                  <Github className="h-5 w-5" />
                </a>
              )}
              {data.linkedin && (
                <a href={data.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-muted-foreground transition-colors hover:text-primary">
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
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
      <span className="truncate text-sm">{label}</span>
    </div>
  );
  return href ? <a href={href}>{content}</a> : content;
};
