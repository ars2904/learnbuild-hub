import { NextResponse } from "next/server";
import { INITIAL_EMPLOYEES, Employee } from "@/lib/data/crm";
import { createServerClient } from "@/lib/supabase/server";

let memoryEmployees: Employee[] = [...INITIAL_EMPLOYEES];

export async function GET() {
  const supabase = createServerClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("employees").select("*").order("created_at", { ascending: false });
      if (!error && data && data.length > 0) {
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

    return NextResponse.json({ 
      success: true, 
      data: newEmployee,
      credentials: {
        email: newEmployee.email,
        password: autoPassword,
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
