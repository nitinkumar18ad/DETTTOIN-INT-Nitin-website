import { AnimatePresence, animate, motion, useInView, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import SectionShell from "./SectionShell.jsx";
import { Brain, Users, Heartbeat, Sparkle, Heart, Leaf, Palette, Scales } from "@phosphor-icons/react";

const iconMap = {
  brain: Brain,
  users: Users,
  heartbeat: Heartbeat,
  sparkle: Sparkle,
  heart: Heart,
  leaf: Leaf,
  palette: Palette,
  scales: Scales
};

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia(query);
    const updateMatches = () => setMatches(mediaQuery.matches);

    updateMatches();
    mediaQuery.addEventListener("change", updateMatches);

    return () => mediaQuery.removeEventListener("change", updateMatches);
  }, [query]);

  return matches;
}

function ValueNode({
  value,
  isActive,
  isHovering,
  rotation,
  onActivate,
  onHoverStart,
  onHoverEnd,
}) {
  const Icon = iconMap[value.icon] || Sparkle;
  const floatY = useMotionValue(0);
  const hoverLift = useMotionValue(0);
  const nodeScale = useMotionValue(1);
  const nodeOpacity = useMotionValue(0.82);
  const counterRotation = useTransform(rotation, (latest) => `${-latest}deg`);
  const transform = useMotionTemplate`translate3d(${value.x}px, ${value.y}px, 0) translateY(${floatY}px) translateY(${hoverLift}px) rotate(${counterRotation}) scale(${nodeScale})`;

  useEffect(() => {
    const floatControls = animate(floatY, [0, -3, 0], {
      delay: value.floatDelay,
      duration: value.floatDuration,
      ease: "easeInOut",
      repeat: Infinity,
    });

    return () => floatControls.stop();
  }, [floatY, value.floatDelay, value.floatDuration]);

  useEffect(() => {
    const targetScale = isHovering ? 1.1 : isActive ? 1.15 : 1;
    const targetOpacity = isHovering || isActive ? 1 : 0.82;

    const scaleControls = animate(nodeScale, targetScale, {
      damping: 22,
      stiffness: 280,
      type: "spring",
    });

    const opacityControls = animate(nodeOpacity, targetOpacity, {
      duration: 0.25,
      ease: "easeOut",
    });

    const liftControls = animate(hoverLift, isHovering ? -6 : 0, {
      damping: 24,
      stiffness: 320,
      type: "spring",
    });

    return () => {
      scaleControls.stop();
      opacityControls.stop();
      liftControls.stop();
    };
  }, [hoverLift, isActive, isHovering, nodeOpacity, nodeScale]);

  const shadowAnimation = isActive
    ? {
        boxShadow: [
          "0 10px 20px rgba(69, 24, 20, 0.14)",
          "0 16px 32px rgba(69, 24, 20, 0.24)",
          "0 10px 20px rgba(69, 24, 20, 0.14)",
        ],
      }
    : {
        boxShadow: isHovering
          ? "0 16px 30px rgba(69, 24, 20, 0.16)"
          : "0 8px 16px rgba(69, 24, 20, 0.08)",
      };

  const shadowTransition = isActive
    ? {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
      }
    : {
        duration: 0.3,
        ease: "easeOut",
      };

  return (
    <motion.button
      type="button"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onFocus={onActivate}
      onClick={onActivate}
      className={`absolute pointer-events-auto flex flex-col items-center justify-center w-20 h-20 rounded-full border bg-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-500 shadow-sm cursor-pointer transform-gpu will-change-transform ${
        isActive
          ? "border-maroon-700 bg-maroon-50 text-maroon-900"
          : "border-sandstone-200 hover:border-maroon-500 text-ink-700"
      }`}
      style={{
        opacity: nodeOpacity,
        transform,
      }}
      animate={shadowAnimation}
      transition={shadowTransition}
      aria-label={`Explore ${value.label} value`}
      aria-expanded={isActive}
    >
      <Icon size={24} weight={isActive ? "bold" : "regular"} className="text-maroon-700" />
      <span className="text-[10px] font-semibold tracking-wider uppercase mt-1">{value.label}</span>
    </motion.button>
  );
}

export default function ValueWheel({ values = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isRotationPaused, setIsRotationPaused] = useState(false);
  const sectionRef = useRef(null);
  const wheelRotation = useMotionValue(0);
  const rotationAnimationRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isInView = useInView(sectionRef, { amount: 0.35, once: true });

  const wheelNodes = useMemo(
    () =>
      values.map((value, index) => {
        const angleDeg = 270 + index * 45;
        const angleRad = (angleDeg * Math.PI) / 180;

        return {
          ...value,
          floatDelay: ((index * 0.73) % 2.2) + 0.05,
          floatDuration: 3 + (index % 5) * 0.4,
          x: Math.round(220 * Math.cos(angleRad)),
          y: Math.round(220 * Math.sin(angleRad)),
        };
      }),
    [values]
  );

  const normalizedActiveIndex = values.length ? (activeIndex == null ? 0 : activeIndex % values.length) : 0;
  const activeValue = values.length ? values[normalizedActiveIndex] : null;
  const ActiveIcon = activeValue ? iconMap[activeValue.icon] : null;

  const startWheelRotation = useCallback(() => {
    if (!isDesktop || !isInView) {
      return;
    }

    rotationAnimationRef.current?.stop();

    const currentRotation = wheelRotation.get();
    rotationAnimationRef.current = animate(wheelRotation, currentRotation + 360, {
      duration: 25,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });
  }, [isDesktop, isInView, wheelRotation]);

  const pauseRotation = useCallback(() => {
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }

    setIsRotationPaused(true);
  }, []);

  const queueRotationResume = useCallback(() => {
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }

    resumeTimerRef.current = window.setTimeout(() => {
      setIsRotationPaused(false);
      resumeTimerRef.current = null;
    }, 2000);
  }, []);

  const handleDesktopActivate = useCallback((index) => {
    setActiveIndex(index);
  }, []);

  const handleDesktopHoverStart = useCallback(
    (index) => {
      pauseRotation();
      setHoveredIndex(index);
      setActiveIndex(index);
    },
    [pauseRotation]
  );

  const handleDesktopHoverEnd = useCallback(() => {
    setHoveredIndex(null);
    queueRotationResume();
  }, [queueRotationResume]);

  useEffect(() => {
    if (!values.length) {
      setActiveIndex(null);
      return;
    }

    setActiveIndex((current) => {
      if (current == null) {
        return 0;
      }

      return current % values.length;
    });
  }, [values.length]);

  useEffect(() => {
    if (!isDesktop && isRotationPaused) {
      setIsRotationPaused(false);
    }
  }, [isDesktop, isRotationPaused]);

  useEffect(() => {
    if (!isDesktop || !isInView || isRotationPaused || !values.length) {
      rotationAnimationRef.current?.stop();
      return undefined;
    }

    startWheelRotation();

    return () => {
      rotationAnimationRef.current?.stop();
    };
  }, [isDesktop, isInView, isRotationPaused, startWheelRotation, values.length]);

  useEffect(() => {
    if (!isDesktop || !isInView || isRotationPaused || !values.length) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => {
        if (current == null) {
          return 0;
        }

        return (current + 1) % values.length;
      });
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [isDesktop, isInView, isRotationPaused, values.length]);

  useEffect(() => {
    return () => {
      rotationAnimationRef.current?.stop();

      if (resumeTimerRef.current) {
        window.clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  return (
    <SectionShell id="values" className="bg-sandstone-50 border-t border-b border-sandstone-200" animate={false}>
      <div ref={sectionRef} className="mb-12 max-w-3xl text-center mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-sm font-semibold uppercase tracking-[0.12em] text-maroon-700"
          style={{ willChange: "transform, opacity" }}
        >
          Guiding Ethos
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-4"
          style={{ willChange: "transform, opacity" }}
        >
          Our Core Values
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="mt-4 text-ink-700"
          style={{ willChange: "transform, opacity" }}
        >
          The educational experience at Vasant Valley is anchored in eight fundamental dimensions of growth.
        </motion.p>
      </div>

      {/* Desktop Radial Wheel Layout (lg and above) */}
      <motion.div
        className="hidden lg:flex justify-center items-center h-130 relative"
        initial={false}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ willChange: "transform, opacity" }}
      >
        <div className="w-70 h-70 rounded-full bg-white shadow-soft border border-sandstone-100 flex flex-col justify-center items-center z-10 p-6 text-center select-none relative overflow-hidden">
          <motion.div
            aria-hidden="true"
            className="absolute inset-6 rounded-full bg-maroon-100/20 blur-3xl"
            animate={{ opacity: [0.2, 0.35, 0.2], scale: [1, 1.05, 1] }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            style={{ willChange: "transform, opacity" }}
          />
          <AnimatePresence mode="wait" initial={false}>
            {activeValue ? (
              <motion.div
                key={activeValue.id}
                className="flex flex-col items-center relative z-10"
                initial={{ opacity: 0, scale: 0.95, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                style={{ willChange: "transform, opacity" }}
              >
                <motion.div
                  className="text-maroon-700 mb-3"
                  initial={{ opacity: 0, rotate: -12, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 8, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  style={{ willChange: "transform, opacity" }}
                >
                  {ActiveIcon && <ActiveIcon size={36} weight="bold" />}
                </motion.div>
                <h3 className="text-xl text-maroon-900 font-serif font-bold">{activeValue.label}</h3>
                <motion.p
                  className="text-sm mt-3 text-ink-700 leading-relaxed font-sans"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  style={{ willChange: "transform, opacity" }}
                >
                  {activeValue.description}
                </motion.p>
              </motion.div>
            ) : (
              <motion.div
                key="ethos-wheel-default"
                className="flex flex-col items-center relative z-10"
                initial={{ opacity: 0, scale: 0.95, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                style={{ willChange: "transform, opacity" }}
              >
                <p className="text-maroon-900 font-serif font-semibold text-lg">Ethos Wheel</p>
                <p className="text-xs mt-3 text-ink-500 max-w-50 leading-relaxed">
                  Hover, focus, or tap any node around the wheel to explore our values.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          aria-hidden="true"
          className="absolute w-110 h-110 rounded-full border border-dashed border-sandstone-300"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, ease: "linear", repeat: Infinity }}
          style={{ willChange: "transform" }}
        />

        <motion.div
          className="absolute inset-0 flex justify-center items-center pointer-events-none"
          style={{ rotate: wheelRotation, willChange: "transform" }}
        >
          {wheelNodes.map((value, index) => {
            const isActive = normalizedActiveIndex === index;
            const isHovering = hoveredIndex === index;

            return (
              <ValueNode
                key={value.id}
                value={value}
                isActive={isActive}
                isHovering={isHovering}
                rotation={wheelRotation}
                onActivate={() => handleDesktopActivate(index)}
                onHoverStart={() => handleDesktopHoverStart(index)}
                onHoverEnd={handleDesktopHoverEnd}
              />
            );
          })}
        </motion.div>
      </motion.div>

      {/* Mobile/Tablet Grid Layout (below lg) */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {values.map((value) => {
          const Icon = iconMap[value.icon] || Sparkle;
          const currentIndex = values.findIndex((item) => item.id === value.id);
          const isActive = activeIndex === currentIndex;

          return (
            <motion.button
              key={value.id}
              type="button"
              onClick={() => setActiveIndex(isActive ? null : currentIndex)}
              onFocus={() => setActiveIndex(currentIndex)}
              className={`w-full text-left p-5 rounded-heritage border transition-all duration-300 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-700 cursor-pointer ${
                isActive
                  ? "border-maroon-700 shadow-soft bg-maroon-50/20"
                  : "border-sandstone-200 hover:border-maroon-200"
              }`}
              initial={false}
              whileTap={{ scale: 0.99 }}
              aria-expanded={isActive}
            >
              <div className="flex items-center gap-3">
                <div className="text-maroon-700">
                  <Icon size={24} weight={isActive ? "bold" : "regular"} />
                </div>
                <h4 className="font-semibold text-maroon-900 tracking-wide font-sans">{value.label}</h4>
              </div>
              <AnimatePresence initial={false} mode="wait">
                {isActive ? (
                  <motion.div
                    key={`${value.id}-description`}
                    className="overflow-hidden"
                    initial={{ opacity: 0, y: -6, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto", marginTop: 12 }}
                    exit={{ opacity: 0, y: -6, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <p className="text-sm text-ink-750 leading-relaxed font-sans">{value.description}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </SectionShell>
  );
}
