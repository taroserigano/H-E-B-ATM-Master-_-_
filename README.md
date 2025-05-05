# H‑E‑B ATM App

This is a full-stack ATM simulation built with **Next.js**, **React Query**, and **MongoDB**. Users can securely log in with a PIN, check their balance, deposit or withdraw funds, and view transaction history — all through a fast and responsive interface.

The app is structured with **clean architecture**, **secure session handling**, and **real-world performance techniques** that scale.

---

## ⚙️ Key Technologies & Benefits

### ✅ Next.js 15 (App Router)
- Server components handle data loading early — reducing flicker and improving time-to-interaction.
- File-based API routes simplify full-stack logic.
- Uses `cookies()` and `Response.json()` for modern session management.

💡 *Benefit:* Streamlined backend/frontend integration and fast data access directly on the server.

---
## ⚡ Performance & Caching

This app is tuned for **speed and responsiveness** through a combination of:



## ⚛️ React Query — Data Fetching, Caching & Optimistic UI

React Query powers efficient and reliable data handling throughout the app:

- 🔄 **Automatic Caching** – Caches server responses and reuses them across components to minimize redundant API calls.
- 🔁 **Background Syncing** – Keeps data fresh by silently refetching in the background.
- ⚡ **Instant Updates** – Supports optimistic UI, so actions like deposits and withdrawals show up immediately in the interface.
- 🛡️ **Rollback Safety** – Automatically reverts UI changes if the server request fails.
- 🔗 **State Sharing** – Shares and syncs data across views and tabs out of the box.

### 💡 Benefits
- Smooth, real-time user experience.
- Fewer loading spinners and flickers.
- Reduced server load and faster perceived performance.
- Improved reliability with built-in error recovery.


---

### 🧠 Memoization Techniques (React.memo + useMemo + useCallback)

- `**React.memo**`: prevents re-renders for stable components.
- `**useMemo**`: avoids recalculating values like formatted balances or context values.
- `**useCallback**`: stabilizes handlers like `handleSubmit`, reducing effect triggers and child re-renders.

**Why it matters**: Keeps UI fast and lean — only updates what’s necessary.
---

### 🧾 MongoDB for State Persistence
- Stores balances, PINs, and full transaction history.
- Tracks daily withdrawals to enforce limits.
- Native driver + Mongoose used where most effective.

💡 *Benefit:* Flexible schema and efficient updates for transactional data.

---

### 🔐 HttpOnly Cookie Sessions
- Login sets a secure session cookie.
- Middleware blocks unauthenticated API calls.
- Logout clears session via `Set-Cookie`.

💡 *Benefit:* More secure than localStorage and works across tabs and reloads.

---

### ✅ Zod Validation
- Validates login data before DB queries.
- Provides structured error feedback instantly.

💡 *Benefit:* Safer and more reliable input handling with no extra boilerplate.

---

## 💡 Features

- Login with PIN (test accounts below)
- View real-time balance
- Deposit & withdraw with validation
- Daily withdrawal limits
- Export history to Excel
- Optimistic UI updates
- Protected routes & secure session handling

---

## 🧪 Run Locally

```bash
git clone https://github.com/your-username/heb-atm
cd heb-atm
npm install
echo "MONGODB_URI=your-mongo-uri" > .env.local
npm run dev
