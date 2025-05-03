import { getAccounts } from "@/lib/db";

export async function POST(req) {
  const { accountId, pin } = await req.json();

  if (!accountId || !pin) {
    return new Response(
      JSON.stringify({ error: "Account ID and PIN required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const accounts = getAccounts();
  const account = accounts.find(
    (acc) => acc.accountId === accountId && acc.pin === pin
  );

  if (!account) {
    return new Response(JSON.stringify({ error: "Invalid credentials" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Set httpOnly cookie for accountId
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `accountId=${account.accountId}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax`,
    },
  });
}
