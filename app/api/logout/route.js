// ✅ app/api/logout/route.js
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();

  // 🔐 Clear the session by overwriting cookie
  cookieStore.set("accountId", "", {
    path: "/",
    maxAge: 0,
    httpOnly: true,
    sameSite: "lax",
  });

  return NextResponse.json({ success: true });
}
