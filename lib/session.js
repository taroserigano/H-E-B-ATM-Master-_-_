// import { getIronSession } from "iron-session/edge";

// export const sessionOptions = {
//   password: process.env.SESSION_PASSWORD || "secure_password_1234567890!",
//   cookieName: "atm_session",
//   cookieOptions: {
//     secure: process.env.NODE_ENV === "production",
//     httpOnly: true,
//     sameSite: "lax",
//     maxAge: 60 * 60 * 24, // 1 day
//   },
// };

// // Compatible with Web API Request in App Router
// export async function getSession(req) {
//   return getIronSession(req, sessionOptions);
// }

// lib/session.js
// lib/session.js
// import { getIronSession } from "iron-session";

// export const sessionOptions = {
//   password: process.env.SESSION_SECRET,
//   cookieName: "heb_session",
//   cookieOptions: {
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//     path: "/",
//   },
// };

// export function getSession(req) {
//   return getIronSession(req, sessionOptions);
// }
