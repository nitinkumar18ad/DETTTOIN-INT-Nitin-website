const HERO_IMAGE = "/images/hero/mainhero.png";

const HERO_ALT =
  "Excellence in Deed — Vasant Valley School students on the sports ground at golden hour, with founding year, campus, and holistic learning highlights";

export default function MainHero() {
  return (
    <section
      id="main-content"
      aria-label="Vasant Valley School welcome"
      className="relative w-full overflow-hidden bg-[#e6dccb] sm:bg-sandstone-50"
    >
      <div className="mx-auto w-full max-w-[1920px] flex items-center justify-center">
        <img
          src={HERO_IMAGE}
          alt={HERO_ALT}
          className="w-full h-auto object-contain object-center block select-none"
          loading="eager"
          decoding="async"
        />
      </div>
    </section>
  );
}
