"use client"

import { create } from "zustand"

interface FlyItem {
  image: string
  startX: number
  startY: number
  startWidth: number
  startHeight: number
}

interface FlyToCartState {
  flyItem: FlyItem | null
  triggerFly: (item: FlyItem) => void
  clearFly: () => void
}

export const useFlyToCartStore = create<FlyToCartState>((set) => ({
  flyItem: null,
  triggerFly: (item: FlyItem) => set({ flyItem: item }),
  clearFly: () => set({ flyItem: null }),
}))
