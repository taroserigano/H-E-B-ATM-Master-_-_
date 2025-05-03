// lib/mongoose.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("⚠️ MONGODB_URI not defined in .env");
}

let isConnected = false;

export async function connectToDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "atm",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("✅ Mongoose connected to MongoDB");
  } catch (err) {
    console.error("❌ Mongoose connection failed", err);
    throw err;
  }
}
