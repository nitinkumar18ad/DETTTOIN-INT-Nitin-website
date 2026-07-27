import { useMemo, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionShell from "./SectionShell.jsx";
import { formatDisplayDate } from "../utils/date.js";
import { Funnel, ArrowClockwise, CalendarBlank } from "@phosphor-icons/react";

const newsImagePool = [
  "/images/hero/campus-morning.svg",
  "/images/hero/sports-meet.svg",
  "/images/hero/art-exhibition.svg",
  "/images/hero/mainhero.png",
  "/images/features/about.svg",
  "/images/features/infrastructure.svg",
  "/images/features/learning.svg",
];

const TimelineCard = ({ item, index, newsImagesById, isEven, IsNews }) => {
  const cardRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 120px", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{
        position: 'sticky',
        top: `calc(120px + ${index * 16}px)`,
        scale,
        opacity,
        zIndex: index,
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
      className="relative flex flex-col lg:flex-row items-stretch lg:justify-between py-6 bg-white/95 backdrop-blur-sm shadow-[0_-2px_15px_rgba(0,0,0,0.04)] border-t border-sandstone-100 rounded-t-2xl lg:rounded-t-none lg:border-none lg:shadow-none lg:bg-transparent"
    >
      {/* Timeline Card Column */}
      <div
        className={`w-full lg:w-[calc(50%-2rem)] ${
          isEven ? "lg:order-1" : "lg:order-3"
        }`}
      >
        <div className="pl-12 lg:pl-0">
          <article className="bg-white rounded-heritage border border-sandstone-200 p-6 shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 group">
            {/* Image Preview */}
            <div className="relative h-40 overflow-hidden rounded bg-sandstone-100">
              <img
                src={newsImagesById[item.id]}
                alt={item.alt || item.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-maroon-900 shadow-sm">
                {IsNews ? "News" : "Event"}
              </div>
            </div>

            {/* Header info */}
            <div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-maroon-700 bg-maroon-50 px-2.5 py-1 rounded">
                  {item.category}
                </span>
                <span className="text-xs text-ink-500">
                  {formatDisplayDate(item.date)}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-serif font-bold text-maroon-900 leading-tight">
                {item.title}
              </h3>
            </div>

            {/* Summary */}
            <p className="text-sm text-ink-700 leading-relaxed font-sans">
              {item.summary}
            </p>

            {/* Link */}
            <a
              href={item.href}
              className="inline-flex items-center text-xs font-semibold text-maroon-700 hover:text-maroon-950 self-start mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-500 rounded"
            >
              Read article &rarr;
            </a>
          </article>
        </div>
      </div>

      {/* Central Date Node */}
      <div
        className="absolute left-4 lg:left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center justify-center w-12 h-12 rounded-full border-2 border-sandstone-200 bg-white shadow-soft lg:order-2 mt-4 lg:mt-0 lg:top-1/2 lg:-translate-y-1/2"
        aria-hidden="true"
      >
        <span className="text-[10px] font-bold text-maroon-700 uppercase leading-none">
          {item.month.substring(0, 3)}
        </span>
        <span className="text-[10px] font-semibold text-ink-500 leading-none mt-1">
          {item.year}
        </span>
      </div>

      {/* Empty Side (Desktop Spacer) */}
      <div className={`hidden lg:block lg:w-[calc(50%-2rem)] ${
          isEven ? "lg:order-3" : "lg:order-1"
        }`} />
    </motion.div>
  );
};

export default function NewsTimeline({ newsEvents = [] }) {
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

  const resetFilters = () => {
    setSelectedMonth("");
    setSelectedYear("");
  };

  return (
    <SectionShell id="news-events" className="bg-white relative" animate={false}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-sandstone-200 pb-8 relative z-[100] bg-white">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-maroon-700">
            Chronicles
          </p>
          <h2 className="mt-4 text-3xl font-serif text-maroon-900">News &amp; Events</h2>
          <p className="mt-4 text-ink-700">
            Keep track of active student programs, academic milestones, and campus activities.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-4 bg-sandstone-50 p-4 rounded-heritage border border-sandstone-200">
          <div className="flex items-center gap-2 text-maroon-700">
            <Funnel size={18} weight="bold" />
            <span className="text-sm font-semibold uppercase tracking-wider">Filter</span>
          </div>

          <div className="flex flex-col">
            <label htmlFor="year-select" className="sr-only">Year</label>
            <select
              id="year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-white text-sm border border-sandstone-300 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-maroon-500 font-sans cursor-pointer"
            >
              <option value="">All Years</option>
              {uniqueYears.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="month-select" className="sr-only">Month</label>
            <select
              id="month-select"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-white text-sm border border-sandstone-300 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-maroon-500 font-sans cursor-pointer"
            >
              <option value="">All Months</option>
              {uniqueMonths.map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>

          {(selectedMonth || selectedYear) && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-maroon-700 hover:text-maroon-900 border-b border-maroon-700 py-1 cursor-pointer"
            >
              <ArrowClockwise size={14} weight="bold" />
              Reset
            </button>
          )}
        </div>
      </div>

      {sortedEvents.length === 0 ? (
        <div className="text-center py-16 bg-sandstone-50 rounded-heritage border border-sandstone-200 border-dashed">
          <CalendarBlank size={48} className="mx-auto text-ink-500" />
          <h3 className="text-xl text-maroon-900 font-serif font-semibold mt-4">No Matches Found</h3>
          <p className="text-sm text-ink-500 mt-2">
            We couldn't find any news or events matching the selected filters.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-6 inline-flex items-center gap-2 rounded-heritage bg-maroon-700 px-6 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-maroon-500 cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="relative pb-[20vh] before:absolute before:left-4 lg:before:left-1/2 before:top-4 before:bottom-0 before:w-0.5 before:bg-sandstone-200/50">
          {sortedEvents.map((item, index) => {
            const isEven = index % 2 === 0;
            const IsNews = item.type === "news";

            return (
              <TimelineCard 
                key={item.id}
                item={item}
                index={index}
                newsImagesById={newsImagesById}
                isEven={isEven}
                IsNews={IsNews}
              />
            );
          })}
        </div>
      )}
    </SectionShell>
  );
}
