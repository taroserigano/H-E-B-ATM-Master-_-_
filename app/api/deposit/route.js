import { cookies } from "next/headers";
import { getAccounts, saveAccounts } from "@/lib/db";

export async function POST(req) {
  const cookieStore = cookies();
  const accountId = cookieStore.get("accountId")?.value;

  if (!accountId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { amount } = await req.json();

  if (!amount || isNaN(amount) || amount <= 0) {
    return new Response(JSON.stringify({ error: "Invalid amount" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const accounts = getAccounts();
  const account = accounts.find((acc) => acc.accountId === accountId);

  if (!account) {
    return new Response(JSON.stringify({ error: "Account not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  account.balance += Number(amount);
  saveAccounts(accounts);

  return new Response(
    JSON.stringify({ success: true, newBalance: account.balance }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
