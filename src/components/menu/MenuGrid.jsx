import MenuCard from './MenuCard'

export default function MenuGrid({ items, activeCategory }) {
  const filtered = activeCategory
    ? items.filter(item => item.categoryId === activeCategory)
    : items

  if (filtered.length === 0) {
    return (
      <p className="text-center text-mid font-body py-16">
        No items available in this category.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filtered.map((item, i) => (
        <MenuCard key={item._id} item={item} index={i} />
      ))}
    </div>
  )
}
