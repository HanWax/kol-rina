import type { ReactNode } from "react";
import { motion } from "motion/react";

export function SectionHeading({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <motion.div
      className="mb-10 text-center"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2
        className={`font-caps text-[13px] md:text-[14px] font-semibold tracking-[0.25em] uppercase mb-0 ${
          light ? "text-white" : "text-kr-navy"
        }`}
      >
        {children}
      </h2>
      <div className="flex items-center justify-center gap-2 mt-3">
        <div
          className={`h-[1.5px] w-8 ${light ? "bg-kr-gold/40" : "bg-kr-navy/20"}`}
        />
        <div
          className={`w-1.5 h-1.5 rounded-full ${light ? "bg-kr-gold/60" : "bg-kr-gold"}`}
        />
        <div
          className={`h-[1.5px] w-8 ${light ? "bg-kr-gold/40" : "bg-kr-navy/20"}`}
        />
      </div>
    </motion.div>
  );
}
