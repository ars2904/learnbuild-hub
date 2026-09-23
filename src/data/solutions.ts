export interface ReadyMadeSolution {
  id: string;
  title: string;
  badge: string;
  shortDescription: string;
  description: string;
  keyFeatures: string[];
  techStack: string[];
  image: string;
}

export const READY_MADE_SOLUTIONS: ReadyMadeSolution[] = [
  {
    id: "school-management",
    title: "School Management System",
    badge: "Education",
    shortDescription: "Complete digital administration platform for schools, colleges, and educational institutes.",
    description: "An end-to-end cloud platform for managing student admissions, fee collection, attendance tracking, online exams, timetable scheduling, report cards, and parent-teacher communication.",
    keyFeatures: [
      "Student Lifecycle & Admission Portal",
      "Automated Fee Collection & Receipt Generation",
      "Attendance & Biometric Integration",
      "Examination, Grading & Digital Report Cards",
      "Parent & Teacher Portal Apps",
    ],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "office-management",
    title: "Office Management System",
    badge: "Enterprise",
    shortDescription: "Streamline staff attendance, payroll processing, leave management, and workspace assets.",
    description: "A comprehensive office operations management platform that automates employee check-ins, monthly payroll, leave approvals, project tracking, expense reporting, and client invoices.",
    keyFeatures: [
      "Employee Attendance & Leave Tracking",
      "Automated Payroll & Salary Slip Generation",
      "Project Allocation & Task Management",
      "Expense Claims & Financial Invoicing",
      "Role-Based Access Control (Admin / HR / Employee)",
    ],
    techStack: ["React", "Express.js", "MySQL", "TypeScript"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "gym-management",
    title: "Gym & Fitness Management",
    badge: "Health & Fitness",
    shortDescription: "All-in-one software to handle member subscriptions, trainer assignments, and facility booking.",
    description: "Designed for fitness centers, gyms, and sports clubs to automate member onboarding, recurring membership billing, automated WhatsApp payment reminders, and workout plan tracking.",
    keyFeatures: [
      "Member Registration & Subscription Plans",
      "Automated WhatsApp Payment & Expiry Reminders",
      "Personal Trainer Assignment & Booking",
      "Locker & Asset Tracking",
      "Revenue Analytics & Growth Dashboards",
    ],
    techStack: ["Next.js", "Tailwind CSS", "MongoDB", "Node.js"],
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "library-management",
    title: "Library Management System",
    badge: "Institutional",
    shortDescription: "Digitize book indexing, barcode issuance, overdue fines, and member catalogs.",
    description: "A streamlined library administration tool that enables instant barcode search, automated issue/return tracking, late fine calculations, reserve requests, and digital cataloging.",
    keyFeatures: [
      "Barcode & RFID Book Cataloging",
      "Instant Book Issue, Return & Renewal",
      "Automated Late Fine Calculation & Receipts",
      "Member Reading History & Hold Requests",
      "Inventory & Book Condition Reports",
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "healthcare-crm",
    title: "Healthcare CRM & Clinic Management",
    badge: "Healthcare",
    shortDescription: "Manage doctor appointments, electronic health records (EHR), and patient billing.",
    description: "Built for clinics, hospitals, and diagnostic centers to streamline online patient booking, digital prescriptions, lab test reports, electronic medical history, and billing.",
    keyFeatures: [
      "Online Patient Appointment Scheduling",
      "Digital Doctor Prescriptions & Medical Notes",
      "Patient History & EHR File Management",
      "Diagnostic Lab Test Reporting",
      "Billing & Insurance Invoice Generation",
    ],
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
  },
];
