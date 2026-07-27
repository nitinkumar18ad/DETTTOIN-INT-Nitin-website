export default function SkeletonLoader({ isVisible }) {
  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#fbf9f5] p-6 select-none overflow-hidden transition-opacity duration-500 ease-in-out ${
        isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!isVisible}
    >
      {/* Centered Vasant Valley Logo Icon */}
      <div className="relative flex flex-col items-center justify-center">
        
        {/* Subtle Outer Pulse Glow */}
        <div className="absolute -m-4 h-28 w-28 sm:h-36 sm:w-36 rounded-full bg-maroon-900/10 animate-ping pointer-events-none" />

        {/* Clean Logo Container */}
        <div className="relative flex h-24 w-24 sm:h-32 sm:w-32 items-center justify-center rounded-3xl bg-white p-5 shadow-xl border border-sandstone-200/90 transition-transform duration-500">
          <img
            src="/logo.svg"
            alt="Vasant Valley School"
            className="h-full w-full object-contain animate-pulse"
          />
        </div>

        {/* WhatsApp-Style Loading Progress Line */}
        <div className="mt-10 h-1.5 w-40 sm:w-48 overflow-hidden rounded-full bg-sandstone-200/90 p-0.5 shadow-xs">
          <div className="h-full w-full rounded-full bg-gradient-to-r from-maroon-800 via-maroon-600 to-maroon-900 animate-whatsapp-progress origin-left" />
        </div>

      </div>
    </div>
  );
}
