import { connectToDB } from "./mongoose";
import Account from "@/models/Account";

// Find account by accountId
export async function getAccountById(accountId) {
  await connectToDB();
  return Account.findOne({ accountId });
}

// Update account with provided fields
export async function updateAccount(accountId, updates) {
  await connectToDB();
  return Account.findOneAndUpdate({ accountId }, updates, {
    new: true,
  });
}

// Add amount to account balance and save
export async function addToBalance(accountId, amount) {
  await connectToDB();
  const account = await Account.findOne({ accountId });
  if (!account) return null;
  account.balance += amount;
  await account.save();
  return account;
}

// Get all transactions for an account
export async function getAllTransactions(accountId) {
  await connectToDB();
  const account = await Account.findOne({ accountId });
  return account?.transactions || [];
}

// Add a transaction to the account history
export async function addTransaction(accountId, transaction) {
  await connectToDB();
  const account = await Account.findOne({ accountId });
  if (!account) return null;
  account.transactions.push(transaction);
  await account.save();
  return account;
}
