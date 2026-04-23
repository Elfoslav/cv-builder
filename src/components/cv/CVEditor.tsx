import { Dispatch, SetStateAction } from "react";
import { CVData, CVLabels, HOBBY_ICONS, defaultLabels, Experience, Education, Project, Hobby } from "@/lib/cv-types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Download, Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { SkillsSection } from "./SkillsSection";

interface CVEditorProps {
  data: CVData;
  setData: Dispatch<SetStateAction<CVData>>;
}

const uid = () => Math.random().toString(36).slice(2, 9);

type ListKey = "skills" | "experience" | "education" | "projects" | "hobbies";

export const CVEditor = ({ data, setData }: CVEditorProps) => {
  const update = <K extends keyof CVData>(key: K, value: CVData[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const patchItem = <K extends ListKey>(key: K, id: string, patch: Partial<CVData[K][number]>) =>
    setData((prev) => ({
      ...prev,
      [key]: (prev[key] as Array<{ id: string }>).map((item) =>
        item.id === id ? { ...item, ...patch } : item,
      ),
    }) as CVData);

  const removeItem = (key: ListKey, id: string) =>
    setData((prev) => ({
      ...prev,
      [key]: (prev[key] as Array<{ id: string }>).filter((item) => item.id !== id),
    }) as CVData);

  const appendItem = <K extends ListKey>(key: K, item: CVData[K][number]) =>
    setData((prev) => ({
      ...prev,
      [key]: [...(prev[key] as Array<unknown>), item],
    }) as CVData);

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.name.toLowerCase().replace(/\s+/g, "-") || "cv"}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Exported", description: "Your CV data was downloaded." });
  };

  const importJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as Partial<CVData>;
        setData((prev) => ({ ...prev, ...parsed }));
        toast({ title: "Imported", description: "CV data loaded successfully." });
      } catch {
        toast({ title: "Import failed", description: "Invalid JSON file.", variant: "destructive" });
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold text-foreground">Edit your CV</h2>
        <div className="flex gap-1">
          <Button size="sm" variant="ghost" onClick={exportJSON} title="Export JSON">
            <Download className="h-4 w-4" />
          </Button>
          <label className="inline-flex">
            <Button size="sm" variant="ghost" asChild title="Import JSON">
              <span className="cursor-pointer">
                <Upload className="h-4 w-4" />
              </span>
            </Button>
            <input type="file" accept="application/json" className="hidden" onChange={importJSON} />
          </label>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <Accordion type="multiple" defaultValue={["basics", "contact"]} className="space-y-2">
          <Section value="basics" title="Basics">
            <Field label="Name">
              <Input value={data.name} onChange={(e) => update("name", e.target.value)} maxLength={80} />
            </Field>
            <Field label="Role">
              <Input value={data.role} onChange={(e) => update("role", e.target.value)} maxLength={80} />
            </Field>
            <Field label="Short bio">
              <Textarea rows={4} value={data.bio} onChange={(e) => update("bio", e.target.value)} maxLength={400} />
            </Field>
            <Field label="About (use blank lines for paragraphs)">
              <Textarea rows={6} value={data.about} onChange={(e) => update("about", e.target.value)} maxLength={1500} />
            </Field>
          </Section>

          <Section value="contact" title="Contact & Social">
            <Field label="Email">
              <Input type="email" value={data.email} onChange={(e) => update("email", e.target.value)} maxLength={120} />
            </Field>
            <Field label="Phone">
              <Input value={data.phone} onChange={(e) => update("phone", e.target.value)} maxLength={40} />
            </Field>
            <Field label="Location">
              <Input value={data.location} onChange={(e) => update("location", e.target.value)} maxLength={80} />
            </Field>
            <Field label="GitHub URL">
              <Input value={data.github} onChange={(e) => update("github", e.target.value)} maxLength={200} />
            </Field>
            <Field label="LinkedIn URL">
              <Input value={data.linkedin} onChange={(e) => update("linkedin", e.target.value)} maxLength={200} />
            </Field>
          </Section>

          <Section value="skills" title={`Skills (${data.skills.length})`}>
            <SkillsSection data={data} setData={setData} />
          </Section>

          <Section value="experience" title={`Experience (${data.experience.length})`}>
            <div className="space-y-3">
              {data.experience.map((e) => (
                <ItemCard key={e.id} onDelete={() => removeItem("experience", e.id)}>
                  <Input placeholder="Period (e.g. 2022 — Present)" value={e.period}
                    onChange={(ev) => patchItem("experience", e.id, { period: ev.target.value })} maxLength={40} />
                  <Input placeholder="Job title" value={e.title}
                    onChange={(ev) => patchItem("experience", e.id, { title: ev.target.value })} maxLength={80} />
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Company" value={e.company}
                      onChange={(ev) => patchItem("experience", e.id, { company: ev.target.value })} maxLength={60} />
                    <Input placeholder="Location" value={e.location}
                      onChange={(ev) => patchItem("experience", e.id, { location: ev.target.value })} maxLength={60} />
                  </div>
                  <Textarea placeholder="Description" rows={3} value={e.description}
                    onChange={(ev) => patchItem("experience", e.id, { description: ev.target.value })} maxLength={600} />
                  <Input placeholder="Tags (comma-separated)" value={e.tags}
                    onChange={(ev) => patchItem("experience", e.id, { tags: ev.target.value })} maxLength={200} />
                </ItemCard>
              ))}
              <AddButton label="Add experience" onClick={() => appendItem("experience", {
                id: uid(), period: "2024 — Present", title: "New role", company: "Company", location: "", description: "", tags: "",
              } as Experience)} />
            </div>
          </Section>

          <Section value="education" title={`Education (${data.education.length})`}>
            <div className="space-y-3">
              {data.education.map((e) => (
                <ItemCard key={e.id} onDelete={() => removeItem("education", e.id)}>
                  <Input placeholder="Period" value={e.period}
                    onChange={(ev) => patchItem("education", e.id, { period: ev.target.value })} maxLength={40} />
                  <Input placeholder="Degree / Title" value={e.title}
                    onChange={(ev) => patchItem("education", e.id, { title: ev.target.value })} maxLength={100} />
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="School" value={e.school}
                      onChange={(ev) => patchItem("education", e.id, { school: ev.target.value })} maxLength={80} />
                    <Input placeholder="Location" value={e.location}
                      onChange={(ev) => patchItem("education", e.id, { location: ev.target.value })} maxLength={60} />
                  </div>
                  <Textarea placeholder="Description" rows={3} value={e.description}
                    onChange={(ev) => patchItem("education", e.id, { description: ev.target.value })} maxLength={500} />
                  <Input placeholder="Tags (comma-separated)" value={e.tags}
                    onChange={(ev) => patchItem("education", e.id, { tags: ev.target.value })} maxLength={200} />
                </ItemCard>
              ))}
              <AddButton label="Add education" onClick={() => appendItem("education", {
                id: uid(), period: "", title: "Degree", school: "School", location: "", description: "", tags: "",
              } as Education)} />
            </div>
          </Section>

          <Section value="projects" title={`Projects (${data.projects.length})`}>
            <div className="space-y-3">
              {data.projects.map((p) => (
                <ItemCard key={p.id} onDelete={() => removeItem("projects", p.id)}>
                  <Input placeholder="Project name" value={p.name}
                    onChange={(ev) => patchItem("projects", p.id, { name: ev.target.value })} maxLength={60} />
                  <Textarea placeholder="Description" rows={3} value={p.description}
                    onChange={(ev) => patchItem("projects", p.id, { description: ev.target.value })} maxLength={400} />
                  <Input placeholder="Tech stack (comma-separated)" value={p.stack}
                    onChange={(ev) => patchItem("projects", p.id, { stack: ev.target.value })} maxLength={200} />
                  <div className="grid grid-cols-3 gap-2">
                    <Input type="number" placeholder="Stars" value={p.stars ?? ""}
                      onChange={(ev) => patchItem("projects", p.id, { stars: ev.target.value ? Number(ev.target.value) : undefined })} />
                    <Input placeholder="Repo URL" value={p.repo ?? ""}
                      onChange={(ev) => patchItem("projects", p.id, { repo: ev.target.value })} maxLength={200} />
                    <Input placeholder="Live URL" value={p.link ?? ""}
                      onChange={(ev) => patchItem("projects", p.id, { link: ev.target.value })} maxLength={200} />
                  </div>
                </ItemCard>
              ))}
              <AddButton label="Add project" onClick={() => appendItem("projects", {
                id: uid(), name: "New project", description: "", stack: "",
              } as Project)} />
            </div>
          </Section>

          <Section value="hobbies" title={`Hobbies (${data.hobbies.length})`}>
            <div className="space-y-3">
              {data.hobbies.map((h) => (
                <div key={h.id} className="flex gap-2">
                  <Input
                    placeholder="Hobby"
                    value={h.label}
                    onChange={(e) => patchItem("hobbies", h.id, { label: e.target.value })}
                    maxLength={40}
                  />
                  <Select value={h.icon} onValueChange={(v) => patchItem("hobbies", h.id, { icon: v as Hobby["icon"] })}>
                    <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {HOBBY_ICONS.map((ic) => <SelectItem key={ic} value={ic}>{ic}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Button size="icon" variant="ghost" onClick={() => removeItem("hobbies", h.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
              {data.hobbies.map((h) => h)}
              <AddButton label="Add hobby" onClick={() => appendItem("hobbies", {
                id: uid(), label: "New hobby", icon: "Code2",
              } as Hobby)} />
            </div>
          </Section>

          <Section value="labels" title="Section labels (translations)">
            <p className="text-xs text-muted-foreground">
              Translate the section titles and subtitles for this language.
            </p>
            {(Object.keys(defaultLabels) as Array<keyof CVLabels>).map((k) => (
              <Field key={k} label={LABEL_FIELD_NAMES[k]}>
                <Input
                  value={data.labels?.[k] ?? defaultLabels[k]}
                  placeholder={defaultLabels[k]}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      labels: { ...(prev.labels ?? defaultLabels), [k]: e.target.value },
                    }))
                  }
                  maxLength={80}
                />
              </Field>
            ))}
          </Section>
        </Accordion>
      </div>
    </div>
  );
};

const LABEL_FIELD_NAMES: Record<keyof CVLabels, string> = {
  aboutTitle: "About — title",
  aboutSubtitle: "About — subtitle",
  skillsTitle: "Skills — title",
  skillsSubtitle: "Skills — subtitle",
  experienceTitle: "Experience — title",
  experienceSubtitle: "Experience — subtitle",
  educationTitle: "Education — title",
  educationSubtitle: "Education — subtitle",
  projectsTitle: "Projects — title",
  projectsSubtitle: "Projects — subtitle",
  hobbiesTitle: "Interests — title",
  hobbiesSubtitle: "Interests — subtitle",
  footerThanks: "Footer — thanks message",
};

const Section = ({ value, title, children }: { value: string; title: string; children: React.ReactNode }) => (
  <AccordionItem value={value} className="rounded border border-border bg-card px-3">
    <AccordionTrigger className="text-sm font-medium hover:no-underline">{title}</AccordionTrigger>
    <AccordionContent className="space-y-3 pt-2">{children}</AccordionContent>
  </AccordionItem>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
    {children}
  </div>
);

const ItemCard = ({ children, onDelete }: { children: React.ReactNode; onDelete: () => void }) => (
  <div className="relative space-y-2 rounded border border-border bg-secondary/20 p-3">
    <Button size="icon" variant="ghost" className="absolute right-1 top-1 z-10" onClick={onDelete}>
      <Trash2 className="h-4 w-4 text-destructive" />
    </Button>
    {children}
  </div>
);

const AddButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <Button variant="outline" size="sm" className="w-full gap-2 border-dashed" onClick={onClick}>
    <Plus className="h-4 w-4" /> {label}
  </Button>
);
