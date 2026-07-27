import { useEffect, useRef } from "react";

export default function SectionShell({
  id,
  children,
  className = "",
  innerClassName = "",
  as: Element = "section",
  animate = true,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!animate) return;
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.65s cubic-bezier(0.23,1,0.32,1), transform 0.65s cubic-bezier(0.23,1,0.32,1)";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.08 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [animate]);

  return (
    <Element
      ref={ref}
      id={id}
      className={`px-4 py-16 sm:px-6 lg:px-8 lg:py-24 ${className}`}
    >
      <div className={`mx-auto w-full max-w-7xl ${innerClassName}`}>
        {children}
      </div>
    </Element>
  );
}
