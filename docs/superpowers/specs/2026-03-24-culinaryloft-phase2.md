# Culinaryloft Phase 2 — Menu & Contact Pages Design Spec

**Date:** 2026-03-24
**Client:** Culinaryloft (Lagos)
**Agency:** Cortex Labs
**Phase:** 2 — Menu Page + Contact Page

---

## Overview

Extend the Phase 1 React SPA with two new pages: a full Menu page with WhatsApp cart ordering, and a Contact page with a server-side email form, Google Maps iframe, delivery zones, and business info. All UI inherits the Phase 1 design system exactly — same components, Tailwind tokens, typography, and spacing.

---

## Design Principles (Inherited from Phase 1)

- **No new design language** — every component uses existing Tailwind tokens (`cream`, `beige`, `beige2`, `tan`, `brown`, `charcoal`, `mid`, `green`) and font families (`font-display`, `font-body`)
- **Mobile-first** — all layouts tested at 375px first
- **Sanity-driven content** — all copy, prices, images, zones, and settings editable in the CMS
- **WhatsApp as primary ordering channel** — cart sends a pre-filled `wa.me` message

---

## Page 1: Menu (`/menu`)

### Layout

- **Hero strip:** `bg-beige` with `SectionHeading` component (eyebrow: "Our Menu", title: "Everything on offer", subtitle from `siteSettings.tagline` or fallback)
- **Sticky category tabs:** Positioned below the navbar (`top-16`). Charcoal fill + white text for active tab, `beige2` border + `mid` text for inactive. Tabs scroll horizontally on mobile (`overflow-x-auto`). "All" tab always first.
- **Menu grid:** Exact same card component as homepage `FeaturedMenu` — white surface, 1px beige border, `aspect-[4/3]` image, `UtensilsCrossed` placeholder, brown price, charcoal "+ Add" button (replaces "Order" button). 4-col desktop (`lg:grid-cols-4`), 2-col tablet (`sm:grid-cols-2`), 1-col mobile.
- **Cart bar:** Fixed bottom bar, `bg-charcoal`, white text showing item count + total. Green "Send order on WhatsApp →" button. Hidden when cart is empty. Fires pre-filled `wa.me` message with full order summary.

### Data

- `menuCategory` — fetched from Sanity, ordered by `order` field. Used to render category tabs.
- `menuItem` — all available items fetched in one GROQ request (see Sanity Queries section). Category filtering is performed **client-side** by filtering the already-fetched `items` array by `categoryId`; no additional fetch is triggered on tab change.
- Only items where `available == true` are shown.

### Cart Behaviour

- Uses existing `CartContext` (Phase 1) — `ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_QTY`, `CLEAR`
- "+ Add" button adds item to cart; button changes to quantity stepper (−/+) once added
- Cart bar appears as soon as `items.length > 0`
- WhatsApp message format (line amount = unit price × quantity):
  ```
  Hi, I'd like to order:
  - Taco Trio x2 — ₦30,000
  - Curry Del Mare x1 — ₦20,000

  Total: ₦50,000

  Please confirm availability and delivery details.
  ```
- `VITE_WHATSAPP_NUMBER` used for `wa.me` link

### Components

Phase 1 scaffolded placeholder stubs at `src/components/menu/`: `MenuItem.jsx`, `CategoryFilter.jsx`, `Cart.jsx`, `CartDrawer.jsx`. **Phase 2 replaces all of these** with the following fully-implemented components (delete the Phase 1 stubs):

```
src/components/menu/
  MenuGrid.jsx         — renders filtered grid of MenuCard components
  MenuCard.jsx         — replaces MenuItem.jsx; same card as FeaturedMenu + Add/qty stepper
  CategoryTabs.jsx     — replaces CategoryFilter.jsx; sticky horizontal tab bar
  CartBar.jsx          — replaces Cart.jsx + CartDrawer.jsx; fixed bottom bar with WhatsApp CTA
```

### Image Placeholders

Same strategy as Phase 1: `bg-beige2` div with `UtensilsCrossed` icon when `item.image` is null. Sanity CDN URLs via `imageUrl.js` once photos are uploaded.

---

## Page 2: Contact (`/contact`)

### Layout

- **Hero strip:** `bg-beige` with `SectionHeading` (eyebrow: "Get in Touch", title: "Contact Us")
- **Two-column body** on desktop (`grid-cols-2`), single column on mobile:
  - **Left — Contact form**
  - **Right — Map + Business info + Delivery zones**

### Contact Form (Left Column)

Fields:
- Name (required)
- Email (required)
- Phone (optional)
- Message (required, textarea)

Behaviour:
- POSTs `{ name, email, phone, message }` to `api/contact.js` Vercel serverless function
- Server-side validation: name, email (regex), message required
- Email sent via **nodemailer** using SMTP env vars (server-side only, never `VITE_` prefixed)
- 4 UI states: `idle` / `loading` / `success` / `error` (same pattern as `NewsletterSignup`)
- `role="alert"` on error message

### Map + Info + Zones (Right Column)

- **Google Maps iframe** — embed URL stored in `siteSettings.mapEmbedUrl` (new string field, see schema change below). Rendered as `<iframe src={settings.mapEmbedUrl} ...>` — no JS Maps API, no `GOOGLE_MAPS_API_KEY` needed. `aspect-[4/3]` container, `w-full`, `rounded-sm`, `border-0`. Client populates the embed URL from Google Maps → Share → Embed a map.
- **Business info** — pulled from Sanity `siteSettings`: `address` (string), `phone` (string), `email` (string), `hours` (string, e.g. "Mon–Sat: 10am–9pm"). Rendered with Lucide icons (`MapPin`, `Phone`, `Mail`, `Clock`).
- **Delivery zones** — `siteSettings.deliveryZones` (new array of strings field). Rendered as `bg-beige` chip tags with `text-mid` text. Example zones: "Victoria Island", "Ikoyi", "Lekki Phase 1".

### Sanity Schema Changes

Add two fields to `siteSettings` schema in `sanity/schemas/siteSettings.js`:

```js
// 1. Map embed URL — replaces the need for GOOGLE_MAPS_API_KEY
{
  name: 'mapEmbedUrl',
  title: 'Google Maps Embed URL',
  type: 'url',
  description: 'Paste the embed src URL from Google Maps → Share → Embed a map',
},

// 2. Delivery zones — supersedes deliveryAreaDescription for the Contact page
// deliveryAreaDescription remains in the schema but is no longer rendered in Phase 2 UI.
{
  name: 'deliveryZones',
  title: 'Delivery Zones',
  type: 'array',
  of: [{ type: 'string' }],
  description: 'Areas Culinaryloft delivers to — shown as tags on the Contact page',
},
```

`deliveryAreaDescription` (existing Phase 1 field) is retained in the schema for backwards compatibility but is not rendered in Phase 2 UI. `deliveryZones` is the authoritative source for the Contact page chips.

### New Environment Variables (Server-side only — Vercel env, never `VITE_` prefixed)

```
CONTACT_SMTP_HOST=        # e.g. smtp.gmail.com
CONTACT_SMTP_PORT=        # e.g. 587
CONTACT_SMTP_USER=        # sender email address
CONTACT_SMTP_PASS=        # sender password or app password
CONTACT_EMAIL_TO=         # recipient email (where messages land)
```

### Components

```
src/components/contact/
  ContactForm.jsx      — controlled form, 4-state UI, POSTs to api/contact.js
  DeliveryMap.jsx      — Google Maps iframe wrapper with aspect-[4/3] container
  BusinessInfo.jsx     — renders siteSettings address/phone/email/hours with Lucide icons
  DeliveryZones.jsx    — renders deliveryZones string array as beige chip tags
```

---

## Routing

Add to `src/App.jsx` (React Router v6):
```jsx
import Menu from './pages/Menu'
import Contact from './pages/Contact'

// Inside <Routes>:
<Route path="/menu" element={<Menu />} />
<Route path="/contact" element={<Contact />} />
```

New page files:
```
src/pages/Menu.jsx
src/pages/Contact.jsx
```

---

## Sanity Queries

Both queries are added to `src/lib/queries.js`:

```js
// Menu page — all categories + all available items in one request
// Client-side filtering by categoryId handles tab changes (no re-fetch)
export const MENU_PAGE_QUERY = `{
  "categories": *[_type == "menuCategory"] | order(order asc) { _id, name, slug },
  "items": *[_type == "menuItem" && available == true] | order(category->order asc, name asc) {
    _id, name, slug, description, price, image, available,
    "categoryId": category->_id,
    "categoryName": category->name
  }
}`

// Contact page — siteSettings fields needed for the contact page
export const CONTACT_PAGE_QUERY = `*[_type == "siteSettings"][0] {
  businessName, address, phone, email, hours, whatsappNumber,
  deliveryZones, mapEmbedUrl
}`
```

---

## Serverless Function: `api/contact.js`

- Method: `POST`
- Body: `{ name, email, phone, message }`
- Validates server-side: name non-empty, email matches regex, message non-empty
- Sends email via nodemailer SMTP (env vars above)
- Email subject: `New message from [name] — Culinaryloft Contact Form`
- Email body: plain text with all submitted fields
- Never exposes SMTP credentials (server-side env vars only, no `VITE_` prefix)

**Response shape:**

| Status | Body |
|--------|------|
| `200` | `{ success: true }` |
| `400` | `{ error: "Validation message describing what is missing or invalid" }` |
| `500` | `{ error: "Failed to send message. Please try again." }` |

`ContactForm.jsx` reads `data.error` on non-200 responses to display the error state.

---

## .env.example additions

```
# Contact form (server-side only — Vercel env, never VITE_ prefix)
CONTACT_SMTP_HOST=
CONTACT_SMTP_PORT=587
CONTACT_SMTP_USER=
CONTACT_SMTP_PASS=
CONTACT_EMAIL_TO=
```

---

## Out of Scope (Phase 3+)

- About page
- Blog page + Mailchimp auto-email webhook
- Gallery page
- SEO / Lighthouse optimisation
- Vercel deploy
