import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/db";
import { memoryDemos, memoryMessages, memoryEnrollments } from "@/lib/data/leadsStore";
import { memoryWorkshopRegistrations } from "@/lib/data/cmsStore";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  "Pragma": "no-cache",
  "Expires": "0",
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "enrollments";

    const supabase = getSupabaseAdminClient();

    if (type === "workshops" || type === "workshop_registrations") {
      if (supabase) {
        try {
          const { data, error } = await supabase.from("workshop_registrations").select("*").order("created_at", { ascending: false });
          if (!error && data) {
            const existingIds = new Set(data.map((d) => d.id));
            const extraMemory = memoryWorkshopRegistrations.filter((m) => !existingIds.has(m.id));
            const combined = [...extraMemory, ...data].map(w => ({
              id: w.id,
              full_name: w.full_name || w.fullName,
              email: w.email,
              phone: w.phone,
              course_title: `Workshop: ${w.workshop_title || w.workshopTitle}`,
              qualification: w.qualification,
              status: w.status || "confirmed",
              created_at: w.created_at || w.createdAt || new Date().toISOString(),
              isWorkshop: true,
            }));
            return NextResponse.json({ success: true, data: combined }, { headers: NO_CACHE_HEADERS });
          }
        } catch (e) {
          console.warn("Supabase fetch workshop_registrations error fallback to memory:", e);
        }
      }
      const mappedMemory = memoryWorkshopRegistrations.map(w => ({
        id: w.id,
        full_name: w.fullName,
        email: w.email,
        phone: w.phone,
        course_title: `Workshop: ${w.workshopTitle}`,
        qualification: w.qualification,
        status: w.status || "confirmed",
        created_at: w.createdAt || new Date().toISOString(),
        isWorkshop: true,
      }));
      return NextResponse.json({ success: true, data: mappedMemory }, { headers: NO_CACHE_HEADERS });
    }

    if (type === "demos") {
      if (supabase) {
        try {
          const { data, error } = await supabase.from("demo_requests").select("*").order("created_at", { ascending: false });
          if (!error && data) {
            const existingIds = new Set(data.map((d) => d.id));
            const extraMemory = memoryDemos.filter((m) => !existingIds.has(m.id));
            return NextResponse.json({ success: true, data: [...extraMemory, ...data] }, { headers: NO_CACHE_HEADERS });
          }
        } catch (e) {
          console.warn("Supabase fetch demos error fallback to memory:", e);
        }
      }
      return NextResponse.json({ success: true, data: memoryDemos }, { headers: NO_CACHE_HEADERS });
    }

    if (type === "messages") {
      if (supabase) {
        try {
          const { data, error } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
          if (!error && data) {
            const existingIds = new Set(data.map((d) => d.id));
            const extraMemory = memoryMessages.filter((m) => !existingIds.has(m.id));
            return NextResponse.json({ success: true, data: [...extraMemory, ...data] }, { headers: NO_CACHE_HEADERS });
          }
        } catch (e) {
          console.warn("Supabase fetch messages error fallback to memory:", e);
        }
      }
      return NextResponse.json({ success: true, data: memoryMessages }, { headers: NO_CACHE_HEADERS });
    }

    // Default: enrollments
    if (supabase) {
      try {
        const { data, error } = await supabase.from("enrollments").select("*").order("created_at", { ascending: false });
        if (!error && data) {
          const existingIds = new Set(data.map((d) => d.id));
          const extraMemory = memoryEnrollments.filter((m) => !existingIds.has(m.id));
          return NextResponse.json({ success: true, data: [...extraMemory, ...data] }, { headers: NO_CACHE_HEADERS });
        }
      } catch (e) {
        console.warn("Supabase fetch enrollments error fallback to memory:", e);
      }
    }
    return NextResponse.json({ success: true, data: memoryEnrollments }, { headers: NO_CACHE_HEADERS });
  } catch (err) {
    console.error("GET Admin leads route error:", err);
    return NextResponse.json({ success: true, data: [] }, { headers: NO_CACHE_HEADERS });
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
    } else if (type === "workshops" || type === "workshop_registrations") {
      const target = memoryWorkshopRegistrations.find((w) => w.id === id);
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

    const supabase = getSupabaseAdminClient();
    if (supabase) {
      try {
        const tableName = type === "demos" 
          ? "demo_requests" 
          : type === "messages" 
          ? "contact_submissions" 
          : (type === "workshops" || type === "workshop_registrations") 
          ? "workshop_registrations" 
          : "enrollments";

        const updatePayload: Record<string, any> = {};
        if (status) updatePayload.status = status;
        if (instructor_name && tableName === "enrollments") updatePayload.instructor_name = instructor_name;

        await supabase.from(tableName).update(updatePayload).eq("id", id);
      } catch (e) {
        console.warn("Supabase update lead error:", e);
      }
    }

    return NextResponse.json({ success: true, data: updatedItem || { id, status } }, { headers: NO_CACHE_HEADERS });
  } catch (err) {
    console.error("PUT Admin leads route error:", err);
    return NextResponse.json({ success: false, message: "Server error updating lead status." }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const type = searchParams.get("type");

    if (!id || !type) {
      return NextResponse.json({ success: false, message: "ID and type are required." }, { status: 400 });
    }

    if (type === "demos") {
      const idx = memoryDemos.findIndex((d) => d.id === id);
      if (idx !== -1) memoryDemos.splice(idx, 1);
    } else if (type === "messages") {
      const idx = memoryMessages.findIndex((m) => m.id === id);
      if (idx !== -1) memoryMessages.splice(idx, 1);
    } else if (type === "workshops" || type === "workshop_registrations") {
      const idx = memoryWorkshopRegistrations.findIndex((w) => w.id === id);
      if (idx !== -1) memoryWorkshopRegistrations.splice(idx, 1);
    } else if (type === "enrollments") {
      const idx = memoryEnrollments.findIndex((e) => e.id === id);
      if (idx !== -1) memoryEnrollments.splice(idx, 1);
    }

    const supabase = getSupabaseAdminClient();
    if (supabase) {
      try {
        const tableName = type === "demos" 
          ? "demo_requests" 
          : type === "messages" 
          ? "contact_submissions" 
          : (type === "workshops" || type === "workshop_registrations") 
          ? "workshop_registrations" 
          : "enrollments";
        await supabase.from(tableName).delete().eq("id", id);
      } catch (e) {
        console.warn("Supabase delete lead error:", e);
      }
    }

    return NextResponse.json({ success: true }, { headers: NO_CACHE_HEADERS });
  } catch (err: any) {
    console.error("DELETE Admin leads route error:", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}
