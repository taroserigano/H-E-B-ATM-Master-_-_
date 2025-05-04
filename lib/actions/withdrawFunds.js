// import Account from "@/models/Account";
// import { connectToDB } from "@/lib/mongoose";
// import { validateLogin } from "./validateLogin";

// export async function withdrawFunds(accountId, pin, amount) {
//   await connectToDB();

//   const account = await validateLogin(accountId, pin);
//   if (!account) throw new Error("Invalid credentials");

//   if (amount <= 0) throw new Error("Amount must be positive");
//   if (amount > account.balance) throw new Error("Insufficient funds");

//   account.balance -= amount;

//   account.transactions.push({
//     type: "withdraw",
//     amount,
//     balanceAfter: account.balance,
//     date: new Date(),
//   });

//   await account.save();
//   return { balance: account.balance };
// }
