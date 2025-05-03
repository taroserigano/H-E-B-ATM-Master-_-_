// import { cookies } from "next/headers";
// import clientPromise from "@/lib/mongodb";
// import { ObjectId } from "mongodb";

// export async function POST(req) {
//   try {
//     const cookieStore = await cookies();
//     const accountId = cookieStore.get("accountId")?.value;

//     if (!accountId) {
//       return new Response(JSON.stringify({ error: "Unauthorized" }), {
//         status: 401,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     const { amount } = await req.json();
//     if (!amount || isNaN(amount) || amount <= 0) {
//       return new Response(JSON.stringify({ error: "Invalid amount" }), {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     const client = await clientPromise;
//     const db = client.db("atm");
//     const accountsCollection = db.collection("accounts");

//     const account = await accountsCollection.findOne({ accountId });
//     if (!account) {
//       return new Response(JSON.stringify({ error: "Account not found" }), {
//         status: 404,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     const newBalance = account.balance + Number(amount);
//     const result = await accountsCollection.updateOne(
//       { accountId },
//       { $set: { balance: newBalance } }
//     );

//     if (result.modifiedCount !== 1) {
//       throw new Error("Deposit failed to update balance");
//     }

//     return new Response(JSON.stringify({ success: true, newBalance }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (err) {
//     console.error("Deposit error:", err);
//     return new Response(JSON.stringify({ error: "Server error" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }
