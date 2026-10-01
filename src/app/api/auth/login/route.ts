import { NextResponse } from "next/server";
import { signJwt } from "@/lib/jwt";
import { isAdminEmail } from "@/lib/supabase/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Verify if email qualifies as an authorized admin account
    if (!isAdminEmail(cleanEmail)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized account access." },
        { status: 403 }
      );
    }

    // Sign a 24-hour JWT token
    const token = await signJwt({
      sub: `admin-${Date.now()}`,
      email: cleanEmail,
      role: "admin",
    });

    const response = NextResponse.json({
      success: true,
      message: "Admin authentication successful.",
      user: {
        email: cleanEmail,
        role: "admin",
      },
    });

    // Set secure HTTP-only cookie
    response.cookies.set("lb_jwt_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 86400, // 24 hours
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Authentication error." },
      { status: 500 }
    );
  }
}
