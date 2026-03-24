import { describe, it, expect } from 'vitest'
import { sanityClient } from './sanity'
import { urlFor } from './imageUrl'
import { HOMEPAGE_QUERY } from './queries'

describe('sanity client', () => {
  it('exports a client with the correct dataset', () => {
    expect(sanityClient.config().dataset).toBe('production')
  })
})

describe('imageUrl', () => {
  it('urlFor returns an object with .url() method', () => {
    const result = urlFor({ asset: { _ref: 'image-abc-100x100-jpg' } })
    expect(typeof result.url).toBe('function')
  })
})

describe('queries', () => {
  it('HOMEPAGE_QUERY is a non-empty string', () => {
    expect(typeof HOMEPAGE_QUERY).toBe('string')
    expect(HOMEPAGE_QUERY.length).toBeGreaterThan(0)
  })
})
