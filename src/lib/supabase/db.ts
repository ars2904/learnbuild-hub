import { createClient } from "@supabase/supabase-js";

// Unified Supabase Data Access Layer using Service Role / Admin Client where available
export function getSupabaseAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "";

  if (!supabaseUrl || !serviceKey) {
    return null;
  }

  return createClient(supabaseUrl, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Persist Contact Submission to Supabase contact_submissions & clients tables
 */
export async function saveContactSubmission(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return false;

  try {
    // 1. Insert into contact_submissions table
    await supabase.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });

    // 2. Insert into clients CRM leads table
    await supabase.from("clients").insert({
      id: `cli-cnt-${Date.now()}`,
      name: data.name,
      company: "Contact Form Lead",
      email: data.email,
      phone: "N/A",
      status: "lead",
      service_interested: `Inquiry: ${data.subject}`,
      contract_value: 50000,
      assigned_employee_name: "Unassigned",
      notes: `[Contact Inquiry] Subject: ${data.subject}. Message: ${data.message}`,
    });

    return true;
  } catch (err) {
    console.warn("saveContactSubmission error:", err);
    return false;
  }
}

/**
 * Persist Demo Request to Supabase demo_requests & clients tables
 */
export async function saveDemoRequest(data: {
  fullName: string;
  email: string;
  phone: string;
  solutionTitle: string;
  companyName?: string;
  projectRequirements?: string;
  budgetRange?: string;
}) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return false;

  try {
    await supabase.from("demo_requests").insert({
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      solution_title: data.solutionTitle,
      company_name: data.companyName || "",
      project_requirements: data.projectRequirements || "",
      budget_range: data.budgetRange || "",
    });

    await supabase.from("clients").insert({
      id: `cli-demo-${Date.now()}`,
      name: data.fullName,
      company: data.companyName || "Website Demo Lead",
      email: data.email,
      phone: data.phone,
      status: "lead",
      service_interested: `Demo: ${data.solutionTitle}`,
      contract_value: 120000,
      assigned_employee_name: "Unassigned",
      notes: `[Demo Request] Solution: ${data.solutionTitle}. ${data.projectRequirements || ""}`,
    });

    return true;
  } catch (err) {
    console.warn("saveDemoRequest error:", err);
    return false;
  }
}

/**
 * Persist Course Enrollment to Supabase enrollments & clients tables
 */
export async function saveEnrollment(data: {
  fullName: string;
  email: string;
  phone: string;
  course: string;
  qualification?: string;
  instructor?: string;
  message?: string;
}) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return false;

  try {
    await supabase.from("enrollments").insert({
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      course_title: data.course,
      instructor_name: data.instructor || "Assigned Mentor",
      qualification: data.qualification || "Undergraduate",
      message: data.message || "",
    });

    await supabase.from("clients").insert({
      id: `cli-enr-${Date.now()}`,
      name: data.fullName,
      company: data.qualification || "Student Candidate",
      email: data.email,
      phone: data.phone,
      status: "lead",
      service_interested: `Course: ${data.course}`,
      contract_value: 45000,
      assigned_employee_name: data.instructor || "Sneha Sharma",
      notes: `[Student Enrollment] Course: ${data.course}. ${data.message || ""}`,
    });

    return true;
  } catch (err) {
    console.warn("saveEnrollment error:", err);
    return false;
  }
}

/**
 * Persist Internship Application to Supabase internship_applications table
 */
export async function saveInternshipApplication(data: {
  name: string;
  email: string;
  phone: string;
  track: string;
  experience?: string;
  duration?: string;
  message?: string;
}) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) return false;

  try {
    await supabase.from("internship_applications").insert({
      full_name: data.name,
      email: data.email,
      phone: data.phone,
      track: data.track,
      experience: data.experience || "Freshers / Students",
      duration: data.duration || "1-3 Months",
      message: data.message || "",
    });

    return true;
  } catch (err) {
    console.warn("saveInternshipApplication error:", err);
    return false;
  }
}
