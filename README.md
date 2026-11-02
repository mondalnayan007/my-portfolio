# Nayan Mondal — Portfolio

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · GSAP + ScrollTrigger · Lenis · Three.js (`@react-three/fiber` + `drei`) · Lucide · EmailJS / Web3Forms

## Run it

```bash
npm install
cp .env.local.example .env.local   # then fill in your mail keys
npm run dev                        # http://localhost:3000
```

## Make it yours

| What | Where |
| --- | --- |
| Name, tagline, bio, email, social links | `src/lib/data.ts` → `profile` |
| Projects (text, tech, colours, live/GitHub links) | `src/lib/data.ts` → `projects` |
| Skills and timeline | `src/lib/data.ts` → `skillGroups`, `experience` |
| Resume | replace `public/resume.pdf` with your own PDF |
| Brand colours / fonts | `tailwind.config.ts`, `src/app/layout.tsx` |

Everything marked `// placeholder` in `data.ts` (links, email, stats, timeline dates, tech lists) is a guess — swap in the real values.

## Contact form

No backend needed. Pick one:

**EmailJS** — create a service and a template at emailjs.com. In the template use these variables:
`{{from_name}}`, `{{from_email}}`, `{{reply_to}}`, `{{subject}}`, `{{message}}`. Put the IDs and public key in `.env.local`.

**Web3Forms** — get a free access key at web3forms.com and set `NEXT_PUBLIC_WEB3FORMS_KEY`. If set, it is used instead of EmailJS.

## Where the effects live

- `components/providers/SmoothScroll.tsx` — Lenis, synced to GSAP's ticker
- `components/three/HeroCanvas.tsx` — 3D orb, wireframe shell, orbiting satellites, stars, pointer parallax
- `components/ui/ScrollText.tsx`, `TextReveal.tsx`, `sections/Experience.tsx` — GSAP ScrollTrigger scrub effects
- `components/ui/SpotlightCard.tsx` — cursor-following glow + border
- `components/sections/Projects.tsx` — 3D tilt cards and shared-layout expand modal
- `components/ui/Toast.tsx` — animated success/error toasts

## Deploy

Push to GitHub and import into Vercel — no extra configuration required. Add the same env vars in the Vercel dashboard.
