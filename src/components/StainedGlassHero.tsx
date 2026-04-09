import type { ReactNode } from "react";
import { motion } from "motion/react";

export function StainedGlassHero({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative pt-32 md:pt-36 pb-20 md:pb-28 overflow-hidden bg-kr-cream">
      {/* Decorative circles in background */}
      <div className="absolute top-20 -right-24 w-[350px] h-[350px] rounded-full bg-kr-coral/[0.06]" />
      <div className="absolute -bottom-16 -left-16 w-[280px] h-[280px] rounded-full bg-kr-teal/[0.06]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-kr-navy/[0.02]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Navy circle badge for page title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex flex-col items-center justify-center w-[220px] h-[220px] md:w-[280px] md:h-[280px] rounded-full bg-kr-navy mx-auto shadow-[0_8px_40px_rgba(58,73,114,0.3)]"
        >
          <span className="font-caps text-[10px] md:text-[11px] font-medium tracking-[0.25em] uppercase text-white/60 mb-2">
            {subtitle || "Kol Rina"}
          </span>
          <div className="gold-double-rule w-24 md:w-32 mb-2" />
          <h1 className="font-script text-3xl md:text-5xl text-kr-gold drop-shadow-[0_2px_8px_rgba(179,153,98,0.3)]">
            {title}
          </h1>
          <div className="gold-double-rule w-24 md:w-32 mt-2" />
        </motion.div>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="mt-10"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
