import { createClient } from "./client";

// Recognized Admin Email Identifiers
const ADMIN_EMAILS = [
  "learnbuildh@gmail.com",
  "admin@learnbuildhub.com",
  "admin@learnbuild.com",
  "saurabh@learnbuildhub.com",
];

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const lower = email.toLowerCase().trim();
  return ADMIN_EMAILS.includes(lower) || lower.startsWith("admin@") || lower.includes("admin");
}

export async function loginWithGoogle() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/dashboard`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function loginUser(email: string, pass: string) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: pass,
  });

  if (error) {
    throw new Error(error.message);
  }

  const isAdmin = isAdminEmail(data.user?.email);
  return { ...data, isAdmin };
}

export async function loginAdmin(email: string, pass: string) {
  return loginUser(email, pass);
}

export async function signupStudent(email: string, pass: string, fullName: string, qualification: string) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password: pass,
    options: {
      data: {
        full_name: fullName,
        qualification: qualification || "Undergraduate",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function loginStudent(email: string, pass: string) {
  return loginUser(email, pass);
}

export async function logoutUser() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Sign out error:", error.message);
  }
}

export async function logoutAdmin() {
  return logoutUser();
}

export async function getUserSession() {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function getAdminSession() {
  return getUserSession();
}
