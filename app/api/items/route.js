import { cookies } from "next/headers";

const db = {}; // in-memory per-session data

export async function GET() {
  const cookieStore = await cookies(); // ✅ async now
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const items = db[session] || [];
  return Response.json(items);
}

export async function POST(req) {
  const cookieStore = await cookies(); // ✅ async
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name } = await req.json();
  if (!name) {
    return Response.json({ error: "Missing name" }, { status: 400 });
  }

  db[session] = db[session] || [];
  db[session].push(name);

  return Response.json({ success: true, items: db[session] });
}
