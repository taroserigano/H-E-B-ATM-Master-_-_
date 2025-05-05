// ✅ Backend update: /app/api/transactions/route.js
import { cookies } from "next/headers";
import { connectToDB } from "@/lib/mongoose";
import Account from "@/models/Account";

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
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const transactions = account.transactions
      .slice()
      .reverse()
      .slice(startIndex, endIndex);

    const total = account.transactions.length;

    return Response.json({ transactions, total });
  } catch (err) {
    console.error("Pagination error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
