'use client';

import { useMemo } from 'react';
import { DashboardLayout } from '@/components/demos/billing/layout/DashboardLayout';
import { 
  TrendingUp, 
  Receipt, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { useInvoiceStore } from '@/lib/demos/billing/useInvoiceStore';
import { useCustomerStore } from '@/lib/demos/billing/useCustomerStore';
import { usePaymentStore } from '@/lib/demos/billing/usePaymentStore';
import { formatCurrency, formatDate, cn } from '@/lib/demos/billing/utils';

const chartData = [
  { name: 'Jan', revenue: 45000, expense: 32000 },
  { name: 'Feb', revenue: 52000, expense: 28000 },
  { name: 'Mar', revenue: 48000, expense: 35000 },
  { name: 'Apr', revenue: 61000, expense: 42000 },
  { name: 'May', revenue: 55000, expense: 38000 },
  { name: 'Jun', revenue: 67000, expense: 45000 },
];

export default function Dashboard() {
  const { invoices } = useInvoiceStore();
  const { payments } = usePaymentStore();

  const { totalRevenue, totalPaid, pendingAmount, totalInvoices } = useMemo(() => {
    const revenue = invoices.reduce((sum, inv) => sum + inv.total, 0);
    const paid = payments.reduce((sum, pay) => sum + pay.amount, 0);
    return {
      totalRevenue: revenue,
      totalPaid: paid,
      pendingAmount: revenue - paid,
      totalInvoices: invoices.length
    };
  }, [invoices, payments]);

  const stats = useMemo(() => [
    { 
      name: 'Total Revenue', 
      value: formatCurrency(totalRevenue), 
      icon: TrendingUp, 
      color: 'text-primary',
      trend: '+12.5%',
      trendUp: true
    },
    { 
      name: 'Paid Amount', 
      value: formatCurrency(totalPaid), 
      icon: ArrowUpRight, 
      color: 'text-green-500',
      trend: '+8.2%',
      trendUp: true
    },
    { 
      name: 'Pending Amount', 
      value: formatCurrency(pendingAmount), 
      icon: Clock, 
      color: 'text-tertiary',
      trend: '-2.4%',
      trendUp: false
    },
    { 
      name: 'Total Invoices', 
      value: totalInvoices.toString(), 
      icon: Receipt, 
      color: 'text-secondary',
      trend: '+4.1%',
      trendUp: true
    },
  ], [totalRevenue, totalPaid, pendingAmount, totalInvoices]);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold font-manrope">Financial Overview</h1>
            <p className="text-on-surface-variant mt-2 text-lg">Welcome back, Parv! Here&apos;s what&apos;s happening today.</p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 rounded-xl bg-surface-container-low font-medium hover:bg-surface-container-high transition-colors">
              Download Report
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="card-premium p-6 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className={cn("p-3 rounded-xl bg-surface-container-low", stat.color)}>
                  <stat.icon size={24} />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-sm font-bold",
                  stat.trendUp ? "text-green-500" : "text-tertiary"
                )}>
                  {stat.trendUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {stat.trend}
                </div>
              </div>
              <div>
                <p className="text-on-surface-variant font-medium">{stat.name}</p>
                <h3 className="text-2xl font-bold font-manrope mt-1">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 card-premium p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold font-manrope">Revenue vs Expenses</h2>
              <div className="flex gap-4 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span>Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary" />
                  <span>Expenses</span>
                </div>
              </div>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0058be" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#0058be" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748B', fontSize: 12 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748B', fontSize: 12 }}
                    tickFormatter={(value) => `₹${value/1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      borderRadius: '16px', 
                      border: 'none', 
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)' 
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#0058be" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="expense" 
                    stroke="#5a5e6a" 
                    strokeWidth={3}
                    fill="transparent"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card-premium p-8">
            <h2 className="text-xl font-bold font-manrope mb-8">Recent Invoices</h2>
            <div className="space-y-6">
              {invoices.slice(0, 5).map((invoice) => (
                <div key={invoice.id} className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center font-bold",
                    invoice.status === 'Paid' ? "bg-green-100 text-green-600" : "bg-tertiary-container text-tertiary"
                  )}>
                    {invoice.customerName.substring(0, 1)}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-on-surface">{invoice.customerName}</p>
                    <p className="text-sm text-on-surface-variant">{formatDate(invoice.date)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-on-surface">{formatCurrency(invoice.total)}</p>
                    <p className={cn(
                      "text-xs font-medium",
                      invoice.status === 'Paid' ? "text-green-500" : "text-tertiary"
                    )}>{invoice.status}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 rounded-xl border border-on-surface-variant/10 text-on-surface-variant font-medium hover:bg-surface-container-low transition-colors">
              View All Invoices
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
