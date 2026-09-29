"use client";

import React, { useState, useEffect } from "react";
import { 
  CheckSquare, Plus, Calendar, UserCheck, Briefcase, 
  Clock, AlertTriangle, Trash2, X, Loader2, Sparkles, Filter, CheckCircle2
} from "lucide-react";
import { CRMTask, Employee, Client } from "@/lib/data/crm";

export default function AdminTasksPage() {
  const [tasks, setTasks] = useState<CRMTask[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    clientName: "",
    assignedEmployeeId: "",
    assignedEmployeeName: "",
    assignedEmployeeEmail: "",
    deadline: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
    priority: "Medium" as CRMTask["priority"],
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resTasks, resEmp, resCli] = await Promise.all([
        fetch("/api/admin/tasks"),
        fetch("/api/admin/employees"),
        fetch("/api/admin/clients"),
      ]);

      const [dataTasks, dataEmp, dataCli] = await Promise.all([
        resTasks.json(),
        resEmp.json(),
        resCli.json(),
      ]);

      if (dataTasks.success) setTasks(dataTasks.data);
      if (dataEmp.success) {
        setEmployees(dataEmp.data);
        if (dataEmp.data.length > 0) {
          setFormData((prev) => ({
            ...prev,
            assignedEmployeeId: dataEmp.data[0].id,
            assignedEmployeeName: dataEmp.data[0].name,
            assignedEmployeeEmail: dataEmp.data[0].email,
          }));
        }
      }
      if (dataCli.success) setClients(dataCli.data);
    } catch (err) {
      console.error("Error loading tasks page data:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        setIsCreateModalOpen(false);
        setFormData({
          title: "",
          description: "",
          clientName: "",
          assignedEmployeeId: employees[0]?.id || "",
          assignedEmployeeName: employees[0]?.name || "",
          assignedEmployeeEmail: employees[0]?.email || "",
          deadline: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
          priority: "Medium",
        });
        fetchData();
      }
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: CRMTask["status"]) => {
    try {
      const res = await fetch("/api/admin/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        fetchData();
      }
    } catch (err) {
      console.error("Error updating task status:", err);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!confirm("Are you sure you want to delete this task assignment?")) return;
    try {
      const res = await fetch(`/api/admin/tasks?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        fetchData();
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleSelectEmployee = (empId: string) => {
    const emp = employees.find((e) => e.id === empId);
    if (emp) {
      setFormData((prev) => ({
        ...prev,
        assignedEmployeeId: emp.id,
        assignedEmployeeName: emp.name,
        assignedEmployeeEmail: emp.email,
      }));
    }
  };

  const filteredTasks = tasks.filter((t) => statusFilter === "all" || t.status === statusFilter);

  const getPriorityBadge = (priority: CRMTask["priority"]) => {
    switch (priority) {
      case "Urgent":
        return <span className="px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-black uppercase">Urgent</span>;
      case "High":
        return <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-black uppercase">High</span>;
      case "Medium":
        return <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-brand-blue text-[10px] font-black uppercase">Medium</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-black uppercase">Low</span>;
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white border border-blue-800/50 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-blue-200 mb-2">
            <CheckSquare className="w-3.5 h-3.5 text-blue-300" />
            <span>Employee Task Assignment Desk</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Workforce Tasks & Project Assignments
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-1">
            Create deliverables, assign tasks to specific employees with deadlines, and track real-time completion status.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-6 py-3.5 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-blue/30 transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Assign New Task</span>
        </button>
      </div>

      {/* Status Filters Bar */}
      <div className="p-4 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-bold">
          {[
            { id: "all", label: "All Tasks" },
            { id: "Pending", label: "Pending" },
            { id: "In Progress", label: "In Progress" },
            { id: "Completed", label: "Completed" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                statusFilter === tab.id
                  ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20 font-black"
                  : "text-slate-600 hover:text-brand-blue hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Task Cards Grid */}
      {loading ? (
        <div className="py-16 text-center text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-blue" />
          <p className="text-xs font-medium">Loading assigned tasks...</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white border-2 border-slate-200/80 text-center text-slate-500 space-y-2">
          <CheckSquare className="w-10 h-10 mx-auto text-slate-400" />
          <p className="text-sm font-bold text-slate-900">No Tasks Found</p>
          <p className="text-xs">Click "Assign New Task" above to assign work to an employee.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="p-6 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-black text-slate-900 leading-snug">{task.title}</h3>
                  {getPriorityBadge(task.priority)}
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed">{task.description}</p>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="text-slate-500 font-bold">Assigned To:</span>
                    <span className="font-black text-brand-blue">{task.assignedEmployeeName}</span>
                  </div>
                  {task.clientName && (
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="text-slate-500 font-bold">Client:</span>
                      <span className="font-bold text-slate-900">{task.clientName}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="text-slate-500 font-bold">Due Date:</span>
                    <span className="font-bold text-slate-800">{task.deadline}</span>
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                <select
                  value={task.status}
                  onChange={(e) => handleUpdateStatus(task.id, e.target.value as any)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs focus:outline-none cursor-pointer"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>

                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors"
                  title="Remove Task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Task Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl space-y-5 my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-xl font-black text-slate-900">Assign New Task</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Call client for detailed requirements"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Task Instructions & Description</label>
                <textarea
                  rows={3}
                  placeholder="Detailed instructions for assigned employee..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-medium resize-none focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Assign To Employee *</label>
                <select
                  value={formData.assignedEmployeeId}
                  onChange={(e) => handleSelectEmployee(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                >
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.designation})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Associated Client / Company (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. ABC Pvt Ltd"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Due Deadline</label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full px-3 py-2 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Priority Level</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-5 py-2.5 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl bg-brand-blue hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-md"
                >
                  Assign Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
