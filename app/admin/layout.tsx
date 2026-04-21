"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderOpen, Settings, Mail, LogOut, User } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Projects", href: "/admin/projects", icon: FolderOpen },
    { name: "Pricing Config", href: "/admin/pricing", icon: Settings },
    { name: "Inquiries", href: "/admin/inquiries", icon: Mail, badge: 12 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#0b0f19]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-[260px] bg-[#111827] text-white flex flex-col z-20 border-r border-gray-800">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-5 h-5 bg-blue-600 rounded-sm"></div>
            <span className="font-heading font-bold text-lg">DevMind Studio</span>
          </div>
          <span className="text-xs text-gray-400 font-semibold tracking-widest uppercase">Admin Portal</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3 text-sm font-medium">
                  <link.icon className="w-5 h-5" />
                  {link.name}
                </div>
                {link.badge && (
                  <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700">
                <User className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-tight">Alex Mercer</p>
                <p className="text-xs text-gray-400">System Admin</p>
              </div>
            </div>
            <LogOut className="w-5 h-5 text-gray-500 group-hover:text-red-400 transition-colors" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-[260px]">
        {children}
      </main>
    </div>
  );
}
