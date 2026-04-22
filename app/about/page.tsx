import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, BarChart3, Code2, Globe, Layout, Lightbulb, Smartphone, ShieldCheck, Zap } from "lucide-react";

export const metadata = {
  title: "About Us",
  description: "Learn about DevMind Studio's mission, our team of expert engineers, and the history behind our premium software development agency.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#030712] pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            Building the <span className="text-blue-600 dark:text-blue-500">Future</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            We are a team of passionate engineers, designers, and strategists dedicated to crafting digital masterpieces that drive business growth.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <div>
            <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                DevMind Studio was founded with a singular vision: to bridge the gap between complex business challenges and elegant, high-performance software solutions.
              </p>
              <p>
                What started as a small collective of elite developers has grown into a full-scale digital product agency. We've spent the last 5 years honing our craft, mastering modern tech stacks like Next.js, React, and cloud architecture to deliver scalable applications that perform flawlessly under pressure.
              </p>
              <p>
                We don't just write code; we build businesses. From early-stage startups needing a rapid MVP to enterprise organizations requiring secure, HIPAA-compliant systems, we adapt our expertise to your specific needs.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 mt-8">
              <div className="aspect-[4/5] rounded-3xl bg-blue-100 dark:bg-blue-900/20 overflow-hidden relative shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/50 to-transparent"></div>
              </div>
              <div className="aspect-square rounded-3xl bg-violet-100 dark:bg-violet-900/20 overflow-hidden relative shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-violet-600/50 to-transparent"></div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="aspect-square rounded-3xl bg-teal-100 dark:bg-teal-900/20 overflow-hidden relative shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-teal-600/50 to-transparent"></div>
              </div>
              <div className="aspect-[4/5] rounded-3xl bg-amber-100 dark:bg-amber-900/20 overflow-hidden relative shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-amber-600/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-32">
          <h2 className="text-3xl font-heading font-bold text-center text-gray-900 dark:text-white mb-16">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Excellence", desc: "We never compromise on quality. Every line of code, every pixel is crafted with precision." },
              { title: "Transparency", desc: "No black boxes. We communicate openly about progress, challenges, and timelines." },
              { title: "Innovation", desc: "We constantly research and adopt emerging technologies to give you a competitive edge." }
            ].map((val, i) => (
              <div key={i} className="glass-card-light dark:glass-card p-10 rounded-3xl text-center">
                <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-4">{val.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Preview */}
        <div className="text-center mb-32">
          <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-6">Meet the Minds</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Our diverse team of experts brings decades of combined experience in software engineering, design, and product strategy.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Alex Mercer", role: "Technical Director", color: "bg-blue-100 dark:bg-blue-900/30" },
              { name: "Sarah Chen", role: "Lead UI/UX", color: "bg-purple-100 dark:bg-purple-900/30" },
              { name: "David Kim", role: "Senior Full-Stack", color: "bg-emerald-100 dark:bg-emerald-900/30" },
              { name: "Elena Rostova", role: "Project Manager", color: "bg-amber-100 dark:bg-amber-900/30" }
            ].map((member, i) => (
              <div key={i} className="group">
                <div className={`aspect-square rounded-3xl ${member.color} mb-6 overflow-hidden relative shadow-lg`}>
                  {/* Placeholder for actual images */}
                  <div className="absolute inset-0 flex items-center justify-center text-4xl font-heading font-bold text-black/10 dark:text-white/10">
                    {member.name.charAt(0)}
                  </div>
                </div>
                <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-gray-500 dark:text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 relative z-10">Ready to join forces?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto relative z-10">
            Let's discuss how our team can help bring your vision to life.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-full font-bold text-lg transition-colors relative z-10 shadow-xl">
            Contact Us <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
