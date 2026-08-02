# Vasant Valley School — Modern Web Application
A modern, high-performance, and visually engaging static web application for **Vasant Valley School**, built with React 18, Vite, Tailwind CSS, Framer Motion, and GSAP.


## Project & Candidate Information

- **Full Name**: Nitin Kumar
- **Intern ID**: NA
- **Email Address**: nitinkumar18ad@gmail.com
- **GitHub Username**: nitinkumar18ad
- **Selected Website**: https://www.vasantvalley.org/
- **Live Demo Link**: https://dettroin-int-nitin-website.vercel.app/

---

## Technologies Used
- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, GSAP (GreenSock), Phosphor Icons, Lenis Smooth Scroll
- **Deployment**: Vercel static build (`vercel.json`)

---

## Key Improvements Made
1. **Brand-Aligned Modern Aesthetic**:
   - Designed a rich, heritage-inspired color palette (`#3f0d0f` deep maroon, sandstone tints, warm ivory) paired with Cormorant Garamond serif and Source Sans typography.

2. **Interactive 8-Dimension Ethos Radial Wheel (`ValueWheel.jsx`)**:
   - Replaced static text lists with an interactive 360° circular wheel track featuring upright counter-rotating nodes, micro-physics animations, and dynamic central showcase cards.

3. **50-50 Split Vision & Philosophy Page (`VisionPhilosophyPage.jsx`)**:
   - Created a dedicated page featuring a sticky visual showcase card and an interactive Q&A accordion answering core educational principles.

4. **Multi-Level Hover & Mobile Navigation (`Navbar.jsx`)**:
   - Added hover dropdown menus for Core Values, About Us, News & Events, and Social Channels with official brand colors (`#1877F2` Facebook, `#0A66C2` LinkedIn, `#FF0000` YouTube, `#E4405F` Instagram).
   - Built a non-intrusive React Portal side slide-over mobile drawer containing all navigation links, social channels, search, and portal login.

5. **3D Perspective Card Tilt Animations (`MissionBlock.jsx`)**:
   - Integrated cursor-driven 3D tilt physics and radial lighting sheen reflections with elevated 3D school logo badge displays.

6. **Interactive News & Events Timeline (`NewsTimeline.jsx`)**:
   - Implemented an automated 1.8s milestone deck progression with pause-on-hover controls and category filtering.

7. **3D Curved Social Media Showcase (`InstagramFeed.jsx`)**:
   - Created an infinite 3D perspective carousel showcasing live campus activities.

8. **Inertia Smooth Scrolling & Accessibility**:
   - Integrated `@studio-freight/lenis` smooth scroll with instant anchor target resolution and keyboard focus trapping for search and login modals.

---

## Getting Started

### Prerequisites
- Node.js (v18.x or higher)
- npm or yarn

### Installation & Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nitinkumar18ad/DETTROIN-INT-Nitin-website.git
   cd DETTROIN-INT-Nitin-website
   ```

2. **Install Client Dependencies**:
   ```bash
   cd client
   npm install
   ```

3. **Run Development Server**:
   ```bash
   # Start Client Dev Server (Localhost:5173)
   cd client
   npm run dev
   ```

---

## Project Architecture
```
├── client/                     # Vite + React Frontend Application
│   ├── src/
│   │   ├── components/         # Reusable UI Components
│   │   │   ├── AnnouncementPage.jsx# Dedicated Announcements Page
│   │   │   ├── CustomSelect.jsx    # Custom Glassmorphism Dropdown
│   │   │   ├── FaqPage.jsx         # Dedicated FAQ Page
│   │   │   ├── Footer.jsx          # Site Footer with Official Social Links
│   │   │   ├── InstagramFeed.jsx   # 3D Curved Social Carousel
│   │   │   ├── LoginModal.jsx      # Student/Parent Login Modal
│   │   │   ├── MainHero.jsx        # Hero Component
│   │   │   ├── MissionBlock.jsx    # 3D Tilt About Us Mission Card
│   │   │   ├── Navbar.jsx          # Floating Pill Navigation & Mobile Drawer
│   │   │   ├── NewsTimeline.jsx    # Horizontal Timeline Deck
│   │   │   ├── SearchOverlay.jsx   # Command-K Style Search Modal
│   │   │   ├── SectionShell.jsx    # Layout Section Shell Wrapper
│   │   │   ├── SplitFeature.jsx    # Feature Card Split
│   │   │   ├── ValueWheel.jsx      # 8-Node Core Ethos Radial Wheel
│   │   │   └── VisionPhilosophyPage.jsx # 50-50 Split Q&A Page
│   │   ├── hooks/              # Custom React Hooks (ScrollSpy, FocusTrap)
│   │   ├── utils/              # Utility Functions & Date Formatters
│   │   ├── App.jsx             # Main Application Container & Router
│   │   └── index.css           # Global Styles & Overflow Guards
│   └── vite.config.js          # Vite Build Configuration
└── server/                     # Node.js Express Backend API
    ├── data/                   # Initial Content Datasets
    ├── routes/                 # Express API Endpoint Routes
    └── server.js               # Express Application Server Entrypoint
```

---

## Production Build Verification
To test the production bundle locally:

```bash
cd client
npm run build
```

---

## License
Created for Vasant Valley School. All rights reserved.
