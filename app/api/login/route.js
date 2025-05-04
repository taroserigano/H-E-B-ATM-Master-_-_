import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import Account from "@/models/Account";

const COOKIE_NAME = "accountId";

export async function POST(req) {
  try {
    await connectToDB();

    const body = await req.json();
    const { accountId, pin } = body;

    // ✅ Validate required fields
    if (!accountId || !pin) {
      return NextResponse.json(
        { error: "Missing credentials" },
        { status: 400 }
      );
    }

    const account = await Account.findOne({ accountId });

    if (!account || account.pin !== pin) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // ✅ Set session cookie manually
    const response = NextResponse.json({ success: true });

    response.headers.set(
      "Set-Cookie",
      `${COOKIE_NAME}=${accountId}; Path=/; HttpOnly; SameSite=Lax`
    );

    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
