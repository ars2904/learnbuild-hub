import { NextResponse } from "next/server";

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

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.TO_EMAIL || "learnbuildh@gmail.com";

    if (!apiKey) {
      console.error("Missing RESEND_API_KEY in environment variables.");
      return NextResponse.json(
        { success: false, message: "Email service configuration missing on server." },
        { status: 500 }
      );
    }

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
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px; font-weight: bold; color: #64748b;">Additional Message:</td>
            <td style="padding: 12px;">${message || "None provided"}</td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: bold; color: #64748b;">Submitted At:</td>
            <td style="padding: 12px; color: #64748b;">${submissionDate}</td>
          </tr>
        </table>

        <div style="margin-top: 24px; padding: 14px; background-color: #f8fafc; border-left: 4px solid #0052CC; font-size: 13px; color: #475569; border-radius: 4px;">
          <strong>Next Action:</strong> You can click "Reply" in your email client to reply directly to ${fullName} (${email}).
        </div>
      </div>
    `;

    // Dispatch real email via Resend API
    const resendResponse = await fetch("https://api.resend.com/emails", {
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

    const resendResult = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend API enrollment dispatch error:", resendResult);
      return NextResponse.json(
        { 
          success: false, 
          message: resendResult.message || "Failed to dispatch email to admissions team. Please try again." 
        },
        { status: 500 }
      );
    }

    console.log("--> REAL ENROLLMENT EMAIL DISPATCHED TO learnbuildh@gmail.com:", resendResult);

    return NextResponse.json({
      success: true,
      message: "Thank you! Your enrollment enquiry has been submitted successfully. The LearnBuild Hub team will contact you shortly.",
      data: resendResult,
    });
  } catch (error) {
    console.error("API Enrollment route error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error dispatching enrollment email." },
      { status: 500 }
    );
  }
}
