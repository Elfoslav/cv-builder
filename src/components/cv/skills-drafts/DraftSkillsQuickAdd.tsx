import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus, FolderPlus, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { percentageToLevel } from "@/lib/skill-levels";
import { useSkillsDraft } from "./useSkillsDraft";
import { LevelSelect } from "@/components/cv/LevelSelect";

const dotColor = (pct: number) => {
  const l = percentageToLevel(pct);
  if (l === "Expert") return "bg-skill-high";
  if (l === "Advanced") return "bg-skill-mid";
  if (l === "Proficient") return "bg-primary/70";
  if (l === "Intermediate") return "bg-skill-low/80";
  return "bg-skill-low";
};

/**
 * Draft D — quick-add composer.
 * Type a skill name and press Enter (or type a comma) and it is added
 * immediately as a chip. Skills read as tags rather than inputs, which
 * keeps a long list visually short. The proficiency select above sets the
 * level for newly added skills; existing chips can be deleted with one click.
 */
export const DraftSkillsQuickAdd = () => {
  const m = useSkillsDraft();
  const [groupName, setGroupName] = useState("");
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [newLevel, setNewLevel] = useState(80);

  const commit = (groupId: string) => {
    const value = (draft[groupId] ?? "").trim();
    if (!value) return;
    m.addSkill(groupId, value, newLevel);
    setDraft((d) => ({ ...d, [groupId]: "" }));
  };

  return (
    <div className="max-w-md rounded-lg border border-border bg-background p-4 shadow-sm">
      <div className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        Section — Skills
      </div>

      <div className="mb-3 flex items-center gap-2">
        <Input
          placeholder="New group name…"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") { m.addGroup(groupName); setGroupName(""); }
          }}
          className="h-8 flex-1 text-sm"
        />
        <Button size="sm" variant="outline" className="h-8 gap-1 text-xs" onClick={() => { m.addGroup(groupName); setGroupName(""); }}>
          <FolderPlus className="h-3.5 w-3.5" /> Add group
        </Button>
      </div>

      <div className="space-y-4">
        {m.groups.map((g, idx) => {
          const items = m.skillsIn(g.id);
          const value = draft[g.id] ?? "";
          return (
            <div key={g.id} className="rounded border border-border bg-secondary/20 p-3">
              <div className="mb-1 flex items-center gap-1">
                <span className="flex-1 truncate text-xs font-semibold uppercase tracking-wider text-accent">{g.name}</span>
                <span className="font-mono text-[10px] text-muted-foreground">{items.length}</span>
                <Button size="icon" variant="ghost" className="h-6 w-6" disabled={idx === 0} onClick={() => m.moveGroup(g.id, -1)}>
                  <ArrowUp className="h-3 w-3" />
                </Button>
                <Button size="icon" variant="ghost" className="h-6 w-6" disabled={idx === m.groups.length - 1} onClick={() => m.moveGroup(g.id, 1)}>
                  <ArrowDown className="h-3 w-3" />
                </Button>
              </div>

              <div className="mb-2 flex flex-wrap items-center gap-1.5">
                {items.map((s, sIdx) => (
                  <span
                    key={s.id}
                    className="cv-skill-chip inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-1 text-xs"
                  >
                    <span className={cn("h-2 w-2 rounded-full", dotColor(s.percentage))} />
                    {s.name}
                    <button
                      type="button"
                      onClick={() => m.moveSkill(s.id, -1)}
                      className="ml-0.5 rounded-full p-0.5 text-muted-foreground hover:bg-secondary disabled:opacity-30 disabled:hover:bg-transparent"
                      disabled={sIdx === 0}
                      aria-label={`Move ${s.name} up`}
                    >
                      <ArrowUp className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => m.moveSkill(s.id, 1)}
                      className="rounded-full p-0.5 text-muted-foreground hover:bg-secondary disabled:opacity-30 disabled:hover:bg-transparent"
                      disabled={sIdx === items.length - 1}
                      aria-label={`Move ${s.name} down`}
                    >
                      <ArrowDown className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => m.deleteSkill(s.id)}
                      className="ml-0.5 rounded-full p-0.5 text-muted-foreground hover:bg-secondary hover:text-destructive"
                      aria-label={`Remove ${s.name}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                {items.length === 0 && (
                  <span className="text-xs text-muted-foreground">No skills yet.</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Input
                  placeholder="Type a skill and press Enter…"
                  value={value}
                  onChange={(e) => setDraft((d) => ({ ...d, [g.id]: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === ",") commit(g.id);
                  }}
                  className="h-8 flex-1 text-sm"
                />
                <Button size="sm" variant="outline" className="h-8 gap-1 text-xs" onClick={() => commit(g.id)}>
                  <Plus className="h-3.5 w-3.5" /> Add
                </Button>
              </div>
              <div className="mt-2 flex items-center justify-end gap-2 text-[11px] text-muted-foreground">
                <span>Level for new skills</span>
                <LevelSelect value={newLevel} onChange={setNewLevel} className="h-6 w-24" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};