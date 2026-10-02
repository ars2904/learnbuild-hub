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
          const dbIds = new Set(data.map((s: any) => s.id));
          const extraMemory = memoryStudents.filter((m) => !dbIds.has(m.id));
          let combined = [...extraMemory, ...data];
          if (expertId) combined = combined.filter((s) => s.expertId === expertId || (s as any).expert_id === expertId);
          if (email) combined = combined.filter((s) => s.email.toLowerCase() === email.toLowerCase());
          return NextResponse.json({ success: true, data: combined });
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
      expertId: expertId || "",
      expertName: expertName || "Unassigned",
      status: "active",
      qualification: qualification || "Undergraduate",
      bio: "Learning software engineering with live mentorship.",
      profileLocked: false,
      hasInternship: false,
      progress: 0,
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
          progress: newStudent.progress,
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

    if (!id && !updates.email) {
      return NextResponse.json({ success: false, message: "Student ID or Email required." }, { status: 400 });
    }

    const idx = memoryStudents.findIndex((s) => (id && s.id === id) || (updates.email && s.email.toLowerCase() === updates.email.toLowerCase()));
    let existingStudent = idx !== -1 ? memoryStudents[idx] : null;

    if (isStudentEdit && existingStudent?.profileLocked) {
      return NextResponse.json({ 
        success: false, 
        message: "🔒 Profile is locked. Only Admin can update student profile details." 
      }, { status: 403 });
    }

    const updatedObj: StudentProfile = existingStudent ? {
      ...existingStudent,
      ...updates,
      profileLocked: isStudentEdit ? true : (updates.profileLocked ?? existingStudent.profileLocked),
    } : {
      id: id || `std-${Date.now()}`,
      name: updates.name || "Student User",
      email: updates.email || "",
      phone: updates.phone || "",
      courseTitle: updates.courseTitle || "Full-Stack Web Engineering Track",
      courseSlug: updates.courseSlug || "full-stack-web-engineering",
      expertId: updates.expertId || "",
      expertName: updates.expertName || "Unassigned",
      status: updates.status || "active",
      qualification: updates.qualification || "Undergraduate",
      bio: updates.bio || "Student software engineer.",
      profileLocked: isStudentEdit ? true : false,
      hasInternship: updates.hasInternship || false,
      progress: updates.progress ?? 0,
      createdAt: new Date().toISOString(),
    };

    if (idx !== -1) {
      memoryStudents[idx] = updatedObj;
    } else {
      memoryStudents.unshift(updatedObj);
    }

    const supabase = createServerClient();
    if (supabase) {
      try {
        await supabase.from("students").upsert([{
          id: updatedObj.id,
          name: updatedObj.name,
          email: updatedObj.email,
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
          progress: updatedObj.progress,
        }]);
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
