"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, X, Loader2, FileText, Calendar, User, Eye, EyeOff } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function AdminBlog() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Engineering",
    author_name: "DevMind Team",
    cover_image: "",
    is_published: false,
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    if (!isSupabaseConfigured()) {
      setPosts([]);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog:', error);
      toast.error("Failed to load blog posts");
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData({ ...formData, title, slug: generateSlug(title) });
  };

  const handleOpenModal = (post: any = null) => {
    if (post) {
      setEditingPost(post);
      setFormData({
        title: post.title || "",
        slug: post.slug || "",
        excerpt: post.excerpt || "",
        content: post.content || "",
        category: post.category || "Engineering",
        author_name: post.author_name || "DevMind Team",
        cover_image: post.cover_image || "",
        is_published: post.is_published ?? false,
      });
    } else {
      setEditingPost(null);
      setFormData({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        category: "Engineering",
        author_name: "DevMind Team",
        cover_image: "",
        is_published: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!isSupabaseConfigured()) {
      toast.error("Supabase not configured.");
      setIsModalOpen(false);
      return;
    }

    const payload = {
      ...formData,
      published_at: formData.is_published ? new Date().toISOString() : null
    };

    const loadToast = toast.loading("Saving post...");
    try {
      if (editingPost?.id) {
        if (editingPost.id.toString().length === 36) {
          const { error } = await supabase
            .from('blog_posts')
            .update(payload)
            .eq('id', editingPost.id);
          if (error) throw error;
          toast.success("Post updated", { id: loadToast });
        } else {
          toast.error("Cannot edit mock data. Please create a new post.", { id: loadToast });
          setIsModalOpen(false);
          return;
        }
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([payload]);
        if (error) throw error;
        toast.success("Post created", { id: loadToast });
      }
      fetchPosts();
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
    if (confirm("Are you sure you want to delete this blog post?")) {
      const loadToast = toast.loading("Deleting post...");
      try {
        const { error } = await supabase
          .from('blog_posts')
          .delete()
          .eq('id', id);
        if (error) throw error;
        toast.success("Post deleted", { id: loadToast });
        fetchPosts();
      } catch (error: any) {
        toast.error(`Error: ${error.message}`, { id: loadToast });
      }
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-1">Blog Manager</h1>
          <p className="text-gray-500 dark:text-gray-400">Write and publish articles about technology and design.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Create New Post
        </button>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-[#0f131d] border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-6 py-4 font-medium">Post Info</th>
                <th className="px-6 py-4 font-medium">Author</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {isLoading ? (
                <tr><td colSpan={4} className="p-12 text-center"><Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600" /></td></tr>
              ) : posts.length === 0 ? (
                <tr><td colSpan={4} className="p-12 text-center text-gray-500">No blog posts yet. Click "Create New Post" to get started.</td></tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {post.cover_image ? (
                          <img src={post.cover_image} alt="" className="w-12 h-10 rounded-lg object-cover" />
                        ) : (
                          <div className="w-12 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400"><FileText className="w-4 h-4" /></div>
                        )}
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white mb-0.5">{post.title}</div>
                          <div className="text-[10px] text-gray-500 flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.created_at).toLocaleDateString()}
                            <span className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider">{post.category}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {post.author_name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${post.is_published ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}>
                        {post.is_published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {post.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleOpenModal(post)} className="p-2 text-gray-500 hover:text-blue-600 transition-colors"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(post.id)} className="p-2 text-gray-500 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
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
          <div className="bg-white dark:bg-[#111827] rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col h-[90vh]">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-[#0f131d]">
              <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">{editingPost ? "Edit Blog Post" : "Create Blog Post"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-8 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Title</label>
                  <input type="text" value={formData.title} onChange={e => handleTitleChange(e.target.value)} className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-2xl px-6 py-4 text-lg font-heading font-bold focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Enter post title..." />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Post Content (Markdown)</label>
                  <textarea rows={12} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-2xl px-6 py-4 text-sm font-mono focus:ring-2 focus:ring-blue-500 outline-none" placeholder="# Welcome to the blog..."></textarea>
                </div>
              </div>
              <div className="lg:col-span-1 space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Slug</label>
                  <input type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full bg-gray-100 dark:bg-gray-800/50 border border-transparent rounded-xl px-4 py-3 text-xs text-gray-500 font-mono outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm outline-none">
                    <option>Engineering</option>
                    <option>Design</option>
                    <option>Business</option>
                    <option>Product</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Cover Image URL</label>
                  <input type="text" value={formData.cover_image} onChange={e => setFormData({...formData, cover_image: e.target.value})} className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm outline-none" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Excerpt</label>
                  <textarea rows={3} value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-sm outline-none" placeholder="A short summary..."></textarea>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-blue-900 dark:text-blue-300">Published Status</span>
                    <button 
                      onClick={() => setFormData({...formData, is_published: !formData.is_published})}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.is_published ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.is_published ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0f131d] flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">Discard</button>
              <button onClick={handleSave} className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-xl shadow-blue-600/20 transition-all active:scale-95">Save Article</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
