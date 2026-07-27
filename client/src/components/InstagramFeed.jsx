import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { InstagramLogo, Heart, ChatCircle, CaretLeft, CaretRight, Sparkle } from "@phosphor-icons/react";
import SectionShell from "./SectionShell.jsx";

const mockInstagramPosts = [
  {
    id: "post-1",
    imageUrl: "/images/hero/art-exhibition.svg",
    caption: "Creative brilliance on display at the Senior Art Exhibition. Students shared paintings, sculptures, and digital media.",
    likes: 384,
    comments: 29,
    date: "2 hours ago",
    tag: "Creative Arts"
  },
  {
    id: "post-2",
    imageUrl: "/images/hero/sports-meet.svg",
    caption: "House spirit soaring high! Highlights from our annual track and field championships on the main sports ground.",
    likes: 512,
    comments: 42,
    date: "5 hours ago",
    tag: "Sports Meet"
  },
  {
    id: "post-3",
    imageUrl: "/images/features/learning.svg",
    caption: "Inquiry and discovery in action at the Science & Tech Fair. Young innovators presenting sustainable solutions.",
    likes: 295,
    comments: 18,
    date: "1 day ago",
    tag: "Academics"
  },
  {
    id: "post-4",
    imageUrl: "/images/hero/campus-morning.svg",
    caption: "Golden hour over the sandstone arches of Vasant Valley School campus. A peaceful morning before classes begin.",
    likes: 640,
    comments: 51,
    date: "2 days ago",
    tag: "Campus Life"
  },
  {
    id: "post-5",
    imageUrl: "/images/features/infrastructure.svg",
    caption: "Collaborative design studio in session. High school students designing architectural prototypes for community spaces.",
    likes: 218,
    comments: 14,
    date: "3 days ago",
    tag: "Innovation"
  },
  {
    id: "post-6",
    imageUrl: "/images/hero/mainhero.png",
    caption: "Together in excellence. Celebrating our inter-school debate champions as they bring home the coveted trophy.",
    likes: 475,
    comments: 36,
    date: "4 days ago",
    tag: "Debate & Oratory"
  }
];

export default function InstagramFeed() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play interval (faster rotation)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockInstagramPosts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mockInstagramPosts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + mockInstagramPosts.length) % mockInstagramPosts.length);
  };

  // Helper to calculate circular offset relative to current index
  const getCardOffset = (cardIndex) => {
    const total = mockInstagramPosts.length;
    let diff = cardIndex - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <SectionShell id="instagram-feed" className="bg-sandstone-50 border-t border-sandstone-200 overflow-hidden" animate={false}>
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon-50 border border-maroon-100 text-maroon-700 text-xs font-semibold uppercase tracking-wider mb-3">
          <InstagramLogo size={16} weight="bold" />
          <span>@vasantvalleyschool</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-maroon-900">Vasant Valley Social</h2>
        <p className="mt-3 text-ink-700 text-sm sm:text-base leading-relaxed">
          Daily moments, creative showcases, and campus achievements shared live.
        </p>
      </div>

      {/* 3D Curved Infinite Carousel Container */}
      <div
        className="relative w-full max-w-6xl mx-auto py-8 flex flex-col items-center justify-center select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* 3D Perspective Stage */}
        <div
          className="relative w-full h-[420px] sm:h-[460px] flex items-center justify-center"
          style={{ perspective: "1200px" }}
        >
          {mockInstagramPosts.map((post, idx) => {
            const offset = getCardOffset(idx);
            const isVisible = Math.abs(offset) <= 2;
            if (!isVisible) return null;

            // Compute 3D curved transform values based on offset
            const xTranslate = offset * 280; // horizontal spacing (px)
            const rotateY = offset * -22;   // 3D curve rotation angle (deg)
            const scale = offset === 0 ? 1 : Math.max(0.75, 1 - Math.abs(offset) * 0.18);
            const zIndex = 30 - Math.abs(offset) * 10;
            const opacity = offset === 0 ? 1 : Math.max(0.4, 1 - Math.abs(offset) * 0.4);

            return (
              <motion.div
                key={post.id}
                initial={false}
                animate={{
                  x: xTranslate,
                  rotateY: rotateY,
                  scale: scale,
                  opacity: opacity,
                  z: offset === 0 ? 80 : -Math.abs(offset) * 120,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  position: "absolute",
                  zIndex: zIndex,
                  transformStyle: "preserve-3d",
                }}
                onClick={() => setCurrentIndex(idx)}
                className={`w-[290px] sm:w-[340px] rounded-2xl bg-white border shadow-xl overflow-hidden cursor-pointer transition-shadow duration-300 ${offset === 0
                    ? "border-maroon-400 shadow-2xl ring-2 ring-maroon-600/20"
                    : "border-sandstone-200/80 shadow-md hover:border-maroon-300"
                  }`}
              >
                {/* Header Bar */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-sandstone-100 bg-white">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[2px]">
                      <div className="w-full h-full rounded-full bg-white p-[1.5px]">
                        <img src="/logo.svg" alt="VVS Logo" className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-maroon-950 leading-tight">vasantvalley</h4>
                      <p className="text-[10px] text-ink-500 font-medium">{post.date}</p>
                    </div>
                  </div>
                  <InstagramLogo size={18} className="text-rose-600" weight="bold" />
                </div>

                {/* Post Image */}
                <div className="relative h-56 sm:h-64 w-full bg-sandstone-100 overflow-hidden group">
                  <img
                    src={post.imageUrl}
                    alt={post.caption}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  {/* Category Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                      {post.tag}
                    </span>
                  </div>

                  {/* Likes & Comments Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Heart size={16} weight="fill" className="text-rose-400" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <ChatCircle size={16} weight="fill" className="text-white/90" />
                        {post.comments}
                      </span>
                    </div>
                    <Sparkle size={14} className="text-amber-300" weight="fill" />
                  </div>
                </div>

                {/* Post Caption */}
                <div className="p-4 bg-white">
                  <p className="text-xs text-ink-800 line-clamp-2 leading-relaxed font-sans font-medium">
                    <span className="font-bold text-maroon-950 mr-1.5">vasantvalleyschool</span>
                    {post.caption}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Floating Side Navigation Arrows */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous social post"
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/85 backdrop-blur-md border border-sandstone-200/80 text-maroon-900 shadow-lg hover:bg-maroon-700 hover:text-white hover:border-maroon-700 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-500"
        >
          <CaretLeft size={22} weight="bold" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next social post"
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-white/85 backdrop-blur-md border border-sandstone-200/80 text-maroon-900 shadow-lg hover:bg-maroon-700 hover:text-white hover:border-maroon-700 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-500"
        >
          <CaretRight size={22} weight="bold" />
        </button>

        {/* Centered Glassmorphism Pagination Dock */}
        <div className="flex items-center justify-center mt-6 z-40">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-md border border-sandstone-200/80 shadow-md">
            <div className="flex items-center gap-2">
              {mockInstagramPosts.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${currentIndex === i
                      ? "w-7 bg-maroon-700"
                      : "w-2 bg-sandstone-300 hover:bg-maroon-400"
                    }`}
                />
              ))}
            </div>
            <span className="w-px h-3.5 bg-sandstone-300/80 mx-0.5" />
            <span className="text-xs font-semibold text-maroon-950 font-mono tracking-wider">
              {String(currentIndex + 1).padStart(2, "0")} / {String(mockInstagramPosts.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
