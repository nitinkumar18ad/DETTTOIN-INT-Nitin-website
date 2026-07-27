import SectionShell from "./SectionShell.jsx";

export default function MissionBlock() {
  return (
    <SectionShell className="bg-white">
      <div className="rounded-heritage border border-sandstone-200 bg-sandstone-100 p-6 shadow-soft sm:p-10 lg:p-12">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-maroon-700">
            About Us
          </p>
          <h2 className="mt-4">
            To nurture thoughtful learners who act with confidence, compassion,
            and <span className="text-maroon-700">excellence in deed</span>.
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-ink-700">
            The school experience is shaped by inquiry, responsibility, creativity,
            and care for the community. Each child is encouraged to grow with
            independence of mind and generosity of spirit.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
