"use client";

import { useState } from "react";
import { Eye, Search, X } from "lucide-react";

const mockInquiries = [
  { id: "1", name: "Sarah Jenkins", email: "sarah@example.com", type: "SaaS Platform", budget: "₹1,50,000+", date: "2 hours ago", status: "New", msg: "Looking to build a B2B analytics platform for retail businesses." },
  { id: "2", name: "David Chen", email: "david@example.com", type: "Web Application", budget: "₹50,000 - ₹1,50,000", date: "1 day ago", status: "Reviewed", msg: "Need a custom portal for our internal operations." },
  { id: "3", name: "Elena Rodriguez", email: "elena@example.com", type: "Mobile App", budget: "Under ₹50,000", date: "2 days ago", status: "New", msg: "Fitness tracking app idea with Apple Health integration." },
  { id: "4", name: "Michael Chang", email: "michael@example.com", type: "Static Site", budget: "Under ₹50,000", date: "3 days ago", status: "Contacted", msg: "Simple marketing landing page for my new agency." },
  { id: "5", name: "Priya Patel", email: "priya@example.com", type: "SaaS Platform", budget: "₹5,000,000+", date: "4 days ago", status: "In Progress", msg: "Enterprise healthcare management system. Highly confidential." },
];

export default function AdminInquiries() {
  const [selectedInquiry, setSelectedInquiry] = useState<typeof mockInquiries[0] | null>(null);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-1">Inquiries</h1>
        <p className="text-gray-500 dark:text-gray-400">View and manage contact form submissions.</p>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search inquiries..." 
              className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-[#0f131d] border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th className="px-6 py-4 font-medium">Contact Details</th>
                <th className="px-6 py-4 font-medium">Project Needs</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {mockInquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-gray-50 dark:hover:bg-[#0f131d]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900 dark:text-white mb-0.5">{inq.name}</div>
                    <div className="text-gray-500 text-xs">{inq.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-white mb-0.5">{inq.type}</div>
                    <div className="text-gray-500 text-xs">{inq.budget}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {inq.date}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                      inq.status === 'New' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800/50' :
                      inq.status === 'Reviewed' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800/50' :
                      inq.status === 'Contacted' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800/50' :
                      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800/50'
                    }`}>
                      {inq.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedInquiry(inq)}
                      className="p-1.5 text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors inline-flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111827] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-[#0f131d]">
              <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white">Inquiry Details</h2>
              <button onClick={() => setSelectedInquiry(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider block mb-1">Name</span>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedInquiry.name}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider block mb-1">Email</span>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedInquiry.email}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider block mb-1">Project Type</span>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedInquiry.type}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider block mb-1">Budget</span>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedInquiry.budget}</p>
                </div>
              </div>
              
              <div>
                <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider block mb-2">Message</span>
                <div className="bg-gray-50 dark:bg-[#0f131d] p-4 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-sm">
                  {selectedInquiry.msg}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <select className="bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white">
                  <option>Mark as New</option>
                  <option>Mark as Reviewed</option>
                  <option>Mark as Contacted</option>
                  <option>Mark as In Progress</option>
                </select>
                <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                  Send Email Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
