# H‑E‑B ATM App

This is a full-stack ATM simulation built with **Next.js App Router**, **React Query**, and **MongoDB**. It allows users to log in with a PIN, view their balance, deposit or withdraw funds, and track their transaction history. The goal was to create something that feels clean, fast, and secure — the way you'd expect a real ATM experience to behave.

---

## 🔧 Tech Stack and Why It Matters

### 🧭 Next.js 15 (App Router)
- Used server components and layouts for faster page loads and simplified data hydration.
- App Router helped keep routes organized with cleaner APIs for `cookies()`, `Response.json()`, etc.

### ⚛️ React Query
- Handles all data fetching, caching, revalidation, and mutation logic.
- Automatically keeps data in sync after deposit/withdrawal.
- Optimistic updates are used for instant feedback — the balance updates *before* the server confirms.
- Added stale time + refetchOnWindowFocus for performance without sacrificing freshness.

### 🍪 HttpOnly Cookie-Based Sessions
- Session is tracked securely using cookies instead of localStorage.
- Middleware blocks access to all protected routes unless the `accountId` cookie is present.
- Login and logout are fully handled with `Set-Cookie` headers, without exposing sensitive data to the client.

### ⚙️ Zod
- Used in the login route to validate input cleanly.
- Prevents malformed or missing values before hitting database logic.

### 🧠 Memoization & Contexts
- `useMemo` is used in several places (e.g. for context value stability and balance formatting).
- `SessionContext` and `AccountContext` cleanly separate global state like `accountId` and `transactions`.
- Reduces unnecessary re-renders across the dashboard.

### 🧾 MongoDB (Native & Mongoose)
- Data persistence is handled with MongoDB, supporting transaction history, daily withdrawal tracking, and balance updates.
- Mongoose is used in some service functions (like login) while native MongoDB driver is used elsewhere for flexibility.
- Supports both development and production environments with optimized connections.

---

## 💡 Key Features

- Secure PIN-based login (1111/2222/3333 accounts available for demo)
- HttpOnly cookie-based session handling
- View account balance in real-time
- Simulate deposits and withdrawals with validation
- Enforced daily withdrawal limit with dynamic tracking
- Transaction history viewer (latest 10) + Excel export
- Clean UI with Tailwind CSS
- Debounced login auto-submit to reduce spam and unnecessary traffic
- Dynamic feedback: loading states, error messages, and success indicators

---

## 🧠 Performance and Developer Decisions

- **Optimistic updates** give users the illusion of speed — balance and history update before the server confirms.
- **React Query** helps avoid redundant API calls and keeps data consistent with minimal boilerplate.
- **Zod** catches invalid inputs early without custom validation code.
- **Memoized components and inputs** reduce unnecessary React re-renders, keeping the app responsive.
- **Context providers** are scoped tightly, so each part of the app only listens to what it needs.

---

## 🧪 How to Run Locally

```bash
git clone https://github.com/your-username/heb-atm
cd heb-atm
npm install
echo "MONGODB_URI=your-connection-string" > .env.local
npm run dev

