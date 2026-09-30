import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;

  // Restrict /admin routes on the primary public domain (e.g., learnbuildhub.com / www.learnbuildhub.com)
  if (pathname.startsWith("/admin")) {
    if (host.toLowerCase().includes("learnbuildhub.com")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
