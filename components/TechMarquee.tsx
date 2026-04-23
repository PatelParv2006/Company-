"use client";

import {
  SiDocker,
  SiFirebase,
  SiFlutter,
  SiGit,
  SiGo,
  SiGraphql,
  SiJavascript,
  SiKotlin,
  SiKubernetes,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRust,
  SiSwift,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { LuCloud } from "react-icons/lu";

const techStack = [
  { name: "JavaScript", color: "#F7DF1E", Icon: SiJavascript },
  { name: "TypeScript", color: "#3178C6", Icon: SiTypescript },
  { name: "Python", color: "#3776AB", Icon: SiPython },
  { name: "React", color: "#61DAFB", Icon: SiReact },
  { name: "Next.js", color: "#ffffff", Icon: SiNextdotjs },
  { name: "Node.js", color: "#339933", Icon: SiNodedotjs },
  { name: "Flutter", color: "#02569B", Icon: SiFlutter },
  { name: "Swift", color: "#F05138", Icon: SiSwift },
  { name: "Kotlin", color: "#7F52FF", Icon: SiKotlin },
  { name: "Go", color: "#00ADD8", Icon: SiGo },
  { name: "Rust", color: "#DEA584", Icon: SiRust },
  { name: "PostgreSQL", color: "#4169E1", Icon: SiPostgresql },
  { name: "MongoDB", color: "#47A248", Icon: SiMongodb },
  { name: "Docker", color: "#2496ED", Icon: SiDocker },
  { name: "Kubernetes", color: "#326CE5", Icon: SiKubernetes },
  { name: "AWS", color: "#FF9900", Icon: LuCloud },
  { name: "Firebase", color: "#FFCA28", Icon: SiFirebase },
  { name: "GraphQL", color: "#E10098", Icon: SiGraphql },
  { name: "Tailwind CSS", color: "#38BDF8", Icon: SiTailwindcss },
  { name: "Git", color: "#F05032", Icon: SiGit },
];

interface TechMarqueeProps {
  reverse?: boolean;
  className?: string;
}

export default function TechMarquee({ reverse = false, className = "" }: TechMarqueeProps) {
  const items = [...techStack, ...techStack]; // Duplicate for seamless loop

  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={`flex gap-6 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ width: "max-content" }}
      >
        {items.map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/5 dark:bg-white/[0.03] border border-gray-200/50 dark:border-white/[0.06] hover:border-blue-500/30 dark:hover:border-blue-500/20 transition-all duration-300 group shrink-0 backdrop-blur-sm"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-black/80 dark:text-white/90 shrink-0 transition-transform group-hover:scale-110"
              style={{ backgroundColor: `${tech.color}20`, border: `1px solid ${tech.color}40` }}
            >
              <tech.Icon className="h-4 w-4" style={{ color: tech.color }} aria-hidden="true" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
