"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, BrainCircuit, BriefcaseBusiness, Building2, Globe, Loader2, ShoppingBag, Smartphone, Sparkles, Zap } from "lucide-react";
import toast from "react-hot-toast";

type CurrencyCode = "INR" | "USD" | "EUR" | "GBP";
type ProjectTypeKey =
  | "static-website"
  | "dynamic-web-app"
  | "e-commerce"
  | "saas-platform"
  | "mobile-app"
  | "ai-ml-solution"
  | "enterprise-software";
type DesignQualityKey = "basic" | "standard" | "premium";
type TimelineKey = "flexible" | "standard" | "urgent";
type SupportKey = "none" | "three-months" | "six-months" | "one-year";

type EstimatorPageClientProps = {
  defaultCurrency: CurrencyCode;
};

type FeatureConfig = {
  label: string;
  price: number;
  weekImpact: number;
};

const STORAGE_KEY = "devmind_estimator_v3";
const currencySymbols: Record<CurrencyCode, string> = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

const projectTypes: Record<
  ProjectTypeKey,
  {
    label: string;
    basePrice: number;
    timelineWeeks: [number, number];
    icon: typeof Globe;
  }
> = {
  "static-website": {
    label: "Static Website",
    basePrice: 1800,
    timelineWeeks: [2, 4],
    icon: Globe,
  },
  "dynamic-web-app": {
    label: "Dynamic Web App",
    basePrice: 6500,
    timelineWeeks: [5, 8],
    icon: Sparkles,
  },
  "e-commerce": {
    label: "E-Commerce",
    basePrice: 8400,
    timelineWeeks: [6, 10],
    icon: ShoppingBag,
  },
  "saas-platform": {
    label: "SaaS Platform",
    basePrice: 14000,
    timelineWeeks: [10, 16],
    icon: BrainCircuit,
  },
  "mobile-app": {
    label: "Mobile App",
    basePrice: 9800,
    timelineWeeks: [8, 14],
    icon: Smartphone,
  },
  "ai-ml-solution": {
    label: "AI/ML Solution",
    basePrice: 12000,
    timelineWeeks: [8, 14],
    icon: Zap,
  },
  "enterprise-software": {
    label: "Enterprise Software",
    basePrice: 17500,
    timelineWeeks: [12, 20],
    icon: Building2,
  },
};

const featuresByProjectType: Record<ProjectTypeKey, FeatureConfig[]> = {
  "static-website": [
    { label: "Custom Design", price: 450, weekImpact: 0.5 },
    { label: "SEO", price: 400, weekImpact: 0.5 },
    { label: "Contact Form", price: 250, weekImpact: 0.25 },
    { label: "Blog", price: 600, weekImpact: 0.5 },
    { label: "CMS", price: 900, weekImpact: 1 },
  ],
  "dynamic-web-app": [
    { label: "Auth System", price: 900, weekImpact: 1 },
    { label: "Database", price: 1100, weekImpact: 1 },
    { label: "REST API", price: 1400, weekImpact: 1.5 },
    { label: "Dashboard", price: 1200, weekImpact: 1 },
    { label: "File Upload", price: 650, weekImpact: 0.75 },
  ],
  "e-commerce": [
    { label: "Product Catalog", price: 1200, weekImpact: 1 },
    { label: "Payment Gateway", price: 1450, weekImpact: 1 },
    { label: "Inventory", price: 1250, weekImpact: 1 },
    { label: "Coupons", price: 550, weekImpact: 0.5 },
    { label: "Order Tracking", price: 800, weekImpact: 0.75 },
  ],
  "saas-platform": [
    { label: "Multi-Tenancy", price: 2800, weekImpact: 2 },
    { label: "Stripe Billing", price: 1800, weekImpact: 1.25 },
    { label: "Admin Panel", price: 1700, weekImpact: 1 },
    { label: "Role-Based Access", price: 1300, weekImpact: 1 },
    { label: "Analytics", price: 1600, weekImpact: 1.25 },
    { label: "AI Integration", price: 2400, weekImpact: 1.5 },
    { label: "API Development", price: 2200, weekImpact: 1.5 },
  ],
  "mobile-app": [
    { label: "Push Notifications", price: 750, weekImpact: 0.75 },
    { label: "Offline Mode", price: 1600, weekImpact: 1.25 },
    { label: "Biometric Auth", price: 850, weekImpact: 0.75 },
    { label: "Maps", price: 900, weekImpact: 0.75 },
    { label: "Camera", price: 950, weekImpact: 0.75 },
  ],
  "ai-ml-solution": [
    { label: "Model Training", price: 3000, weekImpact: 2 },
    { label: "LLM Integration", price: 2200, weekImpact: 1.5 },
    { label: "Data Pipeline", price: 2400, weekImpact: 1.75 },
    { label: "API Wrapper", price: 1300, weekImpact: 1 },
  ],
  "enterprise-software": [
    { label: "ERP Integration", price: 3200, weekImpact: 2 },
    { label: "Custom Reporting", price: 1700, weekImpact: 1.25 },
    { label: "SSO", price: 1600, weekImpact: 1 },
    { label: "Audit Logs", price: 1200, weekImpact: 1 },
    { label: "SLA Support", price: 2200, weekImpact: 1.25 },
  ],
};

const designQualityOptions: Record<
  DesignQualityKey,
  { label: string; multiplier: number; description: string }
> = {
  basic: { label: "Basic (Template)", multiplier: 1, description: "A fast, practical launch option." },
  standard: { label: "Standard (Custom)", multiplier: 1.18, description: "Custom UI tailored to your product." },
  premium: {
    label: "Premium (Pixel-perfect + Animations)",
    multiplier: 1.35,
    description: "High-end polish, motion, and interface refinement.",
  },
};

const timelineOptions: Record<
  TimelineKey,
  { label: string; multiplier: number; weekMultiplier: number }
> = {
  flexible: { label: "Flexible (Best Price)", multiplier: 0.95, weekMultiplier: 1.15 },
  standard: { label: "Standard (4–8 Weeks)", multiplier: 1, weekMultiplier: 1 },
  urgent: { label: "Urgent (Rush Delivery +30%)", multiplier: 1.3, weekMultiplier: 0.8 },
};

const supportOptions: Record<
  SupportKey,
  { label: string; addOn: number; description: string }
> = {
  none: { label: "None", addOn: 0, description: "Project handoff after delivery." },
  "three-months": { label: "3 Months", addOn: 600, description: "Post-launch fixes and guidance." },
  "six-months": { label: "6 Months", addOn: 1200, description: "Extended product support." },
  "one-year": { label: "1 Year 24/7", addOn: 2600, description: "Priority long-term support coverage." },
};

function detectCurrency(defaultCurrency: CurrencyCode): CurrencyCode {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (timezone.includes("Kolkata")) return "INR";
  if (timezone.includes("London")) return "GBP";
  if (timezone.includes("Europe")) return "EUR";
  if (timezone.includes("America")) return "USD";
  return defaultCurrency;
}

function formatCurrency(amount: number, currency: CurrencyCode) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function EstimatorPageClient({
  defaultCurrency,
}: EstimatorPageClientProps) {
  const initialState = useMemo(() => {
    if (typeof window === "undefined") {
      return null;
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return null;
    }

    try {
      return JSON.parse(saved) as {
        projectType?: ProjectTypeKey;
        selectedFeatures?: string[];
        designQuality?: DesignQualityKey;
        timeline?: TimelineKey;
        support?: SupportKey;
        currency?: CurrencyCode;
        lead?: { name: string; email: string };
      };
    } catch {
      return null;
    }
  }, []);

  const [projectType, setProjectType] = useState<ProjectTypeKey>(
    initialState?.projectType || "dynamic-web-app"
  );
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(
    initialState?.selectedFeatures || []
  );
  const [designQuality, setDesignQuality] = useState<DesignQualityKey>(
    initialState?.designQuality || "standard"
  );
  const [timeline, setTimeline] = useState<TimelineKey>(
    initialState?.timeline || "standard"
  );
  const [support, setSupport] = useState<SupportKey>(
    initialState?.support || "three-months"
  );
  const [currency, setCurrency] = useState<CurrencyCode>(
    initialState?.currency || defaultCurrency
  );
  const [rates, setRates] = useState<Record<string, number>>({ USD: 1 });
  const [rateLoading, setRateLoading] = useState(true);
  const [lead, setLead] = useState(initialState?.lead || { name: "", email: "" });
  const [saving, setSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, 5));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  useEffect(() => {
    if (!initialState) {
      setCurrency(detectCurrency(defaultCurrency));
    }
  }, [defaultCurrency, initialState]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        projectType,
        selectedFeatures,
        designQuality,
        timeline,
        support,
        currency,
        lead,
      })
    );
  }, [currency, designQuality, lead, projectType, selectedFeatures, support, timeline]);

  useEffect(() => {
    void fetch("https://open.er-api.com/v6/latest/USD")
      .then((response) => response.json())
      .then((data: { rates?: Record<string, number> }) => {
        if (data.rates) {
          setRates(data.rates);
        }
      })
      .catch(() => undefined)
      .finally(() => setRateLoading(false));
  }, []);

  const availableFeatures = featuresByProjectType[projectType];

  const estimate = useMemo(() => {
    const typeConfig = projectTypes[projectType];
    const selectedFeatureConfigs = availableFeatures.filter((feature) =>
      selectedFeatures.includes(feature.label)
    );
    const featuresCost = selectedFeatureConfigs.reduce(
      (total, feature) => total + feature.price,
      0
    );
    const featureWeeks = selectedFeatureConfigs.reduce(
      (total, feature) => total + feature.weekImpact,
      0
    );

    const designMultiplier = designQualityOptions[designQuality].multiplier;
    const timelineMultiplier = timelineOptions[timeline].multiplier;
    const supportCost = supportOptions[support].addOn;

    const subtotal = (typeConfig.basePrice + featuresCost) * designMultiplier * timelineMultiplier;
    const minUsd = subtotal + supportCost;
    const maxUsd = minUsd * 1.22;

    const rate = rates[currency] || 1;
    const min = minUsd * rate;
    const max = maxUsd * rate;

    const baseWeeks = typeConfig.timelineWeeks;
    const weeksMin = Math.max(
      2,
      Math.round((baseWeeks[0] + featureWeeks * 0.4) * timelineOptions[timeline].weekMultiplier)
    );
    const weeksMax = Math.max(
      weeksMin + 1,
      Math.round((baseWeeks[1] + featureWeeks * 0.7) * timelineOptions[timeline].weekMultiplier)
    );

    return {
      breakdown: [
        { label: projectTypes[projectType].label, value: typeConfig.basePrice * rate },
        ...selectedFeatureConfigs.map((feature) => ({
          label: feature.label,
          value: feature.price * rate,
        })),
        {
          label: designQualityOptions[designQuality].label,
          value: (subtotal - (typeConfig.basePrice + featuresCost) * timelineMultiplier) * rate,
        },
        {
          label: supportOptions[support].label,
          value: supportCost * rate,
        },
      ],
      min,
      max,
      weeksMin,
      weeksMax,
    };
  }, [availableFeatures, currency, designQuality, projectType, rates, selectedFeatures, support, timeline]);

  const prefilledContactMessage = useMemo(() => {
    const featureText = selectedFeatures.length ? selectedFeatures.join(", ") : "No extra features selected";

    return [
      "Hi DevMind Studio,",
      "",
      `I used the estimator and I’d like a custom quote for a ${projectTypes[projectType].label}.`,
      `Selected features: ${featureText}.`,
      `Design quality: ${designQualityOptions[designQuality].label}.`,
      `Timeline: ${timelineOptions[timeline].label}.`,
      `Support plan: ${supportOptions[support].label}.`,
      `Estimated range: ${formatCurrency(estimate.min, currency)} - ${formatCurrency(estimate.max, currency)}.`,
      "",
      "Please get in touch to discuss the final proposal.",
    ].join("\n");
  }, [currency, designQuality, estimate.max, estimate.min, projectType, selectedFeatures, support, timeline]);

  async function submitEstimate() {
    setSaving(true);

    try {
      const response = await fetch("/api/estimator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: lead.name,
          email: lead.email,
          projectType: projectTypes[projectType].label,
          features: selectedFeatures,
          designQuality: designQualityOptions[designQuality].label,
          timeline: timelineOptions[timeline].label,
          support: supportOptions[support].label,
          estimatedMin: Math.round(estimate.min),
          estimatedMax: Math.round(estimate.max),
          currency,
        }),
      });

      if (!response.ok) {
        toast.error("Unable to save your estimate right now.");
        return;
      }

      toast.success("Estimate saved successfully.");
    } catch {
      toast.error("Unable to save your estimate right now.");
    } finally {
      setSaving(false);
    }
  }

  function toggleFeature(label: string) {
    setSelectedFeatures((current) =>
      current.includes(label)
        ? current.filter((feature) => feature !== label)
        : [...current, label]
    );
  }

  const compactSummary = (
    <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-300">Estimated Range</p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-white">
            {formatCurrency(estimate.min, currency)} - {formatCurrency(estimate.max, currency)}
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Estimated Timeline: {estimate.weeksMin}-{estimate.weeksMax} weeks
          </p>
        </div>
        {rateLoading && <Loader2 className="h-5 w-5 animate-spin text-blue-300" />}
      </div>
      <div className="mt-4 rounded-2xl border border-blue-400/20 bg-blue-500/10 px-4 py-3 text-sm text-blue-100">
        💬 Price is negotiable — final quote after discussion
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-28 text-white">
      <div className="mx-auto max-w-7xl px-4 pb-36 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">Estimator</p>
            <h1 className="mt-4 font-heading text-5xl font-bold md:text-6xl">
              Configure the build you actually need.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              Move through the five steps below and get a live estimate that updates with every decision.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl">
            <div className="flex gap-2">
              {(Object.keys(currencySymbols) as CurrencyCode[]).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setCurrency(code)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    currency === code
                      ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white"
                      : "text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {currencySymbols[code]} {code}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 flex items-center justify-center">
          <div className="flex w-full max-w-2xl items-center justify-between px-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-500 ${
                    step === currentStep ? "border-blue-500 bg-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]" : 
                    step < currentStep ? "border-blue-500/50 bg-blue-500/10 text-blue-400/70" : "border-white/10 bg-white/5 text-slate-500"
                  }`}
                >
                  <span className="text-sm font-bold">{step}</span>
                </div>
                <span className={`mt-2 text-[10px] font-bold uppercase tracking-widest ${step === currentStep ? 'text-blue-400' : 'text-slate-500'}`}>
                  {step === 1 ? "Project" : step === 2 ? "Features" : step === 3 ? "Design" : step === 4 ? "Timeline" : "Support"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            {currentStep === 1 && (
              <section className="rounded-[1.8rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">Step 1</p>
                <h2 className="mt-3 font-heading text-3xl font-bold text-white">Project Type</h2>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {(Object.entries(projectTypes) as [ProjectTypeKey, (typeof projectTypes)[ProjectTypeKey]][]).map(
                    ([key, config]) => {
                      const Icon = config.icon;
                      const active = key === projectType;

                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => {
                            setProjectType(key);
                            setSelectedFeatures([]);
                          }}
                          className={`rounded-[1.5rem] border p-6 text-left transition ${
                            active
                              ? "border-blue-400/40 bg-blue-500/10 ring-2 ring-blue-500/20"
                              : "border-white/10 bg-[#0d1120]/50 hover:border-blue-400/30"
                          }`}
                        >
                          <div className="inline-flex rounded-2xl bg-white/10 p-3 text-blue-200">
                            <Icon className="h-6 w-6" />
                          </div>
                          <h3 className="mt-5 font-heading text-xl font-bold text-white">{config.label}</h3>
                          <p className="mt-2 text-sm text-slate-400">
                            Starts around {formatCurrency(config.basePrice * (rates[currency] || 1), currency)}
                          </p>
                        </button>
                      );
                    }
                  )}
                </div>
                <div className="mt-10 flex justify-end">
                  <button onClick={nextStep} className="btn-glow flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white transition hover:bg-blue-700">
                    Next: Features <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </section>
            )}

            {currentStep === 2 && (
              <section className="rounded-[1.8rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">Step 2</p>
                <h2 className="mt-3 font-heading text-3xl font-bold text-white">Features</h2>
                <p className="mt-2 text-slate-400">Select the building blocks for your {projectTypes[projectType].label}.</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {availableFeatures.map((feature) => {
                    const active = selectedFeatures.includes(feature.label);

                    return (
                      <button
                        key={feature.label}
                        type="button"
                        onClick={() => toggleFeature(feature.label)}
                        className={`flex items-center justify-between rounded-2xl border p-5 text-left transition ${
                          active
                            ? "border-blue-400/40 bg-blue-500/10 ring-2 ring-blue-500/20"
                            : "border-white/10 bg-[#0d1120]/50 text-slate-300 hover:border-blue-400/30"
                        }`}
                      >
                        <span className="font-semibold">{feature.label}</span>
                        <span className="text-xs text-blue-400">+{formatCurrency(feature.price * (rates[currency] || 1), currency)}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-10 flex justify-between items-center">
                  <button onClick={prevStep} className="text-slate-400 hover:text-white font-semibold transition flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 rotate-180" /> Back
                  </button>
                  <button onClick={nextStep} className="btn-glow flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white transition hover:bg-blue-700">
                    Next: Design <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </section>
            )}

            {currentStep === 3 && (
              <section className="rounded-[1.8rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">Step 3</p>
                <h2 className="mt-3 font-heading text-3xl font-bold text-white">Design Quality</h2>
                <div className="mt-8 grid gap-4">
                  {(Object.entries(designQualityOptions) as [DesignQualityKey, (typeof designQualityOptions)[DesignQualityKey]][]).map(
                    ([key, option]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setDesignQuality(key)}
                        className={`rounded-[1.5rem] border p-6 text-left transition flex items-start gap-5 ${
                          key === designQuality
                            ? "border-blue-400/40 bg-blue-500/10 ring-2 ring-blue-500/20"
                            : "border-white/10 bg-[#0d1120]/50 hover:border-blue-400/30"
                        }`}
                      >
                        <div className={`mt-1 h-5 w-5 rounded-full border-2 flex items-center justify-center transition ${key === designQuality ? 'border-blue-500' : 'border-white/10'}`}>
                          {key === designQuality && <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />}
                        </div>
                        <div>
                          <h3 className="font-heading text-xl font-bold text-white">{option.label}</h3>
                          <p className="mt-2 text-sm leading-7 text-slate-400">{option.description}</p>
                        </div>
                      </button>
                    )
                  )}
                </div>
                <div className="mt-10 flex justify-between items-center">
                  <button onClick={prevStep} className="text-slate-400 hover:text-white font-semibold transition flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 rotate-180" /> Back
                  </button>
                  <button onClick={nextStep} className="btn-glow flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white transition hover:bg-blue-700">
                    Next: Timeline <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </section>
            )}

            {currentStep === 4 && (
              <section className="rounded-[1.8rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">Step 4</p>
                <h2 className="mt-3 font-heading text-3xl font-bold text-white">Timeline</h2>
                <div className="mt-8 grid gap-4">
                  {(Object.entries(timelineOptions) as [TimelineKey, (typeof timelineOptions)[TimelineKey]][]).map(
                    ([key, option]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setTimeline(key)}
                        className={`rounded-[1.5rem] border p-6 text-left transition flex items-center justify-between ${
                          key === timeline
                            ? "border-blue-400/40 bg-blue-500/10 ring-2 ring-blue-500/20"
                            : "border-white/10 bg-[#0d1120]/50 hover:border-blue-400/30"
                        }`}
                      >
                        <h3 className="font-heading text-xl font-bold text-white">{option.label}</h3>
                        <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition ${key === timeline ? 'border-blue-500' : 'border-white/10'}`}>
                          {key === timeline && <div className="h-3 w-3 rounded-full bg-blue-500" />}
                        </div>
                      </button>
                    )
                  )}
                </div>
                <div className="mt-10 flex justify-between items-center">
                  <button onClick={prevStep} className="text-slate-400 hover:text-white font-semibold transition flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 rotate-180" /> Back
                  </button>
                  <button onClick={nextStep} className="btn-glow flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white transition hover:bg-blue-700">
                    Next: Support <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </section>
            )}

            {currentStep === 5 && (
              <section className="rounded-[1.8rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">Step 5</p>
                <h2 className="mt-3 font-heading text-3xl font-bold text-white">Support Plan</h2>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {(Object.entries(supportOptions) as [SupportKey, (typeof supportOptions)[SupportKey]][]).map(
                    ([key, option]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSupport(key)}
                        className={`rounded-[1.5rem] border p-6 text-left transition ${
                          key === support
                            ? "border-blue-400/40 bg-blue-500/10 ring-2 ring-blue-500/20"
                            : "border-white/10 bg-[#0d1120]/50 hover:border-blue-400/30"
                        }`}
                      >
                        <h3 className="font-heading text-xl font-bold text-white">{option.label}</h3>
                        <p className="mt-3 text-sm leading-7 text-slate-400">{option.description}</p>
                      </button>
                    )
                  )}
                </div>
                <div className="mt-10 flex justify-between items-center">
                  <button onClick={prevStep} className="text-slate-400 hover:text-white font-semibold transition flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 rotate-180" /> Back
                  </button>
                  <div className="text-sm text-slate-500 italic">Scroll down to see final quote</div>
                </div>
              </section>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="hidden lg:block">{compactSummary}</div>

            <div className="mt-4 rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h2 className="font-heading text-2xl font-bold text-white">Live Price Breakdown</h2>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                {estimate.breakdown.map((item) => (
                  <li key={item.label} className="flex items-center justify-between gap-4">
                    <span>{item.label}</span>
                    <span className="font-semibold text-white">
                      {formatCurrency(Math.max(item.value, 0), currency)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-2xl border border-blue-400/20 bg-blue-500/10 px-4 py-3 text-sm text-blue-100">
                💬 Price is negotiable — final quote after discussion
              </div>

              <div className="mt-6 grid gap-4">
                <input
                  value={lead.name}
                  onChange={(event) => setLead((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Your name"
                  className="rounded-2xl border border-white/10 bg-[#0d1120] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400/40"
                />
                <input
                  type="email"
                  value={lead.email}
                  onChange={(event) => setLead((current) => ({ ...current, email: event.target.value }))}
                  placeholder="Your email"
                  className="rounded-2xl border border-white/10 bg-[#0d1120] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400/40"
                />
              </div>

              <div className="mt-6 grid gap-3">
                <button
                  type="button"
                  onClick={() => void submitEstimate()}
                  disabled={saving}
                  className="btn-glow inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-4 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <BriefcaseBusiness className="mr-2 h-4 w-4" />
                      Save Estimate
                    </>
                  )}
                </button>
                <Link
                  href={`/contact?projectType=${encodeURIComponent(projectTypes[projectType].label)}&message=${encodeURIComponent(prefilledContactMessage)}`}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-slate-100 transition hover:bg-white/10"
                >
                  Request Custom Quote
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#090b12]/95 p-4 backdrop-blur-xl lg:hidden">
        <div className="mx-auto max-w-7xl">
          {compactSummary}
          <div className="mt-3 grid gap-3">
            <button
              type="button"
              onClick={() => void submitEstimate()}
              disabled={saving}
              className="btn-glow inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-4 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Estimate"}
            </button>
            <Link
              href={`/contact?projectType=${encodeURIComponent(projectTypes[projectType].label)}&message=${encodeURIComponent(prefilledContactMessage)}`}
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-slate-100"
            >
              Request Custom Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
