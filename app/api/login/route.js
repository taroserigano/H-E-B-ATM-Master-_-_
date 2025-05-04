import { NextResponse } from "next/server";
import { validateLogin } from "@/lib/actions/validateLogin";
import { z } from "zod";

const COOKIE_NAME = "accountId";
const LoginSchema = z.object({
  accountId: z.string().min(1),
  pin: z.string().min(1),
});

export async function POST(req) {
  const body = await req.json();
  const result = LoginSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { accountId, pin } = result.data;

  // ✅ Call shared action
  const account = await validateLogin(accountId, pin);

  if (!account) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  res.headers.set(
    "Set-Cookie",
    `${COOKIE_NAME}=${accountId}; Path=/; HttpOnly; SameSite=Lax`
  );
  return res;
}
