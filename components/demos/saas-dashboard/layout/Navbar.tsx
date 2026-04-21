"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Search, Bell, Moon, Sun, UserCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  const mockResults = [
    { title: "Nexus Dashboard v2", type: "Project" },
    { title: "Alex Rivera", type: "Member" },
    { title: "Quarterly Report", type: "Task" },
  ].filter(r => r.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <header className="h-20 flex items-center justify-between px-8 border-b border-surface-container-highest bg-surface/50 backdrop-blur-md sticky top-0 z-10">
      <div className="flex-1 max-w-xl relative">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search projects, tasks, or members (Cmd + K)"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSearchResults(e.target.value.length > 0);
            }}
            onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
            className="w-full bg-surface-container-low border border-transparent focus:border-primary/20 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-outline/60 focus:bg-surface-container-high"
          />
        </div>

        <AnimatePresence>
          {showSearchResults && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-14 left-0 w-full bg-surface border border-surface-container-highest rounded-2xl shadow-2xl p-2 z-50"
            >
              {mockResults.length > 0 ? (
                mockResults.map((res, i) => (
                  <button key={i} className="w-full text-left p-3 hover:bg-surface-container-low rounded-xl transition-colors flex items-center justify-between">
                    <span className="text-sm font-medium">{res.title}</span>
                    <span className="text-[10px] font-bold text-outline tracking-wider uppercase bg-surface-container-high px-2 py-1 rounded-lg">{res.type}</span>
                  </button>
                ))
              ) : (
                <p className="text-center py-4 text-sm text-outline">No results found.</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors text-outline hover:text-foreground"
        >
          <motion.div
            initial={false}
            animate={{ rotate: theme === "dark" ? 0 : 180, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </motion.div>
        </button>

        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors text-outline hover:text-foreground"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-surface" />
          </button>

          {showNotifications && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute right-0 mt-3 w-80 bg-surface border border-surface-container-highest rounded-2xl shadow-2xl z-50 p-4"
              >
                <div className="flex items-center justify-between mb-4">
                   <h3 className="font-bold">Notifications</h3>
                   <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">2 NEW</span>
                </div>
                <div className="space-y-3">
                   {[
                     { title: "New Task Assigned", desc: "Alex Rivera assigned you to 'Fix Chart Animations'", time: "2m ago" },
                     { title: "Project Update", desc: "Brand Guidelines was moved to 'Done'", time: "45m ago" },
                   ].map((n, i) => (
                     <div key={i} className="p-3 rounded-xl hover:bg-surface-container-low transition-colors cursor-pointer group">
                        <p className="text-sm font-bold group-hover:text-primary transition-colors">{n.title}</p>
                        <p className="text-xs text-outline mt-1 leading-relaxed">{n.desc}</p>
                        <p className="text-[10px] text-primary mt-2 font-medium">{n.time}</p>
                     </div>
                   ))}
                </div>
                <button className="w-full mt-4 py-2 text-xs font-bold text-outline hover:text-foreground transition-colors border-t border-surface-container-low pt-4">
                   View All Notifications
                </button>
              </motion.div>
            </>
          )}
        </div>

        <div className="h-8 w-[1px] bg-surface-container-highest mx-2" />

        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium leading-none">Alex Rivera</p>
            <p className="text-xs text-outline mt-1">Design Lead</p>
          </div>
          <button className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center hover:bg-surface-container-highest transition-colors overflow-hidden">
            <UserCircle className="w-full h-full text-outline" />
          </button>
        </div>
      </div>
    </header>
  );
}
