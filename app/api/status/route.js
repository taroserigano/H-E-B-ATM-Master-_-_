import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    await client.db().command({ ping: 1 });

    return new Response(JSON.stringify({ connected: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ connected: false }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
