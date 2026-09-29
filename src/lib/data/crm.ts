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

export const INITIAL_CLIENTS: Client[] = [];

export const INITIAL_EMPLOYEES: Employee[] = [];

export const INITIAL_TASKS: CRMTask[] = [];
