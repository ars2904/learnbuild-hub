import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { sampleCourses, Course } from "@/data/courses";

// In-memory working copy if Supabase is offline
let localCourses: any[] = [...sampleCourses];

export async function GET() {
  try {
    const supabase = createServerClient();
    if (supabase) {
      const { data, error } = await supabase.from("courses").select("*").order("created_at", { ascending: false });
      if (!error && data && data.length > 0) {
        return NextResponse.json({ success: true, data });
      }
    }
    return NextResponse.json({ success: true, data: localCourses });
  } catch (err) {
    return NextResponse.json({ success: true, data: localCourses });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, slug, title, tagline, category, duration, level, mode, rating, image, overview, whatYouWillLearn, curriculum, eligibility, careerOptions, prerequisites } = body;

    if (!title || !slug || !category) {
      return NextResponse.json({ success: false, message: "Title, slug, and category are required." }, { status: 400 });
    }

    const courseId = id || slug || `course-${Date.now()}`;
    const newCourseObj = {
      id: courseId,
      slug,
      title,
      tagline: tagline || "",
      category,
      duration: duration || "8 Weeks",
      level: level || "Beginner to Advanced",
      mode: mode || "Live Mentorship",
      rating: parseFloat(rating) || 4.9,
      studentsEnrolled: body.studentsEnrolled || 100,
      image: image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
      shortDescription: tagline || "",
      overview: overview || "",
      whatYouWillLearn: whatYouWillLearn || [],
      curriculum: curriculum || [],
      eligibility: eligibility || [],
      careerOptions: careerOptions || [],
      prerequisites: prerequisites || "",
    };

    const supabase = createServerClient();
    if (supabase) {
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

      if (!error && data) {
        // also keep local in sync
        localCourses.unshift(data[0]);
        return NextResponse.json({ success: true, data: data[0] });
      }
    }

    localCourses.unshift(newCourseObj);
    return NextResponse.json({ success: true, data: newCourseObj });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Server error creating course." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, tagline, category, duration, level, mode, rating, image, overview, whatYouWillLearn, curriculum, eligibility, careerOptions, prerequisites } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: "Course ID is required for update." }, { status: 400 });
    }

    const supabase = createServerClient();
    if (supabase) {
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

      if (!error && data && data.length > 0) {
        return NextResponse.json({ success: true, data: data[0] });
      }
    }

    // Fallback in-memory update
    const idx = localCourses.findIndex((c) => c.id === id || c.slug === id);
    if (idx !== -1) {
      localCourses[idx] = {
        ...localCourses[idx],
        ...body,
        rating: parseFloat(rating) || localCourses[idx].rating || 4.9,
      };
      return NextResponse.json({ success: true, data: localCourses[idx] });
    }

    return NextResponse.json({ success: false, message: "Course not found." }, { status: 444 });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Server error updating course." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "Course ID required." }, { status: 400 });
    }

    const supabase = createServerClient();
    if (supabase) {
      await supabase.from("courses").delete().eq("id", id);
    }

    localCourses = localCourses.filter((c) => c.id !== id && c.slug !== id);
    return NextResponse.json({ success: true, message: "Course deleted successfully." });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Server error deleting course." }, { status: 500 });
  }
}

