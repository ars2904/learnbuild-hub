export interface CMSCourse {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  price: number;
  originalPrice: number;
  duration: string;
  badge: string;
  rating: number;
  studentsCount: number;
  image: string;
  instructorName: string;
  syllabus: string[];
  skills: string[];
  featured: boolean;
}

export interface CMSSolution {
  id: string;
  title: string;
  category: string;
  tag: string;
  description: string;
  image: string;
  demoUrl: string;
  priceEstimate: string;
  features: string[];
  techStack: string[];
  featured: boolean;
}

export interface CMSInstructor {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  expertise: string[];
  experienceYears: number;
  rating: number;
  studentsCount: number;
}

export interface CMSBlog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  authorName: string;
  authorAvatar: string;
  coverImage: string;
  readTime: string;
  publishedAt: string;
  featured: boolean;
}

export interface CMSWorkshop {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  eventDate: string;
  duration: string;
  mode: string;
  price: number;
  speakerName: string;
  speakerRole: string;
  speakerAvatar: string;
  coverImage: string;
  agenda: string[];
  whatYouWillLearn: string[];
  status: "upcoming" | "live" | "completed";
  showOnHome?: boolean;
  createdAt?: string;
}

export interface CMSWorkshopRegistration {
  id: string;
  workshopId: string;
  workshopTitle: string;
  fullName: string;
  email: string;
  phone: string;
  qualification: string;
  status: string;
  createdAt: string;
}

export interface CMSSiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  announcementBanner: string;
  contactEmail: string;
  contactPhone: string;
  whatsappPhone: string;
  studentsTrainedCount: string;
  placementRate: string;
  projectsDeliveredCount: string;
  satisfactionRate: string;
}

export const INITIAL_COURSES: CMSCourse[] = [
  {
    id: "crs-101",
    slug: "full-stack-web-engineering",
    title: "Full-Stack Web Engineering & Cloud Systems",
    category: "Software Development",
    description: "Master React, Next.js, Node.js, PostgreSQL, Docker, and AWS microservices with live industry projects.",
    price: 34999,
    originalPrice: 49999,
    duration: "16 Weeks (4 Months)",
    badge: "Most Popular",
    rating: 4.9,
    studentsCount: 1420,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    instructorName: "Rohit Verma",
    syllabus: [
      "Frontend Mastery: HTML5, CSS3, Tailwind CSS, TypeScript & React 18",
      "Next.js App Router, SSR, SSG, Server Actions & State Management",
      "Backend Architecture: Express.js, RESTful APIs, Node.js & Microservices",
      "Database Systems: PostgreSQL, Prisma ORM, Redis Caching & Supabase",
      "Cloud Deployment & DevOps: Docker, AWS EC2/S3, CI/CD Pipelines & Security",
    ],
    skills: ["React", "Next.js", "Node.js", "PostgreSQL", "Docker", "AWS", "TypeScript"],
    featured: true,
  },
  {
    id: "crs-102",
    slug: "ai-machine-learning-engineering",
    title: "AI & Machine Learning Production Track",
    category: "Artificial Intelligence",
    description: "Build custom LLM agents, RAG pipelines, PyTorch models, and deploy AI microservices at scale.",
    price: 42999,
    originalPrice: 59999,
    duration: "20 Weeks (5 Months)",
    badge: "High Growth",
    rating: 4.95,
    studentsCount: 890,
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
    instructorName: "Amit Kumar",
    syllabus: [
      "Python Data Science & Mathematical Foundations for Machine Learning",
      "Deep Learning with PyTorch & Neural Network Architectures",
      "Natural Language Processing, Transformer Models & Hugging Face",
      "Building Generative AI Applications with LangChain, LlamaIndex & Vector DBs",
      "Deploying AI Models as Scalable FastAPI Services on Kubernetes",
    ],
    skills: ["Python", "PyTorch", "LangChain", "FastAPI", "VectorDB", "LlamaIndex"],
    featured: true,
  },
  {
    id: "crs-103",
    slug: "devops-cloud-architecture",
    title: "DevOps Engineering & Multi-Cloud Architecture",
    category: "Cloud & Infrastructure",
    description: "Automate CI/CD pipelines, Kubernetes cluster orchestration, Terraform IaC, and AWS cloud security.",
    price: 38999,
    originalPrice: 54999,
    duration: "14 Weeks (3.5 Months)",
    badge: "Trending",
    rating: 4.88,
    studentsCount: 650,
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=80",
    instructorName: "Sneha Sharma",
    syllabus: [
      "Linux System Administration & Shell Scripting Automation",
      "Containerization with Docker & Container Security Best Practices",
      "Kubernetes Cluster Setup, Ingress Controllers & Helm Charts",
      "Infrastructure as Code (IaC) using Terraform & Ansible",
      "Enterprise CI/CD Pipelines with GitHub Actions & ArgoCD",
    ],
    skills: ["Docker", "Kubernetes", "AWS", "Terraform", "GitHub Actions", "Linux"],
    featured: false,
  },
];

export const INITIAL_WORKSHOPS: CMSWorkshop[] = [
  {
    id: "ws-career-49",
    slug: "tech-career-guidance-call",
    title: "1-to-1 Personalized Tech Career Guidance Call",
    tagline: "Get personalized guidance, clear your doubts and plan your next step with confidence.",
    description: "Confused about your tech career? Speak 1-to-1 with a Senior Software Architect for 49 minutes. Get clear direction on tech stacks (.NET, Java, Python, MERN), resume building, and job opportunities.",
    category: "Career Guidance",
    eventDate: new Date(Date.now() + 86400000 * 3).toISOString(),
    duration: "49 Minutes 1-to-1 Session",
    mode: "Personalized 1-to-1 Online Call",
    price: 49,
    speakerName: "Saurabh Srivastava",
    speakerRole: "Senior Software Engineer",
    speakerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    coverImage: "/images/workshops/career-guidance-call.jpg",
    agenda: [
      "Career Options & Industry Demands",
      "Technology Guidance (.NET / Java / Python / MERN)",
      "Courses & Learning Roadmap",
      "Internships & Opportunity Search Strategy",
      "Resume & Portfolio Project Tips",
      "Q&A - Ask Anything Freely",
    ],
    whatYouWillLearn: [
      "Ask your questions freely in a 1-to-1 setup",
      "Understand the best technology & career path for your goals",
      "Plan your next step with clarity and confidence",
    ],
    status: "upcoming",
    showOnHome: true,
  },
  {
    id: "ws-saturday-live",
    slug: "learnbuild-saturday-tech-workshop",
    title: "LearnBuild Saturday Live Tech Workshop",
    tagline: "Learn something new. Ask your doubts. Build your skills.",
    description: "Join our exclusive Saturday hands-on masterclass. Cover HTML/CSS, Git/GitHub, AI tools, and career roadmaps with live expert guidance. Limited to 50 participants!",
    category: "Saturday Workshop",
    eventDate: new Date(Date.now() + 86400000 * 7).toISOString(),
    duration: "Every Saturday Live",
    mode: "Online (Google Meet)",
    price: 0,
    speakerName: "Saurabh Srivastava",
    speakerRole: "Senior Software Engineer",
    speakerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    coverImage: "/images/workshops/saturday-free-workshop.jpg",
    agenda: [
      "How to Choose your Tech Career?",
      "Build Your First Website (HTML & CSS)",
      "Git & GitHub for Beginners",
      "How to Build a Developer Resume",
      ".NET vs Java vs Python vs MERN",
      "AI Tools Every Student Should Know",
      "Build a Project for Your Resume",
    ],
    whatYouWillLearn: [
      "Practical Learning for a Brighter Tomorrow",
      "Limited to 50 Participants Only!",
      "Expert Guidance & Live Q&A",
    ],
    status: "upcoming",
    showOnHome: false,
  },
];

export const INITIAL_SOLUTIONS: CMSSolution[] = [
  {
    id: "sol-101",
    title: "School & College Management Software Suite",
    category: "Education Tech",
    tag: "Ready to Deploy",
    description: "Complete ERP system featuring attendance tracking, fee collection gateway, student portal, and report card generation.",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
    demoUrl: "/admin/demos",
    priceEstimate: "₹1,49,000",
    features: ["Student & Staff Directory", "Fee Collection & Online Payment Gateway", "Parent WhatsApp Notifications", "Admin Analytics Dashboard"],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Tailwind CSS"],
    featured: true,
  },
  {
    id: "sol-102",
    title: "Hospital & Multi-Specialty Clinic ERP",
    category: "Healthcare Software",
    tag: "Enterprise Grade",
    description: "Digital OPD booking, doctor schedule management, electronic health records (EHR), and billing invoice system.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
    demoUrl: "/admin/demos",
    priceEstimate: "₹1,99,000",
    features: ["Doctor Appointment Portal", "Digital Prescription Generator", "Pharmacy & Inventory Control", "Lab Test Report Generation"],
    techStack: ["React", "Express.js", "MongoDB", "Tailwind CSS"],
    featured: true,
  },
  {
    id: "sol-103",
    title: "Multi-Vendor E-Commerce & Marketplace Suite",
    category: "Retail & E-Commerce",
    tag: "High Revenue",
    description: "Fully-featured online shopping portal with vendor dashboard, cart checkout, order tracking, and Razorpay/Stripe integration.",
    image: "https://images.unsplash.com/photo-1556742049-0a6796d49cb4?auto=format&fit=crop&w=800&q=80",
    demoUrl: "/admin/demos",
    priceEstimate: "₹1,79,000",
    features: ["Seller Vendor Panel", "Razorpay / Stripe Payment Processing", "Real-Time Order Tracking", "Inventory Alert System"],
    techStack: ["Next.js", "Supabase", "Stripe API", "Tailwind CSS"],
    featured: true,
  },
];

export const INITIAL_INSTRUCTORS: CMSInstructor[] = [];

export const INITIAL_BLOGS: CMSBlog[] = [];

export const INITIAL_SITE_SETTINGS: CMSSiteSettings = {
  heroTitle: "Build Real Software Products & Master In-Demand Engineering Tracks",
  heroSubtitle: "LearnBuild Hub empowers students, developers, and businesses with live mentorship, ready-to-deploy software solutions, and industry-aligned full-stack engineering programs.",
  announcementBanner: "🎉 Admissions Open for Fall 2026 Engineering & AI Internship Cohorts! Apply Today.",
  contactEmail: "Info@learnbuildhub.com",
  contactPhone: "+91 81495 65351",
  whatsappPhone: "+91 81495 65351",
  studentsTrainedCount: "5,000+",
  placementRate: "98%",
  projectsDeliveredCount: "120+",
  satisfactionRate: "4.9/5",
};

// Global Memory Stores
export let memoryCourses: CMSCourse[] = [...INITIAL_COURSES];
export let memorySolutions: CMSSolution[] = [...INITIAL_SOLUTIONS];
export let memoryInstructors: CMSInstructor[] = [...INITIAL_INSTRUCTORS];
export let memoryBlogs: CMSBlog[] = [...INITIAL_BLOGS];
export let memoryWorkshops: CMSWorkshop[] = [...INITIAL_WORKSHOPS];
export let memoryWorkshopRegistrations: CMSWorkshopRegistration[] = [];
export let memorySiteSettings: CMSSiteSettings = { ...INITIAL_SITE_SETTINGS };
export const deletedWorkshops = new Set<string>();
