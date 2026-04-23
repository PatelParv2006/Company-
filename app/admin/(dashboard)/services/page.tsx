"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, X, Loader2, Zap } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function AdminServices() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingService, setEditingService] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    timeline: "",
    deliverables: "",
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setIsLoading(true);
    if (!isSupabaseConfigured()) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      setServicesList(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error("Failed to load services");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (service: any = null) => {
    if (service) {
      setEditingService(service);
      setFormData({
        title: service.title || "",
        description: service.description || "",
        timeline: service.timeline || "",
        deliverables: Array.isArray(service.deliverables) ? service.deliverables.join(", ") : "",
      });
    } else {
      setEditingService(null);
      setFormData({
        title: "",
        description: "",
        timeline: "",
        deliverables: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!isSupabaseConfigured()) {
      toast.error("Supabase not configured.");
      return;
    }

    const loadToast = toast.loading("Saving service...");
    try {
      const payload = {
        ...formData,
        deliverables: formData.deliverables.split(',').map(s => s.trim()).filter(Boolean),
      };

      if (editingService?.id) {
        const { error } = await supabase
          .from('services')
          .update(payload)
          .eq('id', editingService.id);
        if (error) throw error;
        toast.success("Service updated", { id: loadToast });
      } else {
        const { error } = await supabase
          .from('services')
          .insert([payload]);
        if (error) throw error;
        toast.success("Service created", { id: loadToast });
      }
      fetchServices();
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(`Error: ${error.message}`, { id: loadToast });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      const loadToast = toast.loading("Deleting...");
      try {
        const { error } = await supabase.from('services').delete().eq('id', id);
        if (error) throw error;
        toast.success("Service deleted", { id: loadToast });
        fetchServices();
      } catch (error: any) {
        toast.error(error.message, { id: loadToast });
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">Services</h1>
          <p className="text-gray-500 dark:text-gray-400">Define what you offer to clients.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      <div className="grid gap-6">
        {isLoading ? (
          <div className="py-20 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
        ) : servicesList.length === 0 ? (
          <div className="py-20 text-center text-gray-500 border border-dashed border-gray-300 dark:border-gray-800 rounded-3xl">No services found. Add your first service above.</div>
        ) : (
          servicesList.map((service) => (
            <div key={service.id} className="bg-white dark:bg-[#111827] rounded-3xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col md:flex-row justify-between items-start gap-6 hover:border-blue-500/30 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{service.title}</h3>
                  <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-500">{service.timeline}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.deliverables?.map((d: string) => (
                    <span key={d} className="text-[10px] uppercase tracking-wider font-bold bg-gray-50 dark:bg-gray-800 text-gray-500 px-2 py-1 rounded">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleOpenModal(service)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors">
                  <Edit2 className="w-5 h-5" />
                </button>
                <button onClick={() => handleDelete(service.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl w-full max-w-xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-[#0f131d]">
              <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">{editingService ? "Edit Service" : "Add Service"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Service Title</label>
                <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. SaaS Development" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="What does this service entail?" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Timeline</label>
                  <input type="text" value={formData.timeline} onChange={e => setFormData({...formData, timeline: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. 4-8 weeks" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Deliverables (comma separated)</label>
                  <input type="text" value={formData.deliverables} onChange={e => setFormData({...formData, deliverables: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="UI, Frontend, API" />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0f131d] flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-sm font-medium text-gray-500">Cancel</button>
              <button onClick={handleSave} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors">Save Service</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
