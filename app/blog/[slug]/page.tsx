import Link from "next/link";
import { ArrowLeft, Calendar, Share2 } from "lucide-react";

const Twitter = (props: React.SVGProps<SVGSVGElement>) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>;
const Linkedin = (props: React.SVGProps<SVGSVGElement>) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>;
import { notFound } from "next/navigation";

// Mock data
const posts = [
  {
    id: "1",
    slug: "migrating-to-nextjs-15",
    title: "Why we migrated our entire stack to Next.js 15",
    content: `
      <p>Next.js 15 brings significant improvements to the App Router, caching mechanisms, and overall performance. At DevMind Studio, we are always looking for ways to build faster, more resilient applications for our clients.</p>
      <h2>The Push for Performance</h2>
      <p>Our decision wasn't taken lightly. The transition required migrating thousands of lines of code. However, the benefits in terms of Partial Prerendering (PPR) and stable Server Actions made the investment worthwhile.</p>
      <p>We've seen an average of 40% reduction in First Contentful Paint (FCP) across client dashboards.</p>
      <h2>Challenges Faced</h2>
      <p>The main hurdles involved updating third-party dependencies that were not yet compatible with React 19. We had to fork several libraries and submit pull requests upstream.</p>
    `,
    date: "April 15, 2026",
    category: "Engineering",
    author: "Alex Mercer",
    grad: "from-blue-500 to-cyan-500"
  }
];

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = posts.find(p => p.slug === resolvedParams.slug);

  if (!post) {
    // If not found in mock data, return 404 for now. Later this will fetch from Supabase.
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#030712] pt-24 pb-32">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-white mb-12 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
        
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6 text-sm">
            <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium">
              {post.category}
            </span>
            <span className="text-gray-500 flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> {post.date}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-between py-6 border-y border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center font-bold text-gray-600 dark:text-gray-300">
                {post.author.charAt(0)}
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{post.author}</div>
                <div className="text-sm text-gray-500">DevMind Studio</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 hover:text-blue-500 transition-colors">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors">
                <Linkedin className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        <div className={`aspect-video w-full rounded-3xl bg-gradient-to-br ${post.grad} mb-16 shadow-xl`}></div>

        <div 
          className="prose prose-lg dark:prose-invert max-w-none 
          prose-headings:font-heading prose-headings:font-bold 
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
          prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
          prose-a:text-blue-600 dark:prose-a:text-blue-400"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-24 pt-12 border-t border-gray-200 dark:border-gray-800 text-center">
          <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-6">Enjoyed this article?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto">Subscribe to our newsletter to get the latest engineering insights delivered to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input type="email" placeholder="Your email address" className="flex-1 px-4 py-3 rounded-xl bg-gray-100 dark:bg-white/5 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-[#0a0f1e] outline-none transition-all dark:text-white" />
            <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors">Subscribe</button>
          </div>
        </div>
      </article>
    </div>
  );
}
