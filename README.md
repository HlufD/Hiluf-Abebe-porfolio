# Hluf Abebe — Portfolio

Personal portfolio site. Single-page, minimal, light + dark.

## Stack

- React 19
- Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Motion (`motion/react`) for animation
- three.js + `@react-three/fiber` + `@react-three/drei` — the 3D dev-room in the hero
- `@emailjs/browser` for the contact form

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview
```

Requires Node 20.19+ (Vite 8). Netlify build pins Node via `.nvmrc` / `netlify.toml`.

## Content

All copy lives in [`src/lib/content.js`](src/lib/content.js) — profile, skills,
experience, education, projects, socials, and the EmailJS keys. Edit there; the
sections in `src/sections/` read from it.

## Structure

```
src/
  sections/    Hero, About, Resume, Work, Contact
  components/   Sidebar, Section, Reveal, Typewriter, Icon,
               ThemeToggle, DevRoom (+ DevRoomCanvas lazy wrapper)
  lib/         content.js, useActiveSection.js, useTheme.jsx
  index.css    Tailwind theme tokens (light + dark) + base styles
```

## Theming

`.dark` on `<html>` switches the palette (semantic CSS variables in
`src/index.css`). An inline script in `index.html` applies the stored / system
theme before first paint; `ThemeProvider` in `src/lib/useTheme.jsx` owns the
runtime state and persists to `localStorage`.

## 3D scene

`src/components/DevRoom.jsx` is a procedural low-poly scene (no external assets).
It is code-split and lazy-loaded, follows the active theme, and drops its
animation loop when `prefers-reduced-motion` is set. `DevRoomCanvas.jsx` wraps it
with a Suspense fallback and a WebGL error boundary.
