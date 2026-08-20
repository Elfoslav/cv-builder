import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Plus, Trash2, Pencil, Check, X, ArrowUp, ArrowDown, Folder } from "lucide-react";
import { useSkillsDraft } from "./useSkillsDraft";
import { LevelSelect } from "@/components/cv/LevelSelect";

/**
 * Draft E — two-pane editor.
 * Groups live in a slim left rail (select, reorder, rename, delete); the
 * focused group's skills fill the right pane. You always edit one group at
 * a time, so there is never a long wall of inputs and the active context
 * is obvious at a glance.
 */
export const DraftSkillsTwoPane = () => {
  const m = useSkillsDraft();
  const [selected, setSelected] = useState<string>(m.groups[0].id);
  const [renaming, setRenaming] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const group = m.groups.find((g) => g.id === selected) ?? m.groups[0];
  const items = m.skillsIn(group.id);

  return (
    <div className="max-w-2xl">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="sm:w-56">
          <div className="mb-1 px-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Groups
          </div>
          <div className="space-y-1 rounded-lg border border-border bg-background p-2 shadow-sm">
            {m.groups.map((g, idx) => {
              const active = g.id === group.id;
              const isEditing = renaming === g.id;
              return (
                <div
                  key={g.id}
                  className={cn(
                    "rounded-md px-1.5 py-1",
                    active ? "bg-primary/10 ring-1 ring-primary/30" : "hover:bg-secondary/50",
                  )}
                >
                  {isEditing ? (
                    <div className="flex items-center gap-1">
                      <Input
                        autoFocus
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") { m.renameGroup(g.id, editName); setRenaming(null); }
                          if (e.key === "Escape") setRenaming(null);
                        }}
                        className="h-7 text-sm"
                      />
                      <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => { m.renameGroup(g.id, editName); setRenaming(null); }}>
                        <Check className="h-3 w-3 text-primary" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => setRenaming(null)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelected(g.id)}
                      className="flex w-full items-center gap-1.5 text-left"
                    >
                      <Folder className={cn("h-3.5 w-3.5", active ? "text-primary" : "text-accent")} />
                      <span className="flex-1 truncate text-sm font-medium">{g.name}</span>
                      <span className="rounded bg-secondary px-1 py-0.5 font-mono text-[10px] text-muted-foreground">
                        {m.skillsIn(g.id).length}
                      </span>
                    </button>
                  )}
                  <div className="mt-0.5 flex justify-end gap-0.5">
                    <Button size="icon" variant="ghost" className="h-5 w-5" disabled={idx === 0} onClick={() => m.moveGroup(g.id, -1)}>
                      <ArrowUp className="h-3 w-3" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-5 w-5" disabled={idx === m.groups.length - 1} onClick={() => m.moveGroup(g.id, 1)}>
                      <ArrowDown className="h-3 w-3" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-5 w-5" onClick={() => { setRenaming(g.id); setEditName(g.name); }}>
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-5 w-5" onClick={() => m.deleteGroup(g.id)}>
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </div>
                </div>
              );
            })}
            <Button variant="outline" size="sm" className="mt-1 h-7 w-full gap-1 border-dashed text-xs" onClick={() => m.addGroup(`Group ${m.groups.length + 1}`)}>
              <Plus className="h-3.5 w-3.5" /> Add group
            </Button>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 px-1 flex items-center justify-between">
            <span className="truncate text-[10px] font-semibold uppercase tracking-wider text-accent">{group.name}</span>
            <span className="font-mono text-[10px] text-muted-foreground">{items.length}</span>
          </div>
          <div className="rounded-lg border border-border bg-background p-3 shadow-sm">
            <div className="space-y-1.5">
              {items.map((s, sIdx) => (
                <div key={s.id} className="flex items-center gap-1.5">
                  <span className="w-4 text-center font-mono text-[10px] text-muted-foreground">{sIdx + 1}</span>
                  <Input
                    value={s.name}
                    onChange={(e) => m.patchSkill(s.id, { name: e.target.value })}
                    className="h-8 flex-1 text-sm"
                  />
                  <LevelSelect value={s.percentage} onChange={(pct) => m.patchSkill(s.id, { percentage: pct })} />
                  <Button size="icon" variant="ghost" className="h-8 w-7" disabled={sIdx === 0} onClick={() => m.moveSkill(s.id, -1)}>
                    <ArrowUp className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-7" disabled={sIdx === items.length - 1} onClick={() => m.moveSkill(s.id, 1)}>
                    <ArrowDown className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-7" onClick={() => m.deleteSkill(s.id)}>
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="mt-2 h-7 w-full gap-1.5 border-dashed text-xs" onClick={() => m.addSkill(group.id, "New skill")}>
              <Plus className="h-3.5 w-3.5" /> Add skill
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};