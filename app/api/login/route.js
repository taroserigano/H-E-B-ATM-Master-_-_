import { validateLogin } from "@/lib/actions/validateLogin";
import { z } from "zod";
import { NextResponse } from "next/server";

const COOKIE_NAME = "accountId";

// Validate login input using Zod schema
const LoginSchema = z.object({
  accountId: z.string().min(1),
  pin: z.string().min(1),
});

// Handle login
export async function POST(req) {
  const body = await req.json();
  const result = LoginSchema.safeParse(body);

  // Invalid input
  if (!result.success) {
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }

  const { accountId, pin } = result.data;
  const account = await validateLogin(accountId, pin);

  // Invalid credentials
  if (!account) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Set session cookie
  const res = Response.json({ success: true });
  res.headers.set(
    "Set-Cookie",
    `${COOKIE_NAME}=${accountId}; Path=/; HttpOnly; SameSite=Lax`
  );
  return res;
}
