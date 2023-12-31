export type RowLegendProps = {
  label: string;
  className?: string;
  strong?: boolean;
  children?: Children;
};

export default function RowLegend({ label, className = '', strong = false, children }: RowLegendProps) {
  return (
    <div className={'row ' + className}>
      {strong ? (
        <p>
          <b>{label}</b>
        </p>
      ) : (
        <p>{label}</p>
      )}
      {children}
    </div>
  );
}
