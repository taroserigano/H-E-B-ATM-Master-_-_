# Requirement for Interview take home exam - HEB Tech Round 

Overview
Before your interview, we would like for you to complete the following programming
assignment.
We will use this exercise to get a sense of your problem solving skills, your decomposition skills,
and the way that you approach refactoring.
Parameters
• Complete the requirement as described below
• This exercise is conceptual in nature and does not need to be a fully finished product
• Be prepared to speak about any extra work that you would’ve done if you had more time
at an onsite.
• Your solution will be discussed during the interview.
• Use whatever language and framework you prefer. (We typically use
React/Javascript/Typescript).
Problem Description
PART I
Provide a basic ATM (Automated Teller Machine) implementation. At a minimum, this program
should offer the following features:
• Enter a PIN to identify a unique customer
• Query and show the current account balance
• Simulate the withdrawal of cash
• Simulate a deposit
• A daily withdrawal limit
PART II (to the best of your ability)
Define an HTTP REST API in [Java/Node.js/Python] for the service layer to support the above
implementation.
- At a minimum, can you provide the API specification for the API layer?
- Can you implement at least one of the API methods from your specification?
- Can you set up a persistent data store?
Submit the following
• Provide complete steps to compile and run your project.
• The full source of your solution in a Github, Bitbucket or Gitlab repo.
• If brought in for an interview, we will:
o Ask you to describe your design and implementation decisions.

o Ask you to talk about testing scenarios and considerations for real-world
deployment.
o Ask you about the next set of features that you would want to implement or any
improvements on your current implementation.
 
• For ease of sharing we recommend using codesandbox.io, but it’s not required.


# H-E-B ATM 💳  
**Live Site:** [https://h-e-b-atm-master.vercel.app](https://h-e-b-atm-master.vercel.app)

### Use Account ID: 1111 PIN: 1234

---

## Overview

A full-stack ATM simulation app built with **Next.js 15 App Router**, **React Query**, and **MongoDB**. Users can securely log in, check balances, perform deposits/withdrawals, and view their transaction history — all with a clean, responsive UI and fast, optimized performance.

This app delivers **real-time responsiveness** and **high reliability**.

Every transaction—whether a deposit or withdrawal—is processed instantly in MongoDB and reflected in the UI immediately. Thanks to **optimistic UI updates**, users see updated balances and transaction history the moment they take action.

All data is automatically **cached and synced** through React Query. This ensures:
- Ultra fast initial loads through prefetching and hydration
- Seamless updates after every action
- Immediate rollback on failure
- Accurate, up-to-date views across all components

From the user’s perspective, the experience feels **instant and reliable**—similar to a real banking application.

---

## ✅✅ Core Features

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

### ✅ Performance & Caching

React Query + Optimistic UI
- Handles all API calls, caching, retries, and syncing.
- Optimistic UI rendering make transactions feel immediate.
- Manual cache invalidation ensures precise updates—no over-fetching.

### ✅ Data Prefetching
- The dashboard preloads balance on the server using `prefetchQuery` + `HydrationBoundary`.
- Results in fast time-to-content without client-side loading delays.

### ✅ Memoization for Efficiency
- `React.memo`: avoids unnecessary re-renders.
- `useMemo`: caches expensive values (like formatted balances).
- `useCallback`: memoizes stable event handlers to reduce effect triggers and renders.

These combined techniques ensure the UI remains **fast, lean, and responsive**.

---

##  Filtering & Pagination

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

## ✅ Authentication & Session Management

- Login sets an `accountId` in an **HttpOnly cookie**.
- API routes are protected using middleware.
- Logout clears the session using secure `Set-Cookie`.

This avoids token storage in JavaScript and ensures consistent behavior across tabs and reloads.

---

## ✅ MongoDB Persistence

- Stores account balance, PIN, and full transaction history.
- Tracks `withdrawnToday` and `lastWithdrawDate` for enforcing daily limits.
- Each transaction includes amount, type, date, and resulting balance.
- Added Indexing to speed up lookup during login and API access

Combines native MongoDB driver performance with schema validation via Mongoose.

---

## ✅ Zod Validation

All login input is validated on the server using **Zod**, ensuring clean, typed, and secure request payloads.

---

## ✅ SEO Metadata Configuration (Next.js 15)

The app leverages **Next.js 15 App Router**'s built-in metadata system for better SEO visibility and richer social previews.

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
git clone the repo 
cd heb-atm
npm install
npm run dev

Environment Variables
To run the app, a .env file is required in the root directory of the project.

If it hasn’t been provided already, please contact Karen or Jamie to obtain the
correct .env file.

Once received, please create a new file by .env at the root of the project. 

in side .env file, 
MONGODB_URI=<mongodb-atlas-uri>

Please make sure the .env file is saved in the root directory — alongside package.json.

