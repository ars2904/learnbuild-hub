import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, phone, designation } = body;

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password required." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
          <div style="background-color: #0F172A; color: #ffffff; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
            <h2 style="margin: 0; font-size: 22px; color: #ffffff;">Welcome to LearnBuild Hub Team! 🎉</h2>
            <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9;">Official Employee Workspace Credentials</p>
          </div>
          
          <p style="font-size: 15px; color: #334155; line-height: 1.6;">Hello <strong>${name}</strong>,</p>
          <p style="font-size: 14px; color: #475569; line-height: 1.6;">Your official employee account for LearnBuild Hub has been activated as <strong>${designation || "Team Member"}</strong>.</p>
          
          <div style="background-color: #f8fafc; border: 2px solid #0052CC; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #1e293b;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b; width: 35%;">Employee Name:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #0f172a;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Designation:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #0052CC;">${designation || "Employee"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Login Email:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #0052CC;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Password:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #d97706; font-family: monospace; font-size: 16px;">${password}</td>
              </tr>
            </table>
          </div>

          <p style="font-size: 13px; color: #64748b;">You can use these credentials to log in to your employee dashboard, view assigned client projects, and manage task deadlines.</p>

          <div style="text-align: center; margin-top: 28px;">
            <a href="https://learnbuildhub.com/employee/login" style="display: inline-block; padding: 14px 28px; background-color: #0052CC; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 14px; border-radius: 50px; shadow: 0 4px 6px rgba(0,82,204,0.2);">
              Login to Employee Workspace →
            </a>
          </div>
        </div>
      `;

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "LearnBuild Hub Admin <onboarding@resend.dev>",
          to: [email],
          subject: `LearnBuild Hub Employee Credentials - ${name}`,
          html: htmlContent,
        }),
      });
    }

    return NextResponse.json({ success: true, message: `Credentials dispatched to ${email}` });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
