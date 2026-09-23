import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, solutionTitle, companyName, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !solutionTitle) {
      return NextResponse.json(
        { success: false, message: "Missing required demo request fields." },
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
        <div style="background-color: #FF6B00; color: #ffffff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="margin: 0; font-size: 22px;">New Product Demo Request Received</h2>
          <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9;">LearnBuild Hub Enterprise Software Solutions</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #1e293b;">
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px; font-weight: bold; width: 35%; color: #64748b;">Requested Product:</td>
            <td style="padding: 12px; font-weight: bold; color: #FF6B00; font-size: 16px;">${solutionTitle}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px; font-weight: bold; color: #64748b;">Client Name:</td>
            <td style="padding: 12px; font-weight: bold;">${name}</td>
          </tr>
          ${
            companyName
              ? `<tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 12px; font-weight: bold; color: #64748b;">Organization / Company:</td>
                  <td style="padding: 12px;">${companyName}</td>
                </tr>`
              : ""
          }
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px; font-weight: bold; color: #64748b;">Email Address:</td>
            <td style="padding: 12px;"><a href="mailto:${email}" style="color: #FF6B00; text-decoration: underline;">${email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 12px; font-weight: bold; color: #64748b;">Phone / WhatsApp:</td>
            <td style="padding: 12px;"><a href="tel:${phone}" style="color: #FF6B00; text-decoration: underline;">${phone}</a></td>
          </tr>
          ${
            message
              ? `<tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 12px; font-weight: bold; color: #64748b;">Requirements / Notes:</td>
                  <td style="padding: 12px; line-height: 1.6; white-space: pre-wrap;">${message}</td>
                </tr>`
              : ""
          }
          <tr>
            <td style="padding: 12px; font-weight: bold; color: #64748b;">Submitted At:</td>
            <td style="padding: 12px; color: #64748b;">${submissionDate}</td>
          </tr>
        </table>

        <div style="margin-top: 24px; padding: 14px; background-color: #f8fafc; border-left: 4px solid #FF6B00; font-size: 13px; color: #475569; border-radius: 4px;">
          <strong>Action Required:</strong> Reply directly to this email or contact ${name} on WhatsApp at ${phone} to schedule the live demo.
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
        from: "LearnBuild Hub Demos <onboarding@resend.dev>",
        to: [toEmail],
        reply_to: email,
        subject: `[Demo Request] ${solutionTitle} - ${name}`,
        html: htmlContent,
      }),
    });

    const resendResult = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend API demo dispatch error:", resendResult);
      return NextResponse.json(
        { 
          success: false, 
          message: resendResult.message || "Failed to submit demo request. Please try again." 
        },
        { status: 500 }
      );
    }

    console.log("--> REAL DEMO REQUEST EMAIL DISPATCHED TO learnbuildh@gmail.com:", resendResult);

    return NextResponse.json({
      success: true,
      message: `Thank you! Your demo request for ${solutionTitle} has been submitted successfully. Our solution team will contact you shortly.`,
      data: resendResult,
    });
  } catch (error) {
    console.error("API Demo route error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error submitting demo request." },
      { status: 500 }
    );
  }
}
