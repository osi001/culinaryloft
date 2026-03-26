export default function DeliveryZones({ zones }) {
  if (!zones || zones.length === 0) return null
  return (
    <div>
      <span className="eyebrow block mb-3">Delivery Zones</span>
      <div className="flex flex-wrap gap-2">
        {zones.map(zone => (
          <span
            key={zone}
            className="bg-beige text-mid font-body text-xs px-3 py-1.5 rounded-sm border border-beige2"
          >
            {zone}
          </span>
        ))}
      </div>
    </div>
  )
}
