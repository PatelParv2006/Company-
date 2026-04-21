"use client"

import { create } from "zustand"
import { type Product } from "@/lib/demos/ecommerce/products"

interface FavoriteState {
  favorites: Product[]
  isHydrated: boolean

  addToFavorites: (product: Product) => void
  removeFromFavorites: (productId: string) => void
  toggleFavorite: (product: Product) => void
  isFavorite: (productId: string) => boolean
  hydrate: () => void
}

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favorites: [],
  isHydrated: false,

  addToFavorites: (product: Product) => {
    set((state) => {
      if (state.favorites.find((p) => p.id === product.id)) return state
      const newFavorites = [...state.favorites, product]
      sessionStorage.setItem("demo-favorites", JSON.stringify(newFavorites))
      return { favorites: newFavorites }
    })
  },

  removeFromFavorites: (productId: string) => {
    set((state) => {
      const newFavorites = state.favorites.filter((p) => p.id !== productId)
      sessionStorage.setItem("demo-favorites", JSON.stringify(newFavorites))
      return { favorites: newFavorites }
    })
  },

  toggleFavorite: (product: Product) => {
    const { favorites } = get()
    if (favorites.some((p) => p.id === product.id)) {
      get().removeFromFavorites(product.id)
    } else {
      get().addToFavorites(product)
    }
  },

  isFavorite: (productId: string) => {
    return get().favorites.some((p) => p.id === productId)
  },

  hydrate: () => {
    if (typeof window === "undefined") return
    try {
      const saved = sessionStorage.getItem("demo-favorites")
      if (saved) {
        set({ favorites: JSON.parse(saved), isHydrated: true })
      } else {
        set({ isHydrated: true })
      }
    } catch {
      set({ isHydrated: true })
    }
  },
}))
