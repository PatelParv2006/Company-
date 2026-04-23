import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getBlogPostBySlug, getBlogPosts, getSiteUrl } from "@/lib/site-content";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${getSiteUrl()}/blog/${post.slug}`,
      images: [post.thumbnailUrl],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-28 text-white">
      <article className="mx-auto max-w-4xl px-4 pb-24 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <div className="mt-8">
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
          <h1 className="mt-5 font-heading text-5xl font-bold md:text-6xl">{post.title}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">{post.excerpt}</p>
          <p className="mt-6 text-sm text-slate-400">
            {new Date(post.createdAt).toLocaleDateString()} · {post.author}
          </p>
        </div>

        <div className="relative mt-10 overflow-hidden rounded-[2rem] border border-white/10">
          <div className="relative aspect-[16/9]">
            <Image
              src={post.thumbnailUrl}
              alt={post.title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div
          className="prose prose-invert mt-10 max-w-none prose-headings:font-heading prose-headings:text-white prose-p:text-slate-300 prose-li:text-slate-300"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
