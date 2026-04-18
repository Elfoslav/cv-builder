interface SectionHeaderProps {
  index: string;
  title: string;
  command: string;
}

export const SectionHeader = ({ index, title, command }: SectionHeaderProps) => {
  return (
    <div className="mb-8 flex items-baseline gap-4 border-b border-border pb-4">
      <span className="font-mono text-sm text-muted-foreground">{index}</span>
      <div className="flex-1">
        <div className="font-mono text-xs text-primary">
          <span className="text-muted-foreground">~/cv $</span> cat {command}
        </div>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {title}
        </h2>
      </div>
    </div>
  );
};
