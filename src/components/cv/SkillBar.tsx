interface SkillBarProps {
  name: string;
  percentage: number;
  /** @deprecated color is now derived from percentage */
  color?: string;
}

const levelLabel = (p: number) => {
  if (p >= 90) return 'Expert';
  if (p >= 75) return 'Advanced';
  if (p >= 50) return 'Proficient';
  if (p >= 25) return 'Intermediate';
  return 'Beginner';
};

const barColor = (p: number) => {
  if (p >= 80) return 'bg-skill-high';
  if (p >= 30) return 'bg-skill-mid';
  return 'bg-skill-low';
};

export const SkillBar = ({ name, percentage }: SkillBarProps) => {
  return (
    <div className="group">
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="text-xs text-muted-foreground">{levelLabel(percentage)}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={`h-full ${barColor(percentage)} animate-progress-fill rounded-full transition-all duration-500 group-hover:shadow-glow`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
