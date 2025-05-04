import { connectToDB } from "@/lib/mongoose";
import Account from "@/models/Account";
import { cookies } from "next/headers";

export async function GET(req) {
  try {
    const cookieStore = await cookies();
    const accountId = cookieStore.get("accountId")?.value;

    if (!accountId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();
    const account = await Account.findOne({ accountId });

    if (!account) {
      return Response.json({ error: "Account not found" }, { status: 404 });
    }

    const url = new URL(req.url);
    const limit = parseInt(url.searchParams.get("limit")) || 10;

    const transactions = account.transactions.slice(-limit).reverse();

    return Response.json({ transactions });
  } catch (err) {
    console.error("Transaction history error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
