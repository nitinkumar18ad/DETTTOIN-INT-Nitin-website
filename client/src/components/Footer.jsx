import { FacebookLogo, InstagramLogo, EnvelopeSimple, MapPin, Phone, TwitterLogo } from "@phosphor-icons/react";

export default function Footer({ onLoginOpen }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="px-4 pb-6 pt-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-[#161618] text-white shadow-[0_28px_80px_rgba(0,0,0,0.18)] ring-1 ring-white/5">
        <div className="relative px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(120,65,55,0.28),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_32%)]" />
          <div className="relative grid gap-14 lg:grid-cols-[minmax(0,1.4fr)_auto] lg:gap-8">
            <div className="max-w-xl">
              <h3 className="max-w-md text-3xl font-semibold leading-tight !text-white sm:text-4xl lg:text-[2.9rem]">
                Building thoughtful learners for a changing world.
              </h3>

              <div className="mt-10 flex items-center gap-3">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 !text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/8 hover:!text-white"
                  aria-label="Visit Instagram"
                >
                  <InstagramLogo size={18} weight="regular" className="!text-white" />
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 !text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/8 hover:!text-white"
                  aria-label="Visit Facebook"
                >
                  <FacebookLogo size={18} weight="regular" className="!text-white" />
                </a>
                <a
                  href={`mailto:info@vasantvalley.org`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 !text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/8 hover:!text-white"
                  aria-label="Send email"
                >
                  <EnvelopeSimple size={18} weight="regular" className="!text-white" />
                </a>
                <a
                  href="tel:+911126896542"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 !text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/8 hover:!text-white"
                  aria-label="Call school"
                >
                  <Phone size={18} weight="regular" className="!text-white" />
                </a>
              </div>
            </div>

            <div className="grid gap-10 sm:grid-cols-2 sm:gap-16 lg:gap-20">
              <div>
                <h4 className="text-sm font-semibold !text-white">Explore</h4>
                <ul className="mt-6 space-y-4 text-sm text-white/75">
                  <li><a href="#about" className="!text-white/75 transition-colors hover:!text-white">Home</a></li>
                  <li><a href="#values" className="!text-white/75 transition-colors hover:!text-white">Values</a></li>
                  <li><a href="#news-events" className="!text-white/75 transition-colors hover:!text-white">News</a></li>
                  <li><a href="#instagram-feed" className="!text-white/75 transition-colors hover:!text-white">Gallery</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold !text-white">More</h4>
                <ul className="mt-6 space-y-4 text-sm text-white/75">
                  <li>
                    <button type="button" onClick={onLoginOpen} className="text-left !text-white/75 transition-colors hover:!text-white">
                      Parent Portal
                    </button>
                  </li>
                  <li>
                    <button type="button" onClick={onLoginOpen} className="text-left !text-white/75 transition-colors hover:!text-white">
                      Student Portal
                    </button>
                  </li>
                  <li><a href="#footer" className="!text-white/75 transition-colors hover:!text-white">Contact</a></li>
                  <li><a href="#" className="!text-white/75 transition-colors hover:!text-white">Admissions</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="relative mt-14 border-t border-white/10 pt-6 text-sm text-white/75 sm:mt-16">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p>&copy; {currentYear} Vasant Valley School. All rights reserved.</p>
              <p>Sector C, Vasant Kunj, New Delhi - 110070, India</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
