import { projects } from "@/lib/projects";
import { notFound } from "next/navigation";
import { CheckCircle, ArrowLeft, ArrowRight, Code2 } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const project = projects.find(p => p.id === resolvedParams.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b0f19]">
      {/* Hero Section */}
      <section className={`pt-24 pb-32 bg-gradient-to-br ${project.grad} text-white`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/projects" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Projects
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-sm font-medium text-white border border-white/30">
              {project.category}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 leading-tight">
            {project.title}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl leading-relaxed">
            {project.description}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="-mt-16 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white dark:bg-[#111827] rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200 dark:border-gray-800 mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6">Overview</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-12">
              {project.longDescription}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl p-8 border border-red-100 dark:border-red-900/30">
                <h3 className="text-xl font-heading font-bold text-red-700 dark:text-red-400 mb-4">The Problem</h3>
                <p className="text-gray-700 dark:text-gray-300">{project.problem}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/10 rounded-2xl p-8 border border-green-100 dark:border-green-900/30">
                <h3 className="text-xl font-heading font-bold text-green-700 dark:text-green-400 mb-4">The Solution</h3>
                <p className="text-gray-700 dark:text-gray-300">{project.solution}</p>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">Tech Stack</h3>
              <div className="flex flex-wrap gap-3">
                {project.techStack.map(t => (
                  <div key={t} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-[#0f131d] border border-gray-200 dark:border-gray-800">
                    <Code2 className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-800 dark:text-gray-200 font-medium">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Screenshots Placeholders */}
          <div className="mb-24">
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-8">Interface Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1,2,3,4].map(num => (
                <div key={num} className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-2xl border border-gray-300 dark:border-gray-700 overflow-hidden relative flex items-center justify-center">
                  <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${project.grad}`}></div>
                  <span className="relative z-10 text-gray-400 dark:text-gray-500 font-medium tracking-widest uppercase">Screenshot {num}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-blue-600 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 relative z-10">Want to build something similar?</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto relative z-10">We can help you turn your idea into a production-ready application using the same scalable architecture.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-full font-bold text-lg transition-colors relative z-10 shadow-xl">
              Start Your Project <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
