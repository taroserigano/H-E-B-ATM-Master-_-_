import { getAccounts } from "@/lib/db";

export async function POST(req) {
  try {
    const { accountId, pin } = await req.json();
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

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Set-Cookie": `accountId=${accountId}; Path=/; HttpOnly; SameSite=Lax`,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
