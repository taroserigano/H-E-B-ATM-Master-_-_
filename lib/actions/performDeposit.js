import clientPromise from "@/lib/mongodb";

export async function performDeposit(accountId, amount) {
  const client = await clientPromise;
  const db = client.db("atm");

  const account = await db.collection("accounts").findOne({ accountId });

  if (!account) {
    throw new Error("Account not found");
  }

  const newBalance = account.balance + amount;

  await db.collection("accounts").updateOne(
    { accountId },
    {
      $set: { balance: newBalance },
      $push: {
        transactions: {
          type: "deposit",
          amount,
          balanceAfter: newBalance,
          date: new Date(),
        },
      },
    }
  );

  return newBalance;
}
