import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Mail, Phone, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Inquiries | Admin",
};

export const revalidate = 0; // Disable caching

export default async function InquiriesPage() {
  let inquiries: any[] = [];
  
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (!error && data) {
        inquiries = data;
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">Inquiries Inbox</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage contact form submissions and leads.</p>
        </div>
        <div className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-4 py-2 rounded-xl font-medium text-sm">
          {inquiries.length} Total Messages
        </div>
      </div>

      {!isSupabaseConfigured() ? (
        <div className="bg-white dark:bg-[#111827] rounded-3xl p-12 border border-gray-200 dark:border-gray-800 text-center">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Supabase Not Configured</h3>
          <p className="text-gray-500 dark:text-gray-400">Please set up your database to view inquiries.</p>
        </div>
      ) : inquiries.length === 0 ? (
        <div className="bg-white dark:bg-[#111827] rounded-3xl p-12 border border-gray-200 dark:border-gray-800 text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">No inquiries yet</h3>
          <p className="text-gray-500 dark:text-gray-400">When someone contacts you, their message will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div key={inq.id} className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-6 hover:border-blue-500/30 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{inq.name}</h3>
                  <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                    {new Date(inq.created_at).toLocaleDateString()}
                  </span>
                  {inq.project_type && (
                    <span className="text-xs text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10 px-2 py-1 rounded-md capitalize">
                      {inq.project_type}
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <a href={`mailto:${inq.email}`} className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                    <Mail className="w-4 h-4" /> {inq.email}
                  </a>
                  {inq.phone && (
                    <a href={`tel:${inq.phone}`} className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                      <Phone className="w-4 h-4" /> {inq.phone}
                    </a>
                  )}
                  {inq.budget && (
                    <span className="flex items-center gap-1.5">
                      <strong>Budget:</strong> {inq.budget}
                    </span>
                  )}
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap">
                  {inq.message}
                </div>
              </div>
              
              <div className="shrink-0 flex flex-col gap-2">
                <a 
                  href={`mailto:${inq.email}?subject=Re: Your inquiry to DevMind Studio`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20 rounded-xl text-sm font-medium transition-colors"
                >
                  <Mail className="w-4 h-4" /> Reply
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
