'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Package, 
  CreditCard, 
  Receipt, 
  BarChart3, 
  Settings,
  PlusCircle,
  Sun,
  Moon,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/demos/billing/utils';
import { useThemeStore } from '@/lib/demos/billing/useThemeStore';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Invoices', href: '/invoices', icon: FileText },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Payments', href: '/payments', icon: CreditCard },
  { name: 'Expenses', href: '/expenses', icon: Receipt },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
];

export function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className="flex flex-col h-full glass-sidebar w-[280px] lg:w-64 z-40">
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary">
            <BarChart3 size={24} />
          </div>
          <span className="text-2xl font-bold font-manrope tracking-tight">FinTrack</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
        <div className="px-4 mb-4">
          <Link 
            href="/invoices/new"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-on-primary rounded-xl font-medium transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20"
          >
            <PlusCircle size={20} />
            <span>New Invoice</span>
          </Link>
        </div>

        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-primary-container text-on-primary" 
                  : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
              )}
            >
              <item.icon className={cn(
                "transition-colors",
                isActive ? "text-on-primary" : "text-on-surface-variant group-hover:text-primary"
              )} size={20} />
              <span className="font-medium">{item.name}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-on-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-on-surface-variant/10">
        <button
          onClick={() => {
            toggleTheme();
            // Optional: don't close sidebar just for theme toggle
          }}
          className="flex items-center gap-3 w-full px-4 py-3 text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface rounded-xl transition-all"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          <span className="font-medium">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
        </button>
        
        <div className="mt-4 px-4 py-4 rounded-2xl bg-surface-container-low">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold shrink-0">
              PP
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-on-surface truncate">Parv Patel</span>
              <span className="text-xs text-on-surface-variant">Admin</span>
            </div>
            <button className="ml-auto text-on-surface-variant hover:text-error transition-colors shrink-0">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
