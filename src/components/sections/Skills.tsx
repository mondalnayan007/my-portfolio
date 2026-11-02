"use client";

import { motion } from "framer-motion";
import { Database, Layout, Server, Wrench } from "lucide-react";
import { marqueeSkills, skillGroups } from "@/lib/data";
import { cn, EASE } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";

const icons = { layout: Layout, server: Server, database: Database, wrench: Wrench };

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]">
      <div
        className={cn(
          "flex w-max gap-4 pr-4 animate-marquee will-transform group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]"
        )}
      >
        {doubled.map((s, i) => (
          <span
            key={i}
            className="glass whitespace-nowrap rounded-full px-6 py-3 font-display text-lg font-semibold text-white"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 sm:py-40">
      <div className="mx-auto  max-w-7xl px-6">
        <SectionHeading title="The tools I" highlight="reach for first" />

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {skillGroups.map((g, gi) => {
            const Icon = icons[g.icon];
            return (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: (gi % 2) * 0.1, ease: EASE }}
              >
                <SpotlightCard className="h-full p-8">
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-violet/30 to-brand-cyan/30 text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="text-2xl font-semibold text-white">{g.title}</h3>
                  </div>
                  <ul className="mt-7 flex flex-wrap gap-2.5">
                    {g.items.map((s, i) => (
                      <motion.li
                        key={s}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.05, type: "spring", stiffness: 300, damping: 20 }}
                        whileHover={{ y: -3, scale: 1.06 }}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition-colors hover:border-brand-cyan/50 hover:bg-brand-cyan/10"
                      >
                        {s}
                      </motion.li>
                    ))}
                  </ul>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-20 space-y-4">
        <MarqueeRow items={marqueeSkills} />
        <MarqueeRow items={[...marqueeSkills].reverse()} reverse />
      </div>
    </section>
  );
}
