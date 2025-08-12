# Developer Portfolio (Next.js + TypeScript + Tailwind)

Modern, vibrant, and professional portfolio built with Next.js App Router, TypeScript, Tailwind, Framer Motion, and next-themes. Includes Projects, Experience, Contact, and Resume sections.

## Scripts
- `npm run dev` — start dev server on http://localhost:3000
- `npm run build` — build for production
- `npm run start` — start production server
- `npm run lint` — run ESLint

## Customize
- Replace placeholder name, bio, links in `app/layout.tsx`, `components/navbar.tsx`, and pages.
- Update projects in `lib/data/projects.ts` and skills in `lib/data/skills.ts`.
- Replace public/og.png, favicon.ico, and resume.pdf with your assets.
- Update Formspree endpoint in `app/(site)/contact/page.tsx`.

## Notes
- Dark/light theme via `next-themes` and Tailwind.
- Subtle animations via Framer Motion.
- Uses shadcn-like button/card/badge primitives in `components/ui.tsx`.
