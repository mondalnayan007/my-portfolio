"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/** Paragraph whose words light up one by one as you scroll through it. */
export default function TextReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-word]"),
        { opacity: 0.14, y: 8 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 50%", scrub: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <p ref={ref} className={cn(className)}>
      {text.split(" ").map((w, i) => (
        <span key={i} data-word className="mr-[0.26em] inline-block will-both">
          {w}
        </span>
      ))}
    </p>
  );
}
