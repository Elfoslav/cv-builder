import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronRight, Plus, Trash2, Pencil, Check, X, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSkillsDraft } from "./useSkillsDraft";
import { LevelSelect } from "@/components/cv/LevelSelect";

/**
 * Draft C — collapsible groups.
 * Same compact rows as A, but groups behave like an accordion: only the
 * focused group is expanded, the rest collapse to a name + count line, so
 * a long skills list never looks like a wall of inputs.
 */
export const DraftSkillsCollapsible = () => {
  const m = useSkillsDraft();
  const [expanded, setExpanded] = useState<string | null>(m.groups[0]?.id ?? null);
  const [renaming, setRenaming] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  return (
    <div className="max-w-md rounded-lg border border-border bg-background p-4 shadow-sm">
      <div className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        Section — Skills
      </div>

      <div className="space-y-1.5">
        {m.groups.map((g, idx) => {
          const items = m.skillsIn(g.id);
          const open = expanded === g.id;
          const isEditing = renaming === g.id;
          return (
            <div key={g.id} className={cn("rounded border border-border", open ? "bg-secondary/20 p-2.5" : "bg-background px-2 py-1.5")}>
              <div className="flex items-center gap-1">
                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setExpanded(open ? null : g.id)}>
                  {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
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

              {open && (
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
                        <ArrowUp className="h-3 w-3" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-7" disabled={sIdx === items.length - 1} onClick={() => m.moveSkill(s.id, 1)}>
                        <ArrowDown className="h-3 w-3" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-7" onClick={() => m.deleteSkill(s.id)}>
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline" size="sm"
                    className="mt-1 h-7 w-full gap-1.5 border-dashed text-xs"
                    onClick={() => m.addSkill(g.id, "New skill")}
                  >
                    <Plus className="h-3.5 w-3.5" /> Add skill
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};