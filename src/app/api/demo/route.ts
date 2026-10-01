import { NextResponse } from "next/server";
import { saveDemoRequest } from "@/lib/supabase/db";
import { addDemoLead } from "@/lib/data/leadsStore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const fullName = body.fullName || body.name || "";
    const email = body.email || "";
    const phone = body.phone || "";
    const solutionTitle = body.solutionTitle || body.solution || "Live Software Demo";
    const companyName = body.companyName || body.company || "";
    const projectRequirements = body.projectRequirements || body.message || "";
    const budgetRange = body.budgetRange || "";

    // Validate required fields
    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { success: false, message: "Missing required demo request fields (name, email, phone)." },
        { status: 400 }
      );
    }

    // 1. Add to centralized memory store & CRM Clients list
    const newDemo = addDemoLead({
      fullName,
      email,
      phone,
      solutionTitle,
      companyName,
      projectRequirements,
      budgetRange,
    });

    // 2. Persist directly into Supabase database tables (demo_requests + clients CRM)
    await saveDemoRequest({
      fullName,
      email,
      phone,
      solutionTitle,
      companyName,
      projectRequirements,
      budgetRange,
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
            <div style="background-color: #0F172A; color: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="margin: 0; font-size: 22px;">New Demo Application Request</h2>
              <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9;">LearnBuild Hub Client Solutions Desk</p>
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #1e293b;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px; font-weight: bold; width: 35%; color: #64748b;">Solution Track:</td>
                <td style="padding: 12px; font-weight: bold; color: #0052CC; font-size: 15px;">${solutionTitle}</td>
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
                <td style="padding: 12px; font-weight: bold; color: #64748b;">Company / Organization:</td>
                <td style="padding: 12px;">${companyName || "Individual / Startup"}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 12px; font-weight: bold; color: #64748b;">Project Requirements:</td>
                <td style="padding: 12px;">${projectRequirements || "None specified"}</td>
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
            from: "LearnBuild Hub Solutions <onboarding@resend.dev>",
            to: [toEmail],
            reply_to: email,
            subject: `New Demo Application: ${solutionTitle} - ${fullName}`,
            html: htmlContent,
          }),
        });
      } catch (e) {
        console.warn("Resend email dispatch error:", e);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! Your demo request has been submitted successfully and added to the Admin Panel.",
      data: newDemo,
    });
  } catch (error) {
    console.error("API Demo route error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error processing demo request." },
      { status: 500 }
    );
  }
}
