# Vasant Valley School Website Redesign PRD

## 1. Product Goal

Build a modern, responsive redesign of `vasantvalley.org` that preserves the school's existing heritage identity: deep maroon, beige sandstone tones, generous white space, serif-led headings, editorial rhythm, and a calm institutional tone.

The redesign must improve usability, visual hierarchy, accessibility, mobile behavior, and content discoverability without inventing a new brand language or changing the requested content structure.

## 2. Design Read

Preservation-first school website redesign for parents, students, alumni, staff, and prospective families, with a heritage editorial language, leaning toward React, Tailwind tokens, restrained motion, and content-led layouts.

Design dials:

- Design variance: 4/10, structured editorial layouts with mild asymmetry.
- Motion intensity: 3/10, subtle transitions and carousel movement only.
- Visual density: 5/10, public-school information density with calmer spacing.

## 3. Target Users

- Prospective parents evaluating the school, curriculum, ethos, and campus.
- Current parents looking for announcements, events, login access, and updates.
- Students looking for school news, activities, values, and portal access.
- Faculty and staff using login access and public communication areas.
- Alumni and visitors looking for history, ethos, events, and contact details.

## 4. Success Criteria

- The first screen clearly reads as Vasant Valley School, not a generic school template.
- The palette remains maroon, beige, sandstone, warm white, and restrained ink.
- Page sections appear in the exact requested order.
- Core actions are visible: menu, search, student login, parent login.
- News and events can be filtered by month and year.
- Announcement, event, and news data is served from a Node and Express REST API.
- Site is responsive from mobile to large desktop.
- Navigation, modals, filters, carousel, and feed fallbacks are keyboard accessible.
- Lighthouse targets: Performance 90+, Accessibility 95+, Best Practices 90+, SEO 90+.

## 5. Page And Section Inventory

### 5.1 Sticky Navbar

Content:

- School logo or text lockup.
- Primary navigation links.
- Hamburger menu.
- Search trigger and search panel.
- Login trigger with student and parent login options.

Behavior:

- Sticky at top with white or warm-white surface.
- Maroon active and hover states.
- Mobile menu opens as an accessible drawer.
- Search opens as a focused overlay or compact panel.
- Login opens modal choices for Student Login and Parent Login.

### 5.2 Hero Image Carousel With Event Captions

Content:

- 3 to 5 campus, school-life, or event images.
- Event title, date, and short caption.
- Optional category label such as Events, Campus, Community.

Behavior:

- Auto-advance with pause on hover and focus.
- Previous and next controls.
- Slide indicators.
- Respects reduced-motion preference.
- Images reserve aspect ratio to avoid layout shift.

### 5.3 Mission Statement Block

Content:

- Concise mission statement.
- Optional supporting paragraph preserving the school's formal voice.

Design:

- Editorial serif heading.
- Maroon pull emphasis.
- Warm beige background or bordered inset.

### 5.4 Announcements Grid

Content:

- 3 announcement cards.
- Title, date, summary, category, and optional link.

Design:

- Three-card grid on desktop, stacked on mobile.
- Understated card styling with 8px radius, fine borders, and maroon accents.

### 5.5 Motto Section

Content:

- Pull-quote style motto: "Excellence in Deed".
- Short supporting line about school values.

Design:

- Large serif quote treatment.
- Warm sandstone band.
- No flashy effects.

### 5.6 About Us Split

Content:

- Image of school building or campus life.
- Heading, paragraph copy, and link to learn more.

Design:

- Image and text split.
- Editorial spacing.
- Maroon button or text link.

### 5.7 Alternating Feature Blocks

Blocks:

- Infrastructure.
- Learning Experience.
- Optional third block: Community or Co-curricular Life.

Content:

- Image.
- Heading.
- Short body copy.
- Supporting facts or links.

Design:

- Alternating image and text alignment.
- Avoid three identical feature cards.
- Clear mobile stacking.

### 5.8 Eight-Value Icon Wheel

Values:

- Cerebral.
- Social.
- Physical.
- Spiritual.
- Emotional.
- Environmental.
- Creative.
- Ethical.

Content:

- Icon.
- Value name.
- Short description or hover/focus reveal.

Design:

- Circular wheel or radial arrangement on desktop.
- Accessible grid fallback on tablet and mobile.
- Icons from one icon family only.

### 5.9 Filterable News And Events Timeline Grid

Content:

- News and event entries.
- Title, date, month, year, category, summary, image, and link.

Behavior:

- Filter by month.
- Filter by year.
- Reset filters.
- Empty state when no items match.

Design:

- Timeline-inspired grid with date markers.
- Not a dense table.

### 5.10 Instagram Feed Embed

Content:

- Instagram embed area or mock feed fallback.
- Link to official Instagram.

Behavior:

- Lazy loaded.
- Graceful fallback if embed fails or is blocked.
- Reserved height to avoid CLS.

### 5.11 Multi-Column Footer

Content:

- Navigation links.
- Contact details.
- Social icons.
- Student login modal trigger.
- Parent login modal trigger.

Design:

- Deep maroon footer.
- Beige text accents.
- Strong contrast.

## 6. Content Model

### 6.1 Navigation Item

```json
{
  "id": "about",
  "label": "About Us",
  "href": "#about",
  "children": []
}
```

Fields:

- `id`: stable unique key.
- `label`: visible navigation label.
- `href`: anchor or route.
- `children`: optional dropdown items.

### 6.2 Hero Slide

```json
{
  "id": "annual-day",
  "title": "Annual Day",
  "caption": "A celebration of learning, performance, and school community.",
  "date": "2026-02-14",
  "category": "Events",
  "image": "/images/hero/annual-day.jpg",
  "alt": "Students performing on stage during Annual Day"
}
```

### 6.3 Announcement

```json
{
  "id": "admissions-open",
  "title": "Admissions Notice",
  "date": "2026-01-10",
  "category": "Admissions",
  "summary": "Application information and key dates for the upcoming academic session.",
  "href": "#"
}
```

### 6.4 News Or Event

```json
{
  "id": "founders-day",
  "type": "event",
  "title": "Founder's Day",
  "date": "2026-04-18",
  "month": "April",
  "year": 2026,
  "category": "School Events",
  "summary": "The school community gathers to mark an important day in its calendar.",
  "image": "/images/news/founders-day.jpg",
  "href": "#"
}
```

### 6.5 School Value

```json
{
  "id": "cerebral",
  "label": "Cerebral",
  "description": "Curiosity, reflection, and disciplined thought.",
  "icon": "brain"
}
```

## 7. Functional Requirements

- Render a single-page public homepage in the requested section order.
- Fetch announcements, hero slides, values, nav items, and news/events from REST endpoints.
- Provide accessible carousel controls.
- Provide accessible mobile navigation drawer.
- Provide search UI that filters visible page content or shows mock results.
- Provide student and parent login modals with non-submitting mock forms or portal links.
- Provide month and year filters for timeline entries.
- Provide loading, empty, and error states for API-backed sections.

## 8. Non-Functional Requirements

### Responsive

- Mobile-first layout.
- Breakpoints: 640, 768, 1024, 1280, 1536.
- No horizontal scroll.
- Hero image and carousel captions remain readable on mobile.
- Icon wheel collapses to grid on smaller screens.

### Accessible

- WCAG 2.2 AA target.
- Keyboard-accessible menu, carousel, search, filters, and modals.
- Visible focus states.
- Semantic headings in order.
- Form labels are visible.
- Icon-only controls have `aria-label`.
- Images include meaningful alt text.
- Motion respects `prefers-reduced-motion`.

### Fast

- Vite production build.
- Lazy load below-the-fold images and Instagram embed.
- Use WebP or optimized local images when available.
- Reserve image and embed dimensions.
- Avoid heavy animation libraries unless approved during build.

### Maintainable

- Plain JavaScript only.
- Componentized React structure.
- Tailwind theme tokens for color, fonts, radius, spacing, and shadows.
- Express API mock data isolated in `server/data`.

## 9. Constraints

- Do not write application code until PRD and implementation plan are approved.
- Do not invent a new design language.
- Preserve the requested page section order.
- Use React.js with Vite, Tailwind CSS, Node.js, Express.js, plain JavaScript, and HTML.
- Mock data is acceptable.
- Keep the school tone understated, formal, and editorial.
