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

export const INITIAL_STUDENTS: StudentProfile[] = [
  {
    id: "std-101",
    name: "Priya Sharma",
    email: "priya.sharma@gmail.com",
    phone: "+91 98333 44556",
    courseTitle: "Full-Stack Web Engineering Track",
    courseSlug: "full-stack-web-engineering",
    expertId: "emp-101",
    expertName: "Sneha Sharma",
    status: "active",
    qualification: "B.Tech Computer Science",
    bio: "Passionate full-stack developer focusing on Next.js 14, React, and Supabase cloud backends.",
    githubUrl: "https://github.com/priyasharma",
    linkedinUrl: "https://linkedin.com/in/priyasharma",
    profileLocked: false,
    hasInternship: true,
    internshipDetails: {
      role: "Full-Stack Web Intern",
      company: "LearnBuild Hub Labs",
      status: "reviewing",
      appliedDate: "2026-09-20",
    },
    createdAt: "2026-09-15T10:00:00Z",
  },
  {
    id: "std-102",
    name: "Aman Verma",
    email: "aman.verma@gmail.com",
    phone: "+91 97111 22334",
    courseTitle: "AI & Machine Learning Production Track",
    courseSlug: "ai-machine-learning-engineering",
    expertId: "inst-102",
    expertName: "Rohit Verma",
    status: "active",
    qualification: "B.E. Information Technology",
    bio: "AI researcher building PyTorch LLM agent applications and RAG vector search pipelines.",
    githubUrl: "https://github.com/amanverma",
    linkedinUrl: "https://linkedin.com/in/amanverma",
    profileLocked: true,
    hasInternship: false,
    createdAt: "2026-09-18T14:30:00Z",
  },
  {
    id: "std-103",
    name: "Vikram Malhotra",
    email: "vikram.m@gmail.com",
    phone: "+91 98222 33445",
    courseTitle: "DevOps Engineering & Multi-Cloud Architecture",
    courseSlug: "devops-cloud-architecture",
    expertId: "inst-103",
    expertName: "Amit Kumar",
    status: "active",
    qualification: "B.Sc Computer Science",
    bio: "Cloud infrastructure enthusiast building Docker containers, Kubernetes clusters, and Terraform CI/CD pipelines.",
    profileLocked: false,
    hasInternship: false,
    createdAt: "2026-09-22T11:00:00Z",
  }
];

export const INITIAL_CERTIFICATES: IssuedCertificate[] = [
  {
    id: "cert-101",
    certificateNumber: "LBH-CERT-2026-8921",
    studentId: "std-101",
    studentName: "Priya Sharma",
    studentEmail: "priya.sharma@gmail.com",
    courseTitle: "Full-Stack Web Engineering Track",
    issueDate: "2026-09-25",
    issuedByAdmin: "LearnBuild Hub Admin",
    verificationCode: "LBH-8921-VERIFIED",
    grade: "Distinction (A+)",
  }
];

export let memoryStudents: StudentProfile[] = [...INITIAL_STUDENTS];
export let memoryCertificates: IssuedCertificate[] = [...INITIAL_CERTIFICATES];
