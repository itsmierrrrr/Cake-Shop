import { motion } from 'framer-motion'
import { CakeSlice, LogIn, LogOut, ShoppingBag } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { toast } from 'sonner'

import { ThemeToggle } from '@/components/common/theme-toggle'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { useCart } from '@/hooks/use-cart'
import { cn } from '@/lib/utils'

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar() {
  const { itemCount } = useCart()
  const { isAuthenticated, user, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-cream/80 backdrop-blur-md dark:border-white/10 dark:bg-[#241d1a]/80">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="rounded-full bg-rose p-2 text-truffle shadow-soft">
            <CakeSlice size={16} />
          </span>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-truffle/70 dark:text-[#f6dfd0]/70">Patisserie</p>
            <p className="text-lg font-semibold text-truffle dark:text-[#f6dfd0]">Royale Bakes</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-4 py-2 text-sm text-truffle/80 transition hover:bg-white/75 dark:text-[#f6dfd0]/80 dark:hover:bg-white/10',
                  isActive && 'bg-white text-truffle shadow-soft dark:bg-white/20 dark:text-[#f6dfd0]',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                signOut()
                toast.success('Signed out successfully.')
              }}
            >
              <LogOut size={14} className="mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          ) : (
            <>
              <Button asChild variant="secondary" size="sm" className="hidden sm:inline-flex">
                <Link to="/signup">Sign Up</Link>
              </Button>
              <Button asChild variant="secondary" size="sm">
                <Link to="/signin">
                  <LogIn size={14} className="mr-2" />
                  <span className="hidden sm:inline">Sign In</span>
                </Link>
              </Button>
            </>
          )}
          <ThemeToggle />
          <Button asChild variant="secondary" className="relative">
            <Link to="/cart" aria-label="Go to cart">
              <ShoppingBag size={16} />
              <span className="ml-2 hidden sm:inline">Cart</span>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-truffle px-1 text-[10px] text-white"
                >
                  {itemCount}
                </motion.span>
              )}
            </Link>
          </Button>
        </div>
      </div>
      {isAuthenticated && user ? (
        <div className="mx-auto w-full max-w-7xl px-4 pb-2 text-right text-xs text-truffle/70 sm:px-6 lg:px-8 dark:text-[#f6dfd0]/70">
          Signed in as {user.name}
        </div>
      ) : null}
      <div className="mx-auto flex w-full max-w-7xl gap-2 overflow-x-auto px-4 pb-3 md:hidden sm:px-6 lg:px-8">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              cn(
                'rounded-full border border-rose/30 px-3 py-1 text-xs text-truffle/80 dark:border-white/20 dark:text-[#f6dfd0]/80',
                isActive && 'bg-white dark:bg-white/15',
              )
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </header>
  )
}

