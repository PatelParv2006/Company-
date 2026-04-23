import { createServerSupabaseClient } from "@/lib/supabase";
import { Bot, MessageSquare, Clock, Trash2 } from "lucide-react";

export const metadata = {
  title: "AI Chat Logs | Admin",
};

export const revalidate = 0;

export default async function ChatLogsPage() {
  const supabase = createServerSupabaseClient();
  let logs: any[] = [];
  
  if (supabase) {
    const { data } = await supabase
      .from('chat_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);
    logs = data || [];
  }

  // Group logs by session_id
  const groupedLogs = logs.reduce((acc: any, log: any) => {
    if (!acc[log.session_id]) {
      acc[log.session_id] = {
        sessionId: log.session_id,
        messages: [],
        lastActive: log.created_at,
      };
    }
    acc[log.session_id].messages.push(log);
    return acc;
  }, {});

  const sessions = Object.values(groupedLogs).sort((a: any, b: any) => 
    new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white">AI Chat Logs</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Review AI assistant conversations to improve the system prompt.</p>
      </div>

      {!supabase ? (
        <div className="p-12 text-center bg-white dark:bg-[#111827] rounded-3xl border border-gray-200 dark:border-gray-800">
          Supabase not configured.
        </div>
      ) : sessions.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-[#111827] rounded-3xl border border-gray-200 dark:border-gray-800">
          No chat history found.
        </div>
      ) : (
        <div className="space-y-8">
          {sessions.map((session: any) => (
            <div key={session.sessionId} className="bg-white dark:bg-[#111827] rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
              <div className="px-6 py-4 bg-gray-50 dark:bg-[#0f131d] border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900 dark:text-white">Session: {session.sessionId.slice(-8)}</div>
                    <div className="text-[10px] text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {new Date(session.lastActive).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="text-xs font-medium text-gray-400">
                  {session.messages.length} Messages
                </div>
              </div>
              <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
                {session.messages.sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()).map((msg: any) => (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'}`}>
                      <div className="flex items-center gap-2 mb-1 opacity-70 text-[10px] font-bold uppercase tracking-wider">
                        {msg.role === 'user' ? 'User' : 'Assistant'}
                      </div>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
