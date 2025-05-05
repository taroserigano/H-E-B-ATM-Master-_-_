# H‑E‑B ATM App

A full-stack ATM simulation built with **Next.js 15**, **React Query**, and **MongoDB**. It supports PIN-based login, real-time balance, deposits, withdrawals with daily limits, and transaction history with Excel export.

Built with performance, clarity, and production-readiness in mind—using secure session handling, smart caching, optimistic rendering, and React best practices.

---

## Live Demo

🔗 [https://h-e-b-app-atm-master.vercel.app](https://h-e-b-app-atm-master.vercel.app)

Use one of the demo accounts below to explore the app.

---

## Performance & Caching

This app is tuned for responsiveness and speed using multiple strategies:

### React Query + Optimistic UI
- Handles all API caching, syncing, and retries.
- **Optimistic updates**: balance and transaction list update instantly while awaiting confirmation, with rollback if needed.
- Cache invalidation is scoped to the impacted queries—no redundant re-fetching.

### Data Prefetching with Server Components
- On page load, balance data is preloaded on the server using `prefetchQuery` + `HydrationBoundary`.
- This avoids client-side loading delays and ensures fast first paint.

### Memoization for Stability
- `React.memo`: avoids re-renders for static components.
- `useMemo`: caches stable values like formatted data and query functions.
- `useCallback`: keeps event handlers like `handleSubmit` stable and avoids triggering unnecessary effects.

Together, these techniques reduce client-side rendering cost, improve perceived performance, and make the app feel responsive under real usage conditions.

---

## Authentication & Session Management

- Auth is handled via **HttpOnly cookies** for security and reliability.
- Middleware enforces auth across all API routes.
- Session state persists across tabs and refreshes, and logout clears the session server-side.

---

## MongoDB Persistence

- Stores user account data, transaction history, and daily withdrawal tracking.
- Combines the native MongoDB driver for performance with Mongoose for schema validation.
- Each transaction captures amount, timestamp, and resulting balance for auditability.

---

## Zod Validation

- Login input is validated server-side using **Zod**, ensuring clean, typed, and secure input handling.

---

## Core Features

- Secure PIN-based login
- Real-time balance view
- Deposits and withdrawals
- Daily withdrawal limits
- Optimistic UI updates
- Excel transaction export
- Prefetched server data for fast hydration
- Memoized components and logic
- Cookie-based session auth
- Route-level protection middleware

---

## Demo Accounts

| Account ID | PIN  |
|------------|------|
| 1111       | 1234  |
| 2222       | 1234  |
| 3333       | 1234  |

---

## Run Locally

```bash
git clone https://github.com/your-username/heb-atm
cd heb-atm
npm install
echo "MONGODB_URI=your-mongo-uri" > .env.local
npm run dev
