# Vasant Valley School Website Implementation Plan

## 1. Tech Stack

- Frontend: React.js with Vite.
- Styling: Tailwind CSS.
- Backend: Node.js with Express.js.
- Language: plain JavaScript.
- API style: REST JSON.
- Icons: one icon family, planned `@phosphor-icons/react` unless dependency approval changes.
- Motion: CSS transitions first. No heavy animation dependency unless a later milestone needs it.

## 2. Repository Structure

```txt
VasantValley/
  PRD.md
  IMPLEMENTATION.md
  client/
    index.html
    package.json
    vite.config.js
    tailwind.config.js
    postcss.config.js
    src/
      main.jsx
      App.jsx
      index.css
      api/
        contentApi.js
      components/
        AnnouncementsGrid.jsx
        Footer.jsx
        HeroCarousel.jsx
        InstagramFeed.jsx
        LoginModal.jsx
        MissionBlock.jsx
        MottoSection.jsx
        Navbar.jsx
        NewsTimeline.jsx
        SearchOverlay.jsx
        SectionShell.jsx
        SplitFeature.jsx
        ValueWheel.jsx
      data/
        fallbackContent.js
      hooks/
        useFetch.js
      utils/
        date.js
  server/
    package.json
    index.js
    data/
      announcements.js
      heroSlides.js
      navItems.js
      newsEvents.js
      values.js
    routes/
      contentRoutes.js
    middleware/
      cors.js
```

## 3. Component Breakdown

### `App.jsx`

- Owns page section order.
- Fetches page data through API helpers.
- Passes data to each section.
- Provides shared loading and error fallback behavior.

### `Navbar.jsx`

- Sticky header.
- Logo, nav links, hamburger, search, and login.
- Mobile drawer.
- Keyboard focus trapping for drawer if open.

### `SearchOverlay.jsx`

- Search input with visible label.
- Mock search over fetched content.
- Empty state.
- Escape key closes overlay.

### `LoginModal.jsx`

- Modal shell for login.
- Student and parent modes.
- Mock fields or portal links.
- Focus management and accessible close behavior.

### `HeroCarousel.jsx`

- Image carousel with captions.
- Previous, next, and indicator controls.
- Pause on hover and focus.
- Reduced-motion support.

### `MissionBlock.jsx`

- Editorial mission statement block.
- Serif heading and maroon emphasis.

### `AnnouncementsGrid.jsx`

- Renders exactly 3 announcement cards.
- Loading skeleton, error state, and empty state.

### `MottoSection.jsx`

- Pull-quote treatment for "Excellence in Deed".
- Sandstone background band.

### `SplitFeature.jsx`

- Reusable image and text split.
- Supports alternating layout via prop.
- Used by About, Infrastructure, Learning Experience, and optional third feature.

### `ValueWheel.jsx`

- Desktop radial value wheel.
- Tablet and mobile grid fallback.
- Icons, labels, and short descriptions.

### `NewsTimeline.jsx`

- Month and year filters.
- Timeline-inspired responsive grid.
- Reset filter button.
- Empty state.

### `InstagramFeed.jsx`

- Lazy-loaded embed slot.
- Static fallback cards when embed is blocked.
- Link to official Instagram.

### `Footer.jsx`

- Multi-column footer.
- Nav links, contact, social icons, student login, and parent login.

## 4. API Routes

Base URL in development:

```txt
http://localhost:5000/api
```

Routes:

```txt
GET /api/nav
GET /api/hero-slides
GET /api/announcements
GET /api/news-events
GET /api/values
GET /api/home
```

### `GET /api/home`

Aggregated payload for the homepage.

```json
{
  "navItems": [],
  "heroSlides": [],
  "announcements": [],
  "newsEvents": [],
  "values": []
}
```

## 5. Tailwind Theme Tokens

Planned `tailwind.config.js` extension:

```js
theme: {
  extend: {
    colors: {
      maroon: {
        50: "#fbf4f2",
        100: "#f3ddd8",
        500: "#8f1f22",
        700: "#681416",
        900: "#3f0d0f"
      },
      sandstone: {
        50: "#fffaf2",
        100: "#f5ead7",
        200: "#e7d2ad",
        400: "#c49b63"
      },
      ink: {
        900: "#211b18",
        700: "#4a403b",
        500: "#756b64"
      }
    },
    fontFamily: {
      serif: ["Cormorant Garamond", "Georgia", "serif"],
      sans: ["Source Sans 3", "Arial", "sans-serif"]
    },
    borderRadius: {
      heritage: "8px"
    },
    boxShadow: {
      soft: "0 18px 50px rgb(63 13 15 / 0.08)"
    },
    transitionTimingFunction: {
      out: "cubic-bezier(0.23, 1, 0.32, 1)"
    }
  }
}
```

Typography note:

- Serif is justified because the brief explicitly asks for heritage and editorial headings.
- Avoid generic startup typography and purple-blue gradients.
- Use restrained heading scale so the site feels institutional, not promotional.

## 6. Visual System Rules

- Preserve maroon and beige sandstone identity.
- Use warm white backgrounds and deep ink text.
- Keep corner radius at 8px for cards, modals, and controls.
- Use maroon for primary actions and active states.
- Use beige and sandstone for section bands and quiet emphasis.
- Use subtle borders before shadows.
- Use transitions only for state feedback, carousel, drawer, modal, and filtering.
- Animate only opacity and transform.
- Respect `prefers-reduced-motion`.

## 7. Build Milestones

### Milestone 0: Approval Gate

- Complete `PRD.md`.
- Complete `IMPLEMENTATION.md`.
- Wait for user review and approval.
- No scaffold or application code before approval.

### Milestone 1: Project Scaffold

- Create `client/` Vite React app.
- Add Tailwind CSS.
- Create `server/` Express app.
- Add npm scripts for frontend, backend, and concurrent dev if useful.
- Confirm both apps start locally.

### Milestone 2: Backend Mock API

- Add mock data files.
- Add REST routes.
- Add CORS and JSON middleware.
- Verify `/api/home` returns all homepage content.

### Milestone 3: Frontend Design System Base

- Add Tailwind tokens.
- Add global CSS base styles.
- Add layout shell and section spacing.
- Add accessible button, link, and focus styles.

### Milestone 4: Header, Search, Login

- Build sticky navbar.
- Build mobile drawer.
- Build search overlay.
- Build student and parent login modal.
- Verify keyboard navigation.

### Milestone 5: Hero And Top Content

- Build hero carousel.
- Build mission block.
- Build 3-card announcements grid.
- Build motto section.
- Verify responsive behavior.

### Milestone 6: About And Feature Sections

- Build About Us split.
- Build Infrastructure block.
- Build Learning Experience block.
- Add optional third alternating feature if content supports it.

### Milestone 7: Values, Timeline, Instagram, Footer

- Build 8-value icon wheel.
- Build filterable news/events timeline.
- Build Instagram feed embed with fallback.
- Build multi-column footer.

### Milestone 8: Polish And Verification

- Test mobile, tablet, desktop.
- Test reduced motion.
- Test keyboard navigation.
- Test loading, error, and empty states.
- Run production build.
- Start local dev servers and provide URLs.

## 8. Verification Checklist

- `npm run build` in `client/`.
- Backend route smoke test for `/api/home`.
- Manual browser check at desktop and mobile widths.
- Keyboard check: nav, menu, search, carousel, login, filters.
- Contrast check for maroon buttons, footer, captions, and links.
- No horizontal scroll.
- No layout shift from images or Instagram embed.

## 9. Approval Required Before Code

Implementation stops here until both documents are reviewed and approved.
