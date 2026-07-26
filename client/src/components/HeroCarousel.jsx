import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { useEffect, useMemo, useState } from "react";
import { formatDisplayDate } from "../utils/date.js";

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reducedMotion;
}

/* ─── Slide indicator dots / bars shared by both layouts ────────────── */
function SlideControls({
  slides,
  activeIndex,
  onPrev,
  onNext,
  setActiveIndex,
  light = false,
}) {
  const base = light
    ? "border-sandstone-50 "
    : "border-maroon-700 ";
  const active = light ? "bg-sandstone-50" : "bg-maroon-700";

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      {/* Prev / Next */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onPrev}
          className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-heritage border ${
            light
              ? "border-sandstone-50/40 text-sandstone-50 hover:bg-sandstone-50/15"
              : "border-sandstone-200 text-maroon-700 hover:bg-maroon-50"
          } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-500`}
          aria-label="Show previous slide"
        >
          <ArrowLeft size={20} weight="bold" />
        </button>
        <button
          type="button"
          onClick={onNext}
          className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-heritage border ${
            light
              ? "border-sandstone-50/40 text-sandstone-50 hover:bg-sandstone-50/15"
              : "border-sandstone-200 text-maroon-700 hover:bg-maroon-50"
          } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-500`}
          aria-label="Show next slide"
        >
          <ArrowRight size={20} weight="bold" />
        </button>
      </div>

      {/* Indicator pills */}
      <div className="flex gap-2" aria-label="Choose slide">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-3 w-8 rounded-full border ${base} ${
              index === activeIndex ? active : "bg-transparent"
            } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-500`}
            aria-label={`Show slide ${index + 1}: ${slide.title}`}
            aria-current={index === activeIndex ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Full-bleed layout (real photos) ──────────────────────────────── */
function FullBleedSlide({
  slide,
  slides,
  activeIndex,
  onPrev,
  onNext,
  setActiveIndex,
  reducedMotion,
  imageError,
  onImageError,
}) {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Photo fills the container */}
      <div className="relative aspect-[21/9] min-h-[420px] w-full sm:min-h-[480px] lg:min-h-[600px]">
        {!imageError ? (
          <img
            src={slide.image}
            alt={slide.alt}
            className={`h-full w-full object-cover object-center ${
              reducedMotion ? "" : "transition-opacity duration-500"
            }`}
            onError={onImageError}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-sandstone-200 text-ink-700">
            {slide.alt}
          </div>
        )}

        {/* Gradient scrim — left side so caption is readable */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(26,6,6,0.72) 0%, rgba(26,6,6,0.28) 55%, transparent 85%)",
          }}
          aria-hidden="true"
        />

        {/* Caption card — bottom-left, over the scrim */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-8 pt-16 sm:px-8 lg:px-12 lg:pb-12">
          <div className="max-w-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-sandstone-200">
              {slide.category}
            </p>
            <h1 className="mt-3 font-serif font-bold leading-tight text-sandstone-50"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}>
              {slide.title}
            </h1>
            <p className="mt-2 font-semibold text-sandstone-400">
              {formatDisplayDate(slide.date)}
            </p>
            <p className="mt-4 max-w-sm text-base leading-7 text-sandstone-200">
              {slide.caption}
            </p>
          </div>

          {/* Controls */}
          <div className="mt-8">
            <SlideControls
              slides={slides}
              activeIndex={activeIndex}
              onPrev={onPrev}
              onNext={onNext}
              setActiveIndex={setActiveIndex}
              light
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Side-by-side layout (SVG placeholder slides) ─────────────────── */
function SideBySideSlide({
  slide,
  slides,
  activeIndex,
  onPrev,
  onNext,
  setActiveIndex,
  reducedMotion,
  imageError,
  onImageError,
}) {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1.35fr_0.65fr] lg:px-8 lg:py-10">
      {/* Image */}
      <div className="relative overflow-hidden rounded-heritage bg-sandstone-100 shadow-soft">
        <div className="aspect-[16/10] w-full">
          {!imageError ? (
            <img
              src={slide.image}
              alt={slide.alt}
              className={`h-full w-full bg-sandstone-200 object-cover ${
                reducedMotion ? "" : "transition-opacity duration-300 ease-out"
              }`}
              onError={onImageError}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-sandstone-200 px-8 text-center text-ink-700">
              {slide.alt}
            </div>
          )}
        </div>
      </div>

      {/* Caption panel */}
      <div className="flex flex-col justify-between rounded-heritage border border-sandstone-200 bg-white p-6 shadow-soft lg:p-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-maroon-700">
            {slide.category}
          </p>
          <h1 className="mt-4">{slide.title}</h1>
          <p className="mt-4 font-semibold text-maroon-700">
            {formatDisplayDate(slide.date)}
          </p>
          <p className="mt-5 text-lg leading-8 text-ink-700">{slide.caption}</p>
        </div>

        <div className="mt-8">
          <SlideControls
            slides={slides}
            activeIndex={activeIndex}
            onPrev={onPrev}
            onNext={onNext}
            setActiveIndex={setActiveIndex}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Main export ───────────────────────────────────────────────────── */
export default function HeroCarousel({ slides = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused]       = useState(false);
  const [imageError, setImageError]   = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const hasSlides     = slides.length > 0;

  const activeSlide = useMemo(
    () => slides[activeIndex] || slides[0],
    [activeIndex, slides]
  );

  /* reset image error on slide change */
  useEffect(() => setImageError(false), [activeIndex]);

  /* auto-advance */
  useEffect(() => {
    if (!hasSlides || isPaused || reducedMotion || slides.length < 2) {
      return undefined;
    }
    const interval = window.setInterval(
      () => setActiveIndex((c) => (c + 1) % slides.length),
      5000
    );
    return () => window.clearInterval(interval);
  }, [hasSlides, isPaused, reducedMotion, slides.length]);

  const goToPrevious = () =>
    setActiveIndex((c) => (c - 1 + slides.length) % slides.length);
  const goToNext = () =>
    setActiveIndex((c) => (c + 1) % slides.length);

  if (!hasSlides) {
    return (
      <div className="rounded-heritage border border-sandstone-200 bg-white p-8 text-ink-700">
        Hero stories are loading.
      </div>
    );
  }

  const sharedProps = {
    slide: activeSlide,
    slides,
    activeIndex,
    onPrev: goToPrevious,
    onNext: goToNext,
    setActiveIndex,
    reducedMotion,
    imageError,
    onImageError: () => setImageError(true),
  };

  return (
    <section
      aria-label="Featured school events"
      className="relative bg-sandstone-50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {activeSlide.fullBleed ? (
        <FullBleedSlide {...sharedProps} />
      ) : (
        <SideBySideSlide {...sharedProps} />
      )}
    </section>
  );
}
