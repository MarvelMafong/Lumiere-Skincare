import { useState, useEffect } from 'react'
import { Product } from '@/lib/products'

export interface CartItem {
  product: Product
  qty: number
  size: string
}

const CART_KEY = 'lumiere_cart'

function getStored(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(CART_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function save(items: CartItem[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(CART_KEY, JSON.stringify(items))
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    setItems(getStored())
  }, [])

  const addItem = (product: Product, size: string = product.size, qty: number = 1) => {
    setItems(prev => {
      const existing = prev.findIndex(i => i.product.id === product.id && i.size === size)
      let next: CartItem[]
      if (existing >= 0) {
        next = prev.map((item, idx) =>
          idx === existing ? { ...item, qty: item.qty + qty } : item
        )
      } else {
        next = [...prev, { product, qty, size }]
      }
      save(next)
      return next
    })
  }

  const removeItem = (productId: number, size: string) => {
    setItems(prev => {
      const next = prev.filter(i => !(i.product.id === productId && i.size === size))
      save(next)
      return next
    })
  }

  const updateQty = (productId: number, size: string, qty: number) => {
    if (qty < 1) { removeItem(productId, size); return }
    setItems(prev => {
      const next = prev.map(i =>
        i.product.id === productId && i.size === size ? { ...i, qty } : i
      )
      save(next)
      return next
    })
  }

  const clearCart = () => {
    setItems([])
    if (typeof window !== 'undefined') localStorage.removeItem(CART_KEY)
  }

  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0)
  const count = items.reduce((s, i) => s + i.qty, 0)

  return { items, addItem, removeItem, updateQty, clearCart, total, count }
}