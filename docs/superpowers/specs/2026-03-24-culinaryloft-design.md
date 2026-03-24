# Culinaryloft Website — Design Spec
**Date:** 2026-03-24
**Client:** Culinaryloft (Lagos)
**Agency:** Cortex Labs
**Phase:** 1 — Foundation & Homepage

---

## Project Summary

A production-grade React SPA for Culinaryloft — a health-forward culinary brand in Lagos. Sanity CMS backend, Mailchimp email integration, WhatsApp as the primary ordering and communication channel. Mobile-first, targeting Lagos customers on mobile data.

---

## Approved Design Direction — Design A

### Visual Identity
- **Aesthetic:** Modern minimal, warm, health-forward. Premium but approachable.
- **Reference:** Matches the client's existing menu PDF ("White and Beige Modern Restaurant") — warm cream backgrounds, clean structure, generous whitespace.
- **Logo treatment:** The hand-drawn chef sketch logo used as a brand mark in the nav (circular container) and prominently on About/brand sections.

### Typography
- **Display/headings:** Cormorant Garamond (serif) — elegant, italic variants for decorative text
- **Body/UI:** DM Sans — clean, readable, lightweight
- **Weights used:** Cormorant 400/500/600 italic + roman; DM Sans 300/400/500

### Colour Palette
| Token | Hex | Usage |
|-------|-----|-------|
| `--cream` | `#FDFAF4` | Page background |
| `--beige` | `#EDE3D1` | Hero background, section fills |
| `--beige2` | `#D9C9AE` | Borders, dividers, card backgrounds |
| `--tan` | `#C4A882` | Accents, eyebrows, icon strokes |
| `--brown` | `#7A5C3A` | Prices, italic headings, link underlines |
| `--charcoal` | `#1E1E1E` | Primary text, nav, buttons, dark sections |
| `--mid` | `#5A5040` | Body text, secondary labels |
| `--green` | `#3D6B52` | Hero tag, cart badge, brand accent |
| `--white` | `#FFFFFF` | Card surfaces, nav background |

### Tailwind Theme Config
Colour tokens map to Tailwind utilities in `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      cream: '#FDFAF4',
      beige: '#EDE3D1',
      beige2: '#D9C9AE',
      tan: '#C4A882',
      brown: '#7A5C3A',
      charcoal: '#1E1E1E',
      mid: '#5A5040',
      green: '#3D6B52',
    },
    fontFamily: {
      display: ['Cormorant Garamond', 'serif'],
      body: ['DM Sans', 'sans-serif'],
    },
  },
}
```
Usage: `bg-cream`, `text-charcoal`, `font-display`, `text-brown`, etc.

### Layout Principles
- Mobile-first, generous whitespace
- Split hero (text left / photo right on desktop; stacked text-above / image-below on mobile at 375px, image collapses to 40vw max-height)
- 4-column menu card grid on desktop, 2-col on tablet (768px), 1-col on mobile
- Dark charcoal brand strip for brand story section
- Sticky nav (64px), sticky category tabs on menu page
- All inner pages inherit the same nav, footer, and WhatsApp button

### Component Patterns
- **Buttons:** Charcoal fill (primary), beige2 outline (secondary), rounded-2px corners
- **Cards:** White surface, 1px beige border, hover → cream background
- **Section headers:** Cormorant serif + tan eyebrow + thin tan divider line
- **Inputs:** Beige2 border, cream background, monospace feel from DM Sans
- **Floating WhatsApp:** Green circle, pulse animation, bottom-right fixed

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React 18 + React Router v6 (SPA) |
| Styling | Tailwind CSS v3 (custom theme matching palette above) |
| CMS | Sanity v3 (embedded studio) |
| Email | Mailchimp API (server-side only via Vercel function) |
| Icons | Lucide React |
| Animations | Framer Motion (subtle — fade-in, slide-up on scroll) |
| Build | Vite |
| Deploy | Vercel |
| State | React Context (cart) |

---

## Pages & Scope

### Phase 1 (this plan)
1. **Homepage** `/` — Hero, featured menu (4 specials), brand story teaser, values, newsletter signup
2. **Shared components** — Navbar, Footer, WhatsApp floating button, MobileMenu
3. **Sanity schemas** — All 10 content types defined upfront so the client can populate content before Phase 2 ships
4. **Sanity client + image URL builder** wired up (public dataset, no auth token required for reads)
5. **Cart context** scaffolded (used in Phase 2)
6. **Newsletter endpoint** — `api/newsletter.js` Vercel function proxies Mailchimp (keeps API key server-side)
7. **404 page** — catch-all React Router route rendering a simple "Page not found" with nav/footer

### Phase 2–5 (future)
- Menu page with WhatsApp cart ordering
- Blog + Mailchimp auto-email (`api/webhook-blog-email.js` Vercel function, triggered by Sanity webhook on blogPost publish)
- Gallery, About, Contact (includes DeliveryMap — Google Maps embed via iframe, no JS Maps API needed)
- SEO, Lighthouse optimisation, Vercel deploy

---

## Sanity Schemas

All 10 schemas defined in Phase 1 so client can pre-populate content. Phase 1 actively uses: `menuItem`, `menuCategory`, `siteSettings`, `testimonial`.

```
menuCategory    { name, slug, order }
menuItem        { name, slug, description, price, image, category(ref), featured, available }
blogPost        { title, slug, excerpt, body(portableText), featuredImage, categories, author, publishedAt }
blogCategory    { name, slug }
galleryImage    { image, caption, category, order }
galleryCategory { name, slug }
teamMember      { name, role, bio, photo, order }
siteSettings    { businessName, tagline, logo, phone, whatsappNumber, email, address, hours, socialLinks, deliveryAreaDescription }
testimonial     { name, quote, image, order }
aboutPage       { heroImage, story(portableText), mission, values[] }
```

Dataset is **public** — no Sanity auth token needed for read queries. The Sanity studio (embedded) uses standard Sanity user auth.

---

## WhatsApp Ordering Flow

The cart (Phase 2) assembles a pre-filled WhatsApp message and opens `wa.me`:

```
https://wa.me/{WHATSAPP_NUMBER}?text=Hi%2C%20I'd%20like%20to%20order%3A%0A...
```

Message format:
```
Hi, I'd like to order:
- Taco Trio x1 — ₦15,000
- Curry Del Mare x2 — ₦40,000

Total: ₦55,000

Please confirm availability and delivery details.
```

`VITE_WHATSAPP_NUMBER` must be in international format without `+` or spaces, e.g. `2348012345678`.

In Phase 1, the WhatsApp button in the nav and floating button link directly to the number with a generic message: `Hi, I'd like to find out more about Culinaryloft.`

---

## Image Placeholder Strategy

Until client provides food photography:
- Hero image: solid `bg-beige` with a centered `<img src="/src/assets/Logo.png" />` at 40% opacity
- Menu card images: `bg-beige2` placeholder with a Lucide `UtensilsCrossed` icon centered
- All image slots sized with explicit aspect ratios (`aspect-[4/3]` for cards, `aspect-[3/4]` for hero image panel) so layout doesn't collapse

Once Sanity images are uploaded, `imageUrl.js` (using `@sanity/image-url`) handles responsive CDN URLs.

---

## Menu Content (from client PDF)

**Culinaryloft Specials**
- Turkey Pepper-Soup — ₦15,000
- Chicken Pepper-Soup — ₦12,000
- Taco Trio — ₦15,000
- Curry Del Mare — ₦20,000
- Flamed-Seared Prime Mash — ₦18,000
- Charred Ember Jollof — ₦12,000

**Burgers & Sandwiches** — ₦15,000 each
House Blend Beef Burger · Smoked Paprika Chicken Burger · Prawn & Pesto Sandwich · Tuscan Chicken Sandwich · Barn-House Beef Sandwich

**Chicken Wings** — ₦15,000
Spicy · Korean BBQ · Honey Glazed

---

## Environment Variables

### Client-side (VITE_ prefix, safe to expose)
```
VITE_SANITY_PROJECT_ID=
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2026-03-01
VITE_WHATSAPP_NUMBER=              # e.g. 2348012345678 (no + or spaces)
```

### Server-side only (Vercel environment, never in VITE_ vars)
```
MAILCHIMP_API_KEY=                 # Server-side only — used in api/newsletter.js
MAILCHIMP_LIST_ID=
MAILCHIMP_SERVER_PREFIX=           # e.g. us21
```

### Phase 2–5 only (not needed for Phase 1)
```
# GOOGLE_MAPS_API_KEY not required — DeliveryMap uses a plain <iframe> embed URL
# stored in siteSettings.mapEmbedUrl in Sanity (see Phase 2 spec)
```

---

## Project Structure

```
culinaryloft/
├── public/
├── src/
│   ├── assets/Logo.png
│   ├── components/
│   │   ├── layout/        Navbar, Footer, MobileMenu, WhatsAppButton
│   │   ├── home/          Hero, FeaturedMenu, BrandTeaser, Testimonials, NewsletterSignup
│   │   ├── menu/          MenuGrid, MenuItem, CategoryFilter, Cart, CartDrawer
│   │   ├── blog/          BlogGrid, BlogCard, BlogPost, ShareButtons
│   │   ├── gallery/       GalleryGrid, Lightbox
│   │   ├── contact/       ContactForm, DeliveryMap
│   │   └── shared/        SubscribeForm, SectionHeading, LoadingSpinner
│   ├── context/CartContext.jsx
│   ├── lib/               sanity.js, queries.js, imageUrl.js
│   ├── pages/             Home, About, Menu, Blog, BlogPostPage, Gallery, Contact, NotFound
│   ├── styles/globals.css
│   ├── App.jsx            (includes catch-all <Route path="*" element={<NotFound />}>)
│   └── main.jsx
├── sanity/
│   ├── schemas/           (10 schemas)
│   └── sanity.config.js
├── api/
│   ├── newsletter.js      (Vercel function — Mailchimp subscribe, keeps API key server-side)
│   └── webhook-blog-email.js  (Phase 2 — Sanity webhook triggers email to subscribers on blogPost publish)
├── .env.example
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## Key Design Decisions

1. **Design A selected** — Cormorant Garamond + DM Sans, warm beige palette. Matches client's existing menu PDF aesthetic exactly.
2. **WhatsApp is primary CTA** — prominent in nav, hero, and floating button. Cart drawer sends pre-filled WhatsApp message (see WhatsApp Ordering Flow section).
3. **Sanity for all content** — client can manage menu, blog, gallery, and settings without touching code. All 10 schemas defined in Phase 1 for early content population.
4. **Mobile-first** — Lagos customers are predominantly mobile; every layout tested at 375px first. Hero stacks vertically on mobile.
5. **Placeholder content** — beige backgrounds + icon placeholders for all food photography until client provides images; Sanity image CDN handles responsive sizing once live.
6. **Mailchimp server-side only** — API key never in client bundle; newsletter signup POSTs to `api/newsletter.js` Vercel function.
7. **Google Maps via iframe** — no JS Maps API needed; simpler, no key exposure risk, sufficient for a contact/delivery page.
