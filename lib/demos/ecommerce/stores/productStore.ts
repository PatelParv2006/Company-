"use client"

import { create } from "zustand"
import { type Product, products as initialProducts } from "@/lib/demos/ecommerce/data/products"

interface ProductState {
  products: Product[]
  isHydrated: boolean

  addProduct: (product: Omit<Product, "id">) => void
  updateProduct: (product: Product) => void
  deleteProduct: (id: string) => void
  hydrate: () => void
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  isHydrated: false,

  addProduct: (product: Omit<Product, "id">) => {
    set((state) => {
      const nextIdNum =
        state.products.length > 0
          ? Math.max(
              ...state.products.map(
                (p) => parseInt(p.id.replace("p", "")) || 0
              )
            ) + 1
          : 1
      const newProduct: Product = {
        ...product,
        id: `p${nextIdNum}`,
      }
      const newProducts = [newProduct, ...state.products]
      sessionStorage.setItem(
        "next-ecommerce-demo-v2",
        JSON.stringify(newProducts)
      )
      return { products: newProducts }
    })
  },

  updateProduct: (updated: Product) => {
    set((state) => {
      const newProducts = state.products.map((p) =>
        p.id === updated.id ? updated : p
      )
      sessionStorage.setItem(
        "next-ecommerce-demo-v2",
        JSON.stringify(newProducts)
      )
      return { products: newProducts }
    })
  },

  deleteProduct: (id: string) => {
    set((state) => {
      const newProducts = state.products.filter((p) => p.id !== id)
      sessionStorage.setItem(
        "next-ecommerce-demo-v2",
        JSON.stringify(newProducts)
      )
      return { products: newProducts }
    })
  },

  hydrate: () => {
    if (typeof window === "undefined") return
    try {
      const saved = sessionStorage.getItem("next-ecommerce-demo-v2")
      if (saved) {
        set({ products: JSON.parse(saved), isHydrated: true })
      } else {
        set({ products: initialProducts, isHydrated: true })
      }
    } catch {
      set({ products: initialProducts, isHydrated: true })
    }
  },
}))
