import clientPromise from "@/lib/mongodb";

const DAILY_LIMIT = 500;

export async function performWithdraw(accountId, amount) {
  const client = await clientPromise;
  const db = client.db("atm");

  const account = await db.collection("accounts").findOne({ accountId });

  if (!account) throw new Error("Account not found");

  const today = new Date().toISOString().split("T")[0];
  const isNewDay = account.lastWithdrawDate !== today;
  const withdrawnToday = isNewDay ? 0 : account.withdrawnToday || 0;
  const newTotal = withdrawnToday + amount;

  if (newTotal > DAILY_LIMIT) {
    throw new Error(`Daily limit of $${DAILY_LIMIT} exceeded`);
  }

  if (account.balance < amount) {
    throw new Error("Insufficient funds");
  }

  const newBalance = account.balance - amount;

  await db.collection("accounts").updateOne(
    { accountId },
    {
      $set: {
        balance: newBalance,
        withdrawnToday: newTotal,
        lastWithdrawDate: today,
      },
      $push: {
        transactions: {
          type: "withdraw",
          amount,
          balanceAfter: newBalance,
          date: new Date(),
        },
      },
    }
  );

  return newBalance;
}
