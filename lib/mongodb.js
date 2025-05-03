// lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MONGODB_URI to .env");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect().then((connectedClient) => {
      console.log("✅ Connected to MongoDB (dev)");
      return connectedClient;
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect().then((connectedClient) => {
    console.log("✅ Connected to MongoDB (prod)");
    return connectedClient;
  });
}

export default clientPromise;
