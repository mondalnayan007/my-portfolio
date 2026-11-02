"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Clock, Copy, Github, Linkedin, Loader2, Mail, MapPin, Send, Twitter } from "lucide-react";
import { profile } from "@/lib/data";
import { cn, EASE } from "@/lib/utils";
import { sendMessage } from "@/lib/sendMessage";
import { useToast } from "@/components/ui/Toast";
import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Magnetic from "@/components/ui/Magnetic";

type Values = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;

const empty: Values = { name: "", email: "", subject: "", message: "" };
const MAX = 500;
const topics = ["Project inquiry", "Freelance work", "Job opportunity", "Just saying hi"];

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Enter your name (at least 2 characters).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Enter a valid email address.";
  if (v.message.trim().length < 10) e.message = "Write a message of at least 10 characters.";
  return e;
}

type FieldProps = {
  label: string;
  name: keyof Values;
  value: string;
  error?: string;
  onChange: (n: keyof Values, v: string) => void;
  onBlur: (n: keyof Values) => void;
  type?: string;
  textarea?: boolean;
  optional?: boolean;
  placeholder?: string;
};

function Field({ label, name, value, error, onChange, onBlur, type = "text", textarea, optional, placeholder }: FieldProps) {
  const common = {
    id: name,
    name,
    value,
    placeholder,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(name, e.target.value),
    onBlur: () => onBlur(name),
    "aria-invalid": !!error,
    "aria-describedby": error ? `${name}-error` : undefined,
    className: cn(
      "w-full rounded-xl border bg-fg/[0.03] px-4 py-3 text-fg outline-none transition placeholder:text-subtle",
      "focus:border-accent focus:bg-fg/[0.05] focus:ring-4 focus:ring-accent/15",
      error ? "border-rose-500/60" : "border-fg/10"
    ),
  };

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <label htmlFor={name} className="text-sm font-semibold text-fg">
          {label}
        </label>
        {optional && <span className="text-xs text-subtle">Optional</span>}
        {textarea && (
          <span className={cn("text-xs tabular-nums", value.length > MAX - 40 ? "text-amber-500" : "text-subtle")}>
            {value.length}/{MAX}
          </span>
        )}
      </div>
      {textarea ? (
        <textarea rows={5} maxLength={MAX} {...common} className={cn(common.className, "resize-none")} />
      ) : (
        <input type={type} {...common} />
      )}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${name}-error`}
            initial={{ opacity: 0, height: 0, y: -6 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 overflow-hidden text-sm text-rose-600 dark:text-rose-300"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function SuccessPanel() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-10 grid place-items-center bg-ink-800/95 p-8 text-center backdrop-blur-sm"
    >
      <div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-500/15"
        >
          <svg viewBox="0 0 24 24" className="h-10 w-10 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }} />
          </svg>
        </motion.div>
        <h3 className="mt-6 text-2xl font-bold text-fg">Message sent</h3>
        <p className="mt-2 text-muted">Thanks for reaching out. I&apos;ll get back to you soon.</p>
      </div>
    </motion.div>
  );
}

export default function Contact() {
  const { toast } = useToast();
  const [values, setValues] = useState<Values>(empty);
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [trap, setTrap] = useState(""); // honeypot for bots
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [copied, setCopied] = useState(false);

  const errors = validate(values);
  const visible = Object.fromEntries(Object.entries(errors).filter(([k]) => touched[k as keyof Values])) as Errors;

  const onChange = (n: keyof Values, v: string) => setValues((p) => ({ ...p, [n]: v }));
  const onBlur = (n: keyof Values) => setTouched((p) => ({ ...p, [n]: true }));

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      toast({ type: "info", title: "Email copied", message: profile.email });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ type: "error", title: "Couldn't copy", message: "Select the address and copy it manually." });
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (trap) return;
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(errors).length) {
      toast({ type: "error", title: "Check the form", message: "Fix the highlighted fields and send again." });
      return;
    }
    setStatus("loading");
    try {
      await sendMessage(values);
      setStatus("success");
      toast({ type: "success", title: "Message sent", message: "Thanks for reaching out. I'll reply soon." });
      setValues(empty);
      setTouched({});
      setTimeout(() => setStatus("idle"), 4200);
    } catch (err) {
      setStatus("idle");
      toast({
        type: "error",
        title: "Message not sent",
        message: err instanceof Error ? err.message : "Something went wrong. Try again or email me directly.",
      });
    }
  };

  const socials = [
    { icon: Github, label: "GitHub", href: profile.socials.github },
    { icon: Linkedin, label: "LinkedIn", href: profile.socials.linkedin },
    { icon: Twitter, label: "Twitter", href: profile.socials.twitter },
  ];

  return (
    <section id="contact" className="relative overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute -bottom-48 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          label="Contact"
          title="Have an idea?"
          highlight="Let's build it."
          subtitle="Tell me about your project or role. I read every message and reply within a day."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.35fr] lg:gap-12">
          {/* ── Left: ways to reach me ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="space-y-4"
          >
            <div className="card flex items-center gap-4 rounded-2xl p-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                <Mail className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-subtle">Email</p>
                <a href={`mailto:${profile.email}`} className="block truncate font-semibold text-fg hover:text-accent">
                  {profile.email}
                </a>
              </div>
              <button
                onClick={copyEmail}
                aria-label="Copy email address"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-fg/10 text-muted transition hover:bg-fg/10 hover:text-fg"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span key={copied ? "done" : "copy"} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.15 }}>
                    {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="card flex items-center gap-4 rounded-2xl p-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                  <MapPin className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-subtle">Location</p>
                  <p className="truncate font-semibold text-fg">{profile.location}</p>
                </div>
              </div>
              <div className="card flex items-center gap-4 rounded-2xl p-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                  <Clock className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs text-subtle">Response time</p>
                  <p className="truncate font-semibold text-fg">Within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="card rounded-2xl p-4">
              <p className="px-1 pb-3 text-xs text-subtle">Find me online</p>
              <ul className="space-y-1">
                {socials.map(({ icon: Icon, label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-3 rounded-xl px-2 py-2.5 transition hover:bg-fg/5"
                    >
                      <Icon className="h-5 w-5 text-muted transition group-hover:text-accent" />
                      <span className="flex-1 font-medium text-fg">{label}</span>
                      <ArrowUpRight className="h-4 w-4 text-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* ── Right: form ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <SpotlightCard className="relative p-6 sm:p-9">
              <AnimatePresence>{status === "success" && <SuccessPanel />}</AnimatePresence>

              <form onSubmit={onSubmit} noValidate className="space-y-6">
                {/* honeypot — hidden from humans */}
                <input type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} className="hidden" aria-hidden />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name" name="name" placeholder="Jane Doe" value={values.name} error={visible.name} onChange={onChange} onBlur={onBlur} />
                  <Field label="Email" name="email" type="email" placeholder="jane@company.com" value={values.email} error={visible.email} onChange={onChange} onBlur={onBlur} />
                </div>

                <div>
                  <p className="mb-2 text-sm font-semibold text-fg">What&apos;s this about?</p>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((t) => {
                      const on = values.subject === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => onChange("subject", on ? "" : t)}
                          aria-pressed={on}
                          className={cn(
                            "relative rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                            on ? "border-transparent text-white" : "border-fg/10 text-muted hover:border-fg/25 hover:text-fg"
                          )}
                        >
                          {on && <motion.span layoutId="topic-pill" className="absolute inset-0 rounded-full bg-accent" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                          <span className="relative">{t}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <Field label="Message" name="message" textarea placeholder="Tell me a little about what you have in mind…" value={values.message} error={visible.message} onChange={onChange} onBlur={onBlur} />

                <div className="flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-subtle">Your details are only used to reply to you.</p>
                  <Magnetic strength={0.15}>
                    <motion.button
                      type="submit"
                      disabled={status !== "idle"}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      className="relative inline-flex min-w-[180px] items-center justify-center gap-2 overflow-hidden rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-80"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={status}
                          initial={{ y: 18, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -18, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          className="inline-flex items-center gap-2"
                        >
                          {status === "idle" && (<><Send className="h-4 w-4" /> Send message</>)}
                          {status === "loading" && (<><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>)}
                          {status === "success" && (<><Check className="h-4 w-4" /> Sent</>)}
                        </motion.span>
                      </AnimatePresence>
                    </motion.button>
                  </Magnetic>
                </div>
              </form>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}