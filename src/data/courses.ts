export interface CourseModule {
  moduleNumber: string;
  title: string;
  topics: string[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: "Digital Marketing" | "Web Engineering" | "AI & Data" | "Mobile Dev" | "Cloud & DevOps";
  duration: string;
  level: "Beginner to Advanced" | "Intermediate" | "Advanced";
  mode: string;
  rating: number;
  studentsEnrolled: number;
  image: string;
  shortDescription: string;
  overview: string;
  whatYouWillLearn: string[];
  curriculum: CourseModule[];
  eligibility: string[];
  careerOptions: string[];
  prerequisites: string;
}

export const sampleCourses: Course[] = [
  {
    id: "6",
    slug: "digital-marketing-growth-track",
    title: "Digital Marketing & Growth Track",
    tagline: "Master SEO, Social Media Marketing, PPC Ads, Content Strategy, and Analytics.",
    category: "Digital Marketing",
    duration: "6 Weeks • Hands-on Projects",
    level: "Beginner to Advanced",
    mode: "Live Mentorship & Practical Campaigns",
    rating: 4.8,
    studentsEnrolled: 610,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    shortDescription: "Learn to build high-converting marketing funnels, run Google & Meta ads, optimize SEO ranking, and drive organic business growth.",
    overview:
      "The Digital Marketing & Growth Track equips you with high-demand marketing skills required by modern businesses and tech startups. Master organic search engine optimization (SEO), performance marketing on Google & Meta, social media branding, content strategy, and conversion rate analytics.",
    whatYouWillLearn: [
      "Search Engine Optimization (SEO) & Technical On-Page/Off-Page Strategies",
      "Google Ads (PPC, Search, Display, Video Campaigns)",
      "Meta Ads (Facebook & Instagram Ad Strategy, Targeting & Conversion Retargeting)",
      "Social Media Marketing & Brand Content Strategy",
      "Email Marketing & Funnel Automation Systems",
      "Google Analytics 4 (GA4) & Conversion Rate Optimization (CRO)",
    ],
    curriculum: [
      {
        moduleNumber: "Module 01",
        title: "SEO Foundations & Technical Optimization",
        topics: [
          "Keyword Research & Intent Mapping",
          "On-Page SEO, Metadata & Schema Markup",
          "Technical Audit & Backlink Link Building Strategies",
        ],
      },
      {
        moduleNumber: "Module 02",
        title: "Performance Marketing: Google & Meta Ads",
        topics: [
          "Google Search, Display & YouTube Ad Campaigns",
          "Meta Ads Manager, Audience Targeting & Retargeting Funnels",
          "Ad Copywriting, Creative Testing & Budget Scaling",
        ],
      },
      {
        moduleNumber: "Module 03",
        title: "Brand Strategy, Analytics & Funnel Automation",
        topics: [
          "Content Marketing & Social Media Brand Building",
          "Google Analytics 4 Setup, Tracking & Attribution Models",
          "Email Marketing Automation & Lead Conversion Funnels",
        ],
      },
    ],
    eligibility: [
      "Students, graduates, entrepreneurs, freelancers, and marketing enthusiasts looking for practical growth skills",
    ],
    careerOptions: [
      "Digital Marketing Specialist",
      "SEO Strategist",
      "PPC / Performance Marketing Lead",
      "Growth Marketer",
    ],
    prerequisites: "No coding background needed. Open to all backgrounds.",
  },
  {
    id: "1",
    slug: "full-stack-web-engineering",
    title: "Full-Stack Web Engineering Track",
    tagline: "Master modern web engineering from front-end UI design to scalable server APIs.",
    category: "Web Engineering",
    duration: "10 Weeks • Hands-on Projects",
    level: "Beginner to Advanced",
    mode: "Live Mentorship & Internship Track",
    rating: 4.9,
    studentsEnrolled: 1250,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    shortDescription: "Build production-grade web applications using React, Next.js 14, TypeScript, Node.js, and PostgreSQL.",
    overview:
      "The Full-Stack Web Engineering Track is designed to take you from foundational web technologies to deploying production-grade SaaS applications. You will work on real industry projects, master modern front-end frameworks, build robust REST and GraphQL APIs, and gain hands-on internship experience.",
    whatYouWillLearn: [
      "Modern HTML5, CSS3, Tailwind CSS, and Responsive Layout Engineering",
      "JavaScript ES6+, TypeScript, and Component Architecture",
      "React 18 & Next.js 14 App Router with Server Side Rendering",
      "Node.js, Express, REST APIs, and Authentication Systems",
      "PostgreSQL, Prisma ORM, and Database Modeling",
      "Deployment Pipelines on Vercel, Docker, and CI/CD Workflows",
    ],
    curriculum: [
      {
        moduleNumber: "Module 01",
        title: "Frontend Foundations & Modern CSS Architecture",
        topics: [
          "HTML5 Semantic Layouts & Accessibility",
          "Tailwind CSS Grid & Flexbox Mastery",
          "Responsive Mobile-First UI Engineering",
        ],
      },
      {
        moduleNumber: "Module 02",
        title: "Advanced JavaScript ES6+ & TypeScript Essentials",
        topics: [
          "Asynchronous JS, Promises & Async/Await",
          "DOM State Management & Event Delegation",
          "TypeScript Static Typing & Generics",
        ],
      },
      {
        moduleNumber: "Module 03",
        title: "React 18 & Next.js 14 Production Architecture",
        topics: [
          "React Hooks, Context API & State Patterns",
          "Next.js App Router, Server Components & Route Handlers",
          "Performance Optimization & SEO",
        ],
      },
      {
        moduleNumber: "Module 04",
        title: "Backend API Engineering & Databases",
        topics: [
          "Node.js & Express RESTful Server Architecture",
          "PostgreSQL Relational Schema Design & Prisma ORM",
          "JWT Authentication & Middleware Security",
        ],
      },
      {
        moduleNumber: "Module 05",
        title: "Capstone Project & Internship Experience",
        topics: [
          "Building & Deploying Full-Stack SaaS Product",
          "CI/CD Workflows, Vercel & Cloud Hosting",
          "Portfolio Review & Career Mentorship",
        ],
      },
    ],
    eligibility: [
      "Students pursuing B.E / B.Tech / BCA / MCA / B.Sc CS or equivalent degrees",
      "Working professionals seeking to switch careers into Full-Stack Web Engineering",
      "Enthusiasts with basic programming familiarity seeking structured hands-on guidance",
    ],
    careerOptions: [
      "Full-Stack Web Developer",
      "Frontend React Engineer",
      "Backend Node.js Developer",
      "Web Application Engineer",
    ],
    prerequisites: "Basic understanding of computer fundamentals and desire to learn programming.",
  },
  {
    id: "2",
    slug: "ai-machine-learning-track",
    title: "AI & Machine Learning Engineering Track",
    tagline: "Build intelligent AI models, Neural Networks, and LLM-powered applications.",
    category: "AI & Data",
    duration: "12 Weeks • Practical Internship",
    level: "Intermediate",
    mode: "Live Interactive & Mentorship",
    rating: 4.9,
    studentsEnrolled: 980,
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=800&auto=format&fit=crop",
    shortDescription: "Master Python, Data Analytics, Supervised & Unsupervised Learning, Computer Vision, and AI LLM integrations.",
    overview:
      "This track provides a comprehensive, hands-on path into Machine Learning and Artificial Intelligence. You will engineer intelligent predictive algorithms, work with deep learning frameworks like TensorFlow and PyTorch, and build real AI applications integrated with modern LLM APIs.",
    whatYouWillLearn: [
      "Python Data Science Stack: NumPy, Pandas, Matplotlib, Seaborn",
      "Supervised & Unsupervised Machine Learning Algorithms",
      "Model Evaluation, Feature Engineering & Hyperparameter Tuning",
      "Neural Networks & Deep Learning with PyTorch",
      "Natural Language Processing (NLP) & LLM API Integrations",
      "Deploying Machine Learning Models via FastAPI & Cloud APIs",
    ],
    curriculum: [
      {
        moduleNumber: "Module 01",
        title: "Python for Data Science & Exploratory Data Analysis",
        topics: [
          "Advanced Python Structures & Scientific Computing",
          "Data Cleaning & Transformation with Pandas",
          "Exploratory Data Analysis & Statistical Insights",
        ],
      },
      {
        moduleNumber: "Module 02",
        title: "Classical Machine Learning Algorithms",
        topics: [
          "Regression, Classification & Decision Trees",
          "Ensemble Methods: Random Forests & XGBoost",
          "Clustering & Principal Component Analysis",
        ],
      },
      {
        moduleNumber: "Module 03",
        title: "Deep Learning & Computer Vision",
        topics: [
          "Artificial Neural Networks (ANN) Architecture",
          "Convolutional Neural Networks (CNN) for Image Recognition",
          "PyTorch Model Training & Transfer Learning",
        ],
      },
      {
        moduleNumber: "Module 04",
        title: "Generative AI, LLMs & AI Application Deployment",
        topics: [
          "Natural Language Processing & Transformer Models",
          "Building RAG Systems & Vector Database Search",
          "Deploying ML Microservices via FastAPI",
        ],
      },
    ],
    eligibility: [
      "Students and graduates in Computer Science, Engineering, Mathematics, or Data Analytics",
      "Professionals aiming to transition into Artificial Intelligence & Data Science roles",
    ],
    careerOptions: [
      "AI / Machine Learning Engineer",
      "Data Scientist",
      "Computer Vision Developer",
      "NLP Engineer",
    ],
    prerequisites: "Basic knowledge of Python or any object-oriented programming language.",
  },
  {
    id: "3",
    slug: "data-science-analytics",
    title: "Data Science & Business Analytics Track",
    tagline: "Turn complex data into actionable business strategies with SQL, Python, and Tableau.",
    category: "AI & Data",
    duration: "8 Weeks • Hands-on Analytics",
    level: "Beginner to Advanced",
    mode: "Live Interactive & Projects",
    rating: 4.8,
    studentsEnrolled: 850,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    shortDescription: "Master SQL queries, Data Visualization, Predictive Analytics, and Dashboard Reporting for business decision making.",
    overview:
      "Data-driven decision-making is at the heart of every modern technology company. In this track, you will learn to extract data with SQL, analyze trends using Python, and design interactive BI dashboards that empower business stakeholders.",
    whatYouWillLearn: [
      "Advanced Relational Database Queries & SQL Joins",
      "Python Data Wrangler Stack: Pandas & Scientific Data Analysis",
      "Interactive Dashboard Creation with Tableau & Power BI",
      "Statistical Hypothesis Testing & A/B Testing",
      "Predictive Analytics & Forecasting Models",
    ],
    curriculum: [
      {
        moduleNumber: "Module 01",
        title: "SQL & Relational Data Analytics",
        topics: [
          "Database Schemas & Complex SQL Queries",
          "Aggregations, Window Functions & Subqueries",
          "Data Cleaning & Normalization",
        ],
      },
      {
        moduleNumber: "Module 02",
        title: "Python Data Analysis & Statistical Modeling",
        topics: [
          "Descriptive & Inferential Statistics",
          "Data Visualization with Seaborn & Plotly",
          "Predictive Regression Models for Business",
        ],
      },
      {
        moduleNumber: "Module 03",
        title: "Business Intelligence & Dashboard Engineering",
        topics: [
          "Power BI / Tableau Interactive Dashboard Design",
          "KPI Tracking & Executive Reporting",
          "Capstone Business Analytics Project",
        ],
      },
    ],
    eligibility: [
      "Any graduate or student interested in data analysis, statistics, and business intelligence",
    ],
    careerOptions: [
      "Data Analyst",
      "Business Intelligence Engineer",
      "Data Operations Specialist",
    ],
    prerequisites: "No prior coding background required; starts with fundamental concepts.",
  },
  {
    id: "4",
    slug: "mobile-application-engineering",
    title: "Mobile Application Engineering Track",
    tagline: "Develop cross-platform mobile apps for iOS and Android using React Native & Flutter.",
    category: "Mobile Dev",
    duration: "8 Weeks • App Store Ready",
    level: "Beginner to Advanced",
    mode: "Live Mentorship & Internship",
    rating: 4.9,
    studentsEnrolled: 720,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
    shortDescription: "Build mobile user interfaces, native device integrations, state management, and publish apps to iOS App Store & Google Play.",
    overview:
      "Mobile apps power daily global digital interactions. Learn to build high-performance mobile applications using React Native and TypeScript, connect to backend cloud services, utilize mobile sensors, and package applications for store publication.",
    whatYouWillLearn: [
      "Cross-Platform Mobile Architecture with React Native",
      "Mobile Component Styling & Native Gestures",
      "Mobile Navigation, State Management & Redux Toolkit",
      "REST API Integration & Async Local Storage",
      "Camera, Location, and Native Push Notifications",
      "App Packaging, Signing & Store Deployment",
    ],
    curriculum: [
      {
        moduleNumber: "Module 01",
        title: "React Native & Mobile UI Architecture",
        topics: [
          "Mobile Component Lifecycle & Styling",
          "Flexbox Mobile Layout Design",
          "Handling Touch Events & Animations",
        ],
      },
      {
        moduleNumber: "Module 02",
        title: "State Management & API Integration",
        topics: [
          "React Navigation Router",
          "Context API & Redux Toolkit for Mobile Apps",
          "Connecting to Backend Server APIs",
        ],
      },
      {
        moduleNumber: "Module 03",
        title: "Native Device Features & App Store Launch",
        topics: [
          "Camera, GPS Location & Storage Integration",
          "Firebase Push Notifications & Analytics",
          "Building APK / IPA and App Store Submission",
        ],
      },
    ],
    eligibility: [
      "Students & developers wanting to build native iOS & Android applications",
    ],
    careerOptions: [
      "Mobile App Developer",
      "React Native Engineer",
      "Cross-Platform Application Developer",
    ],
    prerequisites: "Basic familiarity with JavaScript or React fundamentals.",
  },
  {
    id: "5",
    slug: "cloud-computing-devops",
    title: "Cloud Computing & DevOps Track",
    tagline: "Architect scalable cloud infrastructure on AWS, Azure, Docker, and Kubernetes.",
    category: "Cloud & DevOps",
    duration: "10 Weeks • Cloud Certified Path",
    level: "Intermediate",
    mode: "Live Mentorship & Labs",
    rating: 4.9,
    studentsEnrolled: 640,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    shortDescription: "Learn AWS Cloud Architecture, Linux Administration, Docker Containerization, CI/CD Automation Pipelines, and Infrastructure as Code.",
    overview:
      "DevOps and Cloud Engineers power modern software reliability. Master cloud architecture on Amazon Web Services (AWS), automate application deployments with Jenkins and GitHub Actions, containerize applications with Docker, and manage orchestrations with Kubernetes.",
    whatYouWillLearn: [
      "AWS Cloud Fundamentals: EC2, S3, VPC, IAM, RDS & Lambda",
      "Linux System Administration & Shell Scripting",
      "Containerization with Docker & Multi-Container Compose",
      "Container Orchestration with Kubernetes & Helm",
      "CI/CD Pipeline Automation with GitHub Actions",
      "Infrastructure as Code (IaC) with Terraform",
    ],
    curriculum: [
      {
        moduleNumber: "Module 01",
        title: "AWS Cloud Infrastructure Fundamentals",
        topics: [
          "Virtual Private Cloud (VPC) & Security Groups",
          "EC2 Instances & S3 Storage Architecture",
          "IAM Access Controls & Relational Databases (RDS)",
        ],
      },
      {
        moduleNumber: "Module 02",
        title: "Docker Containerization & CI/CD Pipelines",
        topics: [
          "Dockerfile Optimization & Image Layers",
          "Docker Compose Microservices Stack",
          "GitHub Actions Automated Testing & Deployments",
        ],
      },
      {
        moduleNumber: "Module 03",
        title: "Kubernetes Orchestration & Infrastructure as Code",
        topics: [
          "Kubernetes Pods, Deployments & Services",
          "Terraform Infrastructure Provisioning",
          "Monitoring with Prometheus & Grafana",
        ],
      },
    ],
    eligibility: [
      "CS/IT Students, System Administrators, and Software Engineers aiming for Cloud roles",
    ],
    careerOptions: [
      "DevOps Engineer",
      "Cloud Infrastructure Architect",
      "Site Reliability Engineer (SRE)",
    ],
    prerequisites: "Basic Linux terminal commands and networking concepts.",
  },
];
