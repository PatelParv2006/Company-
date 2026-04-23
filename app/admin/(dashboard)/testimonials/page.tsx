"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, X, Loader2, Quote, Star } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function AdminTestimonials() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testimonialsList, setTestimonialsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    author_name: "",
    author_role: "",
    author_company: "",
    content: "",
    rating: 5,
    author_image_url: "",
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setIsLoading(true);
    if (!isSupabaseConfigured()) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setTestimonialsList(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast.error("Failed to load testimonials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (testimonial: any = null) => {
    if (testimonial) {
      setEditingTestimonial(testimonial);
      setFormData({
        author_name: testimonial.author_name || "",
        author_role: testimonial.author_role || "",
        author_company: testimonial.author_company || "",
        content: testimonial.content || "",
        rating: testimonial.rating || 5,
        author_image_url: testimonial.author_image_url || "",
      });
    } else {
      setEditingTestimonial(null);
      setFormData({
        author_name: "",
        author_role: "",
        author_company: "",
        content: "",
        rating: 5,
        author_image_url: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!isSupabaseConfigured()) {
      toast.error("Supabase not configured.");
      return;
    }

    const loadToast = toast.loading("Saving testimonial...");
    try {
      if (editingTestimonial?.id) {
        const { error } = await supabase
          .from('testimonials')
          .update(formData)
          .eq('id', editingTestimonial.id);
        if (error) throw error;
        toast.success("Testimonial updated", { id: loadToast });
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert([formData]);
        if (error) throw error;
        toast.success("Testimonial created", { id: loadToast });
      }
      fetchTestimonials();
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(`Error: ${error.message}`, { id: loadToast });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      const loadToast = toast.loading("Deleting...");
      try {
        const { error } = await supabase.from('testimonials').delete().eq('id', id);
        if (error) throw error;
        toast.success("Deleted", { id: loadToast });
        fetchTestimonials();
      } catch (error: any) {
        toast.error(error.message, { id: loadToast });
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">Testimonials</h1>
          <p className="text-gray-500 dark:text-gray-400">Social proof and client feedback.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full py-20 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
        ) : testimonialsList.length === 0 ? (
          <div className="col-span-full py-20 text-center text-gray-500">No testimonials yet.</div>
        ) : (
          testimonialsList.map((t) => (
            <div key={t.id} className="bg-white dark:bg-[#111827] rounded-3xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col hover:border-blue-500/30 transition-colors group">
              <div className="flex justify-between items-start mb-4">
                <Quote className="w-8 h-8 text-blue-100 dark:text-blue-900/40" />
                <div className="flex gap-1 text-yellow-400">
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-1 italic leading-relaxed">
                &quot;{t.content}&quot;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                <img src={t.author_image_url || `https://ui-avatars.com/api/?name=${t.author_name}`} alt="" className="w-10 h-10 rounded-full object-cover" />
                <div className="overflow-hidden">
                  <div className="font-bold text-sm text-gray-900 dark:text-white truncate">{t.author_name}</div>
                  <div className="text-[10px] text-gray-500 truncate">{t.author_role}, {t.author_company}</div>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleOpenModal(t)} className="p-2 text-gray-400 hover:text-blue-600 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(t.id)} className="p-2 text-gray-400 hover:text-red-600 rounded-lg"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl w-full max-w-xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-[#0f131d]">
              <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">{editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Author Name</label>
                  <input type="text" value={formData.author_name} onChange={e => setFormData({...formData, author_name: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Author Role</label>
                  <input type="text" value={formData.author_role} onChange={e => setFormData({...formData, author_role: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. CEO" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company</label>
                <input type="text" value={formData.author_company} onChange={e => setFormData({...formData, author_company: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content</label>
                <textarea rows={4} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="What did the client say?" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating (1-5)</label>
                  <input type="number" min="1" max="5" value={formData.rating} onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Author Image URL</label>
                  <input type="text" value={formData.author_image_url} onChange={e => setFormData({...formData, author_image_url: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0f131d] flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-sm font-medium text-gray-500">Cancel</button>
              <button onClick={handleSave} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors">Save Testimonial</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
