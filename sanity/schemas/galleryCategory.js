export default {
  name: 'galleryCategory',
  title: 'Gallery Category',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: R => R.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: R => R.required() },
  ],
}
