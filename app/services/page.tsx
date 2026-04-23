"use client";

import { motion } from "framer-motion";
import { 
  Monitor, Smartphone, Cloud, PenTool, Database, Wrench, 
  CheckCircle, Clock, Sparkles, Globe, FileText, Calendar, 
  Layout, ShoppingCart, Zap, Bot, LucideIcon 
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getServices, ServiceItem } from "@/lib/site-content";

const iconMap: Record<string, LucideIcon> = {
  "sparkles": Sparkles,
  "globe": Globe,
  "file-text": FileText,
  "calendar": Calendar,
  "layout": Layout,
  "shopping-cart": ShoppingCart,
  "database": Database,
  "zap": Zap,
  "bot": Bot,
  "monitor": Monitor,
  "smartphone": Smartphone,
  "wrench": Wrench,
  "pen-tool": PenTool,
  "cloud": Cloud,
};

const colorMap = [
  { color: "text-blue-600 dark:text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30", border: "border-blue-200 dark:border-blue-900/50" },
  { color: "text-emerald-600 dark:text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-900/30", border: "border-emerald-200 dark:border-emerald-900/50" },
  { color: "text-purple-600 dark:text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/30", border: "border-purple-200 dark:border-purple-900/50" },
  { color: "text-orange-600 dark:text-orange-500", bg: "bg-orange-100 dark:bg-orange-900/30", border: "border-orange-200 dark:border-orange-900/50" },
  { color: "text-red-600 dark:text-red-500", bg: "bg-red-100 dark:bg-red-900/30", border: "border-red-200 dark:border-red-900/50" },
  { color: "text-indigo-600 dark:text-indigo-500", bg: "bg-indigo-100 dark:bg-indigo-900/30", border: "border-indigo-200 dark:border-indigo-900/50" },
  { color: "text-cyan-600 dark:text-cyan-500", bg: "bg-cyan-100 dark:bg-cyan-900/30", border: "border-cyan-200 dark:border-cyan-900/50" },
  { color: "text-rose-600 dark:text-rose-500", bg: "bg-rose-100 dark:bg-rose-900/30", border: "border-rose-200 dark:border-rose-900/50" },
];

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getServices();
      setServices(data);
      setIsLoading(false);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b0f19] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6"
          >
            What We Build
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-400"
          >
            From complex enterprise platforms to sleek mobile apps, we provide end-to-end engineering services to bring your vision to life.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-10 mb-24">
          {isLoading ? (
            <div className="py-20 text-center text-gray-500">Loading services...</div>
          ) : (
            services.map((svc, i) => {
              const Icon = iconMap[svc.icon] || Monitor;
              const style = colorMap[i % colorMap.length];

              return (
                <motion.div
                  key={svc.id}
                  id={svc.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white dark:bg-[#111827] rounded-3xl p-8 lg:p-12 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border ${style.bg} ${style.border}`}>
                        <Icon className={`w-8 h-8 ${style.color}`} />
                      </div>
                      <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">{svc.title}</h2>
                      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        {svc.description}
                      </p>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Est. Timeline: {svc.timeline}</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-[#0f131d] rounded-2xl p-8 border border-gray-100 dark:border-gray-800">
                      <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-6">Key Deliverables</h3>
                      <ul className="space-y-4">
                        {svc.deliverables.map((benefit, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <CheckCircle className={`w-6 h-6 shrink-0 mt-0.5 ${style.color}`} />
                            <span className="text-gray-700 dark:text-gray-300 text-lg">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-blue-600 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 relative z-10">Not sure which service you need?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto relative z-10">Our technical architects can analyze your business requirements and propose the optimal technology stack and service mix.</p>
          <Link href="/contact" className="inline-block bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-full font-bold text-lg transition-colors relative z-10 shadow-xl">
            Talk to Our Team
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
