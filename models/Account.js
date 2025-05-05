import mongoose from "mongoose";

// Schema for individual transactions
const TransactionSchema = new mongoose.Schema({
  type: { type: String, enum: ["deposit", "withdraw"], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  balanceAfter: { type: Number, required: true },
});

// Schema for an account with transaction history and limits
const AccountSchema = new mongoose.Schema({
  accountId: { type: String, required: true, unique: true },
  pin: { type: String, required: true },
  balance: { type: Number, default: 0 },
  withdrawnToday: { type: Number, default: 0 },
  dailyLimit: { type: Number, default: 500 },
  lastWithdrawDate: { type: String, default: null },
  transactions: [TransactionSchema],
});

// Export existing model if already compiled (
export default mongoose.models.Account ||
  mongoose.model("Account", AccountSchema);
