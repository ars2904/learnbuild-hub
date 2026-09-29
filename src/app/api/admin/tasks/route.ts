import { NextResponse } from "next/server";
import { INITIAL_TASKS, CRMTask } from "@/lib/data/crm";
import { createServerClient } from "@/lib/supabase/server";

let memoryTasks: CRMTask[] = [...INITIAL_TASKS];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const employeeId = searchParams.get("employeeId");
  const employeeEmail = searchParams.get("employeeEmail");

  const supabase = createServerClient();
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
          combined = combined.filter((t) => t.assignedEmployeeEmail?.toLowerCase() === employeeEmail.toLowerCase());
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

    const supabase = createServerClient();
    if (supabase) {
      try {
        await supabase.from("tasks").insert([{
          id: newTask.id,
          title: newTask.title,
          description: newTask.description,
          client_name: newTask.clientName,
          assigned_employee_id: newTask.assignedEmployeeId,
          assigned_employee_name: newTask.assignedEmployeeName,
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

    const index = memoryTasks.findIndex((t) => t.id === id);
    if (index !== -1) {
      if (status) memoryTasks[index].status = status;
      if (priority) memoryTasks[index].priority = priority;
      if (deadline) memoryTasks[index].deadline = deadline;
      if (description) memoryTasks[index].description = description;
    }

    const supabase = createServerClient();
    if (supabase) {
      try {
        await supabase.from("tasks").update({ status, priority, deadline, description }).eq("id", id);
      } catch (e) {
        console.warn("Supabase task update error:", e);
      }
    }

    return NextResponse.json({ success: true, data: memoryTasks[index] });
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
      const supabase = createServerClient();
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
