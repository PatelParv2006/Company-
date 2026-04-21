"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b0f19] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6"
          >
            Start Your Project
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-400"
          >
            Fill out the form below and our technical team will get back to you within 24 hours to discuss your requirements.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column - Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="lg:col-span-7 bg-white dark:bg-[#111827] rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-gray-800 shadow-xl relative overflow-hidden"
          >
            {status === "success" ? (
              <div className="absolute inset-0 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-8 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                  <CheckCircle2 className="w-20 h-20 text-green-500 mb-6 mx-auto" />
                </motion.div>
                <h3 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">Message Sent!</h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md">Thank you for reaching out. A senior engineer will review your details and contact you shortly.</p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="mt-8 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name <span className="text-red-500">*</span></label>
                  <input required type="text" className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address <span className="text-red-500">*</span></label>
                  <input required type="email" className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="john@example.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone (Optional)</label>
                  <input type="tel" className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="+1 (555) 000-0000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project Type</label>
                  <select className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                    <option>Web Application</option>
                    <option>SaaS Platform</option>
                    <option>Mobile App</option>
                    <option>UI/UX Design</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Budget Range</label>
                <select className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                  <option>Under ₹50,000</option>
                  <option>₹50,000 - ₹1,50,000</option>
                  <option>₹1,50,000 - ₹5,000,000</option>
                  <option>₹5,000,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Project Details <span className="text-red-500">*</span></label>
                <textarea required rows={5} className="w-full bg-gray-50 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Tell us about your project, goals, and timeline..."></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === "sending"}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {status === "sending" ? "Sending..." : "Send Message"} <Send className="w-5 h-5" />
              </button>
            </form>
          </motion.div>

          {/* Right Column - Info */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Contact Info Card */}
            <div className="bg-white dark:bg-[#111827] rounded-3xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
              <h3 className="font-heading font-bold text-2xl text-gray-900 dark:text-white mb-8">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Email Us</h4>
                    <p className="text-gray-600 dark:text-gray-400">contact@devmindstudio.com</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Call Us</h4>
                    <p className="text-gray-600 dark:text-gray-400">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Office Location</h4>
                    <p className="text-gray-600 dark:text-gray-400">SG Highway, Ahmedabad<br/>Gujarat, India 380015</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Working Hours</h4>
                    <p className="text-gray-600 dark:text-gray-400">Mon - Fri, 9:00 AM - 6:00 PM IST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Process Card */}
            <div className="bg-gradient-to-br from-gray-900 to-[#0f131d] rounded-3xl p-8 shadow-xl text-white border border-gray-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-[40px]"></div>
              <h3 className="font-heading font-bold text-2xl mb-6 relative z-10">What happens next?</h3>
              <div className="space-y-6 relative z-10">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold shrink-0 text-sm">1</div>
                  <div>
                    <h4 className="font-bold">Initial Discovery</h4>
                    <p className="text-gray-400 text-sm">We'll review your requirements and schedule a 30-min discovery call.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold shrink-0 text-sm">2</div>
                  <div>
                    <h4 className="font-bold">Technical Proposal</h4>
                    <p className="text-gray-400 text-sm">We provide a detailed architecture plan, timeline, and exact pricing.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold shrink-0 text-sm">3</div>
                  <div>
                    <h4 className="font-bold">Kickoff</h4>
                    <p className="text-gray-400 text-sm">We sign the MSA, setup project tracking, and begin sprint zero.</p>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
