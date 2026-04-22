import Link from "next/link";
import { ArrowRight, Code2, ExternalLink } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const metadata = {
  title: "Our Work",
  description: "Explore our portfolio of premium web applications, SaaS platforms, and mobile apps built for forward-thinking companies.",
};

export default async function ProjectsPage() {
  const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
  const projects = data || [];

  return (
    <div className="min-h-screen bg-white dark:bg-[#030712] pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            Selected <span className="text-blue-600 dark:text-blue-500">Work</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            A showcase of digital products we've engineered from the ground up. We take pride in clean code, scalable architecture, and pixel-perfect design.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[400px]">
          {projects.map((project, i) => (
            <Link 
              key={project.id} 
              href={`/projects/${project.id}`}
              className={`group relative rounded-3xl overflow-hidden ${
                i === 0 ? "md:col-span-2 lg:col-span-2" : ""
              } ${
                i === 3 ? "lg:col-span-2" : ""
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-800 opacity-90 transition-opacity duration-500 group-hover:opacity-100`} />
              
              {project.image_url && (
                <img src={project.image_url} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay group-hover:scale-105 transition-transform duration-700" />
              )}
              
              <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-sm font-medium text-white border border-white/30">
                      {project.category}
                    </span>
                    {project.is_featured && (
                      <span className="px-4 py-1.5 rounded-full bg-yellow-400/20 backdrop-blur-md text-sm font-medium text-yellow-100 border border-yellow-400/30">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <ArrowRight className="w-5 h-5 -rotate-45" />
                  </div>
                </div>

                <div>
                  <h3 className={`font-heading font-bold text-white mb-3 ${
                    (i === 0 || i === 3) ? "text-4xl md:text-5xl" : "text-3xl"
                  }`}>
                    {project.title}
                  </h3>
                  <p className="text-white/80 text-lg line-clamp-2 max-w-xl">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-0" />
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}

