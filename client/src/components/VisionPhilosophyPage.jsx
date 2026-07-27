import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Compass, CaretDown, Quotes, Lightbulb, ShieldCheck, Heart, GraduationCap, Plant } from "@phosphor-icons/react";

const VISION_FAQS = [
  {
    id: "core-vision",
    icon: Compass,
    question: "What is the core vision that guides Vasant Valley School?",
    answer: "Our core vision is to nurture independent, thoughtful learners who act with confidence, compassion, and excellence in deed. We believe that true education extends far beyond academic scores — it cultivates curiosity, moral integrity, civic responsibility, and a lifelong generosity of spirit.",
    highlight: "Nurturing independence of mind and generosity of spirit."
  },
  {
    id: "excellence-in-deed",
    icon: ShieldCheck,
    question: "How does Vasant Valley define 'Excellence in Deed'?",
    answer: "'Excellence in Deed' is our founding motto and moral compass. It dictates that intellectual depth must be translated into active integrity. We encourage scholars not merely to think deeply, but to apply their knowledge ethically in service of their community, environment, and society.",
    highlight: "Validating knowledge through ethical action and character."
  },
  {
    id: "pedagogy-inquiry",
    icon: Lightbulb,
    question: "What is our pedagogical philosophy on learning and inquiry?",
    answer: "We believe that learning is an interactive, discovery-driven process rather than passive memorization. Through inquiry-based seminars, interdisciplinary research, and project-based learning, students build the analytical skills needed to evaluate evidence, solve complex problems, and adapt to an ever-evolving world.",
    highlight: "Moving beyond rote memorization to active inquiry."
  },
  {
    id: "holistic-wellbeing",
    icon: Heart,
    question: "How do we foster holistic student development and well-being?",
    answer: "Emotional resilience and physical well-being are as vital as academic performance. Our curriculum is framed around 8 canonical ethos dimensions — Cerebral, Social, Physical, Spiritual, Emotional, Environmental, Creative, and Ethical — supported by dedicated house masteries and co-curricular programs.",
    highlight: "A balanced framework across 8 canonical ethos dimensions."
  },
  {
    id: "technology-ethics",
    icon: Plant,
    question: "What is the role of technology and innovation in our philosophy?",
    answer: "We embrace progressive 21st-century digital tools as catalysts for research, creative expression, and global collaboration. However, technology in our classrooms is strictly anchored in digital citizenship, critical evaluation, and human-centric ethics.",
    highlight: "21st-century tools guided by digital ethics and human values."
  },
  {
    id: "global-future",
    icon: GraduationCap,
    question: "How does Vasant Valley prepare students for a global future?",
    answer: "By offering rigorous dual curriculum pathways (CBSE and Cambridge IGCSE / A Levels), environmental stewardship programs, and community outreach initiatives, we graduate self-directed scholars who excel in world-class universities and lead as empathetic global citizens.",
    highlight: "Dual curriculum pathways preparing empathetic global leaders."
  }
];

export default function VisionPhilosophyPage({ onNavigateHome }) {
  const [openId, setOpenId] = useState("core-vision");

  const toggleAccordion = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <main className="min-h-dvh bg-sandstone-50 text-ink-900 pb-20">
      
      {/* Top Header Dock */}
      <div className="bg-sandstone-100/70 border-b border-sandstone-200/80 py-3.5 px-4 sm:px-6 lg:px-8 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-maroon-800 hover:text-maroon-950 transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} weight="bold" />
            <span>Back to Vasant Valley Home</span>
          </button>
          <span className="text-xs font-semibold text-ink-600">Educational Vision & Philosophy</span>
        </div>
      </div>

      {/* 50-50 Vertically Divided Split Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start w-full">
          
          {/* Left 50% Column (Sticky Showcase & Information) */}
          <div className="w-full space-y-8 lg:sticky lg:top-24">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-maroon-50 border border-maroon-100 text-maroon-900 text-xs font-bold uppercase tracking-wider">
              <Compass size={16} weight="bold" className="text-maroon-700" />
              <span>Foundational Principles</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-maroon-950 tracking-tight leading-[1.14]">
              Vision & Philosophy
            </h1>

            <p className="text-base sm:text-lg text-ink-750 font-sans leading-relaxed">
              Vasant Valley School was established to provide a space where learning is an interactive and immersive process. Explore our core answers to understand how we nurture independent minds and excellence in deed.
            </p>

            {/* Featured Image Card */}
            <div className="relative overflow-hidden rounded-[28px] border border-sandstone-200 shadow-2xl bg-sandstone-100 aspect-[4/3] w-full group">
              <img
                src="/images/vision-hero.jpg"
                alt="Vision and Philosophy Card"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-104"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-5 left-6 right-6 text-white">
                <span className="text-[11px] font-bold uppercase tracking-widest text-sandstone-200 block">Our Motto</span>
                <span className="text-lg font-serif font-bold text-white">Excellence in Deed</span>
              </div>
            </div>

            {/* Quick Topic Pill Indicators */}
            <div className="p-6 rounded-2xl bg-white border border-sandstone-200/90 shadow-sm hidden sm:block w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-maroon-900 block mb-3">
                Key Philosophical Pillars
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-sandstone-100 text-ink-750 text-xs font-semibold">Independent Inquiry</span>
                <span className="px-3 py-1 rounded-full bg-sandstone-100 text-ink-750 text-xs font-semibold">Moral Integrity</span>
                <span className="px-3 py-1 rounded-full bg-sandstone-100 text-ink-750 text-xs font-semibold">8 Ethos Dimensions</span>
                <span className="px-3 py-1 rounded-full bg-sandstone-100 text-ink-750 text-xs font-semibold">Global Citizenship</span>
              </div>
            </div>

          </div>

          {/* Right 50% Column (Interactive Q&A Accordion Layout) */}
          <div className="w-full space-y-4">
            
            <div className="mb-6 flex items-center justify-between pb-3 border-b border-sandstone-200/80 w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-600">
                Frequently Asked Philosophical Questions
              </span>
              <span className="text-xs font-mono font-bold text-maroon-900">
                {VISION_FAQS.length} Questions
              </span>
            </div>

            <div className="space-y-4 w-full">
              {VISION_FAQS.map((faq, index) => {
                const isOpen = openId === faq.id;
                const Icon = faq.icon;

                return (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`w-full min-w-0 rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "bg-white border-maroon-800 shadow-xl ring-2 ring-maroon-100"
                        : "bg-white border-sandstone-200/90 shadow-sm hover:border-maroon-300"
                    }`}
                  >
                    {/* Accordion Header */}
                    <button
                      type="button"
                      onClick={() => toggleAccordion(faq.id)}
                      className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-500"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-start gap-3.5 min-w-0 flex-1">
                        <div
                          className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                            isOpen ? "bg-maroon-900 text-white" : "bg-sandstone-100 text-maroon-800"
                          }`}
                        >
                          <Icon size={22} weight={isOpen ? "bold" : "regular"} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-maroon-800 block mb-1">
                            0{index + 1} / Vision Statement
                          </span>
                          <h2 className="text-lg sm:text-xl font-serif font-bold text-maroon-950 leading-snug break-words">
                            {faq.question}
                          </h2>
                        </div>
                      </div>

                      <div
                        className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${
                          isOpen ? "rotate-180 bg-maroon-100 text-maroon-900" : "bg-sandstone-100 text-ink-600"
                        }`}
                      >
                        <CaretDown size={18} weight="bold" />
                      </div>
                    </button>

                    {/* Accordion Content */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                        >
                          <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-sandstone-100 text-ink-800 leading-relaxed font-sans text-base space-y-4">
                            <p>{faq.answer}</p>
                            
                            <div className="p-3.5 rounded-xl bg-maroon-50/70 border border-maroon-100 flex items-center gap-3">
                              <Quotes size={20} weight="duotone" className="text-maroon-700 shrink-0" />
                              <span className="text-xs font-serif font-bold italic text-maroon-950">
                                {faq.highlight}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>
      </div>

    </main>
  );
}
