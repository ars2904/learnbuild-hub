import { NextResponse } from "next/server";
import { INITIAL_CLIENTS, Client } from "@/lib/data/crm";
import { createServerClient } from "@/lib/supabase/server";

let memoryClients: Client[] = [...INITIAL_CLIENTS];

export async function GET() {
  const supabase = createServerClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("clients").select("*").order("created_at", { ascending: false });
      if (!error && data && data.length > 0) {
        return NextResponse.json({ success: true, data });
      }
    } catch (err) {
      console.warn("Supabase clients fetch fallback:", err);
    }
  }

  return NextResponse.json({ success: true, data: memoryClients });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newClient: Client = {
      id: `cli-${Date.now()}`,
      name: body.name || "New Client",
      company: body.company || "Independent",
      email: body.email || "",
      phone: body.phone || "",
      status: body.status || "lead",
      serviceInterested: body.serviceInterested || "Custom Project",
      contractValue: Number(body.contractValue) || 0,
      assignedEmployeeId: body.assignedEmployeeId || "",
      assignedEmployeeName: body.assignedEmployeeName || "Unassigned",
      notes: body.notes || "",
      createdAt: new Date().toISOString(),
    };

    memoryClients.unshift(newClient);

    const supabase = createServerClient();
    if (supabase) {
      try {
        await supabase.from("clients").insert([{
          id: newClient.id,
          name: newClient.name,
          company: newClient.company,
          email: newClient.email,
          phone: newClient.phone,
          status: newClient.status,
          service_interested: newClient.serviceInterested,
          contract_value: newClient.contractValue,
          assigned_employee_name: newClient.assignedEmployeeName,
          notes: newClient.notes,
        }]);
      } catch (e) {
        console.warn("Supabase insert client error:", e);
      }
    }

    return NextResponse.json({ success: true, data: newClient });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, status, notes, assignedEmployeeId, assignedEmployeeName } = body;

    const index = memoryClients.findIndex((c) => c.id === id);
    if (index !== -1) {
      if (status) memoryClients[index].status = status;
      if (notes) memoryClients[index].notes = notes;
      if (assignedEmployeeId) memoryClients[index].assignedEmployeeId = assignedEmployeeId;
      if (assignedEmployeeName) memoryClients[index].assignedEmployeeName = assignedEmployeeName;
    }

    const supabase = createServerClient();
    if (supabase) {
      try {
        await supabase.from("clients").update({ status, notes, assigned_employee_name: assignedEmployeeName }).eq("id", id);
      } catch (e) {
        console.warn("Supabase client update error:", e);
      }
    }

    return NextResponse.json({ success: true, data: memoryClients[index] });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      memoryClients = memoryClients.filter((c) => c.id !== id);
      const supabase = createServerClient();
      if (supabase) {
        try {
          await supabase.from("clients").delete().eq("id", id);
        } catch (e) {
          console.warn("Supabase delete client error:", e);
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
