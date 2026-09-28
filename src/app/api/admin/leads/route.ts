import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { memoryDemos, memoryMessages, memoryEnrollments } from "@/lib/data/leadsStore";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "enrollments";

    const supabase = createServerClient();

    if (type === "demos") {
      if (supabase) {
        try {
          const { data, error } = await supabase.from("demo_requests").select("*").order("created_at", { ascending: false });
          if (!error && data && data.length > 0) {
            // Combine Supabase data with local memory items that might not be in DB
            const existingIds = new Set(data.map((d) => d.id));
            const extraMemory = memoryDemos.filter((m) => !existingIds.has(m.id));
            return NextResponse.json({ success: true, data: [...extraMemory, ...data] });
          }
        } catch (e) {
          console.warn("Supabase fetch demos error fallback to memory:", e);
        }
      }
      return NextResponse.json({ success: true, data: memoryDemos });
    }

    if (type === "messages") {
      if (supabase) {
        try {
          const { data, error } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
          if (!error && data && data.length > 0) {
            const existingIds = new Set(data.map((d) => d.id));
            const extraMemory = memoryMessages.filter((m) => !existingIds.has(m.id));
            return NextResponse.json({ success: true, data: [...extraMemory, ...data] });
          }
        } catch (e) {
          console.warn("Supabase fetch messages error fallback to memory:", e);
        }
      }
      return NextResponse.json({ success: true, data: memoryMessages });
    }

    // Default: enrollments
    if (supabase) {
      try {
        const { data, error } = await supabase.from("enrollments").select("*").order("created_at", { ascending: false });
        if (!error && data && data.length > 0) {
          const existingIds = new Set(data.map((d) => d.id));
          const extraMemory = memoryEnrollments.filter((m) => !existingIds.has(m.id));
          return NextResponse.json({ success: true, data: [...extraMemory, ...data] });
        }
      } catch (e) {
        console.warn("Supabase fetch enrollments error fallback to memory:", e);
      }
    }
    return NextResponse.json({ success: true, data: memoryEnrollments });
  } catch (err) {
    console.error("GET Admin leads route error:", err);
    return NextResponse.json({ success: true, data: [] });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, type, status, instructor_name } = body;

    if (!id || !type) {
      return NextResponse.json({ success: false, message: "Lead ID and type are required." }, { status: 400 });
    }

    let updatedItem: any = null;

    if (type === "demos") {
      const target = memoryDemos.find((d) => d.id === id);
      if (target) {
        if (status) target.status = status;
        updatedItem = target;
      }
    } else if (type === "messages") {
      const target = memoryMessages.find((m) => m.id === id);
      if (target) {
        if (status) target.status = status;
        updatedItem = target;
      }
    } else {
      const target = memoryEnrollments.find((e) => e.id === id);
      if (target) {
        if (status) target.status = status;
        if (instructor_name) target.instructor_name = instructor_name;
        updatedItem = target;
      }
    }

    const supabase = createServerClient();
    if (supabase) {
      try {
        const tableName = type === "demos" ? "demo_requests" : type === "messages" ? "contact_submissions" : "enrollments";
        const updatePayload: Record<string, any> = {};

        if (status) updatePayload.status = status;
        if (instructor_name && type === "enrollments") updatePayload.instructor_name = instructor_name;

        await supabase.from(tableName).update(updatePayload).eq("id", id);
      } catch (e) {
        console.warn("Supabase update lead error:", e);
      }
    }

    return NextResponse.json({ success: true, data: updatedItem || { id, status } });
  } catch (err) {
    console.error("PUT Admin leads route error:", err);
    return NextResponse.json({ success: false, message: "Server error updating lead status." }, { status: 500 });
  }
}
