"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Globe, Mail, Phone, MapPin, Share2, Shield, Info, MessageSquare, Tag } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function AdminSettings() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [settings, setSettings] = useState({
    owner_name: "DevMind Studio",
    company_tagline: "Premium software for teams that need more than a template.",
    email: "hello@devmindstudio.com",
    phone: "+91 79 4892 1188",
    address: "Prahladnagar Corporate Road, Ahmedabad, Gujarat 380015, India",
    city: "Ahmedabad",
    social_links: {
      github: "https://github.com/devmindstudio",
      linkedin: "https://linkedin.com/company/devmindstudio",
      twitter: "https://twitter.com/devmindstudio",
      instagram: "https://instagram.com/devmindstudio"
    },
    chatbot_system_prompt: "You are DevMind Studio's AI assistant. You help potential clients understand our services, estimate project costs, and get in touch with our team. Always be professional, friendly, and helpful.",
    default_currency: "INR",
    google_analytics_id: ""
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    if (!isSupabaseConfigured()) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*');
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        const settingsObj: any = { ...settings };
        data.forEach(item => {
          settingsObj[item.key] = item.value;
        });
        setSettings(settingsObj);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!isSupabaseConfigured()) {
      toast.error("Demo Mode: Cannot save settings to database.");
      return;
    }

    setIsSaving(true);
    try {
      const promises = Object.entries(settings).map(([key, value]) => {
        return supabase.from('settings').upsert({
          key,
          value
        }, { onConflict: 'key' });
      });

      const results = await Promise.all(promises);
      const errors = results.filter(r => r.error);
      
      if (errors.length > 0) throw errors[0].error;
      
      toast.success("Settings saved successfully");
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-12 flex justify-center items-center h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-1">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400">Configure global site parameters, AI prompt, and contact information.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-xl shadow-blue-600/20 active:scale-95"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isSaving ? "Saving..." : "Save All Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* General Info */}
        <div className="bg-white dark:bg-[#111827] rounded-3xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
              <Tag className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">General Info</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Company Name</label>
              <input 
                type="text" 
                value={settings.owner_name} 
                onChange={e => setSettings({...settings, owner_name: e.target.value})}
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Company Tagline</label>
              <textarea 
                rows={2} 
                value={settings.company_tagline} 
                onChange={e => setSettings({...settings, company_tagline: e.target.value})}
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Currency Display</label>
              <select 
                value={settings.default_currency}
                onChange={e => setSettings({...settings, default_currency: e.target.value})}
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white dark:bg-[#111827] rounded-3xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
              <Mail className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">Contact Info</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
              <input 
                type="email" 
                value={settings.email} 
                onChange={e => setSettings({...settings, email: e.target.value})}
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Phone Number</label>
              <input 
                type="text" 
                value={settings.phone} 
                onChange={e => setSettings({...settings, phone: e.target.value})}
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Office Address</label>
              <textarea 
                rows={2} 
                value={settings.address} 
                onChange={e => setSettings({...settings, address: e.target.value})}
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
          </div>
        </div>

        {/* AI Configuration */}
        <div className="bg-white dark:bg-[#111827] rounded-3xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">Chatbot Intelligence</h2>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">System Prompt</label>
            <textarea 
              rows={5} 
              value={settings.chatbot_system_prompt} 
              onChange={e => setSettings({...settings, chatbot_system_prompt: e.target.value})}
              placeholder="Inject context here..."
              className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-mono" 
            />
            <p className="mt-3 text-xs text-gray-500 leading-relaxed">
              This prompt defines how the AI behaves. You can include details about pricing, process, and core values here.
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white dark:bg-[#111827] rounded-3xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
              <Share2 className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">Social Links</h2>
          </div>
          
          <div className="space-y-4">
            {Object.keys(settings.social_links).map((platform) => (
              <div key={platform}>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 capitalize">{platform}</label>
                <input 
                  type="text" 
                  value={(settings.social_links as any)[platform]} 
                  onChange={e => setSettings({
                    ...settings, 
                    social_links: { ...settings.social_links, [platform]: e.target.value }
                  })}
                  className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Analytics & SEO */}
        <div className="bg-white dark:bg-[#111827] rounded-3xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
              <Globe className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">Analytics</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Google Analytics ID</label>
              <input 
                type="text" 
                value={settings.google_analytics_id} 
                onChange={e => setSettings({...settings, google_analytics_id: e.target.value})}
                placeholder="G-XXXXXXXXXX"
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div className="pt-4">
              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-800/50">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed">
                  Analytics IDs are used to track visitor behavior and generate dashboard reports.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
