/** Optional subtitle + location line (shared by all list designs). */
export const MetaLine = ({
  subtitle,
  location,
}: {
  subtitle?: string;
  location?: string;
}) => {
  if (!subtitle && !location) return null;
  return (
    <div className="mt-0.5 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
      {subtitle && <span className="font-medium text-accent">{subtitle}</span>}
      {location && (
        <>
          <span>·</span>
          <span>{location}</span>
        </>
      )}
    </div>
  );
};