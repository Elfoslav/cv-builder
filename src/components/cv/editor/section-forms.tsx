import { type ReactNode } from "react";
import {
  CVData, CVLabels, Hobby, Experience, Education, Project,
} from "@/lib/cv-types";
import { CVActions, SectionKey, blankItem } from "./use-cv-actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { InterestIconPicker } from "./InterestIconPicker";
import { SkillsSection } from "@/components/cv/SkillsSection";
import {
  Plus, Trash2, ArrowUp, ArrowDown,
} from "lucide-react";

const LABEL_KEYS: Partial<Record<SectionKey, { title: keyof CVLabels; subtitle: keyof CVLabels }>> = {
  about: { title: "aboutTitle", subtitle: "aboutSubtitle" },
  skills: { title: "skillsTitle", subtitle: "skillsSubtitle" },
  experience: { title: "experienceTitle", subtitle: "experienceSubtitle" },
  education: { title: "educationTitle", subtitle: "educationSubtitle" },
  projects: { title: "projectsTitle", subtitle: "projectsSubtitle" },
  hobbies: { title: "hobbiesTitle", subtitle: "hobbiesSubtitle" },
};

export const buildForm = (key: SectionKey, data: CVData, actions: CVActions, itemId?: string, onItemDeleted?: () => void): ReactNode => {
  switch (key) {
    case "hero":
      return <HeroForm data={data} actions={actions} />;
    case "about":
      return <AboutForm data={data} actions={actions} />;
    case "skills":
      return <SkillsForm data={data} actions={actions} />;
    case "experience":
      return <ExperienceForm data={data} actions={actions} itemId={itemId} onItemDeleted={onItemDeleted} />;
    case "education":
      return <EducationForm data={data} actions={actions} itemId={itemId} onItemDeleted={onItemDeleted} />;
    case "projects":
      return <ProjectsForm data={data} actions={actions} />;
    case "hobbies":
      return <HobbiesForm data={data} actions={actions} />;
    case "footer":
      return <FooterForm data={data} actions={actions} />;
  }
};

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="space-y-1">
    <Label className="text-[11px] font-medium text-muted-foreground">{label}</Label>
    {children}
  </div>
);

const SectionTitleFields = ({
  data, actions, titleKey, subtitleKey,
}: {
  data: CVData;
  actions: CVActions;
  titleKey: keyof CVLabels;
  subtitleKey: keyof CVLabels;
}) => (
  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
    <Field label="Section title">
      <Input
        value={data.labels[titleKey]}
        onChange={(e) => actions.setLabel(titleKey, e.target.value)}
        maxLength={80}
      />
    </Field>
    <Field label="Subtitle">
      <Input
        value={data.labels[subtitleKey]}
        onChange={(e) => actions.setLabel(subtitleKey, e.target.value)}
        maxLength={80}
      />
    </Field>
  </div>
);

export const AddButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <Button variant="outline" size="sm" className="w-full gap-1.5 border-dashed" onClick={onClick}>
    <Plus className="h-3.5 w-3.5" /> {label}
  </Button>
);

const ItemShell = ({
  title, onDelete, onMoveUp, onMoveDown, children,
}: {
  title: string;
  onDelete: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  children: ReactNode;
}) => (
  <div className="rounded-lg border border-border bg-secondary/20 p-3">
    <div className="mb-2 flex items-center justify-between gap-2">
      <span className="truncate text-xs font-semibold text-foreground">{title}</span>
      <div className="flex shrink-0 gap-0.5">
        {onMoveUp && (
          <Button size="icon-sm" variant="ghost" onClick={onMoveUp} title="Move up">
            <ArrowUp className="h-3.5 w-3.5" />
          </Button>
        )}
        {onMoveDown && (
          <Button size="icon-sm" variant="ghost" onClick={onMoveDown} title="Move down">
            <ArrowDown className="h-3.5 w-3.5" />
          </Button>
        )}
        <Button size="icon-sm" variant="ghost" className="text-destructive" onClick={onDelete} title="Delete">
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
    <div className="space-y-2">{children}</div>
  </div>
);

const HeroForm = ({ data, actions }: { data: CVData; actions: CVActions }) => (
  <div className="space-y-3">
    <Field label="Name">
      <Input value={data.name} onChange={(e) => actions.update("name", e.target.value)} maxLength={80} />
    </Field>
    <Field label="Role">
      <Input value={data.role} onChange={(e) => actions.update("role", e.target.value)} maxLength={80} />
    </Field>
    <Field label="Short bio">
      <Textarea rows={3} value={data.bio} onChange={(e) => actions.update("bio", e.target.value)} maxLength={400} />
    </Field>
    <div className="h-px bg-border" />
    <Field label="Email">
      <Input type="email" value={data.email} onChange={(e) => actions.update("email", e.target.value)} maxLength={120} />
    </Field>
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      <Field label="Phone">
        <Input value={data.phone} onChange={(e) => actions.update("phone", e.target.value)} maxLength={40} />
      </Field>
      <Field label="Location">
        <Input value={data.location} onChange={(e) => actions.update("location", e.target.value)} maxLength={80} />
      </Field>
    </div>
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      <Field label="GitHub URL">
        <Input value={data.github} onChange={(e) => actions.update("github", e.target.value)} maxLength={200} />
      </Field>
      <Field label="LinkedIn URL">
        <Input value={data.linkedin} onChange={(e) => actions.update("linkedin", e.target.value)} maxLength={200} />
      </Field>
    </div>
  </div>
);

const AboutForm = ({ data, actions }: { data: CVData; actions: CVActions }) => (
  <div className="space-y-3">
    <SectionTitleFields data={data} actions={actions} titleKey="aboutTitle" subtitleKey="aboutSubtitle" />
    <Field label="About (use blank lines for paragraphs)">
      <Textarea rows={6} value={data.about} onChange={(e) => actions.update("about", e.target.value)} maxLength={1500} />
    </Field>
  </div>
);

const ExperienceForm = ({ data, actions, itemId, onItemDeleted }: { data: CVData; actions: CVActions; itemId?: string; onItemDeleted?: () => void }) => (
  <div className="space-y-3">
    {!itemId && <SectionTitleFields data={data} actions={actions} titleKey="experienceTitle" subtitleKey="experienceSubtitle" />}
    {!itemId && <p className="text-[11px] text-muted-foreground">
      {data.experience.length} {data.experience.length === 1 ? "entry" : "entries"}
    </p>}
    <div className="space-y-2">
      {data.experience.map((e, idx) => (!itemId || itemId === e.id) && (
        <ItemShell
          key={e.id}
          title={e.title || "Untitled role"}
          onDelete={() => { actions.removeItem("experience", e.id); if (itemId) onItemDeleted?.(); }}
          onMoveUp={idx > 0 ? () => actions.moveItem("experience", e.id, -1) : undefined}
          onMoveDown={idx < data.experience.length - 1 ? () => actions.moveItem("experience", e.id, 1) : undefined}
        >
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Input placeholder="Period" value={e.period} onChange={(ev) => actions.patchItem("experience", e.id, { period: ev.target.value })} maxLength={40} />
            <Input placeholder="Location" value={e.location} onChange={(ev) => actions.patchItem("experience", e.id, { location: ev.target.value })} maxLength={60} />
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Input placeholder="Job title" value={e.title} onChange={(ev) => actions.patchItem("experience", e.id, { title: ev.target.value })} maxLength={80} />
            <Input placeholder="Company" value={e.company} onChange={(ev) => actions.patchItem("experience", e.id, { company: ev.target.value })} maxLength={60} />
          </div>
          <Textarea placeholder="Description" rows={2} value={e.description} onChange={(ev) => actions.patchItem("experience", e.id, { description: ev.target.value })} maxLength={600} />
          <Input placeholder="Tags (comma-separated)" value={e.tags} onChange={(ev) => actions.patchItem("experience", e.id, { tags: ev.target.value })} maxLength={200} />
        </ItemShell>
      ))}
      {!itemId && <AddButton label="Add experience" onClick={() => actions.appendItem("experience", blankItem("experience") as Experience)} />}
    </div>
  </div>
);

const EducationForm = ({ data, actions, itemId, onItemDeleted }: { data: CVData; actions: CVActions; itemId?: string; onItemDeleted?: () => void }) => (
  <div className="space-y-3">
    {!itemId && <SectionTitleFields data={data} actions={actions} titleKey="educationTitle" subtitleKey="educationSubtitle" />}
    {!itemId && <p className="text-[11px] text-muted-foreground">
      {data.education.length} {data.education.length === 1 ? "entry" : "entries"}
    </p>}
    <div className="space-y-2">
      {data.education.map((e, idx) => (!itemId || itemId === e.id) && (
        <ItemShell
          key={e.id}
          title={e.title || "Untitled degree"}
          onDelete={() => { actions.removeItem("education", e.id); if (itemId) onItemDeleted?.(); }}
          onMoveUp={idx > 0 ? () => actions.moveItem("education", e.id, -1) : undefined}
          onMoveDown={idx < data.education.length - 1 ? () => actions.moveItem("education", e.id, 1) : undefined}
        >
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Input placeholder="Period" value={e.period} onChange={(ev) => actions.patchItem("education", e.id, { period: ev.target.value })} maxLength={40} />
            <Input placeholder="Location" value={e.location} onChange={(ev) => actions.patchItem("education", e.id, { location: ev.target.value })} maxLength={60} />
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Input placeholder="Degree / Title" value={e.title} onChange={(ev) => actions.patchItem("education", e.id, { title: ev.target.value })} maxLength={100} />
            <Input placeholder="School" value={e.school} onChange={(ev) => actions.patchItem("education", e.id, { school: ev.target.value })} maxLength={80} />
          </div>
          <Textarea placeholder="Description" rows={2} value={e.description} onChange={(ev) => actions.patchItem("education", e.id, { description: ev.target.value })} maxLength={500} />
          <Input placeholder="Tags (comma-separated)" value={e.tags} onChange={(ev) => actions.patchItem("education", e.id, { tags: ev.target.value })} maxLength={200} />
        </ItemShell>
      ))}
      {!itemId && <AddButton label="Add education" onClick={() => actions.appendItem("education", blankItem("education") as Education)} />}
    </div>
  </div>
);

const ProjectsForm = ({ data, actions }: { data: CVData; actions: CVActions }) => (
  <div className="space-y-3">
    <SectionTitleFields data={data} actions={actions} titleKey="projectsTitle" subtitleKey="projectsSubtitle" />
    <p className="text-[11px] text-muted-foreground">
      {data.projects.length} {data.projects.length === 1 ? "project" : "projects"}
    </p>
    <div className="space-y-2">
      {data.projects.map((p, idx) => (
        <ItemShell
          key={p.id}
          title={p.name || "Untitled project"}
          onDelete={() => actions.removeItem("projects", p.id)}
          onMoveUp={idx > 0 ? () => actions.moveItem("projects", p.id, -1) : undefined}
          onMoveDown={idx < data.projects.length - 1 ? () => actions.moveItem("projects", p.id, 1) : undefined}
        >
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Input placeholder="Project name" value={p.name} onChange={(ev) => actions.patchItem("projects", p.id, { name: ev.target.value })} maxLength={60} />
            <Input placeholder="Period" value={p.period ?? ""} onChange={(ev) => actions.patchItem("projects", p.id, { period: ev.target.value })} maxLength={40} />
          </div>
          <Textarea placeholder="Description" rows={2} value={p.description} onChange={(ev) => actions.patchItem("projects", p.id, { description: ev.target.value })} maxLength={400} />
          <Input placeholder="Tech stack (comma-separated)" value={p.stack} onChange={(ev) => actions.patchItem("projects", p.id, { stack: ev.target.value })} maxLength={200} />
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <Input
              type="number" placeholder="Stars" value={p.stars ?? ""}
              onChange={(ev) => actions.patchItem("projects", p.id, { stars: ev.target.value ? Number(ev.target.value) : undefined })}
            />
            <Input placeholder="Repo URL" value={p.repo ?? ""} onChange={(ev) => actions.patchItem("projects", p.id, { repo: ev.target.value })} maxLength={200} />
            <Input placeholder="Live URL" value={p.link ?? ""} onChange={(ev) => actions.patchItem("projects", p.id, { link: ev.target.value })} maxLength={200} />
          </div>
        </ItemShell>
      ))}
      <AddButton label="Add project" onClick={() => actions.appendItem("projects", blankItem("projects") as Project)} />
    </div>
  </div>
);

const HobbiesForm = ({ data, actions }: { data: CVData; actions: CVActions }) => (
  <div className="space-y-3">
    <SectionTitleFields data={data} actions={actions} titleKey="hobbiesTitle" subtitleKey="hobbiesSubtitle" />
    <div className="space-y-2">
      {data.hobbies.map((hb, idx) => (
        <ItemShell
          key={hb.id}
          title={hb.label || "Untitled hobby"}
          onDelete={() => actions.removeItem("hobbies", hb.id)}
          onMoveUp={idx > 0 ? () => actions.moveItem("hobbies", hb.id, -1) : undefined}
          onMoveDown={idx < data.hobbies.length - 1 ? () => actions.moveItem("hobbies", hb.id, 1) : undefined}
        >
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              placeholder="Hobby" value={hb.label}
              onChange={(e) => actions.patchItem("hobbies", hb.id, { label: e.target.value })}
              maxLength={40}
            />
            <InterestIconPicker
              value={hb.icon}
              label={hb.label}
              onChange={(icon) => actions.patchItem("hobbies", hb.id, { icon })}
            />
          </div>
        </ItemShell>
      ))}
      <AddButton label="Add hobby" onClick={() => actions.appendItem("hobbies", blankItem("hobbies") as Hobby)} />
    </div>
  </div>
);

const SkillsForm = ({ data, actions }: { data: CVData; actions: CVActions }) => (
  <div className="space-y-3">
    <SectionTitleFields data={data} actions={actions} titleKey="skillsTitle" subtitleKey="skillsSubtitle" />
    <SkillsSection data={data} setData={actions.setData} />
  </div>
);

const FooterForm = ({ data, actions }: { data: CVData; actions: CVActions }) => (
  <div className="space-y-3">
    <Field label="Footer — thanks message">
      <Input
        value={data.labels.footerThanks}
        onChange={(e) => actions.setLabel("footerThanks", e.target.value)}
        maxLength={120}
      />
    </Field>
    <Field label="Footer — copyright line">
      <Input
        value={data.labels.footerCopyright}
        onChange={(e) => actions.setLabel("footerCopyright", e.target.value)}
        placeholder={`© ${new Date().getFullYear()} ${data.name}`}
        maxLength={120}
      />
    </Field>
  </div>
);
