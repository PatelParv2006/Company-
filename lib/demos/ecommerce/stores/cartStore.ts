"use client"

import { create } from "zustand"
import { type Product } from "@/lib/demos/ecommerce/products"

export interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
  isCartOpen: boolean
  lastAddedItem: Product | null
  lastAddedSnapshot: CartItem[] | null
  isHydrated: boolean

  // Actions
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  setCartOpen: (open: boolean) => void
  clearLastAdded: () => void
  undoLastAdd: () => void
  hydrate: () => void
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isCartOpen: false,
  lastAddedItem: null,
  lastAddedSnapshot: null,
  isHydrated: false,

  addToCart: (product: Product) => {
    set((state) => {
      // Snapshot current items for undo
      const snapshot = state.items.map((i) => ({ ...i }))

      const existing = state.items.find((i) => i.id === product.id)
      const newItems = existing
        ? state.items.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...state.items, { ...product, quantity: 1 }]

      sessionStorage.setItem("demo-cart", JSON.stringify(newItems))
      return {
        items: newItems,
        lastAddedItem: product,
        lastAddedSnapshot: snapshot,
      }
    })
  },

  removeFromCart: (productId: string) => {
    set((state) => {
      const newItems = state.items.filter((i) => i.id !== productId)
      sessionStorage.setItem("demo-cart", JSON.stringify(newItems))
      return { items: newItems }
    })
  },

  updateQuantity: (productId: string, quantity: number) => {
    if (quantity < 1) return
    set((state) => {
      const newItems = state.items.map((i) =>
        i.id === productId ? { ...i, quantity } : i
      )
      sessionStorage.setItem("demo-cart", JSON.stringify(newItems))
      return { items: newItems }
    })
  },

  clearCart: () => {
    sessionStorage.removeItem("demo-cart")
    set({ items: [] })
  },

  setCartOpen: (open: boolean) => set({ isCartOpen: open }),

  clearLastAdded: () => set({ lastAddedItem: null }),

  undoLastAdd: () => {
    const { lastAddedSnapshot } = get()
    if (lastAddedSnapshot) {
      sessionStorage.setItem("demo-cart", JSON.stringify(lastAddedSnapshot))
      set({
        items: lastAddedSnapshot,
        lastAddedItem: null,
        lastAddedSnapshot: null,
      })
    }
  },

  hydrate: () => {
    if (typeof window === "undefined") return
    try {
      const saved = sessionStorage.getItem("demo-cart")
      if (saved) {
        set({ items: JSON.parse(saved), isHydrated: true })
      } else {
        set({ isHydrated: true })
      }
    } catch {
      set({ isHydrated: true })
    }
  },
}))

// Computed selectors
export const useCartSubtotal = () =>
  useCartStore((s) => s.items.reduce((acc, item) => acc + item.price * item.quantity, 0))

export const useCartTotalItems = () =>
  useCartStore((s) => s.items.reduce((acc, item) => acc + item.quantity, 0))
