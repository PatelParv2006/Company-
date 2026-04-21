"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useFlyToCartStore } from "@/lib/demos/ecommerce/stores/flyToCartStore"

export function FlyToCart() {
  const flyItem = useFlyToCartStore((s) => s.flyItem)
  const clearFly = useFlyToCartStore((s) => s.clearFly)
  const [target, setTarget] = React.useState<{ x: number; y: number } | null>(null)

  React.useEffect(() => {
    if (flyItem) {
      const cartIcon = document.getElementById("cart-icon-target")
      if (cartIcon) {
        const rect = cartIcon.getBoundingClientRect()
        setTarget({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
      } else {
        // Fallback: top-right corner
        setTarget({ x: window.innerWidth - 60, y: 40 })
      }
    }
  }, [flyItem])

  const handleAnimationComplete = () => {
    clearFly()
    setTarget(null)
  }

  if (!flyItem || !target) return null

  const startX = flyItem.startX + flyItem.startWidth / 2
  const startY = flyItem.startY + flyItem.startHeight / 2

  return (
    <AnimatePresence>
      <motion.div
        key={`fly-${Date.now()}`}
        initial={{
          position: "fixed",
          left: startX - 30,
          top: startY - 30,
          width: 60,
          height: 60,
          opacity: 1,
          scale: 1,
          zIndex: 9999,
          borderRadius: "16px",
          overflow: "hidden",
          pointerEvents: "none" as const,
          boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
        }}
        animate={{
          left: target.x - 12,
          top: target.y - 12,
          width: 24,
          height: 24,
          opacity: 0.6,
          scale: 0.4,
          borderRadius: "50%",
        }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        onAnimationComplete={handleAnimationComplete}
        style={{ position: "fixed", zIndex: 9999, pointerEvents: "none" }}
      >
        <img
          src={flyItem.image}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </motion.div>
    </AnimatePresence>
  )
}
