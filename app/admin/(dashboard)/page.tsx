import { MessageSquare, Calculator, MousePointerClick, TrendingUp, Users } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export const metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboard() {
  let stats = {
    inquiries: 0,
    estimates: 0,
    chats: 0,
    projects: 6, // Mock fallback
  };

  if (isSupabaseConfigured()) {
    try {
      const [{ count: inqCount }, { count: estCount }, { count: chatCount }, { count: projCount }] = await Promise.all([
        supabase.from('inquiries').select('*', { count: 'exact', head: true }),
        supabase.from('estimator_submissions').select('*', { count: 'exact', head: true }),
        supabase.from('chat_sessions').select('*', { count: 'exact', head: true }),
        supabase.from('projects').select('*', { count: 'exact', head: true })
      ]);
      
      stats = {
        inquiries: inqCount || 0,
        estimates: estCount || 0,
        chats: chatCount || 0,
        projects: projCount || 0
      };
    } catch (e) {
      console.error("Failed to fetch dashboard stats", e);
    }
  }

  const statCards = [
    { name: "Total Inquiries", value: stats.inquiries, icon: MessageSquare, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
    { name: "Estimator Leads", value: stats.estimates, icon: Calculator, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
    { name: "AI Chat Sessions", value: stats.chats, icon: MousePointerClick, color: "text-violet-500", bg: "bg-violet-50 dark:bg-violet-500/10" },
    { name: "Published Projects", value: stats.projects, icon: Briefcase, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back. Here's what's happening with DevMind Studio today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-[#111827] rounded-3xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-[#111827] rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
          <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-6">Recent Inquiries</h2>
          {!isSupabaseConfigured() ? (
            <div className="text-center py-12 text-gray-500">
              <p>Supabase is not configured.</p>
              <p className="text-sm">Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to see real data.</p>
            </div>
          ) : stats.inquiries === 0 ? (
             <div className="text-center py-12 text-gray-500">No inquiries yet.</div>
          ) : (
            <div className="space-y-4">
              {/* This would ideally map over a real fetch of latest inquiries */}
              <div className="text-center text-sm text-gray-500 py-4">Data loaded successfully. Check the Inquiries tab for details.</div>
            </div>
          )}
        </div>
        
        <div className="bg-white dark:bg-[#111827] rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
          <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-6">Recent Estimator Leads</h2>
          {!isSupabaseConfigured() ? (
            <div className="text-center py-12 text-gray-500">
              <p>Supabase is not configured.</p>
            </div>
          ) : stats.estimates === 0 ? (
             <div className="text-center py-12 text-gray-500">No leads yet.</div>
          ) : (
            <div className="text-center text-sm text-gray-500 py-4">Data loaded successfully. Check the Estimates tab for details.</div>
          )}
        </div>
      </div>
    </div>
  );
}

import { Briefcase } from "lucide-react";
