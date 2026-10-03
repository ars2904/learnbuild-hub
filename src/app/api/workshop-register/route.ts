import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase/db";
import { memoryClients } from "@/lib/data/leadsStore";
import { memoryWorkshopRegistrations } from "@/lib/data/cmsStore";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { workshopId, workshopTitle, fullName, email, phone, qualification } = body;

    if (!fullName || !email || !phone || !workshopTitle) {
      return NextResponse.json(
        { success: false, message: "Full Name, Email, Phone, and Workshop Title are required." },
        { status: 400 }
      );
    }

    const regItem = {
      id: `reg-ws-${Date.now()}`,
      workshopId: workshopId || "general-workshop",
      workshopTitle,
      fullName,
      email,
      phone,
      qualification: qualification || "Undergraduate / Working Professional",
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    const supabase = getSupabaseAdminClient();
    if (supabase) {
      try {
        // 1. Save to workshop_registrations table
        await supabase.from("workshop_registrations").insert({
          workshop_id: regItem.workshopId,
          workshop_title: regItem.workshopTitle,
          full_name: regItem.fullName,
          email: regItem.email,
          phone: regItem.phone,
          qualification: regItem.qualification,
          status: regItem.status,
        });

        // 2. Save as CRM Client Lead
        await supabase.from("clients").insert({
          id: `cli-ws-${Date.now()}`,
          name: regItem.fullName,
          company: regItem.qualification,
          email: regItem.email,
          phone: regItem.phone,
          status: "lead",
          service_interested: `Workshop: ${regItem.workshopTitle}`,
          contract_value: 0,
          assigned_employee_name: "Unassigned",
          notes: `[Workshop Signup] Title: ${regItem.workshopTitle}`,
        });
      } catch (e) {
        console.warn("Supabase workshop registration insert error:", e);
      }
    }

    memoryWorkshopRegistrations.unshift(regItem);
    memoryClients.unshift({
      id: `cli-ws-${Date.now()}`,
      name: regItem.fullName,
      company: regItem.qualification,
      email: regItem.email,
      phone: regItem.phone,
      status: "lead",
      serviceInterested: `Workshop: ${regItem.workshopTitle}`,
      contractValue: 0,
      assignedEmployeeId: "",
      assignedEmployeeName: "Unassigned",
      notes: `[Workshop Signup] Title: ${regItem.workshopTitle}`,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, message: "Registration successful!", data: regItem });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message || "Registration failed." }, { status: 500 });
  }
}
