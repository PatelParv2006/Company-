"use client"

import * as React from "react"
import { DollarSign, ShoppingBag, PackageOpen, Activity, TrendingUp, TrendingDown } from "lucide-react"
import { useProductStore } from "@/lib/demos/ecommerce/stores/productStore"
import { motion } from "framer-motion"

const MONTHLY_REVENUE = {
  thisYear: [
    { month: "Jan", value: 18200 },
    { month: "Feb", value: 22400 },
    { month: "Mar", value: 28900 },
    { month: "Apr", value: 24600 },
    { month: "May", value: 31200 },
    { month: "Jun", value: 27800 },
    { month: "Jul", value: 33500 },
    { month: "Aug", value: 29100 },
    { month: "Sep", value: 35800 },
    { month: "Oct", value: 38200 },
    { month: "Nov", value: 45200 },
    { month: "Dec", value: 52800 },
  ],
  lastYear: [
    { month: "Jan", value: 12400 },
    { month: "Feb", value: 15800 },
    { month: "Mar", value: 19200 },
    { month: "Apr", value: 17600 },
    { month: "May", value: 21400 },
    { month: "Jun", value: 19800 },
    { month: "Jul", value: 24200 },
    { month: "Aug", value: 22100 },
    { month: "Sep", value: 26800 },
    { month: "Oct", value: 28400 },
    { month: "Nov", value: 34800 },
    { month: "Dec", value: 41200 },
  ],
}

const WEEKLY_REVENUE = [
  { month: "Mon", value: 4200, prev: 3100 },
  { month: "Tue", value: 6800, prev: 5200 },
  { month: "Wed", value: 5100, prev: 4800 },
  { month: "Thu", value: 8900, prev: 6400 },
  { month: "Fri", value: 7200, prev: 5900 },
  { month: "Sat", value: 9400, prev: 7800 },
  { month: "Sun", value: 11200, prev: 8200 },
]

const MONTHLY_PERIOD = [
  { month: "W1", value: 22400, prev: 18200 },
  { month: "W2", value: 28900, prev: 21400 },
  { month: "W3", value: 31200, prev: 25800 },
  { month: "W4", value: 35600, prev: 28400 },
]

type Period = "week" | "month" | "year"

export default function AdminDashboardPage() {
  const products = useProductStore((s) => s.products)
  const [period, setPeriod] = React.useState<Period>("year")
  const [hoveredBar, setHoveredBar] = React.useState<number | null>(null)

  const stats = [
    { label: "Total Revenue", value: "$387,700", trend: "+20.1%", trendUp: true, icon: DollarSign },
    { label: "Sales", value: "+2,350", trend: "+18.3%", trendUp: true, icon: ShoppingBag },
    { label: "Catalog Items", value: products.length.toString(), trend: "+10%", trendUp: true, icon: PackageOpen },
    { label: "Active Users", value: "573", trend: "+201 since last hour", trendUp: true, icon: Activity },
  ]

  const recentOrders = [
    { id: "ORD-8492", customer: "John Doe", product: "Aero Headphones", status: "Shipped", amount: "$349.00" },
    { id: "ORD-8493", customer: "Jane Smith", product: "Chronos Watch", status: "Processing", amount: "$899.00" },
    { id: "ORD-8494", customer: "Mike Johnson", product: "Leather Backpack", status: "Delivered", amount: "$245.00" },
    { id: "ORD-8495", customer: "Sarah Williams", product: "Lumina Charger", status: "Processing", amount: "$79.00" },
    { id: "ORD-8496", customer: "David Chen", product: "Mech Keyboard", status: "Delivered", amount: "$210.00" },
  ]

  const getChartData = () => {
    if (period === "week") return WEEKLY_REVENUE.map(d => ({ ...d, prev: d.prev }))
    if (period === "month") return MONTHLY_PERIOD.map(d => ({ ...d, prev: d.prev }))
    return MONTHLY_REVENUE.thisYear.map((d, i) => ({ ...d, prev: MONTHLY_REVENUE.lastYear[i].value }))
  }

  const chartData = getChartData()
  const maxValue = Math.max(...chartData.map(d => Math.max(d.value, d.prev)))

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-surface-lowest p-6 rounded-[24px] ambient-shadow hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">{stat.label}</h3>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
            <div className="flex items-center gap-1">
              {stat.trendUp ? (
                <TrendingUp className="w-3.5 h-3.5 text-green-500" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 text-red-500" />
              )}
              <p className={`text-xs font-medium ${stat.trendUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{stat.trend}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-surface-lowest p-8 rounded-[32px] ambient-shadow">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-foreground">Revenue Overview</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {period === "year" ? "Monthly breakdown — 2026 vs 2025" : period === "month" ? "Weekly breakdown" : "Daily breakdown"}
              </p>
            </div>
            <div className="flex bg-surface-low rounded-full p-1">
              {(["week", "month", "year"] as Period[]).map(p => (
                <button
                  key={p}
                  onClick={() => { setPeriod(p); setHoveredBar(null) }}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    period === p
                      ? "bg-primary text-white shadow-md"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {p === "week" ? "7D" : p === "month" ? "30D" : "12M"}
                </button>
              ))}
            </div>
          </div>

          {/* Y-axis labels + Bars */}
          <div className="flex gap-4">
            {/* Y-axis */}
            <div className="flex flex-col justify-between text-[10px] font-medium text-muted-foreground h-64 py-1 w-10 text-right">
              <span>${(maxValue / 1000).toFixed(0)}K</span>
              <span>${(maxValue * 0.75 / 1000).toFixed(0)}K</span>
              <span>${(maxValue * 0.5 / 1000).toFixed(0)}K</span>
              <span>${(maxValue * 0.25 / 1000).toFixed(0)}K</span>
              <span>$0</span>
            </div>

            {/* Bars */}
            <div className="flex-1">
              <div className="h-64 flex items-end justify-between gap-1.5 border-b border-border pb-0 relative">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[0, 1, 2, 3].map(i => (
                    <div key={i} className="border-b border-border/30" />
                  ))}
                </div>

                {chartData.map((data, i) => {
                  const barHeight = 256 // h-64 = 16rem = 256px
                  const prevH = (data.prev / maxValue) * barHeight
                  const currH = (data.value / maxValue) * barHeight
                  return (
                  <div
                    key={i}
                    className="flex-1 flex items-end gap-0.5 relative group cursor-pointer"
                    onMouseEnter={() => setHoveredBar(i)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {/* Previous year bar */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: prevH }}
                      transition={{ duration: 0.5, delay: i * 0.03 }}
                      className="flex-1 bg-surface-highest rounded-t-[4px] transition-all hover:brightness-110 relative z-10"
                    />
                    {/* Current year bar */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: currH }}
                      transition={{ duration: 0.5, delay: i * 0.03 + 0.1 }}
                      className="flex-1 bg-primary rounded-t-[4px] transition-all hover:brightness-110 relative z-10"
                    />

                    {/* Tooltip */}
                    {hoveredBar === i && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs font-bold px-3 py-2 rounded-xl whitespace-nowrap z-50 shadow-xl"
                      >
                        <div className="text-center">
                          <div className="text-[10px] font-medium opacity-70 mb-1">{data.month}</div>
                          <div className="text-primary-foreground">
                            ${(data.value / 1000).toFixed(1)}K
                          </div>
                          <div className="opacity-50 text-[10px]">
                            prev: ${(data.prev / 1000).toFixed(1)}K
                          </div>
                        </div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45 -mt-1" />
                      </motion.div>
                    )}
                  </div>
                )})}
              </div>

              {/* X-axis labels */}
              <div className="flex justify-between mt-3 text-[11px] font-medium text-muted-foreground px-0.5">
                {chartData.map((d, i) => (
                  <span key={i} className="flex-1 text-center">{d.month}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-primary" />
              <span>{period === "year" ? "This Year" : "Current"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-surface-highest" />
              <span>{period === "year" ? "Last Year" : "Previous"}</span>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-surface-lowest p-8 rounded-[32px] ambient-shadow">
          <h3 className="text-lg font-bold text-foreground mb-6">Recent Orders</h3>
          <div className="space-y-6">
            {recentOrders.map((order, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex justify-between items-center"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">{order.customer}</p>
                  <p className="text-xs text-muted-foreground">{order.product}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-foreground">{order.amount}</p>
                  <p className={`text-xs ${
                    order.status === 'Delivered' ? 'text-green-500' :
                    order.status === 'Shipped' ? 'text-blue-500' : 'text-primary'
                  }`}>
                    {order.status}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
