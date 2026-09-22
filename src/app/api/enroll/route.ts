import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, course, qualification, message } = body;

    // Validate required fields
    if (!fullName || !email || !phone || !course) {
      return NextResponse.json(
        { success: false, message: "Missing required enrollment fields." },
        { status: 400 }
      );
    }

    const submissionDate = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    // Formatted email content targeting learnbuildh@gmail.com
    const emailPayload = {
      to: "learnbuildh@gmail.com",
      subject: `New Course Enrollment Enquiry: ${course}`,
      text: `
New Course Enrollment Enquiry

- Name: ${fullName}
- Email: ${email}
- Phone: ${phone}
- Selected Course: ${course}
- Education/Qualification: ${qualification}
- Additional Message: ${message || "N/A"}
- Submission Date/Time: ${submissionDate}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 12px; background-color: #ffffff;">
          <div style="background-color: #0052CC; color: #ffffff; padding: 16px 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="margin: 0; font-size: 20px;">New Course Enrollment Enquiry</h2>
            <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">LearnBuild Hub Official Admissions Notification</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #1e293b;">
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px; font-weight: bold; width: 35%; color: #64748b;">Selected Course:</td>
              <td style="padding: 10px; font-weight: bold; color: #0052CC;">${course}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px; font-weight: bold; color: #64748b;">Full Name:</td>
              <td style="padding: 10px;">${fullName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px; font-weight: bold; color: #64748b;">Email Address:</td>
              <td style="padding: 10px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px; font-weight: bold; color: #64748b;">Phone Number:</td>
              <td style="padding: 10px;"><a href="tel:${phone}">${phone}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px; font-weight: bold; color: #64748b;">Qualification:</td>
              <td style="padding: 10px;">${qualification}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px; font-weight: bold; color: #64748b;">Additional Message:</td>
              <td style="padding: 10px;">${message || "None provided"}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #64748b;">Submitted At:</td>
              <td style="padding: 10px; color: #64748b;">${submissionDate}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding: 12px; background-color: #f8fafc; border-left: 4px solid #0052CC; font-size: 12px; color: #475569;">
            This enquiry was submitted from the LearnBuild Hub platform. Please contact the applicant manually.
          </div>
        </div>
      `,
    };

    console.log("--> ENROLLMENT ENQUIRY RECEIVED FOR learnbuildh@gmail.com:", emailPayload);

    // Return successful response to applicant
    return NextResponse.json({
      success: true,
      message: "Thank you! Your enrollment enquiry has been submitted successfully. The LearnBuild Hub team will contact you shortly.",
      data: {
        targetEmail: "learnbuildh@gmail.com",
        course,
        fullName,
      },
    });
  } catch (error) {
    console.error("API Enrollment route error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error submitting enrollment enquiry." },
      { status: 500 }
    );
  }
}
