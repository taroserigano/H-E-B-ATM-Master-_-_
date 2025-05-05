# H‑E‑B ATM App

A full-stack ATM simulation built with **Next.js 15**, **React Query**, **Context API**, and **MongoDB**. It supports PIN-based login, real-time balance, deposits, withdrawals with daily limits, and transaction history with Excel export.

---

## Overview

This app delivers **real-time responsiveness** and **production-grade reliability**.

Every transaction—whether a deposit or withdrawal—is processed instantly in MongoDB and reflected in the UI without delay. Thanks to **optimistic UI updates**, users see updated balances and transaction history the moment they take action.

All data is automatically **cached and synced** through React Query. This ensures:
- Fast initial loads through prefetching and hydration
- Seamless updates after every action
- Immediate rollback on failure
- Accurate, up-to-date views across all components

From the user’s perspective, the experience feels **instant and reliable**—similar to a real banking application.

---

## Live Demo

🔗 [https://h-e-b-app-atm-master.vercel.app](https://h-e-b-app-atm-master.vercel.app)

Use one of the demo accounts below to explore the app.

---

## Performance & Caching

Built for speed and UI fluidity:

### React Query + Optimistic UI
- Handles all API calls, caching, retries, and syncing.
- Optimistic updates make transactions feel immediate.
- Manual cache invalidation ensures precise updates—no over-fetching.

### Data Prefetching
- The dashboard preloads balance on the server using `prefetchQuery` + `HydrationBoundary`.
- Results in fast time-to-content without client-side loading delays.

### Memoization for Efficiency
- `React.memo`: avoids unnecessary re-renders.
- `useMemo`: caches expensive values (like formatted balances).
- `useCallback`: memoizes stable event handlers to reduce effect triggers and renders.

These combined techniques ensure the UI remains **fast, lean, and responsive**.

---

## Authentication & Session Management

- Login sets an `accountId` in an **HttpOnly cookie**.
- API routes are protected using middleware.
- Logout clears the session using secure `Set-Cookie`.

This avoids token storage in JavaScript and ensures consistent behavior across tabs and reloads.

---

## MongoDB Persistence

- Stores account balance, PIN, and full transaction history.
- Tracks `withdrawnToday` and `lastWithdrawDate` for enforcing daily limits.
- Each transaction includes amount, type, date, and resulting balance.

Combines native MongoDB driver performance with schema validation via Mongoose.

---

## Zod Validation

All login input is validated on the server using **Zod**, ensuring clean, typed, and secure request payloads.

---

## Core Features

- Secure PIN login
- Real-time balance display
- Deposits and withdrawals with validation
- Daily withdrawal limit logic
- Optimistic UI feedback
- Transaction history with Excel export
- Server prefetching with fast hydration
- Memoized UI and logic for performance
- Cookie-based session handling
- Middleware-protected API endpoints

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
