"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Layout, Code2, Cloud, Lock, LayoutDashboard, CreditCard, MessageSquare, Cpu, Languages, Clock, Sparkles, CheckCircle } from "lucide-react";

// Data Definitions
const projectTypes = [
  { id: "static", icon: Globe, name: "Static Site", desc: "Landing pages, portfolios, or marketing sites with fixed content", price: 15000 },
  { id: "dynamic", icon: Layout, name: "Dynamic Platform", desc: "Content management systems, blogs, or e-commerce storefronts", price: 35000 },
  { id: "webapp", icon: Code2, name: "Web Application", desc: "Complex logic, user dashboards, and interactive tooling", price: 75000 },
  { id: "saas", icon: Cloud, name: "SaaS Product", desc: "Subscription models, multi-tenant architecture, and heavy scalability", price: 150000 },
];

const featuresList = [
  { id: "auth", icon: Lock, name: "Authentication", price: 10000 },
  { id: "admin", icon: LayoutDashboard, name: "Admin Panel", price: 20000 },
  { id: "payment", icon: CreditCard, name: "Payment Gateway", price: 15000 },
  { id: "chat", icon: MessageSquare, name: "Real-time Chat", price: 25000 },
  { id: "api", icon: Code2, name: "RESTful API", price: 20000 },
  { id: "ai", icon: Cpu, name: "AI Integration", price: 30000 },
  { id: "lang", icon: Globe, name: "Multi-language", price: 10000 },
];

const complexities = [
  { id: "basic", name: "Basic", desc: "Standard CRUD operations, simple databases", mult: 1 },
  { id: "std", name: "Standard", desc: "Complex queries, third-party integrations", mult: 1.5 },
  { id: "adv", name: "Advanced", desc: "High concurrency, custom algorithms, ML", mult: 2.5 },
];

const designs = [
  { id: "std_ui", name: "Standard UI", desc: "Clean template-based structure, focus on utility over aesthetics", mult: 1 },
  { id: "premium", name: "Premium Agency", desc: "Bespoke design system, micro-interactions, and fluid animations", mult: 1.3 },
  { id: "3d", name: "Custom 3D / WebGL", desc: "Immersive experiences, custom shaders, and complex physics", mult: 1.8 },
];

export default function EstimatorPage() {
  const [selectedType, setSelectedType] = useState("static");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedComplexity, setSelectedComplexity] = useState("basic");
  const [selectedDesign, setSelectedDesign] = useState("std_ui");
  const [displayPrice, setDisplayPrice] = useState(0);

  const activeType = projectTypes.find(t => t.id === selectedType)!;
  const activeComplexity = complexities.find(c => c.id === selectedComplexity)!;
  const activeDesign = designs.find(d => d.id === selectedDesign)!;

  const totalPrice = useMemo(() => {
    const basePrice = activeType.price;
    const featuresPrice = selectedFeatures.reduce((acc, featId) => {
      const feat = featuresList.find(f => f.id === featId);
      return acc + (feat ? feat.price : 0);
    }, 0);
    return (basePrice + featuresPrice) * activeComplexity.mult * activeDesign.mult;
  }, [activeType, selectedFeatures, activeComplexity, activeDesign]);

  // Animated Counter
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    const startValue = displayPrice;
    const endValue = totalPrice;
    const duration = 500;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const current = Math.floor(startValue + (endValue - startValue) * progress);
      setDisplayPrice(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [totalPrice]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const getTimeline = () => {
    if (totalPrice < 50000) return "2-4 Weeks";
    if (totalPrice < 150000) return "4-8 Weeks";
    if (totalPrice < 300000) return "8-12 Weeks";
    return "12-24 Weeks";
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0f19] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          <h1 className="text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">Estimate Your Project Cost</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Configure your requirements and get an instant cost estimate.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column - Configuration */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Group 1: Project Type */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">1. Project Type</h2>
                <p className="text-gray-500 dark:text-gray-400">Select the core architecture of your application.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projectTypes.map(type => (
                  <div 
                    key={type.id} 
                    onClick={() => setSelectedType(type.id)}
                    className={`cursor-pointer rounded-xl p-5 border-2 transition-all ${
                      selectedType === type.id 
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                        : "border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111827] hover:border-blue-300 dark:hover:border-blue-800"
                    }`}
                  >
                    <type.icon className={`w-6 h-6 mb-3 ${selectedType === type.id ? "text-blue-600 dark:text-blue-400" : "text-gray-500"}`} />
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{type.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{type.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Group 2: Core Features */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">2. Core Features</h2>
                <p className="text-gray-500 dark:text-gray-400">Select the specific functionality required.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {featuresList.map(feat => {
                  const isSelected = selectedFeatures.includes(feat.id);
                  return (
                    <button
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all text-sm font-medium ${
                        isSelected
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "bg-white dark:bg-[#111827] border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700"
                      }`}
                    >
                      <feat.icon className="w-4 h-4" />
                      {feat.name}
                      {isSelected && <CheckCircle className="w-4 h-4 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Group 3: Technical Complexity */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">3. Technical Complexity</h2>
                <p className="text-gray-500 dark:text-gray-400">Determine the depth of backend architecture and data structuring.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {complexities.map(c => (
                  <div 
                    key={c.id} 
                    onClick={() => setSelectedComplexity(c.id)}
                    className={`cursor-pointer rounded-xl p-5 border-2 transition-all ${
                      selectedComplexity === c.id 
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                        : "border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111827] hover:border-gray-300"
                    }`}
                  >
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{c.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{c.desc}</p>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded">{c.mult}x Multiplier</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Group 4: Design and UX */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">4. Design and UX</h2>
                <p className="text-gray-500 dark:text-gray-400">Choose the visual fidelity and interaction level.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {designs.map(d => (
                  <div 
                    key={d.id} 
                    onClick={() => setSelectedDesign(d.id)}
                    className={`cursor-pointer rounded-xl p-5 border-2 transition-all ${
                      selectedDesign === d.id 
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                        : "border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111827] hover:border-gray-300"
                    }`}
                  >
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{d.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{d.desc}</p>
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded">{d.mult}x Multiplier</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Group 5: Video Preview Area */}
            <section className="pt-6">
              <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 aspect-video bg-gray-100 dark:bg-[#0f131d]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedType}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 p-6 flex flex-col"
                  >
                    {selectedType === "static" && (
                      <div className="flex-1 flex flex-col gap-4">
                        <div className="h-12 bg-blue-200 dark:bg-blue-900/40 rounded-lg"></div>
                        <div className="flex-1 grid grid-cols-3 gap-4">
                          <div className="col-span-2 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                          <div className="bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                        </div>
                        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                      </div>
                    )}
                    {selectedType === "dynamic" && (
                      <div className="flex-1 flex gap-4">
                        <div className="w-1/4 bg-gray-200 dark:bg-gray-800 rounded-lg hidden sm:block"></div>
                        <div className="flex-1 grid grid-cols-2 gap-4">
                          {[1,2,3,4].map(i => <div key={i} className="bg-blue-100 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-900/50"></div>)}
                        </div>
                      </div>
                    )}
                    {selectedType === "webapp" && (
                      <div className="flex-1 flex flex-col gap-4">
                        <div className="grid grid-cols-4 gap-4 h-20">
                          {[1,2,3,4].map(i => <div key={i} className="bg-indigo-100 dark:bg-indigo-900/30 rounded-lg"></div>)}
                        </div>
                        <div className="flex-1 bg-white dark:bg-[#111827] rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                          <div className="h-full border-2 border-dashed border-gray-200 dark:border-gray-700 rounded flex items-center justify-center text-gray-400">Interactive Table Area</div>
                        </div>
                      </div>
                    )}
                    {selectedType === "saas" && (
                      <div className="flex-1 flex gap-4">
                        <div className="w-1/5 bg-gray-900 dark:bg-gray-950 rounded-lg"></div>
                        <div className="flex-1 flex flex-col gap-4">
                          <div className="flex gap-4 h-24">
                            <div className="flex-1 bg-white dark:bg-[#111827] rounded-lg border border-gray-200 dark:border-gray-700"></div>
                            <div className="flex-1 bg-white dark:bg-[#111827] rounded-lg border border-gray-200 dark:border-gray-700"></div>
                            <div className="flex-1 bg-white dark:bg-[#111827] rounded-lg border border-gray-200 dark:border-gray-700"></div>
                          </div>
                          <div className="flex-1 flex gap-4">
                            <div className="flex-[2] bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/30 flex items-end p-4 gap-2 justify-between">
                               {[40,65,45,80,60,90].map((h, i) => <div key={i} className="w-8 bg-blue-500 rounded-t-sm" style={{height: `${h}%`}}></div>)}
                            </div>
                            <div className="flex-1 bg-white dark:bg-[#111827] rounded-lg border border-gray-200 dark:border-gray-700"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-[#111827]/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-700 dark:text-gray-300 shadow-sm z-10">
                  Previewing: {activeType.name} + {activeDesign.name}
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Sticky Summary */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden">
              <div className="p-8">
                <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">Estimate Summary</h2>
                <div className="mb-8">
                  <span className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 font-semibold mb-2 block">ESTIMATED COST</span>
                  <div className="flex items-baseline gap-1 text-gray-900 dark:text-white">
                    <span className="text-4xl font-bold">₹</span>
                    <span className="text-5xl font-bold tracking-tight">{displayPrice.toLocaleString("en-IN")}</span>
                    <span className="text-xl text-gray-500 ml-2">INR</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">*Prices are indicative and subject to final scoping.</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Base Architecture</span>
                    <span className="font-medium text-gray-900 dark:text-white">{activeType.name}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Selected Features</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedFeatures.length} modules</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Complexity</span>
                    <span className="font-medium text-gray-900 dark:text-white">{activeComplexity.name}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">Design Quality</span>
                    <span className="font-medium text-gray-900 dark:text-white">{activeDesign.name}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-8 p-4 bg-orange-50 dark:bg-orange-900/10 rounded-xl border border-orange-100 dark:border-orange-900/30">
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-orange-500" />
                    <div>
                      <span className="text-xs font-semibold text-orange-700 dark:text-orange-400 tracking-wider block uppercase">Estimated Timeline</span>
                      <span className="text-xl font-bold text-gray-900 dark:text-white">{getTimeline()}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2">
                  Get Detailed Quote <Sparkles className="w-5 h-5 opacity-70" />
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
