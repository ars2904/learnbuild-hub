import { NextResponse } from "next/server";
import { saveEnrollment } from "@/lib/supabase/db";
import { addEnrollmentLead } from "@/lib/data/leadsStore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, course, qualification, instructor, message } = body;

    // Validate required fields
    if (!fullName || !email || !phone || !course) {
      return NextResponse.json(
        { success: false, message: "Missing required enrollment fields." },
        { status: 400 }
      );
    }

    // 1. Add to centralized memory store & CRM Clients list
    const newEnrollment = addEnrollmentLead({
      fullName,
      email,
      phone,
      course,
      qualification,
      instructor,
      message,
    });

    // 2. Persist directly into Supabase database tables (enrollments + clients CRM)
    await saveEnrollment({
      fullName,
      email,
      phone,
      course,
      qualification,
      instructor,
      message,
    });

    // 3. Dispatch email via Resend API
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.TO_EMAIL || "learnbuildh@gmail.com";

    if (apiKey) {
      try {
        const submissionDate = new Date().toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
          dateStyle: "full",
          timeStyle: "medium",
        });

        const htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
            <div style="background-color: #0052CC; color: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="margin: 0; font-size: 22px;">New Course Enrollment Enquiry</h2>
              <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9;">LearnBuild Hub Official Admissions Notification</p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #1e293b;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px; font-weight: bold; width: 35%; color: #64748b;">Selected Course:</td>
                <td style="padding: 12px; font-weight: bold; color: #0052CC; font-size: 15px;">${course}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px; font-weight: bold; color: #64748b;">Preferred Mentor:</td>
                <td style="padding: 12px; font-weight: bold; color: #059669;">${instructor || "Any Available Senior Mentor"}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px; font-weight: bold; color: #64748b;">Full Name:</td>
                <td style="padding: 12px; font-weight: bold;">${fullName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px; font-weight: bold; color: #64748b;">Email Address:</td>
                <td style="padding: 12px;"><a href="mailto:${email}" style="color: #0052CC; text-decoration: underline;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px; font-weight: bold; color: #64748b;">Phone / WhatsApp:</td>
                <td style="padding: 12px;"><a href="tel:${phone}" style="color: #0052CC; text-decoration: underline;">${phone}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px; font-weight: bold; color: #64748b;">Qualification:</td>
                <td style="padding: 12px;">${qualification}</td>
              </tr>
              <tr>
                <td style="padding: 12px; font-weight: bold; color: #64748b;">Submitted At:</td>
                <td style="padding: 12px; color: #64748b;">${submissionDate}</td>
              </tr>
            </table>
          </div>
        `;

        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "LearnBuild Hub Admissions <onboarding@resend.dev>",
            to: [toEmail],
            reply_to: email,
            subject: `New Course Enrollment Enquiry: ${course} - ${fullName}`,
            html: htmlContent,
          }),
        });
      } catch (e) {
        console.warn("Resend email error:", e);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! Your enrollment enquiry has been submitted successfully.",
      data: newEnrollment,
    });
  } catch (error) {
    console.error("API Enrollment route error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error dispatching enrollment email." },
      { status: 500 }
    );
  }
}
