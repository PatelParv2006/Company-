"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, X, Loader2, User, Mail } from "lucide-react";

// Custom Brand Icons (since they were removed in recent lucide versions)
const Linkedin = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Github = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import toast from "react-hot-toast";

// Fallback Mock Data
const mockTeam: any[] = [];

export default function AdminTeam() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamList, setTeamList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingMember, setEditingMember] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    image_url: "",
    linkedin_url: "",
    github_url: "",
    is_active: true,
  });

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    setIsLoading(true);
    if (!isSupabaseConfigured()) {
      setTeamList(mockTeam);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setTeamList(data);
      } else {
        setTeamList(mockTeam);
      }
    } catch (error) {
      console.error('Error fetching team:', error);
      toast.error("Failed to load team");
      setTeamList(mockTeam);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (member: any = null) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        name: member.name || "",
        role: member.role || "",
        bio: member.bio || "",
        image_url: member.image_url || "",
        linkedin_url: member.linkedin_url || "",
        github_url: member.github_url || "",
        is_active: member.is_active ?? true,
      });
    } else {
      setEditingMember(null);
      setFormData({
        name: "",
        role: "",
        bio: "",
        image_url: "",
        linkedin_url: "",
        github_url: "",
        is_active: true,
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

    const loadToast = toast.loading("Saving member...");
    try {
      if (editingMember?.id) {
        if (editingMember.id.toString().length === 36) {
          const { error } = await supabase
            .from('team_members')
            .update(formData)
            .eq('id', editingMember.id);
          if (error) throw error;
          toast.success("Member updated", { id: loadToast });
        } else {
          toast.error("Cannot edit mock data. Please add a new member.", { id: loadToast });
          setIsModalOpen(false);
          return;
        }
      } else {
        const { error } = await supabase
          .from('team_members')
          .insert([formData]);
        if (error) throw error;
        toast.success("Member created", { id: loadToast });
      }
      fetchTeam();
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

    if (confirm("Are you sure you want to delete this team member?")) {
      const loadToast = toast.loading("Deleting member...");
      try {
        const { error } = await supabase
          .from('team_members')
          .delete()
          .eq('id', id);
        if (error) throw error;
        toast.success("Member deleted", { id: loadToast });
        fetchTeam();
      } catch (error: any) {
        toast.error(`Error: ${error.message}`, { id: loadToast });
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-1">Team Management</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage the experts who build DevMind Studio products.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Team Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full py-20 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : teamList.length === 0 ? (
          <div className="col-span-full py-20 text-center text-gray-500">No team members found.</div>
        ) : (
          teamList.map((member) => (
            <div key={member.id} className="bg-white dark:bg-[#111827] rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-xl transition-all group">
              <div className="relative h-48 overflow-hidden">
                {member.image_url ? (
                  <img src={member.image_url} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                    <User className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button onClick={() => handleOpenModal(member)} className="p-2 bg-white/90 dark:bg-black/50 backdrop-blur-sm rounded-xl text-blue-600 dark:text-blue-400 shadow-lg hover:scale-110 transition-transform">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(member.id)} className="p-2 bg-white/90 dark:bg-black/50 backdrop-blur-sm rounded-xl text-red-600 dark:text-red-400 shadow-lg hover:scale-110 transition-transform">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {!member.is_active && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="bg-white/20 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-white/30">Inactive</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-4">{member.role}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-6 leading-relaxed">{member.bio}</p>
                
                <div className="flex gap-4 border-t border-gray-100 dark:border-gray-800 pt-4">
                  {member.linkedin_url && (
                    <a href={member.linkedin_url} className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {member.github_url && (
                    <a href={member.github_url} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-[#0f131d]">
              <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">{editingMember ? "Edit Member" : "Add New Member"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                    <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role</label>
                    <input type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Lead Developer" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Profile Image URL</label>
                  <input type="text" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://unsplash.com/..." />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
                  <textarea rows={3} value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">LinkedIn URL</label>
                    <input type="text" value={formData.linkedin_url} onChange={e => setFormData({...formData, linkedin_url: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GitHub URL</label>
                    <input type="text" value={formData.github_url} onChange={e => setFormData({...formData, github_url: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                  <select value={formData.is_active ? "Active" : "Inactive"} onChange={e => setFormData({...formData, is_active: e.target.value === "Active"})} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0f131d] flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">Cancel</button>
              <button onClick={handleSave} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors">Save Member</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
