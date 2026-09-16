# Vault1 — Marketing Website

React + TypeScript + Vite port of the approved Vault1 landing page design.
Same exact visual design as the HTML version — componentized, typed, and
ready to push to a real repo and deploy.

## Structure

```
src/
  App.tsx                 assembles every section in order
  styles.css               all the CSS, ported 1:1 from the approved design
  components/
    Ambient.tsx             fixed background glow blobs
    Ticker.tsx               live-style market ticker (demo data — see note below)
    Header.tsx                logo, nav, Admin Portal button, mobile menu
    Hero.tsx                   headline, CTAs, terminal preview panel
    Problem.tsx                 "your wealth is scattered" section
    Solution.tsx                  the connected data-chain visual
    Experiences.tsx                Vault1 Growth vs Vault1 Investor
    GrowthMission.tsx                signature-feature ₹500→₹19,000 callout
    Calculator.tsx                    the full compounding calculator
    TrustStrip.tsx                     Intelligence / Control / Security
    Access.tsx                          investor form + "Login to Portal"
    Footer.tsx                           brand, links, disclaimer
    Logo.tsx                              placeholder SVG mark
```

## Run it locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Before you deploy — three things to change

1. **Logo** — `src/components/Logo.tsx` is a placeholder SVG shield mark in
   your teal-on-navy treatment. Swap it for your real `vault1.png` /
   brand SVG (used in both `Header.tsx` and `Footer.tsx`).

2. **Portal login URL** — `src/components/Access.tsx` has:
   ```ts
   const PORTAL_LOGIN_URL = "/login";
   ```
   Point this at your actual deployed Vault1 app's login page.

3. **Ticker + terminal data** — `src/components/Ticker.tsx` and the rows in
   `src/components/Hero.tsx` are simulated/demo data, clearly labeled
   "DEMO DATA" in the UI. Wire these to a real market-data source before
   launch, or leave them as illustrative if that's fine for now.

The investor application form in `Access.tsx` currently just shows a
success state on submit — there's no backend wired up. Point `handleSubmit`
at your real endpoint (or a service like Formspree/a serverless function)
when you're ready to actually collect applications.

## Build for production

```bash
npm run build
```

Outputs static files to `dist/` — deployable to any static host.

## Push to a new repo

```bash
git init
git add .
git commit -m "Initial commit — Vault1 marketing site"
git branch -M main
git remote add origin <your-new-github-repo-url>
git push -u origin main
```

## Deploy (Vercel)

Since your app already uses Vercel:

```bash
npm install -g vercel   # if you don't have it
vercel                  # first deploy, follow the prompts
vercel --prod           # subsequent production deploys
```

Or import the GitHub repo directly at vercel.com/new — Vercel
auto-detects Vite, no config needed. Framework preset: **Vite**,
build command `npm run build`, output directory `dist`.
