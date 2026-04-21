'use client';

import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/demos/billing/utils';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 transition-transform duration-300 lg:translate-x-0 lg:static lg:block",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 glass-sidebar sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary">
              <span className="font-bold">F</span>
            </div>
            <span className="text-xl font-bold font-manrope">FinTrack</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl bg-surface-container-low text-on-surface-variant"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        <div className="flex-1 p-4 md:p-8 pb-20 overflow-auto">
          {children}
          
          <footer className="mt-20 py-12 border-t border-on-surface-variant/5 text-center">
            <div className="flex flex-col items-center gap-2">
              <p className="text-on-surface-variant font-medium tracking-tight">
                Copyright © {new Date().getFullYear()} <span className="text-on-surface font-bold">Parv Patel</span>. All rights reserved.
              </p>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-on-surface-variant/20" />
                <p className="text-on-surface-variant/40 text-[10px] font-black uppercase tracking-[0.2em]">
                  Technology Demo • Not a final product
                </p>
                <span className="h-px w-8 bg-on-surface-variant/20" />
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
