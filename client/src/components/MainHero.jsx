const HERO_IMAGE = "/images/hero/mainhero.png";

const HERO_ALT =
  "Excellence in Deed — Vasant Valley School students on the sports ground at golden hour, with founding year, campus, and holistic learning highlights";

export default function MainHero() {
  return (
    <section
      aria-label="Vasant Valley School welcome"
      className="relative w-full overflow-hidden bg-sandstone-50"
    >
      <div
        className="relative aspect-[21/9] min-h-[380px] w-full bg-sandstone-50 bg-cover bg-[position:18%_center] bg-no-repeat sm:min-h-[440px] sm:bg-center lg:min-h-[520px]"
        style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
        role="img"
        aria-label={HERO_ALT}
      />
    </section>
  );
}
