import { sampleCourses, Course } from "@/data/courses";
import { createServerClient } from "@/lib/supabase/server";

export async function fetchCourses(): Promise<Course[]> {
  const supabase = createServerClient();
  if (!supabase) return sampleCourses;

  try {
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("rating", { ascending: false });

    if (error || !data || data.length === 0) {
      return sampleCourses;
    }

    return data.map((item) => ({
      id: item.id,
      slug: item.slug,
      title: item.title,
      tagline: item.tagline,
      category: item.category,
      duration: item.duration,
      level: item.level,
      mode: item.mode,
      rating: parseFloat(item.rating) || 4.9,
      studentsEnrolled: item.students_enrolled || 500,
      image: item.image,
      shortDescription: item.short_description || "",
      overview: item.overview,
      whatYouWillLearn: Array.isArray(item.what_you_will_learn) ? item.what_you_will_learn : typeof item.what_you_will_learn === "string" ? JSON.parse(item.what_you_will_learn) : [],
      curriculum: Array.isArray(item.curriculum) ? item.curriculum : typeof item.curriculum === "string" ? JSON.parse(item.curriculum) : [],
      eligibility: Array.isArray(item.eligibility) ? item.eligibility : typeof item.eligibility === "string" ? JSON.parse(item.eligibility) : [],
      careerOptions: Array.isArray(item.career_options) ? item.career_options : typeof item.career_options === "string" ? JSON.parse(item.career_options) : [],
      prerequisites: item.prerequisites || "",
    }));
  } catch (err) {
    console.warn("Supabase fetchCourses fallback to static data:", err);
    return sampleCourses;
  }
}

export async function fetchCourseBySlug(slug: string): Promise<Course | undefined> {
  const all = await fetchCourses();
  return all.find((c) => c.slug === slug);
}
