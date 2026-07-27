import { useEffect, useState, useRef } from "react";

/**
 * Scroll spy hook to detect which section is currently visible in the viewport.
 * Uses IntersectionObserver for efficient scroll tracking.
 *
 * @param {Object} options
 * @param {string[]} options.sectionIds - Array of section IDs (without # prefix)
 * @param {string} options.rootMargin - Margin around the root (viewport) for intersection
 * @param {number|number[]} options.threshold - Intersection threshold (0-1)
 * @returns {string|null} - The currently active section ID (without #) or null
 */
export default function useScrollSpy({ 
  sectionIds = [], 
  rootMargin = "-10% 0px -50% 0px", 
  threshold = [0, 0.1, 0.25, 0.5, 0.75, 1] 
}) {
  const [activeSection, setActiveSection] = useState(null);
  const isClickScroll = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!sectionIds.length) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return;

    const visibleSections = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });

        // Do not update active section based on scroll if we just clicked a link
        if (isClickScroll.current) return;

        let bestSection = null;
        let maxRatio = 0.05; // Ignore tiny intersections

        visibleSections.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio;
            bestSection = id;
          }
        });

        if (bestSection) {
          setActiveSection(bestSection);
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    );

    elements.forEach((el) => observer.observe(el));

    const handleNavClick = (e) => {
      const href = e.currentTarget.getAttribute("href");
      if (href && href.startsWith("#")) {
        const id = href.replace("#", "");
        if (sectionIds.includes(id)) {
          setActiveSection(id);
          isClickScroll.current = true;
          
          clearTimeout(timeoutRef.current);
          // Lock observer updates for 1.5s to allow smooth scroll to finish
          timeoutRef.current = setTimeout(() => {
            isClickScroll.current = false;
          }, 1500); 
        }
      }
    };

    // Attach click listeners to all anchor links to immediately update state
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => link.addEventListener("click", handleNavClick));

    // Initial fallback if nothing intersects immediately
    setTimeout(() => {
      if (!isClickScroll.current && !activeSection) {
        setActiveSection(sectionIds[0]);
      }
    }, 100);

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      links.forEach((link) => link.removeEventListener("click", handleNavClick));
      clearTimeout(timeoutRef.current);
    };
  }, [sectionIds, rootMargin, threshold]);

  return activeSection;
}