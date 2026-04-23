import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Lightbulb, Rocket, ShieldCheck, Sparkles } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import { getSiteSettings, getSiteUrl, getTeamMembers } from "@/lib/site-content";

export async function generateMetadata() {
  return {
    title: "About",
    description:
      "Learn about DevMind Studio's mission, story, values, and the team building premium software for ambitious companies.",
    openGraph: {
      title: "About DevMind Studio",
      description:
        "Mission, story, values, and team behind DevMind Studio.",
      url: `${getSiteUrl()}/about`,
    },
  };
}

export default async function AboutPage() {
  const [settings, team] = await Promise.all([getSiteSettings(), getTeamMembers()]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-28 text-white">
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">About Us</p>
          <h1 className="mt-4 font-heading text-5xl font-bold md:text-6xl">
            We started DevMind Studio to make digital product delivery feel clear again.
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Since 2021, we&apos;ve helped teams turn rough concepts into polished software with stronger design decisions, healthier engineering foundations, and more reliable launch plans.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h2 className="font-heading text-3xl font-bold text-white">Our Story</h2>
            <div className="mt-5 space-y-5 text-sm leading-7 text-slate-300">
              <p>
                DevMind Studio was founded in Ahmedabad to close the gap between ambitious product goals and the reality of fragmented delivery.
              </p>
              <p>
                Too many teams were choosing between speed and quality. We built our studio around both: thoughtful product design, modern engineering, and delivery habits clients can actually trust.
              </p>
              <p>
                Today we partner with startups, operators, and growing companies who need web apps, SaaS products, internal systems, and AI-enabled workflows that are ready for real business use.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Clients", value: 50, suffix: "+" },
              { label: "Projects", value: 100, suffix: "+" },
              { label: "Years", value: 5, suffix: "" },
              { label: "Satisfaction", value: 99, suffix: "%" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >
                <div className="font-heading text-4xl font-bold text-white">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-sm text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <section className="mt-20">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">Values</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: Lightbulb, title: "Innovation", copy: "We look for smarter ways to solve problems without overcomplicating the product." },
              { icon: ShieldCheck, title: "Quality", copy: "We care about reliability, clarity, and the details users feel immediately." },
              { icon: Sparkles, title: "Transparency", copy: "We surface tradeoffs early so projects stay aligned and trust stays high." },
              { icon: Rocket, title: "Speed", copy: "We move fast by making good decisions early, not by cutting the wrong corners." },
            ].map((value) => (
              <div
                key={value.title}
                className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >
                <div className="inline-flex rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 p-3 text-blue-200">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-heading text-2xl font-bold text-white">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{value.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-300">Team</p>
          <h2 className="mt-4 font-heading text-4xl font-bold text-white md:text-5xl">
            The people behind the delivery.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {team.map((member) => (
              <div
                key={member.id}
                className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5"
              >
                <div className="relative aspect-square">
                  <Image
                    src={member.photoUrl}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-xl font-bold text-white">{member.name}</h3>
                  <p className="mt-2 text-sm text-slate-300">{member.role}</p>
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex text-sm font-semibold text-blue-300 transition hover:text-white"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-[2rem] border border-white/10 bg-gradient-to-r from-blue-500/15 to-violet-500/15 p-8 text-center">
          <h2 className="font-heading text-4xl font-bold text-white">Join our next chapter.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            We&apos;re building with clients across web, SaaS, AI, and mobile. If that sounds like your kind of work, we&apos;d love to meet you.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/careers"
              className="btn-glow inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-4 font-semibold text-white"
            >
              Join Our Team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <a
              href={`mailto:${settings.email}`}
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-slate-100"
            >
              {settings.email}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
