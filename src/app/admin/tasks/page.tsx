"use client";

import React, { useState, useEffect } from "react";
import { 
  CheckSquare, Plus, Calendar, UserCheck, Briefcase, 
  Clock, AlertTriangle, Trash2, X, Loader2, Sparkles, Filter
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
      console.error("Error fetching tasks data:", err);
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

  const handleUpdateStatus = async (task: CRMTask, newStatus: CRMTask["status"]) => {
    try {
      const res = await fetch("/api/admin/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: task.id, status: newStatus }),
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

  const filteredTasks = tasks.filter((t) => statusFilter === "all" || t.status === statusFilter);

  const getPriorityBadge = (priority: CRMTask["priority"]) => {
    switch (priority) {
      case "Urgent":
        return <span className="px-2 py-0.5 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[10px] font-black uppercase">Urgent</span>;
      case "High":
        return <span className="px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-black uppercase">High</span>;
      case "Medium":
        return <span className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-black uppercase">Medium</span>;
      case "Low":
        return <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 text-[10px] font-black uppercase">Low</span>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-xs font-bold text-purple-300 mb-2">
            <CheckSquare className="w-3.5 h-3.5 text-purple-400" />
            <span>Task Command Center</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Task Assignment & Deadline Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Create tasks, set deadlines, and delegate assignments to specific team members.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-6 py-3.5 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-blue/30 transition-all flex items-center gap-2 flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create & Assign Task</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto">
        {[
          { id: "all", label: "All Tasks" },
          { id: "Pending", label: "Pending" },
          { id: "In Progress", label: "In Progress" },
          { id: "Under Review", label: "Under Review" },
          { id: "Completed", label: "Completed" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setStatusFilter(tab.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              statusFilter === tab.id
                ? "bg-brand-blue text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Task List / Kanban Grid */}
      {loading ? (
        <div className="py-16 text-center text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-blue" />
          <p className="text-xs font-medium">Loading tasks database...</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="p-12 rounded-3xl bg-slate-900 border border-slate-800 text-center text-slate-400">
          <CheckSquare className="w-10 h-10 mx-auto mb-2 text-slate-600" />
          <p className="text-sm font-bold text-white mb-1">No Tasks Found</p>
          <p className="text-xs">Click "Create & Assign Task" above to add task assignments.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-black text-white">{task.title}</h3>
                  {getPriorityBadge(task.priority)}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {task.description}
                </p>

                {/* Associated Client & Assigned Employee Info */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-400 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                      <span>Client Project:</span>
                    </span>
                    <span className="font-extrabold text-white">{task.clientName || "Internal"}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-400 flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-brand-blue" />
                      <span>Assigned Employee:</span>
                    </span>
                    <span className="font-extrabold text-brand-blue">{task.assignedEmployeeName}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                    <span className="font-bold text-slate-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      <span>Deadline:</span>
                    </span>
                    <span className="font-extrabold text-amber-400">{task.deadline}</span>
                  </div>
                </div>
              </div>

              {/* Status Controls */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                <select
                  value={task.status}
                  onChange={(e) => handleUpdateStatus(task, e.target.value as CRMTask["status"])}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-200 focus:outline-none focus:border-brand-blue"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Completed">Completed</option>
                </select>

                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                  title="Delete Task"
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
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-xl font-black text-white">Create & Assign Employee Task</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Build Payment Gateway API Integration"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Detailed Instructions / Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Task specifications, repository URLs, or requirements..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Assign to Employee</label>
                <select
                  value={formData.assignedEmployeeId}
                  onChange={(e) => {
                    const emp = employees.find((emp) => emp.id === e.target.value);
                    if (emp) {
                      setFormData({
                        ...formData,
                        assignedEmployeeId: emp.id,
                        assignedEmployeeName: emp.name,
                        assignedEmployeeEmail: emp.email,
                      });
                    }
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-brand-blue"
                >
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.designation})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Client Association (Optional)</label>
                <select
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-brand-blue"
                >
                  <option value="">Internal Task (No Specific Client)</option>
                  {clients.map((cli) => (
                    <option key={cli.id} value={cli.company}>
                      {cli.company} ({cli.name})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Completion Deadline</label>
                  <input
                    type="date"
                    required
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as CRMTask["priority"] })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-brand-blue"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-blue text-white font-bold text-xs shadow-md"
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
