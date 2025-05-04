import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { performWithdraw } from "@/lib/actions/performWithdraw";

export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const accountId = cookieStore.get("accountId")?.value;

    if (!accountId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { amount } = await req.json();
    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // ✅ No re-auth needed — cookie is enough
    const newBalance = await performWithdraw(accountId, numericAmount);

    return NextResponse.json({ success: true, balance: newBalance });
  } catch (err) {
    console.error("Withdraw error:", err.message);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
