// /app/api/account/limit/route.js
import { cookies } from "next/headers";
import { getAccountById } from "@/lib/accountService";

export async function GET() {
  const cookieStore = await cookies();
  const accountId = cookieStore.get("accountId")?.value;

  if (!accountId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const account = await getAccountById(accountId);
  if (!account) {
    return new Response(JSON.stringify({ error: "Account not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const today = new Date().toISOString().split("T")[0];
  const isNewDay = account.lastWithdrawDate !== today;
  const withdrawnToday = isNewDay ? 0 : account.withdrawnToday || 0;

  return new Response(
    JSON.stringify({
      dailyLimit: account.dailyLimit,
      withdrawnToday,
      remaining: Math.max(0, account.dailyLimit - withdrawnToday),
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
