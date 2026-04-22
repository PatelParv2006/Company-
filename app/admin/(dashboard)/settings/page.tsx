"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Globe, Mail, Phone, MapPin, Share2, Shield, Info } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function AdminSettings() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [settings, setSettings] = useState({
    contact_email: "contact@devmindstudio.com",
    contact_phone: "+91 98765 43210",
    office_address: "Tech Hub, 4th Floor, Silicon Valley, India",
    social_links: {
      linkedin: "https://linkedin.com/company/devmindstudio",
      twitter: "https://twitter.com/devmindstudio",
      github: "https://github.com/devmindstudio",
      instagram: "https://instagram.com/devmindstudio"
    },
    site_metadata: {
      title: "DevMind Studio | Premium Software Agency",
      description: "We build world-class digital products with engineering excellence."
    },
    maintenance_mode: false
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
        .from('site_settings')
        .select('*');
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        const settingsObj: any = {};
        data.forEach(item => {
          settingsObj[item.key] = item.value;
        });
        setSettings(prev => ({ ...prev, ...settingsObj }));
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
        return supabase.from('site_settings').upsert({
          key,
          value,
          updated_at: new Date().toISOString()
        });
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
          <p className="text-gray-500 dark:text-gray-400">Configure global site parameters and contact information.</p>
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
        {/* Contact Information */}
        <div className="bg-white dark:bg-[#111827] rounded-3xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
              <Mail className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">Contact Info</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Public Contact Email</label>
              <input 
                type="email" 
                value={settings.contact_email} 
                onChange={e => setSettings({...settings, contact_email: e.target.value})}
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Phone Number</label>
              <input 
                type="text" 
                value={settings.contact_phone} 
                onChange={e => setSettings({...settings, contact_phone: e.target.value})}
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Office Address</label>
              <textarea 
                rows={2} 
                value={settings.office_address} 
                onChange={e => setSettings({...settings, office_address: e.target.value})}
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white dark:bg-[#111827] rounded-3xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
              <Share2 className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">Social Presence</h2>
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

        {/* SEO & Metadata */}
        <div className="bg-white dark:bg-[#111827] rounded-3xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
              <Globe className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">SEO & Metadata</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Default Page Title</label>
              <input 
                type="text" 
                value={settings.site_metadata.title} 
                onChange={e => setSettings({
                  ...settings, 
                  site_metadata: { ...settings.site_metadata, title: e.target.value }
                })}
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Meta Description</label>
              <textarea 
                rows={3} 
                value={settings.site_metadata.description} 
                onChange={e => setSettings({
                  ...settings, 
                  site_metadata: { ...settings.site_metadata, description: e.target.value }
                })}
                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
          </div>
        </div>

        {/* Security & Maintenance */}
        <div className="bg-white dark:bg-[#111827] rounded-3xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400">
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">Site Operations</h2>
          </div>
          
          <div className="p-6 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-800/50 mb-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-amber-900 dark:text-amber-400 mb-1">Maintenance Mode</h4>
                <p className="text-xs text-amber-700 dark:text-amber-500/80 leading-relaxed">When enabled, visitors will see a maintenance screen. Admin Panel remains accessible.</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 dark:text-amber-400">Enable Maintenance</span>
              <button 
                onClick={() => setSettings({...settings, maintenance_mode: !settings.maintenance_mode})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.maintenance_mode ? 'bg-amber-600' : 'bg-gray-300 dark:bg-gray-700'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.maintenance_mode ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>

          <div className="pt-4">
            <button className="w-full py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors">
              Clear Site Cache
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
