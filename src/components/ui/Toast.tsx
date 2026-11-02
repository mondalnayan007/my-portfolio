"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info";
type ToastItem = { id: number; type: ToastType; title: string; message?: string };

const DURATION = 5000;

const ToastContext = createContext<{ toast: (t: Omit<ToastItem, "id">) => void } | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

const styles: Record<ToastType, { icon: typeof Info; ring: string; bar: string; text: string }> = {
  success: { icon: CheckCircle2, ring: "border-emerald-400/30", bar: "bg-emerald-400", text: "text-emerald-300" },
  error: { icon: XCircle, ring: "border-rose-400/30", bar: "bg-rose-400", text: "text-rose-300" },
  info: { icon: Info, ring: "border-cyan-400/30", bar: "bg-cyan-400", text: "text-cyan-300" },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const counter = useRef(0);

  const dismiss = useCallback((id: number) => setItems((p) => p.filter((t) => t.id !== id)), []);

  const toast = useCallback(
    (t: Omit<ToastItem, "id">) => {
      const id = ++counter.current;
      setItems((p) => [...p.slice(-3), { ...t, id }]);
      window.setTimeout(() => dismiss(id), DURATION);
    },
    [dismiss]
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-4 left-4 right-4 z-[120] flex flex-col items-end gap-3 sm:left-auto sm:w-[380px]"
      >
        <AnimatePresence mode="popLayout">
          {items.map((t) => {
            const s = styles[t.type];
            const Icon = s.icon;
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, x: 90, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 90, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
                className={cn(
                  "pointer-events-auto relative w-full overflow-hidden rounded-2xl border bg-ink-800/90 p-4 shadow-2xl backdrop-blur-xl",
                  s.ring
                )}
                role="status"
              >
                <div className="flex items-start gap-3">
                  <motion.span
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                    className={s.text}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white">{t.title}</p>
                    {t.message && <p className="mt-0.5 text-sm text-slate-400">{t.message}</p>}
                  </div>
                  <button
                    onClick={() => dismiss(t.id)}
                    aria-label="Dismiss notification"
                    className="rounded-md p-1 text-slate-500 transition hover:bg-white/10 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <motion.div
                  className={cn("absolute bottom-0 left-0 h-0.5 w-full origin-left", s.bar)}
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: DURATION / 1000, ease: "linear" }}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
