import { cookies } from "next/headers";

const users = {
  1111: "1234",
  2222: "1234",
  3333: "1234",
};

export async function POST(req) {
  const { account, pin } = await req.json();
  console.log("Received:", { account, pin });

  if (users[account] === pin) {
    const cookieStore = await cookies(); // ✅ await is required
    cookieStore.set("session", account, {
      httpOnly: true,
      secure: true, // ⚠️ Set to false for localhost testing
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });
    return Response.json({ success: true });
  }

  return Response.json({ error: "Invalid login" }, { status: 401 });
}
