import { cookies } from "next/headers";
import { connectToDB } from "@/lib/mongoose";
import Account from "@/models/Account";

// Return paginated transaction history for the logged-in user
export async function GET(req) {
  try {
    const cookieStore = await cookies();
    const accountId = cookieStore.get("accountId")?.value;

    // No session
    if (!accountId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDB();
    const account = await Account.findOne({ accountId });

    // Account not found
    if (!account) {
      return Response.json({ error: "Account not found" }, { status: 404 });
    }

    // Pagination params
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Get paginated, newest-first transactions
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
