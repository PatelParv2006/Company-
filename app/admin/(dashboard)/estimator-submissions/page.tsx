"use client";

import { useState, useEffect } from "react";
import { Search, Loader2, Calculator, Calendar, User, Mail, ChevronRight, FileText } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import toast from "react-hot-toast";

export default function AdminEstimates() {
  const [estimates, setEstimates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEstimate, setSelectedEstimate] = useState<any>(null);

  useEffect(() => {
    fetchEstimates();
  }, []);

  const fetchEstimates = async () => {
    setIsLoading(true);
    if (!isSupabaseConfigured()) {
      setEstimates([]);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('estimator_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setEstimates(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to load estimates");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-1">Estimator Leads</h1>
          <p className="text-gray-500 dark:text-gray-400">Review project estimates and potential client leads.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search leads..." 
                  className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none"
                />
              </div>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {isLoading ? (
                <div className="p-12 flex justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                </div>
              ) : estimates.length === 0 ? (
                <div className="p-12 text-center text-gray-500">No estimator leads yet.</div>
              ) : (
                estimates.map((est) => (
                  <button
                    key={est.id}
                    onClick={() => setSelectedEstimate(est)}
                    className={`w-full text-left p-6 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors flex items-center justify-between ${selectedEstimate?.id === est.id ? 'bg-blue-50 dark:bg-blue-500/10 border-l-4 border-l-blue-600' : ''}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                        <Calculator className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">{est.client_name || "Anonymous User"}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(est.created_at).toLocaleDateString()}
                          <span className="w-1 h-1 rounded-full bg-gray-300 mx-1" />
                          {est.project_type || "Custom Project"}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400">${est.estimated_cost?.toLocaleString() || "0"}</div>
                      <div className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Est. Total</div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          {selectedEstimate ? (
            <div className="bg-white dark:bg-[#111827] rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-xl sticky top-8">
              <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-6">Estimate Details</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Client Name</div>
                    <div className="text-gray-900 dark:text-white font-medium">{selectedEstimate.client_name || "Not provided"}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Email Address</div>
                    <div className="text-gray-900 dark:text-white font-medium">{selectedEstimate.client_email || "Not provided"}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Project Scope</div>
                    <div className="text-gray-900 dark:text-white font-medium mb-4">{selectedEstimate.project_type || "Custom"}</div>
                    
                    <div className="bg-gray-50 dark:bg-[#0f131d] rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
                      <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Selected Features</h4>
                      <div className="space-y-2">
                        {selectedEstimate.details?.features?.map((f: string, i: number) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-500">Total Estimate</span>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">${selectedEstimate.estimated_cost?.toLocaleString()}</span>
                  </div>
                  <button className="w-full bg-gray-900 dark:bg-blue-600 hover:bg-gray-800 dark:hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all">
                    Send Proposal
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-[#111827]/50 rounded-3xl p-12 border-2 border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center text-center">
              <Calculator className="w-12 h-12 text-gray-300 mb-4" />
              <p className="text-gray-500">Select an estimate from the list to view full details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
