"use client";

import { motion } from "framer-motion";
import { Monitor, Smartphone, Cloud, PenTool, Database, Wrench, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      id: "web",
      icon: Monitor,
      title: "Web Development",
      desc: "High-performance, accessible, and SEO-optimized web applications built with modern frameworks. We focus on fast load times and clean code architecture.",
      benefits: ["React & Next.js specialists", "Server-side rendering (SSR)", "Progressive Web Apps (PWA)", "Responsive & accessible"],
      timeline: "4-8 Weeks",
      color: "text-blue-600 dark:text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900/30",
      border: "border-blue-200 dark:border-blue-900/50"
    },
    {
      id: "mobile",
      icon: Smartphone,
      title: "Mobile App Development",
      desc: "Cross-platform and native mobile applications that provide native-like performance and intuitive user experiences on both iOS and Android.",
      benefits: ["React Native & Flutter", "Offline-first architecture", "App Store deployment", "Hardware integration"],
      timeline: "8-12 Weeks",
      color: "text-emerald-600 dark:text-emerald-500",
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      border: "border-emerald-200 dark:border-emerald-900/50"
    },
    {
      id: "saas",
      icon: Cloud,
      title: "SaaS Platform Development",
      desc: "End-to-end software as a service development, including multi-tenant architectures, subscription billing, and complex user role management.",
      benefits: ["Multi-tenant architecture", "Stripe billing integration", "Role-based access control", "Scalable cloud infrastructure"],
      timeline: "12-24 Weeks",
      color: "text-purple-600 dark:text-purple-500",
      bg: "bg-purple-100 dark:bg-purple-900/30",
      border: "border-purple-200 dark:border-purple-900/50"
    },
    {
      id: "uiux",
      icon: PenTool,
      title: "UI/UX Design",
      desc: "Data-driven and human-centric design services. We create bespoke design systems, fluid animations, and intuitive interfaces that delight users.",
      benefits: ["Wireframing & Prototyping", "Custom Design Systems", "Usability testing", "Framer Motion animations"],
      timeline: "2-4 Weeks",
      color: "text-orange-600 dark:text-orange-500",
      bg: "bg-orange-100 dark:bg-orange-900/30",
      border: "border-orange-200 dark:border-orange-900/50"
    },
    {
      id: "api",
      icon: Database,
      title: "API Development & Integration",
      desc: "Robust backend systems, RESTful and GraphQL APIs, and seamless integrations with third-party enterprise tools like CRMs and ERPs.",
      benefits: ["REST & GraphQL", "Microservices architecture", "Third-party integrations", "High-security & OAuth"],
      timeline: "4-8 Weeks",
      color: "text-red-600 dark:text-red-500",
      bg: "bg-red-100 dark:bg-red-900/30",
      border: "border-red-200 dark:border-red-900/50"
    },
    {
      id: "maintenance",
      icon: Wrench,
      title: "Maintenance & Support",
      desc: "Ongoing technical support, performance monitoring, and continuous feature development to keep your software running flawlessly.",
      benefits: ["24/7 uptime monitoring", "Security patches", "Performance optimization", "Dedicated support team"],
      timeline: "Ongoing",
      color: "text-slate-600 dark:text-slate-400",
      bg: "bg-slate-100 dark:bg-slate-800/50",
      border: "border-slate-200 dark:border-slate-700/50"
    }
  ];

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
          {services.map((svc, i) => (
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
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border ${svc.bg} ${svc.border}`}>
                    <svc.icon className={`w-8 h-8 ${svc.color}`} />
                  </div>
                  <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">{svc.title}</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    {svc.desc}
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Est. Timeline: {svc.timeline}</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-[#0f131d] rounded-2xl p-8 border border-gray-100 dark:border-gray-800">
                  <h3 className="font-heading font-bold text-xl text-gray-900 dark:text-white mb-6">Key Deliverables</h3>
                  <ul className="space-y-4">
                    {svc.benefits.map((benefit, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle className={`w-6 h-6 shrink-0 mt-0.5 ${svc.color}`} />
                        <span className="text-gray-700 dark:text-gray-300 text-lg">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
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
