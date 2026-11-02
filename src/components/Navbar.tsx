"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn, EASE, INTRO_DELAY } from "@/lib/utils";
import { navLinks } from "@/lib/data";
import ResumeButton from "@/components/ResumeButton";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navLinks.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: INTRO_DELAY, duration: 0.9, ease: EASE }}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      >
        <nav
          className={cn(
            "flex w-full max-w-5xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-500",
            scrolled ? "border-white/10 bg-ink/70 shadow-2xl backdrop-blur-xl" : "border-transparent bg-transparent"
          )}
        >
          <a href="#home" className="flex items-center gap-2 pl-3 font-display text-lg font-bold text-white">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-brand-violet to-brand-cyan text-sm">
              N
            </span>
            <span className="hidden sm:inline">Nayan Mondal</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm transition-colors",
                    active === l.id ? "text-white" : "text-slate-400 hover:text-white"
                  )}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <ResumeButton variant="compact" />
            </div>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-full text-white md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-ink/95 backdrop-blur-xl md:hidden"
          >
            {navLinks.map((l, i) => (
              <motion.a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i, ease: EASE, duration: 0.6 }}
                className="font-display text-4xl font-bold text-white"
              >
                {l.label}
              </motion.a>
            ))}
            <ResumeButton variant="primary" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
