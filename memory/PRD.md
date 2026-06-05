# PRD — Maison Avenir (Premium Pre-Owned Car Dealership)

## Original Problem Statement
Build a premium, luxurious dealership website. Vibe: White, Golden, Calm. Colors: Creamy + Vanilla + Golden + Black with Dark Blue accent. Fonts: Playfair / Mayfair-style premium serif. CTA: "Book a Test Drive". Sections: Nav, Hero, Services, Pricing, Testimonials, Contact, Buy Used Cars, Sell Used Cars, Finance. Buy section needs sidebar filters: Condition (Pre-Owned 44), Exterior Color (full list), Interior Color, Drivetrain (AWD 17/4WD 6/FWD 20/RWD 1), Fuel Type (Diesel 1/Flex 1/Gasoline 40/Plug-In 2), City MPG buckets, Highway MPG buckets, Transmission (Auto 42/Manual 2). Stack: HTML/CSS/JS frontend, no backend. **Brand details must be dynamic (Thymeleaf-style) so they can be swapped from one place.** **Each feature on its own page with its own CSS and JS file. Car images must match the car names.**

## Architecture (revised iteration 2)
Multi-page static site. Each section lives in its own HTML page with its own page-specific CSS and JS file. Shared chrome (nav, footer, test-drive modal, emergent badge) is injected via `common.js` to keep page files small and DRY.

```
/app/frontend/public/
├── index.html               (Home: hero + featured + services preview)
├── buy.html                 (Buy Used Cars + sidebar filters)
├── sell.html                (Sell Used Cars)
├── finance.html             (Finance calculator + apply modal)
├── services.html            (6 services + CTA strip)
├── pricing.html             (3 service plans + FAQ)
├── testimonials.html        (Stories bento + ratings)
├── contact.html             (Contact + showroom map card)
├── css/
│   ├── common.css           (tokens, nav, footer, buttons, forms, modal, toast)
│   ├── home.css             (hero, marquee, featured, services-preview)
│   ├── buy.css              (filters sidebar, inventory grid, vehicle detail)
│   ├── sell.css             (sell-grid, steps, form)
│   ├── finance.css          (calculator, rate panel)
│   ├── services.css         (services bento, cta-strip)
│   ├── pricing.css          (pricing cards, FAQ accordion)
│   ├── testimonials.css     (dark bento, ratings)
│   └── contact.css          (contact grid, map card)
└── js/
    ├── data.js              (BRAND object, FILTERS taxonomy, 44-car INVENTORY)
    ├── common.js            (nav/footer/test-drive injection, BRAND binding, toast)
    ├── home.js              (featured cards render)
    ├── buy.js               (filter render, inventory render, sort, vehicle detail modal)
    ├── sell.js              (sell form validation & submit)
    ├── finance.js           (calculator + apply modal)
    └── contact.js           (contact form validation & submit)
```

## Key implementation details
- **Brand binding**: every brand mention (name, address, phone, email, tagline, hero image) is rendered via `[data-bind="key"]`, `[data-bind-href="scheme:key"]`, `[data-bind-src="key"]` attributes. Change `window.BRAND` in `js/data.js` once → entire site updates. Same concept as Thymeleaf `th:text="${brandName}"`.
- **Brand-accurate car photos**: `window.carImg(make, modelFamily, angle)` calls IMAGIN.studio CDN (`customer=img`) → returns real brand-specific renders. Mercedes E-Class card shows a real Mercedes E-Class image, BMW M3 card shows a real BMW, etc.
- **Filter math correctness**: counts in `FILTERS` exactly match inventory distribution (AWD 17/4WD 6/FWD 20/RWD 1, Gasoline 40/Diesel 1/Flex 1/Plug-In 2, Auto 42/Manual 2).
- React is intentionally not mounted (`src/index.js` and `src/App.js` are no-ops). All CSS/JS use absolute paths (`/css/...`, `/js/...`) so they resolve identically on every page.

## What's Implemented (2026-02 — iteration 2)
- Sticky glass nav across all pages (active link auto-highlighted) + golden "Book a Test Drive" CTA in every nav
- Home: Playfair italic-gold hero, 3-stat row, brand-mark marquee, 6-card featured teaser, 4-tile services preview
- Buy: 8 filter groups (condition, exterior color with swatches, interior color with swatches, drivetrain, fuel, city/hwy MPG buckets, transmission) + sort dropdown + live result count + vehicle detail modal with IMAGIN-rendered photo + 9-field spec table + "Book Test Drive" and "Finance This" buttons. Deep-link `buy.html#car-12` opens that vehicle.
- Sell: 3-step process + 9-field appraisal form
- Finance: live calculator (price/down/term/APR sliders) + navy "from 4.49% APR" panel + 6-field apply modal
- Services: 6-tile bento + dark CTA strip
- Pricing: 3 tiers (Essential / Signature featured / Atelier) + 4-question FAQ accordion
- Testimonials: dark navy 6-quote bento + 4.9/5 ratings stat block
- Contact: address/phone/email/hours + showroom map card + 5-field message form
- Shared: Test Drive modal (vehicle picker auto-populated), toast confirmations, mobile-responsive (1024 + 700 breakpoints), burger nav, `data-testid` on every interactive element

## Prioritized Backlog
- **P1**: Real backend wiring (FastAPI) for form submissions + email notifications via Resend
- **P1**: Real IMAGIN.studio customer key to remove the demo watermark from car renders
- **P1**: Image carousel inside vehicle detail modal (currently single photo)
- **P2**: Saved-vehicles / favourites with localStorage
- **P2**: Admin panel to CRUD inventory (currently in `js/data.js`)
- **P2**: Compare-vehicles tray (up to 3)
- **P2**: Schema-org `Vehicle` JSON-LD on each card for SEO

## Next Actions
1. Edit `window.BRAND` in `/app/frontend/public/js/data.js` to your real dealership name, address, phone, email
2. Replace inventory entries in the same file (or commission an admin panel)
3. Get an IMAGIN.studio account to remove watermark and unlock more angles
4. Reintroduce a FastAPI backend if real lead capture is wanted (saves to DB + emails via Resend)
