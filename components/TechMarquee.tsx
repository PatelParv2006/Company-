"use client";

const techStack = [
  { name: "JavaScript", color: "#F7DF1E", icon: "JS" },
  { name: "TypeScript", color: "#3178C6", icon: "TS" },
  { name: "Python", color: "#3776AB", icon: "Py" },
  { name: "React", color: "#61DAFB", icon: "Re" },
  { name: "Next.js", color: "#ffffff", icon: "Nx" },
  { name: "Node.js", color: "#339933", icon: "No" },
  { name: "Flutter", color: "#02569B", icon: "Fl" },
  { name: "Swift", color: "#F05138", icon: "Sw" },
  { name: "Kotlin", color: "#7F52FF", icon: "Kt" },
  { name: "Go", color: "#00ADD8", icon: "Go" },
  { name: "Rust", color: "#DEA584", icon: "Rs" },
  { name: "PostgreSQL", color: "#4169E1", icon: "Pg" },
  { name: "MongoDB", color: "#47A248", icon: "Mg" },
  { name: "Docker", color: "#2496ED", icon: "Dk" },
  { name: "Kubernetes", color: "#326CE5", icon: "K8" },
  { name: "AWS", color: "#FF9900", icon: "AW" },
  { name: "Firebase", color: "#FFCA28", icon: "Fb" },
  { name: "GraphQL", color: "#E10098", icon: "GQ" },
  { name: "Tailwind CSS", color: "#38BDF8", icon: "Tw" },
  { name: "Git", color: "#F05032", icon: "Gt" },
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
              {tech.icon}
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
