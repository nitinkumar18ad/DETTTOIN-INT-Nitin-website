import { useCallback, useEffect, useState } from "react";
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
import useScrollSpy from "./hooks/useScrollSpy.js";

const fallbackNavItems = [
  { id: "main-content", label: "Home", href: "#main-content", children: [] },
  { id: "about", label: "About Us", href: "#about", children: [] },
  { id: "values", label: "Core Values", href: "#values", children: [] },
  { id: "news-events", label: "News & Events", href: "#news-events", children: [] },
  { id: "instagram-feed", label: "Socials", href: "#instagram-feed", children: [] }
];

function sanitizeNavItems(items) {
  return (items?.length ? items : fallbackNavItems).filter(
    (item) =>
      item.id !== "school-life" &&
      item.label !== "School Life" &&
      item.id !== "announcements" &&
      item.label !== "Announcements"
  );
}

const fallbackHeroSlides = [
  {
    id: "sports-champions",
    title: "Sports Day Champions",
    caption: "Students from every house gather on the open grounds — competing, celebrating, and carrying the school's spirit of excellence in deed.",
    date: "2026-01-28",
    category: "Sports",
    image: "/images/hero/mainhero.png",
    alt: "Vasant Valley School students assembled on the sports ground at golden hour",
    fullBleed: true
  },
  {
    id: "campus-morning",
    title: "Morning On Campus",
    caption: "The sandstone buildings and open grounds frame everyday school life.",
    date: "2026-03-04",
    category: "Campus",
    image: "/images/hero/campus-morning.svg",
    alt: "Vasant Valley School campus in morning light"
  },
  {
    id: "art-exhibition",
    title: "Student Art Exhibition",
    caption: "Creative work from classrooms and studios is shared with families.",
    date: "2025-11-22",
    category: "Creative",
    image: "/images/hero/art-exhibition.svg",
    alt: "Student artwork displayed for a school exhibition"
  }
];

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
    category: "Learning",
    summary: "Reading circles, guest author interactive sessions, and rare book displays animate the school library. Students participate in creative writing challenges.",
    highlights: ["Author Q&A", "Book Showcase", "Writing Award"],
    image: "/images/news/library-week.jpg",
    href: "#"
  },
  {
    id: "environment-drive",
    type: "news",
    title: "Campus Sustainability Drive",
    date: "2025-09-05",
    month: "September",
    year: 2025,
    category: "Environment",
    summary: "Students lead campus-wide sustainability initiatives focusing on rainwater harvesting, zero-waste composting, and solar energy awareness across all wings.",
    highlights: ["Tree Plantation", "Solar Audit", "Zero-Waste"],
    image: "/images/news/environment-drive.jpg",
    href: "#"
  }
];

const featuresData = [
  {
    id: "about",
    category: "About Us",
    heading: "A Legacy of Intellectual Depth and Character",
    body: "Vasant Valley School was established to provide a space where learning is an interactive and immersive process. Our pedagogy encourages students to be independent thinkers, ethical leaders, and empathetic members of society.",
    linkText: "Read about our history",
    linkHref: "#about",
    image: "/images/features/about.svg",
    alt: "Vasant Valley school building outline and lamp illustration",
    isReversed: false,
    bgColor: "bg-white"
  },
  {
    id: "infrastructure",
    category: "Campus & Infrastructure",
    heading: "Designed for Exploration and Excellence",
    body: "Our campus is a blend of traditional sandstone aesthetics and state-of-the-art facilities. From modern science labs and collaborative studios to expansive athletic grounds, every corner is designed to support academic inquiry and creative expression.",
    linkText: "Explore our facilities",
    linkHref: "#infrastructure",
    image: "/images/features/infrastructure.svg",
    alt: "Campus sandstone arches architectural design",
    isReversed: true,
    bgColor: "bg-sandstone-50"
  },
  {
    id: "learning",
    category: "Learning Experience",
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
  const [navItems, setNavItems] = useState(() => sanitizeNavItems(fallbackNavItems));
  const [heroSlides, setHeroSlides] = useState(fallbackHeroSlides);
  const [values, setValues] = useState(fallbackValues);
  const [newsEvents, setNewsEvents] = useState(fallbackNewsEvents);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const sectionIds = [
    "main-content",
    "about",
    "infrastructure",
    "learning",
    "values",
    "news-events",
    "instagram-feed",
    "footer"
  ];

  // Single scroll spy instance — passed down to Navbar to avoid duplicate observers
  const activeSection = useScrollSpy({ sectionIds });

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    let animationFrameId;

    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    // Provide Lenis to anchor links for smooth scrolling to sections
    const handleAnchorClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          lenis.scrollTo(target);
        }
      }
    };

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => link.addEventListener('click', handleAnchorClick));

    return () => {
      lenis.destroy();
      cancelAnimationFrame(animationFrameId);
      anchorLinks.forEach(link => link.removeEventListener('click', handleAnchorClick));
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadHomeContent() {
      try {
        setIsLoading(true);
        setError(null);
        // Use a relative URL so this works on both localhost and Vercel (via vite proxy / same origin)
        const apiBase = import.meta.env.VITE_API_URL ?? "";
        const response = await fetch(`${apiBase}/api/home`);
        if (!response.ok) {
          throw new Error("Unable to load homepage content");
        }

        const data = await response.json();
        if (isMounted) {
          setNavItems(sanitizeNavItems(data.navItems));
          setHeroSlides(data.heroSlides || fallbackHeroSlides);
          setValues(data.values || fallbackValues);
          setNewsEvents(data.newsEvents || fallbackNewsEvents);
          setIsLoading(false);
        }
      } catch {
        if (isMounted) {
          setNavItems(sanitizeNavItems(fallbackNavItems));
          setHeroSlides(fallbackHeroSlides);
          setValues(fallbackValues);
          setNewsEvents(fallbackNewsEvents);
          setIsLoading(false);
        }
      }
    }

    loadHomeContent();

    return () => {
      isMounted = false;
    };
  }, []);

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);
  const openLogin = useCallback(() => setIsLoginOpen(true), []);
  const closeLogin = useCallback(() => setIsLoginOpen(false), []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-heritage focus:border focus:border-sandstone-200 focus:bg-white focus:px-4 focus:py-2.5 focus:font-semibold focus:text-maroon-700 focus:shadow-soft"
      >
        Skip to main content
      </a>
      <Navbar navItems={navItems} onSearchOpen={openSearch} onLoginOpen={openLogin} activeSection={activeSection} />
      <main tabIndex="-1" className="min-h-dvh bg-sandstone-50 text-ink-900 focus:outline-none">
        <MainHero />
        {/* Unified About Us section spanning from MissionBlock through all SplitFeatures until Core Values */}
        <div id="about" className="scroll-mt-20">
          <MissionBlock />
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
      <Footer onLoginOpen={openLogin} />
      <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} navItems={navItems} />
      <LoginModal isOpen={isLoginOpen} onClose={closeLogin} />
    </>
  );
}