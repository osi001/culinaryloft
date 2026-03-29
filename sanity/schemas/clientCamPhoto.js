import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'clientCamPhoto',
  title: 'Client Cam Photos',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Controls position in the carousel (lower = earlier)',
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: { media: 'image', order: 'order' },
    prepare({ media, order }) {
      return { title: `Photo #${order}`, media }
    },
  },
  orderings: [
    { title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
})
