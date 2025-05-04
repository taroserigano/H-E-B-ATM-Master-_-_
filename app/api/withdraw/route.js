import { cookies } from "next/headers";
import { performWithdraw } from "@/lib/actions/performWithdraw";

export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const accountId = cookieStore.get("accountId")?.value;

    if (!accountId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { amount } = await req.json();
    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      return Response.json({ error: "Invalid amount" }, { status: 400 });
    }

    const newBalance = await performWithdraw(accountId, numericAmount);

    return Response.json({ success: true, balance: newBalance });
  } catch (err) {
    console.error("Withdraw error:", err.message);
    return Response.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
