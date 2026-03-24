export default function SectionHeading({ eyebrow, title, subtitle, center = false }) {
  const align = center ? 'items-center text-center' : 'items-start'
  return (
    <div className={`flex flex-col ${align} mb-10`}>
      <span className="eyebrow">{eyebrow}</span>
      <span className="section-divider" />
      <h2 className="font-display text-3xl md:text-4xl text-charcoal leading-tight">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-mid font-body text-sm md:text-base max-w-prose">{subtitle}</p>
      )}
    </div>
  )
}
