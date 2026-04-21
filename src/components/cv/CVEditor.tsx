import { Dispatch, SetStateAction } from "react";
import { CVData, HOBBY_ICONS, Skill, Experience, Education, Project, Hobby } from "@/lib/cv-types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, RotateCcw, Download, Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CVEditorProps {
  data: CVData;
  setData: Dispatch<SetStateAction<CVData>>;
  reset: () => void;
}

const uid = () => Math.random().toString(36).slice(2, 9);

type ListKey = "skills" | "experience" | "education" | "projects" | "hobbies";

export const CVEditor = ({ data, setData, reset }: CVEditorProps) => {
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
          <Button size="sm" variant="ghost" onClick={() => { reset(); toast({ title: "Reset", description: "Data restored to default." }); }} title="Reset">
            <RotateCcw className="h-4 w-4" />
          </Button>
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
            <div className="flex items-center justify-between rounded border border-border bg-secondary/30 px-3 py-2">
              <Label className="font-mono text-xs">Available for hire</Label>
              <Switch checked={data.available} onCheckedChange={(v) => update("available", v)} />
            </div>
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
            <p className="text-xs text-muted-foreground">Use "Languages" for programming languages and "Frameworks &amp; Tools" for everything else.</p>
            <div className="space-y-3">
              {data.skills.map((s, i) => (
                <div key={s.id} className="space-y-2 rounded border border-border bg-secondary/20 p-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Skill name"
                      value={s.name}
                      onChange={(e) => {
                        const next = [...data.skills];
                        next[i] = { ...s, name: e.target.value };
                        update("skills", next);
                      }}
                      maxLength={40}
                    />
                    <Button size="icon" variant="ghost" onClick={() => update("skills", data.skills.filter((x) => x.id !== s.id))}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <div>
                    <Select value={s.group} onValueChange={(v) => {
                      const next = [...data.skills];
                      next[i] = { ...s, group: v as Skill["group"] };
                      update("skills", next);
                    }}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="languages">Languages</SelectItem>
                        <SelectItem value="frameworks">Frameworks & Tools</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between font-mono text-xs text-muted-foreground">
                      <span>Experience</span>
                      <span>{s.percentage}%</span>
                    </div>
                    <Slider
                      min={0} max={100} step={5}
                      value={[s.percentage]}
                      onValueChange={([v]) => {
                        const next = [...data.skills];
                        next[i] = { ...s, percentage: v };
                        update("skills", next);
                      }}
                    />
                  </div>
                </div>
              ))}
              <AddButton label="Add skill" onClick={() => update("skills", [...data.skills, {
                id: uid(), name: "New skill", percentage: 50, color: "green", group: "languages",
              } as Skill])} />
            </div>
          </Section>

          <Section value="experience" title={`Experience (${data.experience.length})`}>
            <div className="space-y-3">
              {data.experience.map((e, i) => (
                <ItemCard key={e.id} onDelete={() => update("experience", data.experience.filter((x) => x.id !== e.id))}>
                  <Input placeholder="Period (e.g. 2022 — Present)" value={e.period}
                    onChange={(ev) => { const n = [...data.experience]; n[i] = { ...e, period: ev.target.value }; update("experience", n); }} maxLength={40} />
                  <Input placeholder="Job title" value={e.title}
                    onChange={(ev) => { const n = [...data.experience]; n[i] = { ...e, title: ev.target.value }; update("experience", n); }} maxLength={80} />
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Company" value={e.company}
                      onChange={(ev) => { const n = [...data.experience]; n[i] = { ...e, company: ev.target.value }; update("experience", n); }} maxLength={60} />
                    <Input placeholder="Location" value={e.location}
                      onChange={(ev) => { const n = [...data.experience]; n[i] = { ...e, location: ev.target.value }; update("experience", n); }} maxLength={60} />
                  </div>
                  <Textarea placeholder="Description" rows={3} value={e.description}
                    onChange={(ev) => { const n = [...data.experience]; n[i] = { ...e, description: ev.target.value }; update("experience", n); }} maxLength={600} />
                  <Input placeholder="Tags (comma-separated)" value={e.tags}
                    onChange={(ev) => { const n = [...data.experience]; n[i] = { ...e, tags: ev.target.value }; update("experience", n); }} maxLength={200} />
                </ItemCard>
              ))}
              <AddButton label="Add experience" onClick={() => update("experience", [...data.experience, {
                id: uid(), period: "2024 — Present", title: "New role", company: "Company", location: "", description: "", tags: "",
              } as Experience])} />
            </div>
          </Section>

          <Section value="education" title={`Education (${data.education.length})`}>
            <div className="space-y-3">
              {data.education.map((e, i) => (
                <ItemCard key={e.id} onDelete={() => update("education", data.education.filter((x) => x.id !== e.id))}>
                  <Input placeholder="Period" value={e.period}
                    onChange={(ev) => { const n = [...data.education]; n[i] = { ...e, period: ev.target.value }; update("education", n); }} maxLength={40} />
                  <Input placeholder="Degree / Title" value={e.title}
                    onChange={(ev) => { const n = [...data.education]; n[i] = { ...e, title: ev.target.value }; update("education", n); }} maxLength={100} />
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="School" value={e.school}
                      onChange={(ev) => { const n = [...data.education]; n[i] = { ...e, school: ev.target.value }; update("education", n); }} maxLength={80} />
                    <Input placeholder="Location" value={e.location}
                      onChange={(ev) => { const n = [...data.education]; n[i] = { ...e, location: ev.target.value }; update("education", n); }} maxLength={60} />
                  </div>
                  <Textarea placeholder="Description" rows={3} value={e.description}
                    onChange={(ev) => { const n = [...data.education]; n[i] = { ...e, description: ev.target.value }; update("education", n); }} maxLength={500} />
                  <Input placeholder="Tags (comma-separated)" value={e.tags}
                    onChange={(ev) => { const n = [...data.education]; n[i] = { ...e, tags: ev.target.value }; update("education", n); }} maxLength={200} />
                </ItemCard>
              ))}
              <AddButton label="Add education" onClick={() => update("education", [...data.education, {
                id: uid(), period: "", title: "Degree", school: "School", location: "", description: "", tags: "",
              } as Education])} />
            </div>
          </Section>

          <Section value="projects" title={`Projects (${data.projects.length})`}>
            <div className="space-y-3">
              {data.projects.map((p, i) => (
                <ItemCard key={p.id} onDelete={() => update("projects", data.projects.filter((x) => x.id !== p.id))}>
                  <Input placeholder="Project name" value={p.name}
                    onChange={(ev) => { const n = [...data.projects]; n[i] = { ...p, name: ev.target.value }; update("projects", n); }} maxLength={60} />
                  <Textarea placeholder="Description" rows={3} value={p.description}
                    onChange={(ev) => { const n = [...data.projects]; n[i] = { ...p, description: ev.target.value }; update("projects", n); }} maxLength={400} />
                  <Input placeholder="Tech stack (comma-separated)" value={p.stack}
                    onChange={(ev) => { const n = [...data.projects]; n[i] = { ...p, stack: ev.target.value }; update("projects", n); }} maxLength={200} />
                  <div className="grid grid-cols-3 gap-2">
                    <Input type="number" placeholder="Stars" value={p.stars ?? ""}
                      onChange={(ev) => { const n = [...data.projects]; n[i] = { ...p, stars: ev.target.value ? Number(ev.target.value) : undefined }; update("projects", n); }} />
                    <Input placeholder="Repo URL" value={p.repo ?? ""}
                      onChange={(ev) => { const n = [...data.projects]; n[i] = { ...p, repo: ev.target.value }; update("projects", n); }} maxLength={200} />
                    <Input placeholder="Live URL" value={p.link ?? ""}
                      onChange={(ev) => { const n = [...data.projects]; n[i] = { ...p, link: ev.target.value }; update("projects", n); }} maxLength={200} />
                  </div>
                </ItemCard>
              ))}
              <AddButton label="Add project" onClick={() => update("projects", [...data.projects, {
                id: uid(), name: "New project", description: "", stack: "",
              } as Project])} />
            </div>
          </Section>

          <Section value="hobbies" title={`Hobbies (${data.hobbies.length})`}>
            <div className="space-y-3">
              {data.hobbies.map((h, i) => (
                <div key={h.id} className="flex gap-2">
                  <Input
                    placeholder="Hobby"
                    value={h.label}
                    onChange={(e) => { const n = [...data.hobbies]; n[i] = { ...h, label: e.target.value }; update("hobbies", n); }}
                    maxLength={40}
                  />
                  <Select value={h.icon} onValueChange={(v) => { const n = [...data.hobbies]; n[i] = { ...h, icon: v as Hobby["icon"] }; update("hobbies", n); }}>
                    <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {HOBBY_ICONS.map((ic) => <SelectItem key={ic} value={ic}>{ic}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Button size="icon" variant="ghost" onClick={() => update("hobbies", data.hobbies.filter((x) => x.id !== h.id))}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
              <AddButton label="Add hobby" onClick={() => update("hobbies", [...data.hobbies, {
                id: uid(), label: "New hobby", icon: "Code2",
              } as Hobby])} />
            </div>
          </Section>
        </Accordion>
      </div>
    </div>
  );
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
