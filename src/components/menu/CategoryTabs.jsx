export default function CategoryTabs({ categories, activeId, onSelect }) {
  return (
    <div className="sticky top-16 z-20 bg-cream border-b border-beige2">
      <div className="max-w-6xl mx-auto px-4 md:px-8 overflow-x-auto">
        <div className="flex gap-2 py-3 min-w-max">
          <button
            onClick={() => onSelect(null)}
            className={`whitespace-nowrap text-xs font-body font-medium py-1.5 px-4 rounded-sm border transition-colors ${
              activeId === null
                ? 'bg-charcoal text-cream border-charcoal'
                : 'text-mid border-beige2 hover:border-tan'
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat._id}
              onClick={() => onSelect(cat._id)}
              className={`whitespace-nowrap text-xs font-body font-medium py-1.5 px-4 rounded-sm border transition-colors ${
                activeId === cat._id
                  ? 'bg-charcoal text-cream border-charcoal'
                  : 'text-mid border-beige2 hover:border-tan'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
