"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Smartphone, Layout, Monitor, ShieldCheck, Zap, Database, ArrowRight, Check, RefreshCw } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

// --- Data Models ---
type ProjectType = "static" | "dynamic" | "ecommerce" | "saas" | "mobile" | "enterprise";
type QualityTier = "basic" | "standard" | "premium";
type Timeline = "flexible" | "standard" | "rush";
type SupportPlan = "none" | "3months" | "6months" | "1year";

interface Feature {
  id: string;
  label: string;
  price: number;
  icon: React.ElementType;
}

const PROJECT_TYPES: Record<ProjectType, { label: string, icon: React.ElementType, basePrice: number }> = {
  static: { label: "Static Website", icon: Globe, basePrice: 20000 },
  dynamic: { label: "Dynamic Web App", icon: Monitor, basePrice: 50000 },
  ecommerce: { label: "E-Commerce", icon: Layout, basePrice: 80000 },
  saas: { label: "SaaS Platform", icon: Database, basePrice: 150000 },
  mobile: { label: "Mobile App", icon: Smartphone, basePrice: 120000 },
  enterprise: { label: "Custom Enterprise", icon: ShieldCheck, basePrice: 250000 },
};

const FEATURES_BY_TYPE: Record<ProjectType, Feature[]> = {
  static: [
    { id: "seo", label: "Advanced SEO", price: 5000, icon: Zap },
    { id: "blog", label: "Blog / CMS", price: 15000, icon: Layout },
    { id: "contact", label: "Contact Form", price: 2000, icon: ShieldCheck },
  ],
  dynamic: [
    { id: "auth", label: "User Auth", price: 15000, icon: ShieldCheck },
    { id: "api", label: "REST API", price: 20000, icon: Database },
    { id: "admin", label: "Admin Panel", price: 30000, icon: Layout },
  ],
  ecommerce: [
    { id: "payment", label: "Payment Gateway", price: 15000, icon: Zap },
    { id: "inventory", label: "Inventory Mgmt", price: 25000, icon: Database },
    { id: "coupons", label: "Discount System", price: 10000, icon: ShieldCheck },
  ],
  saas: [
    { id: "billing", label: "Subscription Billing", price: 40000, icon: Zap },
    { id: "multitenant", label: "Multi-tenancy", price: 50000, icon: Database },
    { id: "ai", label: "AI Integration", price: 60000, icon: ShieldCheck },
  ],
  mobile: [
    { id: "push", label: "Push Notifications", price: 15000, icon: Zap },
    { id: "offline", label: "Offline Mode", price: 30000, icon: Database },
    { id: "maps", label: "Map Integration", price: 20000, icon: Globe },
  ],
  enterprise: [
    { id: "sso", label: "SSO Integration", price: 40000, icon: ShieldCheck },
    { id: "audit", label: "Audit Logs", price: 25000, icon: Database },
    { id: "sla", label: "99.9% Uptime SLA", price: 50000, icon: Zap },
  ],
};

const MULTIPLIERS = {
  quality: { basic: 1, standard: 1.5, premium: 2.5 },
  timeline: { flexible: 0.9, standard: 1, rush: 1.4 },
  support: { none: 1, "3months": 1.1, "6months": 1.15, "1year": 1.25 },
};

// --- Currency Config ---
const CURRENCIES = ["INR", "USD", "EUR", "GBP", "AUD"];
const CURRENCY_SYMBOLS: Record<string, string> = { INR: "₹", USD: "$", EUR: "€", GBP: "£", AUD: "A$" };

export default function EstimatorPage() {
  const [mounted, setMounted] = useState(false);
  
  // State
  const [projectType, setProjectType] = useState<ProjectType>("static");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [quality, setQuality] = useState<QualityTier>("standard");
  const [timeline, setTimeline] = useState<Timeline>("standard");
  const [support, setSupport] = useState<SupportPlan>("none");
  
  const [currency, setCurrency] = useState("INR");
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({ INR: 1 });
  const [isLoadingRates, setIsLoadingRates] = useState(false);

  // Load state from localStorage
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("devmind_estimator");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.projectType) setProjectType(parsed.projectType);
        if (parsed.selectedFeatures) setSelectedFeatures(parsed.selectedFeatures);
        if (parsed.quality) setQuality(parsed.quality);
        if (parsed.timeline) setTimeline(parsed.timeline);
        if (parsed.support) setSupport(parsed.support);
        if (parsed.currency) setCurrency(parsed.currency);
      } catch (e) {
        console.error("Failed to parse saved estimator state");
      }
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("devmind_estimator", JSON.stringify({
        projectType, selectedFeatures, quality, timeline, support, currency
      }));
    }
  }, [projectType, selectedFeatures, quality, timeline, support, currency, mounted]);

  // Fetch exchange rates
  useEffect(() => {
    const fetchRates = async () => {
      setIsLoadingRates(true);
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/INR");
        const data = await res.json();
        if (data && data.rates) {
          setExchangeRates(data.rates);
          
          // Auto-detect currency based on locale if not already set by user
          if (!localStorage.getItem("devmind_estimator")) {
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
            if (tz.includes("America")) setCurrency("USD");
            else if (tz.includes("Europe/London")) setCurrency("GBP");
            else if (tz.includes("Europe")) setCurrency("EUR");
            else if (tz.includes("Australia")) setCurrency("AUD");
          }
        }
      } catch (error) {
        console.error("Failed to fetch rates:", error);
      } finally {
        setIsLoadingRates(false);
      }
    };
    fetchRates();
  }, []);

  // Handle project type change (reset features)
  const handleTypeChange = (type: ProjectType) => {
    setProjectType(type);
    setSelectedFeatures([]);
  };

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  // Calculations (in INR base)
  const calculation = useMemo(() => {
    const basePrice = PROJECT_TYPES[projectType].basePrice;
    
    const availableFeatures = FEATURES_BY_TYPE[projectType];
    const featuresPrice = selectedFeatures.reduce((total, id) => {
      const f = availableFeatures.find(feat => feat.id === id);
      return total + (f ? f.price : 0);
    }, 0);

    const subtotal = basePrice + featuresPrice;
    
    const qMult = MULTIPLIERS.quality[quality];
    const tMult = MULTIPLIERS.timeline[timeline];
    const sMult = MULTIPLIERS.support[support];
    
    const finalPrice = subtotal * qMult * tMult * sMult;
    
    // Convert to selected currency
    const rate = exchangeRates[currency] || 1;
    const convertedFinal = finalPrice * rate;
    
    // Determine range
    const lowerBound = convertedFinal * 0.9;
    const upperBound = convertedFinal * 1.2;

    return {
      basePrice: basePrice * rate,
      featuresPrice: featuresPrice * rate,
      qualityMult: qMult,
      timelineMult: tMult,
      supportMult: sMult,
      total: convertedFinal,
      lowerBound,
      upperBound,
      rate
    };
  }, [projectType, selectedFeatures, quality, timeline, support, currency, exchangeRates]);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0
    }).format(val);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#030712] pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Project Configurator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Build your custom software solution. Select your requirements below to instantly generate a tailored estimate.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Main Configurator Area */}
          <div className="w-full lg:w-2/3 space-y-12">
            
            {/* Step 1: Project Type */}
            <section>
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">1. Select Project Type</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(Object.keys(PROJECT_TYPES) as ProjectType[]).map(type => {
                  const data = PROJECT_TYPES[type];
                  const Icon = data.icon;
                  const isSelected = projectType === type;
                  return (
                    <button
                      key={type}
                      onClick={() => handleTypeChange(type)}
                      className={`relative p-6 rounded-2xl border-2 text-left transition-all ${
                        isSelected 
                          ? "border-blue-600 bg-blue-50 dark:bg-blue-500/10 shadow-md shadow-blue-500/20" 
                          : "border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0f1e] hover:border-blue-300 dark:hover:border-blue-800"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <Icon className={`w-8 h-8 mb-4 ${isSelected ? "text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"}`} />
                      <div className={`font-semibold ${isSelected ? "text-blue-900 dark:text-blue-100" : "text-gray-900 dark:text-white"}`}>
                        {data.label}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Step 2: Features */}
            <section>
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">2. Add Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FEATURES_BY_TYPE[projectType].map(feature => {
                  const Icon = feature.icon;
                  const isSelected = selectedFeatures.includes(feature.id);
                  return (
                    <button
                      key={feature.id}
                      onClick={() => toggleFeature(feature.id)}
                      className={`flex items-center p-4 rounded-xl border transition-all ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/50 dark:bg-blue-500/10 text-blue-900 dark:text-blue-100"
                          : "border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0f1e] text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700"
                      }`}
                    >
                      <div className={`w-6 h-6 rounded border flex items-center justify-center mr-4 shrink-0 transition-colors ${
                        isSelected ? "bg-blue-600 border-blue-600" : "border-gray-300 dark:border-gray-600"
                      }`}>
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </div>
                      <Icon className="w-5 h-5 mr-3 opacity-70 shrink-0" />
                      <span className="font-medium flex-1 text-left">{feature.label}</span>
                      <span className="text-sm opacity-60 shrink-0">+{formatPrice(feature.price * calculation.rate)}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Step 3: Design Quality */}
            <section>
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">3. Design & Architecture Quality</h2>
              <div className="flex bg-gray-100 dark:bg-gray-800/50 rounded-xl p-1 relative overflow-hidden">
                <div 
                  className="absolute inset-y-1 bg-white dark:bg-gray-700 rounded-lg shadow transition-all duration-300 ease-out"
                  style={{
                    width: 'calc(33.333% - 4px)',
                    left: quality === 'basic' ? '4px' : quality === 'standard' ? 'calc(33.333% + 2px)' : 'calc(66.666%)'
                  }}
                />
                {(['basic', 'standard', 'premium'] as QualityTier[]).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setQuality(tier)}
                    className={`flex-1 py-3 text-sm font-medium z-10 transition-colors ${
                      quality === tier ? "text-gray-900 dark:text-white" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    }`}
                  >
                    <div className="capitalize">{tier}</div>
                    <div className="text-xs opacity-60 font-normal mt-0.5">
                      {tier === 'basic' ? 'Template-based' : tier === 'standard' ? 'Custom Design' : 'World-Class UI/UX'}
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Step 4: Timeline */}
            <section>
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">4. Desired Timeline</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(['flexible', 'standard', 'rush'] as Timeline[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeline(t)}
                    className={`p-4 rounded-xl border text-center transition-all ${
                      timeline === t 
                        ? "border-blue-600 bg-blue-50/50 dark:bg-blue-500/10 text-blue-900 dark:text-blue-100" 
                        : "border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0a0f1e] text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <div className="font-semibold capitalize mb-1">{t}</div>
                    <div className="text-sm opacity-60">
                      {t === 'flexible' ? '> 3 Months' : t === 'standard' ? '1-3 Months' : '< 1 Month'}
                    </div>
                  </button>
                ))}
              </div>
            </section>

          </div>

          {/* Sticky Live Price Panel */}
          <div className="w-full lg:w-1/3 sticky top-24">
            <div className="glass-card-light dark:glass-card rounded-3xl p-6 md:p-8 shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden relative">
              {/* Background gradient blur */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white">Estimate Summary</h3>
                <div className="flex items-center gap-2">
                  {isLoadingRates && <RefreshCw className="w-4 h-4 animate-spin text-gray-400" />}
                  <select 
                    value={currency} 
                    onChange={(e) => setCurrency(e.target.value)}
                    className="bg-transparent border-none text-sm font-medium text-gray-600 dark:text-gray-400 focus:ring-0 cursor-pointer outline-none"
                  >
                    {CURRENCIES.map(c => <option key={c} value={c} className="bg-white dark:bg-gray-900">{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">{PROJECT_TYPES[projectType].label} Base</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatPrice(calculation.basePrice)}</span>
                </div>
                {selectedFeatures.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Features ({selectedFeatures.length})</span>
                    <span className="font-medium text-gray-900 dark:text-white">{formatPrice(calculation.featuresPrice)}</span>
                  </div>
                )}
                {calculation.qualityMult !== 1 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Quality: {quality}</span>
                    <span className="font-medium text-gray-900 dark:text-white">x{calculation.qualityMult}</span>
                  </div>
                )}
                {calculation.timelineMult !== 1 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Timeline: {timeline}</span>
                    <span className="font-medium text-gray-900 dark:text-white">x{calculation.timelineMult}</span>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-gray-200 dark:border-gray-800 mb-8">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Estimated Range</div>
                <div className="text-3xl font-heading font-bold text-gray-900 dark:text-white tracking-tight">
                  {formatPrice(calculation.lowerBound)} <span className="text-gray-400 font-normal mx-1">-</span> {formatPrice(calculation.upperBound)}
                </div>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-xs font-medium border border-green-200 dark:border-green-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Price is negotiable based on scope
                </div>
              </div>

              <Link 
                href={`/contact?estimate=${Math.round(calculation.total)}&currency=${currency}`}
                className="w-full btn-glow bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group"
                onClick={() => {
                  fetch('/api/estimator', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ config: { projectType, selectedFeatures, quality, timeline, support }, estimated_price: calculation.total, currency })
                  }).catch(console.error);
                }}
              >
                Request Official Quote <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
