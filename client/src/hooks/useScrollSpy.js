import { useEffect, useState, useRef } from "react";

/**
 * Scroll spy hook to detect which section is currently visible in the viewport.
 * Uses IntersectionObserver for efficient scroll tracking.
 *
 * @param {Object} options
 * @param {string[]} options.sectionIds - Array of section IDs (without # prefix)
 * @param {string} options.rootMargin - Margin around the root (viewport) for intersection. 
 *                                      By default, uses a narrow band in the top-middle of the screen.
 * @param {number|number[]} options.threshold - Intersection threshold
 * @returns {string|null} - The currently active section ID (without #) or null
 */
export default function useScrollSpy({ 
  sectionIds = [], 
  // The intersection trigger zone is a horizontal band starting 20% down from the top 
  // and ending 60% up from the bottom (so it's a 20% tall band in the upper half).
  // This guarantees the active section changes exactly when it reaches the upper part of the viewport.
  rootMargin = "-20% 0px -60% 0px", 
  threshold = 0 
}) {
  const [activeSection, setActiveSection] = useState(null);
  const isClickScroll = useRef(false);
  const timeoutRef = useRef(null);
  const intersectingSections = useRef(new Set());

  useEffect(() => {
    if (!sectionIds.length) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersectingSections.current.add(entry.target.id);
          } else {
            intersectingSections.current.delete(entry.target.id);
          }
        });

        // Do not update active section based on scroll if we just clicked a link
        if (isClickScroll.current) return;

        // If at least one section is intersecting the narrow band
        if (intersectingSections.current.size > 0) {
          // If multiple sections intersect the narrow band (unlikely, but possible),
          // sort them by their original order in sectionIds (DOM order) and pick the first one.
          const visibleArray = Array.from(intersectingSections.current);
          visibleArray.sort((a, b) => sectionIds.indexOf(a) - sectionIds.indexOf(b));
          
          setActiveSection(visibleArray[0]);
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    );

    elements.forEach((el) => observer.observe(el));

    // Handle clicks to immediately update state and prevent observer from overriding during smooth scroll
    const handleNavClick = (e) => {
      const href = e.currentTarget.getAttribute("href");
      if (href && href.startsWith("#")) {
        const id = href.replace("#", "");
        if (sectionIds.includes(id)) {
          setActiveSection(id);
          isClickScroll.current = true;
          
          clearTimeout(timeoutRef.current);
          // Lock observer updates for 1.5s to allow smooth scroll to finish without flickering
          timeoutRef.current = setTimeout(() => {
            isClickScroll.current = false;
          }, 1500); 
        }
      }
    };

    // Attach click listeners to all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => link.addEventListener("click", handleNavClick));

    // Initial fallback if nothing intersects immediately (e.g. at the very top of the page)
    if (!activeSection) {
      setActiveSection(sectionIds[0]);
    }

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      links.forEach((link) => link.removeEventListener("click", handleNavClick));
      clearTimeout(timeoutRef.current);
    };
  }, [sectionIds, rootMargin, threshold]); // Do NOT add activeSection here to avoid re-running

  return activeSection;
}