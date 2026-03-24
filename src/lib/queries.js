// Homepage data: 4 featured menu items + testimonials + site settings
export const HOMEPAGE_QUERY = `{
  "featuredItems": *[_type == "menuItem" && featured == true && available == true] | order(_createdAt asc) [0..3] {
    _id,
    name,
    description,
    price,
    image,
    "categoryName": category->name,
  },
  "testimonials": *[_type == "testimonial"] | order(order asc) [0..5] {
    _id,
    name,
    quote,
    image,
  },
  "settings": *[_type == "siteSettings"][0] {
    businessName,
    tagline,
    whatsappNumber,
    phone,
    email,
    address,
  }
}`

// Menu page — all categories + all available items in one request
// Client-side filtering by categoryId handles tab changes — no re-fetch on tab change
export const MENU_PAGE_QUERY = `{
  "categories": *[_type == "menuCategory"] | order(order asc) { _id, name, slug },
  "items": *[_type == "menuItem" && available == true] | order(category->order asc, name asc) {
    _id, name, slug, description, price, image, available,
    "categoryId": category->_id,
    "categoryName": category->name
  }
}`

// Contact page — siteSettings fields for map, info, and delivery zones
export const CONTACT_PAGE_QUERY = `*[_type == "siteSettings"][0] {
  businessName, address, phone, email, hours, whatsappNumber,
  deliveryZones, mapEmbedUrl
}`
