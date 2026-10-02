import { NextResponse } from "next/server";
import { verifyJwt, JwtPayload } from "@/lib/jwt";
import { createClient } from "@supabase/supabase-js";
import { isAdminEmail } from "@/lib/supabase/auth";

export interface AdminAuthResult {
  authorized: boolean;
  payload?: JwtPayload;
  errorResponse?: NextResponse;
}

/**
 * Server-side helper to verify if an incoming HTTP request is sent by an authenticated Admin.
 * Validates:
 * 1. HTTP-only cookie `lb_jwt_token`
 * 2. Authorization header `Bearer <jwt-token>`
 * 3. Supabase Auth user access token
 */
export async function verifyAdminRequest(request: Request): Promise<AdminAuthResult> {
  let token = "";

  // 1. Read lb_jwt_token from Cookie header
  const cookieHeader = request.headers.get("cookie") || "";
  const match = cookieHeader.match(/(?:^|;\s*)lb_jwt_token=([^;]+)/);
  if (match) {
    token = match[1];
  }

  // 2. Read Authorization header if cookie not found or as override
  const authHeader = request.headers.get("authorization") || "";
  if (authHeader.startsWith("Bearer ")) {
    token = authHeader.substring(7).trim();
  }

  if (token) {
    // Attempt JWT verification
    const payload = await verifyJwt(token);
    if (payload && payload.role === "admin") {
      return { authorized: true, payload };
    }

    // Attempt Supabase Auth access token verification if JWT check didn't pass
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (supabaseUrl && anonKey) {
      try {
        const supabase = createClient(supabaseUrl, anonKey);
        const { data: { user }, error } = await supabase.auth.getUser(token);
        if (!error && user) {
          const userRole = user.app_metadata?.role || user.user_metadata?.role;
          if (userRole === "admin" || (user.email && isAdminEmail(user.email))) {
            return {
              authorized: true,
              payload: { sub: user.id, email: user.email || "", role: "admin" },
            };
          }
        }
      } catch (e) {
        // Fallthrough if Supabase Auth check fails
      }
    }
  }

  return {
    authorized: false,
    errorResponse: NextResponse.json(
      {
        success: false,
        message: "Unauthorized access: Valid admin authentication token required.",
      },
      { status: 401 }
    ),
  };
}
