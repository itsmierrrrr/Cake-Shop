export type CakeCategory = 'Celebration' | 'Wedding' | 'Signature' | 'Mini' | 'Seasonal'

export type Flavor =
  | 'Chocolate'
  | 'Vanilla'
  | 'Berry'
  | 'Caramel'
  | 'Citrus'
  | 'Pistachio'

export type CakeReview = {
  id: string
  name: string
  rating: number
  comment: string
  date: string
}

export type Cake = {
  id: string
  name: string
  slug: string
  price: number
  rating: number
  reviewCount: number
  category: CakeCategory
  flavor: Flavor
  shortDescription: string
  description: string
  ingredients: string[]
  images: string[]
  featured?: boolean
}

export type CartItem = {
  cake: Cake
  quantity: number
}
