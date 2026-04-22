import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Blog",
  description: "Insights, tutorials, and engineering deep-dives from the DevMind Studio team.",
};

// Mock data (will be replaced by Supabase data later)
const posts = [
  {
    id: "1",
    slug: "migrating-to-nextjs-15",
    title: "Why we migrated our entire stack to Next.js 15",
    excerpt: "A deep dive into the performance benefits, new features, and challenges we faced upgrading to the latest App Router architecture.",
    date: "April 15, 2026",
    category: "Engineering",
    grad: "from-blue-500 to-cyan-500"
  },
  {
    id: "2",
    slug: "design-system-scaling",
    title: "Scaling Design Systems for Enterprise SaaS",
    excerpt: "How to maintain consistency across 100+ components while keeping bundle sizes small and developers happy.",
    date: "April 02, 2026",
    category: "Design",
    grad: "from-purple-500 to-pink-500"
  },
  {
    id: "3",
    slug: "ai-in-production",
    title: "Lessons learned deploying AI agents to production",
    excerpt: "From prompt engineering to rate limiting: a practical guide to building resilient LLM-powered applications.",
    date: "March 20, 2026",
    category: "AI",
    grad: "from-emerald-500 to-teal-500"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#030712] pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            Our <span className="text-blue-600 dark:text-blue-500">Insights</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Thoughts, tutorials, and deep-dives into software engineering, product design, and the future of technology.
          </p>
        </div>

        {/* Featured Post (First one) */}
        {posts.length > 0 && (
          <div className="mb-16">
            <Link href={`/blog/${posts[0].slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center glass-card-light dark:glass-card p-4 sm:p-8 rounded-3xl overflow-hidden relative transition-transform hover:-translate-y-2">
                <div className={`aspect-[4/3] lg:aspect-square rounded-2xl bg-gradient-to-br ${posts[0].grad} shadow-lg relative overflow-hidden`}>
                   <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className="p-4 lg:p-8">
                  <div className="flex items-center gap-4 mb-6 text-sm">
                    <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium">
                      {posts[0].category}
                    </span>
                    <span className="text-gray-500 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" /> {posts[0].date}
                    </span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {posts[0].title}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                    {posts[0].excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 font-medium text-blue-600 dark:text-blue-400">
                    Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Grid Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(1).map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
              <div className="glass-card-light dark:glass-card p-4 rounded-3xl transition-transform hover:-translate-y-2 h-full flex flex-col">
                <div className={`aspect-video rounded-2xl bg-gradient-to-br ${post.grad} mb-6 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className="px-2 flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-4 text-sm">
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      {post.category}
                    </span>
                    <span className="text-gray-500">
                      {post.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 flex-1">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors pb-2">
                    Read More <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
