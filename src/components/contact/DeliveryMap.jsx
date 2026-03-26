export default function DeliveryMap({ mapEmbedUrl }) {
  if (!mapEmbedUrl) return null
  return (
    <div className="w-full aspect-[4/3] rounded-sm overflow-hidden border border-beige">
      <iframe
        src={mapEmbedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Culinaryloft location"
      />
    </div>
  )
}
