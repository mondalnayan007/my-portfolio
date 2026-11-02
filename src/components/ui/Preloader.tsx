"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/utils";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const duration = 1700;
    const start = performance.now();
    let raf = 0;
    let timer = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        timer = window.setTimeout(() => {
          setVisible(false);
          document.body.style.overflow = "";
        }, 250);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-ink will-transform"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex overflow-hidden font-display text-6xl font-extrabold tracking-tight text-white sm:text-8xl">
            {"Nayan".split("").map((c, i) => (
              <motion.span
                key={i}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.08 * i, duration: 0.8, ease: EASE }}
                className="inline-block"
              >
                {c}
              </motion.span>
            ))}
          </div>

          <div className="mt-10 h-px w-56 overflow-hidden bg-white/10 sm:w-80">
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-brand-violet to-brand-cyan"
              style={{ scaleX: count / 100 }}
            />
          </div>
          <p className="mt-4 font-mono text-sm tabular-nums text-slate-500">{count}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
