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

  return new Response(JSON.stringify({ balance: account.balance }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
