"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProjectStore, Project } from "@/lib/demos/saas-dashboard/useProjectStore";
import { useCRMStore } from "@/lib/demos/saas-dashboard/useCRMStore";
import { useTeamStore } from "@/lib/demos/saas-dashboard/useTeamStore";
import { 
  TrendingUp, 
  Users, 
  Briefcase, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { motion } from "framer-motion";

const data = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 4500 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 5500 },
  { name: "Jul", value: 7000 },
];



export default function DashboardPage() {
  const { projects, addProject } = useProjectStore();
  const { contacts } = useCRMStore();
  const { members } = useTeamStore();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownloadReport = () => {
    const reportData = {
      revenue: contacts.reduce((acc, c) => acc + c.dealValue, 0),
      projects: projects.length,
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nexus-enterprise-report.json";
    a.click();
  };

  const stats = [
    // ... stats same as before
    {
      label: "Total Revenue",
      value: `$${contacts.reduce((acc, c) => acc + c.dealValue, 0).toLocaleString()}`,
      change: "+12.5%",
      trend: "up",
      icon: TrendingUp,
      color: "text-primary",
    },
    {
      label: "Active Projects",
      value: projects.filter(p => p.status === "Active").length.toString(),
      change: "+2",
      trend: "up",
      icon: Briefcase,
      color: "text-blue-400",
    },
    {
      label: "Team Members",
      value: members.length.toString(),
      change: "0",
      trend: "neutral",
      icon: Users,
      color: "text-emerald-400",
    },
    {
      label: "Hours Tracked",
      value: "1,240h",
      change: "-4.1%",
      trend: "down",
      icon: Clock,
      color: "text-amber-400",
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-bold">Good morning, Alex</h1>
          <p className="text-outline mt-2 text-lg">Here's what's happening with your projects today.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleDownloadReport}
            className="px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest transition-colors font-medium active:scale-95"
          >
            Download Report
          </button>
          <button 
            onClick={() => router.push('/tasks')}
            className="px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest transition-colors font-medium active:scale-95 flex items-center gap-2"
          >
            <Clock className="w-4 h-4" />
            Add Task
          </button>
          <button 
            onClick={() => router.push('/projects')}
            className="px-4 py-2 rounded-xl card-gradient font-medium shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
          >
            Create Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-surface border border-surface-container-highest/50 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="flex items-start justify-between">
              <div className={stat.color}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                stat.trend === "up" ? "bg-emerald-500/10 text-emerald-500" : 
                stat.trend === "down" ? "bg-red-500/10 text-red-500" : 
                "bg-surface-container-highest text-outline"
              }`}>
                {stat.trend === "up" ? <ArrowUpRight className="w-3 h-3" /> : stat.trend === "down" ? <ArrowDownRight className="w-3 h-3" /> : null}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-outline text-sm font-medium">{stat.label}</h3>
              <p className="text-2xl font-bold mt-1 tracking-tight">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-8 rounded-2xl bg-surface border border-surface-container-highest/50">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold">Revenue Growth</h2>
                <p className="text-sm text-outline mt-1">Monthly recurring revenue over time.</p>
              </div>
              <button className="p-2 hover:bg-surface-container-low rounded-lg transition-colors">
                <MoreHorizontal className="w-5 h-5 text-outline" />
              </button>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#adc6ff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#adc6ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#262a35" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: "#8c909f", fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: "#8c909f", fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#1c1f2a", 
                      border: "1px solid #313540",
                      borderRadius: "12px",
                      color: "#dfe2f1"
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#adc6ff" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorVal)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-surface border border-surface-container-highest/50">
             <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-bold">Active Projects</h2>
                  <select className="bg-surface-container-low border-none rounded-lg px-2 py-1 text-xs font-bold text-outline outline-none focus:ring-1 focus:ring-primary/30">
                    <option>All Projects</option>
                    <option>Recent</option>
                    <option>High Priority</option>
                  </select>
                </div>
                <button 
                  onClick={() => router.push('/projects')}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  View all
                </button>
             </div>
             <div className="space-y-4">
                {projects.slice(0, 3).map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 rounded-xl border border-surface-container-low hover:border-surface-container-highest transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center font-bold text-primary">
                        {project.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-medium">{project.name}</h4>
                        <p className="text-xs text-outline mt-0.5">{project.team.length} members involved</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="hidden md:block w-32 h-2 bg-surface-container-low rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-primary"
                        />
                      </div>
                      <span className="text-sm font-medium text-outline w-10 text-right">{project.progress}%</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        project.status === "Active" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="p-8 rounded-2xl bg-surface border border-surface-container-highest/50">
            <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
            <div className="relative space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-surface-container-low">
              {[
                { time: "2h ago", text: "Alex Rivera created a new task in NexGen Platform", icon: "t" },
                { time: "4h ago", text: "Sarah Chen commented on Mobil App Implementation", icon: "c" },
                { time: "1d ago", text: "New client John Doe added to CRM", icon: "u" },
                { time: "2d ago", text: "Project Mobile App reached 40% milestone", icon: "m" },
              ].map((activity, i) => (
                <div key={i} className="relative pl-8">
                  <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-surface-container-high border-2 border-surface flex items-center justify-center text-[10px] font-bold text-primary">
                    {activity.icon}
                  </div>
                  <div>
                    <p className="text-sm leading-relaxed">{activity.text}</p>
                    <span className="text-xs text-outline mt-1 block">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-2xl card-gradient relative overflow-hidden group">
            <div className="relative z-10">
              <h2 className="text-xl font-bold">Upgrade to Nexus Pro</h2>
              <p className="text-on-primary/80 text-sm mt-2 leading-relaxed">Get unlimited projects, advanced analytics, and custom AI agents.</p>
              <button 
                onClick={() => router.push('/billing')}
                className="mt-6 px-6 py-2.5 bg-background text-foreground rounded-xl font-bold hover:scale-105 transition-transform shadow-xl"
              >
                Upgrade Now
              </button>
            </div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            <div className="absolute -left-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
