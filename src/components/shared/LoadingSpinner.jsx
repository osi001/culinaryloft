export default function LoadingSpinner({ size = 24 }) {
  return (
    <div className="flex items-center justify-center py-12">
      <div
        className="animate-spin rounded-full border-2 border-beige2 border-t-tan"
        style={{ width: size, height: size }}
        role="status"
        aria-label="Loading"
      />
    </div>
  )
}
