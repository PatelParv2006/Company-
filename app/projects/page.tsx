"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Layout } from "lucide-react";
import { projects } from "@/lib/projects";

const categories = ["All", "Web Apps", "SaaS", "Mobile", "Admin Systems"];

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b0f19] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6"
          >
            Our Projects
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-400"
          >
            Explore our software demos. High-performance applications built to solve complex business challenges.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                filter === cat 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "bg-white dark:bg-[#111827] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, i) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5 }}
              key={project.id}
              className="bg-white dark:bg-[#111827] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              <div className={`h-48 bg-gradient-to-br ${project.grad} relative p-6 flex flex-col justify-end shrink-0`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                <Layout className="w-8 h-8 text-white mb-2 relative z-10" />
                <h3 className="text-xl font-bold text-white relative z-10">{project.title}</h3>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.slice(0,3).map(t => (
                    <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      {t}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="text-xs px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>
                <div className="flex gap-3">
                  <Link href={`/projects/${project.id}`} className="flex-1 text-center bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 py-2.5 rounded-lg text-sm font-medium transition-colors">
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-24">
            <h3 className="text-xl text-gray-500 dark:text-gray-400">No projects found in this category.</h3>
          </div>
        )}
      </div>
    </div>
  );
}
