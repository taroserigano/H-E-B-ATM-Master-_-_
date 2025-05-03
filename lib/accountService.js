// lib/accountService.js

import clientPromise from "./mongodb";

export async function getAccountById(accountId) {
  const client = await clientPromise;
  const db = client.db("atm");
  return db.collection("accounts").findOne({ accountId });
}

export async function updateAccount(accountId, updates) {
  const client = await clientPromise;
  const db = client.db("atm");
  return db.collection("accounts").updateOne({ accountId }, { $set: updates });
}

export async function addToBalance(accountId, amount) {
  const client = await clientPromise;
  const db = client.db("atm");

  const result = await db
    .collection("accounts")
    .findOneAndUpdate(
      { accountId },
      { $inc: { balance: amount } },
      { returnDocument: "after" }
    );

  return result.value;
}
