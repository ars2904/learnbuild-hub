export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  courseTitle: string;
  courseSlug: string;
  expertId: string;
  expertName: string;
  status: "active" | "inactive" | "suspended";
  qualification: string;
  bio: string;
  githubUrl?: string;
  linkedinUrl?: string;
  profileLocked: boolean;
  hasInternship: boolean;
  internshipDetails?: {
    role: string;
    company: string;
    status: "applied" | "reviewing" | "accepted" | "completed";
    appliedDate: string;
  };
  createdAt: string;
}

export interface IssuedCertificate {
  id: string;
  certificateNumber: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  courseTitle: string;
  issueDate: string;
  issuedByAdmin: string;
  verificationCode: string;
  grade: string;
}

export const INITIAL_STUDENTS: StudentProfile[] = [];

export const INITIAL_CERTIFICATES: IssuedCertificate[] = [];

export let memoryStudents: StudentProfile[] = [...INITIAL_STUDENTS];
export let memoryCertificates: IssuedCertificate[] = [...INITIAL_CERTIFICATES];
