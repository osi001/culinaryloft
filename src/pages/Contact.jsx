import { useState, useEffect } from 'react'
import { sanityClient } from '../lib/sanity'
import { CONTACT_PAGE_QUERY } from '../lib/queries'
import { STATIC_SETTINGS } from '../data/staticMenu'
import SectionHeading from '../components/shared/SectionHeading'
import LoadingSpinner from '../components/shared/LoadingSpinner'
import ContactForm from '../components/contact/ContactForm'
import BusinessInfo from '../components/contact/BusinessInfo'
import DeliveryMap from '../components/contact/DeliveryMap'
import DeliveryZones from '../components/contact/DeliveryZones'

export default function Contact() {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
    if (!projectId || projectId === 'placeholder') {
      setSettings(STATIC_SETTINGS)
      setLoading(false)
      return
    }
    sanityClient.fetch(CONTACT_PAGE_QUERY)
      .then(result => setSettings(result || STATIC_SETTINGS))
      .catch(() => setSettings(STATIC_SETTINGS))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="pt-16"><LoadingSpinner size={32} /></div>

  return (
    <main>
      <section className="bg-beige pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Contact"
            title="Get in touch"
            subtitle="We'd love to hear from you."
          />
        </div>
      </section>

      <section className="bg-cream py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <ContactForm />
            <div className="flex flex-col gap-8">
              <BusinessInfo settings={settings} />
              <DeliveryMap mapEmbedUrl={settings?.mapEmbedUrl} />
              <DeliveryZones zones={settings?.deliveryZones} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
