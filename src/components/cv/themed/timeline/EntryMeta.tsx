export const EntryMeta = ({
  subtitle,
  location,
}: {
  subtitle: string;
  location?: string;
}) => (
  <div className="mt-0.5 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
    <span className="font-medium text-accent">{subtitle}</span>
    {location && (
      <>
        <span>·</span>
        <span>{location}</span>
      </>
    )}
  </div>
);