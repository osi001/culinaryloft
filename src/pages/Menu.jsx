import { useState, useEffect } from 'react'
import { sanityClient } from '../lib/sanity'
import { MENU_PAGE_QUERY } from '../lib/queries'
import { STATIC_CATEGORIES, STATIC_ITEMS } from '../data/staticMenu'
import SectionHeading from '../components/shared/SectionHeading'
import CategoryTabs from '../components/menu/CategoryTabs'
import MenuGrid from '../components/menu/MenuGrid'
import LoadingSpinner from '../components/shared/LoadingSpinner'

export default function Menu() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState(null)

  useEffect(() => {
    const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
    if (!projectId || projectId === 'placeholder') {
      setData({ categories: STATIC_CATEGORIES, items: STATIC_ITEMS })
      setLoading(false)
      return
    }
    sanityClient.fetch(MENU_PAGE_QUERY)
      .then(result => setData(result?.items?.length ? result : { categories: STATIC_CATEGORIES, items: STATIC_ITEMS }))
      .catch(() => setData({ categories: STATIC_CATEGORIES, items: STATIC_ITEMS }))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="pt-16"><LoadingSpinner size={32} /></div>

  return (
    <main className="pb-20">
      <section className="bg-beige pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Our Menu"
            title="Everything on offer"
            subtitle="Fresh ingredients, crafted daily. Order on WhatsApp."
          />
        </div>
      </section>

      <CategoryTabs
        categories={data?.categories || []}
        activeId={activeCategory}
        onSelect={setActiveCategory}
      />

      <section className="bg-cream py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <MenuGrid
            items={data?.items || []}
            activeCategory={activeCategory}
          />
        </div>
      </section>

    </main>
  )
}
