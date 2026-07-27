import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionShell from "./SectionShell.jsx";
import { formatDisplayDate } from "../utils/date.js";
import { CalendarBlank, ArrowRight, CaretLeft, CaretRight, Sparkle } from "@phosphor-icons/react";

import CustomSelect from "./CustomSelect.jsx";

const newsImagePool = [
  "/images/hero/campus-morning.svg",
  "/images/hero/sports-meet.svg",
  "/images/hero/art-exhibition.svg",
  "/images/hero/mainhero.png",
  "/images/features/about.svg",
  "/images/features/infrastructure.svg",
  "/images/features/learning.svg",
];

export default function NewsTimeline({ newsEvents = [] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const monthOrder = {
    January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
    July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
  };

  const uniqueYears = Array.from(new Set(newsEvents.map((item) => item.year)))
    .sort((a, b) => b - a);
  const uniqueMonths = Array.from(new Set(newsEvents.map((item) => item.month)))
    .sort((a, b) => monthOrder[a] - monthOrder[b]);

  const yearOptions = useMemo(() => [
    { value: "", label: "All Years" },
    ...uniqueYears.map((year) => ({ value: String(year), label: String(year) }))
  ], [uniqueYears]);

  const monthOptions = useMemo(() => [
    { value: "", label: "All Months" },
    ...uniqueMonths.map((month) => ({ value: month, label: month }))
  ], [uniqueMonths]);

  const newsImagesById = useMemo(() => {
    return newsEvents.reduce((accumulator, item, index) => {
      const hashSeed = item.id.split("").reduce((sum, char) => sum + char.charCodeAt(0), index);
      accumulator[item.id] = newsImagePool[hashSeed % newsImagePool.length];
      return accumulator;
    }, {});
  }, [newsEvents]);

  const filteredEvents = newsEvents.filter((item) => {
    const matchesMonth = selectedMonth ? item.month === selectedMonth : true;
    const matchesYear = selectedYear ? item.year.toString() === selectedYear : true;
    return matchesMonth && matchesYear;
  });

  const sortedEvents = [...filteredEvents].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Automatic card switching timer (faster 1.8s switch)
  useEffect(() => {
    if (isPaused || sortedEvents.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % sortedEvents.length);
    }, 1800);
    return () => clearInterval(timer);
  }, [isPaused, sortedEvents.length]);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % sortedEvents.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + sortedEvents.length) % sortedEvents.length);
  };

  const resetFilters = () => {
    setSelectedMonth("");
    setSelectedYear("");
    setActiveIdx(0);
  };

  return (
    <SectionShell id="news-events" className="bg-white relative py-14 lg:py-18" animate={false}>
      <div 
        className="relative mx-auto max-w-7xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Header & Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-sandstone-200 pb-6"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon-50 border border-maroon-100 text-maroon-700 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkle size={14} weight="fill" />
              <span>Campus Milestones</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-maroon-900">News &amp; Events</h2>
            <p className="mt-2 text-ink-700 text-sm sm:text-base leading-relaxed">
              Keep track of active student programs, academic milestones, and campus activities.
            </p>
          </div>

          {/* Filters & Nav Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-sandstone-50 p-1.5 rounded-xl border border-sandstone-200">
              <CustomSelect
                value={selectedYear}
                onChange={(val) => { setSelectedYear(val); setActiveIdx(0); }}
                options={yearOptions}
                ariaLabel="Select Year"
              />

              <CustomSelect
                value={selectedMonth}
                onChange={(val) => { setSelectedMonth(val); setActiveIdx(0); }}
                options={monthOptions}
                ariaLabel="Select Month"
              />

              {(selectedMonth || selectedYear) && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-semibold text-maroon-700 hover:text-maroon-950 px-2 py-1 cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Nav Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={sortedEvents.length <= 1}
                aria-label="Previous timeline item"
                className="w-10 h-10 rounded-full bg-white border border-sandstone-300 text-maroon-900 shadow-sm hover:bg-maroon-700 hover:text-white transition-all disabled:opacity-40 flex items-center justify-center cursor-pointer"
              >
                <CaretLeft size={18} weight="bold" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={sortedEvents.length <= 1}
                aria-label="Next timeline item"
                className="w-10 h-10 rounded-full bg-white border border-sandstone-300 text-maroon-900 shadow-sm hover:bg-maroon-700 hover:text-white transition-all disabled:opacity-40 flex items-center justify-center cursor-pointer"
              >
                <CaretRight size={18} weight="bold" />
              </button>
            </div>
          </div>
        </motion.div>

        {sortedEvents.length === 0 ? (
          <div className="text-center py-16 bg-sandstone-50 rounded-2xl border border-sandstone-200 border-dashed">
            <CalendarBlank size={48} className="mx-auto text-ink-500" />
            <h3 className="text-xl text-maroon-900 font-serif font-semibold mt-4">No Timeline Entries Found</h3>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 rounded-xl bg-maroon-700 px-5 py-2 text-xs font-semibold text-white cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="relative">
            {/* High-End Milestone Capsules Timeline Spine */}
            <div className="relative w-full py-4 mb-4">
              <div className="relative flex items-center justify-between gap-3 overflow-x-auto py-3 px-2 no-scrollbar">
                {/* Background Connecting Line */}
                <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-sandstone-200 z-0" />
                <div 
                  className="absolute left-6 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-maroon-800 to-maroon-500 z-0 transition-all duration-500"
                  style={{
                    width: `${(activeIdx / Math.max(1, sortedEvents.length - 1)) * 92}%`
                  }}
                />

                {/* Milestone Capsule Nodes */}
                {sortedEvents.map((item, idx) => {
                  const isActive = activeIdx === idx;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveIdx(idx)}
                      className={`relative z-10 inline-flex items-center gap-2 rounded-full transition-all duration-300 cursor-pointer select-none ${
                        isActive
                          ? "bg-maroon-900 text-white shadow-md ring-4 ring-maroon-100 scale-105 px-4 py-2"
                          : "bg-white text-ink-700 border border-sandstone-300/80 hover:border-maroon-400 hover:bg-sandstone-100 px-3.5 py-1.5 shadow-xs"
                      }`}
                    >
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                      )}
                      <span className="text-xs font-bold font-sans tracking-wide">
                        {item.month.substring(0, 3)} {item.year}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Story Showcase Card */}
            <div className="mt-2">
              <div className="bg-white rounded-2xl border border-sandstone-200/90 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-0 items-stretch relative min-h-[340px]">
                <AnimatePresence mode="wait">
                  {sortedEvents[activeIdx] && (
                    <motion.div
                      key={sortedEvents[activeIdx].id}
                      initial={{ opacity: 0, x: 14 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -14 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="col-span-full grid grid-cols-1 md:grid-cols-12 gap-0 items-stretch w-full"
                    >
                      {/* Left Cover Image */}
                      <div className="relative md:col-span-5 h-60 md:h-auto overflow-hidden bg-sandstone-100">
                        <motion.img
                          key={`img-${sortedEvents[activeIdx].id}`}
                          initial={{ opacity: 0.7 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          src={newsImagesById[sortedEvents[activeIdx].id]}
                          alt={sortedEvents[activeIdx].title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/30" />
                        
                        <div className="absolute top-4 left-4 flex items-center gap-2">
                          <span className="rounded-full bg-white/95 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-maroon-900 shadow-sm">
                            {sortedEvents[activeIdx].type === "news" ? "News" : "Event"}
                          </span>
                          <span className="rounded-full bg-maroon-950/85 backdrop-blur-md px-3 py-1 text-[10px] font-semibold text-white shadow-sm">
                            {sortedEvents[activeIdx].category}
                          </span>
                        </div>
                      </div>

                      {/* Right Article Excerpt */}
                      <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-6 bg-gradient-to-br from-white via-sandstone-50/50 to-white">
                        <div>
                          <div className="flex items-center gap-2 text-xs text-maroon-700 font-semibold mb-2">
                            <span className="w-2 h-2 rounded-full bg-maroon-700 animate-pulse" />
                            <span>{sortedEvents[activeIdx].month} {sortedEvents[activeIdx].year}</span>
                            <span className="text-ink-400">•</span>
                            <span className="text-ink-500 font-normal">{formatDisplayDate(sortedEvents[activeIdx].date)}</span>
                          </div>

                          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-maroon-950 leading-tight">
                            {sortedEvents[activeIdx].title}
                          </h3>

                          <p className="mt-4 text-sm sm:text-base text-ink-700 leading-relaxed font-sans">
                            {sortedEvents[activeIdx].summary}
                          </p>

                          {/* Key Event Highlights Pills */}
                          {sortedEvents[activeIdx].highlights && (
                            <div className="mt-5 flex flex-wrap items-center gap-2">
                              {sortedEvents[activeIdx].highlights.map((tag) => (
                                <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sandstone-100 border border-sandstone-200/90 text-maroon-950 text-xs font-semibold shadow-xs">
                                  <Sparkle size={12} className="text-maroon-700" weight="fill" />
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-sandstone-200/80">
                          <a
                            href={sortedEvents[activeIdx].href || "#"}
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-maroon-800 hover:text-maroon-950 transition-colors focus-visible:outline-none"
                          >
                            <span>Read full article</span>
                            <ArrowRight size={14} weight="bold" />
                          </a>

                          <span className="text-xs font-mono font-semibold text-ink-500">
                            {activeIdx + 1} / {sortedEvents.length}
                          </span>
                        </div>
                      </div>

                      {/* Bottom Progress Bar for Auto-Play */}
                      {!isPaused && (
                        <motion.div
                          key={`bar-${activeIdx}`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 1.8, ease: "linear" }}
                          style={{ transformOrigin: "left" }}
                          className="col-span-full h-1 bg-gradient-to-r from-maroon-800 via-maroon-600 to-maroon-400"
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}
      </div>
    </SectionShell>
  );
}
