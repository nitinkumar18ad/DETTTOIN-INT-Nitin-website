import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlass,
  CaretDown,
  BookOpen,
  GraduationCap,
  CalendarBlank,
  Buildings,
  Briefcase,
  EnvelopeSimple,
  ArrowLeft,
  CheckCircle,
  Question,
  Tag,
  Clock,
  TShirt,
  Lock,
  CurrencyCircleDollar
} from "@phosphor-icons/react";
import SectionShell from "./SectionShell.jsx";

const FAQ_DATA = [
  {
    id: "board-affiliation",
    category: "Curriculums & Board",
    categoryIcon: GraduationCap,
    question: "Which Examination Board is Vasant Valley School affiliated to?",
    answer: "Vasant Valley School is affiliated to The Central Board of Secondary Education (CBSE) and is also registered as a Cambridge International School offering the Cambridge IGCSE and Cambridge A Level curriculums.",
  },
  {
    id: "cbse-subjects",
    category: "Curriculums & Board",
    categoryIcon: GraduationCap,
    question: "What are the various subjects offered by Vasant Valley School under the CBSE?",
    answer: "Vasant Valley School offers a wide array of subjects under CBSE for Class 10 and Class 12:",
    cbseSubjects: {
      class10: [
        "English",
        "Mathematics",
        "Science",
        "Social Science",
        "Indian Music",
        "Home Science",
        "Computer Application",
        "Hindi",
        "Sanskrit",
        "Basics of Accountancy",
        "Basics of Business"
      ],
      class12: [
        "English",
        "History",
        "Geography",
        "Sociology",
        "Political Science",
        "Economics",
        "Accountancy",
        "Business Studies",
        "Psychology",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "Biotechnology",
        "Home Science",
        "Applied Art",
        "Painting",
        "Sculpture",
        "Indian Classical Music (Vocal)",
        "Indian Classical Music (Instrumental)",
        "Computer Science"
      ]
    }
  },
  {
    id: "igcse-subjects",
    category: "Curriculums & Board",
    categoryIcon: GraduationCap,
    question: "What are the various subjects offered by Vasant Valley School under the Cambridge IGCSE curriculum?",
    answer: "Vasant Valley School offers 18 diverse subjects under the Cambridge IGCSE curriculum:",
    igcseSubjects: [
      { name: "First Language English", code: "0500" },
      { name: "French", code: "0520" },
      { name: "Spanish", code: "0530" },
      { name: "Hindi", code: "0549" },
      { name: "Mathematics", code: "0580" },
      { name: "International Mathematics", code: "0607" },
      { name: "Biology", code: "0610" },
      { name: "Physics", code: "0625" },
      { name: "Chemistry", code: "0620" },
      { name: "Environmental Management", code: "0680" },
      { name: "Global Perspectives", code: "0457" },
      { name: "History", code: "0470" },
      { name: "Literature in English", code: "0475" },
      { name: "Economics", code: "0455" },
      { name: "Art and Design", code: "0400" },
      { name: "Computer Science", code: "0478" },
      { name: "Information and Communication Technology", code: "0417" },
      { name: "Business Studies", code: "0450" }
    ]
  },
  {
    id: "apply-admission",
    category: "Admissions & Visits",
    categoryIcon: BookOpen,
    question: "How do I apply for admission for my ward?",
    answer: "Applications for admission need to be sent to admissions@vasantvalley.org. Admission to each year group depends on a vacancy. A paper copy of the application can also be submitted at the school office. The application needs to be refreshed every three months.",
    actionEmail: "admissions@vasantvalley.org"
  },
  {
    id: "preschool-admission",
    category: "Admissions & Visits",
    categoryIcon: BookOpen,
    question: "When does the Admission process for Pre School begin?",
    answer: "The admissions process for Pre School begins in December. The details are uploaded on our website as per the timeline prescribed by the Department of Education."
  },
  {
    id: "parent-visit",
    category: "Admissions & Visits",
    categoryIcon: BookOpen,
    question: "When can prospective parents visit school?",
    answer: "Prospective parents can register for an Open Day to take a guided tour of the school. Please visit the Open Day link on the website for more details."
  },
  {
    id: "rte-compliant",
    category: "Admissions & Visits",
    categoryIcon: BookOpen,
    question: "Is Vasant Valley School RTE compliant?",
    answer: "Vasant Valley School is in strict compliance with the Right to Education (RTE) Act."
  },
  {
    id: "academic-year",
    category: "Academic Calendar & Timings",
    categoryIcon: CalendarBlank,
    question: "What is the academic year of the school?",
    answer: "The academic year runs from April to March and is divided into four learning cycles:",
    learningCycles: [
      { name: "Learning Cycle 1", duration: "April to May" },
      { name: "Learning Cycle 2", duration: "July to September" },
      { name: "Learning Cycle 3", duration: "October to November" },
      { name: "Learning Cycle 4", duration: "January to March" }
    ]
  },
  {
    id: "school-timings",
    category: "Academic Calendar & Timings",
    categoryIcon: Clock,
    question: "What are the School Timings?",
    answer: "The day starts at 8:00 a.m. and ends at 3:00 p.m."
  },
  {
    id: "school-uniform",
    category: "Facilities & Uniform",
    categoryIcon: TShirt,
    question: "What is the school uniform?",
    answer: "The School uniform is cotton salwar-kameez for girls across all year groups, from Foundation to Class 12. The boys’ uniform is cotton trousers and shirt. There is no separate winter uniform — both boys and girls wear a maroon sweater with the School stripes in winter. The uniform is available in the Uniform Shop on the school campus."
  },
  {
    id: "school-lockers",
    category: "Facilities & Uniform",
    categoryIcon: Lock,
    question: "Do children have to carry all books home every day?",
    answer: "Students keep their books and notebooks in their personal lockers in the classroom. Other than the school diary, there is barely any load in the school bag. Only those books and notebooks required for homework or test revision go home."
  },
  {
    id: "fee-payment",
    category: "Facilities & Uniform",
    categoryIcon: CurrencyCircleDollar,
    question: "What is the procedure for payment of fees?",
    answer: "All school dues should be paid by cheque or draft in the name of “VASANT VALLEY SCHOOL”. Fees can also be paid online using the Parent school login ID."
  },
  {
    id: "foreign-languages",
    category: "Curriculums & Board",
    categoryIcon: GraduationCap,
    question: "Does Vasant Valley offer any foreign languages?",
    answer: "Vasant Valley School does not offer any foreign languages. All students need to study Hindi and Sanskrit till class 8 and then opt for either one of these two languages for classes 9 and 10."
  },
  {
    id: "hostel-facility",
    category: "Facilities & Uniform",
    categoryIcon: Buildings,
    question: "Does Vasant Valley offer hostel facility?",
    answer: "We are a day school and do not offer any hostel facility."
  },
  {
    id: "gurgaon-campus",
    category: "Facilities & Uniform",
    categoryIcon: Buildings,
    question: "Is there any other campus of Vasant Valley School?",
    answer: "Vasant Valley has a second upcoming campus in Gurgaon."
  },
  {
    id: "careers-apply",
    category: "Careers",
    categoryIcon: Briefcase,
    question: "How can I apply for a job in Vasant Valley School?",
    answer: "You need to upload your updated Resume on the Careers page of the School website or mail it directly to careers@vasantvalley.edu.in.",
    actionEmail: "careers@vasantvalley.edu.in"
  }
];

const CATEGORIES = [
  "All Questions",
  "Curriculums & Board",
  "Admissions & Visits",
  "Academic Calendar & Timings",
  "Facilities & Uniform",
  "Careers"
];

export default function FaqPage({ onNavigateHome }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Questions");
  const [openId, setOpenId] = useState("board-affiliation"); // First item open by default

  const filteredFaqs = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return FAQ_DATA.filter((faq) => {
      const matchesCategory =
        activeCategory === "All Questions" || faq.category === activeCategory;

      const matchesSearch =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        (faq.igcseSubjects &&
          faq.igcseSubjects.some((sub) => sub.name.toLowerCase().includes(query))) ||
        (faq.cbseSubjects &&
          [...faq.cbseSubjects.class10, ...faq.cbseSubjects.class12].some((sub) =>
            sub.toLowerCase().includes(query)
          ));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const toggleAccordion = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <main className="min-h-dvh bg-sandstone-50 text-ink-900 pb-20">
      
      {/* Back to Home Header Dock */}
      <div className="bg-sandstone-100/70 border-b border-sandstone-200/80 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-maroon-800 hover:text-maroon-950 transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} weight="bold" />
            <span>Back to Vasant Valley Home</span>
          </button>
          <span className="text-xs font-semibold text-ink-600">Official Knowledge Base</span>
        </div>
      </div>

      {/* Hero Section */}
      <SectionShell className="bg-white border-b border-sandstone-200/80 py-12 lg:py-16" animate={false}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column Text & Search */}
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-maroon-50 border border-maroon-100 text-maroon-900 text-xs font-bold uppercase tracking-wider mb-4">
              <Question size={16} weight="bold" className="text-maroon-700" />
              <span>Help & Information Center</span>
            </span>
            
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-maroon-950 tracking-tight leading-tight">
              Frequently Asked Questions
            </h1>
            
            <p className="mt-4 text-base sm:text-lg text-ink-750 leading-relaxed font-sans max-w-2xl">
              Find detailed answers regarding examination boards, CBSE and Cambridge IGCSE subjects, admissions, school timings, uniforms, and administrative procedures.
            </p>

            {/* Search Input Bar */}
            <div className="mt-8 relative max-w-xl">
              <div className="relative flex items-center">
                <MagnifyingGlass size={22} weight="bold" className="absolute left-4 text-maroon-800 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions, subjects, timings, fees..."
                  className="w-full rounded-2xl border border-sandstone-300 bg-sandstone-50/80 pl-12 pr-4 py-3.5 text-base text-maroon-950 placeholder:text-ink-500 shadow-sm focus:border-maroon-700 focus:bg-white focus:outline-none focus:ring-4 focus:ring-maroon-100 transition-all font-sans"
                />
              </div>
            </div>
          </div>

          {/* Right Column Image Banner */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-sandstone-200 aspect-[4/3] bg-sandstone-100 group">
              <img
                src="/images/faq-hero.png"
                alt="Frequently Asked Questions blocks"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-104"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-semibold backdrop-blur-md bg-black/30 p-3 rounded-xl border border-white/20">
                <span>Vasant Valley School Help Desk & Support</span>
              </div>
            </div>
          </div>

        </div>
      </SectionShell>

      {/* Main FAQ Content Section */}
      <SectionShell className="py-12 lg:py-16" animate={false}>
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-sandstone-200/80">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-maroon-900 text-white shadow-md"
                  : "bg-white text-ink-750 border border-sandstone-200 hover:border-maroon-300 hover:bg-maroon-50/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-ink-600">
          <span>Showing {filteredFaqs.length} Questions</span>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-maroon-800 hover:underline cursor-pointer"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Accordions List */}
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-sandstone-200 p-12 text-center my-8">
            <p className="text-xl font-serif font-bold text-maroon-950">No questions found</p>
            <p className="text-sm text-ink-600 mt-2">Try adjusting your search query or selecting a different category.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              const Icon = faq.categoryIcon || Question;

              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-white border-maroon-800 shadow-xl ring-2 ring-maroon-100"
                      : "bg-white border-sandstone-200/90 shadow-sm hover:border-maroon-300"
                  }`}
                >
                  {/* Accordion Header Button */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-500"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        isOpen ? "bg-maroon-900 text-white" : "bg-sandstone-100 text-maroon-800"
                      }`}>
                        <Icon size={20} weight={isOpen ? "bold" : "regular"} />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-maroon-800 block mb-1">
                          {faq.category}
                        </span>
                        <h3 className="text-lg sm:text-xl font-serif font-bold text-maroon-950 leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    <div className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-maroon-100 text-maroon-900" : "bg-sandstone-100 text-ink-600"
                    }`}>
                      <CaretDown size={18} weight="bold" />
                    </div>
                  </button>

                  {/* Accordion Body Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-sandstone-100 text-ink-800 leading-relaxed font-sans text-sm sm:text-base">
                          <p>{faq.answer}</p>

                          {/* CBSE Subjects Display */}
                          {faq.cbseSubjects && (
                            <div className="mt-6 space-y-6">
                              <div>
                                <h4 className="font-serif font-bold text-maroon-950 text-base mb-3 flex items-center gap-2">
                                  <Tag size={16} className="text-maroon-700" />
                                  <span>Class 10 CBSE Subjects ({faq.cbseSubjects.class10.length})</span>
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {faq.cbseSubjects.class10.map((subject) => (
                                    <span key={subject} className="px-3 py-1 rounded-lg bg-sandstone-100 border border-sandstone-200 text-xs font-semibold text-maroon-900">
                                      {subject}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-serif font-bold text-maroon-950 text-base mb-3 flex items-center gap-2">
                                  <Tag size={16} className="text-maroon-700" />
                                  <span>Class 12 CBSE Subjects ({faq.cbseSubjects.class12.length})</span>
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {faq.cbseSubjects.class12.map((subject) => (
                                    <span key={subject} className="px-3 py-1 rounded-lg bg-maroon-50 border border-maroon-100 text-xs font-semibold text-maroon-950">
                                      {subject}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Cambridge IGCSE Subjects Display */}
                          {faq.igcseSubjects && (
                            <div className="mt-6">
                              <h4 className="font-serif font-bold text-maroon-950 text-base mb-3 flex items-center gap-2">
                                <Tag size={16} className="text-maroon-700" />
                                <span>Cambridge IGCSE Curriculum Subjects ({faq.igcseSubjects.length})</span>
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                                {faq.igcseSubjects.map((sub) => (
                                  <div key={sub.code} className="p-2.5 rounded-xl bg-sandstone-50 border border-sandstone-200 flex items-center justify-between">
                                    <span className="text-xs font-bold text-maroon-950">{sub.name}</span>
                                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-maroon-100 text-maroon-900">
                                      {sub.code}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Learning Cycles Display */}
                          {faq.learningCycles && (
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                              {faq.learningCycles.map((cycle) => (
                                <div key={cycle.name} className="p-3 rounded-xl bg-maroon-50/70 border border-maroon-100">
                                  <span className="block text-xs font-bold text-maroon-900 uppercase">{cycle.name}</span>
                                  <span className="block text-sm text-ink-800 mt-1">{cycle.duration}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Direct Email Action Button */}
                          {faq.actionEmail && (
                            <div className="mt-5 pt-4 border-t border-sandstone-100">
                              <a
                                href={`mailto:${faq.actionEmail}`}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-maroon-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-maroon-800 transition-all shadow-sm"
                              >
                                <EnvelopeSimple size={16} weight="bold" />
                                <span>Email {faq.actionEmail}</span>
                              </a>
                            </div>
                          )}

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Contact Assistance Footer Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-white border border-sandstone-200 p-6 sm:p-8 shadow-lg flex items-start gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-maroon-900 text-white">
              <BookOpen size={24} weight="bold" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-maroon-950">Admission Enquiries</h3>
              <p className="text-sm text-ink-700 mt-1">Need help applying for admission? Send your queries directly to our admissions team.</p>
              <a
                href="mailto:admissions@vasantvalley.org"
                className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-maroon-800 hover:text-maroon-950"
              >
                <span>admissions@vasantvalley.org</span>
                <ArrowLeft size={14} weight="bold" className="rotate-180" />
              </a>
            </div>
          </div>

          <div className="rounded-3xl bg-white border border-sandstone-200 p-6 sm:p-8 shadow-lg flex items-start gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-maroon-900 text-white">
              <Briefcase size={24} weight="bold" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-maroon-950">Careers & Faculty</h3>
              <p className="text-sm text-ink-700 mt-1">Interested in teaching or administrative positions? Submit your resume online.</p>
              <a
                href="mailto:careers@vasantvalley.edu.in"
                className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-maroon-800 hover:text-maroon-950"
              >
                <span>careers@vasantvalley.edu.in</span>
                <ArrowLeft size={14} weight="bold" className="rotate-180" />
              </a>
            </div>
          </div>
        </div>

      </SectionShell>

    </main>
  );
}
