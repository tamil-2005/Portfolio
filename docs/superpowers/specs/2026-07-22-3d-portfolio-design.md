# Animated 3D Portfolio — Design Spec

**Date:** 2026-07-22
**Owner:** Tamilselvan Mariyappan
**Status:** Approved for planning

## Goal

Build a new, professional, high-level animated **3D portfolio** website in a fresh
sibling folder, reusing the real content from the existing `pro-portfolio` project.
The existing project remains untouched. Visual direction: **dark, neon, futuristic**
with immersive **3D everywhere** and scroll-driven motion.

## Decisions (locked)

| Decision | Choice |
|----------|--------|
| Folder setup | Fresh rebuild in sibling folder `pro-portfolio-3d`; current project untouched |
| 3D intensity | 3D everywhere — immersive WebGL in every section, scroll-driven camera |
| Aesthetic | Dark, neon, futuristic — glowing accents, glassmorphism, cyber feel |
| Language | TypeScript |
| Mobile 3D | Full 3D on all devices (still clamp DPR + honor `prefers-reduced-motion`) |
| Deployment | Build only for now; no CI/CD wiring |

## Tech Stack

- **React 19 + Vite + TypeScript**
- **Three.js** via `@react-three/fiber` + `@react-three/drei`
- **`@react-three/postprocessing`** — bloom/glow for the neon look
- **Framer Motion** — DOM animations, reveals, page transitions
- **Lenis** (`lenis` / `@studio-freight/lenis`) — smooth scroll that drives the 3D camera
- **Zustand** — tiny store syncing scroll progress → 3D scenes
- **Tailwind CSS** — utility styling for DOM/glass panels

## Architecture

- **One persistent full-screen `<Canvas>`** fixed behind the DOM content. Sections
  scroll over it. Scroll progress (from Lenis, stored in Zustand) drives the camera
  and activates/deactivates each section's 3D scene. Avoids remounting a canvas per
  section (smoother, standard for high-end 3D sites).
- **DOM layer** on top: semantic sections with glassmorphic panels, text, and links.
- **Scene manager** maps scroll ranges → active 3D scene + camera target.
- **Performance guardrails:** DPR clamp (max ~2), `prefers-reduced-motion` disables
  camera motion/heavy effects, lazy-loaded heavy scenes, instanced particles.

### Component boundaries

- `App` — layout: `<Loader/>`, `<Scene3D/>` (fixed canvas), `<Content/>` (DOM), `<UI/>` (cursor, nav).
- `Scene3D` — the single Canvas; renders `SceneManager` + postprocessing.
- `SceneManager` — reads scroll store, positions camera, mounts per-section scenes.
- Per-section 3D: `HeroScene`, `AboutScene`, `ExperienceScene`, `ProjectsScene`, `SkillsScene`, `ContactScene`.
- DOM sections: `Hero`, `About`, `Experience`, `Projects`, `Skills`, `Contact`, `Footer`, `Navbar`.
- `store/useScroll.ts` — Zustand: scroll progress, active section, device caps.
- `data/portfolio.ts` — ported real content (typed).

## The 3D experience (per section)

- **Hero** — floating holographic centerpiece (wireframe globe / particle field),
  name + rotating roles (`Full Stack Developer`, `Cloud & DevOps Engineer`, `Problem Solver`), neon bloom.
- **About** — drifting particle constellation behind glassmorphic bio + education timeline.
- **Experience** — scroll-driven 3D timeline; camera travels a path past floating
  "station" nodes (Infinitesol ×2, BNP Paribas) with details revealing in DOM.
- **Projects** — interactive 3D cards floating/tilting in space; 4 real projects with real links.
- **Skills** — rotating 3D skill cloud / orbiting tech nodes grouped Frontend / Backend / Cloud & DevOps / Tools.
- **Contact** — glowing grid-floor "terminal" panel with email/location + socials.

## Content

Port all real data verbatim from `src/data/portfolioData.js`:
- Contact: Tamilselvan Mariyappan · tamilselvan.mariyappan@gmail.com · Dharmapuri, Tamil Nadu
- Socials: LinkedIn, GitHub, LeetCode (existing URLs)
- Education, Experience (3 entries), Projects (4 entries), Skill groups (4 groups)

## Polish

- 3D loading screen / preloader with progress
- Custom cursor + magnetic buttons
- Section scroll-reveal animations
- Animated navbar with active-section highlight + smooth anchor scroll
- Page-load intro animation

## Responsiveness & Accessibility

- Fully responsive layout (mobile → desktop)
- Full 3D on all devices; DPR clamped; `prefers-reduced-motion` honored
- Semantic HTML, keyboard-navigable nav, sufficient contrast on glass panels

## Out of scope (YAGNI)

- CI/CD / Docker / Oracle deploy (later)
- CMS / backend
- Blog, i18n, analytics
- Separate lighter mobile 3D scene

## Success criteria

- New `pro-portfolio-3d` project builds and runs (`npm run dev`, `npm run build`)
- Every section renders its 3D scene over a single persistent canvas
- Scroll drives camera smoothly; neon/bloom aesthetic present
- All real content displayed correctly with working links
- Existing `pro-portfolio` project unchanged
