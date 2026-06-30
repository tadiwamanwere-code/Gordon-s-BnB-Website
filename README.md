# Gordon's Bnb — Boutique Bed & Breakfast

A production-ready marketing & booking website for **Gordon's Bnb**, a boutique
guesthouse. Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
and Framer Motion, and designed for one-click deployment to Vercel.

## ✨ Features

- **Cinematic, editorial design** drawn from the brand identity — deep forest green,
  warm cream/ivory and muted brass gold.
- **Fully responsive & smoothly scrollable** across mobile, tablet and desktop, with
  tasteful scroll-reveal animation (respecting `prefers-reduced-motion`).
- **Multi-step booking flow** on its own page (`/booking`) with live pricing summary,
  date selection and a confirmation step — no payment is taken; requests are submitted
  to an API route ready to connect to your email/booking system.
- **Dedicated pages**: Home, Rooms, Gallery (with lightbox), About, Contact (working
  contact form), plus a custom 404, sitemap and robots.
- **Curated photography** fetched via the **Unsplash API**, stored as a stable manifest
  with photographer attribution.
- **SEO ready**: metadata, Open Graph, sitemap.xml and robots.txt.

## 🚀 Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
```

## 🔧 Make it yours

All business details live in **`src/lib/site.ts`** — name, email, phone, address,
hours and social links. Edit them once and they update across the whole site.

- **Rooms & rates**: `src/lib/rooms.ts`
- **Imagery**: `src/lib/images.ts` (regenerate or extend via the Unsplash API)
- **Brand colours & typography**: `src/app/globals.css` (`@theme` tokens)
- **Logo**: `public/logo.png` (also used for the favicon/app icons)

### Connecting the forms

The contact (`/api/contact`) and booking (`/api/booking`) route handlers validate
input and currently log submissions server-side. Wire them to an email provider
(e.g. [Resend](https://resend.com)) or a database to start receiving enquiries.

## 📦 Deploy to Vercel

Push to GitHub and import the repository in Vercel — no extra configuration is needed.
Add any environment variables (see `.env.example`) in the Vercel dashboard.

---

Photography via [Unsplash](https://unsplash.com). Built with care.
