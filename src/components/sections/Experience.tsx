"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import { gsap } from "@/lib/gsap";
import { cn, EASE } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Experience() {
  const wrap = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // The glowing line draws itself as you scroll down the timeline
      gsap.fromTo(
        fill.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: { trigger: wrap.current, start: "top 65%", end: "bottom 60%", scrub: 0.6 },
        }
      );
      // Each node lights up when the line reaches it
      gsap.utils.toArray<HTMLElement>("[data-dot]").forEach((dot) => {
        gsap.fromTo(
          dot,
          { scale: 0.5, backgroundColor: "#1b2038", boxShadow: "0 0 0 0 rgba(124,92,255,0)" },
          {
            scale: 1,
            backgroundColor: "#7c5cff",
            boxShadow: "0 0 24px 4px rgba(124,92,255,0.7)",
            duration: 0.5,
            scrollTrigger: { trigger: dot, start: "top 65%", toggleActions: "play none none reverse" },
          }
        );
      });
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="relative py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading title="How I got" highlight="here" subtitle="A timeline of what I've been building and learning." />

        <div ref={wrap} className="relative mt-20">
          <div className="absolute bottom-0 left-4 top-0 w-px bg-white/10 md:left-1/2" />
          <div
            ref={fill}
            className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-brand-violet via-brand-cyan to-brand-pink will-transform md:left-1/2"
          />

          <ul className="space-y-14">
            {experience.map((e, i) => {
              const right = i % 2 === 1;
              return (
                <li
                  key={e.title}
                  className={cn("relative pl-12 md:w-1/2 md:pl-0", right ? "md:ml-auto md:pl-14" : "md:pr-14 md:text-right")}
                >
                  <div
                    className={cn(
                      "absolute top-2 left-4 -translate-x-1/2",
                      right ? "md:left-0" : "md:left-auto md:right-0 md:translate-x-1/2"
                    )}
                  >
                    <span data-dot className="block h-4 w-4 rounded-full border-2 border-ink" />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: right ? 60 : -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.9, ease: EASE }}
                    className="glass rounded-3xl p-7"
                  >
                    <p className="font-mono text-sm text-brand-cyan">{e.period}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">{e.title}</h3>
                    <p className="text-sm text-slate-500">{e.org}</p>
                    <p className="mt-4 text-slate-400">{e.description}</p>
                    <ul className={cn("mt-5 flex flex-wrap gap-2", !right && "md:justify-end")}>
                      {e.tags.map((t) => (
                        <li key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
