import { gsap } from "gsap";
import {
  List,
  MagnifyingGlass,
  User,
  X,
  Question,
  Compass,
  CaretDown,
  Megaphone,
  NewspaperClipping,
  InstagramLogo,
  FacebookLogo,
  LinkedinLogo,
  YoutubeLogo,
  ArrowUpRight,
  Lightbulb,
  Scales
} from "@phosphor-icons/react";
import { useCallback, useEffect, useRef, useState } from "react";
import useFocusTrap from "../hooks/useFocusTrap.js";
import useScrollSpy from "../hooks/useScrollSpy.js";

/* ─── Theme tokens (match tailwind.config.js) ─────────────────────────── */
const BASE_COLOR = "#3f0d0f";
const HOVER_TEXT = "#ffffff";
const EASE = "power3.out";

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/Vasantvalleyschoolofficial/",
    icon: FacebookLogo,
    colorClass: "text-[#1877F2]"
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/school/vasant-valley-school/?originalSubdomain=in",
    icon: LinkedinLogo,
    colorClass: "text-[#0A66C2]"
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UCRXNIQzX175MX9hMVRWjmaA",
    icon: YoutubeLogo,
    colorClass: "text-[#FF0000]"
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/vasantvalleyoffici",
    icon: InstagramLogo,
    colorClass: "text-[#E4405F]"
  }
];

/* ─── Helpers ──────────────────────────────────────────────────────────── */
function flattenNav(navItems) {
  return navItems.flatMap((item) => [item, ...(item.children || [])]);
}

function computeCircleGeometry(w, h) {
  const R = ((w * w) / 4 + h * h) / (2 * h);
  const D = Math.ceil(2 * R) + 2;
  const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
  const originY = D - delta;
  return { D, delta, originY };
}

/* ─── Single animated pill ────────────────────────────────────────────── */
function NavPill({ item, isActive, onClick, hasDropdown }) {
  const pillRef = useRef(null);
  const circleRef = useRef(null);
  const labelRef = useRef(null);
  const hoverLabelRef = useRef(null);
  const tlRef = useRef(null);
  const activeTweenRef = useRef(null);

  const isActiveRef = useRef(isActive);
  useEffect(() => {
    isActiveRef.current = isActive;
  }, [isActive]);

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
    if (!w || !h) return undefined;

    const { D, delta, originY } = computeCircleGeometry(w, h);

    circle.style.width = `${D}px`;
    circle.style.height = `${D}px`;
    circle.style.bottom = `-${delta}px`;

    gsap.set(circle, {
      xPercent: -50,
      scale: 0,
      transformOrigin: `50% ${originY}px`,
      display: "block",
    });

    if (label) gsap.set(label, { y: 0 });
    if (hoverLabel) gsap.set(hoverLabel, { y: Math.ceil(h + 20), opacity: 0 });

    tlRef.current?.kill();
    const tl = gsap.timeline({ paused: true });

    tl.to(circle, {
      scale: 1.2,
      duration: 0.4,
      ease: EASE,
      overwrite: "auto",
    }, 0);

    if (label) {
      tl.to(label, {
        y: -Math.ceil(h + 20),
        duration: 0.4,
        ease: EASE,
        overwrite: "auto",
      }, 0);
    }

    if (hoverLabel) {
      tl.to(hoverLabel, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: EASE,
        overwrite: "auto",
      }, 0);
    }
    tlRef.current = tl;

    if (isActiveRef.current) {
      tl.progress(1);
    }

    return () => {
      tl.kill();
    };
  }, [item.id]);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    activeTweenRef.current?.kill();

    if (isActive) {
      activeTweenRef.current = tl.tweenTo(tl.duration(), {
        duration: 0.35,
        ease: EASE,
        overwrite: "auto",
      });
    } else {
      activeTweenRef.current = tl.tweenTo(0, {
        duration: 0.25,
        ease: EASE,
        overwrite: "auto",
      });
    }
  }, [isActive]);

  const handleEnter = useCallback(() => {
    if (isActive) return;
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
    <li role="none" className="flex items-center relative">
      <a
        ref={pillRef}
        role="menuitem"
        href={item.href}
        onClick={onClick}
        aria-label={item.ariaLabel || item.label}
        aria-current={isActive ? "page" : undefined}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onFocus={handleEnter}
        onBlur={handleLeave}
        className={`pill-nav-link relative inline-flex h-10 self-center items-center justify-center overflow-hidden rounded-full px-5 text-sm font-semibold uppercase tracking-wider no-underline select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-maroon-900 bg-white hover:bg-white ${
          isActive ? "text-maroon-900" : "text-ink-900"
        }`}
      >
        <span
          ref={circleRef}
          className="absolute left-1/2 bottom-0 rounded-full pointer-events-none z-1 block"
          style={{ background: BASE_COLOR, willChange: "transform" }}
          aria-hidden="true"
        />

        <span className="label-stack relative inline-flex items-center gap-1 leading-none z-[2] overflow-hidden py-0.5">
          <span
            ref={labelRef}
            className="pill-label relative inline-flex items-center gap-1 z-[2]"
            style={{ willChange: "transform" }}
          >
            {item.label}
            {hasDropdown && <CaretDown size={12} weight="bold" className="mt-0.5" />}
          </span>
          <span
            ref={hoverLabelRef}
            className="pill-label-hover absolute left-0 top-1 inline-flex items-center justify-center gap-1 w-full text-center z-[3]"
            style={{ color: HOVER_TEXT, willChange: "transform, opacity" }}
            aria-hidden="true"
          >
            {item.label}
            {hasDropdown && <CaretDown size={12} weight="bold" className="mt-0.5" />}
          </span>
        </span>
      </a>
    </li>
  );
}

/* ─── Main Navbar ───────────────────────────────────────────────────────── */
export default function Navbar({
  navItems = [],
  onSearchOpen,
  onLoginOpen,
  activeSection: activeSectionProp,
  currentPage = "home",
  onNavigate
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const [isValuesHovered, setIsValuesHovered] = useState(false);
  const [isNewsHovered, setIsNewsHovered] = useState(false);
  const [isSocialsHovered, setIsSocialsHovered] = useState(false);

  const hoverAboutTimerRef = useRef(null);
  const hoverValuesTimerRef = useRef(null);
  const hoverNewsTimerRef = useRef(null);
  const hoverSocialsTimerRef = useRef(null);

  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);
  const drawerRef = useFocusTrap(isDrawerOpen, closeDrawer);
  const allLinks = flattenNav(navItems);

  const sectionIds = navItems.map((item) => item.href?.replace("#", "")).filter(Boolean);
  const activeSectionSpy = useScrollSpy({ sectionIds });
  const activeSection = currentPage === "home" ? (activeSectionProp ?? activeSectionSpy) : null;

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isDrawerOpen]);

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
  }, [navItems.length]);

  const handleAboutMouseEnter = () => {
    if (hoverAboutTimerRef.current) clearTimeout(hoverAboutTimerRef.current);
    setIsAboutHovered(true);
  };

  const handleAboutMouseLeave = () => {
    hoverAboutTimerRef.current = setTimeout(() => {
      setIsAboutHovered(false);
    }, 180);
  };

  const handleValuesMouseEnter = () => {
    if (hoverValuesTimerRef.current) clearTimeout(hoverValuesTimerRef.current);
    setIsValuesHovered(true);
  };

  const handleValuesMouseLeave = () => {
    hoverValuesTimerRef.current = setTimeout(() => {
      setIsValuesHovered(false);
    }, 180);
  };

  const handleNewsMouseEnter = () => {
    if (hoverNewsTimerRef.current) clearTimeout(hoverNewsTimerRef.current);
    setIsNewsHovered(true);
  };

  const handleNewsMouseLeave = () => {
    hoverNewsTimerRef.current = setTimeout(() => {
      setIsNewsHovered(false);
    }, 180);
  };

  const handleSocialsMouseEnter = () => {
    if (hoverSocialsTimerRef.current) clearTimeout(hoverSocialsTimerRef.current);
    setIsSocialsHovered(true);
  };

  const handleSocialsMouseLeave = () => {
    hoverSocialsTimerRef.current = setTimeout(() => {
      setIsSocialsHovered(false);
    }, 180);
  };

  const handleFaqClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsAboutHovered(false);
    if (onNavigate) onNavigate("faq");
  };

  const handleAnnouncementClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsNewsHovered(false);
    if (onNavigate) onNavigate("announcement");
  };

  const handleVisionClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsValuesHovered(false);
    setIsAboutHovered(false);
    if (onNavigate) onNavigate("vision");
  };

  const handleHomeClick = (e, href) => {
    if (onNavigate) onNavigate("home");
  };

  const dropdownItemClasses = "flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-wider text-maroon-950 font-sans hover:bg-maroon-50 hover:text-maroon-900 transition-colors group no-underline cursor-pointer select-none";

  return (
    <header className="sticky top-0 z-40 border-b border-white/30 bg-white/40 backdrop-blur-lg shadow-sm">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        {/* ── Logo ──────────────────────────────────────────────────── */}
        <a
          href="#main-content"
          onClick={(e) => handleHomeClick(e, "#main-content")}
          className="flex flex-shrink-0 items-center gap-3 no-underline cursor-pointer"
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

        {/* ── Desktop Pill Nav ──────────────────────────────────────── */}
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
              const sectionId = item.href?.startsWith("#") ? item.href.slice(1) : item.id;
              const isAbout = item.id === "about";
              const isValues = item.id === "values";
              const isNews = item.id === "news-events";
              const isSocials = item.id === "instagram-feed";
              const isActive = currentPage === "home" && activeSection === sectionId;

              if (isAbout) {
                return (
                  <div
                    key={item.id}
                    className="relative flex items-center"
                    onMouseEnter={handleAboutMouseEnter}
                    onMouseLeave={handleAboutMouseLeave}
                  >
                    <NavPill
                      item={item}
                      isActive={isActive}
                      hasDropdown={true}
                      onClick={(e) => handleHomeClick(e, item.href)}
                    />

                    {/* Minimal About Us Hover Dropdown Menu */}
                    {isAboutHovered && (
                      <div className="absolute top-full left-0 mt-2 w-48 rounded-2xl bg-white/95 backdrop-blur-xl border border-sandstone-200/90 shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        <a
                          href="#about"
                          onClick={(e) => {
                            setIsAboutHovered(false);
                            handleHomeClick(e, "#about");
                          }}
                          className={dropdownItemClasses}
                        >
                          <Compass size={16} weight="bold" className="text-maroon-700 shrink-0" />
                          <span>Overview</span>
                        </a>

                        <a
                          href="#faq"
                          onClick={handleFaqClick}
                          onPointerDown={handleFaqClick}
                          className={dropdownItemClasses}
                        >
                          <Question size={16} weight="bold" className="text-maroon-700 shrink-0" />
                          <span>FAQ Section</span>
                        </a>
                      </div>
                    )}
                  </div>
                );
              }

              if (isValues) {
                return (
                  <div
                    key={item.id}
                    className="relative flex items-center"
                    onMouseEnter={handleValuesMouseEnter}
                    onMouseLeave={handleValuesMouseLeave}
                  >
                    <NavPill
                      item={item}
                      isActive={isActive}
                      hasDropdown={true}
                      onClick={(e) => handleHomeClick(e, item.href)}
                    />

                    {/* Minimal Core Values Hover Dropdown Menu */}
                    {isValuesHovered && (
                      <div className="absolute top-full left-0 mt-2 w-56 rounded-2xl bg-white/95 backdrop-blur-xl border border-sandstone-200/90 shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        <a
                          href="#values"
                          onClick={(e) => {
                            setIsValuesHovered(false);
                            handleHomeClick(e, "#values");
                          }}
                          className={dropdownItemClasses}
                        >
                          <Scales size={16} weight="bold" className="text-maroon-700 shrink-0" />
                          <span>8 Canonical Ethos</span>
                        </a>

                        <a
                          href="#vision-philosophy"
                          onClick={handleVisionClick}
                          onPointerDown={handleVisionClick}
                          className={dropdownItemClasses}
                        >
                          <Lightbulb size={16} weight="bold" className="text-maroon-700 shrink-0" />
                          <span>Vision & Philosophy</span>
                        </a>
                      </div>
                    )}
                  </div>
                );
              }

              if (isNews) {
                return (
                  <div
                    key={item.id}
                    className="relative flex items-center"
                    onMouseEnter={handleNewsMouseEnter}
                    onMouseLeave={handleNewsMouseLeave}
                  >
                    <NavPill
                      item={item}
                      isActive={isActive}
                      hasDropdown={true}
                      onClick={(e) => handleHomeClick(e, item.href)}
                    />

                    {/* Minimal News & Events Hover Dropdown Menu */}
                    {isNewsHovered && (
                      <div className="absolute top-full left-0 mt-2 w-52 rounded-2xl bg-white/95 backdrop-blur-xl border border-sandstone-200/90 shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        <a
                          href="#news-events"
                          onClick={(e) => {
                            setIsNewsHovered(false);
                            handleHomeClick(e, "#news-events");
                          }}
                          className={dropdownItemClasses}
                        >
                          <NewspaperClipping size={16} weight="bold" className="text-maroon-700 shrink-0" />
                          <span>Timeline & Events</span>
                        </a>

                        <a
                          href="#announcements"
                          onClick={handleAnnouncementClick}
                          onPointerDown={handleAnnouncementClick}
                          className={dropdownItemClasses}
                        >
                          <Megaphone size={16} weight="bold" className="text-maroon-700 shrink-0" />
                          <span>Announcements</span>
                        </a>
                      </div>
                    )}
                  </div>
                );
              }

              if (isSocials) {
                return (
                  <div
                    key={item.id}
                    className="relative flex items-center"
                    onMouseEnter={handleSocialsMouseEnter}
                    onMouseLeave={handleSocialsMouseLeave}
                  >
                    <NavPill
                      item={item}
                      isActive={isActive}
                      hasDropdown={true}
                      onClick={(e) => handleHomeClick(e, item.href)}
                    />

                    {/* Minimal Socials Hover Dropdown Menu */}
                    {isSocialsHovered && (
                      <div className="absolute top-full right-0 mt-2 w-52 rounded-2xl bg-white/95 backdrop-blur-xl border border-sandstone-200/90 shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        {SOCIAL_LINKS.map((soc) => {
                          const Icon = soc.icon;
                          return (
                            <a
                              key={soc.name}
                              href={soc.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setIsSocialsHovered(false)}
                              className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-wider text-maroon-950 font-sans hover:bg-maroon-50 transition-colors group no-underline select-none cursor-pointer"
                            >
                              <span className="flex items-center gap-2.5">
                                <Icon size={18} weight="fill" className={`${soc.colorClass} shrink-0`} />
                                <span>{soc.name}</span>
                              </span>
                              <ArrowUpRight size={14} weight="bold" className="text-ink-400 group-hover:text-maroon-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <NavPill
                  key={item.id}
                  item={item}
                  isActive={isActive}
                  onClick={(e) => handleHomeClick(e, item.href)}
                />
              );
            })}
          </ul>
        </div>

        {/* ── Action Buttons (Search, Login, Hamburger) ────────────── */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSearchOpen}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-heritage text-maroon-700 hover:bg-maroon-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-500 cursor-pointer"
            aria-label="Open search"
          >
            <MagnifyingGlass size={22} weight="bold" />
          </button>

          <button
            type="button"
            onClick={onLoginOpen}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-maroon-900 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-maroon-800 hover:shadow-lg active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-500 focus-visible:ring-offset-2 cursor-pointer"
            aria-label="Open login modal"
          >
            <User size={16} weight="bold" />
            <span className="whitespace-nowrap">Login</span>
          </button>

          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-heritage text-maroon-700 hover:bg-maroon-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-500 lg:hidden cursor-pointer"
            aria-label="Open menu"
            aria-expanded={isDrawerOpen}
          >
            <List size={24} weight="bold" />
          </button>
        </div>

      </nav>

      {/* ── Mobile Drawer Menu ────────────────────────────────────── */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={closeDrawer}
            aria-hidden="true"
          />

          <div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            className="fixed inset-y-0 right-0 flex w-full max-w-sm flex-col bg-sandstone-50 p-6 shadow-2xl transition-transform"
          >
            <div className="flex items-center justify-between border-b border-sandstone-200 pb-4">
              <span className="font-serif text-lg font-bold text-maroon-900">Menu</span>
              <button
                type="button"
                onClick={closeDrawer}
                className="rounded-heritage p-2 text-ink-700 hover:bg-sandstone-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-500 cursor-pointer"
                aria-label="Close menu"
              >
                <X size={24} weight="bold" />
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="mt-6 flex-1 overflow-y-auto">
              <ul className="flex flex-col gap-2">
                {allLinks.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        closeDrawer();
                        handleHomeClick(e, item.href);
                      }}
                      className="block rounded-heritage px-4 py-3 font-semibold uppercase tracking-wider text-ink-900 hover:bg-maroon-50 hover:text-maroon-700 no-underline"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                
                {/* Mobile Vision & Philosophy Link */}
                <li className="pt-2 border-t border-sandstone-200">
                  <a
                    href="#vision-philosophy"
                    onClick={(e) => {
                      closeDrawer();
                      handleVisionClick(e);
                    }}
                    className="flex items-center justify-between rounded-heritage px-4 py-3 font-semibold uppercase tracking-wider text-maroon-900 bg-maroon-50 hover:bg-maroon-100 no-underline cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Lightbulb size={18} weight="bold" />
                      <span>Vision & Philosophy</span>
                    </span>
                  </a>
                </li>

                {/* Mobile FAQ Link */}
                <li>
                  <a
                    href="#faq"
                    onClick={(e) => {
                      closeDrawer();
                      handleFaqClick(e);
                    }}
                    className="flex items-center justify-between rounded-heritage px-4 py-3 font-semibold uppercase tracking-wider text-maroon-900 bg-maroon-50 hover:bg-maroon-100 no-underline cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Question size={18} weight="bold" />
                      <span>FAQ Page</span>
                    </span>
                  </a>
                </li>

                {/* Mobile Announcement Link */}
                <li>
                  <a
                    href="#announcements"
                    onClick={(e) => {
                      closeDrawer();
                      handleAnnouncementClick(e);
                    }}
                    className="flex items-center justify-between rounded-heritage px-4 py-3 font-semibold uppercase tracking-wider text-maroon-900 bg-maroon-50 hover:bg-maroon-100 no-underline cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Megaphone size={18} weight="bold" />
                      <span>Announcements</span>
                    </span>
                  </a>
                </li>

                {/* Mobile Social Channels */}
                <li className="pt-3 border-t border-sandstone-200">
                  <span className="px-4 text-[10px] font-extrabold uppercase tracking-widest text-maroon-800 block mb-2">
                    Official Social Channels
                  </span>
                  <div className="grid grid-cols-2 gap-2 px-2">
                    {SOCIAL_LINKS.map((soc) => {
                      const Icon = soc.icon;
                      return (
                        <a
                          key={soc.name}
                          href={soc.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-sandstone-200 text-xs font-bold text-maroon-950 hover:bg-maroon-50 no-underline"
                        >
                          <Icon size={18} weight="fill" className={soc.colorClass} />
                          <span>{soc.name}</span>
                        </a>
                      );
                    })}
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}