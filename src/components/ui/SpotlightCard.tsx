"use client";

import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** Any CSS colour for the soft inner glow that follows the cursor */
  color?: string;
};

/** Card with a cursor-following spotlight and glowing border. */
export default function SpotlightCard({ children, className, color = "rgba(124,92,255,0.16)" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(520px circle at var(--mx, 50%) var(--my, 50%), ${color}, transparent 45%)` }}
      />
      <div className="spotlight-border" />
      <div className="relative">{children}</div>
    </div>
  );
}
