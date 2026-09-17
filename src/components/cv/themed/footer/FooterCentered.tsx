export const FooterCentered = ({
  thanks,
  copyright,
}: {
  thanks: string;
  copyright: string;
}) => (
  <div className="flex flex-col items-center gap-1 text-center text-xs text-muted-foreground">
    <div>{thanks}</div>
    <div>{copyright}</div>
  </div>
);