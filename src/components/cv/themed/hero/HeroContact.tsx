import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { type ReactNode } from "react";
import { type CVData } from "@/lib/cv-types";

const ContactItem = ({
  icon,
  label,
  href,
}: {
  icon: ReactNode;
  label: string;
  href?: string;
}) => {
  const content = (
    <div className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary">
      <span className="text-primary">{icon}</span>
      <span className="truncate text-sm">{label}</span>
    </div>
  );
  return href ? <a href={href}>{content}</a> : content;
};

/**
 * Contact details + social links for the hero. The parent controls the
 * wrapper layout (row, grid, or stacked column).
 */
export const HeroContact = ({ data, className }: { data: CVData; className?: string }) => (
  <div className={className}>
    {data.email && (
      <ContactItem icon={<Mail className="h-4 w-4" />} label={data.email} href={`mailto:${data.email}`} />
    )}
    {data.phone && (
      <ContactItem icon={<Phone className="h-4 w-4" />} label={data.phone} href={`tel:${data.phone}`} />
    )}
    {data.location && <ContactItem icon={<MapPin className="h-4 w-4" />} label={data.location} />}
    {(data.github || data.linkedin) && (
      <div className="flex items-center gap-3">
        {data.github && (
          <a
            href={data.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Github className="h-5 w-5" />
          </a>
        )}
        {data.linkedin && (
          <a
            href={data.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        )}
      </div>
    )}
  </div>
);