export default function CheckCell({ children }: { children?: Children }) {
  if (typeof children !== 'boolean') return <td>{children}</td>;
  return <td className="text-center success">{!!children && <i className="fa fa-check" aria-hidden="true" />}</td>;
}
