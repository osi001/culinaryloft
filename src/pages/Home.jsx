import { useState, useEffect } from 'react'
import { sanityClient } from '../lib/sanity'
import { HOMEPAGE_QUERY } from '../lib/queries'
import Hero from '../components/home/Hero'
import FeaturedMenu from '../components/home/FeaturedMenu'
import BrandTeaser from '../components/home/BrandTeaser'
import Testimonials from '../components/home/Testimonials'
import NewsletterSignup from '../components/home/NewsletterSignup'
import LoadingSpinner from '../components/shared/LoadingSpinner'

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || ''

export default function Home() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    sanityClient.fetch(HOMEPAGE_QUERY)
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSpinner size={32} />

  return (
    <main>
      <Hero
        whatsappNumber={WHATSAPP_NUMBER}
        settings={data?.settings}
      />
      <FeaturedMenu
        items={data?.featuredItems || []}
        whatsappNumber={WHATSAPP_NUMBER}
      />
      <BrandTeaser />
      <Testimonials testimonials={data?.testimonials} />
      <NewsletterSignup />
    </main>
  )
}
