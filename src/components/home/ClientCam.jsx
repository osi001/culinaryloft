import { useState, useEffect, useRef, useCallback } from 'react'
import cc1 from '../../assets/cc1.jpeg'
import cc2 from '../../assets/cc2.jpeg'
import cc3 from '../../assets/cc3.jpeg'
import cc4 from '../../assets/cc4.jpeg'
import cc5 from '../../assets/cc5.jpeg'
import cc6 from '../../assets/cc6.jpeg'
import cc7 from '../../assets/cc7.jpeg'
import cc8 from '../../assets/cc8.jpeg'
import cc9 from '../../assets/cc9.jpeg'
import cc10 from '../../assets/cc10.jpeg'
import cc11 from '../../assets/cc11.jpeg'
import cc12 from '../../assets/cc12.jpeg'
import cc13 from '../../assets/cc13.jpeg'

const PHOTOS = [cc8, cc10, cc5, cc1, cc9, cc7, cc4, cc3, cc2, cc6, cc11, cc12, cc13]
const ROTATIONS = [-2, 1.5, -1, 2, -1.5, 1, -2.5, 0.5, -1, 2, -1.5, 1, -2]

// Clone first/last few cards to enable seamless looping
const CLONES = 4
const TRACK = [
  ...PHOTOS.slice(-CLONES),
  ...PHOTOS,
  ...PHOTOS.slice(0, CLONES),
]
const TRACK_ROTS = [
  ...ROTATIONS.slice(-CLONES),
  ...ROTATIONS,
  ...ROTATIONS.slice(0, CLONES),
]

const CARD_W = 276  // w-64 (256px) + gap-5 (20px)

export default function ClientCam() {
  // Start at CLONES so the real first card is visible
  const [index, setIndex] = useState(CLONES)
  const [transitioning, setTransitioning] = useState(true)
  const timerRef = useRef(null)
  const touchStartX = useRef(null)

  const advance = useCallback((dir) => {
    setTransitioning(true)
    setIndex(i => i + dir)
  }, [])

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => advance(1), 3500)
  }, [advance])

  useEffect(() => {
    resetTimer()
    return () => clearInterval(timerRef.current)
  }, [resetTimer])

  // After sliding into a clone, instantly reposition to the real equivalent card
  useEffect(() => {
    if (index >= PHOTOS.length + CLONES) {
      const id = setTimeout(() => {
        setTransitioning(false)
        setIndex(CLONES)
      }, 750)
      return () => clearTimeout(id)
    }
    if (index < CLONES) {
      const id = setTimeout(() => {
        setTransitioning(false)
        setIndex(PHOTOS.length + CLONES - 1)
      }, 750)
      return () => clearTimeout(id)
    }
  }, [index])

  // Re-enable transition only after the browser has painted the jumped position
  useEffect(() => {
    if (!transitioning) {
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setTransitioning(true))
      )
      return () => cancelAnimationFrame(id)
    }
  }, [transitioning])

  const handlePrev = () => { advance(-1); resetTimer() }
  const handleNext = () => { advance(1); resetTimer() }

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 40) {
      delta > 0 ? handleNext() : handlePrev()
    }
    touchStartX.current = null
  }

  return (
    <section className="bg-cream py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-8 md:px-16 mb-8 flex items-end justify-between">
        <div>
          <p className="font-body text-xs text-tan tracking-widest uppercase mb-2">As seen on your camera roll</p>
          <h2 className="font-display text-3xl md:text-4xl text-brown">Straight from the table</h2>
        </div>

        {/* Nav buttons */}
        <div className="flex gap-3 pb-1">
          <button
            onClick={handlePrev}
            aria-label="Previous photo"
            className="w-9 h-9 flex items-center justify-center border border-brown text-brown rounded-sm hover:bg-brown hover:text-cream transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9 2L4 7l5 5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={handleNext}
            aria-label="Next photo"
            className="w-9 h-9 flex items-center justify-center border border-brown text-brown rounded-sm hover:bg-brown hover:text-cream transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 2l5 5-5 5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div
        className="overflow-hidden px-8 md:px-16"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex gap-5 pb-6"
          style={{
            transform: `translateX(${-index * CARD_W}px)`,
            transition: transitioning ? 'transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
          }}
        >
          {TRACK.map((src, i) => (
            <div
              key={i}
              className="shrink-0"
              style={{ transform: `rotate(${TRACK_ROTS[i]}deg)` }}
            >
              <div className="bg-white p-2 pb-6 shadow-md w-64">
                <img
                  src={src}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
