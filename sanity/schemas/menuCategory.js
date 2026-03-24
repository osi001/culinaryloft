export default {
  name: 'menuCategory',
  title: 'Menu Category',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: R => R.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: R => R.required() },
    { name: 'order', title: 'Order', type: 'number', description: 'Lower numbers appear first' },
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
}
