interface SkillBarProps {
  name: string;
  percentage: number;
  color?: 'green' | 'cyan' | 'purple' | 'yellow' | 'pink';
}

const colorMap = {
  green: 'bg-terminal-green',
  cyan: 'bg-terminal-cyan',
  purple: 'bg-terminal-purple',
  yellow: 'bg-terminal-yellow',
  pink: 'bg-terminal-pink',
};

const levelLabel = (p: number) => {
  if (p >= 90) return 'Expert';
  if (p >= 75) return 'Advanced';
  if (p >= 50) return 'Proficient';
  if (p >= 25) return 'Intermediate';
  return 'Beginner';
};

export const SkillBar = ({ name, percentage, color = 'green' }: SkillBarProps) => {
  return (
    <div className="group">
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="text-xs text-muted-foreground">{levelLabel(percentage)}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={`h-full ${colorMap[color]} animate-progress-fill rounded-full transition-all duration-500 group-hover:shadow-glow`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
