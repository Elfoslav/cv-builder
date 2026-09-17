export const FooterSplit = ({
  thanks,
  copyright,
}: {
  thanks: string;
  copyright: string;
}) => (
  <div className="flex flex-col items-center justify-between gap-4 text-center text-xs text-muted-foreground md:flex-row md:text-left print:flex-row print:text-left">
    <div>{thanks}</div>
    <div>{copyright}</div>
  </div>
);