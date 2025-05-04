import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  // ✅ Correct way to expire the session cookie
  res.headers.set(
    "Set-Cookie",
    "accountId=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax"
  );

  return res;
}
