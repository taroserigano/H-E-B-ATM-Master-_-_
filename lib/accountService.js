// lib/accountService.js
import { connectToDB } from "./mongoose";
import Account from "@/models/Account";

export async function getAccountById(accountId) {
  await connectToDB();
  return Account.findOne({ accountId });
}

export async function updateAccount(accountId, updates) {
  await connectToDB();
  return Account.findOneAndUpdate({ accountId }, updates, {
    new: true,
  });
}

export async function addToBalance(accountId, amount) {
  await connectToDB();
  const account = await Account.findOne({ accountId });
  if (!account) return null;
  account.balance += amount;
  await account.save();
  return account;
}

export async function getAllTransactions(accountId) {
  await connectToDB();
  const account = await Account.findOne({ accountId });
  return account?.transactions || [];
}

export async function addTransaction(accountId, transaction) {
  await connectToDB();
  const account = await Account.findOne({ accountId });
  if (!account) return null;
  account.transactions.push(transaction);
  await account.save();
  return account;
}
