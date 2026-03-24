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
