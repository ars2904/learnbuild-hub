import { Client, INITIAL_CLIENTS } from "./crm";

export interface DemoLead {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  solution_title: string;
  company_name: string;
  project_requirements: string;
  budget_range: string;
  status: string;
  created_at: string;
}

export interface MessageLead {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

export interface EnrollmentLead {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  course_title: string;
  instructor_name: string;
  qualification: string;
  message: string;
  status: string;
  created_at: string;
}

export const INITIAL_DEMOS: DemoLead[] = [
  {
    id: "demo-101",
    full_name: "Rahul Verma",
    email: "rahul.verma@apexacademy.edu",
    phone: "+91 98111 22334",
    solution_title: "School & College Management Software Suite",
    company_name: "Apex International Academy",
    project_requirements: "Need custom student attendance & fee collection module for 1,200 students.",
    budget_range: "₹1,50,000 - ₹3,00,000",
    status: "pending",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "demo-102",
    full_name: "Dr. Ananya Roy",
    email: "ananya@healthpulse.com",
    phone: "+91 97222 33445",
    solution_title: "Hospital & Multi-Specialty Clinic Management Software",
    company_name: "HealthPulse Clinic Network",
    project_requirements: "Doctor appointment booking, digital prescriptions, and patient records.",
    budget_range: "₹2,00,000+",
    status: "contacted",
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
];

export const INITIAL_MESSAGES: MessageLead[] = [
  {
    id: "msg-101",
    name: "Suresh Gupta",
    email: "suresh.gupta@techventures.in",
    subject: "Custom ERP & CRM Solution Query",
    message: "We are interested in building a cloud ERP for our distribution logistics business. Please share details and pricing.",
    status: "unread",
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
];

export const INITIAL_ENROLLMENTS: EnrollmentLead[] = [
  {
    id: "enroll-101",
    full_name: "Priya Sharma",
    email: "priya.sharma@gmail.com",
    phone: "+91 98333 44556",
    course_title: "Full-Stack Web Engineering Track",
    instructor_name: "Rohit Verma",
    qualification: "B.Tech Final Year",
    message: "Enrolling for the October batch. Interested in placement assistance.",
    status: "pending",
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
];

// Global Module Memory Stores
export let memoryDemos: DemoLead[] = [...INITIAL_DEMOS];
export let memoryMessages: MessageLead[] = [...INITIAL_MESSAGES];
export let memoryEnrollments: EnrollmentLead[] = [...INITIAL_ENROLLMENTS];
export let memoryClients: Client[] = [...INITIAL_CLIENTS];

export function addDemoLead(leadData: {
  fullName: string;
  email: string;
  phone: string;
  solutionTitle: string;
  companyName?: string;
  projectRequirements?: string;
  budgetRange?: string;
}): DemoLead {
  const newDemo: DemoLead = {
    id: `demo-${Date.now()}`,
    full_name: leadData.fullName,
    email: leadData.email,
    phone: leadData.phone,
    solution_title: leadData.solutionTitle || "Live Software Demo",
    company_name: leadData.companyName || "Startup / Individual",
    project_requirements: leadData.projectRequirements || "Standard demo requested from website",
    budget_range: leadData.budgetRange || "Standard",
    status: "pending",
    created_at: new Date().toISOString(),
  };

  memoryDemos.unshift(newDemo);

  // Cross-post to CRM Clients list
  const newClient: Client = {
    id: `cli-demo-${Date.now()}`,
    name: leadData.fullName,
    company: leadData.companyName || "Website Demo Lead",
    email: leadData.email,
    phone: leadData.phone,
    status: "lead",
    serviceInterested: `Demo: ${newDemo.solution_title}`,
    contractValue: 120000,
    assignedEmployeeName: "Sneha Sharma",
    notes: `[Demo Request] Solution: ${newDemo.solution_title}. Notes: ${newDemo.project_requirements}`,
    source: "Demo Application Modal",
    createdAt: new Date().toISOString(),
  };

  memoryClients.unshift(newClient);

  return newDemo;
}

export function addMessageLead(msgData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): MessageLead {
  const newMsg: MessageLead = {
    id: `msg-${Date.now()}`,
    name: msgData.name,
    email: msgData.email,
    subject: msgData.subject,
    message: msgData.message,
    status: "unread",
    created_at: new Date().toISOString(),
  };

  memoryMessages.unshift(newMsg);

  // Cross-post to CRM Clients list
  const newClient: Client = {
    id: `cli-msg-${Date.now()}`,
    name: msgData.name,
    company: "Contact Form Lead",
    email: msgData.email,
    phone: "N/A",
    status: "lead",
    serviceInterested: `Inquiry: ${msgData.subject}`,
    contractValue: 50000,
    assignedEmployeeName: "Sneha Sharma",
    notes: `[Contact Inquiry] Subject: ${msgData.subject}. Message: ${msgData.message}`,
    source: "Contact Form",
    createdAt: new Date().toISOString(),
  };

  memoryClients.unshift(newClient);

  return newMsg;
}

export function addEnrollmentLead(enrollData: {
  fullName: string;
  email: string;
  phone: string;
  course: string;
  qualification?: string;
  instructor?: string;
  message?: string;
}): EnrollmentLead {
  const newEnroll: EnrollmentLead = {
    id: `enroll-${Date.now()}`,
    full_name: enrollData.fullName,
    email: enrollData.email,
    phone: enrollData.phone,
    course_title: enrollData.course,
    instructor_name: enrollData.instructor || "Any Available Senior Mentor",
    qualification: enrollData.qualification || "Undergraduate",
    message: enrollData.message || "",
    status: "pending",
    created_at: new Date().toISOString(),
  };

  memoryEnrollments.unshift(newEnroll);

  // Cross-post to CRM Clients list
  const newClient: Client = {
    id: `cli-enroll-${Date.now()}`,
    name: enrollData.fullName,
    company: enrollData.qualification || "Student Candidate",
    email: enrollData.email,
    phone: enrollData.phone,
    status: "lead",
    serviceInterested: `Course Enrollment: ${enrollData.course}`,
    contractValue: 45000,
    assignedEmployeeName: enrollData.instructor || "Sneha Sharma",
    notes: `[Student Enrollment] Course: ${enrollData.course}. Qualification: ${enrollData.qualification || 'N/A'}. ${enrollData.message || ''}`,
    source: "Course Enrollment Modal",
    createdAt: new Date().toISOString(),
  };

  memoryClients.unshift(newClient);

  return newEnroll;
}
