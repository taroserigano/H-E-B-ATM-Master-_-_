// lib/sessionOptions.js
export const sessionOptions = {
  password: process.env.SESSION_SECRET, // should be a strong secret in env
  cookieName: "heb_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  },
};
