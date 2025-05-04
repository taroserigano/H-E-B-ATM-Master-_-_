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

### ⚛️ React Query — Data Fetching & Optimistic UI
- Manages all API communication and caching.
- Automatically syncs data across views.
- **Optimistic updates**: UI instantly reflects deposits/withdrawals before the server confirms.

💡 *Benefit:* Smooth, real-time experience with rollback safety on failure.

---

### 🧠 Memoization for Performance
- `useMemo()` prevents re-renders in context providers, queries, and computed values.
- Ensures stable function identities and avoids excess computation.

💡 *Benefit:* Keeps UI fast and responsive, even with multiple data-bound components.

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
