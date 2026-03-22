import {
  createContext,
  type PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react'

import type { Cake, CartItem } from '@/types/cake'

type CartContextValue = {
  items: CartItem[]
  itemCount: number
  subtotal: number
  addToCart: (cake: Cake, quantity?: number) => void
  setQuantity: (cakeId: string, quantity: number) => void
  removeItem: (cakeId: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = (cake: Cake, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.cake.id === cake.id)
      if (existing) {
        return current.map((item) =>
          item.cake.id === cake.id
            ? { ...item, quantity: Math.max(1, item.quantity + quantity) }
            : item,
        )
      }

      return [...current, { cake, quantity: Math.max(1, quantity) }]
    })
  }

  const setQuantity = (cakeId: string, quantity: number) => {
    setItems((current) =>
      current
        .map((item) =>
          item.cake.id === cakeId ? { ...item, quantity: Math.max(1, quantity) } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (cakeId: string) => {
    setItems((current) => current.filter((item) => item.cake.id !== cakeId))
  }

  const clearCart = () => {
    setItems([])
  }

  const value = useMemo(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.cake.price, 0)

    return {
      items,
      itemCount,
      subtotal,
      addToCart,
      setQuantity,
      removeItem,
      clearCart,
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCartContext() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext must be used within CartProvider')
  }

  return context
}

