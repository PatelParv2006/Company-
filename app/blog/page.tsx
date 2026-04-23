import Image from "next/image";
import Link from "next/link";
import { getBlogPosts, getSiteUrl } from "@/lib/site-content";

export async function generateMetadata() {
  return {
    title: "Blog",
    description:
      "Read DevMind Studio articles on budgeting software, SaaS product strategy, dashboards, and shipping AI responsibly.",
    openGraph: {
      title: "DevMind Studio Blog",
      description:
        "Notes and insights from the studio on product design, engineering, and AI delivery.",
      url: `${getSiteUrl()}/blog`,
    },
  };
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-28 text-white">
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">Blog</p>
          <h1 className="mt-4 font-heading text-5xl font-bold md:text-6xl">
            Product, engineering, and AI notes from the studio.
          </h1>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5 transition hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={post.thumbnailUrl}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="mt-4 font-heading text-2xl font-bold text-white">{post.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">{post.excerpt}</p>
                <p className="mt-5 text-xs uppercase tracking-[0.22em] text-slate-400">
                  {new Date(post.createdAt).toLocaleDateString()}
                  {" · "}
                  {post.author}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
