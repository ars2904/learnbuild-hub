"use client";

import React, { useState, useEffect } from "react";
import { 
  GraduationCap, UserPlus, Search, Edit3, Trash2, X, Loader2, 
  CheckCircle2, ShieldCheck, Mail, Phone, Users, Award, Lock, Unlock, Eye, Sparkles, ExternalLink
} from "lucide-react";
import { StudentProfile, IssuedCertificate } from "@/lib/data/studentStore";

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    courseTitle: "Full-Stack Web Engineering Track",
    courseSlug: "full-stack-web-engineering",
    expertId: "",
    expertName: "Unassigned",
    qualification: "B.Tech Computer Science",
    status: "active" as StudentProfile["status"],
  });

  // Certificate Modal State
  const [certData, setCertData] = useState({
    studentName: "",
    studentEmail: "",
    courseTitle: "Full-Stack Web Engineering Track",
    grade: "Distinction (A+)",
    issuedByAdmin: "LearnBuild Hub Academic Board",
  });
  const [certIssuing, setCertIssuing] = useState(false);
  const [certSuccessMsg, setCertSuccessMsg] = useState("");

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/students");
      const json = await res.json();
      if (json.success) {
        setStudents(json.data);
      }
    } catch (err) {
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleOpenAdd = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      courseTitle: "Full-Stack Web Engineering Track",
      courseSlug: "full-stack-web-engineering",
      expertId: "",
      expertName: "Unassigned",
      qualification: "B.Tech Computer Science",
      status: "active",
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (student: StudentProfile) => {
    setSelectedStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      phone: student.phone,
      courseTitle: student.courseTitle,
      courseSlug: student.courseSlug,
      expertId: student.expertId,
      expertName: student.expertName,
      qualification: student.qualification,
      status: student.status,
    });
    setIsEditModalOpen(true);
  };

  const handleOpenIssueCert = (student?: StudentProfile) => {
    setCertSuccessMsg("");
    if (student) {
      setSelectedStudent(student);
      setCertData({
        studentName: student.name,
        studentEmail: student.email,
        courseTitle: student.courseTitle,
        grade: "Distinction (A+)",
        issuedByAdmin: "LearnBuild Hub Academic Board",
      });
    } else {
      setSelectedStudent(null);
      setCertData({
        studentName: "Priya Sharma",
        studentEmail: "priya.sharma@gmail.com",
        courseTitle: "Full-Stack Web Engineering Track",
        grade: "Distinction (A+)",
        issuedByAdmin: "LearnBuild Hub Academic Board",
      });
    }
    setIsCertModalOpen(true);
  };

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        setIsAddModalOpen(false);
        fetchStudents();
        alert(json.message || `Student created! Account set-password email dispatched to ${formData.email}`);
      }
    } catch (err) {
      console.error("Error creating student:", err);
    }
  };

  const handleUpdateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;
    try {
      const res = await fetch("/api/admin/students", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedStudent.id, ...formData }),
      });
      const json = await res.json();
      if (json.success) {
        setIsEditModalOpen(false);
        fetchStudents();
      }
    } catch (err) {
      console.error("Error updating student:", err);
    }
  };

  const handleToggleLock = async (student: StudentProfile) => {
    const newLockState = !student.profileLocked;
    try {
      const res = await fetch("/api/admin/students", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: student.id, profileLocked: newLockState }),
      });
      const json = await res.json();
      if (json.success) {
        fetchStudents();
      }
    } catch (err) {
      console.error("Error toggling lock:", err);
    }
  };

  const handleDeleteStudent = async (id: string) => {
    if (!confirm("Are you sure you want to remove this student account?")) return;
    try {
      await fetch(`/api/admin/students?id=${id}`, { method: "DELETE" });
      fetchStudents();
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  const handleIssueCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCertIssuing(true);
    try {
      const res = await fetch("/api/admin/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: selectedStudent?.id,
          studentName: certData.studentName,
          studentEmail: certData.studentEmail,
          courseTitle: certData.courseTitle,
          grade: certData.grade,
          issuedByAdmin: certData.issuedByAdmin,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setCertSuccessMsg(`Verified Certificate ${json.data.certificateNumber} issued to ${certData.studentName}!`);
      }
    } catch (err) {
      console.error("Error issuing certificate:", err);
    } finally {
      setCertIssuing(false);
    }
  };

  const filteredStudents = students.filter((s) => {
    const matchesStatus = statusFilter === "All" || s.status === statusFilter.toLowerCase();
    const matchesSearch = 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.expertName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8 font-sans">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white border border-blue-800/50 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-blue-200 mb-2">
            <GraduationCap className="w-3.5 h-3.5 text-blue-300" />
            <span>Student Admissions & Certificate Issuance</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Student Directory & Program Admissions
          </h1>
          <p className="text-xs sm:text-sm text-blue-200 mt-1">
            Manage student enrollments, assign Expert mentors, lock/unlock profiles, and issue verified completion certificates with live previews.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleOpenIssueCert()}
            className="px-5 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>Issue Certificate</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-6 py-3 rounded-full bg-brand-blue hover:bg-blue-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-blue/30 transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {["All", "Active", "Inactive", "Suspended"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                statusFilter === st
                  ? "bg-slate-900 text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search student, course, mentor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-semibold focus:outline-none focus:border-brand-blue"
          />
        </div>
      </div>

      {/* Students Directory Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-500">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-brand-blue" />
          <p className="text-xs font-medium">Loading student directory...</p>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="p-12 rounded-3xl bg-white border-2 border-slate-200/80 text-center text-slate-500">
          <GraduationCap className="w-10 h-10 mx-auto mb-2 text-slate-400" />
          <p className="text-sm font-bold text-slate-900 mb-1">No Students Found</p>
          <p className="text-xs">Click "Add Student" above to enroll student admissions.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((std) => (
            <div
              key={std.id}
              className="p-6 rounded-3xl bg-white border-2 border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">{std.name}</h3>
                    <p className="text-xs font-bold text-brand-blue mt-0.5">{std.courseTitle}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                    std.status === "active"
                      ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                      : "bg-slate-100 border border-slate-200 text-slate-600"
                  }`}>
                    {std.status}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-bold">Email:</span>
                    <span className="font-semibold text-slate-900 truncate max-w-[180px]">{std.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-bold">Assigned Expert:</span>
                    <span className="font-extrabold text-amber-700">{std.expertName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-bold">Profile Lock:</span>
                    <button
                      onClick={() => handleToggleLock(std)}
                      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border cursor-pointer ${
                        std.profileLocked
                          ? "bg-rose-50 border-rose-200 text-rose-700"
                          : "bg-emerald-50 border-emerald-200 text-emerald-700"
                      }`}
                    >
                      {std.profileLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
                      <span>{std.profileLocked ? "Locked" : "Editable"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions Toolbar */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(std)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 border border-slate-200"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-brand-blue" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleOpenIssueCert(std)}
                    className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs flex items-center gap-1 border border-amber-200"
                    title="Issue Verified Certificate"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    <span>Cert</span>
                  </button>
                </div>

                <button
                  onClick={() => handleDeleteStudent(std.id)}
                  className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors"
                  title="Remove Student"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD STUDENT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl space-y-5 my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-black text-slate-900">Add Student Account</h3>
                <p className="text-xs text-slate-500 font-medium">Creates student account & sends set-password email.</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Student Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="student@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+91 98333 44556"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Qualification</label>
                  <input
                    type="text"
                    placeholder="B.Tech Computer Science"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Assigned Course Track</label>
                <select
                  value={formData.courseTitle}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    courseTitle: e.target.value,
                    courseSlug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-")
                  })}
                  className="w-full px-3 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                >
                  <option value="Full-Stack Web Engineering Track">Full-Stack Web Engineering Track</option>
                  <option value="AI & Machine Learning Production Track">AI & Machine Learning Production Track</option>
                  <option value="DevOps Engineering & Multi-Cloud Architecture">DevOps Engineering & Multi-Cloud Architecture</option>
                  <option value="Digital Marketing & Growth Track">Digital Marketing & Growth Track</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Assigned Expert Mentor</label>
                <select
                  value={formData.expertName}
                  onChange={(e) => setFormData({ ...formData, expertName: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:border-brand-blue"
                >
                  <option value="Unassigned">Unassigned (Pending Assignment)</option>
                  <option value="Senior Lead Mentor">Senior Lead Mentor</option>
                  <option value="AI Engineering Lab">AI Engineering Lab</option>
                  <option value="Backend Architecture Team">Backend Architecture Team</option>
                </select>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-900 space-y-1">
                <span className="font-extrabold block text-brand-blue">Automated Account Setup</span>
                <p className="text-[11px] text-blue-700">
                  Account password set link will be generated automatically. No Google login required.
                </p>
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
                  Create Student Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT STUDENT MODAL */}
      {isEditModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-2xl space-y-5 my-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-black text-slate-900">Edit Student Details</h3>
                <p className="text-xs text-slate-500 font-medium">Update student profile, course, or mentor.</p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Student Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Assigned Expert Mentor</label>
                <select
                  value={formData.expertName}
                  onChange={(e) => setFormData({ ...formData, expertName: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold"
                >
                  <option value="Unassigned">Unassigned (Pending Assignment)</option>
                  <option value="Senior Lead Mentor">Senior Lead Mentor</option>
                  <option value="AI Engineering Lab">AI Engineering Lab</option>
                  <option value="Backend Architecture Team">Backend Architecture Team</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-600 mb-1">Account Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-900 text-xs font-bold"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-5 py-2.5 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl bg-brand-blue hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LIVE VISUAL CERTIFICATE ISSUANCE & PREVIEW MODAL */}
      {isCertModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-4xl rounded-3xl bg-white border border-slate-200 shadow-2xl space-y-6 p-6 sm:p-8 my-auto max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <h3 className="text-xl font-black text-slate-900">Issue Official Verified Certificate</h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Live visual preview before issuing certificate to student</p>
              </div>
              <button
                onClick={() => setIsCertModalOpen(false)}
                className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {certSuccessMsg && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>{certSuccessMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Certificate Form */}
              <div className="lg:col-span-5 space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <h4 className="text-xs font-black uppercase text-brand-blue">Certificate Details</h4>
                <form id="certForm" onSubmit={handleIssueCertificate} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-black uppercase text-slate-700 mb-1">Student Name</label>
                    <input
                      type="text"
                      required
                      value={certData.studentName}
                      onChange={(e) => setCertData({ ...certData, studentName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase text-slate-700 mb-1">Course Track Completed</label>
                    <input
                      type="text"
                      required
                      value={certData.courseTitle}
                      onChange={(e) => setCertData({ ...certData, courseTitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black uppercase text-slate-700 mb-1">Grade / Distinction</label>
                    <input
                      type="text"
                      value={certData.grade}
                      onChange={(e) => setCertData({ ...certData, grade: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-amber-700 text-xs font-bold"
                    />
                  </div>
                </form>
              </div>

              {/* Right Live Visual Certificate Preview */}
              <div className="lg:col-span-7 p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white border-4 border-amber-400 shadow-2xl relative overflow-hidden flex flex-col justify-between text-center space-y-4 min-h-[300px]">
                <div className="flex items-center justify-between text-[10px] font-mono text-amber-300 border-b border-white/10 pb-2">
                  <span>LEARNBUILD HUB VERIFIED CERTIFICATE</span>
                  <span>REF: LBH-CERT-2026-LIVE</span>
                </div>

                <div className="space-y-2 py-4">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-300 block">Certificate of Accomplishment</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight">{certData.studentName || "Student Name"}</h2>
                  <p className="text-xs text-slate-300 font-normal max-w-sm mx-auto">
                    has successfully completed the intensive curriculum, mentorship reviews, and capstone project in
                  </p>
                  <h3 className="text-base sm:text-lg font-black text-white">{certData.courseTitle}</h3>
                </div>

                <div className="flex items-end justify-between pt-4 border-t border-white/10 text-[10px] text-slate-400 font-semibold">
                  <div>
                    <span className="block text-white font-bold text-xs">{certData.grade}</span>
                    <span>Performance Grade</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-amber-300 font-mono font-bold text-xs">VERIFIED ★</span>
                    <span>Academic Board</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsCertModalOpen(false)}
                className="px-5 py-2.5 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Close
              </button>

              <button
                type="submit"
                form="certForm"
                disabled={certIssuing}
                className="px-7 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg disabled:opacity-50 flex items-center gap-2"
              >
                {certIssuing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Award className="w-4 h-4" />}
                <span>Confirm & Issue Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
