import { cookies } from "next/headers";
import { getAccountById } from "@/lib/accountService";

export async function GET() {
  const cookieStore = await cookies();
  const accountId = cookieStore.get("accountId")?.value;

  if (!accountId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const account = await getAccountById(accountId);
  if (!account) {
    return Response.json({ error: "Account not found" }, { status: 404 });
  }

  return Response.json({ balance: account.balance });
}
