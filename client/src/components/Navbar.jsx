/**
 * Navbar — sticky header with PillNav-style GSAP rising-circle pill animation.
 *
 * Desktop: logo pill (maroon-900 bg) + individual nav-link pills in a shared
 *          maroon-900 container. Hovering any pill triggers a "rising circle"
 *          animation that fills it from below, white-text label slides in.
 *
 * Mobile:  hamburger opens an accessible focus-trapped drawer (existing a11y).
 *
 * GSAP rising-circle technique adapted from PillNav component.
 * All other a11y (focus trap, Escape close, aria roles) is preserved as-is.
 */
import { gsap } from "gsap";
import { List, MagnifyingGlass, SignIn, X } from "@phosphor-icons/react";
import { useCallback, useEffect, useRef, useState } from "react";
import useFocusTrap from "../hooks/useFocusTrap.js";
import useScrollSpy from "../hooks/useScrollSpy.js";

/* ─── Theme tokens (match tailwind.config.js) ─────────────────────────── */
const BASE_COLOR = "#3f0d0f";
const HOVER_TEXT = "#ffffff";
const EASE = "power3.out";

/* ─── Helpers ──────────────────────────────────────────────────────────── */
function flattenNav(navItems) {
  return navItems.flatMap((item) => [item, ...(item.children || [])]);
}

/* ─── Rising-circle geometry ────────────────────────────────────────────
 * Given a pill's width (w) and height (h), compute a circle large enough
 * to cover the pill from a bottom-center origin point.
 *   R = radius of the circumscribed circle for the pill rectangle
 *   D = circle diameter (+ 2px safety margin)
 *   delta = how far the circle centre sits below the pill bottom
 */
function computeCircleGeometry(w, h) {
  const R = ((w * w) / 4 + h * h) / (2 * h);
  const D = Math.ceil(2 * R) + 2;
  const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
  const originY = D - delta;
  return { D, delta, originY };
}

/* ─── Single animated pill ──────────────────────────────────────────────
 * Renders one nav link as a pill with the rising-circle hover animation.
 * Manages its own GSAP timeline via useEffect, rebuilding when isActive changes.
 */
function NavPill({ item, isActive }) {
  const pillRef = useRef(null);
  const circleRef = useRef(null);
  const labelRef = useRef(null);
  const hoverLabelRef = useRef(null);
  const tlRef = useRef(null);
  const activeTweenRef = useRef(null);

  // Build / rebuild hover timeline when active state or item changes
  useEffect(() => {
    const circle = circleRef.current;
    const pill = pillRef.current;
    const label = labelRef.current;
    const hoverLabel = hoverLabelRef.current;
    if (!circle || !pill) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(circle, { display: "none" });
      if (label) gsap.set(label, { clearProps: "transform" });
      if (hoverLabel) gsap.set(hoverLabel, { display: "none" });
      return undefined;
    }

    const rect = pill.getBoundingClientRect();
    const { w, h } = { w: rect.width, h: rect.height };
    if (!w || !h) return;

    const { D, delta, originY } = computeCircleGeometry(w, h);

    circle.style.width = `${D}px`;
    circle.style.height = `${D}px`;
    circle.style.bottom = `-${delta}px`;

    gsap.set(circle, {
      xPercent: -50,
      scale: 0,
      transformOrigin: `50% ${originY}px`,
      display: isActive ? "none" : "block",
    });

    if (label) gsap.set(label, { y: 0 });
    if (hoverLabel) gsap.set(hoverLabel, { y: h + 12, opacity: 0 });

    tlRef.current?.kill();
    const tl = gsap.timeline({ paused: true });

    tl.to(circle, {
      scale: 1.2,
      xPercent: -50,
      duration: 0.45,
      ease: EASE,
      overwrite: "auto",
    }, 0);

    if (label) {
      tl.to(label, {
        y: -(h + 8),
        duration: 0.4,
        ease: EASE,
        overwrite: "auto",
      }, 0);
    }

    if (hoverLabel) {
      gsap.set(hoverLabel, { y: Math.ceil(h + 20), opacity: 0 });
      tl.to(hoverLabel, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: EASE,
        overwrite: "auto",
      }, 0);
    }

    tlRef.current = tl;

    return () => {
      tlRef.current?.kill();
    };
  }, [isActive, item.id]);

  const handleEnter = useCallback(() => {
    if (isActive) return; // No hover animation on active pill
    const tl = tlRef.current;
    if (!tl) return;
    activeTweenRef.current?.kill();
    activeTweenRef.current = tl.tweenTo(tl.duration(), {
      duration: 0.24,
      ease: EASE,
      overwrite: "auto",
    });
  }, [isActive]);

  const handleLeave = useCallback(() => {
    if (isActive) return;
    const tl = tlRef.current;
    if (!tl) return;
    activeTweenRef.current?.kill();
    activeTweenRef.current = tl.tweenTo(0, {
      duration: 0.2,
      ease: EASE,
      overwrite: "auto",
    });
  }, [isActive]);

  return (
    <li role="none" className="flex items-center">
      <a
        ref={pillRef}
        role="menuitem"
        href={item.href}
        aria-label={item.ariaLabel || item.label}
        aria-current={isActive ? "page" : undefined}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onFocus={handleEnter}
        onBlur={handleLeave}
        className={`pill-nav-link relative inline-flex h-10 self-center items-center justify-center overflow-hidden rounded-full px-5 text-sm font-semibold uppercase tracking-wider no-underline select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-maroon-900 ${
          isActive
            ? "bg-white text-maroon-900 hover:bg-white hover:text-maroon-900"
            : "bg-white text-ink-900 hover:bg-white hover:text-ink-900"
        }`}
      >
        {/* Rising background circle - always rendered, hidden via GSAP when active */}
        <span
          ref={circleRef}
          className="absolute left-1/2 bottom-0 rounded-full pointer-events-none z-1 block"
          style={{ background: BASE_COLOR, willChange: "transform" }}
          aria-hidden="true"
        />

        {/* Label stack: default slides up, hover slides in from below */}
        <span className="label-stack relative inline-block leading-none z-[2] overflow-hidden py-0.5">
          <span
            ref={labelRef}
            className="pill-label relative inline-block z-[2]"
            style={{ willChange: "transform" }}
          >
            {item.label}
          </span>
          <span
            ref={hoverLabelRef}
            className="pill-label-hover absolute left-0 top-1 inline-block w-full text-center z-[3]"
            style={{ color: HOVER_TEXT, willChange: "transform, opacity" }}
            aria-hidden="true"
          >
            {item.label}
          </span>
        </span>
      </a>
    </li>
  );
}

/* ─── Main Navbar ───────────────────────────────────────────────────────── */
export default function Navbar({ navItems = [], onSearchOpen, onLoginOpen, activeSection: activeSectionProp }) {
  /* — mobile drawer state & a11y — */
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
  const drawerRef = useFocusTrap(isDrawerOpen, closeDrawer);
  const allLinks = flattenNav(navItems);

  /* — scroll spy for active section — */
  const sectionIds = navItems.map((item) => item.href?.replace("#", "")).filter(Boolean);
  const activeSectionSpy = useScrollSpy({ sectionIds });
  const activeSection = activeSectionProp ?? activeSectionSpy;

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isDrawerOpen]);

  /* — Entrance animation: runs once on mount — */
  const navBarRef = useRef(null);
  useEffect(() => {
    if (!navItems.length) return;

    const raf = requestAnimationFrame(() => {
      const pills = navBarRef.current?.querySelectorAll("[role='menuitem']");
      if (pills?.length) {
        gsap.fromTo(
          pills,
          { opacity: 0, x: -16 },
          {
            opacity: 1,
            x: 0,
            duration: 0.55,
            stagger: 0.06,
            ease: "power2.out",
            delay: 0.1,
          }
        );
      }
    });

    return () => cancelAnimationFrame(raf);
  }, [navItems.length]); // Only re-run if number of nav items changes

  return (
    <header className="sticky top-0 z-40 border-b border-white/30 bg-white/40 backdrop-blur-lg shadow-sm">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >

        {/* ── Logo ──────────────────────────────────────────────────── */}
        <a
          href="#main-content"
          className="flex flex-shrink-0 items-center gap-3 no-underline"
          aria-label="Vasant Valley School — home"
        >
          <img
            src="/logo.svg"
            alt=""
            className="h-12 w-auto max-w-[72px] shrink-0 object-contain object-left sm:h-14 sm:max-w-[80px]"
            width={80}
            height={56}
            decoding="async"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-xl font-bold text-maroon-900 sm:text-2xl">
              Vasant Valley
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-700 sm:text-sm">
              School
            </span>
          </span>
        </a>

        {/* ── Desktop pill nav ────────────────────────────────────────
             Maroon-900 pill container; each nav item is its own
             sandstone-50 pill with a GSAP rising-circle hover effect.
        ──────────────────────────────────────────────────────────── */}
        <div
          ref={navBarRef}
          className="hidden items-center gap-2 rounded-full p-1.5 lg:flex"
          style={{ background: BASE_COLOR, minHeight: "48px" }}
          role="menubar"
          aria-label="Site sections"
        >
          <ul
            role="none"
            className="m-0 flex h-full list-none items-stretch gap-2 p-0"
          >
            {navItems.map((item) => {
              // Extract section ID from href (e.g., "#main-content" -> "main-content")
              const sectionId = item.href?.startsWith("#") ? item.href.slice(1) : item.id;
              return (
                <NavPill
                  key={item.id}
                  item={item}
                  isActive={activeSection === sectionId}
                />
              );
            })}
          </ul>
        </div>

        {/* ── Action buttons (search, login, hamburger) ────────────── */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSearchOpen}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-heritage text-maroon-700 hover:bg-maroon-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-500"
            aria-label="Open search"
          >
            <MagnifyingGlass size={22} weight="bold" />
          </button>

          <button
            type="button"
            onClick={onLoginOpen}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-heritage text-maroon-700 hover:bg-maroon-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-500"
            aria-label="Open login"
          >
            <SignIn size={22} weight="bold" />
          </button>

          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-heritage text-maroon-700 hover:bg-maroon-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-500 lg:hidden"
            aria-label="Open menu"
            aria-haspopup="dialog"
          >
            <List size={24} weight="bold" />
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer (focus-trapped, Escape closes) ───────────── */}
      {isDrawerOpen ? (
        <div
          className="fixed inset-0 z-50 bg-ink-900/35 lg:hidden"
          role="presentation"
          onClick={(e) => { if (e.target === e.currentTarget) closeDrawer(); }}
        >
          <div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
            className="ml-auto flex h-[100dvh] w-full max-w-sm flex-col bg-sandstone-50 p-5 shadow-soft"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="mobile-menu-title" className="text-3xl">
                  Menu
                </h2>
                <div className="mt-3 flex items-center gap-3">
                  <img
                    src="/logo.svg"
                    alt=""
                    className="h-11 w-auto max-w-[64px] shrink-0 object-contain"
                    width={64}
                    height={44}
                    decoding="async"
                  />
                  <span className="flex flex-col leading-tight">
                    <span className="font-serif text-xl font-bold text-maroon-900">
                      Vasant Valley
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-700">
                      School
                    </span>
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-heritage text-maroon-700 hover:bg-maroon-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-500"
                aria-label="Close menu"
              >
                <X size={22} weight="bold" />
              </button>
            </div>

            <nav className="mt-8 grid gap-2" aria-label="Mobile navigation">
              {allLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={closeDrawer}
                  className={`rounded-heritage border px-4 py-3 font-semibold no-underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-500 ${activeSection === item.id
                      ? "border-maroon-300 bg-maroon-50 text-maroon-900"
                      : "border-sandstone-200 bg-white text-ink-900 hover:border-maroon-100 hover:bg-maroon-50 hover:text-maroon-700"
                    }`}
                  aria-current={activeSection === item.id ? "page" : undefined}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Login shortcut inside drawer */}
            <div className="mt-auto border-t border-sandstone-200 pt-6 flex gap-3">
              <button
                type="button"
                onClick={() => { closeDrawer(); onLoginOpen(); }}
                className="flex-1 rounded-heritage bg-maroon-700 px-4 py-3 font-semibold text-white hover:bg-maroon-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-500"
              >
                Student Login
              </button>
              <button
                type="button"
                onClick={() => { closeDrawer(); onLoginOpen(); }}
                className="flex-1 rounded-heritage border border-maroon-700 px-4 py-3 font-semibold text-maroon-700 hover:bg-maroon-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-500"
              >
                Parent Login
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}