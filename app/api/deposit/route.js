// app/api/deposit/route.js
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { performDeposit } from "@/lib/actions/performDeposit";

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

    const newBalance = await performDeposit(accountId, numericAmount);

    return NextResponse.json({ success: true, balance: newBalance });
  } catch (err) {
    console.error("Deposit error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
