// models/Account.js
import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  accountId: { type: String, required: true, unique: true },
  pin: { type: String, required: true },
  balance: { type: Number, default: 0 },
  withdrawnToday: { type: Number, default: 0 },
  dailyLimit: { type: Number, default: 500 },
  lastWithdrawDate: { type: String, default: null },
});

export default mongoose.models.Account ||
  mongoose.model("Account", AccountSchema);
