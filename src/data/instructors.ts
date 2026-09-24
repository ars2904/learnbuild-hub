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
    id: "saurabh-upadhyay",
    name: "Saurabh Upadhyay",
    role: ".NET / Cloud & Backend Instructor",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=SaurabhUpadhyay",
    skills: [
      ".NET / .NET Core",
      "C#",
      "Azure",
      "Python",
      "SQL / MS SQL Server",
      "Backend Development",
      "REST APIs",
      "GenAI / AI Integration"
    ],
    bio: "Specializes in enterprise .NET Core backend engineering, Microsoft Azure cloud architecture, SQL Server optimization, REST API systems, and Generative AI / LLM integrations.",
    coursesTaught: [
      ".NET & C# Enterprise Engineering",
      "Cloud Computing & DevOps Track",
      "AI & Machine Learning Engineering Track",
      "Python Full-Stack & Automation",
      "SQL & Relational Databases",
      "Java & Spring Boot Full-Stack",
    ],
    rating: 4.9,
  },
  {
    id: "manisha-singh",
    name: "Manisha Singh",
    role: "Digital Marketing & Graphics Design Instructor",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Manisha",
    skills: [
      "Digital Marketing",
      "SEO",
      "Graphics Designing",
      "Project Management",
      "Team Leadership",
      "Brand Strategy"
    ],
    bio: "Specializes in organic SEO ranking, performance digital marketing, creative graphics designing, project management, and team leadership for scaling digital brands.",
    coursesTaught: [
      "Digital Marketing & Growth Track",
      "Your Choice / Custom Tech Track",
    ],
    rating: 4.9,
  },
  {
    id: "saurabh-srivastava",
    name: "Saurabh Srivastava",
    role: "Software Development & Technology Instructor",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=SaurabhSrivastava",
    skills: [
      "HTML & CSS",
      "PHP & CodeIgniter",
      "MySQL & SQL",
      "WordPress",
      ".NET / C#",
      "Python",
      "Selenium QA",
      "ServiceNow & Jira",
      "AI Automation & Azure"
    ],
    bio: "Specializes in full-stack web software engineering, PHP & CodeIgniter frameworks, WordPress customization, automated QA testing with Selenium, ServiceNow, Jira administration, and AI automation.",
    coursesTaught: [
      "Full-Stack Web Engineering Track",
      "PHP & Laravel Mastery",
      "WordPress Custom Development",
      "Python Full-Stack & Automation",
      "Mobile Application Engineering Track",
      "Data Science & Business Analytics Track",
      "Node.js & React Modern Stack",
    ],
    rating: 4.9,
  },
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
  // Default fallbacks if no specific match - prioritize our main instructors
  return [INSTRUCTORS[0], INSTRUCTORS[1], INSTRUCTORS[2]];
}
