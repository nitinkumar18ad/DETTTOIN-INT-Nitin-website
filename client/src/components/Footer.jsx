import { InstagramLogo, FacebookLogo, TwitterLogo, MapPin, Phone, Envelope } from "@phosphor-icons/react";

export default function Footer({ onLoginOpen }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-maroon-900 text-sandstone-100 border-t-4 border-maroon-700">
      {/* Upper Footer: Multi-column grid */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Column 1: School Identity */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-serif font-bold text-sandstone-50 tracking-wide">
            Vasant Valley School
          </h3>
          <p className="text-sm text-sandstone-200 leading-relaxed max-w-xs font-sans">
            Nurturing thoughtful learners who act with confidence, compassion, and excellence in deed.
          </p>
          
          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-2">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sandstone-200 hover:text-white transition-colors p-1"
              aria-label="Visit Instagram"
            >
              <InstagramLogo size={22} weight="bold" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sandstone-200 hover:text-white transition-colors p-1"
              aria-label="Visit Facebook"
            >
              <FacebookLogo size={22} weight="bold" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sandstone-200 hover:text-white transition-colors p-1"
              aria-label="Visit Twitter"
            >
              <TwitterLogo size={22} weight="bold" />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-sandstone-50 mb-6 font-sans">
            Navigation
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href="#about" className="text-sandstone-200 hover:text-white transition-colors font-sans">
                About Us
              </a>
            </li>
            <li>
              <a href="#announcements" className="text-sandstone-200 hover:text-white transition-colors font-sans">
                Announcements
              </a>
            </li>
            <li>
              <a href="#news-events" className="text-sandstone-200 hover:text-white transition-colors font-sans">
                News &amp; Events
              </a>
            </li>
            <li>
              <a href="#values" className="text-sandstone-200 hover:text-white transition-colors font-sans">
                Guiding Ethos
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Portals & Logins */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-sandstone-50 mb-6 font-sans">
            Portals
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <button
                type="button"
                onClick={onLoginOpen}
                className="text-left text-sandstone-200 hover:text-white transition-colors font-sans cursor-pointer focus-visible:outline-none focus-visible:underline"
              >
                Student Portal
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={onLoginOpen}
                className="text-left text-sandstone-200 hover:text-white transition-colors font-sans cursor-pointer focus-visible:outline-none focus-visible:underline"
              >
                Parent Portal
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={onLoginOpen}
                className="text-left text-sandstone-200 hover:text-white transition-colors font-sans cursor-pointer focus-visible:outline-none focus-visible:underline"
              >
                Staff Login
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Details */}
        <div className="flex flex-col gap-4 text-sm text-sandstone-200">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-sandstone-50 mb-2 font-sans">
            Contact Us
          </h4>
          <div className="flex items-start gap-3">
            <MapPin size={18} className="text-sandstone-50 mt-0.5 shrink-0" />
            <span className="font-sans">Sector C, Vasant Kunj, New Delhi - 110070, India</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone size={18} className="text-sandstone-50 shrink-0" />
            <span className="font-sans">+91 11 2689 6542</span>
          </div>
          <div className="flex items-center gap-3">
            <Envelope size={18} className="text-sandstone-50 shrink-0" />
            <span className="font-sans">info@vasantvalley.org</span>
          </div>
        </div>

      </div>

      {/* Lower Footer: Copyright bar */}
      <div className="border-t border-maroon-800 bg-maroon-950 text-center py-6 text-xs text-sandstone-300 font-sans">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; {currentYear} Vasant Valley School. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
