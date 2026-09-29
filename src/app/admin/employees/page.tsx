"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, UserPlus, Mail, MessageSquare, 
  Trash2, X, Loader2, Copy, CheckCircle2, Phone, Briefcase, Send, Eye, EyeOff
} from "lucide-react";
import { Employee } from "@/lib/data/crm";

export default function AdminEmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal & Notification State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [createdCredentials, setCreatedCredentials] = useState<{ 
    email: string; 
    pass: string; 
    name: string; 
    phone: string;
    designation: string;
  } | null>(null);

  const [copied, setCopied] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [emailSentStatus, setEmailSentStatus] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    designation: "",
    department: "Software Development",
    phone: "",
    role: "Employee" as Employee["role"],
    sendEmail: true,
    openWhatsApp: true,
  });

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/employees");
      const json = await res.json();
      if (json.success) {
        setEmployees(json.data);
      }
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        setIsAddModalOpen(false);
        const creds = {
          name: json.data.name,
          email: json.credentials.email,
          pass: json.credentials.password,
          phone: json.data.phone,
          designation: json.data.designation,
        };
        setCreatedCredentials(creds);

        // Auto trigger WhatsApp if selected
        if (formData.openWhatsApp && json.data.phone) {
          triggerWhatsAppMessage(creds);
        }

        setFormData({
          name: "",
          email: "",
          designation: "",
          department: "Software Development",
          phone: "",
          role: "Employee",
          sendEmail: true,
          openWhatsApp: true,
        });
        fetchEmployees();
      }
    } catch (err) {
      console.error("Error creating employee:", err);
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    if (!confirm("Are you sure you want to remove this employee account?")) return;
    try {
      const res = await fetch(`/api/admin/employees?id=${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        fetchEmployees();
      }
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };

  // WhatsApp Dispatch Helper
  const triggerWhatsAppMessage = (creds: { name: string; phone: string; email: string; pass: string; designation: string }) => {
    const cleanPhone = creds.phone.replace(/[^0-9]/g, "");
    const message = `Hello ${creds.name} 👋,

Welcome to the LearnBuild Hub Team! Your official employee workspace account is ready.

📌 *Role:* ${creds.designation}
✉️ *Login Email:* ${creds.email}
🔑 *Password:* ${creds.pass}
🌐 *Employee Portal:* ${window.location.origin}/employee/login

Please login to view your assigned client tasks and project timelines.`;

    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // Email Dispatch Helper
  const triggerEmailDispatch = async (creds: { name: string; email: string; pass: string; designation: string }) => {
    setEmailSending(true);
    setEmailSentStatus(null);
    try {
      const res = await fetch("/api/admin/employees/send-credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: creds.name,
          email: creds.email,
          password: creds.pass,
          designation: creds.designation,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setEmailSentStatus(`Credentials successfully emailed to ${creds.email}!`);
      } else {
        setEmailSentStatus(`Email dispatch failed: ${json.message}`);
      }
    } catch (err) {
      setEmailSentStatus("Failed to send email. Check network connectivity.");
    } finally {
      setEmailSending(false);
    }
  };

  // Clipboard Copy Helper
  const handleCopyCredentials = () => {
    if (!createdCredentials) return;
    const text = `LearnBuild Hub Official Employee Workspace Credentials\n\nName: ${createdCredentials.name}\nDesignation: ${createdCredentials.designation}\nLogin Email: ${createdCredentials.email}\nPassword: ${createdCredentials.pass}\nLogin URL: ${window.location.origin}/employee/login`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white border border-blue-800/50 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-blue-200 mb-2">
            <Users className="w-3.5 h-3.5 text-blue-300" />
            <span>Employee & Credentials Management</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Employee Directory & Automated Access
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-1">
            Create employee accounts with designations and automatically dispatch login credentials via Email or WhatsApp.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-6 py-3.5 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-blue/30 transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Generated Credentials Notification Card */}
      {createdCredentials && (
        <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-emerald-500 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-700 font-black text-base">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Login Credentials Generated for {createdCredentials.name}!</span>
            </div>
            <button
              onClick={() => setCreatedCredentials(null)}
              className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-slate-500 font-bold block">Employee Name:</span>
                <span className="text-slate-900 font-bold text-sm">{createdCredentials.name}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block">Designation:</span>
                <span className="text-amber-700 font-bold">{createdCredentials.designation}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block">Login Email:</span>
                <span className="text-brand-blue font-bold text-sm">{createdCredentials.email}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block">Generated Password:</span>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-700 font-mono font-bold text-sm">
                    {showPassword ? createdCredentials.pass : "••••••••••••"}
                  </span>
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {emailSentStatus && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{emailSentStatus}</span>
            </div>
          )}

          {/* Dispatch Actions Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => triggerWhatsAppMessage(createdCredentials)}
              className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send via WhatsApp</span>
            </button>

            <button
              onClick={() => triggerEmailDispatch(createdCredentials)}
              disabled={emailSending}
              className="px-5 py-3 rounded-2xl bg-brand-blue hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md disabled:opacity-50 cursor-pointer"
            >
              {emailSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
              <span>{emailSending ? "Sending Email..." : "Send via Email"}</span>
            </button>

            <button
              onClick={handleCopyCredentials}
              className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2 transition-all border border-slate-200 cursor-pointer"
            >
              <Copy className="w-4 h-4" />
              <span>{copied ? "Copied to Clipboard!" : "Copy Credentials"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Employee Directory Grid */}
      {loading ? (
        <div className="py-16 text-center text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-blue" />
          <p className="text-xs font-medium">Loading employee directory...</p>
        </div>
      ) : employees.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white border-2 border-slate-200/80 text-center text-slate-500">
          <Users className="w-10 h-10 mx-auto mb-2 text-slate-400" />
          <p className="text-sm font-bold text-slate-900 mb-1">No Employees Found</p>
          <p className="text-xs">Click "Add Employee" above to generate employee credentials.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((emp) => (
            <div
              key={emp.id}
              className="p-6 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">{emp.name}</h3>
                    <p className="text-xs font-bold text-amber-600">{emp.designation}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-black uppercase">
                    {emp.status}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate font-semibold">{emp.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-semibold">{emp.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-semibold">Dept: {emp.department}</span>
                  </div>
                </div>
              </div>

              {/* Action Toolbar on Employee Card */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => triggerWhatsAppMessage({
                      name: emp.name,
                      phone: emp.phone,
                      email: emp.email,
                      pass: emp.password || "LB#Pass123",
                      designation: emp.designation,
                    })}
                    className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 transition-colors flex items-center gap-1 text-[11px] font-extrabold cursor-pointer"
                    title="Send Credentials via WhatsApp"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={() => triggerEmailDispatch({
                      name: emp.name,
                      email: emp.email,
                      pass: emp.password || "LB#Pass123",
                      designation: emp.designation,
                    })}
                    className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-brand-blue transition-colors flex items-center gap-1 text-[11px] font-extrabold cursor-pointer"
                    title="Send Credentials via Email"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Email</span>
                  </button>
                </div>

                <button
                  onClick={() => handleDeleteEmployee(emp.id)}
                  className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors"
                  title="Remove Employee"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Employee Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl space-y-5 my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-black text-slate-900">Add Employee Account</h3>
                <p className="text-xs text-slate-500 font-medium">Generate credentials & choose dispatch options.</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEmployee} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aman Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Designation / Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Software Engineer"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                  >
                    <option value="Software Development">Software Development</option>
                    <option value="AI & Cloud Solutions">AI & Cloud Solutions</option>
                    <option value="Digital Marketing & Growth">Digital Marketing & Growth</option>
                    <option value="Client Success">Client Success</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Phone / WhatsApp *</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="employee@learnbuildhub.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                />
              </div>

              {/* Dispatch Options Controls */}
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2 text-xs">
                <span className="font-extrabold text-brand-blue block uppercase tracking-wider text-[10px]">
                  Automatic Dispatch Options
                </span>

                <label className="flex items-center gap-2.5 cursor-pointer text-slate-700 font-bold">
                  <input
                    type="checkbox"
                    checked={formData.sendEmail}
                    onChange={(e) => setFormData({ ...formData, sendEmail: e.target.checked })}
                    className="w-4 h-4 rounded accent-brand-blue"
                  />
                  <span>Send credentials to Employee Email automatically</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer text-slate-700 font-bold">
                  <input
                    type="checkbox"
                    checked={formData.openWhatsApp}
                    onChange={(e) => setFormData({ ...formData, openWhatsApp: e.target.checked })}
                    className="w-4 h-4 rounded accent-emerald-600"
                  />
                  <span>Open WhatsApp to message credentials directly</span>
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl bg-brand-blue hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-md"
                >
                  Create & Dispatch Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
