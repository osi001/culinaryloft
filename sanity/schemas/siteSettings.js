export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    { name: 'businessName', title: 'Business Name', type: 'string' },
    { name: 'tagline', title: 'Tagline', type: 'string' },
    { name: 'logo', title: 'Logo', type: 'image' },
    { name: 'phone', title: 'Phone', type: 'string' },
    {
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'International format without + or spaces, e.g. 2348012345678',
    },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'address', title: 'Address', type: 'text', rows: 3 },
    { name: 'hours', title: 'Opening Hours', type: 'text', rows: 4 },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
          ],
        },
      ],
    },
    { name: 'deliveryAreaDescription', title: 'Delivery Area Description', type: 'text', rows: 3 },
    {
      name: 'mapEmbedUrl',
      title: 'Google Maps Embed URL',
      type: 'url',
      description: 'Paste the embed src URL from Google Maps → Share → Embed a map',
    },
    {
      name: 'deliveryZones',
      title: 'Delivery Zones',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Areas Culinaryloft delivers to — shown as tags on the Contact page',
    },
  ],
}
