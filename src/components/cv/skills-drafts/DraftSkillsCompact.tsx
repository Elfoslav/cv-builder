import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { useSkillsDraft } from "./useSkillsDraft";
import { LevelSelect } from "@/components/cv/LevelSelect";

/**
 * Draft B — compact rows.
 * The thinnest possible footprint: every skill is a single line
 * (name + proficiency + delete) inside a slim grouped container. No cards,
 * no sliders, no per-skill group dropdown (the group is already the parent).
 */
export const DraftSkillsCompact = () => {
  const m = useSkillsDraft();

  return (
    <div className="max-w-md rounded-lg border border-border bg-background p-4 shadow-sm">
      <div className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        Section — Skills
      </div>

      <div className="space-y-4">
        {m.groups.map((g, idx) => {
          const items = m.skillsIn(g.id);
          return (
            <div key={g.id}>
              <div className="mb-1 flex items-center gap-1">
                <span className="flex-1 truncate text-xs font-semibold uppercase tracking-wider text-accent">
                  {g.name}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">{items.length}</span>
                <Button size="icon" variant="ghost" className="h-6 w-6" disabled={idx === 0} onClick={() => m.moveGroup(g.id, -1)}>
                  <ArrowUp className="h-3 w-3" />
                </Button>
                <Button size="icon" variant="ghost" className="h-6 w-6" disabled={idx === m.groups.length - 1} onClick={() => m.moveGroup(g.id, 1)}>
                  <ArrowDown className="h-3 w-3" />
                </Button>
              </div>
              <div className="overflow-hidden rounded-md border border-border">
                {items.map((s, sIdx) => (
                  <div
                    key={s.id}
                    className="flex items-center gap-2 border-b border-border px-2 py-1.5 last:border-b-0"
                  >
                    <Input
                      value={s.name}
                      onChange={(e) => m.patchSkill(s.id, { name: e.target.value })}
                      className="h-7 flex-1 border-transparent bg-transparent px-1 text-sm shadow-none focus:bg-background focus:shadow-none"
                    />
                    <LevelSelect value={s.percentage} onChange={(pct) => m.patchSkill(s.id, { percentage: pct })} />
                    <Button size="icon" variant="ghost" className="h-7 w-6" disabled={sIdx === 0} onClick={() => m.moveSkill(s.id, -1)}>
                      <ArrowUp className="h-3 w-3" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-7 w-6" disabled={sIdx === items.length - 1} onClick={() => m.moveSkill(s.id, 1)}>
                      <ArrowDown className="h-3 w-3" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => m.deleteSkill(s.id)}>
                      <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                    </Button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => m.addSkill(g.id, "New skill")}
                  className="flex h-7 w-full items-center gap-1.5 px-2 text-xs text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
                >
                  <Plus className="h-3.5 w-3.5" /> Add skill
                </button>
              </div>
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