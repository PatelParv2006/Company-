"use client";

import { useState, useEffect } from "react";
import { Search, Loader2, MessageSquare, Calendar, User, Clock, ChevronRight, Bot } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function AdminChatLogs() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState<any>(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    setIsLoading(true);
    if (!isSupabaseConfigured()) {
      setSessions([]);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setSessions(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to load chat logs");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-1">AI Chat Logs</h1>
          <p className="text-gray-500 dark:text-gray-400">Monitor interactions between users and the AI Assistant.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col h-[70vh]">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search sessions..." 
                  className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800">
              {isLoading ? (
                <div className="p-12 flex justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                </div>
              ) : sessions.length === 0 ? (
                <div className="p-12 text-center text-gray-500">No chat sessions found.</div>
              ) : (
                sessions.map((sess) => (
                  <button
                    key={sess.id}
                    onClick={() => setSelectedSession(sess)}
                    className={`w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${selectedSession?.id === sess.id ? 'bg-blue-50 dark:bg-blue-500/10' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-gray-900 dark:text-white truncate">Session {sess.id.slice(0, 8)}</div>
                        <div className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          {new Date(sess.created_at).toLocaleString()}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300" />
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedSession ? (
            <div className="bg-white dark:bg-[#111827] rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl h-[70vh] flex flex-col overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0f131d] flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-white">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-heading font-bold text-gray-900 dark:text-white">Chat Transcript</h2>
                    <p className="text-xs text-gray-500">Started on {new Date(selectedSession.created_at).toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50 dark:bg-black/20">
                {selectedSession.messages?.map((msg: any, i: number) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl p-4 ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-tl-none'}`}>
                      <div className="text-[10px] uppercase tracking-wider font-bold mb-1 opacity-70">
                        {msg.role === 'user' ? 'User' : 'Assistant'}
                      </div>
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-[#111827]/50 rounded-3xl p-12 border-2 border-dashed border-gray-200 dark:border-gray-800 flex flex-col h-[70vh] items-center justify-center text-center">
              <Bot className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-heading font-bold text-gray-400 mb-2">No Session Selected</h3>
              <p className="text-gray-500 max-w-xs">Select a chat session from the list to view the full conversation transcript.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
