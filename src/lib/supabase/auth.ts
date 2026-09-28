import { createClient } from "./client";

export async function loginAdmin(email: string, pass: string) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: pass,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
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
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: pass,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
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
