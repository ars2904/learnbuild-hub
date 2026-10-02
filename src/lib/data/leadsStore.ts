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

export const INITIAL_DEMOS: DemoLead[] = [];

export const INITIAL_MESSAGES: MessageLead[] = [];

export const INITIAL_ENROLLMENTS: EnrollmentLead[] = [];

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
    assignedEmployeeName: "Unassigned",
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
    assignedEmployeeName: "Unassigned",
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
    assignedEmployeeName: enrollData.instructor || "Unassigned",
    notes: `[Student Enrollment] Course: ${enrollData.course}. Qualification: ${enrollData.qualification || 'N/A'}. ${enrollData.message || ''}`,
    source: "Course Enrollment Modal",
    createdAt: new Date().toISOString(),
  };

  memoryClients.unshift(newClient);

  return newEnroll;
}
