import { cookies } from "next/headers";
import { getAccounts, saveAccounts } from "@/lib/db";

export async function POST(req) {
  try {
    console.log("[POST] /api/deposit hit");

    const cookieStore = await cookies();
    const accountId = cookieStore.get("accountId")?.value;

    if (!accountId) {
      console.warn("Unauthorized access attempt");
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

    console.log(
      `Deposit success for ${accountId}: new balance = ${account.balance}`
    );

    return new Response(
      JSON.stringify({ success: true, newBalance: account.balance }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Deposit API Error:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
