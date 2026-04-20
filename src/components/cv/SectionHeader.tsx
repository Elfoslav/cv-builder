interface SectionHeaderProps {
  index: string;
  title: string;
  subtitle?: string;
}

export const SectionHeader = ({ index, title, subtitle }: SectionHeaderProps) => {
  return (
    <div className="mb-8 flex items-baseline gap-4 border-b border-border pb-4">
      <span className="text-sm font-semibold text-primary">{index}</span>
      <div className="flex-1">
        {subtitle && (
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            {subtitle}
          </div>
        )}
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {title}
        </h2>
      </div>
    </div>
  );
};
