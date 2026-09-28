import { INSTRUCTORS, Instructor } from "@/data/instructors";
import { createServerClient } from "@/lib/supabase/server";

export async function fetchInstructors(): Promise<Instructor[]> {
  const supabase = createServerClient();
  if (!supabase) return INSTRUCTORS;

  try {
    const { data, error } = await supabase
      .from("instructors")
      .select("*")
      .order("rating", { ascending: false });

    if (error || !data || data.length === 0) {
      return INSTRUCTORS;
    }

    return data.map((item) => ({
      id: item.id,
      name: item.name,
      role: item.role,
      gender: item.gender || "male",
      avatar: item.avatar,
      skills: Array.isArray(item.skills) ? item.skills : typeof item.skills === "string" ? JSON.parse(item.skills) : [],
      bio: item.bio,
      coursesTaught: Array.isArray(item.courses_taught) ? item.courses_taught : typeof item.courses_taught === "string" ? JSON.parse(item.courses_taught) : [],
      rating: parseFloat(item.rating) || 4.9,
    }));
  } catch (err) {
    console.warn("Supabase fetchInstructors fallback to static data:", err);
    return INSTRUCTORS;
  }
}

export async function fetchInstructorsForCourse(courseTitle: string): Promise<Instructor[]> {
  const all = await fetchInstructors();
  const matched = all.filter((inst) =>
    inst.coursesTaught.some(
      (c) => c.toLowerCase() === courseTitle.toLowerCase() || courseTitle.toLowerCase().includes(c.toLowerCase()) || c.toLowerCase().includes(courseTitle.toLowerCase())
    )
  );

  if (matched.length > 0) return matched;
  return [all[0], all[1], all[2]].filter(Boolean);
}
