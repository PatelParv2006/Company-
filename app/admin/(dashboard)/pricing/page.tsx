"use client";

import { useState } from "react";
import { Save, CheckCircle2 } from "lucide-react";

export default function AdminPricing() {
  const [showToast, setShowToast] = useState(false);

  const handleSave = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="p-8 relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-1">Pricing Configuration</h1>
          <p className="text-gray-500 dark:text-gray-400">Control all estimator values from here.</p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
        >
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      {showToast && (
        <div className="fixed top-6 right-6 bg-green-500 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-in slide-in-from-top z-50">
          <CheckCircle2 className="w-5 h-5" />
          <span className="text-sm font-medium">Pricing configuration saved successfully.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Base Prices */}
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0f131d]">
            <h2 className="font-heading font-bold text-lg text-gray-900 dark:text-white">Base Project Prices (INR)</h2>
          </div>
          <div className="p-6 space-y-5">
            {[
              { label: "Static Site", val: "15000" },
              { label: "Dynamic Platform", val: "35000" },
              { label: "Web Application", val: "75000" },
              { label: "SaaS Product", val: "150000" }
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</label>
                <div className="relative w-48">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₹</span>
                  <input type="number" defaultValue={item.val} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-lg pl-8 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Multipliers */}
        <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden h-fit">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0f131d]">
            <h2 className="font-heading font-bold text-lg text-gray-900 dark:text-white">Complexity Multipliers</h2>
          </div>
          <div className="p-6 space-y-5">
            {[
              { label: "Basic Complexity", val: "1.0" },
              { label: "Standard Complexity", val: "1.5" },
              { label: "Advanced Complexity", val: "2.5" }
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</label>
                <div className="relative w-32">
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">x</span>
                  <input type="number" step="0.1" defaultValue={item.val} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-lg pl-4 pr-8 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-right" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Costs */}
        <div className="lg:col-span-2 bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0f131d]">
            <h2 className="font-heading font-bold text-lg text-gray-900 dark:text-white">Feature Module Costs (INR)</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "Authentication", val: "10000" },
              { label: "Admin Panel", val: "20000" },
              { label: "Payment Gateway", val: "15000" },
              { label: "Real-time Chat", val: "25000" },
              { label: "RESTful API", val: "20000" },
              { label: "AI Integration", val: "30000" },
              { label: "Multi-language", val: "10000" }
            ].map(item => (
              <div key={item.label}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{item.label}</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₹</span>
                  <input type="number" defaultValue={item.val} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-lg pl-8 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
