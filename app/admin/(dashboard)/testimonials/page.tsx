"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, X, Loader2, Star, Quote } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import toast from "react-hot-toast";

// Fallback Mock Data
const mockTestimonials = [
  {
    id: "1",
    client_name: "Sarah Jenkins",
    client_role: "CTO",
    client_company: "TechNova Inc.",
    review_text: "DevMind Studio transformed our legacy platform into a lightning-fast modern web application. Their attention to detail and engineering excellence is unmatched.",
    rating: 5,
    is_published: true
  },
  {
    id: "2",
    client_name: "Marcus Chen",
    client_role: "Founder",
    client_company: "GrowthX",
    review_text: "The team delivered our SaaS MVP 3 weeks ahead of schedule. The code quality is superb and the UI is exactly what we envisioned.",
    rating: 5,
    is_published: true
  }
];

export default function AdminTestimonials() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testimonialsList, setTestimonialsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    client_name: "",
    client_role: "",
    client_company: "",
    review_text: "",
    rating: 5,
    is_published: true,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setIsLoading(true);
    if (!isSupabaseConfigured()) {
      setTestimonialsList(mockTestimonials);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setTestimonialsList(data);
      } else {
        setTestimonialsList(mockTestimonials);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast.error("Failed to load testimonials");
      setTestimonialsList(mockTestimonials);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (testimonial: any = null) => {
    if (testimonial) {
      setEditingTestimonial(testimonial);
      setFormData({
        client_name: testimonial.client_name || "",
        client_role: testimonial.client_role || "",
        client_company: testimonial.client_company || "",
        review_text: testimonial.review_text || "",
        rating: testimonial.rating || 5,
        is_published: testimonial.is_published ?? true,
      });
    } else {
      setEditingTestimonial(null);
      setFormData({
        client_name: "",
        client_role: "",
        client_company: "",
        review_text: "",
        rating: 5,
        is_published: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!isSupabaseConfigured()) {
      toast.error("Supabase not configured. Operating in demo mode.");
      setIsModalOpen(false);
      return;
    }

    const loadToast = toast.loading("Saving testimonial...");
    try {
      if (editingTestimonial?.id) {
        if (editingTestimonial.id.toString().length === 36) {
          const { error } = await supabase
            .from('testimonials')
            .update(formData)
            .eq('id', editingTestimonial.id);
          if (error) throw error;
          toast.success("Testimonial updated", { id: loadToast });
        } else {
          toast.error("Cannot edit mock data. Please add a new testimonial.", { id: loadToast });
          setIsModalOpen(false);
          return;
        }
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
    if (!isSupabaseConfigured() || id.toString().length !== 36) {
      toast.error("Cannot delete mock data.");
      return;
    }

    if (confirm("Are you sure you want to delete this testimonial?")) {
      const loadToast = toast.loading("Deleting testimonial...");
      try {
        const { error } = await supabase
          .from('testimonials')
          .delete()
          .eq('id', id);
        if (error) throw error;
        toast.success("Testimonial deleted", { id: loadToast });
        fetchTestimonials();
      } catch (error: any) {
        toast.error(`Error: ${error.message}`, { id: loadToast });
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-1">Testimonials</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage client reviews and social proof.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search clients..." 
              className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-[#0f131d] border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-6 py-4 font-medium">Client Info</th>
                <th className="px-6 py-4 font-medium">Review</th>
                <th className="px-6 py-4 font-medium">Rating</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-600 mx-auto" />
                  </td>
                </tr>
              ) : testimonialsList.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No testimonials found.
                  </td>
                </tr>
              ) : (
                testimonialsList.map((testim) => (
                  <tr key={testim.id} className="hover:bg-gray-50 dark:hover:bg-[#0f131d]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                          {testim.client_name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white mb-0.5">{testim.client_name}</div>
                          <div className="text-gray-500 text-xs truncate max-w-[150px]">
                            {testim.client_role} {testim.client_company ? `at ${testim.client_company}` : ''}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-2">
                        <Quote className="w-3 h-3 text-gray-400 shrink-0 mt-1" />
                        <span className="text-gray-600 dark:text-gray-300 text-xs line-clamp-2 max-w-xs">{testim.review_text}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-0.5 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < testim.rating ? "fill-current" : "text-gray-300 dark:text-gray-700"}`} />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${testim.is_published === false ? 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-800/50' : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/50'}`}>
                        {testim.is_published === false ? 'Hidden' : 'Published'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleOpenModal(testim)} className="p-1.5 text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(testim.id)} className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 text-center">
          Showing {testimonialsList.length} testimonials
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-[#0f131d]">
              <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">{editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Client Name</label>
                    <input type="text" value={formData.client_name} onChange={e => setFormData({...formData, client_name: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Sarah Jenkins" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Client Role</label>
                    <input type="text" value={formData.client_role} onChange={e => setFormData({...formData, client_role: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. CTO" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Company Name</label>
                    <input type="text" value={formData.client_company} onChange={e => setFormData({...formData, client_company: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. TechNova Inc." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating (1-5)</label>
                    <select value={formData.rating} onChange={e => setFormData({...formData, rating: Number(e.target.value)})} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                      {[5,4,3,2,1].map(num => <option key={num} value={num}>{num} Stars</option>)}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Review Content</label>
                  <textarea rows={4} value={formData.review_text} onChange={e => setFormData({...formData, review_text: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Type the client's review here..."></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                  <select value={formData.is_published ? "Published" : "Hidden"} onChange={e => setFormData({...formData, is_published: e.target.value === "Published"})} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                    <option>Published</option>
                    <option>Hidden</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0f131d] flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">Cancel</button>
              <button onClick={handleSave} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors">Save Testimonial</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
