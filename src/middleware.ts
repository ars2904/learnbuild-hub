import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt, decodeJwtPayload } from "@/lib/jwt";
import { isAdminEmail } from "@/lib/supabase/auth";

export async function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const pathname = request.nextUrl.pathname;
  const method = request.method;

  // 1. Restrict /admin UI routes on the primary public domain (e.g. learnbuildhub.com)
  if (pathname.startsWith("/admin")) {
    if (host.toLowerCase().includes("learnbuildhub.com")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // 2. Protect /api/admin/* and mutating /api/cms API endpoints with JWT token verification
  const isProtectedAdminApi = pathname.startsWith("/api/admin");
  const isProtectedCmsMutation = pathname.startsWith("/api/cms") && method !== "GET";

  if (isProtectedAdminApi || isProtectedCmsMutation) {
    const token =
      request.cookies.get("lb_jwt_token")?.value ||
      request.headers.get("authorization")?.replace("Bearer ", "");

    let isValidAdmin = false;

    if (token) {
      // 1. Verify app-signed HMAC JWT
      const payload = await verifyJwt(token);
      if (payload && (payload.role === "admin" || isAdminEmail(payload.email))) {
        isValidAdmin = true;
      } else {
        // 2. Fallback: decode Supabase Auth or OAuth JWT claims
        const decoded = decodeJwtPayload(token);
        if (decoded && (decoded.role === "admin" || isAdminEmail(decoded.email))) {
          isValidAdmin = true;
        }
      }
    }

    if (!isValidAdmin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized API access. Valid admin JWT token required." },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*", "/api/cms"],
};
