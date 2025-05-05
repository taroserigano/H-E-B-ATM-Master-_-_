import { NextResponse } from "next/server";

// Handle logout by clearing the session cookie
export async function POST() {
  const res = NextResponse.json({ success: true });

  // Expire the session cookie
  res.headers.set(
    "Set-Cookie",
    "accountId=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax"
  );

  return res;
}
