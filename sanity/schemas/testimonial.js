export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    { name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: R => R.required() },
    {
      name: 'handle',
      title: 'Instagram Handle',
      type: 'string',
      description: 'e.g. @chizzyddiva — leave blank if not an Instagram review',
    },
    {
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      description: 'Used only if no Instagram handle is provided',
    },
    { name: 'order', title: 'Order', type: 'number' },
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
}
