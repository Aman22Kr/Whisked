# Whisked – demo cake & flowers storefront

**Whisked** is a static, multi-page React storefront for a fictional bakery (cakes, cheesecakes, cupcakes, flowers, candles).
It was built as a re-creation of the *structure and interaction patterns* of the reference site <https://whipped.in/> under a new brand name.
It is a **demo**: products, prices (apart from those read from the reference), reviews and policies are sample data, and nothing is sold.

Stack: Vite · React 18 · JavaScript (JSX) · Tailwind CSS 3 · React Router (HashRouter) · Lucide React · Framer Motion · browser `localStorage`.

## Run locally

```bash
npm install          # also creates package-lock.json – commit it
npm run dev          # http://localhost:5173
npm run build        # production build into dist/
npm run preview      # serve the production build locally
```

## Deploy to GitHub Pages (gh-pages package)

1. Create a GitHub repository (e.g. `whisked`) under your account (`Aman22kr`) and push this project:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Aman22kr/whisked.git
git push -u origin main
```

2. Publish the built site (runs `npm run build` first via `predeploy`, then pushes `dist/` to the `gh-pages` branch):

```bash
npm run deploy
```

3. In the GitHub repo: **Settings → Pages → Build and deployment → Source: “Deploy from a branch” → Branch: `gh-pages` / `(root)` → Save.**
4. After a minute the site is live at `https://Aman22kr.github.io/whisked/`.

You need push (write) access to the repository. If the repo has a different name, nothing needs changing: the build uses a relative base (`./`) and **HashRouter**, so URLs look like `…/whisked/#/collections/pretty-cakes` and refreshes/direct links work without any server rewrite rules.
(Optional: force an absolute base with `VITE_BASE=/your-repo/ npm run build`. Update `homepage` in `package.json` if you rename the repo.)

## Quick Settings

Edit `src/config.js`:

| Setting | Purpose |
| --- | --- |
| `brand`, `brandDisplay`, `tagline` | Brand name used in header, footer, titles |
| `animation.speed` / `animation.intensity` | Defaults: `SLOW / NORMAL / FAST / OFF` and `SUBTLE / NORMAL / STRONG` (currently NORMAL / STRONG) |
| `announcement` | Top marquee bar text |
| `contact` | **Placeholder** phone / WhatsApp / email / social links – replace with real ones |
| `ads` | Turn the bottom-of-page ad strip on/off |
| `storagePrefix` | Namespace for all localStorage keys |

Catalogue data lives in `src/data/catalog.js`; navigation in `src/data/nav.js`; informational pages, FAQs, blog posts and sample reviews in `src/data/pages.js`.

Users can also change animation speed/intensity at runtime with the ✨ button (bottom-left). `prefers-reduced-motion` is always respected.

## What is persisted (localStorage keys `whisked:v1:*`)

cart & cart note · favourites · recently viewed · search history · animation / layout / sort preferences · display name & area · demo orders · form drafts (checkout, contact, cake message, delivery date).
Stored data is validated on load; malformed or outdated values fall back to defaults.
**localStorage is specific to one browser on one device. It does not sync across devices and is not a real user account.** No passwords, card numbers or other secrets are ever stored. Account → “Clear local demo data” erases everything.

## Demo limitations (please read)

- **No backend.** Checkout, login-style account page and contact form are mocks: no payment, authentication, booking or server submission happens, and the UI says so.
- **Sample data.** Only the “Pretty cakes” names/prices, the White Symphony product options and the add-on list were read from the reference. All other collections’ products, eggless flags, ratings, reviews, blog posts and policy text are invented placeholders.
- **Visual fidelity is approximate.** The reference was inspected as text/markup (structure, copy, menu, prices, theme colour `#fc4295`); pixel-level typography, spacing and animation of the original were not measured. The design is an original implementation inspired by that structure.
- **Images.** The hero banners, cupcake/flower tiles and White Symphony photos are hot-linked from the reference site’s CDN; if they ever fail to load, an original SVG cake illustration is shown instead (no broken images). All other items use those SVG illustrations. Replace them with your own photos (put files in `src/assets/` or `public/` and set `images` on products). Check image licensing before any public use.
- **Ads.** The strip at the bottom of each page is a *placeholder house-ad slot* (`src/components/AdSlot.jsx`), not a real ad network.
- Brand-specific details of the reference (company name, tax/licence numbers, phone numbers) were intentionally **not** copied.
- No dark mode.

## Project layout

```
src/
  App.jsx, main.jsx, index.css, config.js
  components/   Header (mega menu), MobileMenu, SearchOverlay, CartDrawer, Footer, Layout, AdSlot, ProductCard, CakeArt, Reveal, …
  context/      AppContext (all localStorage-backed state)
  data/         catalog.js, nav.js, pages.js
  hooks/        useLocalStorage, useMotion, useLockScroll
  pages/        Home, Collection, Product, SearchPage, Cart, Checkout, Account, InfoPage, Blog, NotFound
  utils/        storage, motion, format
```

Routes (hash-based): `/`, `/collections/:slug[/:eggless|contain-eggs]`, `/products/:slug`, `/search?q=`, `/cart`, `/checkout`, `/account`, `/pages/:slug` (about-us, contact-us, faqs, delivery-information, privacy-policy, terms-conditions, refund-policy, sitemap, cake-delivery-in-<city>), `/policies/:slug`, `/blogs/topic[/:slug]`, and a not-found page.
