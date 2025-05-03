// app/api/account/route.js
import clientPromise from "@/lib/mongodb";
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

    const client = await clientPromise;
    const db = client.db("atm");

    const account = await db.collection("accounts").findOne({ accountId });

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
  } catch (err) {
    console.error("Account fetch error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
