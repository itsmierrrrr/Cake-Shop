import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'

import { Footer } from '@/components/common/footer'
import { Navbar } from '@/components/common/navbar'
import { RequireAuth } from '@/components/common/require-auth'
import { AboutPage } from '@/pages/about-page'
import { CartPage } from '@/pages/cart-page'
import { CheckoutPage } from '@/pages/checkout-page'
import { ContactPage } from '@/pages/contact-page'
import { GoogleCallbackPage } from '@/pages/google-callback-page'
import { HomePage } from '@/pages/home-page'
import { NotFoundPage } from '@/pages/not-found-page'
import { ProductDetailsPage } from '@/pages/product-details-page'
import { SignInPage } from '@/pages/signin-page'
import { SignUpPage } from '@/pages/signup-page'
import { ShopPage } from '@/pages/shop-page'

function App() {
  const location = useLocation()

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-cream via-white to-blush/60 text-truffle transition-colors dark:from-[#251d19] dark:via-[#2a211d] dark:to-[#201916] dark:text-[#f8ebe1]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(248,221,228,.5),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(234,215,194,.5),transparent_40%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(239,200,210,.15),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(234,215,194,.12),transparent_40%)]" />
      <Navbar />
      <main className="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/:cakeId" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/checkout"
              element={
                <RequireAuth>
                  <CheckoutPage />
                </RequireAuth>
              }
            />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/auth/google/callback" element={<GoogleCallbackPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default App

