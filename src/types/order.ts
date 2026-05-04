export type OrderItem = {
  cakeId: string
  name: string
  price: number
  quantity: number
}

export type Order = {
  _id: string
  userId: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
  paymentMethod?: string | null
  createdAt: string
}
