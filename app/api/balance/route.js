import { cookies } from "next/headers";
import { getAccounts } from "@/lib/db";

export async function GET(request) {
  const cookieStore = await cookies();
  const accountId = cookieStore.get("accountId")?.value;

  if (!accountId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
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

  return new Response(JSON.stringify({ balance: account.balance }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
