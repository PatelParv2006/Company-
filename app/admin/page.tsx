"use client";

import { motion } from "framer-motion";
import { FolderOpen, MonitorSmartphone, Mail, DollarSign, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [chartView, setChartView] = useState<"monthly" | "quarterly">("monthly");

  const stats = [
    { label: "Total Projects", value: "148", change: "+12%", up: true, icon: FolderOpen, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Active Demos", value: "32", change: "+5%", up: true, icon: MonitorSmartphone, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Pending Inquiries", value: "12", change: "-2%", up: false, icon: Mail, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Monthly Revenue", value: "$84.2k", change: "+18%", up: true, icon: DollarSign, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  const chartData = [
    { label: "Jan", height: "40%" },
    { label: "Feb", height: "65%" },
    { label: "Mar", height: "45%" },
    { label: "Apr", height: "80%" },
    { label: "May", height: "60%" },
    { label: "Jun", height: "90%" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-1">Overview</h1>
        <p className="text-gray-500 dark:text-gray-400">Welcome back. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4">
              <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md ${stat.up ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{stat.label}</p>
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left - Bar Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white mb-1">Inquiry Volume</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Last 6 months comparison</p>
            </div>
            <div className="flex bg-gray-100 dark:bg-[#0f131d] rounded-lg p-1 border border-gray-200 dark:border-gray-800">
              <button 
                onClick={() => setChartView("monthly")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${chartView === "monthly" ? "bg-white dark:bg-[#111827] text-gray-900 dark:text-white shadow-sm" : "text-gray-500"}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setChartView("quarterly")}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${chartView === "quarterly" ? "bg-white dark:bg-[#111827] text-gray-900 dark:text-white shadow-sm" : "text-gray-500"}`}
              >
                Quarterly
              </button>
            </div>
          </div>

          <div className="h-64 flex items-end justify-between gap-4">
            {chartData.map((data, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end items-center gap-3 h-full">
                <div className="w-full h-full flex items-end justify-center rounded-t-md relative group">
                  <motion.div 
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                    style={{ height: data.height, transformOrigin: "bottom" }}
                    className="w-full max-w-[40px] bg-blue-500 rounded-t-md relative"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {data.height}
                    </div>
                  </motion.div>
                </div>
                <span className="text-xs font-medium text-gray-500">{data.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Activity Feed */}
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-heading font-bold text-lg text-gray-900 dark:text-white">Activity</h3>
            <Link href="/admin/inquiries" className="text-sm font-medium text-blue-500 hover:text-blue-600">View All</Link>
          </div>
          
          <div className="flex-1 space-y-6">
            {[
              { title: "New Inquiry Received", desc: "SaaS Platform estimate for $45,000", time: "2 hours ago", color: "bg-blue-500" },
              { title: "Project Approved", desc: "E-commerce platform build kickoff", time: "5 hours ago", color: "bg-green-500" },
              { title: "Demo Server Deployed", desc: "Real estate portal v1.2 live", time: "1 day ago", color: "bg-purple-500" }
            ].map((activity, i) => (
              <div key={i} className="flex gap-4">
                <div className="relative mt-1">
                  <div className={`w-3 h-3 rounded-full ${activity.color} ring-4 ring-white dark:ring-[#111827] relative z-10`}></div>
                  {i !== 2 && <div className="absolute top-3 left-1.5 w-px h-10 bg-gray-200 dark:bg-gray-800 -translate-x-1/2 z-0"></div>}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">{activity.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{activity.desc}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3 h-3" /> {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
