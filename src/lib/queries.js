// Homepage data: featured items + testimonials + experiences + site settings + client cam
export const HOMEPAGE_QUERY = `{
  "featuredItems": *[_type == "menuItem" && featured == true && available == true] | order(_createdAt asc) [0..3] {
    _id, name, description, price, image, "categoryName": category->name,
  },
  "testimonials": *[_type == "testimonial"] | order(order asc) {
    _id, quote, handle, name,
  },
  "experiences": *[_type == "experience"] | order(order asc) {
    _id, title, body, photo,
  },
  "clientCamPhotos": *[_type == "clientCamPhoto"] | order(order asc) {
    _id, image, order,
  },
  "settings": *[_type == "siteSettings"][0] {
    businessName, tagline, whatsappNumber, phone, email, address, hours,
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

// Gallery page
export const GALLERY_QUERY = `*[_type == "galleryImage"] | order(order asc) {
  _id, image, caption,
  "category": category->name,
  order
}`

// Blog listing
export const BLOG_LIST_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id, title, slug, excerpt, featuredImage, author, publishedAt,
  "categories": categories[]->name
}`

// Single blog post
export const BLOG_POST_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id, title, excerpt, body, featuredImage, author, publishedAt,
  "categories": categories[]->name
}`
