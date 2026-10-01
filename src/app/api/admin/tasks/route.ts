import { NextResponse } from "next/server";
import { INITIAL_TASKS, CRMTask } from "@/lib/data/crm";
import { getSupabaseAdminClient } from "@/lib/supabase/db";

let memoryTasks: CRMTask[] = [...INITIAL_TASKS];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const employeeId = searchParams.get("employeeId");
  const employeeEmail = searchParams.get("employeeEmail");

  const supabase = getSupabaseAdminClient();
  if (supabase) {
    try {
      let query = supabase.from("tasks").select("*").order("created_at", { ascending: false });
      if (employeeId) {
        query = query.eq("assigned_employee_id", employeeId);
      }
      const { data, error } = await query;
      if (!error && data) {
        const dbIds = new Set(data.map((t: any) => t.id));
        const extraMemory = memoryTasks.filter((m) => !dbIds.has(m.id));
        let combined = [...extraMemory, ...data];
        if (employeeId) {
          combined = combined.filter((t) => t.assignedEmployeeId === employeeId || (t as any).assigned_employee_id === employeeId);
        } else if (employeeEmail) {
          combined = combined.filter((t) => t.assignedEmployeeEmail?.toLowerCase() === employeeEmail.toLowerCase() || (t as any).assigned_employee_email?.toLowerCase() === employeeEmail.toLowerCase());
        }
        return NextResponse.json({ success: true, data: combined });
      }
    } catch (err) {
      console.warn("Supabase tasks fetch fallback:", err);
    }
  }

  let filtered = memoryTasks;
  if (employeeId) {
    filtered = filtered.filter(t => t.assignedEmployeeId === employeeId);
  } else if (employeeEmail) {
    filtered = filtered.filter(t => t.assignedEmployeeEmail?.toLowerCase() === employeeEmail.toLowerCase());
  }

  return NextResponse.json({ success: true, data: filtered });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newTask: CRMTask = {
      id: `task-${Date.now()}`,
      title: body.title || "Untitled Task",
      description: body.description || "",
      clientId: body.clientId || "",
      clientName: body.clientName || "General Task",
      assignedEmployeeId: body.assignedEmployeeId || "",
      assignedEmployeeName: body.assignedEmployeeName || "Assigned Team Member",
      assignedEmployeeEmail: body.assignedEmployeeEmail || "",
      deadline: body.deadline || new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
      priority: body.priority || "Medium",
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    memoryTasks.unshift(newTask);

    const supabase = getSupabaseAdminClient();
    if (supabase) {
      try {
        await supabase.from("tasks").insert([{
          id: newTask.id,
          title: newTask.title,
          description: newTask.description,
          client_name: newTask.clientName,
          assigned_employee_id: newTask.assignedEmployeeId,
          assigned_employee_name: newTask.assignedEmployeeName,
          assigned_employee_email: newTask.assignedEmployeeEmail,
          deadline: newTask.deadline,
          priority: newTask.priority,
          status: newTask.status,
        }]);
      } catch (e) {
        console.warn("Supabase insert task error:", e);
      }
    }

    return NextResponse.json({ success: true, data: newTask });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, status, priority, deadline, description } = body;

    if (!id) {
      return NextResponse.json({ success: false, message: "Task ID is required." }, { status: 400 });
    }

    const index = memoryTasks.findIndex((t) => t.id === id);
    let updatedTask: CRMTask;

    if (index !== -1) {
      if (status) memoryTasks[index].status = status;
      if (priority) memoryTasks[index].priority = priority;
      if (deadline) memoryTasks[index].deadline = deadline;
      if (description) memoryTasks[index].description = description;
      updatedTask = memoryTasks[index];
    } else {
      updatedTask = {
        id,
        title: body.title || "Assigned Deliverable",
        description: description || "",
        clientId: "",
        clientName: "General Project",
        assignedEmployeeId: body.assignedEmployeeId || "",
        assignedEmployeeName: body.assignedEmployeeName || "Mentor Expert",
        assignedEmployeeEmail: body.assignedEmployeeEmail || "",
        deadline: deadline || "2026-10-15",
        priority: priority || "High",
        status: status || "Pending",
        createdAt: new Date().toISOString(),
      };
      memoryTasks.unshift(updatedTask);
    }

    const supabase = getSupabaseAdminClient();
    if (supabase) {
      try {
        const updatePayload: Record<string, any> = {};
        if (status) updatePayload.status = status;
        if (priority) updatePayload.priority = priority;
        if (deadline) updatePayload.deadline = deadline;
        if (description) updatePayload.description = description;

        await supabase.from("tasks").update(updatePayload).eq("id", id);
      } catch (e) {
        console.warn("Supabase task update error:", e);
      }
    }

    return NextResponse.json({ success: true, data: updatedTask });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      memoryTasks = memoryTasks.filter((t) => t.id !== id);
      const supabase = getSupabaseAdminClient();
      if (supabase) {
        try {
          await supabase.from("tasks").delete().eq("id", id);
        } catch (e) {
          console.warn("Supabase delete task error:", e);
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
