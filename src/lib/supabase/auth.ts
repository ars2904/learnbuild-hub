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

export async function logoutAdmin() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Sign out error:", error.message);
  }
}

export async function getAdminSession() {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();
  return data.session;
}
