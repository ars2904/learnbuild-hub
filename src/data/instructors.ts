export interface Instructor {
  id: string;
  name: string;
  role: string;
  avatar: string;
  skills: string[];
  bio: string;
  coursesTaught: string[];
  rating: number;
}

export const INSTRUCTORS: Instructor[] = [
  {
    id: "rahul-s",
    name: "Rahul S.",
    role: "Senior Full-Stack & Web Engineering Mentor",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Rahul",
    skills: ["React", "Next.js 14", "TypeScript", "Node.js", "PostgreSQL"],
    bio: "Specializes in modern web engineering, React 18 component architecture, and building production-grade SaaS applications. Over 6+ years of full-stack engineering experience.",
    coursesTaught: [
      "Full-Stack Web Engineering Track",
      "Node.js & React Modern Stack",
      "WordPress Custom Development",
      "PHP & Laravel Mastery",
    ],
    rating: 4.9,
  },
  {
    id: "priya-k",
    name: "Priya K.",
    role: "AI & Data Science Engineering Lead",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Priya",
    skills: ["Python", "Data Analysis", "Machine Learning", "PyTorch", "SQL"],
    bio: "Specializes in Python data science, machine learning models, neural networks, and generative AI LLM integrations. Passionate about practical project-based learning.",
    coursesTaught: [
      "AI & Machine Learning Engineering Track",
      "Data Science & Business Analytics Track",
      "Python Full-Stack & Automation",
      "SQL & Relational Databases",
    ],
    rating: 4.9,
  },
  {
    id: "amit-r",
    name: "Amit R.",
    role: "Mobile Engineering & Automation Specialist",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Amit",
    skills: ["React Native", "iOS & Android", "TypeScript", "Python", "Redux"],
    bio: "Specializes in cross-platform mobile app development, native iOS/Android device integrations, and automated testing pipelines. Has published 15+ production apps.",
    coursesTaught: [
      "Mobile Application Engineering Track",
      "Python Full-Stack & Automation",
      "Your Choice / Custom Tech Track",
    ],
    rating: 4.8,
  },
  {
    id: "vikram-s",
    name: "Vikram S.",
    role: "Cloud Architecture & DevOps Lead",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Vikram",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "Linux"],
    bio: "Specializes in cloud infrastructure architecture, AWS cloud systems, Docker containerization, Kubernetes cluster orchestration, and automated CI/CD pipelines.",
    coursesTaught: [
      "Cloud Computing & DevOps Track",
      ".NET & C# Enterprise Engineering",
      "Your Choice / Custom Tech Track",
    ],
    rating: 4.9,
  },
  {
    id: "neha-m",
    name: "Neha M.",
    role: "Digital Marketing & Growth Strategist",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Neha",
    skills: ["SEO", "Google Ads", "Meta Ads", "Content Funnels", "GA4 Analytics"],
    bio: "Specializes in organic SEO ranking, performance ad campaigns on Google & Meta, conversion funnel automation, and growth marketing for digital brands.",
    coursesTaught: [
      "Digital Marketing & Growth Track",
    ],
    rating: 4.8,
  },
  {
    id: "siddharth-v",
    name: "Siddharth V.",
    role: "Enterprise Java & .NET Backend Architect",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Siddharth",
    skills: ["Java 17", "Spring Boot", "C#", ".NET 8", "Microservices", "SQL"],
    bio: "Specializes in enterprise backend architecture, Java Spring Boot microservices, .NET 8 Web APIs, Hibernate ORM, and high-concurrency database design.",
    coursesTaught: [
      "Java & Spring Boot Full-Stack",
      ".NET & C# Enterprise Engineering",
    ],
    rating: 4.9,
  },
];

export function getInstructorsForCourse(courseTitle: string): Instructor[] {
  const matched = INSTRUCTORS.filter((inst) =>
    inst.coursesTaught.some(
      (c) => c.toLowerCase() === courseTitle.toLowerCase() || courseTitle.toLowerCase().includes(c.toLowerCase()) || c.toLowerCase().includes(courseTitle.toLowerCase())
    )
  );

  if (matched.length > 0) return matched;
  // Default fallbacks if no specific match
  return [INSTRUCTORS[0], INSTRUCTORS[1], INSTRUCTORS[2]];
}
