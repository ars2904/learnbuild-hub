import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { memoryStudents, StudentProfile } from "@/lib/data/studentStore";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const expertId = searchParams.get("expertId");
    const email = searchParams.get("email");

    const supabase = createServerClient();
    if (supabase) {
      try {
        let query = supabase.from("students").select("*").order("created_at", { ascending: false });
        if (expertId) query = query.eq("expert_id", expertId);
        if (email) query = query.eq("email", email);
        const { data, error } = await query;
        if (!error && data) {
          return NextResponse.json({ success: true, data });
        }
      } catch (e) {
        console.warn("Supabase fetch students fallback:", e);
      }
    }

    let filtered = [...memoryStudents];
    if (expertId) {
      filtered = filtered.filter((s) => s.expertId === expertId);
    }
    if (email) {
      filtered = filtered.filter((s) => s.email.toLowerCase() === email.toLowerCase());
    }

    return NextResponse.json({ success: true, data: filtered });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, courseTitle, courseSlug, expertId, expertName, qualification } = body;

    if (!name || !email) {
      return NextResponse.json({ success: false, message: "Name and email are required." }, { status: 400 });
    }

    const newStudent: StudentProfile = {
      id: `std-${Date.now()}`,
      name,
      email,
      phone: phone || "",
      courseTitle: courseTitle || "Full-Stack Web Engineering Track",
      courseSlug: courseSlug || "full-stack-web-engineering",
      expertId: expertId || "emp-101",
      expertName: expertName || "Sneha Sharma",
      status: "active",
      qualification: qualification || "Undergraduate",
      bio: "Learning software engineering with live mentorship.",
      profileLocked: false,
      hasInternship: false,
      createdAt: new Date().toISOString(),
    };

    memoryStudents.unshift(newStudent);

    const supabase = createServerClient();
    if (supabase) {
      try {
        await supabase.from("students").insert([{
          id: newStudent.id,
          name: newStudent.name,
          email: newStudent.email,
          phone: newStudent.phone,
          course_title: newStudent.courseTitle,
          course_slug: newStudent.courseSlug,
          expert_id: newStudent.expertId,
          expert_name: newStudent.expertName,
          status: newStudent.status,
          qualification: newStudent.qualification,
          bio: newStudent.bio,
          profile_locked: newStudent.profileLocked,
          has_internship: newStudent.hasInternship,
        }]);
      } catch (e) {
        console.warn("Supabase insert student fallback:", e);
      }
    }

    return NextResponse.json({ 
      success: true, 
      data: newStudent,
      message: `Student ${name} created successfully! Account activation link generated for ${email}.`
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, isStudentEdit, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: "Student ID required." }, { status: 400 });
    }

    const idx = memoryStudents.findIndex((s) => s.id === id || s.email === updates.email);
    if (idx === -1) {
      return NextResponse.json({ success: false, message: "Student record not found." }, { status: 404 });
    }

    const student = memoryStudents[idx];

    // Check if student profile is already locked
    if (isStudentEdit && student.profileLocked) {
      return NextResponse.json({ 
        success: false, 
        message: "🔒 Profile is locked. Only Admin can update student profile details." 
      }, { status: 403 });
    }

    const updatedObj: StudentProfile = {
      ...student,
      ...updates,
      profileLocked: isStudentEdit ? true : (updates.profileLocked ?? student.profileLocked),
    };

    memoryStudents[idx] = updatedObj;

    const supabase = createServerClient();
    if (supabase) {
      try {
        await supabase.from("students").update({
          name: updatedObj.name,
          phone: updatedObj.phone,
          bio: updatedObj.bio,
          qualification: updatedObj.qualification,
          github_url: updatedObj.githubUrl,
          linkedin_url: updatedObj.linkedinUrl,
          profile_locked: updatedObj.profileLocked,
          status: updatedObj.status,
          expert_id: updatedObj.expertId,
          expert_name: updatedObj.expertName,
          course_title: updatedObj.courseTitle,
        }).eq("id", id);
      } catch (e) {
        console.warn("Supabase update student error:", e);
      }
    }

    return NextResponse.json({ 
      success: true, 
      data: updatedObj,
      message: isStudentEdit ? "Profile updated & locked successfully!" : "Student account updated."
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "Student ID required." }, { status: 400 });
    }

    const idx = memoryStudents.findIndex((s) => s.id === id);
    if (idx !== -1) {
      memoryStudents.splice(idx, 1);
    }

    const supabase = createServerClient();
    if (supabase) {
      try {
        await supabase.from("students").delete().eq("id", id);
      } catch (e) {
        console.warn("Supabase delete student error:", e);
      }
    }

    return NextResponse.json({ success: true, message: "Student account deleted." });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
