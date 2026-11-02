"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "primary" | "ghost" | "compact";
  className?: string;
};

const variants = {
  primary:
    "bg-gradient-to-r from-brand-violet to-brand-cyan px-7 py-3.5 text-sm text-white shadow-glow",
  ghost: "glass px-7 py-3.5 text-sm text-white hover:bg-white/10",
  compact: "glass px-4 py-2 text-xs text-white hover:bg-white/10",
};

export default function ResumeButton({
  variant = "primary",
  className,
}: Props) {
  return (
    <motion.a
      href="/resume.pdf"
      download="Nayan_Mondal_Resume.pdf"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "group relative inline-flex items-center gap-2 overflow-hidden rounded-full font-semibold",
        variants[variant],
        className
      )}
    >
      <Download className="h-4 w-4" />
      <span>Download CV</span>
    </motion.a>
  );
}