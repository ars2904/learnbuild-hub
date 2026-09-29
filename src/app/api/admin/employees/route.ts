import { NextResponse } from "next/server";
import { INITIAL_EMPLOYEES, Employee } from "@/lib/data/crm";
import { createServerClient } from "@/lib/supabase/server";

let memoryEmployees: Employee[] = [...INITIAL_EMPLOYEES];

export async function GET() {
  const supabase = createServerClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("employees").select("*").order("created_at", { ascending: false });
      if (!error && data) {
        return NextResponse.json({ success: true, data });
      }
    } catch (err) {
      console.warn("Supabase employees fetch fallback:", err);
    }
  }

  return NextResponse.json({ success: true, data: memoryEmployees });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Auto-generate secure password if not provided
    const autoPassword = body.password || `LB#${Math.floor(100000 + Math.random() * 900000)}`;
    const email = body.email || `${body.name.toLowerCase().replace(/\s+/g, "")}@learnbuildhub.com`;
    const sendEmail = body.sendEmail ?? true;

    const newEmployee: Employee = {
      id: `emp-${Date.now()}`,
      name: body.name || "Employee User",
      email: email,
      password: autoPassword,
      designation: body.designation || "Software Engineer",
      department: body.department || "Engineering",
      phone: body.phone || "+91 98765 00000",
      role: body.role || "Employee",
      status: "Active",
      createdAt: new Date().toISOString(),
    };

    memoryEmployees.unshift(newEmployee);

    // Try Supabase insert
    const supabase = createServerClient();
    if (supabase) {
      try {
        await supabase.from("employees").insert([{
          id: newEmployee.id,
          name: newEmployee.name,
          email: newEmployee.email,
          designation: newEmployee.designation,
          department: newEmployee.department,
          phone: newEmployee.phone,
          role: newEmployee.role,
          status: newEmployee.status,
        }]);

        // Create Supabase Auth user automatically if possible
        await supabase.auth.signUp({
          email: newEmployee.email,
          password: autoPassword,
          options: {
            data: {
              full_name: newEmployee.name,
              designation: newEmployee.designation,
              role: "employee",
            },
          },
        });
      } catch (e) {
        console.warn("Supabase employee auth creation error:", e);
      }
    }

    // Auto Dispatch email via Resend API if requested
    if (sendEmail) {
      const apiKey = process.env.RESEND_API_KEY;
      if (apiKey) {
        try {
          const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
              <div style="background-color: #0F172A; color: #ffffff; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
                <h2 style="margin: 0; font-size: 22px; color: #ffffff;">Welcome to LearnBuild Hub Team! 🎉</h2>
                <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9;">Official Employee Workspace Credentials</p>
              </div>
              <p style="font-size: 15px; color: #334155; line-height: 1.6;">Hello <strong>${newEmployee.name}</strong>,</p>
              <p style="font-size: 14px; color: #475569; line-height: 1.6;">Your official employee account for LearnBuild Hub has been activated as <strong>${newEmployee.designation}</strong>.</p>
              <div style="background-color: #f8fafc; border: 2px solid #0052CC; border-radius: 12px; padding: 20px; margin: 20px 0;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #1e293b;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #64748b; width: 35%;">Employee Name:</td>
                    <td style="padding: 8px 0; font-weight: bold; color: #0f172a;">${newEmployee.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Designation:</td>
                    <td style="padding: 8px 0; font-weight: bold; color: #0052CC;">${newEmployee.designation}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Login Email:</td>
                    <td style="padding: 8px 0; font-weight: bold; color: #0052CC;">${newEmployee.email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #64748b;">Password:</td>
                    <td style="padding: 8px 0; font-weight: bold; color: #d97706; font-family: monospace; font-size: 16px;">${autoPassword}</td>
                  </tr>
                </table>
              </div>
              <p style="font-size: 13px; color: #64748b;">Log in to access your assigned client tasks and project timelines.</p>
              <div style="text-align: center; margin-top: 24px;">
                <a href="https://learnbuildhub.com/employee/login" style="display: inline-block; padding: 14px 28px; background-color: #0052CC; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 14px; border-radius: 50px;">
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
              to: [newEmployee.email],
              subject: `LearnBuild Hub Employee Credentials - ${newEmployee.name}`,
              html: htmlContent,
            }),
          });
        } catch (emailErr) {
          console.warn("Failed sending employee credentials email:", emailErr);
        }
      }
    }

    return NextResponse.json({ 
      success: true, 
      data: newEmployee,
      credentials: {
        name: newEmployee.name,
        email: newEmployee.email,
        password: autoPassword,
        phone: newEmployee.phone,
        designation: newEmployee.designation,
      }
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      memoryEmployees = memoryEmployees.filter((e) => e.id !== id);
      const supabase = createServerClient();
      if (supabase) {
        try {
          await supabase.from("employees").delete().eq("id", id);
        } catch (e) {
          console.warn("Supabase delete employee error:", e);
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
