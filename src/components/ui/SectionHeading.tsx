"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/utils";

type Props = { title: string; highlight?: string; subtitle?: string; label?: string };

/** Heading whose lines slide up from a clipped mask when scrolled into view. */
export default function SectionHeading({ title, highlight, subtitle, label }: Props) {
  const line = (children: React.ReactNode, delay: number) => (
    <span className="block overflow-hidden pb-2">
      <motion.span
        className="block will-transform"
        initial={{ y: "110%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );

  return (
    <div className="max-w-3xl">
      {label && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-4 font-mono text-sm text-brand-cyan"
        >
          {label}
        </motion.p>
      )}
      <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
        {line(title, 0)}
        {highlight && line(<span className="text-gradient">{highlight}</span>, 0.1)}
      </h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-5 max-w-xl text-lg text-slate-400"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
