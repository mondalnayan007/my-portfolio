"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { EASE, INTRO_DELAY } from "@/lib/utils";
import { profile } from "@/lib/data";
import Magnetic from "@/components/ui/Magnetic";
import ResumeButton from "@/components/ResumeButton";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), { ssr: false, loading: () => null });

function useTypewriter(words: string[], speed = 70, pause = 1600) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && text === word) {
      t = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => i + 1);
      return;
    } else {
      t = setTimeout(
        () => setText(word.slice(0, text.length + (deleting ? -1 : 1))),
        deleting ? speed / 2 : speed
      );
    }
    return () => clearTimeout(t);
  }, [text, deleting, index, words, speed, pause]);

  return text;
}

const socials = [
  { icon: Github, href: profile.socials.github, label: "GitHub" },
  { icon: Linkedin, href: profile.socials.linkedin, label: "LinkedIn" },
  { icon: Twitter, href: profile.socials.facebook, label: "Facebook" },
  { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
];

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const canvasWrap = useRef<HTMLDivElement>(null);
  const role = useTypewriter(profile.roles);

  // GSAP scroll parallax: content drifts up & fades, 3D scene drifts slower
  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: section.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(content.current, { yPercent: -18, opacity: 0, ease: "none", scrollTrigger: st });
      gsap.to(canvasWrap.current, { yPercent: 14, scale: 1.12, ease: "none", scrollTrigger: st });
    }, section);
    return () => ctx.revert();
  }, []);

  const [first, last] = profile.name.split(" ");

  const word = (w: string, wordIndex: number, gradient = false) => (
    <span className="mr-[0.22em] inline-block overflow-hidden pb-[0.12em] align-bottom">
      {w.split("").map((c, i) => (
        <motion.span
          key={i}
          initial={{ y: "115%", rotate: 10 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ delay: INTRO_DELAY + wordIndex * 0.25 + i * 0.045, duration: 0.95, ease: EASE }}
          className="inline-block will-transform"
          style={
            gradient
              ? {
                  backgroundImage: "linear-gradient(90deg,#7c5cff,#22d3ee,#f472b6)",
                  backgroundSize: `${w.length * 100}% 100%`,
                  backgroundPosition: `${(i / (w.length - 1)) * 100}% 0`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }
              : undefined
          }
        >
          {c}
        </motion.span>
      ))}
    </span>
  );

  return (
    <section id="home" ref={section} className="relative min-h-screen overflow-hidden">
      {/* 3D scene */}
      <div ref={canvasWrap} className="gpu absolute inset-0 opacity-70 md:opacity-100">
        <HeroCanvas />
      </div>

      {/* backdrop */}
      <div className="bg-grid mask-fade pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] animate-aurora rounded-full bg-brand-violet/25 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-[380px] w-[380px] animate-aurora rounded-full bg-brand-cyan/20 blur-[120px] [animation-delay:-8s]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      <div
        ref={content}
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pb-24 pt-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: INTRO_DELAY, duration: 0.8 }}
          className="glass mb-8 inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm text-slate-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Open to freelance and full-time roles
        </motion.div>

        <h1 aria-label={profile.name} className="font-display text-[15vw] font-extrabold leading-[0.95] tracking-tight text-white sm:text-8xl lg:text-[9rem]">
          {word(first, 0)}
          <br />
          {word(last, 1, true)}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: INTRO_DELAY + 0.9, duration: 0.8, ease: EASE }}
          className="mt-8 h-9 font-mono text-xl text-brand-cyan sm:text-2xl"
        >
          {role}
          <span className="ml-0.5 inline-block h-6 w-[3px] translate-y-1 animate-blink bg-brand-cyan" />
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: INTRO_DELAY + 1.05, duration: 0.8, ease: EASE }}
          className="mt-4 max-w-xl text-lg leading-relaxed text-slate-400"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: INTRO_DELAY + 1.2, duration: 0.8, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <ResumeButton variant="primary" />
          </Magnetic>
          <Magnetic>
            <a
              href="#projects"
              className="glass group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              See my work
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
            </a>
          </Magnetic>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: INTRO_DELAY + 1.5 }}
          className="mt-10 flex items-center gap-3"
        >
          {socials.map(({ icon: Icon, href, label }) => (
            <li key={label}>
              <motion.a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={label}
                whileHover={{ y: -4, scale: 1.1 }}
                className="glass grid h-11 w-11 place-items-center rounded-full text-slate-300 transition-colors hover:text-white"
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            </li>
          ))}
        </motion.ul>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: INTRO_DELAY + 2 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 sm:block"
        aria-hidden
      >
        <div className="flex h-10 w-6 justify-center rounded-full border border-white/30 pt-2">
          <span className="h-2 w-1 animate-scroll-dot rounded-full bg-white" />
        </div>
      </motion.div>
    </section>
  );
}
