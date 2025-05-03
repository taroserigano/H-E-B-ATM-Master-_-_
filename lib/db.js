// lib/db.js
import fs from "fs";
import path from "path";

// Absolute path to the accounts.json file in /data
const filePath = path.join(process.cwd(), "data", "accounts.json");

/**
 * Reads all account records from the JSON file.
 * Used to authenticate users, fetch balance, etc.
 * @returns {Array} List of account objects
 */
export function getAccounts() {
  const fileData = fs.readFileSync(filePath, "utf-8"); // read as string
  return JSON.parse(fileData); // parse JSON to JS array
}

/**
 * Overwrites the JSON file with updated account data.
 * Used after deposit, withdrawal, or updating daily limit.
 * @param {Array} accounts - List of updated account objects
 */
export function saveAccounts(accounts) {
  fs.writeFileSync(
    filePath,
    JSON.stringify(accounts, null, 2), // pretty print with 2-space indent
    "utf-8"
  );
}
