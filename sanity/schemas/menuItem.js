export default {
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: R => R.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: R => R.required() },
    { name: 'description', title: 'Description', type: 'text', rows: 3 },
    { name: 'price', title: 'Price (₦)', type: 'number', validation: R => R.required().positive() },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'menuCategory' }],
      validation: R => R.required(),
    },
    { name: 'featured', title: 'Featured on Homepage', type: 'boolean', initialValue: false },
    { name: 'available', title: 'Available', type: 'boolean', initialValue: true },
  ],
  preview: {
    select: { title: 'name', subtitle: 'price', media: 'image' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ? `₦${subtitle.toLocaleString()}` : '', media }
    },
  },
}
