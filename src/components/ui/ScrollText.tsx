"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Oversized text band that slides horizontally as you scroll (GSAP scrub). */
export default function ScrollText({ text, reverse = false }: { text: string; reverse?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        track.current,
        { xPercent: reverse ? -28 : 0 },
        {
          xPercent: reverse ? 0 : -28,
          ease: "none",
          scrollTrigger: { trigger: wrap.current, start: "top bottom", end: "bottom top", scrub: 0.8 },
        }
      );
    }, wrap);
    return () => ctx.revert();
  }, [reverse]);

  const repeated = Array.from({ length: 5 }, () => text).join("");

  return (
    <div ref={wrap} aria-hidden className="overflow-hidden border-y border-white/5 py-6">
      <div
        ref={track}
        className="gpu whitespace-nowrap font-display text-[14vw] font-extrabold leading-none outline-text sm:text-[9vw]"
      >
        {repeated}
      </div>
    </div>
  );
}
