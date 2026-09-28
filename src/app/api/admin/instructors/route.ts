import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = createServerClient();
    if (!supabase) {
      return NextResponse.json({ success: false, message: "Database connection missing." }, { status: 500 });
    }

    const { data, error } = await supabase.from("instructors").select("*").order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Server error fetching instructors." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createServerClient();
    if (!supabase) {
      return NextResponse.json({ success: false, message: "Database connection missing." }, { status: 500 });
    }

    const body = await request.json();
    const { id, name, role, gender, avatar, skills, bio, coursesTaught, rating } = body;

    if (!name || !role) {
      return NextResponse.json({ success: false, message: "Name and role are required." }, { status: 400 });
    }

    const instId = id || name.toLowerCase().replace(/\s+/g, "-") || `inst-${Date.now()}`;

    const { data, error } = await supabase.from("instructors").insert({
      id: instId,
      name,
      role,
      gender: gender || "male",
      avatar: avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      skills: skills || [],
      bio: bio || "",
      courses_taught: coursesTaught || [],
      rating: parseFloat(rating) || 4.9,
    }).select();

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: data[0] });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Server error creating instructor." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = createServerClient();
    if (!supabase) {
      return NextResponse.json({ success: false, message: "Database connection missing." }, { status: 500 });
    }

    const body = await request.json();
    const { id, name, role, gender, avatar, skills, bio, coursesTaught, rating } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: "Instructor ID is required." }, { status: 400 });
    }

    const { data, error } = await supabase.from("instructors").update({
      name,
      role,
      gender,
      avatar,
      skills,
      bio,
      courses_taught: coursesTaught,
      rating: parseFloat(rating) || 4.9,
    }).eq("id", id).select();

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: data[0] });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Server error updating instructor." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = createServerClient();
    if (!supabase) {
      return NextResponse.json({ success: false, message: "Database connection missing." }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "Instructor ID required." }, { status: 400 });
    }

    const { error } = await supabase.from("instructors").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Instructor deleted successfully." });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Server error deleting instructor." }, { status: 500 });
  }
}
