"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView } from "framer-motion";
import { profile, stats } from "@/lib/data";
import { EASE } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";
import TextReveal from "@/components/ui/TextReveal";
import SpotlightCard from "@/components/ui/SpotlightCard";

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

function CodeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, rotate: 3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: EASE }}
      whileHover={{ rotate: -1.5, scale: 1.02 }}
      className="will-transform"
    >
      <SpotlightCard className="font-mono text-[13px] leading-7 sm:text-sm">
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
          <span className="h-3 w-3 rounded-full bg-rose-400/80" />
          <span className="h-3 w-3 rounded-full bg-amber-400/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          <span className="ml-3 text-xs text-slate-500">nayan.ts</span>
        </div>
        <pre className="overflow-x-auto p-5 text-slate-300">
          <code>
            <span className="text-brand-violet">const</span> <span className="text-brand-cyan">nayan</span> = {"{"}
            {"\n"}  role: <span className="text-emerald-300">&quot;MERN Stack Developer&quot;</span>,
            {"\n"}  stack: [<span className="text-emerald-300">&quot;MongoDB&quot;</span>,{" "}
            <span className="text-emerald-300">&quot;Express&quot;</span>,
            {"\n"}          <span className="text-emerald-300">&quot;React&quot;</span>,{" "}
            <span className="text-emerald-300">&quot;Node&quot;</span>],
            {"\n"}  builds: [<span className="text-emerald-300">&quot;SaaS&quot;</span>,{" "}
            <span className="text-emerald-300">&quot;Store&quot;</span>,
            {"\n"}           <span className="text-emerald-300">&quot;Chat&quot;</span>,{" "}
            <span className="text-emerald-300">&quot;Reader&quot;</span>],
            {"\n"}  caresAbout: <span className="text-emerald-300">&quot;speed &amp; smooth UI&quot;</span>,
            {"\n"}  hireable: <span className="text-brand-pink">true</span>,
            {"\n"}{"}"};
            <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-brand-cyan" />
          </code>
        </pre>
      </SpotlightCard>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-28 sm:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading title="A developer who" highlight="ships whole products" />

        <div className="mt-16 grid items-start gap-14 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <TextReveal text={profile.about} className="font-display text-2xl font-medium leading-snug text-white sm:text-3xl" />

            <dl className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.7, ease: EASE }}
                  className="border-l border-white/15 pl-5"
                >
                  <dt className="font-display text-5xl font-bold text-white">
                    <Counter to={s.value} suffix={s.suffix} />
                  </dt>
                  <dd className="mt-2 text-sm text-slate-400">{s.label}</dd>
                </motion.div>
              ))}
            </dl>
          </div>

          <CodeCard />
        </div>
      </div>
    </section>
  );
}
