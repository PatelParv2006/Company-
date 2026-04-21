"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, LayoutDashboard, Rocket, Star, MonitorSmartphone, Palette, Bot, CheckCircle, Quote, Layout } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const floatingAnimation = (duration: number) => ({
    y: [0, -12, 0],
    transition: {
      duration,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-64px)] flex items-center overflow-hidden bg-white dark:bg-[#0b0f19] pt-12 pb-24 lg:py-0">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-[100px] transform-gpu will-change-transform" />
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-[120px] transform-gpu will-change-transform" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="max-w-2xl"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 mb-8">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-semibold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
                  Sculpting Digital Environments
                </span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl lg:text-6xl font-heading font-bold leading-tight text-gray-900 dark:text-white mb-6">
                Custom Software, SaaS Platforms & Web Applications Built for Growth
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed max-w-xl">
                DevMind Studio engineers high-performance digital products using Next.js, React, Node.js, and cloud architecture — built for startups and growing businesses.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 mb-8">
                <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-medium transition-colors">
                  Start a Project
                </Link>
                <Link href="/projects" className="group flex items-center gap-2 px-8 py-3.5 rounded-full border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white/50 dark:bg-white/5 backdrop-blur-sm text-gray-900 dark:text-white font-medium transition-all">
                  View Portfolio
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              
              <motion.p variants={fadeInUp} className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Trusted by 50+ startups and growing businesses.
              </motion.p>
            </motion.div>
            
            <div className="relative h-[600px] hidden lg:block perspective-1000">
              {/* Card 1: Clean Architecture */}
              <motion.div 
                animate={floatingAnimation(3.5)}
                className="absolute top-[10%] left-[5%] z-20 w-64 bg-white dark:bg-[#111827] rounded-2xl p-5 shadow-2xl border border-gray-100 dark:border-gray-800 transform-gpu will-change-transform"
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
                  <Code2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-1">Clean Architecture</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Scalable & Maintainable.</p>
              </motion.div>

              {/* Card 2: Data-Driven UX (Mockup) */}
              <motion.div 
                animate={floatingAnimation(4)}
                className="absolute top-[30%] left-[35%] z-10 w-80 bg-gray-50 dark:bg-[#0f131d] rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 transform-gpu will-change-transform"
              >
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3 bg-white dark:bg-[#111827]">
                  <LayoutDashboard className="w-5 h-5 text-blue-500" />
                  <span className="font-heading font-bold text-sm text-gray-900 dark:text-white">Data-Driven UX</span>
                </div>
                <div className="p-4 space-y-3">
                  <div className="h-24 bg-blue-100 dark:bg-blue-900/20 rounded-lg border border-blue-200/50 dark:border-blue-800/50" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-16 bg-white dark:bg-[#111827] rounded-lg border border-gray-200 dark:border-gray-800" />
                    <div className="h-16 bg-white dark:bg-[#111827] rounded-lg border border-gray-200 dark:border-gray-800" />
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Rapid Deployment */}
              <motion.div 
                animate={floatingAnimation(2.8)}
                className="absolute top-[15%] right-[0%] z-30 w-64 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-5 shadow-[0_20px_40px_-15px_rgba(59,130,246,0.5)] border border-blue-400/50 transform-gpu will-change-transform"
              >
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-heading font-bold text-white mb-1">Rapid Deployment</h3>
                <p className="text-sm text-blue-100">From concept to live in weeks.</p>
              </motion.div>

              {/* Card 4: Flawless UI */}
              <motion.div 
                animate={floatingAnimation(3.2)}
                className="absolute bottom-[20%] right-[15%] z-20 w-64 bg-white dark:bg-[#111827] rounded-2xl p-5 shadow-2xl border border-gray-100 dark:border-gray-800 transform-gpu will-change-transform"
              >
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-900/30 flex items-center justify-center mb-4">
                  <Star className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </div>
                <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-1">Flawless UI</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pixel-perfect execution.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-24 bg-gray-50 dark:bg-[#0b0f19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer}
            className="mb-12"
          >
            <motion.span variants={fadeInUp} className="text-xs font-semibold tracking-widest text-blue-500 uppercase mb-3 block">
              CAPABILITIES
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl font-heading font-bold text-gray-900 dark:text-white">
              Architectural Precision
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <motion.div 
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="lg:col-span-2 bg-white dark:bg-[#111827] rounded-3xl p-8 lg:p-12 border border-gray-200 dark:border-gray-800 relative overflow-hidden group"
            >
              <div className="relative z-10 max-w-md">
                <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-[#0f131d] flex items-center justify-center mb-6 border border-gray-200 dark:border-gray-800">
                  <MonitorSmartphone className="w-6 h-6 text-gray-900 dark:text-white" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-4">Systems Engineering</h3>
                <p className="text-gray-600 dark:text-gray-400">Robust, scalable backend architectures designed for zero-downtime environments. We build systems that handle millions of requests flawlessly.</p>
              </div>
              
              {/* Laptop Mockup */}
              <div className="absolute -right-20 -bottom-20 w-96 h-80 bg-gray-100 dark:bg-[#0f131d] rounded-tl-xl border-t-8 border-l-8 border-gray-800 dark:border-gray-700 shadow-2xl transition-transform group-hover:-translate-y-4 group-hover:-translate-x-4 duration-500">
                <div className="p-4 flex gap-2 border-b border-gray-200 dark:border-gray-800">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
                  <div className="w-full h-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
                  <div className="w-5/6 h-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white dark:bg-[#111827] rounded-3xl p-8 border border-gray-200 dark:border-gray-800"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-900/20 flex items-center justify-center mb-5 border border-slate-200 dark:border-slate-900/50">
                  <Palette className="w-6 h-6 text-slate-600 dark:text-slate-500" />
                </div>
                <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">UI/UX Design</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Immersive interfaces guided by human-centric principles.</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white dark:bg-[#111827] rounded-3xl p-8 border border-gray-200 dark:border-gray-800"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-5 border border-blue-200 dark:border-blue-900/50">
                  <Bot className="w-6 h-6 text-blue-600 dark:text-blue-500" />
                </div>
                <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">AI Solutions</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Custom LLM integrations and automated workflows.</p>
              </motion.div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full bg-blue-600 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <p className="text-white text-lg sm:text-xl font-medium max-w-xl leading-snug">
                Need a custom stack? Explore our tech radar and methodologies.
              </p>
            </div>
            <Link href="/services" className="relative z-10 shrink-0 bg-white text-blue-600 hover:bg-gray-50 px-6 py-3 rounded-full font-medium transition-colors shadow-lg">
              View Stack
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 bg-white dark:bg-[#0b0f19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Our Featured Projects
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 dark:text-gray-400">
              Real software products built for real business problems.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "E-commerce Platform", desc: "High-conversion headless storefront with Next.js", tech: ["Next.js", "Stripe"], grad: "from-blue-500 to-indigo-600" },
              { title: "SaaS Analytics Dashboard", desc: "Real-time data visualization platform", tech: ["React", "D3.js"], grad: "from-emerald-500 to-teal-600" },
              { title: "Booking Management System", desc: "Multi-tenant booking solution for clinics", tech: ["Node.js", "PostgreSQL"], grad: "from-slate-500 to-slate-700" },
              { title: "Hospital Management", desc: "HIPAA-compliant patient record system", tech: ["Next.js", "GraphQL"], grad: "from-purple-500 to-pink-600" },
              { title: "Real Estate Portal", desc: "Property listing platform with map integrations", tech: ["Vue", "Firebase"], grad: "from-cyan-500 to-blue-600" },
              { title: "AI Content Generator", desc: "LLM-powered marketing copy automation", tech: ["Python", "OpenAI"], grad: "from-fuchsia-500 to-purple-600" }
            ].map((project, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-[#111827] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`h-48 bg-gradient-to-br ${project.grad} relative p-6 flex flex-col justify-end`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                  <Layout className="w-8 h-8 text-white mb-2 relative z-10" />
                  <h3 className="text-xl font-bold text-white relative z-10">{project.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 h-10">{project.desc}</p>
                  <div className="flex gap-2 mb-6">
                    {project.tech.map(t => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Link href={`/projects/${i + 1}`} className="flex-1 text-center bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 py-2.5 rounded-lg text-sm font-medium transition-colors">
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gray-50 dark:bg-[#0f131d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">How We Work</h2>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-10 right-10 h-0.5 border-t-2 border-dashed border-gray-300 dark:border-gray-700 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
              {[
                { title: "Requirement Analysis", desc: "Deep diving into your business needs." },
                { title: "UI/UX Design", desc: "Creating intuitive and beautiful interfaces." },
                { title: "Development", desc: "Agile sprints with clean, scalable code." },
                { title: "Testing and QA", desc: "Rigorous automated and manual testing." },
                { title: "Deployment", desc: "Smooth launch and continuous CI/CD." }
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-24 h-24 rounded-full bg-white dark:bg-[#111827] border-4 border-blue-50 dark:border-blue-900/30 shadow-lg flex items-center justify-center mb-6 relative group">
                    <div className="absolute inset-0 rounded-full border-2 border-blue-500 scale-110 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300"></div>
                    <span className="text-2xl font-heading font-bold text-blue-600 dark:text-blue-500">{i + 1}</span>
                  </div>
                  <h3 className="font-heading font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white dark:bg-[#0b0f19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-heading font-bold text-gray-900 dark:text-white text-center mb-16">What Our Clients Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Rahul S.", company: "FinTrack", text: "DevMind Studio transformed our billing platform. The new architecture is blazingly fast and the UI is incredibly intuitive." },
              { name: "Priya M.", company: "ShopNest", text: "Their e-commerce expertise is unmatched. We launched our custom storefront in record time with zero technical debt." },
              { name: "Arjun K.", company: "BuildBase", text: "The team's grasp of complex SaaS workflows saved us months of development. Truly a premium agency experience." }
            ].map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 dark:bg-[#111827] p-8 rounded-2xl border border-gray-200 dark:border-gray-800 relative"
              >
                <Quote className="w-10 h-10 text-blue-100 dark:text-blue-900/50 absolute top-6 right-6" />
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-8 italic">"{review.text}"</p>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{review.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{review.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-700 text-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-white mb-6">Ready to Build Your Next Digital Product?</h2>
          <p className="text-xl text-blue-100 mb-10">Let's turn your idea into a scalable software solution.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="bg-white text-blue-700 hover:bg-gray-50 px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-xl">
              Get Free Consultation
            </Link>
            <Link href="/projects" className="bg-transparent border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-full font-bold text-lg transition-colors">
              View Our Projects
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
