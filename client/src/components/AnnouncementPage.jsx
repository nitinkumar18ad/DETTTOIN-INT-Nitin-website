import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Megaphone, Buildings, SealCheck } from "@phosphor-icons/react";
import SectionShell from "./SectionShell.jsx";

export default function AnnouncementPage({ onNavigateHome }) {
  return (
    <main className="min-h-dvh bg-sandstone-50 text-ink-900 pb-20">
      
      {/* Top Header Dock */}
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
          <span className="text-xs font-semibold text-ink-600">Official Announcement</span>
        </div>
      </div>

      {/* Main Hero Header */}
      <SectionShell className="bg-white border-b border-sandstone-200/80 py-12 sm:py-16" animate={false}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-maroon-50 border border-maroon-100 text-maroon-900 text-xs font-bold uppercase tracking-wider mb-6">
            <Megaphone size={16} weight="bold" className="text-maroon-700" />
            <span>Major School Milestone</span>
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-maroon-950 tracking-tight leading-[1.18]">
            Announcing Vasant Valley School, Gurgaon
          </h1>

          <p className="mt-4 text-base sm:text-lg text-ink-700 font-sans max-w-2xl mx-auto">
            Expanding thirty-six years of educational excellence, values, and holistic development to a wider community of learners.
          </p>
        </div>
      </SectionShell>

      {/* Content Letter Section */}
      <SectionShell className="py-12 sm:py-16" animate={false}>
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Featured Announcement Card Image Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[28px] border border-sandstone-200 shadow-2xl bg-sandstone-100 aspect-[2.1/1] sm:aspect-[2.5/1] group"
          >
            <img
              src="/images/announcement-hero.jpg"
              alt="Official Announcements Card"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-104"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/60 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-white">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-sandstone-200 block">Official Notice</span>
                <span className="text-sm font-serif font-semibold text-white">Vasant Valley School — New Chapter & Gurgaon Expansion</span>
              </div>
              <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-white border border-white/30">
                Education Today
              </span>
            </div>
          </motion.div>

          {/* Main Letter Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[32px] bg-white border border-sandstone-200/90 shadow-xl p-8 sm:p-12 lg:p-14"
          >
            {/* Ambient Glow Effects */}
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-maroon-100/30 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-sandstone-200/40 blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6 text-base sm:text-lg text-ink-800 leading-relaxed font-sans">
              
              {/* Paragraph 1 */}
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-maroon-900 first-letter:mr-3 first-letter:float-left first-letter:leading-none">
                Thirty-six years ago, a dream took shape, and Vasant Valley School was born. Over the years, the School, founded and run by Education Today, has built a reputation for strength, authenticity, and excellence in school education. This reputation rests upon a foundation of shared values, thoughtful pedagogy, and an unwavering commitment to the holistic development of every child entrusted to our care. Today, we are recognised not only for the quality of our teaching and leadership but for the enduring trust placed in us by generations of families and educators.
              </p>

              {/* Paragraph 2 & Leadership Card */}
              <p>
                We are now ready to begin an exciting new chapter by taking our expertise and best practices to a wider community of learners through new campuses starting in Gurgaon. While the founding campus will continue to be run by Education Today, the new Vasant Valley Schools will be developed and managed by a dedicated new team that includes our former Principal, <strong className="text-maroon-950 font-bold">Ms Rekha Krishnan</strong> (Chief Education Officer, Education Today), <strong className="text-maroon-950 font-bold">Mr Raj Singh Bhandal</strong> (Trustee, Vasant Valley School), <strong className="text-maroon-950 font-bold">Mr Vishnu Karthik</strong> (Former CEO, Heritage Xperiential Group of Schools), and other educators with a proven track record of setting up progressive school communities.
              </p>

              {/* Highlight Leadership Grid */}
              <div className="my-8 rounded-2xl bg-sandstone-100/80 border border-sandstone-200 p-6 sm:p-8">
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-maroon-800 flex items-center gap-2 mb-4">
                  <SealCheck size={18} weight="bold" />
                  <span>New Campus Leadership Team</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-sandstone-200 shadow-sm">
                    <span className="block text-sm font-serif font-bold text-maroon-950">Ms Rekha Krishnan</span>
                    <span className="block text-xs text-ink-600 mt-0.5">Chief Education Officer, Education Today & Former Principal</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-sandstone-200 shadow-sm">
                    <span className="block text-sm font-serif font-bold text-maroon-950">Mr Raj Singh Bhandal</span>
                    <span className="block text-xs text-ink-600 mt-0.5">Trustee, Vasant Valley School</span>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-sandstone-200 shadow-sm">
                    <span className="block text-sm font-serif font-bold text-maroon-950">Mr Vishnu Karthik</span>
                    <span className="block text-xs text-ink-600 mt-0.5">Former CEO, Heritage Xperiential Group of Schools</span>
                  </div>
                </div>
              </div>

              {/* Paragraph 3 */}
              <p>
                The ethos, academic standards, curriculum, and deep focus on student well-being, along with our motto of <span className="font-serif italic font-bold text-maroon-900">‘Excellence in Deed’</span>, will remain firmly at the heart of everything they do. While these new Vasant Valley Schools will build on the learning of the last 36 years, they will also reflect 21st-century global educational best practices.
              </p>

              {/* CTA Website Banner */}
              <div className="my-8 rounded-2xl bg-maroon-950 text-white p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sandstone-200 block mb-1">Gurgaon Campus Website</span>
                  <h4 className="text-xl font-serif font-bold text-white">Explore Vasant Valley School — Gurgaon</h4>
                </div>
                <a
                  href="https://vasantvalley.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-maroon-950 font-bold text-xs uppercase tracking-wider hover:bg-sandstone-100 transition-all shadow-md shrink-0 cursor-pointer"
                >
                  <span>Visit Gurgaon Website</span>
                  <ArrowUpRight size={16} weight="bold" />
                </a>
              </div>

              {/* Paragraph 4 */}
              <p className="pt-2">
                We value your continued support and good wishes as we embark on this significant new phase in Vasant Valley School’s journey.
              </p>

              {/* Sign-off Signature Block */}
              <div className="mt-10 pt-8 border-t border-sandstone-200 flex items-center justify-between">
                <div>
                  <span className="font-serif text-2xl font-bold text-maroon-950 block">Rekha Purie</span>
                  <span className="text-sm font-semibold text-ink-700 block mt-0.5">Chairperson</span>
                  <span className="text-xs text-ink-600 block">Vasant Valley School (Education Today Trust)</span>
                </div>

                <div className="hidden sm:flex h-14 w-14 items-center justify-center rounded-2xl bg-maroon-50 border border-maroon-100 text-maroon-800">
                  <Buildings size={28} weight="bold" />
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </SectionShell>

    </main>
  );
}
