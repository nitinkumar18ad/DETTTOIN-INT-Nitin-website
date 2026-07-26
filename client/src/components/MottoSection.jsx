import SectionShell from "./SectionShell.jsx";

export default function MottoSection() {
  return (
    <SectionShell id="motto" className="bg-sandstone-100">
      <figure className="mx-auto max-w-4xl text-center">
        <blockquote className="font-serif text-5xl font-bold leading-tight text-maroon-900 sm:text-6xl lg:text-7xl">
          "Excellence in Deed"
        </blockquote>
        <figcaption className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-ink-700">
          A motto carried through learning, service, friendship, and the daily
          responsibilities of school life.
        </figcaption>
      </figure>
    </SectionShell>
  );
}
