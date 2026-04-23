"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, X, Loader2, ExternalLink } from "lucide-react";
import { projects as mockProjects } from "@/lib/projects";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function AdminProjects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    case_study_content: "",
    category: "Web Apps",
    slug: "",
    tech_stack: "",
    is_featured: true,
    image_url: "",
    live_url: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    if (!isSupabaseConfigured()) {
      setProjectsList(mockProjects);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setProjectsList(data);
      } else {
        // Fallback to mock data if table is empty to show the UI
        setProjectsList(mockProjects);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error("Failed to load projects from database");
      setProjectsList(mockProjects);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (project: any = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title || "",
        description: project.description || "",
        slug: project.slug || "",
        tech_stack: Array.isArray(project.tech_stack) ? project.tech_stack.join(", ") : (project.techStack?.join(", ") || ""),
        case_study_content: project.case_study_content || project.fullDescription || "",
        category: project.category || "Web Apps",
        is_featured: project.is_featured ?? true,
        image_url: project.thumbnail_url || project.image_url || project.image || "",
        live_url: project.live_url || project.link || "",
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: "",
        description: "",
        slug: "",
        tech_stack: "",
        case_study_content: "",
        category: "Web Apps",
        is_featured: true,
        image_url: "",
        live_url: "",
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

    const loadToast = toast.loading("Saving project...");
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        case_study_content: formData.case_study_content,
        category: formData.category,
        is_featured: formData.is_featured,
        thumbnail_url: formData.image_url,
        live_url: formData.live_url,
        slug: formData.slug || formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        tech_stack: formData.tech_stack.split(',').map(s => s.trim()).filter(Boolean),
      };

      if (editingProject?.id) {
        // Update
        const { error } = await supabase
          .from('projects')
          .update(payload)
          .eq('id', editingProject.id);
        if (error) throw error;
        toast.success("Project updated", { id: loadToast });
      } else {
        // Insert
        const { error } = await supabase
          .from('projects')
          .insert([payload]);
        if (error) throw error;
        toast.success("Project created", { id: loadToast });
      }
      fetchProjects();
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(`Error: ${error.message}`, { id: loadToast });
    }
  };

  const handleDelete = async (id: string) => {
    if (!isSupabaseConfigured()) {
      toast.error("Supabase not configured.");
      return;
    }

    if (confirm("Are you sure you want to delete this project?")) {
      const loadToast = toast.loading("Deleting project...");
      try {
        const { error } = await supabase
          .from('projects')
          .delete()
          .eq('id', id);
        if (error) throw error;
        toast.success("Project deleted", { id: loadToast });
        fetchProjects();
      } catch (error: any) {
        toast.error(`Error: ${error.message}`, { id: loadToast });
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-1">Projects</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your portfolio items.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add New Project
        </button>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-[#0f131d] border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-6 py-4 font-medium">Project Name</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-600 mx-auto" />
                  </td>
                </tr>
              ) : projectsList.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    No projects found.
                  </td>
                </tr>
              ) : (
                projectsList.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-[#0f131d]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {project.thumbnail_url || project.image_url || project.image ? (
                          <img src={project.thumbnail_url || project.image_url || project.image} alt={project.title} className="w-10 h-10 rounded-lg object-cover bg-gray-200 dark:bg-gray-800" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500 text-xs">No Img</div>
                        )}
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white mb-0.5">{project.title}</div>
                          <div className="text-gray-500 text-xs truncate max-w-xs">{project.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-md text-xs font-medium">
                        {project.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${project.is_featured === false ? 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-800/50' : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/50'}`}>
                        {project.is_featured === false ? 'Draft' : 'Live'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {(project.live_url || project.link) && (
                          <a href={project.live_url || project.link} target="_blank" rel="noreferrer" className="p-1.5 text-gray-500 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        <button onClick={() => handleOpenModal(project)} className="p-1.5 text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(project.id)} className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors">
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
          Showing {projectsList.length} projects
        </div>
      </div>

      {/* Add Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-[#0f131d]">
              <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">{editingProject ? "Edit Project" : "Add New Project"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project Title</label>
                    <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Acme SaaS Platform" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">URL Slug</label>
                    <input type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. acme-saas" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Short Description</label>
                  <input type="text" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. A comprehensive billing dashboard" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tech Stack (comma separated)</label>
                  <input type="text" value={formData.tech_stack} onChange={e => setFormData({...formData, tech_stack: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Next.js, Tailwind CSS, Supabase, Stripe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Thumbnail Image URL</label>
                  <input type="text" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://example.com/image.jpg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Live URL</label>
                  <input type="text" value={formData.live_url} onChange={e => setFormData({...formData, live_url: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://myproject.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Case Study Content</label>
                  <textarea rows={4} value={formData.case_study_content} onChange={e => setFormData({...formData, case_study_content: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                      <option>Web Apps</option>
                      <option>SaaS</option>
                      <option>Mobile Apps</option>
                      <option>E-commerce</option>
                      <option>Corporate Sites</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                    <select value={formData.is_featured ? "Live" : "Draft"} onChange={e => setFormData({...formData, is_featured: e.target.value === "Live"})} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                      <option>Live</option>
                      <option>Draft</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0f131d] flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">Cancel</button>
              <button onClick={handleSave} className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors">Save Project</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
