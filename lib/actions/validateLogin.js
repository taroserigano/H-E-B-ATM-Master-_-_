import { connectToDB } from "@/lib/mongoose";
import Account from "@/models/Account";

export async function validateLogin(accountId, pin) {
  await connectToDB();
  const account = await Account.findOne({ accountId });

  if (!account || account.pin !== pin) {
    return null; // Invalid login
  }

  return account; // Valid login → return account doc
}
