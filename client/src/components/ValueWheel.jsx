import { useState } from "react";
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

export default function ValueWheel({ values = [] }) {
  const [activeId, setActiveId] = useState(null);

  // Fallback for default central message on desktop
  const activeValue = values.find((v) => v.id === activeId);
  const ActiveIcon = activeValue ? iconMap[activeValue.icon] : null;

  return (
    <SectionShell id="values" className="bg-sandstone-50 border-t border-b border-sandstone-200">
      <div className="mb-12 max-w-3xl text-center mx-auto">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-maroon-700">
          Guiding Ethos
        </p>
        <h2 className="mt-4">Our Core Values</h2>
        <p className="mt-4 text-ink-700">
          The educational experience at Vasant Valley is anchored in eight fundamental dimensions of growth.
        </p>
      </div>

      {/* Desktop Radial Wheel Layout (lg and above) */}
      <div className="hidden lg:flex justify-center items-center h-[520px] relative">
        {/* Center circle displaying descriptions */}
        <div className="w-[280px] h-[280px] rounded-full bg-white shadow-soft border border-sandstone-100 flex flex-col justify-center items-center z-10 p-6 text-center select-none">
          {activeValue ? (
            <div className="flex flex-col items-center">
              <div className="text-maroon-700 mb-3 animate-[pulse_2s_infinite]">
                {ActiveIcon && <ActiveIcon size={36} weight="bold" />}
              </div>
              <h3 className="text-xl text-maroon-900 font-serif font-bold">{activeValue.label}</h3>
              <p className="text-sm mt-3 text-ink-700 leading-relaxed font-sans">{activeValue.description}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <p className="text-maroon-900 font-serif font-semibold text-lg">Ethos Wheel</p>
              <p className="text-xs mt-3 text-ink-500 max-w-[200px] leading-relaxed">
                Hover, focus, or tap any node around the wheel to explore our values.
              </p>
            </div>
          )}
        </div>

        {/* Outer radial items */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div className="w-[440px] h-[440px] rounded-full border border-dashed border-sandstone-300 absolute" />
          
          {values.map((value, index) => {
            const Icon = iconMap[value.icon] || Sparkle;
            
            // Calculate trigonometry positioning: 270 deg (top) is the start index
            const angleDeg = 270 + index * 45;
            const angleRad = (angleDeg * Math.PI) / 180;
            const x = Math.round(220 * Math.cos(angleRad));
            const y = Math.round(220 * Math.sin(angleRad));

            const isActive = activeId === value.id;

            return (
              <button
                key={value.id}
                type="button"
                onMouseEnter={() => setActiveId(value.id)}
                onMouseLeave={() => setActiveId(null)}
                onFocus={() => setActiveId(value.id)}
                onBlur={() => setActiveId(null)}
                onClick={() => setActiveId(activeId === value.id ? null : value.id)}
                className={`absolute pointer-events-auto flex flex-col items-center justify-center w-20 h-20 rounded-full border bg-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-maroon-500 shadow-sm cursor-pointer ${
                  isActive
                    ? "border-maroon-700 bg-maroon-50 text-maroon-900 scale-110 shadow-soft"
                    : "border-sandstone-200 hover:border-maroon-500 text-ink-700"
                }`}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
                aria-label={`Explore ${value.label} value`}
                aria-expanded={isActive}
              >
                <Icon size={24} weight={isActive ? "bold" : "regular"} className="text-maroon-700" />
                <span className="text-[10px] font-semibold tracking-wider uppercase mt-1">
                  {value.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile/Tablet Grid Layout (below lg) */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {values.map((value) => {
          const Icon = iconMap[value.icon] || Sparkle;
          const isActive = activeId === value.id;

          return (
            <button
              key={value.id}
              type="button"
              onClick={() => setActiveId(isActive ? null : value.id)}
              onFocus={() => setActiveId(value.id)}
              className={`w-full text-left p-5 rounded-heritage border transition-all duration-300 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-700 cursor-pointer ${
                isActive
                  ? "border-maroon-700 shadow-soft bg-maroon-50/20"
                  : "border-sandstone-200 hover:border-maroon-200"
              }`}
              aria-expanded={isActive}
            >
              <div className="flex items-center gap-3">
                <div className="text-maroon-700">
                  <Icon size={24} weight={isActive ? "bold" : "regular"} />
                </div>
                <h4 className="font-semibold text-maroon-900 tracking-wide font-sans">{value.label}</h4>
              </div>
              <div
                className={`transition-all duration-300 ease-out overflow-hidden ${
                  isActive ? "max-h-32 opacity-100 mt-3" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-sm text-ink-750 leading-relaxed font-sans">{value.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </SectionShell>
  );
}
