import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Lightbulb } from "@phosphor-icons/react";
import SectionShell from "./SectionShell.jsx";

export default function MissionBlock({ onNavigateVision }) {
  const cardRef = useRef(null);

  // 3D Motion Values for Mouse Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for 3D rotation
  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 18 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 18 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);
  const sheenX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const sheenY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <SectionShell className="bg-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 perspective-1000">
        
        {/* 3D Interactive Motion Card */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative overflow-hidden rounded-[28px] border border-sandstone-200/90 bg-sandstone-100 p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_-15px_rgba(63,13,15,0.12)] group transition-shadow duration-500"
        >
          {/* Dynamic Lighting Sheen */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
            style={{
              background: `radial-gradient(600px circle at ${sheenX} ${sheenY}, rgba(255, 255, 255, 0.45), transparent 40%)`,
            }}
          />

          {/* Subtle Ambient Background Glows */}
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-maroon-100/40 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-sandstone-200/50 blur-3xl pointer-events-none" />

          {/* Card Grid (Text Left, Logo Right) */}
          <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Text & CTA */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Tag Badge */}
              <motion.div
                style={{ transform: "translateZ(20px)" }}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-maroon-800"
              >
                <Lightbulb size={16} weight="bold" />
                <span>About Us & Foundation</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h2
                style={{ transform: "translateZ(35px)" }}
                className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-maroon-950 leading-tight tracking-tight"
              >
                To nurture thoughtful learners who act with confidence, compassion, and{" "}
                <span className="text-maroon-700">excellence in deed</span>.
              </motion.h2>

              {/* Body Subtext */}
              <motion.p
                style={{ transform: "translateZ(25px)" }}
                className="text-base sm:text-lg leading-relaxed text-ink-750 font-sans max-w-3xl"
              >
                The school experience is shaped by inquiry, responsibility, creativity, and care for the community. Each child is encouraged to grow with independence of mind and generosity of spirit.
              </motion.p>

              {/* Button CTA */}
              {onNavigateVision && (
                <motion.div style={{ transform: "translateZ(45px)" }} className="pt-4">
                  <button
                    type="button"
                    onClick={onNavigateVision}
                    className="inline-flex items-center gap-2.5 rounded-full bg-maroon-900 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-maroon-800 hover:shadow-xl hover:scale-103 active:scale-95 transition-all duration-200 cursor-pointer group/btn"
                  >
                    <span>Explore Vision & Philosophy</span>
                    <ArrowRight
                      size={16}
                      weight="bold"
                      className="group-hover/btn:translate-x-1 transition-transform"
                    />
                  </button>
                </motion.div>
              )}

            </div>

            {/* Right Column: Vasant Valley School Logo Badge */}
            <div className="lg:col-span-4 flex items-center justify-center pt-4 lg:pt-0">
              <motion.div
                style={{ transform: "translateZ(50px)" }}
                className="relative flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-white/80 border border-sandstone-300/80 shadow-lg backdrop-blur-md group-hover:scale-105 transition-transform duration-500"
              >
                <img
                  src="/logo.svg"
                  alt="Vasant Valley School Logo"
                  className="w-32 sm:w-40 h-auto object-contain drop-shadow-sm"
                />
                <span className="mt-3 text-[11px] font-bold uppercase tracking-widest text-maroon-900 font-serif">
                  Vasant Valley School
                </span>
                <span className="text-[10px] text-ink-600 font-mono tracking-wider mt-0.5">
                  Est. 1990
                </span>
              </motion.div>
            </div>

          </div>

        </motion.div>

      </div>
    </SectionShell>
  );
}
