import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronRight, BarChart3, Code2, Globe, Layout, Lightbulb, Smartphone, ShieldCheck, Zap } from "lucide-react";
import TechMarquee from "@/components/TechMarquee";
import ParticleGrid from "@/components/ParticleGrid";
import AnimatedCounter from "@/components/AnimatedCounter";
import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data } = await supabase
    .from('projects')
    .select('*')
    .eq('is_featured', true)
    .limit(3);
  const featuredProjects = data || [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex items-center justify-center min-h-[90vh]">
        <ParticleGrid />
        
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen dark:mix-blend-color-dodge" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-violet-500/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen dark:mix-blend-color-dodge" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium text-sm mb-8 border border-blue-200 dark:border-blue-500/20 animate-float">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Premium Software Development Agency
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
            We Build Digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
              Masterpieces
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto font-light">
            DevMind Studio engineers high-performance web applications, SaaS platforms, and mobile experiences for visionary brands.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/estimator" className="w-full sm:w-auto btn-glow bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2">
              Estimate Project <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/projects" className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-lg text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors flex items-center justify-center border border-gray-200 dark:border-white/10">
              View Portfolio
            </Link>
          </div>

          <div className="mt-20 pt-10 border-t border-gray-200/50 dark:border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: "Clients", value: 50, suffix: "+" },
              { label: "Projects", value: 120, suffix: "+" },
              { label: "Years Exp", value: 5, suffix: "+" },
              { label: "Satisfaction", value: 99, suffix: "%" }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-1">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Marquee */}
      <section className="py-10 border-y border-gray-200/50 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.01]">
        <TechMarquee />
      </section>

      {/* Services Section */}
      <section className="py-24 md:py-32 bg-white dark:bg-[#030712] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase mb-3">Our Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white">Services we deliver</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Web Applications",
                desc: "High-performance, scalable web apps built with Next.js and React."
              },
              {
                icon: <Smartphone className="w-8 h-8" />,
                title: "Mobile Development",
                desc: "Native-feeling iOS and Android apps using React Native and Flutter."
              },
              {
                icon: <Layout className="w-8 h-8" />,
                title: "SaaS Platforms",
                desc: "End-to-end SaaS architecture with multi-tenancy and subscription billing."
              },
              {
                icon: <ShieldCheck className="w-8 h-8" />,
                title: "Enterprise Software",
                desc: "Secure, compliant, and robust systems for large organizations."
              },
              {
                icon: <Code2 className="w-8 h-8" />,
                title: "API Development",
                desc: "RESTful and GraphQL APIs built for speed and reliability."
              },
              {
                icon: <Lightbulb className="w-8 h-8" />,
                title: "UI/UX Design",
                desc: "Stunning, user-centric interfaces that convert and engage."
              }
            ].map((service, i) => (
              <div key={i} className="glass-card-light dark:glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h4 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">{service.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 md:py-32 bg-gray-50 dark:bg-[#0a0f1e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase mb-3">Selected Work</h2>
              <h3 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white">Featured Projects</h3>
            </div>
            <Link href="/projects" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all">
              View All Work <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`} className="group block">
                <div className={`aspect-video rounded-3xl mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 p-8 flex flex-col justify-between overflow-hidden relative shadow-lg`}>
                  {project.image_url && (
                    <img src={project.image_url} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  <span className="relative z-10 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-sm font-medium text-white w-fit border border-white/30">
                    {project.category}
                  </span>
                  <div className="relative z-10 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex items-center gap-2 text-white font-medium">
                      View Case Study <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
                <h4 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 md:py-32 bg-white dark:bg-[#030712] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase mb-3">How we work</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 dark:text-white">Our proven process</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-[2px] bg-gradient-to-r from-blue-100 via-blue-500 to-blue-100 dark:from-blue-900/30 dark:via-blue-500/50 dark:to-blue-900/30" />

            {[
              { step: "01", title: "Discovery", desc: "We deep-dive into your requirements, market, and goals to craft a strategic roadmap." },
              { step: "02", title: "Design", desc: "Our UX/UI team creates stunning, intuitive interfaces that your users will love." },
              { step: "03", title: "Development", desc: "We build scalable, high-performance architecture using modern tech stacks." },
              { step: "04", title: "Delivery", desc: "Rigorous testing followed by seamless deployment and ongoing support." }
            ].map((item, i) => (
              <div key={i} className="relative pt-8">
                <div className="w-24 h-24 rounded-full bg-white dark:bg-[#0a0f1e] border-4 border-blue-50 dark:border-[#030712] shadow-xl flex items-center justify-center text-2xl font-heading font-bold text-blue-600 dark:text-blue-400 absolute -top-4 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 z-10">
                  {item.step}
                </div>
                <div className="text-center md:text-left mt-16 md:mt-20">
                  <h4 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">{item.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-violet-700"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            Ready to build the next big thing?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Let's turn your vision into reality. Get a detailed estimate for your project in minutes, or contact us directly to discuss your requirements.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/contact" className="btn-glow bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl">
              Contact Us Now
            </Link>
            <Link href="/estimator" className="px-8 py-4 rounded-xl font-bold text-lg text-white border border-white/30 hover:bg-white/10 transition-colors backdrop-blur-sm">
              Try Project Estimator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
