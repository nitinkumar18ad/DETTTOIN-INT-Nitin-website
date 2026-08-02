import { useCallback, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import LoginModal from "./components/LoginModal.jsx";
import Navbar from "./components/Navbar.jsx";
import SearchOverlay from "./components/SearchOverlay.jsx";
import MainHero from "./components/MainHero.jsx";
import MissionBlock from "./components/MissionBlock.jsx";
import SplitFeature from "./components/SplitFeature.jsx";
import ValueWheel from "./components/ValueWheel.jsx";
import NewsTimeline from "./components/NewsTimeline.jsx";
import InstagramFeed from "./components/InstagramFeed.jsx";
import Footer from "./components/Footer.jsx";
import FaqPage from "./components/FaqPage.jsx";
import AnnouncementPage from "./components/AnnouncementPage.jsx";
import VisionPhilosophyPage from "./components/VisionPhilosophyPage.jsx";
import SkeletonLoader from "./components/SkeletonLoader.jsx";
import useScrollSpy from "./hooks/useScrollSpy.js";

const fallbackNavItems = [
  { id: "main-content", label: "Home", href: "#main-content", children: [] },
  { id: "about", label: "About Us", href: "#about", children: [] },
  { id: "values", label: "Core Values", href: "#values", children: [] },
  { id: "news-events", label: "News & Events", href: "#news-events", children: [] },
  { id: "instagram-feed", label: "Socials", href: "#instagram-feed", children: [] }
];

function sanitizeNavItems(items) {
  return items?.length ? items : fallbackNavItems;
}

const fallbackValues = [
  { id: "cerebral", label: "Cerebral", description: "Curiosity, reflection, and disciplined thought.", icon: "brain" },
  { id: "social", label: "Social", description: "Respectful participation in class, house, and community life.", icon: "users" },
  { id: "physical", label: "Physical", description: "Health, movement, resilience, and confidence through sport.", icon: "heartbeat" },
  { id: "spiritual", label: "Spiritual", description: "Inner steadiness, reflection, and a sense of purpose.", icon: "compass" },
  { id: "emotional", label: "Emotional", description: "Self-awareness, empathy, and thoughtful relationships.", icon: "heart" },
  { id: "environmental", label: "Environmental", description: "Care for nature and responsibility toward shared resources.", icon: "leaf" },
  { id: "creative", label: "Creative", description: "Expression through art, performance, writing, and design.", icon: "palette" },
  { id: "ethical", label: "Ethical", description: "Integrity, fairness, and excellence in deed.", icon: "scales" }
];

const fallbackNewsEvents = [
  {
    id: "founders-day",
    type: "event",
    title: "Founder's Day Celebration",
    date: "2026-04-18",
    month: "April",
    year: 2026,
    category: "School Events",
    summary: "The school community gathers to mark Founder's Day with ceremonial speeches, alumni honors, and symphonic performances celebrating Vasant Valley's founding heritage.",
    highlights: ["Alumni Honors", "Symphonic Band", "Heritage Address"],
    image: "/images/news/founders-day.jpg",
    href: "#"
  },
  {
    id: "science-week",
    type: "news",
    title: "Annual Science & Tech Fair",
    date: "2026-03-12",
    month: "March",
    year: 2026,
    category: "Academics",
    summary: "Students present hands-on experiments, robotics prototypes, and environmental research displays. Interactive workshops featured live science demonstrations led by senior scholars.",
    highlights: ["120+ Projects", "Robotics Expo", "Green Tech"],
    image: "/images/news/science-week.jpg",
    href: "#"
  },
  {
    id: "junior-school-assembly",
    type: "event",
    title: "Junior School Grand Assembly",
    date: "2026-02-20",
    month: "February",
    year: 2026,
    category: "Assemblies",
    summary: "The junior school shares music, choral readings, and creative class drama presentations celebrating empathy, community responsibility, and teamwork.",
    highlights: ["Choral Ensemble", "Class Drama", "Student Badges"],
    image: "/images/news/junior-assembly.jpg",
    href: "#"
  },
  {
    id: "sports-day",
    type: "event",
    title: "Annual Athletics & Sports Meet",
    date: "2026-01-28",
    month: "January",
    year: 2026,
    category: "Sports",
    summary: "Track, field, and inter-house athletics bring the entire school together on the sports ground. Students compete for house glory with determination and sportsmanship.",
    highlights: ["Inter-House Cup", "Sprint Finals", "March Past"],
    image: "/images/news/sports-day.jpg",
    href: "#"
  },
  {
    id: "library-week",
    type: "news",
    title: "Literary & Book Week",
    date: "2025-11-16",
    month: "November",
    year: 2025,
    category: "Academics",
    summary: "Author interactions, poetry slams, and book illustration contests inspire a love for reading and narrative storytelling throughout the school.",
    highlights: ["Author Talks", "Poetry Slam", "Book Fair"],
    image: "/images/news/library-week.jpg",
    href: "#"
  }
];

const featuresData = [
  {
    id: "campus-life",
    category: "Life at Vasant Valley",
    heading: "A Vibrant Community Built on Trust and Reflection",
    body: "Our campus provides a welcoming environment where students explore their interests across academics, arts, robotics, and athletics. Every learner is encouraged to voice ideas, collaborate across age groups, and grow with confidence.",
    linkText: "Explore our campus community",
    linkHref: "#about",
    image: "/images/features/about.svg",
    alt: "Vasant Valley campus buildings and greenery illustration",
    isReversed: false,
    bgColor: "bg-sandstone-50"
  },
  {
    id: "infrastructure",
    category: "Infrastructure & Spaces",
    heading: "Designed to Foster Focus, Curiosity, and Health",
    body: "From quiet library reading nooks and specialized science laboratories to spacious athletic fields, our facilities support deep study, creative work, and active play in a green, sustainable setting.",
    linkText: "Discover campus facilities",
    linkHref: "#infrastructure",
    image: "/images/features/infrastructure.svg",
    alt: "Modern school architecture and green campus trees illustration",
    isReversed: true,
    bgColor: "bg-[#f4efe6]"
  },
  {
    id: "academic-model",
    category: "Pedagogy & Growth",
    heading: "Inquiry, Creativity, and Critical Thought",
    body: "We believe in a curriculum that goes beyond rote memorization. Through project-based learning, interactive seminars, and robust co-curricular programs, students build the skills to solve real-world problems and adapt to a changing world.",
    linkText: "Our academic model",
    linkHref: "#learning",
    image: "/images/features/learning.svg",
    alt: "Discovery flask and green leaves illustration",
    isReversed: false,
    bgColor: "bg-white"
  }
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("home"); // "home" | "faq" | "announcement" | "vision"
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const lenisRef = useRef(null);
  const navItems = sanitizeNavItems(fallbackNavItems);
  const values = fallbackValues;
  const newsEvents = fallbackNewsEvents;

  // WhatsApp-style 1.0s initial loading splash while page pre-loads in background
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const sectionIds = [
    "main-content",
    "about",
    "values",
    "news-events",
    "instagram-feed",
    "footer"
  ];

  const activeSection = useScrollSpy({ sectionIds });

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return undefined;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    let animationFrameId;

    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute("href");
      if (href?.startsWith("#") && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target);
        }
      }
    };

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach((link) => link.addEventListener("click", handleAnchorClick));

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      cancelAnimationFrame(animationFrameId);
      anchorLinks.forEach((link) => link.removeEventListener("click", handleAnchorClick));
    };
  }, []);

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);
  const openLogin = useCallback(() => setIsLoginOpen(true), []);
  const closeLogin = useCallback(() => setIsLoginOpen(false), []);

  const handleNavigate = useCallback((page) => {
    setCurrentPage(page);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <>
      {/* Background Page Elements render immediately so content/images pre-load */}
      <SkeletonLoader isVisible={isLoading} />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-heritage focus:border focus:border-sandstone-200 focus:bg-white focus:px-4 focus:py-2.5 focus:font-semibold focus:text-maroon-700 focus:shadow-soft"
      >
        Skip to main content
      </a>

      <Navbar
        navItems={navItems}
        onSearchOpen={openSearch}
        onLoginOpen={openLogin}
        activeSection={activeSection}
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {currentPage === "faq" ? (
        <FaqPage onNavigateHome={() => handleNavigate("home")} />
      ) : currentPage === "announcement" ? (
        <AnnouncementPage onNavigateHome={() => handleNavigate("home")} />
      ) : currentPage === "vision" ? (
        <VisionPhilosophyPage onNavigateHome={() => handleNavigate("home")} />
      ) : (
        <main tabIndex="-1" className="min-h-dvh bg-sandstone-50 text-ink-900 focus:outline-none animate-in fade-in duration-300">
          <MainHero />
          {/* Unified About Us section spanning from MissionBlock through all SplitFeatures until Core Values */}
          <div id="about" className="scroll-mt-20">
            <MissionBlock onNavigateVision={() => handleNavigate("vision")} />
            {featuresData.map((feature) => (
              <SplitFeature
                key={feature.id}
                category={feature.category}
                heading={feature.heading}
                body={feature.body}
                linkText={feature.linkText}
                linkHref={feature.linkHref}
                image={feature.image}
                alt={feature.alt}
                isReversed={feature.isReversed}
                bgColor={feature.bgColor}
              />
            ))}
          </div>
          <ValueWheel values={values} />
          <NewsTimeline newsEvents={newsEvents} />
          <InstagramFeed />
        </main>
      )}

      <Footer onLoginOpen={openLogin} />
      <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} navItems={navItems} />
      <LoginModal isOpen={isLoginOpen} onClose={closeLogin} />
    </>
  );
}
