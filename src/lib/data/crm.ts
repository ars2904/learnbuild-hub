export interface FollowupRecord {
  id: string;
  date: string;
  note: string;
  addedBy: string;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "lead" | "followup" | "discussion" | "proposal" | "closed_won" | "closed_lost";
  serviceInterested: string;
  contractValue: number;
  assignedEmployeeId?: string;
  assignedEmployeeName?: string;
  notes: string;
  source?: string;
  nextFollowup?: string;
  followupHistory?: FollowupRecord[];
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

export const INITIAL_CLIENTS: Client[] = [
  {
    id: "cli-101",
    name: "Rajesh Sharma",
    company: "ABC Pvt Ltd",
    email: "rajesh@abc.com",
    phone: "+91 98765 43210",
    status: "followup",
    serviceInterested: "Website Development & Software Customization",
    contractValue: 150000,
    assignedEmployeeId: "emp-101",
    assignedEmployeeName: "Sneha Sharma",
    source: "Website Enquiry",
    nextFollowup: "2026-09-28",
    notes: "Need a company website with admin panel and custom CRM integration.",
    followupHistory: [
      { id: "f-1", date: "2026-09-23", note: "Initial call with client. Discussed requirements.", addedBy: "Sneha Sharma" },
      { id: "f-2", date: "2026-09-20", note: "Sent company profile and portfolio deck.", addedBy: "Sneha Sharma" },
      { id: "f-3", date: "2026-09-18", note: "Client showed interest, scheduled demo call.", addedBy: "Sneha Sharma" },
    ],
    createdAt: "2026-09-15T10:30:00Z",
  },
  {
    id: "cli-102",
    name: "Neha Patil",
    company: "Self",
    email: "neha.patil@gmail.com",
    phone: "+91 98123 45678",
    status: "lead",
    serviceInterested: "Digital Marketing & Growth Track",
    contractValue: 45000,
    assignedEmployeeId: "emp-101",
    assignedEmployeeName: "Sneha Sharma",
    source: "Course Enquiry Form",
    nextFollowup: "2026-09-29",
    notes: "Interested in 3-month digital marketing training & internship.",
    followupHistory: [],
    createdAt: "2026-09-26T14:15:00Z",
  },
  {
    id: "cli-103",
    name: "Kunal Mehta",
    company: "XYZ Solutions",
    email: "kunal@xyzsolutions.in",
    phone: "+91 97654 32109",
    status: "discussion",
    serviceInterested: "School Management Software Suite",
    contractValue: 220000,
    assignedEmployeeId: "emp-102",
    assignedEmployeeName: "Rohit Verma",
    source: "Direct Referral",
    nextFollowup: "2026-09-30",
    notes: "Reviewing commercial proposal for multi-branch software system.",
    followupHistory: [],
    createdAt: "2026-09-22T11:00:00Z",
  },
  {
    id: "cli-104",
    name: "Pooja Singh",
    company: "EduTech Pvt Ltd",
    email: "pooja@edutech.in",
    phone: "+91 96543 21098",
    status: "closed_won",
    serviceInterested: "Full-Stack Web Engineering & LMS",
    contractValue: 180000,
    assignedEmployeeId: "emp-101",
    assignedEmployeeName: "Sneha Sharma",
    source: "Inbound Call",
    nextFollowup: "Completed",
    notes: "Contract executed. Phase 1 deployment active.",
    followupHistory: [],
    createdAt: "2026-09-10T09:45:00Z",
  },
];

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: "emp-101",
    name: "Sneha Sharma",
    email: "sneha@learnbuildhub.com",
    password: "Password@123",
    designation: "Sales & Client Executive",
    department: "Business Development",
    phone: "+91 91234 56789",
    role: "Employee",
    status: "Active",
    createdAt: "2026-01-10T00:00:00Z",
  },
  {
    id: "emp-102",
    name: "Rohit Verma",
    email: "rohit@learnbuildhub.com",
    password: "Password@123",
    designation: "Senior Software Engineer",
    department: "Software Engineering",
    phone: "+91 92345 67890",
    role: "Employee",
    status: "Active",
    createdAt: "2026-02-15T00:00:00Z",
  },
  {
    id: "emp-103",
    name: "Amit Kumar",
    email: "amit@learnbuildhub.com",
    password: "Password@123",
    designation: "Full-Stack Developer",
    department: "Software Engineering",
    phone: "+91 93456 78901",
    role: "Employee",
    status: "Active",
    createdAt: "2026-03-01T00:00:00Z",
  },
];

export const INITIAL_TASKS: CRMTask[] = [
  {
    id: "task-201",
    title: "Call client for detailed requirements - ABC Pvt Ltd",
    description: "Discuss admin panel specifications and user roles for ABC Pvt Ltd website.",
    clientId: "cli-101",
    clientName: "ABC Pvt Ltd",
    assignedEmployeeId: "emp-101",
    assignedEmployeeName: "Sneha Sharma",
    assignedEmployeeEmail: "sneha@learnbuildhub.com",
    deadline: "2026-09-28",
    priority: "High",
    status: "Pending",
    createdAt: "2026-09-25T10:00:00Z",
  },
  {
    id: "task-202",
    title: "Send course details to Priya Verma",
    description: "Email curriculum brochure and batch schedule for Digital Marketing track.",
    clientId: "cli-102",
    clientName: "Priya Verma",
    assignedEmployeeId: "emp-102",
    assignedEmployeeName: "Rohit Verma",
    assignedEmployeeEmail: "rohit@learnbuildhub.com",
    deadline: "2026-09-29",
    priority: "Medium",
    status: "In Progress",
    createdAt: "2026-09-26T14:30:00Z",
  },
  {
    id: "task-203",
    title: "Prepare commercial proposal for XYZ Solutions",
    description: "Finalize pricing milestone breakdown for School Management Software Suite.",
    clientId: "cli-103",
    clientName: "XYZ Solutions",
    assignedEmployeeId: "emp-103",
    assignedEmployeeName: "Amit Kumar",
    assignedEmployeeEmail: "amit@learnbuildhub.com",
    deadline: "2026-09-30",
    priority: "Urgent",
    status: "Pending",
    createdAt: "2026-09-24T09:00:00Z",
  },
  {
    id: "task-204",
    title: "Update client information - Neha Patil",
    description: "Log phone call notes and update interested training modules.",
    clientId: "cli-102",
    clientName: "Neha Patil",
    assignedEmployeeId: "emp-101",
    assignedEmployeeName: "Sneha Sharma",
    assignedEmployeeEmail: "sneha@learnbuildhub.com",
    deadline: "2026-09-27",
    priority: "Low",
    status: "Completed",
    createdAt: "2026-09-23T11:00:00Z",
  },
];
