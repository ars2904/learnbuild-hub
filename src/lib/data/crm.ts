export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "lead" | "followup" | "proposal" | "closed_won" | "closed_lost";
  serviceInterested: string;
  contractValue: number;
  assignedEmployeeId?: string;
  assignedEmployeeName?: string;
  notes: string;
  createdAt: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  password?: string;
  designation: string;
  department: string;
  phone: string;
  role: "Employee" | "Manager";
  status: "Active" | "Inactive";
  createdAt: string;
}

export interface CRMTask {
  id: string;
  title: string;
  description: string;
  clientId?: string;
  clientName?: string;
  assignedEmployeeId: string;
  assignedEmployeeName: string;
  assignedEmployeeEmail: string;
  deadline: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "Pending" | "In Progress" | "Under Review" | "Completed";
  createdAt: string;
}

// In-Memory Seed Data for Initial Launch & Fallbacks
export const INITIAL_CLIENTS: Client[] = [
  {
    id: "cli-101",
    name: "Rajesh Kumar",
    company: "Apex Tech Solutions",
    email: "rajesh@apextech.in",
    phone: "+91 98765 43210",
    status: "closed_won",
    serviceInterested: "Custom Web Application & Cloud Architecture",
    contractValue: 150000,
    assignedEmployeeId: "emp-101",
    assignedEmployeeName: "Aman Sharma",
    notes: "Contract signed for 6-month web application build. Phase 1 active.",
    createdAt: "2026-09-15T10:30:00Z",
  },
  {
    id: "cli-102",
    name: "Anita Desai",
    company: "Desai Global Services",
    email: "anita@desaiglobal.com",
    phone: "+91 98123 45678",
    status: "followup",
    serviceInterested: "AI Automation & CRM System Integration",
    contractValue: 220000,
    assignedEmployeeId: "emp-102",
    assignedEmployeeName: "Priya Patel",
    notes: "Demo delivered on Sept 22. Follow-up scheduled for contract review.",
    createdAt: "2026-09-20T14:15:00Z",
  },
  {
    id: "cli-103",
    name: "Vikram Malhotra",
    company: "Starlight Digital",
    email: "vikram@starlightdigital.io",
    phone: "+91 97654 32109",
    status: "proposal",
    serviceInterested: "Mobile App Development (iOS & Android)",
    contractValue: 180000,
    assignedEmployeeId: "emp-101",
    assignedEmployeeName: "Aman Sharma",
    notes: "Scope document and commercial proposal sent.",
    createdAt: "2026-09-24T11:00:00Z",
  },
  {
    id: "cli-104",
    name: "Neha Verma",
    company: "Verma E-Commerce",
    email: "neha@vermaecom.in",
    phone: "+91 96543 21098",
    status: "lead",
    serviceInterested: "SEO & Growth Digital Marketing",
    contractValue: 90000,
    assignedEmployeeId: "emp-103",
    assignedEmployeeName: "Rohan Gupta",
    notes: "Inbound lead from Contact page.",
    createdAt: "2026-09-26T09:45:00Z",
  },
];

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: "emp-101",
    name: "Aman Sharma",
    email: "aman@learnbuildhub.com",
    password: "Password@123",
    designation: "Senior Full-Stack Engineer",
    department: "Software Development",
    phone: "+91 91234 56789",
    role: "Manager",
    status: "Active",
    createdAt: "2026-01-10T00:00:00Z",
  },
  {
    id: "emp-102",
    name: "Priya Patel",
    email: "priya@learnbuildhub.com",
    password: "Password@123",
    designation: "AI & Automation Consultant",
    department: "AI & Cloud Solutions",
    phone: "+91 92345 67890",
    role: "Employee",
    status: "Active",
    createdAt: "2026-02-15T00:00:00Z",
  },
  {
    id: "emp-103",
    name: "Rohan Gupta",
    email: "rohan@learnbuildhub.com",
    password: "Password@123",
    designation: "Digital Growth & CRM Manager",
    department: "Client Success",
    phone: "+91 93456 78901",
    role: "Employee",
    status: "Active",
    createdAt: "2026-03-01T00:00:00Z",
  },
];

export const INITIAL_TASKS: CRMTask[] = [
  {
    id: "task-201",
    title: "Setup Auth & Database Schema for Apex Tech",
    description: "Initialize Supabase PostgreSQL tables, RLS policies, and OAuth client configs for Apex Tech web app.",
    clientId: "cli-101",
    clientName: "Apex Tech Solutions",
    assignedEmployeeId: "emp-101",
    assignedEmployeeName: "Aman Sharma",
    assignedEmployeeEmail: "aman@learnbuildhub.com",
    deadline: "2026-10-05",
    priority: "High",
    status: "In Progress",
    createdAt: "2026-09-25T10:00:00Z",
  },
  {
    id: "task-202",
    title: "Prepare AI Automation Demo Deck for Desai Global",
    description: "Draft workflow architecture diagram and live demonstration video for AI CRM automation.",
    clientId: "cli-102",
    clientName: "Desai Global Services",
    assignedEmployeeId: "emp-102",
    assignedEmployeeName: "Priya Patel",
    assignedEmployeeEmail: "priya@learnbuildhub.com",
    deadline: "2026-10-02",
    priority: "Urgent",
    status: "Pending",
    createdAt: "2026-09-26T14:30:00Z",
  },
  {
    id: "task-203",
    title: "Draft Mobile App Architecture Proposal for Starlight",
    description: "Prepare React Native app specification, timeline breakdown, and milestone payment schedules.",
    clientId: "cli-103",
    clientName: "Starlight Digital",
    assignedEmployeeId: "emp-101",
    assignedEmployeeName: "Aman Sharma",
    assignedEmployeeEmail: "aman@learnbuildhub.com",
    deadline: "2026-10-08",
    priority: "Medium",
    status: "Completed",
    createdAt: "2026-09-24T09:00:00Z",
  },
];
