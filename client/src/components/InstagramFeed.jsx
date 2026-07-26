import { useState, useEffect } from "react";
import { InstagramLogo, Heart, ChatCircle } from "@phosphor-icons/react";
import SectionShell from "./SectionShell.jsx";

const mockInstagramPosts = [
  {
    id: "post-1",
    imageUrl: "/images/features/learning.svg", // Fallback to our existing SVG paths
    caption: "Inquiry and discovery in full action at our annual Science and Technology fair. #vasantvalley #learning",
    likes: 245,
    comments: 18
  },
  {
    id: "post-2",
    imageUrl: "/images/hero/sports-meet.svg",
    caption: "Determination and teamwork on display. Students competing for the school house cup! #sportsday #excellence",
    likes: 312,
    comments: 24
  },
  {
    id: "post-3",
    imageUrl: "/images/hero/art-exhibition.svg",
    caption: "A sneak peek of the senior school fine arts showcase. Stunning creative output! #studentart #creative",
    likes: 189,
    comments: 12
  },
  {
    id: "post-4",
    imageUrl: "/images/hero/annual-day.svg",
    caption: "An evening of performance, music, and celebration of the school community. #annualday #community",
    likes: 420,
    comments: 35
  }
];

export default function InstagramFeed() {
  const [viewMode, setViewMode] = useState("embed");
  const [embedLoading, setEmbedLoading] = useState(true);
  const [imageStates, setImageStates] = useState({});

  useEffect(() => {
    // Simulate loading the Instagram embed script/widget
    const timer = setTimeout(() => {
      // Simulate that the live feed widget fails or is blocked (e.g. adblock or API limits)
      setEmbedLoading(false);
      setViewMode("fallback");
    }, 2000); // 2-second simulation
    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = (id) => {
    setImageStates((prev) => ({ ...prev, [id]: "loaded" }));
  };

  const handleImageError = (id) => {
    setImageStates((prev) => ({ ...prev, [id]: "error" }));
  };

  return (
    <SectionShell id="instagram-feed" className="bg-sandstone-50 border-t border-sandstone-200">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-maroon-700">
          Social Feed
        </p>
        <h2 className="mt-4">Vasant Valley Social</h2>
        <p className="mt-4 text-ink-700">
          Connect with daily events, creative showcases, and achievements shared directly from the campus.
        </p>
      </div>

      {/* Main Feed Container - Reserved height to avoid Cumulative Layout Shift (CLS) */}
      <div className="min-h-[380px] w-full max-w-5xl mx-auto">
        {viewMode === "embed" && embedLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[380px] bg-white border border-sandstone-200 rounded-heritage shadow-soft p-8 text-center">
            <div className="w-10 h-10 border-4 border-maroon-700 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-sm font-sans text-ink-700">Connecting to Instagram live feed...</p>
          </div>
        ) : (
          /* Mock Grid displaying static post cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockInstagramPosts.map((post) => (
              <article
                key={post.id}
                className="relative group rounded-heritage overflow-hidden border border-sandstone-200 bg-white aspect-square shadow-soft hover:border-maroon-300 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image slot */}
                <div className="relative w-full h-[70%] bg-sandstone-100 overflow-hidden flex items-center justify-center">
                  <img
                    src={post.imageUrl}
                    alt={post.caption}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 z-10 relative"
                    onLoad={() => handleImageLoad(post.id)}
                    onError={() => handleImageError(post.id)}
                    style={{ display: imageStates[post.id] === "error" ? "none" : "block" }}
                  />
                  {imageStates[post.id] !== "loaded" && (
                    <div className="absolute inset-0 bg-sandstone-200 flex items-center justify-center text-ink-500 font-serif text-xs font-semibold p-4 text-center">
                      {imageStates[post.id] === "error" ? "Failed to load post" : "Live Post Preview"}
                    </div>
                  )}

                  {/* Hover overlay with metrics */}
                  <div className="absolute inset-0 bg-maroon-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white z-20">
                    <div className="flex items-center gap-1.5 font-sans font-semibold">
                      <Heart size={22} weight="fill" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-sans font-semibold">
                      <ChatCircle size={22} weight="fill" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>

                {/* Caption details */}
                <div className="p-4 h-[30%] flex items-center bg-white border-t border-sandstone-150">
                  <p className="text-xs text-ink-700 line-clamp-2 leading-relaxed font-sans">
                    {post.caption}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Action Button */}
        <div className="text-center mt-12">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-heritage bg-maroon-700 hover:bg-maroon-500 text-white font-semibold px-8 py-3 shadow-soft transition-all duration-200 cursor-pointer"
          >
            <InstagramLogo size={20} weight="bold" />
            Follow @vasantvalleyschool
          </a>
        </div>
      </div>
    </SectionShell>
  );
}
