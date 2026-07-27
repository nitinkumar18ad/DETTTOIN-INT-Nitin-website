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
  Scales,
  House
} from "@phosphor-icons/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
    closeDrawer();
    if (onNavigate) onNavigate("faq");
  };

  const handleAnnouncementClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsNewsHovered(false);
    closeDrawer();
    if (onNavigate) onNavigate("announcement");
  };

  const handleVisionClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsValuesHovered(false);
    setIsAboutHovered(false);
    closeDrawer();
    if (onNavigate) onNavigate("vision");
  };

  const handleHomeClick = (e, href) => {
    closeDrawer();
    if (onNavigate) onNavigate("home");
  };

  const dropdownItemClasses = "flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-wider text-maroon-950 font-sans hover:bg-maroon-50 hover:text-maroon-900 transition-colors group no-underline cursor-pointer select-none";

  return (
    <header className="sticky top-0 z-40 border-b border-white/30 bg-white/50 backdrop-blur-lg shadow-sm w-full">
      <nav
        aria-label="Primary navigation"
        className="mx-auto flex min-h-16 sm:min-h-20 max-w-7xl items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6 lg:px-8 w-full"
      >
        {/* ── Logo ──────────────────────────────────────────────────── */}
        <a
          href="#main-content"
          onClick={(e) => handleHomeClick(e, "#main-content")}
          className="flex flex-shrink items-center gap-2 sm:gap-3 no-underline cursor-pointer min-w-0"
          aria-label="Vasant Valley School — home"
        >
          <img
            src="/logo.svg"
            alt=""
            className="h-10 sm:h-14 w-auto max-w-[56px] sm:max-w-[80px] shrink-0 object-contain object-left"
            width={80}
            height={56}
            decoding="async"
          />
          <span className="flex flex-col leading-tight min-w-0">
            <span className="font-serif text-base sm:text-2xl font-bold text-maroon-900 truncate">
              Vasant Valley
            </span>
            <span className="text-[9px] sm:text-sm font-semibold uppercase tracking-[0.14em] text-ink-700 truncate">
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
                          <span>Core Values</span>
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
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={onSearchOpen}
            className="inline-flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-heritage text-maroon-700 hover:bg-maroon-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-500 cursor-pointer"
            aria-label="Open search"
          >
            <MagnifyingGlass size={20} weight="bold" />
          </button>

          <button
            type="button"
            onClick={onLoginOpen}
            className="inline-flex h-9 sm:h-10 items-center justify-center gap-1.5 rounded-full bg-maroon-900 px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-maroon-800 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-500 cursor-pointer"
            aria-label="Open login modal"
          >
            <User size={15} weight="bold" />
            <span className="hidden sm:inline whitespace-nowrap">Login</span>
          </button>

          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="inline-flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-heritage text-maroon-700 hover:bg-maroon-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-500 lg:hidden cursor-pointer"
            aria-label="Open menu"
            aria-expanded={isDrawerOpen}
          >
            <List size={22} weight="bold" />
          </button>
        </div>

      </nav>

      {/* ── React Portal Side Slide-Over Mobile Drawer Menu ─────────────── */}
      {isDrawerOpen &&
        createPortal(
          <div className="fixed inset-0 z-[999] lg:hidden">
            
            {/* Semi-transparent Backdrop Overlay */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
              onClick={closeDrawer}
              aria-hidden="true"
            />

            {/* Right Side Panel (80vw width / max 300px) */}
            <div
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation Menu"
              className="fixed inset-y-0 right-0 z-[1000] flex w-[80vw] max-w-[300px] flex-col bg-sandstone-50 shadow-2xl transition-transform duration-300 ease-out overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 z-20 flex items-center justify-between border-b border-sandstone-200 bg-sandstone-50/95 backdrop-blur-md px-4 py-3.5 shrink-0">
                <span className="font-serif text-lg font-bold text-maroon-950 flex items-center gap-2">
                  <img src="/logo.svg" alt="" className="h-6 w-auto" />
                  <span>Menu</span>
                </span>
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="rounded-full p-1.5 text-ink-800 hover:bg-sandstone-200 focus-visible:outline-none cursor-pointer"
                  aria-label="Close menu"
                >
                  <X size={22} weight="bold" />
                </button>
              </div>

              {/* All Options Listed Vertically Below Menu */}
              <div className="p-4 space-y-4 flex-1 w-full">
                
                {/* 1. Home */}
                <div>
                  <a
                    href="#main-content"
                    onClick={(e) => handleHomeClick(e, "#main-content")}
                    className="flex items-center gap-3 rounded-2xl bg-white px-3.5 py-3 font-bold text-xs uppercase tracking-wider text-maroon-950 border border-sandstone-200 shadow-xs no-underline"
                  >
                    <House size={18} weight="bold" className="text-maroon-700" />
                    <span>Home Page</span>
                  </a>
                </div>

                {/* 2. About Us Section */}
                <div className="space-y-1">
                  <span className="px-2 text-[10px] font-extrabold uppercase tracking-widest text-maroon-800 block">
                    About Us & Foundation
                  </span>
                  <div className="bg-white rounded-2xl border border-sandstone-200 overflow-hidden divide-y divide-sandstone-100">
                    <a
                      href="#about"
                      onClick={(e) => handleHomeClick(e, "#about")}
                      className="flex items-center justify-between px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-maroon-950 hover:bg-maroon-50 no-underline"
                    >
                      <span className="flex items-center gap-2.5">
                        <Compass size={16} weight="bold" className="text-maroon-700 shrink-0" />
                        <span>Overview & Campus</span>
                      </span>
                      <ArrowUpRight size={13} weight="bold" className="text-ink-400" />
                    </a>

                    <a
                      href="#faq"
                      onClick={handleFaqClick}
                      className="flex items-center justify-between px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-maroon-950 hover:bg-maroon-50 no-underline cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        <Question size={16} weight="bold" className="text-maroon-700 shrink-0" />
                        <span>FAQ Section</span>
                      </span>
                      <ArrowUpRight size={13} weight="bold" className="text-ink-400" />
                    </a>
                  </div>
                </div>

                {/* 3. Core Values Section */}
                <div className="space-y-1">
                  <span className="px-2 text-[10px] font-extrabold uppercase tracking-widest text-maroon-800 block">
                    Ethos & Philosophy
                  </span>
                  <div className="bg-white rounded-2xl border border-sandstone-200 overflow-hidden divide-y divide-sandstone-100">
                    <a
                      href="#values"
                      onClick={(e) => handleHomeClick(e, "#values")}
                      className="flex items-center justify-between px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-maroon-950 hover:bg-maroon-50 no-underline"
                    >
                      <span className="flex items-center gap-2.5">
                        <Scales size={16} weight="bold" className="text-maroon-700 shrink-0" />
                        <span>Core Values</span>
                      </span>
                      <ArrowUpRight size={13} weight="bold" className="text-ink-400" />
                    </a>

                    <a
                      href="#vision-philosophy"
                      onClick={handleVisionClick}
                      className="flex items-center justify-between px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-maroon-950 bg-maroon-50/70 hover:bg-maroon-100/70 no-underline cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        <Lightbulb size={16} weight="bold" className="text-maroon-700 shrink-0" />
                        <span>Vision & Philosophy</span>
                      </span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-maroon-900 text-white">NEW</span>
                    </a>
                  </div>
                </div>

                {/* 4. News & Events Section */}
                <div className="space-y-1">
                  <span className="px-2 text-[10px] font-extrabold uppercase tracking-widest text-maroon-800 block">
                    Updates & Life
                  </span>
                  <div className="bg-white rounded-2xl border border-sandstone-200 overflow-hidden divide-y divide-sandstone-100">
                    <a
                      href="#news-events"
                      onClick={(e) => handleHomeClick(e, "#news-events")}
                      className="flex items-center justify-between px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-maroon-950 hover:bg-maroon-50 no-underline"
                    >
                      <span className="flex items-center gap-2.5">
                        <NewspaperClipping size={16} weight="bold" className="text-maroon-700 shrink-0" />
                        <span>Timeline & Events</span>
                      </span>
                      <ArrowUpRight size={13} weight="bold" className="text-ink-400" />
                    </a>

                    <a
                      href="#announcements"
                      onClick={handleAnnouncementClick}
                      className="flex items-center justify-between px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-maroon-950 hover:bg-maroon-50 no-underline cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        <Megaphone size={16} weight="bold" className="text-maroon-700 shrink-0" />
                        <span>Announcements</span>
                      </span>
                      <ArrowUpRight size={13} weight="bold" className="text-ink-400" />
                    </a>
                  </div>
                </div>

                {/* 5. Official Social Channels */}
                <div className="space-y-1 pt-1">
                  <span className="px-2 text-[10px] font-extrabold uppercase tracking-widest text-maroon-800 block">
                    Social Media Links
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {SOCIAL_LINKS.map((soc) => {
                      const Icon = soc.icon;
                      return (
                        <a
                          key={soc.name}
                          href={soc.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-sandstone-200 text-[11px] font-bold text-maroon-950 hover:bg-maroon-50 no-underline shadow-xs"
                        >
                          <span className="flex items-center gap-2">
                            <Icon size={16} weight="fill" className={soc.colorClass} />
                            <span>{soc.name}</span>
                          </span>
                          <ArrowUpRight size={11} weight="bold" className="text-ink-400" />
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* 6. Quick Action Portals (Search & Login) */}
                <div className="pt-2 space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      closeDrawer();
                      onSearchOpen();
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-white p-2.5 text-xs font-bold uppercase tracking-wider text-maroon-900 border border-sandstone-200 shadow-xs cursor-pointer"
                  >
                    <MagnifyingGlass size={16} weight="bold" />
                    <span>Search Website</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      closeDrawer();
                      onLoginOpen();
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-maroon-900 p-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-maroon-800 cursor-pointer"
                  >
                    <User size={16} weight="bold" />
                    <span>Portal Login</span>
                  </button>
                </div>

              </div>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
}