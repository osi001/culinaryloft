export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    { name: 'name', title: 'Customer Name', type: 'string', validation: R => R.required() },
    { name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: R => R.required() },
    { name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } },
    { name: 'order', title: 'Order', type: 'number' },
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
}
