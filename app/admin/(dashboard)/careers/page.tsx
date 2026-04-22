"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, X, Loader2, Briefcase, MapPin, Clock, CheckCircle, XCircle } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function AdminCareers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingJob, setEditingJob] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "",
    requirements: [] as string[],
    is_active: true,
  });

  const [newRequirement, setNewRequirement] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setIsLoading(true);
    if (!isSupabaseConfigured()) {
      setJobs([]);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('job_postings')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error("Failed to load jobs");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (job: any = null) => {
    if (job) {
      setEditingJob(job);
      setFormData({
        title: job.title || "",
        department: job.department || "Engineering",
        location: job.location || "Remote",
        type: job.type || "Full-time",
        description: job.description || "",
        requirements: job.requirements || [],
        is_active: job.is_active ?? true,
      });
    } else {
      setEditingJob(null);
      setFormData({
        title: "",
        department: "Engineering",
        location: "Remote",
        type: "Full-time",
        description: "",
        requirements: [],
        is_active: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleAddRequirement = () => {
    if (newRequirement.trim()) {
      setFormData({ ...formData, requirements: [...formData.requirements, newRequirement.trim()] });
      setNewRequirement("");
    }
  };

  const handleRemoveRequirement = (index: number) => {
    const updated = [...formData.requirements];
    updated.splice(index, 1);
    setFormData({ ...formData, requirements: updated });
  };

  const handleSave = async () => {
    if (!isSupabaseConfigured()) {
      toast.error("Supabase not configured.");
      setIsModalOpen(false);
      return;
    }

    const loadToast = toast.loading("Saving job posting...");
    try {
      if (editingJob?.id) {
        if (editingJob.id.toString().length === 36) {
          const { error } = await supabase
            .from('job_postings')
            .update(formData)
            .eq('id', editingJob.id);
          if (error) throw error;
          toast.success("Job updated", { id: loadToast });
        } else {
          toast.error("Cannot edit mock data. Please create a new job.", { id: loadToast });
          setIsModalOpen(false);
          return;
        }
      } else {
        const { error } = await supabase
          .from('job_postings')
          .insert([formData]);
        if (error) throw error;
        toast.success("Job posted", { id: loadToast });
      }
      fetchJobs();
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
    if (confirm("Are you sure you want to delete this job posting?")) {
      const loadToast = toast.loading("Deleting job...");
      try {
        const { error } = await supabase
          .from('job_postings')
          .delete()
          .eq('id', id);
        if (error) throw error;
        toast.success("Job deleted", { id: loadToast });
        fetchJobs();
      } catch (error: any) {
        toast.error(`Error: ${error.message}`, { id: loadToast });
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-1">Careers Manager</h1>
          <p className="text-gray-500 dark:text-gray-400">Post new job openings and manage current opportunities.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Post New Job
        </button>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-[#0f131d] border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-6 py-4 font-medium">Position</th>
                <th className="px-6 py-4 font-medium">Department</th>
                <th className="px-6 py-4 font-medium">Details</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {isLoading ? (
                <tr><td colSpan={5} className="p-12 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600" /></td></tr>
              ) : jobs.length === 0 ? (
                <tr><td colSpan={5} className="p-12 text-center text-gray-500">No job openings yet.</td></tr>
              ) : (
                jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white mb-0.5">{job.title}</div>
                          <div className="text-[10px] text-gray-500">{job.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-xs font-medium text-gray-700 dark:text-gray-300">{job.department}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500"><MapPin className="w-3 h-3" /> {job.location}</div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500"><Clock className="w-3 h-3" /> {new Date(job.created_at).toLocaleDateString()}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${job.is_active ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                        {job.is_active ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {job.is_active ? 'Active' : 'Closed'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleOpenModal(job)} className="p-2 text-gray-500 hover:text-blue-600 transition-colors"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(job.id)} className="p-2 text-gray-500 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111827] rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-[#0f131d]">
              <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">{editingJob ? "Edit Job Posting" : "Create Job Posting"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Job Title</label>
                    <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Senior React Developer" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Department</label>
                    <select value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})} className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm outline-none">
                      <option>Engineering</option>
                      <option>Design</option>
                      <option>Marketing</option>
                      <option>Operations</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Location</label>
                    <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Remote / New York" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Employment Type</label>
                    <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm outline-none">
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                      <option>Internship</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Description</label>
                  <textarea rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm outline-none" placeholder="Describe the role..."></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Requirements</label>
                  <div className="flex gap-2 mb-3">
                    <input type="text" value={newRequirement} onChange={e => setNewRequirement(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleAddRequirement()} className="flex-1 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2 text-sm outline-none" placeholder="Add a requirement..." />
                    <button onClick={handleAddRequirement} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold">Add</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.requirements.map((req, i) => (
                      <span key={i} className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs flex items-center gap-2">
                        {req}
                        <button onClick={() => handleRemoveRequirement(i)}><X className="w-3 h-3" /></button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-black/20 rounded-2xl border border-gray-100 dark:border-gray-800">
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Active Status</span>
                  <button 
                    onClick={() => setFormData({...formData, is_active: !formData.is_active})}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.is_active ? 'bg-green-600' : 'bg-red-600'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.is_active ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0f131d] flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">Cancel</button>
              <button onClick={handleSave} className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-xl shadow-blue-600/20 transition-all active:scale-95">Save Posting</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
