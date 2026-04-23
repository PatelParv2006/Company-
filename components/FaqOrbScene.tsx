"use client";

import { motion } from "framer-motion";

export default function FaqOrbScene() {
  return (
    <div className="relative mt-10 hidden h-72 w-full overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--bg-secondary)]/70 lg:block">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(79,142,247,0.22),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(155,109,255,0.22),transparent_42%)]" />
      <div className="absolute inset-0 opacity-60 [perspective:1000px]">
        <motion.div
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, #ffffff, #93c5fd 28%, #4f8ef7 60%, #7c3aed 100%)",
            boxShadow:
              "0 30px 70px rgba(79,142,247,0.28), inset -20px -24px 36px rgba(20,20,35,0.3), inset 10px 10px 22px rgba(255,255,255,0.35)",
          }}
          animate={{
            rotateY: [0, 360],
            rotateX: [12, -12, 12],
            y: [0, -12, 0],
          }}
          transition={{
            rotateY: { duration: 11, repeat: Infinity, ease: "linear" },
            rotateX: { duration: 7, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      </div>

      <motion.div
        className="absolute left-8 top-10 h-2.5 w-2.5 rounded-full bg-cyan-300"
        animate={{ y: [0, -20, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-10 top-20 h-3 w-3 rounded-full bg-violet-300"
        animate={{ y: [0, 16, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      />
      <motion.div
        className="absolute bottom-12 left-1/3 h-2 w-2 rounded-full bg-blue-300"
        animate={{ y: [0, -14, 0], opacity: [0.35, 0.85, 0.35] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />
    </div>
  );
}

