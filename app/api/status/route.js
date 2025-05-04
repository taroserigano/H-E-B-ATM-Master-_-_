import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    await client.db().command({ ping: 1 });

    return Response.json({ connected: true });
  } catch (error) {
    return Response.json({ connected: false }, { status: 500 });
  }
}
