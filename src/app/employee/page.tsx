"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  CheckSquare, Calendar, UserCheck, Briefcase, 
  Clock, AlertTriangle, LogOut, Loader2, Sparkles, CheckCircle2,
  Search, Bell, Plus, MessageSquare, Phone, ArrowRight, User, GraduationCap, Mail, Edit3, Save, ShieldCheck, ChevronRight, LayoutDashboard, ExternalLink
} from "lucide-react";
import { CRMTask, Employee } from "@/lib/data/crm";
import { StudentProfile } from "@/lib/data/studentStore";
import { getUserSession } from "@/lib/supabase/auth";

function formatEmailToName(email: string): string {
  if (!email || !email.includes("@")) return "Expert Mentor";
  const username = email.split("@")[0];
  return username.replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function ExpertDashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "dashboard";

  const [loading, setLoading] = useState(true);
  const [expertEmail, setExpertEmail] = useState("expert@learnbuildhub.com");
  const [expertInfo, setExpertInfo] = useState<Employee | null>(null);

  // Scoped Data States
  const [myTasks, setMyTasks] = useState<CRMTask[]>([]);
  const [myStudents, setMyStudents] = useState<StudentProfile[]>([]);
  const [myEnquiries, setMyEnquiries] = useState<any[]>([]);

  // Profile Edit State
  const [profileForm, setProfileForm] = useState({
    name: "",
    designation: "",
    department: "",
    phone: "",
  });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSaveMsg, setProfileSaveMsg] = useState("");

  const fetchExpertScopedData = async (email: string) => {
    setLoading(true);
    try {
      const [resEmp, resTasks, resStudents, resEnq] = await Promise.all([
        fetch("/api/admin/employees"),
        fetch(`/api/admin/tasks?employeeEmail=${encodeURIComponent(email)}`),
        fetch("/api/admin/students"),
        fetch("/api/admin/leads?type=messages"),
      ]);

      const [jsonEmp, jsonTasks, jsonStudents, jsonEnq] = await Promise.all([
        resEmp.json(),
        resTasks.json(),
        resStudents.json(),
        resEnq.json(),
      ]);

      let expertObj: Employee | null = null;
      if (jsonEmp.success && jsonEmp.data && jsonEmp.data.length > 0) {
        expertObj = jsonEmp.data.find((e: Employee) => e.email.toLowerCase() === email.toLowerCase()) || null;
      }

      if (!expertObj) {
        const dynamicName = formatEmailToName(email);
        expertObj = {
          id: `emp-${Date.now()}`,
          name: dynamicName,
          email: email,
          designation: "Senior Expert Mentor",
          department: "Software Engineering",
          phone: "+91 98765 00000",
          role: "Employee",
          status: "Active",
          createdAt: new Date().toISOString(),
        };
      }

      setExpertInfo(expertObj);
      setProfileForm({
        name: expertObj.name,
        designation: expertObj.designation,
        department: expertObj.department,
        phone: expertObj.phone || "",
      });

      // Filter Tasks assigned ONLY to this Expert
      if (jsonTasks.success && jsonTasks.data) {
        setMyTasks(jsonTasks.data);
      }

      // Filter Students assigned ONLY to this Expert
      if (jsonStudents.success && jsonStudents.data) {
        const filteredStudents = jsonStudents.data.filter(
          (s: StudentProfile) => 
            s.expertId === expertObj?.id || 
            s.expertName?.toLowerCase() === expertObj?.name?.toLowerCase() ||
            s.expertId === "emp-101"
        );
        setMyStudents(filteredStudents);
      }

      // Filter Enquiries
      if (jsonEnq.success && jsonEnq.data) {
        setMyEnquiries(jsonEnq.data.slice(0, 4));
      }
    } catch (err) {
      console.error("Error fetching expert scoped dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedEmp = typeof window !== "undefined" ? localStorage.getItem("lb_employee_email") : null;
    if (storedEmp) {
      setExpertEmail(storedEmp);
      fetchExpertScopedData(storedEmp);
    } else {
      getUserSession().then((session) => {
        const email = session?.user?.email || "expert@learnbuildhub.com";
        setExpertEmail(email);
        fetchExpertScopedData(email);
      });
    }
  }, []);

  const handleUpdateTaskStatus = async (task: CRMTask, newStatus: CRMTask["status"]) => {
    try {
      const res = await fetch("/api/admin/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: task.id, status: newStatus }),
      });
      const json = await res.json();
      if (json.success) {
        fetchExpertScopedData(expertEmail);
      }
    } catch (err) {
      console.error("Error updating task status:", err);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileSaveMsg("");
    try {
      if (expertInfo) {
        const res = await fetch("/api/admin/employees", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: expertInfo.id, ...profileForm }),
        });
        const json = await res.json();
        if (json.success) {
          setProfileSaveMsg("Professional Profile updated successfully!");
          setTimeout(() => setProfileSaveMsg(""), 3000);
        }
      }
    } catch (err) {
      console.error("Error updating expert profile:", err);
    } finally {
      setProfileSaving(false);
    }
  };

  // Metrics for assigned Expert
  const totalTasks = myTasks.length;
  const pendingTasks = myTasks.filter((t) => t.status === "Pending").length;
  const inProgressTasks = myTasks.filter((t) => t.status === "In Progress").length;
  const completedTasks = myTasks.filter((t) => t.status === "Completed").length;

  return (
    <div className="space-y-8 font-sans">
      
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white border border-emerald-800/50 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-emerald-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Assigned Expert Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-1">
            Welcome, {expertInfo?.name || "Expert"} 👋
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 font-normal">
            Manage your assigned student tracks, task deadlines, enquiries, and mentorship calendar sessions.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <div className="px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
            <span className="block text-xl font-black text-white">{myStudents.length}</span>
            <span className="text-[10px] text-emerald-200 uppercase font-bold">Assigned Students</span>
          </div>
          <div className="px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
            <span className="block text-xl font-black text-amber-300">{pendingTasks}</span>
            <span className="text-[10px] text-emerald-200 uppercase font-bold">Pending Tasks</span>
          </div>
        </div>
      </div>

      {/* VIEW: DASHBOARD OVERVIEW */}
      {activeTab === "dashboard" && (
        <div className="space-y-8">
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center font-black">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900">{myStudents.length}</span>
                <p className="text-xs font-bold text-slate-500">My Students</p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center font-black">
                <CheckSquare className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900">{pendingTasks}</span>
                <p className="text-xs font-bold text-slate-500">Pending Tasks</p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-brand-blue flex items-center justify-center font-black">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900">{myEnquiries.length}</span>
                <p className="text-xs font-bold text-slate-500">Assigned Enquiries</p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center font-black">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900">3</span>
                <p className="text-xs font-bold text-slate-500">Upcoming Sessions</p>
              </div>
            </div>
          </div>

          {/* Grid Layout: Tasks Preview & Students Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Tasks Preview */}
            <div className="p-6 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900">My Priority Tasks</h3>
                  <p className="text-xs text-slate-500">Recent deliverables assigned by Admin</p>
                </div>
                <Link
                  href="/employee?tab=tasks"
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {loading ? (
                <div className="py-8 text-center text-slate-400">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-emerald-600 mb-1" />
                  <span className="text-xs font-bold">Loading tasks...</span>
                </div>
              ) : myTasks.length === 0 ? (
                <div className="p-6 rounded-2xl bg-slate-50 text-center text-slate-500 text-xs font-medium">
                  No assigned tasks right now.
                </div>
              ) : (
                <div className="space-y-3">
                  {myTasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <h4 className="font-bold text-xs text-slate-900 truncate">{task.title}</h4>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">{task.description}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase whitespace-nowrap ${
                        task.status === "Completed" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {task.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Students Preview */}
            <div className="p-6 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900">Assigned Students</h3>
                  <p className="text-xs text-slate-500">Learners under your domain guidance</p>
                </div>
                <Link
                  href="/employee?tab=students"
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {loading ? (
                <div className="py-8 text-center text-slate-400">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-emerald-600 mb-1" />
                  <span className="text-xs font-bold">Loading students...</span>
                </div>
              ) : myStudents.length === 0 ? (
                <div className="p-6 rounded-2xl bg-slate-50 text-center text-slate-500 text-xs font-medium">
                  No students assigned yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {myStudents.slice(0, 3).map((std) => (
                    <div key={std.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <h4 className="font-bold text-xs text-slate-900 truncate">{std.name}</h4>
                        <p className="text-[11px] text-brand-blue font-semibold truncate mt-0.5">{std.courseTitle}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase whitespace-nowrap">
                        {std.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* VIEW: MY TASKS */}
      {activeTab === "tasks" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900">Admin-Assigned Tasks & Deliverables</h3>
              <p className="text-xs text-slate-500">Track deadlines and update execution statuses for assigned projects.</p>
            </div>
          </div>

          {loading ? (
            <div className="py-16 text-center text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-emerald-600" />
              <p className="text-xs font-medium">Loading your assigned tasks...</p>
            </div>
          ) : myTasks.length === 0 ? (
            <div className="p-12 rounded-3xl bg-white border-2 border-slate-200/80 text-center text-slate-500">
              <CheckSquare className="w-10 h-10 mx-auto mb-2 text-slate-400" />
              <p className="text-sm font-bold text-slate-900 mb-1">No Assigned Tasks</p>
              <p className="text-xs">You currently have zero pending task assignments from Admin.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-6 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                        task.priority === "Urgent" || task.priority === "High"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : "bg-blue-50 text-brand-blue border border-blue-200"
                      }`}>
                        {task.priority} Priority
                      </span>
                      <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Due {task.deadline}</span>
                      </span>
                    </div>

                    <h4 className="text-base font-black text-slate-900">{task.title}</h4>
                    <p className="text-xs text-slate-600 line-clamp-3 font-medium">{task.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-bold">Update Status:</span>
                    <select
                      value={task.status}
                      onChange={(e) => handleUpdateTaskStatus(task, e.target.value as any)}
                      className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-black focus:outline-none focus:border-emerald-600"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW: MY STUDENTS */}
      {activeTab === "students" && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-black text-slate-900">Students Enrolled in Your Mentor Tracks</h3>
            <p className="text-xs text-slate-500">Only students assigned to your mentorship tracks are displayed here.</p>
          </div>

          {myStudents.length === 0 ? (
            <div className="p-12 rounded-3xl bg-white border-2 border-slate-200/80 text-center text-slate-500">
              <GraduationCap className="w-10 h-10 mx-auto mb-2 text-slate-400" />
              <p className="text-sm font-bold text-slate-900 mb-1">No Assigned Students</p>
              <p className="text-xs">Students assigned to your courses by Admin will appear here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myStudents.map((std) => (
                <div key={std.id} className="p-6 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-base font-black text-slate-900">{std.name}</h4>
                      <p className="text-xs font-bold text-brand-blue mt-0.5">{std.courseTitle}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase">
                      {std.status}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs text-slate-700 font-medium">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{std.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{std.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW: ASSIGNED ENQUIRIES */}
      {activeTab === "enquiries" && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-black text-slate-900">Technical & Course Enquiries</h3>
            <p className="text-xs text-slate-500">Inquiries and demo queries relevant to your domain expertise.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myEnquiries.map((enq) => (
              <div key={enq.id} className="p-6 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-black text-slate-900">{enq.name}</h4>
                  <span className="text-[11px] font-bold text-brand-blue">{enq.email}</span>
                </div>
                <p className="text-xs text-slate-500 font-semibold">{enq.subject || "Course Query"}</p>
                <p className="text-xs text-slate-700 leading-relaxed font-medium bg-slate-50 p-3 rounded-xl border border-slate-200">
                  "{enq.message}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: CLASS CALENDAR */}
      {activeTab === "calendar" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm space-y-6">
          <div>
            <h3 className="text-xl font-black text-slate-900">Mentorship Class & Session Schedule</h3>
            <p className="text-xs text-slate-500">View upcoming live classes, code reviews, and capstone evaluations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "React 18 Architecture Live Session", date: "Today, 4:00 PM", student: "Full-Stack Cohort A", type: "Live Mentorship" },
              { title: "1-on-1 Capstone Code Review", date: "Tomorrow, 2:30 PM", student: "Priya Sharma", type: "Code Review" },
              { title: "Node.js REST API Evaluation", date: "Oct 02, 5:00 PM", student: "Full-Stack Cohort B", type: "Evaluation" },
            ].map((sess, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] uppercase">
                  {sess.type}
                </span>
                <h4 className="font-black text-sm text-slate-900">{sess.title}</h4>
                <p className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{sess.date}</span>
                </p>
                <p className="text-xs font-semibold text-slate-700">Recipient: {sess.student}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: MY PROFILE */}
      {activeTab === "profile" && (
        <div className="max-w-2xl p-6 sm:p-8 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm space-y-6">
          <div>
            <h3 className="text-xl font-black text-slate-900">Edit Professional Expert Profile</h3>
            <p className="text-xs text-slate-500">Update your public designation, domain department, and contact phone.</p>
          </div>

          {profileSaveMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{profileSaveMsg}</span>
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-slate-700 mb-1">Designation / Role Title</label>
              <input
                type="text"
                required
                value={profileForm.designation}
                onChange={(e) => setProfileForm({ ...profileForm, designation: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-1">Department</label>
                <input
                  type="text"
                  value={profileForm.department}
                  onChange={(e) => setProfileForm({ ...profileForm, department: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                disabled={profileSaving}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-md disabled:opacity-50 flex items-center gap-2 transition-all"
              >
                {profileSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}

export default function ExpertDashboardPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center text-slate-400 font-bold text-xs">Loading Expert Portal...</div>}>
      <ExpertDashboardContent />
    </Suspense>
  );
}
