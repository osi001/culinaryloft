import '@testing-library/jest-dom'

// Mock IntersectionObserver for framer-motion whileInView in jsdom
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}
