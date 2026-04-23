import { MessageSquare, Calculator, MousePointerClick, TrendingUp, Users, Briefcase } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase";
import Link from "next/link";

export const metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboard() {
  const supabase = createServerSupabaseClient();
  let stats = {
    inquiries: 0,
    estimates: 0,
    chats: 0,
    projects: 0,
  };

  let recentInquiries: any[] = [];
  let recentEstimates: any[] = [];

  if (supabase) {
    try {
      const [
        { count: inqCount },
        { count: estCount },
        { data: chatData },
        { count: projCount },
        { data: recInq },
        { data: recEst }
      ] = await Promise.all([
        supabase.from('inquiries').select('*', { count: 'exact', head: true }),
        supabase.from('estimator_submissions').select('*', { count: 'exact', head: true }),
        supabase.from('chat_logs').select('session_id'),
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('inquiries').select('*').order('created_at', { ascending: false }).limit(5),
        supabase.from('estimator_submissions').select('*').order('created_at', { ascending: false }).limit(5)
      ]);
      
      // Group chats by session_id
      const uniqueChatSessions = new Set(chatData?.map(c => c.session_id) || []);

      stats = {
        inquiries: inqCount || 0,
        estimates: estCount || 0,
        chats: uniqueChatSessions.size,
        projects: projCount || 0
      };

      recentInquiries = recInq || [];
      recentEstimates = recEst || [];
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
    <div className="p-8">
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
        <div className="bg-white dark:bg-[#111827] rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">Recent Inquiries</h2>
            <Link href="/admin/inquiries" className="text-sm text-blue-600 font-medium">View All</Link>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {!supabase ? (
              <div className="p-12 text-center text-gray-500">Supabase not configured.</div>
            ) : recentInquiries.length === 0 ? (
               <div className="p-12 text-center text-gray-500">No inquiries yet.</div>
            ) : (
              recentInquiries.map((inq) => (
                <div key={inq.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-bold text-gray-900 dark:text-white">{inq.name}</div>
                    <div className="text-[10px] text-gray-500">{new Date(inq.created_at).toLocaleDateString()}</div>
                  </div>
                  <div className="text-xs text-gray-500 truncate">{inq.message}</div>
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="bg-white dark:bg-[#111827] rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">Recent Estimates</h2>
            <Link href="/admin/estimator-submissions" className="text-sm text-blue-600 font-medium">View All</Link>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {!supabase ? (
              <div className="p-12 text-center text-gray-500">Supabase not configured.</div>
            ) : recentEstimates.length === 0 ? (
               <div className="p-12 text-center text-gray-500">No estimates yet.</div>
            ) : (
              recentEstimates.map((est) => (
                <div key={est.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-bold text-gray-900 dark:text-white">{est.name || 'Anonymous'}</div>
                    <div className="text-xs font-bold text-blue-600">{est.project_type}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] text-gray-500">{new Date(est.created_at).toLocaleDateString()}</div>
                    <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {est.currency} {est.estimated_min.toLocaleString()} - {est.estimated_max.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
