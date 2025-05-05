import clientPromise from "@/lib/mongodb";
import { cookies } from "next/headers";

// Server-side balance preload for React Query hydration
export async function preloadBalance() {
  const cookieStore = await cookies();
  const accountId = cookieStore.get("accountId")?.value;
  if (!accountId) return null;

  const client = await clientPromise;
  const db = client.db("atm");
  const account = await db.collection("accounts").findOne({ accountId });

  return account ? account.balance : null;
}
