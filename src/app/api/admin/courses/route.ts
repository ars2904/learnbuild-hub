import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = createServerClient();
    if (!supabase) {
      return NextResponse.json({ success: false, message: "Database connection missing." }, { status: 500 });
    }

    const { data, error } = await supabase.from("courses").select("*").order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Server error fetching courses." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createServerClient();
    if (!supabase) {
      return NextResponse.json({ success: false, message: "Database connection missing." }, { status: 500 });
    }

    const body = await request.json();
    const { id, slug, title, tagline, category, duration, level, mode, rating, image, overview, whatYouWillLearn, curriculum, eligibility, careerOptions, prerequisites } = body;

    if (!title || !slug || !category) {
      return NextResponse.json({ success: false, message: "Title, slug, and category are required." }, { status: 400 });
    }

    const courseId = id || slug || `course-${Date.now()}`;

    const { data, error } = await supabase.from("courses").insert({
      id: courseId,
      slug,
      title,
      tagline: tagline || "",
      category,
      duration: duration || "8 Weeks",
      level: level || "Beginner to Advanced",
      mode: mode || "Live Mentorship",
      rating: parseFloat(rating) || 4.9,
      image: image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
      short_description: tagline || "",
      overview: overview || "",
      what_you_will_learn: whatYouWillLearn || [],
      curriculum: curriculum || [],
      eligibility: eligibility || [],
      career_options: careerOptions || [],
      prerequisites: prerequisites || "",
    }).select();

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: data[0] });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Server error creating course." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = createServerClient();
    if (!supabase) {
      return NextResponse.json({ success: false, message: "Database connection missing." }, { status: 500 });
    }

    const body = await request.json();
    const { id, title, tagline, category, duration, level, mode, rating, image, overview, whatYouWillLearn, curriculum, eligibility, careerOptions, prerequisites } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: "Course ID is required for update." }, { status: 400 });
    }

    const { data, error } = await supabase.from("courses").update({
      title,
      tagline,
      category,
      duration,
      level,
      mode,
      rating: parseFloat(rating) || 4.9,
      image,
      overview,
      what_you_will_learn: whatYouWillLearn,
      curriculum,
      eligibility,
      career_options: careerOptions,
      prerequisites,
    }).eq("id", id).select();

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: data[0] });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Server error updating course." }, { status: 500 });
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
      return NextResponse.json({ success: false, message: "Course ID required." }, { status: 400 });
    }

    const { error } = await supabase.from("courses").delete().eq("id", id);

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Course deleted successfully." });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Server error deleting course." }, { status: 500 });
  }
}
