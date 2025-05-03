export async function POST() {
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": "accountId=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax",
    },
  });
}
