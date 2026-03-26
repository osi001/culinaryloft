import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const ROW = 'flex items-start gap-3 text-sm font-body text-mid'
const ICON = 'text-tan mt-0.5 shrink-0'

export default function BusinessInfo({ settings }) {
  if (!settings) return null
  return (
    <div className="flex flex-col gap-4">
      {settings.address && (
        <div className={ROW}>
          <MapPin size={16} className={ICON} />
          <span className="whitespace-pre-line">{settings.address}</span>
        </div>
      )}
      {settings.phone && (
        <div className={ROW}>
          <Phone size={16} className={ICON} />
          <a href={`tel:${settings.phone}`} className="hover:text-charcoal transition-colors">
            {settings.phone}
          </a>
        </div>
      )}
      {settings.email && (
        <div className={ROW}>
          <Mail size={16} className={ICON} />
          <a href={`mailto:${settings.email}`} className="hover:text-charcoal transition-colors">
            {settings.email}
          </a>
        </div>
      )}
      {settings.hours && (
        <div className={ROW}>
          <Clock size={16} className={ICON} />
          <span className="whitespace-pre-line">{settings.hours}</span>
        </div>
      )}
    </div>
  )
}
