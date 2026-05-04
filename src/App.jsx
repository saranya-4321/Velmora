import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import CartPage from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import EnquireNow from './components/EnquireNow.jsx'
import Login from './pages/Login.jsx'
import { useAuth } from './context/AuthContext.jsx'
import SpicesLanding from './pages/SpicesLanding.jsx'


function ScrollToTop() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, search])
  return null
}

function RouteFade({ children }) {
  const location = useLocation()
  return (
    <div key={`${location.pathname}${location.search}`} className="animate-fade-up">
      {children}
    </div>
  )
}

function Protected({ children }) {
  const location = useLocation()
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: `${location.pathname}${location.search}` }} />
  return children
}

function AdminProtected({ children }) {
  const location = useLocation()
  const { isAuthenticated, role } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login?mode=admin" replace state={{ from: `${location.pathname}${location.search}` }} />
  if (role !== 'admin') return <Navigate to="/login?mode=admin" replace state={{ from: `${location.pathname}${location.search}` }} />
  return children
}

export default function App() {
  const location = useLocation()
  return (
    <div className="min-h-screen bg-cream bg-cream-glow">
      <ScrollToTop />
      {location.pathname !== '/spices-range' && <Navbar />}
      <CartDrawer />

      <main className={location.pathname === '/spices-range' ? '' : 'pt-16'}>
        <RouteFade>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/index.html" element={<Navigate to="/" replace />} />
            <Route path="/explore-oils" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route
              path="/cart"
              element={
                <Protected>
                  <CartPage />
                </Protected>
              }
            />
            <Route
              path="/checkout"
              element={
                <Protected>
                  <Checkout />
                </Protected>
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/spices-range" element={<SpicesLanding />} />
            <Route
              path="/admin"
              element={
                <AdminProtected>
                  <AdminDashboard />
                </AdminProtected>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RouteFade>
      </main>

      <Footer />
      <EnquireNow />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: { background: '#ffffff', color: '#2C2C2C' },
        }}
      />
    </div>
  )
}