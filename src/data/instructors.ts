export interface Instructor {
  id: string;
  name: string;
  role: string;
  avatar: string;
  gender: "male" | "female";
  skills: string[];
  bio: string;
  coursesTaught: string[];
  rating: number;
}

export const INSTRUCTORS: Instructor[] = [];

export function getInstructorsForCourse(courseTitle: string): Instructor[] {
  const matched = INSTRUCTORS.filter((inst) =>
    inst.coursesTaught.some(
      (c) => c.toLowerCase() === courseTitle.toLowerCase() || courseTitle.toLowerCase().includes(c.toLowerCase()) || c.toLowerCase().includes(courseTitle.toLowerCase())
    )
  );

  return matched;
}
