export default {
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: R => R.required() },
    { name: 'body', title: 'Description', type: 'text', rows: 3, validation: R => R.required() },
    { name: 'photo', title: 'Background Photo', type: 'image', options: { hotspot: true } },
    { name: 'order', title: 'Order', type: 'number', description: 'Lower numbers appear first' },
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'body' },
  },
}
