import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'

import './index.css'
import App from './App.tsx'
import { AuthProvider } from '@/context/auth-context'
import { CartProvider } from '@/context/cart-context'
import { ThemeProvider } from '@/context/theme-context'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <App />
            <Toaster richColors position="top-right" />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)

