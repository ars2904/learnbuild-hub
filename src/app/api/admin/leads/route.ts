import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  try {
    const supabase = createServerClient();
    if (!supabase) {
      return NextResponse.json({ success: false, message: "Database connection missing." }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "enrollments";

    if (type === "demos") {
      const { data, error } = await supabase.from("demo_requests").select("*").order("created_at", { ascending: false });
      if (error) return NextResponse.json({ success: false, message: error.message }, { status: 400 });
      return NextResponse.json({ success: true, data });
    }

    if (type === "messages") {
      const { data, error } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
      if (error) return NextResponse.json({ success: false, message: error.message }, { status: 400 });
      return NextResponse.json({ success: true, data });
    }

    // Default: enrollments
    const { data, error } = await supabase.from("enrollments").select("*").order("created_at", { ascending: false });
    if (error) return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Server error fetching leads." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = createServerClient();
    if (!supabase) {
      return NextResponse.json({ success: false, message: "Database connection missing." }, { status: 500 });
    }

    const body = await request.json();
    const { id, type, status, instructor_name } = body;

    if (!id || !type) {
      return NextResponse.json({ success: false, message: "Lead ID and type are required." }, { status: 400 });
    }

    const tableName = type === "demos" ? "demo_requests" : type === "messages" ? "contact_submissions" : "enrollments";
    const updatePayload: Record<string, any> = {};

    if (status) updatePayload.status = status;
    if (instructor_name && type === "enrollments") updatePayload.instructor_name = instructor_name;

    const { data, error } = await supabase.from(tableName).update(updatePayload).eq("id", id).select();

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: data[0] });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Server error updating lead status." }, { status: 500 });
  }
}
