// app/api/transactions/route.js

import { connectToDB } from "@/lib/mongoose";
import Account from "@/models/Account";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = cookies();
    const accountId = cookieStore.get("accountId")?.value;

    if (!accountId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
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

    const last10 = account.transactions.slice(-10).reverse(); // newest first

    return new Response(JSON.stringify({ transactions: last10 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Transaction history error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
