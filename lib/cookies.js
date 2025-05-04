import { cookies } from "next/headers";

export const SESSION_COOKIE_NAME = "session";

export async function setSession(accountId) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, accountId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 1 day
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const value = cookieStore.get(SESSION_COOKIE_NAME);
  return value?.value || null;
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
