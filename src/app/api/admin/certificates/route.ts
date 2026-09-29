import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { memoryCertificates, IssuedCertificate } from "@/lib/data/studentStore";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get("studentId");
    const email = searchParams.get("email");

    const supabase = createServerClient();
    if (supabase) {
      try {
        let query = supabase.from("certificates").select("*").order("issue_date", { ascending: false });
        if (studentId) query = query.eq("student_id", studentId);
        if (email) query = query.eq("student_email", email);
        const { data, error } = await query;
        if (!error && data) {
          const dbIds = new Set(data.map((c: any) => c.id));
          const extraMemory = memoryCertificates.filter((m) => !dbIds.has(m.id));
          let combined = [...extraMemory, ...data];
          if (studentId) combined = combined.filter((c) => c.studentId === studentId || (c as any).student_id === studentId);
          if (email) combined = combined.filter((c) => c.studentEmail.toLowerCase() === email.toLowerCase());
          return NextResponse.json({ success: true, data: combined });
        }
      } catch (e) {
        console.warn("Supabase fetch certificates error fallback:", e);
      }
    }

    let filtered = [...memoryCertificates];
    if (studentId) {
      filtered = filtered.filter((c) => c.studentId === studentId);
    }
    if (email) {
      filtered = filtered.filter((c) => c.studentEmail.toLowerCase() === email.toLowerCase());
    }

    return NextResponse.json({ success: true, data: filtered });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { studentId, studentName, studentEmail, courseTitle, grade, issuedByAdmin } = body;

    if (!studentName || !courseTitle) {
      return NextResponse.json({ success: false, message: "Student name and course title required." }, { status: 400 });
    }

    const certNum = `LBH-CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCert: IssuedCertificate = {
      id: `cert-${Date.now()}`,
      certificateNumber: certNum,
      studentId: studentId || `std-${Date.now()}`,
      studentName,
      studentEmail: studentEmail || "student@learnbuildhub.com",
      courseTitle,
      issueDate: new Date().toISOString().split("T")[0],
      issuedByAdmin: issuedByAdmin || "LearnBuild Hub Executive Board",
      verificationCode: `${certNum}-VERIFIED`,
      grade: grade || "Distinction (A+)",
    };

    memoryCertificates.unshift(newCert);

    const supabase = createServerClient();
    if (supabase) {
      try {
        await supabase.from("certificates").insert([{
          id: newCert.id,
          certificate_number: newCert.certificateNumber,
          student_id: newCert.studentId,
          student_name: newCert.studentName,
          student_email: newCert.studentEmail,
          course_title: newCert.courseTitle,
          issue_date: newCert.issueDate,
          issued_by_admin: newCert.issuedByAdmin,
          verification_code: newCert.verificationCode,
          grade: newCert.grade,
        }]);
      } catch (e) {
        console.warn("Supabase insert certificate fallback:", e);
      }
    }

    return NextResponse.json({ 
      success: true, 
      data: newCert,
      message: `Verified Certificate ${certNum} successfully issued to ${studentName}!`
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
