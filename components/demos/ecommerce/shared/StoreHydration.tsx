"use client"

import * as React from "react"
import { useCartStore } from "@/lib/demos/ecommerce/stores/cartStore"
import { useProductStore } from "@/lib/demos/ecommerce/stores/productStore"
import { useFavoriteStore } from "@/lib/demos/ecommerce/stores/favoriteStore"

export function StoreHydration() {
  const hydrateCart = useCartStore((s) => s.hydrate)
  const hydrateProducts = useProductStore((s) => s.hydrate)
  const hydrateFavorites = useFavoriteStore((s) => s.hydrate)

  React.useEffect(() => {
    hydrateCart()
    hydrateProducts()
    hydrateFavorites()
  }, [hydrateCart, hydrateProducts, hydrateFavorites])

  return null
}
