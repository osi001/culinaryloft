export default {
  name: 'galleryImage',
  title: 'Gallery Image',
  type: 'document',
  fields: [
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: R => R.required() },
    { name: 'caption', title: 'Caption', type: 'string' },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'galleryCategory' }],
    },
    { name: 'order', title: 'Order', type: 'number' },
  ],
}
