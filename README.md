# H‑E‑B ATM App

This is a full-stack ATM simulation built with **Next.js (App Router)**, **React Query**, and **MongoDB**. Users can securely log in using a PIN, view their balance in real-time, make deposits or withdrawals, and review recent transaction history. It’s designed to feel intuitive and fast — like a modern banking app — while also showcasing production-level architecture and performance optimizations.

Rather than focusing on flashy features, this app emphasizes **clean structure, secure handling, real-time feedback, and optimized rendering.**

---

## ⚙️ Tech Stack & Why It Matters

### ✅ Next.js 15 App Router — Full Stack Foundation

The app is built with the latest **App Router architecture**, enabling both client and server components to coexist cleanly:
- **API routes** live right inside `/app/api` — no separate server needed.
- **Server components** like the dashboard layout fetch data on the server before hydration, reducing client load and avoiding flickering.
- Uses `cookies()` and `Response.json()` for modern and secure session handling.

📈 **Why it’s valuable**: You get a single, unified stack where the frontend and backend work seamlessly together. Server-side logic (like authentication and data preloading) happens early, reducing latency and simplifying the flow.

---

### ⚛️ React Query — Smart Data Management Layer

React Query handles **everything around fetching, caching, updating, and syncing data**:
- Eliminates the need for `useEffect`/`fetch` boilerplate entirely.
- Automatically keeps balance and transaction data fresh across the app.
- Refetches data when focus is regained or components remount.
- **Optimistic updates** allow deposits and withdrawals to reflect instantly in the UI before the server confirms — if something goes wrong, React Query rolls it back safely.

🧠 **Why it matters**: Instead of waiting for a network round trip after every user action, the UI feels instantaneous. Optimistic rendering gives users instant feedback while maintaining consistency with the server in the background.

---

### 🧠 Memoization & Render Optimization

Memoization is used thoughtfully throughout the codebase:
- `useMemo()` ensures values like formatted balance and context providers aren’t recalculated unless absolutely necessary.
- Query functions and context objects are memoized to **prevent unnecessary re-renders** in deeply nested components.
- This is especially important in performance-sensitive areas like the dashboard, where multiple components (Deposit, Withdraw, Balance, TransactionHistory) rely on shared state.

⚡ **Why it’s powerful**: Memoization keeps components lightweight and avoids performance issues as the UI scales. Even as more features are added, the render tree remains stable, and state changes are isolated only to where they matter.

---

### 🧾 MongoDB — Flexible and Scalable Persistence

The backend uses MongoDB to persist user accounts, balances, and transactions:
- Each account stores its own transaction history, current balance, daily withdrawal limit, and last withdrawal timestamp.
- Built-in support for full export to Excel (`xlsx`) allows users to download their transaction history.
- Both native MongoDB driver and Mongoose are used strategically: native for performance, Mongoose for schema enforcement.

💾 **Why it’s ideal**: MongoDB’s flexible schema makes it easy to store structured but dynamic data like transactions. Combined with withdrawal tracking logic, it ensures accurate financial state management over time.

---

### 🔐 Cookie-Based Authentication (HttpOnly)

Authentication is handled using secure **HttpOnly cookies** — not localStorage:
- Login sets a cookie with `accountId`.
- All protected API routes check for this cookie using `middleware.js`.
- Logout clears the cookie with a `Set-Cookie` header (and no need to redirect or expose anything to JS).

🔒 **Why it’s secure**: HttpOnly cookies can’t be accessed from JavaScript, making them less vulnerable to XSS attacks. This brings real-world session handling to the app and enforces it cleanly across API routes.

---

### 🧪 Zod — Strong Input Validation at the Edge

Zod is used to validate all user inputs before they touch the database:
- Especially useful on login, where malformed requests are immediately rejected.
- Removes the need for custom error checking logic.
- Ensures inputs are sanitized and constraints are enforced early.

✅ **Why it helps**: Zod turns potentially unsafe or invalid requests into clearly structured error responses. It reduces the chance of edge case bugs and keeps backend logic clean and focused.

---

### 📦 Context Providers — Lightweight Global State

The app uses React’s `Context API` to manage global values:
- `SessionContext` tracks the logged-in user account ID.
- `AccountContext` is scoped to things like transaction state and error handling.

These contexts are memoized with `useMemo` to avoid re-renders in components that don’t need to change. State is kept minimal — no unnecessary fields bloating the provider.

🔄 **Why it scales**: This setup avoids heavy state management libraries while still offering controlled global data. When a balance updates, only the components that depend on it are refreshed, not the entire tree.

---

## 🧠 Design for Speed, Feedback, and Resilience

- **Optimistic Rendering**: When you deposit or withdraw money, the app doesn’t wait for confirmation. The UI updates immediately — the balance and transaction list reflect the change as if it succeeded. If the backend later fails (e.g. insufficient funds), the UI reverts to the previous state seamlessly.
  
- **Prefetching & Hydration**: The balance is preloaded server-side in `layout.js` using `HydrationBoundary`, so the user sees their info right away — no loading spinners or flickers.

- **Session Guarding**: Protected routes are blocked unless a valid cookie is present, with a simple middleware layer enforcing this across all `/api` endpoints.

---

## 💡 Feature Overview

- 🔐 Login with PIN-based account authentication
- 📊 Real-time balance display
- 💸 Deposit funds with validation
- 🧾 Withdraw with dynamic daily limit enforcement
- 🧠 Optimistic UI updates (instant feedback)
- 📜 View last 10 transactions
- 📥 Export full history to Excel
- 🚫 Unauthorized access blocked via middleware
- ⚡ Zero re-renders on unrelated state changes
- ✅ Secure sessions with HttpOnly cookies

---

## 🧪 How to Run

```bash
git clone https://github.com/your-username/heb-atm
cd heb-atm
npm install
echo "MONGODB_URI=your-mongodb-connection-string" > .env.local
npm run dev
