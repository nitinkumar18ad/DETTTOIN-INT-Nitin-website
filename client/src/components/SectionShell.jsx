export default function SectionShell({
  id,
  children,
  className = "",
  innerClassName = "",
  as: Element = "section"
}) {
  return (
    <Element id={id} className={`px-4 py-16 sm:px-6 lg:px-8 lg:py-24 ${className}`}>
      <div className={`mx-auto w-full max-w-7xl ${innerClassName}`}>{children}</div>
    </Element>
  );
}
