import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { addMessageLead } from "@/lib/data/leadsStore";

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

    // 1. Add to centralized memory store & CRM Clients list
    const newMsg = addMessageLead({
      name,
      email,
      subject,
      message,
    });

    // 2. Try persisting directly into Supabase database tables if available
    try {
      const supabase = createServerClient();
      if (supabase) {
        await supabase.from("contact_submissions").insert({
          name,
          email,
          subject,
          message,
        });

        await supabase.from("clients").insert({
          name,
          company: "Contact Form Lead",
          email,
          phone: "N/A",
          status: "lead",
          service_interested: `Inquiry: ${subject}`,
          contract_value: 50000,
          assigned_employee_name: "Sneha Sharma",
          notes: `[Contact Inquiry] Subject: ${subject}. Message: ${message}`,
        });
      }
    } catch (dbErr) {
      console.warn("Supabase database insert warning (using memory store fallback):", dbErr);
    }

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
          </div>
        `;

        await fetch("https://api.resend.com/emails", {
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
      } catch (e) {
        console.warn("Resend email error:", e);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! Your contact message has been sent successfully.",
      data: newMsg,
    });
  } catch (error) {
    console.error("API Contact route error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error dispatching contact message." },
      { status: 500 }
    );
  }
}
