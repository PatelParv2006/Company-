"use client"

import * as React from "react"
import { motion } from "framer-motion"

export function SkeletonCard() {
  return (
    <div className="bg-surface-lowest rounded-[28px] p-4 flex flex-col h-full ambient-shadow">
      {/* Image skeleton */}
      <div className="relative aspect-square rounded-[22px] bg-surface-low overflow-hidden mb-6">
        <div className="skeleton-shimmer absolute inset-0" />
      </div>

      <div className="flex flex-col flex-1 px-2">
        {/* Rating skeleton */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-16 h-4 rounded-full bg-surface-low relative overflow-hidden">
            <div className="skeleton-shimmer absolute inset-0" />
          </div>
        </div>

        {/* Title skeleton */}
        <div className="space-y-2 mb-4">
          <div className="w-full h-5 rounded-full bg-surface-low relative overflow-hidden">
            <div className="skeleton-shimmer absolute inset-0" />
          </div>
          <div className="w-2/3 h-5 rounded-full bg-surface-low relative overflow-hidden">
            <div className="skeleton-shimmer absolute inset-0" />
          </div>
        </div>

        {/* Price + button skeleton */}
        <div className="mt-auto pt-4 flex items-center justify-between gap-2">
          <div className="w-20 h-6 rounded-full bg-surface-low relative overflow-hidden">
            <div className="skeleton-shimmer absolute inset-0" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-surface-low relative overflow-hidden">
              <div className="skeleton-shimmer absolute inset-0" />
            </div>
            <div className="w-20 h-9 rounded-full bg-surface-low relative overflow-hidden">
              <div className="skeleton-shimmer absolute inset-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <SkeletonCard />
        </motion.div>
      ))}
    </div>
  )
}
