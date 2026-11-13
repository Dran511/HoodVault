# HoodVault

A small online hoodie store I built with React. You can browse the catalog, search, save favorites, manage a cart, check out with GCash or cash on delivery, and create an account.

**Live site:** https://hoodvault-mu.vercel.app

## Built with

- React 18
- Vite
- Tailwind CSS v4
- Deployed on Vercel

## Running it locally

```bash
npm install
npm run dev
```

Then open http://localhost:5176.

Other scripts:

- `npm run build` builds the production files into `dist/`
- `npm run preview` serves that build locally
- `npm run lint` runs ESLint

## Project structure

```
src/
  App.jsx            page switcher + layout
  main.jsx           entry point
  index.css          Tailwind + a few custom styles
  assets/images/     product photos
  components/        header, footer, toasts, shared buttons
  data/products.js   products, hero slides, starter cart/wishlist
  modals/            product view, GCash, orders, profile edit, etc.
  pages/             one file per page (home, cart, checkout, login...)
  store/             shared state (cart, wishlist, accounts, orders)
  utils/             formatting, localStorage, password hashing
```

## Notes

- There's no backend yet. Accounts, carts and orders are saved in the browser's localStorage, so they stay on the device you used. Passwords are salted and hashed before saving, never stored as plain text.
- Google/Facebook sign-in and password-reset emails need a server, so they show a "not available yet" message for now.
- Payments are simulated. No real money is charged.
