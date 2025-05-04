import { cookies } from "next/headers";
import clientPromise from "@/lib/mongodb"; // Using MongoClient here
// If you're switching to mongoose only, you’d use connectToDB + Account model

const COOKIE_NAME = "accountId";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accountId = cookieStore.get(COOKIE_NAME)?.value;

    if (!accountId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("atm");

    const account = await db.collection("accounts").findOne({ accountId });

    if (!account) {
      return Response.json({ error: "Account not found" }, { status: 404 });
    }

    return Response.json({ balance: account.balance });
  } catch (err) {
    console.error("Account fetch error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
