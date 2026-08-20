import { Dispatch, SetStateAction, useState } from "react";
import { CVData, Skill } from "@/lib/cv-types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Folder, Pencil, Check, X, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { LevelSelect } from "@/components/cv/LevelSelect";
import { toast } from "@/hooks/use-toast";

const uid = () => Math.random().toString(36).slice(2, 9);

interface Props {
  data: CVData;
  setData: Dispatch<SetStateAction<CVData>>;
}

/**
 * Skills editor — single hierarchy list.
 * Groups and their skills live in one tree: no separate group-manager box
 * and no duplicated group headings. Names rename inline, groups reorder,
 * and each skill is a compact row (name + proficiency + order + delete).
 */
export const SkillsSection = ({ data, setData }: Props) => {
  const [renaming, setRenaming] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  const addGroup = () => {
    const id = uid();
    let n = data.skillGroups.length + 1;
    const names = new Set(data.skillGroups.map((g) => g.name.toLowerCase()));
    while (names.has(`group ${n}`)) n += 1;
    setData((prev) => ({ ...prev, skillGroups: [...prev.skillGroups, { id, name: `Group ${n}` }] }));
  };

  const renameGroup = (id: string) => {
    const name = editingName.trim();
    if (!name) return;
    setData((prev) => ({
      ...prev,
      skillGroups: prev.skillGroups.map((g) => (g.id === id ? { ...g, name } : g)),
    }));
    setRenaming(null);
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
      {data.skillGroups.map((g, idx) => {
        const items = data.skills.filter((s) => s.group === g.id);
        const isEditing = renaming === g.id;
        return (
          <div key={g.id} className="rounded border border-border bg-secondary/20 p-2.5">
            <div className="flex items-center gap-1">
              {isEditing ? (
                <>
                  <Input
                    autoFocus
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") renameGroup(g.id);
                      if (e.key === "Escape") setRenaming(null);
                    }}
                    maxLength={40}
                    className="h-7 text-sm"
                  />
                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => renameGroup(g.id)}>
                    <Check className="h-3.5 w-3.5 text-primary" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setRenaming(null)}>
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </>
              ) : (
                <>
                  <Folder className="h-3.5 w-3.5 text-accent" />
                  <span className="flex-1 truncate text-sm font-medium">{g.name}</span>
                  <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                    {items.length}
                  </span>
                  <Button size="icon" variant="ghost" className="h-7 w-7" disabled={idx === 0} onClick={() => moveGroup(g.id, -1)}>
                    <ArrowUp className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-7 w-7" disabled={idx === data.skillGroups.length - 1} onClick={() => moveGroup(g.id, 1)}>
                    <ArrowDown className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => { setRenaming(g.id); setEditingName(g.name); }}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => deleteGroup(g.id)}>
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                </>
              )}
            </div>

            <div className="mt-2 space-y-1.5">
              {items.map((s, sIdx) => (
                <div key={s.id} className="flex items-center gap-1.5">
                  <Input
                    value={s.name}
                    onChange={(e) => patchSkill(s.id, { name: e.target.value })}
                    maxLength={40}
                    className="h-8 flex-1 text-sm"
                  />
                  <LevelSelect value={s.percentage} onChange={(pct) => patchSkill(s.id, { percentage: pct })} />
                  <Button size="icon" variant="ghost" className="h-8 w-7" disabled={sIdx === 0} onClick={() => moveSkill(s.id, -1)}>
                    <ArrowUp className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-7" disabled={sIdx === items.length - 1} onClick={() => moveSkill(s.id, 1)}>
                    <ArrowDown className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-7" onClick={() => removeSkill(s.id)}>
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>

            <Button
              variant="outline" size="sm"
              className="mt-2 h-7 w-full gap-1.5 border-dashed text-xs"
              onClick={() => addSkill(g.id)}
            >
              <Plus className="h-3.5 w-3.5" /> Add skill
            </Button>
          </div>
        );
      })}

      <Button variant="outline" size="sm" className="h-7 w-full gap-1.5 border-dashed text-xs" onClick={addGroup}>
        <Plus className="h-3.5 w-3.5" /> Add group
      </Button>
    </div>
  );
};