import { cookies } from "next/headers";
import { getAccountById } from "@/lib/accountService";

export async function GET() {
  const cookieStore = await cookies();
  const accountId = cookieStore.get("accountId")?.value;

  if (!accountId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const account = await getAccountById(accountId);
  if (!account) {
    return Response.json({ error: "Account not found" }, { status: 404 });
  }

  const today = new Date().toISOString().split("T")[0];
  const isNewDay = account.lastWithdrawDate !== today;
  const withdrawnToday = isNewDay ? 0 : account.withdrawnToday || 0;

  return Response.json({
    dailyLimit: account.dailyLimit,
    withdrawnToday,
    remaining: Math.max(0, account.dailyLimit - withdrawnToday),
  });
}
