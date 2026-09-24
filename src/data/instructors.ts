export interface Instructor {
  id: string;
  name: string;
  role: string;
  avatar: string;
  gender: "male" | "female";
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
    gender: "male",
    avatar: "https://api.dicebear.com/7.x/open-peeps/svg?seed=SaurabhUpadhyay",
    skills: [
      ".NET / .NET Core",
      "C#",
      "Azure",
      "Python",
      "SQL / MS SQL Server",
      "Backend Development",
      "REST APIs",
      "GenAI Integration"
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
    gender: "female",
    avatar: "https://api.dicebear.com/7.x/open-peeps/svg?seed=ManishaSingh",
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
    gender: "male",
    avatar: "https://api.dicebear.com/7.x/open-peeps/svg?seed=SaurabhSrivastava",
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
    role: "Python & Backend Instructor",
    gender: "male",
    avatar: "https://api.dicebear.com/7.x/open-peeps/svg?seed=RahulS",
    skills: ["Python", "Django", "SQL", "React", "Node.js"],
    bio: "Specializes in Python backend systems, Django REST framework, database query tuning, and modern web application development.",
    coursesTaught: [
      "Full-Stack Web Engineering Track",
      "Python Full-Stack & Automation",
      "Node.js & React Modern Stack",
    ],
    rating: 4.9,
  },
  {
    id: "priya-k",
    name: "Priya K.",
    role: "Python & Data Science Instructor",
    gender: "female",
    avatar: "https://api.dicebear.com/7.x/open-peeps/svg?seed=PriyaK",
    skills: ["Python", "Data Analysis", "Machine Learning", "SQL", "Data Visualization"],
    bio: "Specializes in Python programming, data analysis, and machine learning. Focuses on practical, project-based learning to help students build real-world skills and grow in their careers.",
    coursesTaught: [
      "AI & Machine Learning Engineering Track",
      "Data Science & Business Analytics Track",
      "Python Programming",
      "Data Analysis with Python",
      "Machine Learning Basics",
    ],
    rating: 4.9,
  },
  {
    id: "amit-r",
    name: "Amit R.",
    role: "Python & Automation Specialist",
    gender: "male",
    avatar: "https://api.dicebear.com/7.x/open-peeps/svg?seed=AmitR",
    skills: ["Python", "Scripting", "Automation", "React Native", "Redux"],
    bio: "Specializes in Python web scraping, shell scripting automation, cross-platform app dev, and CI/CD pipeline automation.",
    coursesTaught: [
      "Mobile Application Engineering Track",
      "Python Full-Stack & Automation",
    ],
    rating: 4.8,
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
