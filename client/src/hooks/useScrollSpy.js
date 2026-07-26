import { useEffect, useState } from "react";

/**
 * Scroll spy hook to detect which section is currently visible in the viewport.
 * Uses IntersectionObserver for efficient scroll tracking.
 *
 * @param {Object} options
 * @param {string[]} options.sectionIds - Array of section IDs (without # prefix)
 * @param {number} options.rootMargin - Margin around the root (viewport) for intersection
 * @param {number} options.threshold - Intersection threshold (0-1)
 * @returns {string|null} - The currently active section ID (without #) or null
 */
export default function useScrollSpy({ sectionIds = [], rootMargin = "-20% 0px -70% 0px", threshold = 0 }) {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    if (!sectionIds.length) return;

    // Get all section elements
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio
        let bestEntry = null;
        let maxRatio = -1;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            bestEntry = entry;
          }
        });

        if (bestEntry) {
          setActiveSection(bestEntry.target.id);
        }
      },
      {
        root: null, // viewport
        rootMargin,
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));

    // Set initial active section based on scroll position
    const setInitialActive = () => {
      let bestSection = null;
      let bestDistance = Infinity;

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Section is in viewport if top is above bottom of viewport and bottom is below top
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const distanceFromCenter = Math.abs(rect.top + rect.height / 2 - viewportHeight / 2);

        if (rect.top <= viewportHeight && rect.bottom >= 0 && distanceFromCenter < bestDistance) {
          bestDistance = distanceFromCenter;
          bestSection = el.id;
        }
      });

      if (bestSection) {
        setActiveSection(bestSection);
      }
    };

    setInitialActive();
    window.addEventListener("scroll", setInitialActive, { passive: true });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      window.removeEventListener("scroll", setInitialActive);
    };
  }, [sectionIds, rootMargin, threshold]);

  return activeSection;
}