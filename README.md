# Hluf Abebe — Portfolio

Personal portfolio site. Single-page, dark, minimal.

## Stack

- React 19
- Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Motion (`motion/react`) for animation
- `@emailjs/browser` for the contact form

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview
```

## Content

All copy lives in [`src/lib/content.js`](src/lib/content.js) — profile, skills,
experience, education, projects, socials, and the EmailJS keys. Edit there; the
sections in `src/sections/` read from it.

## Structure

```
src/
  sections/    Hero, About, Resume, Work, Contact
  components/   Sidebar, Section, Reveal, Typewriter, Icon
  lib/         content.js, useActiveSection.js
  index.css    Tailwind theme tokens + base styles
```
