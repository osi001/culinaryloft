import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/layout/Navbar'
import AnnouncementBar from './components/layout/AnnouncementBar'
import Footer from './components/layout/Footer'
import WhatsAppButton from './components/layout/WhatsAppButton'
import CartDrawer from './components/menu/CartDrawer'
import Home from './pages/Home'
import About from './pages/About'
import Menu from './pages/Menu'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import './styles/globals.css'

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AnnouncementBar />
        <Navbar whatsappNumber={WHATSAPP_NUMBER} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer whatsappNumber={WHATSAPP_NUMBER} />
        <WhatsAppButton number={WHATSAPP_NUMBER} />
        <CartDrawer whatsappNumber={WHATSAPP_NUMBER} />
      </BrowserRouter>
    </CartProvider>
  )
}
