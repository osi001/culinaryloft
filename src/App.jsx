import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/layout/Navbar'
import AnnouncementBar from './components/layout/AnnouncementBar'
import Footer from './components/layout/Footer'
import WhatsAppButton from './components/layout/WhatsAppButton'
import CartDrawer from './components/menu/CartDrawer'
import LoadingSpinner from './components/shared/LoadingSpinner'
import './styles/globals.css'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Menu = lazy(() => import('./pages/Menu'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AnnouncementBar />
        <Navbar whatsappNumber={WHATSAPP_NUMBER} />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-cream"><LoadingSpinner size={32} /></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer whatsappNumber={WHATSAPP_NUMBER} />
        <WhatsAppButton number={WHATSAPP_NUMBER} />
        <CartDrawer whatsappNumber={WHATSAPP_NUMBER} />
      </BrowserRouter>
    </CartProvider>
  )
}
