"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProjectItem } from "@/lib/site-content";

type ProjectsExplorerProps = {
  projects: ProjectItem[];
};

export default function ProjectsExplorer({ projects }: ProjectsExplorerProps) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((project) => project.category)))],
    [projects]
  );
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") {
      return projects;
    }

    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory, projects]);

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-3">
        {categories.map((category) => {
          const active = category === activeCategory;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                active
                  ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white"
                  : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 auto-rows-[minmax(300px,auto)]">
        {filteredProjects.map((project, index) => {
          const isLarge = index % 7 === 0;
          const isWide = index % 7 === 3;
          
          return (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={`group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 transition-all duration-500 hover:-translate-y-2 hover:border-blue-500/30 hover:shadow-[0_0_50px_-10px_rgba(59,130,246,0.3)] ${
                isLarge ? "md:col-span-2 md:row-span-2" : 
                isWide ? "md:col-span-2" : ""
              }`}
            >
              <div className={`relative overflow-hidden h-full flex flex-col`}>
                <div className={`relative w-full ${isLarge ? "aspect-[4/3] md:aspect-auto md:flex-1" : "aspect-[16/10]"}`}>
                  {project.liveUrl ? (
                    <div className="absolute inset-0 z-0">
                      <iframe 
                        src={project.liveUrl} 
                        className="w-[125%] h-[125%] origin-top-left scale-[0.8] border-none pointer-events-none grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
                        title={project.title}
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <Image
                      src={project.thumbnailUrl}
                      alt={project.title}
                      fill
                      sizes={isLarge ? "(min-width: 1280px) 66vw, 100vw" : isWide ? "(min-width: 768px) 100vw, 50vw" : "33vw"}
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent z-10" />
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="rounded-full border border-white/10 bg-white/10 backdrop-blur-md px-3 py-1 text-xs font-semibold text-blue-200">
                      {project.category}
                    </span>
                    <h3 className={`mt-3 font-heading font-bold text-white ${isLarge ? "text-3xl md:text-5xl" : "text-2xl"}`}>
                      {project.title}
                    </h3>
                  </div>
                </div>
                
                <div className="p-8 flex-none">
                  <p className="text-sm leading-7 text-slate-400 line-clamp-2">{project.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.techStack.slice(0, isLarge ? 8 : 4).map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-wider text-slate-500"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
