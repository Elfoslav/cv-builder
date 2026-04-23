import { Dispatch, SetStateAction, useState } from "react";
import { CVData, Skill, SkillGroup } from "@/lib/cv-types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover";
import {
  Plus, Trash2, FolderPlus, Pencil, Check, X, ArrowUp, ArrowDown, Layers,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const uid = () => Math.random().toString(36).slice(2, 9);

interface Props {
  data: CVData;
  setData: Dispatch<SetStateAction<CVData>>;
}

export const SkillsSection = ({ data, setData }: Props) => {
  const [newGroupName, setNewGroupName] = useState("");
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  const addGroup = () => {
    const name = newGroupName.trim();
    if (!name) return;
    if (data.skillGroups.some((g) => g.name.toLowerCase() === name.toLowerCase())) {
      toast({ title: "Group exists", description: "A group with this name already exists.", variant: "destructive" });
      return;
    }
    const group: SkillGroup = { id: uid(), name };
    setData((prev) => ({ ...prev, skillGroups: [...prev.skillGroups, group] }));
    setNewGroupName("");
  };

  const renameGroup = (id: string) => {
    const name = editingName.trim();
    if (!name) return;
    setData((prev) => ({
      ...prev,
      skillGroups: prev.skillGroups.map((g) => (g.id === id ? { ...g, name } : g)),
    }));
    setEditingGroupId(null);
  };

  const moveGroup = (id: string, dir: -1 | 1) => {
    setData((prev) => {
      const idx = prev.skillGroups.findIndex((g) => g.id === id);
      const target = idx + dir;
      if (idx < 0 || target < 0 || target >= prev.skillGroups.length) return prev;
      const next = [...prev.skillGroups];
      [next[idx], next[target]] = [next[target], next[idx]];
      return { ...prev, skillGroups: next };
    });
  };

  const deleteGroup = (id: string) => {
    setData((prev) => {
      if (prev.skillGroups.length <= 1) {
        toast({ title: "Cannot delete", description: "Keep at least one group.", variant: "destructive" });
        return prev;
      }
      const remaining = prev.skillGroups.filter((g) => g.id !== id);
      const fallback = remaining[0].id;
      return {
        ...prev,
        skillGroups: remaining,
        skills: prev.skills.map((s) => (s.group === id ? { ...s, group: fallback } : s)),
      };
    });
  };

  const patchSkill = (id: string, patch: Partial<Skill>) =>
    setData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    }));

  const removeSkill = (id: string) =>
    setData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s.id !== id) }));

  const moveSkill = (id: string, dir: -1 | 1) => {
    setData((prev) => {
      const skill = prev.skills.find((s) => s.id === id);
      if (!skill) return prev;
      // Indices of skills within the same group, preserving overall array order
      const sameGroupIndices = prev.skills
        .map((s, i) => ({ s, i }))
        .filter(({ s }) => s.group === skill.group)
        .map(({ i }) => i);
      const posInGroup = sameGroupIndices.findIndex((i) => prev.skills[i].id === id);
      const targetPos = posInGroup + dir;
      if (posInGroup < 0 || targetPos < 0 || targetPos >= sameGroupIndices.length) return prev;
      const fromIdx = sameGroupIndices[posInGroup];
      const toIdx = sameGroupIndices[targetPos];
      const next = [...prev.skills];
      [next[fromIdx], next[toIdx]] = [next[toIdx], next[fromIdx]];
      return { ...prev, skills: next };
    });
  };

  const addSkill = (groupId: string) =>
    setData((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        { id: uid(), name: "New skill", percentage: 50, color: "green", group: groupId } as Skill,
      ],
    }));

  return (
    <div className="space-y-4">
      {/* Group manager */}
      <div className="rounded border border-border bg-secondary/30 p-3">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Layers className="h-3.5 w-3.5" />
            Skill groups
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button size="sm" variant="ghost" className="h-7 gap-1 text-xs">
                <FolderPlus className="h-3.5 w-3.5" /> New group
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-64 space-y-2">
              <Label className="text-xs">Group name</Label>
              <Input
                autoFocus
                placeholder="e.g. Design tools"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") addGroup(); }}
                maxLength={40}
              />
              <Button size="sm" className="w-full" onClick={addGroup}>Create</Button>
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-1.5">
          {data.skillGroups.map((g, idx) => {
            const count = data.skills.filter((s) => s.group === g.id).length;
            const isEditing = editingGroupId === g.id;
            return (
              <div key={g.id} className="flex items-center gap-1 rounded bg-card px-2 py-1">
                {isEditing ? (
                  <>
                    <Input
                      autoFocus
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") renameGroup(g.id);
                        if (e.key === "Escape") setEditingGroupId(null);
                      }}
                      maxLength={40}
                      className="h-7 text-sm"
                    />
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => renameGroup(g.id)}>
                      <Check className="h-3.5 w-3.5 text-primary" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setEditingGroupId(null)}>
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </>
                ) : (
                  <>
                    <span className="flex-1 truncate text-sm">{g.name}</span>
                    <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                      {count}
                    </span>
                    <Button size="icon" variant="ghost" className="h-7 w-7" disabled={idx === 0} onClick={() => moveGroup(g.id, -1)}>
                      <ArrowUp className="h-3.5 w-3.5" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7" disabled={idx === data.skillGroups.length - 1} onClick={() => moveGroup(g.id, 1)}>
                      <ArrowDown className="h-3.5 w-3.5" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => { setEditingGroupId(g.id); setEditingName(g.name); }}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => deleteGroup(g.id)}>
                      <Trash2 className="h-3.5 w-3.5 text-destructive" />
                    </Button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Skills grouped by group */}
      {data.skillGroups.map((g) => {
        const items = data.skills.filter((s) => s.group === g.id);
        return (
          <div key={g.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-accent">{g.name}</h4>
              <Button size="sm" variant="ghost" className="h-7 gap-1 text-xs" onClick={() => addSkill(g.id)}>
                <Plus className="h-3.5 w-3.5" /> Add
              </Button>
            </div>
            {items.length === 0 ? (
              <p className="rounded border border-dashed border-border px-3 py-2 text-xs text-muted-foreground">
                No skills yet.
              </p>
            ) : (
              items.map((s) => (
                <div key={s.id} className="space-y-2 rounded border border-border bg-secondary/20 p-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Skill name"
                      value={s.name}
                      onChange={(e) => patchSkill(s.id, { name: e.target.value })}
                      maxLength={40}
                    />
                    <Button size="icon" variant="ghost" onClick={() => removeSkill(s.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <Select value={s.group} onValueChange={(v) => patchSkill(s.id, { group: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {data.skillGroups.map((gr) => (
                        <SelectItem key={gr.id} value={gr.id}>{gr.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div>
                    <div className="mb-1 flex justify-between font-mono text-xs text-muted-foreground">
                      <span>Experience</span>
                      <span>{s.percentage}%</span>
                    </div>
                    <Slider
                      min={0} max={100} step={5}
                      value={[s.percentage]}
                      onValueChange={([v]) => patchSkill(s.id, { percentage: v })}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        );
      })}
    </div>
  );
};
