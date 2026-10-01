import { NextResponse } from "next/server";
import { Client } from "@/lib/data/crm";
import { memoryClients } from "@/lib/data/leadsStore";
import { getSupabaseAdminClient } from "@/lib/supabase/db";

export async function GET() {
  const supabase = getSupabaseAdminClient();
  if (supabase) {
    try {
      const { data, error } = await supabase.from("clients").select("*").order("created_at", { ascending: false });
      if (!error && data) {
        // Merge Supabase clients with memory clients (which include newly created leads from demos/contact/enrollments)
        const dbIds = new Set(data.map((c) => c.id));
        const extraMemory = memoryClients.filter((m) => !dbIds.has(m.id));
        return NextResponse.json({ success: true, data: [...extraMemory, ...data] });
      }
    } catch (err) {
      console.warn("Supabase clients fetch fallback to memory:", err);
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

    const supabase = getSupabaseAdminClient();
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
    const { id, status, notes, assignedEmployeeId, assignedEmployeeName, name, email, phone, company, contractValue, serviceInterested } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: "Client ID required." }, { status: 400 });
    }

    const index = memoryClients.findIndex((c) => c.id === id);
    let updatedClient: Client;

    if (index !== -1) {
      updatedClient = {
        ...memoryClients[index],
        name: name || memoryClients[index].name,
        company: company || memoryClients[index].company,
        email: email || memoryClients[index].email,
        phone: phone || memoryClients[index].phone,
        status: status || memoryClients[index].status,
        notes: notes || memoryClients[index].notes,
        serviceInterested: serviceInterested || memoryClients[index].serviceInterested,
        contractValue: contractValue !== undefined ? Number(contractValue) : memoryClients[index].contractValue,
        assignedEmployeeId: assignedEmployeeId || memoryClients[index].assignedEmployeeId,
        assignedEmployeeName: assignedEmployeeName || memoryClients[index].assignedEmployeeName,
      };
      memoryClients[index] = updatedClient;
    } else {
      updatedClient = {
        id,
        name: name || "Client Lead",
        company: company || "Organization",
        email: email || "",
        phone: phone || "",
        status: status || "active",
        serviceInterested: serviceInterested || "Enterprise Service",
        contractValue: Number(contractValue) || 50000,
        assignedEmployeeId: assignedEmployeeId || "",
        assignedEmployeeName: assignedEmployeeName || "Sneha Sharma",
        notes: notes || "",
        createdAt: new Date().toISOString(),
      };
      memoryClients.unshift(updatedClient);
    }

    const supabase = getSupabaseAdminClient();
    if (supabase) {
      try {
        const updatePayload: Record<string, any> = {};
        if (status) updatePayload.status = status;
        if (notes) updatePayload.notes = notes;
        if (assignedEmployeeName) updatePayload.assigned_employee_name = assignedEmployeeName;
        if (name) updatePayload.name = name;
        if (company) updatePayload.company = company;
        if (email) updatePayload.email = email;
        if (phone) updatePayload.phone = phone;
        if (contractValue !== undefined) updatePayload.contract_value = Number(contractValue);
        if (serviceInterested) updatePayload.service_interested = serviceInterested;

        await supabase.from("clients").update(updatePayload).eq("id", id);
      } catch (e) {
        console.warn("Supabase client update error:", e);
      }
    }

    return NextResponse.json({ success: true, data: updatedClient });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const idx = memoryClients.findIndex((c) => c.id === id);
      if (idx !== -1) memoryClients.splice(idx, 1);

      const supabase = getSupabaseAdminClient();
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
