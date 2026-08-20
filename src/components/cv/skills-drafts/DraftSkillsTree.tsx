import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Folder, Pencil, Check, X, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { useSkillsDraft } from "./useSkillsDraft";
import { LevelSelect } from "@/components/cv/LevelSelect";

/**
 * Draft A — single hierarchy list.
 * Group rows and their skills live in ONE tree: no separate group-manager box
 * and no duplicated group headings. Names rename inline, groups reorder.
 */
export const DraftSkillsTree = () => {
  const m = useSkillsDraft();
  const [renaming, setRenaming] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  return (
    <div className="max-w-md rounded-lg border border-border bg-background p-4 shadow-sm">
      <div className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        Section — Skills
      </div>

      <div className="space-y-4">
        {m.groups.map((g, idx) => {
          const items = m.skillsIn(g.id);
          const isEditing = renaming === g.id;
          return (
            <div key={g.id} className="rounded border border-border bg-secondary/20 p-2.5">
              <div className="flex items-center gap-1">
                {isEditing ? (
                  <>
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
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => { m.renameGroup(g.id, editName); setRenaming(null); }}>
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
                    <Button size="icon" variant="ghost" className="h-7 w-7" disabled={idx === 0} onClick={() => m.moveGroup(g.id, -1)}>
                      <ArrowUp className="h-3.5 w-3.5" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7" disabled={idx === m.groups.length - 1} onClick={() => m.moveGroup(g.id, 1)}>
                      <ArrowDown className="h-3.5 w-3.5" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => { setRenaming(g.id); setEditName(g.name); }}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => m.deleteGroup(g.id)}>
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

              <Button
                variant="outline" size="sm"
                className="mt-2 h-7 w-full gap-1.5 border-dashed text-xs"
                onClick={() => m.addSkill(g.id, "New skill")}
              >
                <Plus className="h-3.5 w-3.5" /> Add skill
              </Button>
            </div>
          );
        })}

        <Button variant="outline" size="sm" className="h-7 w-full gap-1.5 border-dashed text-xs" onClick={() => m.addGroup(`Group ${m.groups.length + 1}`)}>
          <Plus className="h-3.5 w-3.5" /> Add group
        </Button>
      </div>
    </div>
  );
};