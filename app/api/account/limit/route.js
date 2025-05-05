import { cookies } from "next/headers";
import { getAccountById } from "@/lib/accountService";

// Get daily withdrawal info
export async function GET() {
  const cookieStore = await cookies();
  const accountId = cookieStore.get("accountId")?.value;

  // No session
  if (!accountId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const account = await getAccountById(accountId);

  // Invalid account
  if (!account) {
    return Response.json({ error: "Account not found" }, { status: 404 });
  }

  // Reset if new day
  const today = new Date().toISOString().split("T")[0];
  const isNewDay = account.lastWithdrawDate !== today;
  const withdrawnToday = isNewDay ? 0 : account.withdrawnToday || 0;

  // Return limit info
  return Response.json({
    dailyLimit: account.dailyLimit,
    withdrawnToday,
    remaining: Math.max(0, account.dailyLimit - withdrawnToday),
  });
}
