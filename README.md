# H-E-B ATM 💳  
**Live Site:** [https://h-e-b-app-atm-master.vercel.app](https://h-e-b-app-atm-master.vercel.app)

A full-stack ATM simulation app built with **Next.js 15 App Router**, **React Query**, and **MongoDB**. Users can securely log in, check balances, perform deposits/withdrawals, and view their transaction history — all with a clean, responsive UI and fast, optimized performance.

---

## Overview

This app delivers **real-time responsiveness** and **high reliability**.

Every transaction—whether a deposit or withdrawal—is processed instantly in MongoDB and reflected in the UI immediately. Thanks to **optimistic UI updates**, users see updated balances and transaction history the moment they take action.

All data is automatically **cached and synced** through React Query. This ensures:
- Ultra fast initial loads through prefetching and hydration
- Seamless updates after every action
- Immediate rollback on failure
- Accurate, up-to-date views across all components

From the user’s perspective, the experience feels **instant and reliable**—similar to a real banking application.

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

## 📊 Filtering & Pagination

### ✅ Filtering
Users can filter transactions (e.g. "Deposit" or "Withdraw") before viewing or exporting to Excel. This improves usability and lets users focus on relevant records.

### ✅ Pagination
Transaction history is paginated using React Query + backend slicing:
- Users can navigate across pages using Next/Prev.
- React Query handles **query deduplication**, **previous state retention**, and **smooth loading**.
- Prevents loading large datasets all at once, enhancing performance.

---

### ✅ Virtualized Rendering List with `react-window`
- Only renders visible rows in the transaction list to optimize performance
- Keeps the UI responsive even with **hundreds of transactions** to give scalability

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
- Added Indexing to speed up lookup during login and API access

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

## 📘 SEO Metadata Configuration (Next.js 15)

The app leverages **Next.js 15 App Router**'s built-in metadata system for better search engine visibility and richer social previews.

Each page defines structured metadata, including:

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
