import { ArrowUp } from "lucide-react";
import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js, GSAP, Framer Motion and Three.js.
        </p>
        <a
          href="#home"
          className="group inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          Back to top
          <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
        </a>
      </div>
    </footer>
  );
}
