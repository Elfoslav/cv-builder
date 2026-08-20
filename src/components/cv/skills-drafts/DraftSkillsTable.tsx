import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { useSkillsDraft } from "./useSkillsDraft";
import { LevelSelect } from "@/components/cv/LevelSelect";

const GRID = "grid grid-cols-[1fr_9rem_8rem_auto] items-center gap-2";

/**
 * Draft F — table editor.
 * Skills are rows of a spreadsheet-like grid: Name | Group | Level, plus
 * order arrows. The group is a real column, so moving a skill between groups
 * is a single dropdown change and bulk scanning is effortless.
 */
export const DraftSkillsTable = () => {
  const m = useSkillsDraft();
  const firstGroupId = m.groups[0]?.id ?? "";

  return (
    <div className="max-w-2xl overflow-hidden rounded-lg border border-border bg-background shadow-sm">
      <div className="flex items-center justify-between border-b border-border bg-secondary/30 px-3 py-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Skills</span>
        <span className="font-mono text-[10px] text-muted-foreground">{m.skills.length} total</span>
      </div>

      <div className={`${GRID} border-b border-border bg-secondary/20 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground`}>
        <span>Skill</span>
        <span>Group</span>
        <span>Level</span>
        <span className="text-right">Order</span>
      </div>

      {m.skills.map((s, idx) => {
        const sameGroup = m.skillsIn(s.group);
        const posInGroup = sameGroup.findIndex((x) => x.id === s.id);
        return (
          <div key={s.id} className={`${GRID} border-b border-border px-3 py-1.5 last:border-b-0`}>
            <Input
              value={s.name}
              onChange={(e) => m.patchSkill(s.id, { name: e.target.value })}
              className="h-7 text-sm"
            />
            <Select value={s.group} onValueChange={(v) => m.patchSkill(s.id, { group: v })}>
              <SelectTrigger className="h-7 w-full text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {m.groups.map((g) => (
                  <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <LevelSelect value={s.percentage} onChange={(pct) => m.patchSkill(s.id, { percentage: pct })} className="w-full" />
            <div className="flex items-center justify-end gap-0.5">
              <Button size="icon" variant="ghost" className="h-7 w-6" disabled={posInGroup === 0} onClick={() => m.moveSkill(s.id, -1)}>
                <ArrowUp className="h-3 w-3" />
              </Button>
              <Button size="icon" variant="ghost" className="h-7 w-6" disabled={posInGroup === sameGroup.length - 1} onClick={() => m.moveSkill(s.id, 1)}>
                <ArrowDown className="h-3 w-3" />
              </Button>
              <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => m.deleteSkill(s.id)}>
                <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
              </Button>
            </div>
          </div>
        );
      })}

      <div className="px-3 py-2">
        <Button
          variant="outline" size="sm"
          className="h-7 w-full gap-1.5 border-dashed text-xs"
          onClick={() => m.addSkill(firstGroupId, "New skill")}
        >
          <Plus className="h-3.5 w-3.5" /> Add skill
        </Button>
      </div>
    </div>
  );
};