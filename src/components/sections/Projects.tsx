"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, BookOpen, Building2, Check, Github, MessageCircle, ShoppingCart, X } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import { cn, EASE } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";

const icons = { building: Building2, cart: ShoppingCart, chat: MessageCircle, book: BookOpen } as const;

/** Gradient banner with a floating icon and chips — used on the card and in the modal. */

/** Displays the real project screenshot in the card and modal. */
function ProjectVisual({
  p,
  className,
}: {
  p: Project;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-slate-900",
        className
      )}
    >
      {p.image ? (
        <img
          src={p.image}
          alt={`${p.title} screenshot`}
          className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105"
        />
      ) : (
        <div
          className="grid h-full w-full place-items-center"
          style={{
            background: `linear-gradient(135deg, ${p.from}, ${p.to})`,
          }}
        >
          <span className="text-2xl font-semibold text-white">
            {p.title}
          </span>
        </div>
      )}
    </div>
  );
}



function ProjectCard({ p, index, onOpen }: { p: Project; index: number; onOpen: (p: Project) => void }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-5, 5]), { stiffness: 180, damping: 18 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.12, ease: EASE }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="will-transform"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onMouseLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
      >
        <div
          role="button"
          tabIndex={0}
          aria-label={`Open details for ${p.title}`}
          onClick={() => onOpen(p)}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen(p)}
        >
          <SpotlightCard color={`${p.from}30`} className="h-full">
            <motion.div layoutId={`visual-${p.id}`} className="h-56 overflow-hidden">
              <ProjectVisual p={p} className="h-full w-full" />
            </motion.div>
            <div className="p-7">
              <p className="font-mono text-xs text-slate-500">{p.category}</p>
              <h3 className="mt-2 flex items-start justify-between gap-4 text-2xl font-semibold text-white">
                {p.title}
                <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 transition-all duration-300 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-white group-hover:text-ink">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </h3>
              <p className="mt-3 text-slate-400">{p.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {p.tech.slice(0, 5).map((t) => (
                  <li key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </SpotlightCard>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectModal({ p, onClose }: { p: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!p) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [p, onClose]);

  return (
    <AnimatePresence>
      {p && (
        <motion.div
          key="overlay"
          data-lenis-prevent
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={p.title}
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />
          <motion.div
            initial={{ y: 40, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 30, scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-3xl border border-white/10 bg-ink-800 shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/70"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.div layoutId={`visual-${p.id}`} className="h-64 overflow-hidden">
              <ProjectVisual p={p} className="h-full w-full" />
            </motion.div>

            <div className="p-8 sm:p-10">
              <p className="font-mono text-xs text-slate-500">{p.category}</p>
              <h3 className="mt-2 text-3xl font-bold text-white sm:text-4xl">{p.title}</h3>
              <p className="mt-4 text-lg text-slate-400">{p.details}</p>

              <h4 className="mt-8 text-sm font-semibold text-white">What it does</h4>
              <ul className="mt-3 space-y-3">
                {p.features.map((f, i) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.06 }}
                    className="flex items-start gap-3 text-slate-300"
                  >
                    <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
                      <Check className="h-3 w-3" />
                    </span>
                    {f}
                  </motion.li>
                ))}
              </ul>

              <h4 className="mt-8 text-sm font-semibold text-white">Built with</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <li key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={p.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-slate-200"
                >
                  Open live site <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <Github className="h-4 w-4" /> View source
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-28 sm:py-40">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-brand-violet/10 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          title="Products I've"
          highlight="built and shipped"
          subtitle="Four full-stack projects, from a subscription SaaS to a real-time chat. Click any card for the details."
        />
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={i} onOpen={setSelected} />
          ))}
        </div>
      </div>
      <ProjectModal p={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
