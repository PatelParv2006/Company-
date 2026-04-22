import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, LayoutDashboard, Globe } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  const { data } = await supabase.from('projects').select('id');
  return data?.map((project: any) => ({
    id: project.id,
  })) || [];
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { data: project } = await supabase.from('projects').select('*').eq('id', resolvedParams.id).single();

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b0f19]">
      {/* Hero Section */}
      <section className={`relative pt-24 pb-32 bg-gradient-to-br from-blue-900 to-indigo-900 overflow-hidden text-white`}>
        {project.image_url && (
          <img src={project.image_url} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay" />
        )}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
          {project.live_url && (
            <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 bg-white text-blue-900 px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors">
              <Globe className="w-4 h-4" /> View Live Project
            </a>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="-mt-16 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          
          <div className="bg-white dark:bg-[#111827] rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200 dark:border-gray-800 mb-12">
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-8">Case Study</h2>
            
            {project.case_study_content ? (
              <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-blue-600">
                <div className="whitespace-pre-wrap font-mono text-sm bg-gray-50 dark:bg-black/20 p-6 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300">
                  {project.case_study_content}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <LayoutDashboard className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Case study content is currently being written.</p>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="bg-blue-600 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 relative z-10">Want to build something similar?</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto relative z-10">We can help you turn your idea into a production-ready application using the same scalable architecture.</p>
            <Link href="/estimator" className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-full font-bold text-lg transition-colors relative z-10 shadow-xl">
              Start Your Project <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
