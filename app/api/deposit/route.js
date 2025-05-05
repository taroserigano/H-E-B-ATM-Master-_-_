import { cookies } from "next/headers";
import { performDeposit } from "@/lib/actions/performDeposit";

// Handle deposit request
export async function POST(req) {
  try {
    const cookieStore = await cookies();
    const accountId = cookieStore.get("accountId")?.value;

    // No session
    if (!accountId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { amount } = await req.json();
    const numericAmount = parseFloat(amount);

    // Invalid input
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return Response.json({ error: "Invalid amount" }, { status: 400 });
    }

    // Update balance
    const newBalance = await performDeposit(accountId, numericAmount);

    return Response.json({ success: true, balance: newBalance });
  } catch (err) {
    console.error("Deposit error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
