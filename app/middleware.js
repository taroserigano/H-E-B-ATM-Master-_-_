import { NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/api/status", "/api/login"];
const COOKIE_NAME = "accountId";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // ✅ Allow public endpoints
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // Allow only with accountId
  if (pathname.startsWith("/api/")) {
    const hasSession = req.cookies.get(COOKIE_NAME);
    if (!hasSession) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
