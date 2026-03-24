import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import WhatsAppButton from './components/layout/WhatsAppButton'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import './styles/globals.css'

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || ''

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar whatsappNumber={WHATSAPP_NUMBER} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <WhatsAppButton number={WHATSAPP_NUMBER} />
      </BrowserRouter>
    </CartProvider>
  )
}
