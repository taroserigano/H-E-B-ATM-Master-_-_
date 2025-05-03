import { cookies } from "next/headers";
import { connectToDB } from "@/lib/mongoose";
import Account from "@/models/Account";

export async function POST(req) {
  try {
    const cookieStore = await cookies();
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

    await connectToDB();
    const account = await Account.findOne({ accountId });

    if (!account) {
      return new Response(JSON.stringify({ error: "Account not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    account.balance += Number(amount);

    account.transactions.push({
      type: "deposit",
      amount: Number(amount),
      balanceAfter: account.balance,
    });

    await account.save();

    return new Response(
      JSON.stringify({ success: true, newBalance: account.balance }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Deposit error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
