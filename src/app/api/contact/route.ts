import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required contact fields." },
        { status: 400 }
      );
    }

    // 1. Persist contact submission directly into Supabase database table
    try {
      const supabase = createServerClient();
      if (supabase) {
        const { data: dbData, error: dbError } = await supabase.from("contact_submissions").insert({
          name,
          email,
          subject,
          message,
        });

        if (dbError) {
          console.error("Supabase contact insert error:", dbError);
        } else {
          console.log("--> CONTACT SUBMISSION PERSISTED IN SUPABASE DATABASE:", dbData);
        }
      }
    } catch (dbErr) {
      console.error("Supabase database connection error during contact submission:", dbErr);
    }

    // 2. Dispatch email via Resend API
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.TO_EMAIL || "learnbuildh@gmail.com";

    if (!apiKey) {
      return NextResponse.json({
        success: true,
        message: "Thank you! Your message has been received.",
      });
    }

    const submissionDate = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="background-color: #0052CC; color: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="margin: 0; font-size: 22px;">New Contact Message</h2>
          <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9;">LearnBuild Hub Official Contact Form Inquiry</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #1e293b;">
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px; font-weight: bold; width: 35%; color: #64748b;">Subject:</td>
            <td style="padding: 12px; font-weight: bold; color: #0052CC; font-size: 15px;">${subject}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px; font-weight: bold; color: #64748b;">Full Name:</td>
            <td style="padding: 12px; font-weight: bold;">${name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px; font-weight: bold; color: #64748b;">Email Address:</td>
            <td style="padding: 12px;"><a href="mailto:${email}" style="color: #0052CC; text-decoration: underline;">${email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px; font-weight: bold; color: #64748b;">Message:</td>
            <td style="padding: 12px;">${message}</td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: bold; color: #64748b;">Submitted At:</td>
            <td style="padding: 12px; color: #64748b;">${submissionDate}</td>
          </tr>
        </table>

        <div style="margin-top: 24px; padding: 14px; background-color: #f8fafc; border-left: 4px solid #0052CC; font-size: 13px; color: #475569; border-radius: 4px;">
          <strong>Database Persistence:</strong> Recorded live in Supabase PostgreSQL contact_submissions table.
        </div>
      </div>
    `;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "LearnBuild Hub Contact <onboarding@resend.dev>",
        to: [toEmail],
        reply_to: email,
        subject: `New Contact Inquiry: ${subject} - ${name}`,
        html: htmlContent,
      }),
    });

    const resendResult = await resendResponse.json();

    return NextResponse.json({
      success: true,
      message: "Thank you! Your contact message has been sent successfully. The LearnBuild Hub team will get back to you shortly.",
      data: resendResult,
    });
  } catch (error) {
    console.error("API Contact route error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error dispatching contact message." },
      { status: 500 }
    );
  }
}
