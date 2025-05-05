import { cookies } from "next/headers";
import { getAccountById } from "@/lib/accountService";

// Get account balance (more details such as name, emails, address etc. can be added later)
export async function GET() {
  const cookieStore = await cookies();
  const accountId = cookieStore.get("accountId")?.value;

  // No session
  if (!accountId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const account = await getAccountById(accountId);

  // Account not found
  if (!account) {
    return Response.json({ error: "Account not found" }, { status: 404 });
  }

  // Return balance
  return Response.json({ balance: account.balance });
}
