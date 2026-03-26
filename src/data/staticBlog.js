import photoSteam from '../assets/photo-steam.jpeg'
import photoStory from '../assets/photo-story.jpeg'
import photoSetting from '../assets/photo-setting.jpeg'

export const STATIC_POSTS = [
  {
    _id: 'post-1',
    title: 'The Quiet Art of Setting a Table',
    slug: { current: 'quiet-art-of-setting-a-table' },
    excerpt: 'Before the food arrives, there is the table. How it is laid says everything about what will follow.',
    featuredImage: null,
    _featuredImageStatic: photoSetting,
    author: 'Culinary Loft',
    publishedAt: '2026-02-14T00:00:00Z',
    categories: ['Craft'],
    body: [
      { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', text: 'There is an art to the empty table. Before the food arrives, before the guests are seated, before anything has happened — the table already speaks.' }] },
      { _type: 'block', _key: 'b2', style: 'normal', children: [{ _type: 'span', text: 'A well-set table is not about formality. It is about intention. Each element placed with a quiet awareness that someone will sit here, and what surrounds them will shape how they feel.' }] },
      { _type: 'block', _key: 'b3', style: 'normal', children: [{ _type: 'span', text: 'At Culinary Loft, we think about this. The fold of a napkin. The angle of a glass. The space between place settings. None of it is accidental.' }] },
    ],
  },
  {
    _id: 'post-2',
    title: 'Why We Cook with Restraint',
    slug: { current: 'why-we-cook-with-restraint' },
    excerpt: 'More is not always more. The most memorable meals are often the ones with the fewest ingredients.',
    featuredImage: null,
    _featuredImageStatic: photoSteam,
    author: 'Culinary Loft',
    publishedAt: '2026-01-28T00:00:00Z',
    categories: ['Philosophy'],
    body: [
      { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', text: 'Restraint is not a limitation. It is a discipline — and in the kitchen, it is one of the hardest things to learn.' }] },
      { _type: 'block', _key: 'b2', style: 'normal', children: [{ _type: 'span', text: 'The impulse to add — more spice, more garnish, more technique — is natural. But the most enduring flavours come from knowing when to stop.' }] },
      { _type: 'block', _key: 'b3', style: 'normal', children: [{ _type: 'span', text: "We ask ourselves one question before each dish is finished: does this element serve the whole, or is it serving the cook's ego? The answer shapes everything." }] },
    ],
  },
  {
    _id: 'post-3',
    title: 'Food as Memory',
    slug: { current: 'food-as-memory' },
    excerpt: 'A smell, a texture, a temperature — and suddenly you are somewhere else entirely. Food is time travel.',
    featuredImage: null,
    _featuredImageStatic: photoStory,
    author: 'Culinary Loft',
    publishedAt: '2026-01-10T00:00:00Z',
    categories: ['Story'],
    body: [
      { _type: 'block', _key: 'b1', style: 'normal', children: [{ _type: 'span', text: 'The science is well established: smell is the sense most directly connected to memory. But anyone who has eaten a dish from their childhood knows this without needing a neuroscientist to explain it.' }] },
      { _type: 'block', _key: 'b2', style: 'normal', children: [{ _type: 'span', text: 'Food does not just nourish — it stores. Each meal you have ever loved lives somewhere inside you, ready to surface without warning.' }] },
      { _type: 'block', _key: 'b3', style: 'normal', children: [{ _type: 'span', text: 'This is why we take what we do seriously. We are not just feeding people. We are becoming part of their memory. That is a responsibility we hold carefully.' }] },
    ],
  },
]
