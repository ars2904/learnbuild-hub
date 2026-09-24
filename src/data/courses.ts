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

  /* ================= 8 ADVANCED TECH & LANGUAGE TRACKS ================= */
  {
    id: "7",
    slug: "php-laravel-mastery",
    title: "PHP & Laravel Mastery",
    tagline: "Build robust dynamic web applications with Modern PHP 8+, Object-Oriented Architecture, MySQL, and Laravel framework.",
    category: "Web Engineering",
    duration: "8 Weeks • Hands-on Projects",
    level: "Beginner to Advanced",
    mode: "Live Mentorship & Project Track",
    rating: 4.9,
    studentsEnrolled: 580,
    image: "https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?q=80&w=800&auto=format&fit=crop",
    shortDescription: "Build robust dynamic web applications with Modern PHP 8+, Object-Oriented Architecture, MySQL, and Laravel framework.",
    overview:
      "Master Modern PHP 8+ and Laravel 11 framework from scratch. Learn object-oriented programming, MVC architecture, RESTful API development, Eloquent ORM, authentication, and build real-world production web portals.",
    whatYouWillLearn: [
      "Modern PHP 8+ Syntax, OOP Concepts & MVC Architecture",
      "Laravel Framework Routing, Blade Templates & Middleware",
      "Eloquent ORM, Database Migrations & Seeders",
      "RESTful API Development & Middleware Authentication",
      "E-Commerce Payment Gateway & Admin Dashboard",
      "Server Deployment & MySQL Performance Tuning",
    ],
    curriculum: [
      {
        moduleNumber: "Module 01",
        title: "Modern PHP 8+ Foundations & Object-Oriented Programming",
        topics: [
          "PHP 8 Syntax, Data Types & Functions",
          "Classes, Objects, Interfaces & Inheritance",
          "Namespaces, Composer & Autoloading",
        ],
      },
      {
        moduleNumber: "Module 02",
        title: "Laravel Framework Core & Database Architecture",
        topics: [
          "Routing, Blade Engine & Controller Architecture",
          "Database Schema Migrations & Eloquent ORM",
          "Form Validation, Session & Authentication Systems",
        ],
      },
      {
        moduleNumber: "Module 03",
        title: "REST APIs, E-Commerce & Production Capstone",
        topics: [
          "Building RESTful APIs with Laravel Sanctum",
          "Payment Gateway Integration (Razorpay / Stripe)",
          "Deploying Laravel Applications on Apache / Nginx VPS",
        ],
      },
    ],
    eligibility: [
      "Students and developers wanting to master back-end PHP development and Laravel framework",
    ],
    careerOptions: [
      "Laravel Developer",
      "PHP Web Backend Developer",
      "Full-Stack PHP/Laravel Engineer",
    ],
    prerequisites: "Basic HTML/CSS and fundamental programming logic.",
  },
  {
    id: "8",
    slug: "dotnet-csharp-enterprise-engineering",
    title: ".NET & C# Enterprise Engineering",
    tagline: "Enterprise software development using C#, .NET 8 Web API, Entity Framework Core, SQL Server, and Microservice Architecture.",
    category: "Web Engineering",
    duration: "10 Weeks • Enterprise Track",
    level: "Intermediate",
    mode: "Live Mentorship & Industry Projects",
    rating: 4.9,
    studentsEnrolled: 490,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
    shortDescription: "Enterprise software development using C#, .NET 8 Web API, Entity Framework Core, SQL Server, and Microservice Architecture.",
    overview:
      "Engineered for backend developers who want to master C# and Microsoft .NET 8. Learn object-oriented design, ASP.NET Core Web APIs, Entity Framework Core ORM, LINQ data queries, SQL Server administration, and enterprise microservices.",
    whatYouWillLearn: [
      "C# Language Fundamentals & Object-Oriented Design Patterns",
      "ASP.NET Core Web API & Dependency Injection Container",
      "Entity Framework Core, Migrations & LINQ Queries",
      "SQL Server Schema Modeling & Stored Procedures",
      "JWT Authentication & Role-Based Access Control (RBAC)",
      "Production Enterprise Management System Capstone",
    ],
    curriculum: [
      {
        moduleNumber: "Module 01",
        title: "C# 12 Language Core & Object-Oriented Architecture",
        topics: [
          "C# Type System, Generics & Delegates",
          "OOP Principles: Encapsulation, Polymorphism & Abstraction",
          "Asynchronous Programming with Async / Await",
        ],
      },
      {
        moduleNumber: "Module 02",
        title: "ASP.NET Core Web API & Entity Framework Core",
        topics: [
          "RESTful Controller Architecture & Middleware Pipeline",
          "EF Core Code-First Migrations & Repository Pattern",
          "LINQ Data Queries & SQL Server Integration",
        ],
      },
      {
        moduleNumber: "Module 03",
        title: "Microservices & Enterprise Deployment",
        topics: [
          "JWT Security, CORS & Swagger Documentation",
          "Microservice Messaging & Docker Containerization",
          "Deploying .NET Applications to Azure / Windows Server",
        ],
      },
    ],
    eligibility: [
      "CS/IT Students, Software Engineers, and Enterprise Developers seeking .NET certification & mastery",
    ],
    careerOptions: [
      ".NET Software Engineer",
      "C# Backend Developer",
      "Enterprise Application Architect",
    ],
    prerequisites: "Basic familiarity with object-oriented programming concepts.",
  },
  {
    id: "9",
    slug: "java-spring-boot-fullstack",
    title: "Java & Spring Boot Full-Stack",
    tagline: "Master Java programming, Object-Oriented Design, Spring Boot microservices, Hibernate ORM, and RESTful web service architecture.",
    category: "Web Engineering",
    duration: "10 Weeks • Hands-on Projects",
    level: "Beginner to Advanced",
    mode: "Live Mentorship & Enterprise Track",
    rating: 4.9,
    studentsEnrolled: 1120,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
    shortDescription: "Master Java programming, Object-Oriented Design, Spring Boot microservices, Hibernate ORM, and RESTful web service architecture.",
    overview:
      "Java powers enterprise backend systems worldwide. Master Java 17+, Object-Oriented Design, Spring Boot 3, Spring Data JPA, Hibernate ORM, Maven/Gradle build tools, Spring Security, and build enterprise-grade microservice backends.",
    whatYouWillLearn: [
      "Java 17+ Modern Syntax & Collections Framework",
      "Spring Boot Microservices & Spring Security Architecture",
      "Hibernate ORM, JPA & MySQL/PostgreSQL Integrations",
      "RESTful API Engineering & Postman API Testing",
      "Maven Build Automation & JUnit/Mockito Unit Testing",
      "Enterprise Banking or SaaS API Capstone",
    ],
    curriculum: [
      {
        moduleNumber: "Module 01",
        title: "Java 17 Core & Object-Oriented Programming",
        topics: [
          "Java Collections Framework, Lambdas & Streams",
          "OOP Design Patterns & Exception Handling",
          "Multithreading & Concurrency Basics",
        ],
      },
      {
        moduleNumber: "Module 02",
        title: "Spring Boot 3 Architecture & Spring Data JPA",
        topics: [
          "Dependency Injection & Spring Beans Management",
          "REST Controllers & Request Handling",
          "Spring Data JPA, Repositories & Database Persistence",
        ],
      },
      {
        moduleNumber: "Module 03",
        title: "Spring Security, Microservices & Capstone",
        topics: [
          "JWT Authentication & Authorization Security",
          "Microservice Communication & API Gateways",
          "Building & Deploying Banking / Enterprise SaaS Backends",
        ],
      },
    ],
    eligibility: [
      "Students pursuing B.Tech / BCA / MCA / B.Sc CS or software developers building enterprise Java careers",
    ],
    careerOptions: [
      "Java Backend Engineer",
      "Spring Boot Developer",
      "Full-Stack Java Software Architect",
    ],
    prerequisites: "Basic programming logic in any language.",
  },
  {
    id: "10",
    slug: "python-fullstack-automation",
    title: "Python Full-Stack & Automation",
    tagline: "Master Python from foundations to building APIs with Django / FastAPI, web scraping, and database management.",
    category: "Web Engineering",
    duration: "8 Weeks • Hands-on Projects",
    level: "Beginner to Advanced",
    mode: "Live Mentorship & Practical Projects",
    rating: 4.9,
    studentsEnrolled: 1450,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    shortDescription: "Master Python from foundations to building APIs with Django / FastAPI, web scraping, and database management.",
    overview:
      "Python is one of the most versatile languages in technology. In this track, master Python 3.12 syntax, build backend APIs using FastAPI and Django, manipulate relational databases, create automated web scrapers with BeautifulSoup and Selenium, and deploy Python applications.",
    whatYouWillLearn: [
      "Python 3.12 Core Syntax, Data Structures & Modules",
      "Django & FastAPI Backend Web Development",
      "PostgreSQL Integration & ORM Queries",
      "Automated Web Scrapers & Data Extraction Tools",
      "RESTful API Engineering & Async Endpoint Handling",
      "Automated Web Scrapers & Dynamic Web Portal Capstone",
    ],
    curriculum: [
      {
        moduleNumber: "Module 01",
        title: "Python 3.12 Fundamentals & OOP Architecture",
        topics: [
          "Python Syntax, Functions & Data Structures",
          "Object-Oriented Programming & File Handling",
          "Virtual Environments & Package Management (pip)",
        ],
      },
      {
        moduleNumber: "Module 02",
        title: "FastAPI & Django Backend Web Development",
        topics: [
          "Building High-Speed Async APIs with FastAPI",
          "Django ORM, Admin Panel & Template Engine",
          "Database Schemas & PostgreSQL Integrations",
        ],
      },
      {
        moduleNumber: "Module 03",
        title: "Web Scraping, Automation & Cloud Deployment",
        topics: [
          "Web Scraping with BeautifulSoup & Playwright",
          "Automating Business Processes & Scheduled Tasks",
          "Deploying Python Microservices on AWS / Render",
        ],
      },
    ],
    eligibility: [
      "Beginners, CS/IT students, automation enthusiasts, and developers seeking Python mastery",
    ],
    careerOptions: [
      "Python Developer",
      "Backend Django / FastAPI Developer",
      "Automation & Web Scraping Engineer",
    ],
    prerequisites: "No prior coding experience required; starts from absolute basics.",
  },
  {
    id: "11",
    slug: "nodejs-react-modern-stack",
    title: "Node.js & React Modern Stack",
    tagline: "Build ultra-fast single-page and full-stack applications with React 18, TypeScript, Express, and MongoDB / PostgreSQL.",
    category: "Web Engineering",
    duration: "8 Weeks • Hands-on Projects",
    level: "Beginner to Advanced",
    mode: "Live Mentorship & Project Track",
    rating: 4.9,
    studentsEnrolled: 1320,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
    shortDescription: "Build ultra-fast single-page and full-stack applications with React 18, TypeScript, Express, and MongoDB / PostgreSQL.",
    overview:
      "Master the JavaScript / TypeScript ecosystem for full-stack web applications. Learn React 18 frontend architecture, Node.js event loops, Express server APIs, MongoDB / PostgreSQL database management, WebSockets for real-time features, and build modern web applications.",
    whatYouWillLearn: [
      "React Components, Hooks & State Management Patterns",
      "Node.js Runtime & Express Server Development",
      "REST & GraphQL APIs, JWT Auth & WebSockets",
      "Database Integration with MongoDB (Mongoose) & PostgreSQL",
      "TypeScript Static Typing for Full-Stack Applications",
      "Real-Time SaaS Collaboration Portal Capstone",
    ],
    curriculum: [
      {
        moduleNumber: "Module 01",
        title: "React 18 & Component Architecture",
        topics: [
          "JSX, Props, State & Event Handling",
          "Custom Hooks & Context API State Management",
          "Integrating Axios & TanStack Query APIs",
        ],
      },
      {
        moduleNumber: "Module 02",
        title: "Node.js & Express API Engineering",
        topics: [
          "Node.js Event Loop & Module Architecture",
          "Express Router, Controllers & Middleware",
          "MongoDB & Mongoose Schema Design",
        ],
      },
      {
        moduleNumber: "Module 03",
        title: "Real-Time Features & Full-Stack Capstone",
        topics: [
          "Real-Time WebSockets with Socket.io",
          "JWT Security & Password Hashing",
          "Deploying React + Node Full-Stack Apps to Vercel / Render",
        ],
      },
    ],
    eligibility: [
      "Students & web developers wanting to build modern full-stack JavaScript / TypeScript applications",
    ],
    careerOptions: [
      "React Developer",
      "Node.js Backend Engineer",
      "Full-Stack MERN / PERN Developer",
    ],
    prerequisites: "Familiarity with HTML, CSS, and basic JavaScript.",
  },
  {
    id: "12",
    slug: "wordpress-custom-development",
    title: "WordPress Custom Development",
    tagline: "Master custom WordPress theme development, plugin development, WooCommerce customization, and headless CMS integrations.",
    category: "Web Engineering",
    duration: "6 Weeks • Practical Projects",
    level: "Beginner to Advanced",
    mode: "Live Mentorship & Freelance Track",
    rating: 4.8,
    studentsEnrolled: 530,
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=800&auto=format&fit=crop",
    shortDescription: "Master custom WordPress theme development, plugin development, WooCommerce customization, and headless CMS integrations.",
    overview:
      "WordPress powers over 40% of the world's websites. Learn professional custom WordPress engineering beyond simple page builders. Master PHP theme programming, custom plugin creation, Gutenberg block building, WooCommerce e-commerce development, and REST API integrations.",
    whatYouWillLearn: [
      "Custom PHP Theme & Child Theme Development",
      "Custom Plugin Hooks, Actions & Filters",
      "WooCommerce E-Commerce Store Engineering",
      "Custom Post Types, Taxonomies & ACF Metadata",
      "WordPress REST API & Headless CMS Integrations",
      "Page Speed Optimization & Security Hardening",
    ],
    curriculum: [
      {
        moduleNumber: "Module 01",
        title: "WordPress Architecture & Custom Theme Development",
        topics: [
          "WordPress File Hierarchy & Template Tags",
          "Building Custom Themes from Scratch with PHP & HTML/CSS",
          "Custom Post Types, Fields (ACF) & Taxonomies",
        ],
      },
      {
        moduleNumber: "Module 02",
        title: "Custom Plugin Development & Hooks API",
        topics: [
          "Plugin File Structure & Lifecycle",
          "Mastering Action & Filter Hooks",
          "Creating Custom Shortcodes & Admin Settings Pages",
        ],
      },
      {
        moduleNumber: "Module 03",
        title: "WooCommerce & Headless WordPress REST API",
        topics: [
          "Customizing WooCommerce Checkout & Product Templates",
          "WordPress REST API Endpoints",
          "Performance Optimization, Security & Hosting Deployment",
        ],
      },
    ],
    eligibility: [
      "Freelancers, agencies, and web developers wanting to build high-ticket custom WordPress sites",
    ],
    careerOptions: [
      "WordPress Developer",
      "WooCommerce Specialist",
      "PHP/CMS Web Engineer",
    ],
    prerequisites: "Basic understanding of HTML, CSS, and basic PHP or JS.",
  },
  {
    id: "13",
    slug: "sql-relational-databases",
    title: "SQL & Relational Databases",
    tagline: "Master relational database design, complex SQL queries, index optimization, stored procedures, and PostgreSQL / MySQL administration.",
    category: "AI & Data",
    duration: "6 Weeks • Hands-on Labs",
    level: "Beginner to Advanced",
    mode: "Live Interactive & Projects",
    rating: 4.9,
    studentsEnrolled: 890,
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=800&auto=format&fit=crop",
    shortDescription: "Master relational database design, complex SQL queries, index optimization, stored procedures, and PostgreSQL / MySQL administration.",
    overview:
      "Databases are the foundational core of every software system. Learn relational schema normalization, write advanced SQL queries, master JOINs, window functions, CTEs, index optimization, stored procedures, and PostgreSQL / MySQL database administration.",
    whatYouWillLearn: [
      "Relational Schema Normalization & Entity Relationship Modeling",
      "Complex SQL Joins, Aggregations, Window Functions & Subqueries",
      "Indexing, Performance Query Tuning & Execution Plans",
      "Stored Procedures, Triggers & Database Transactions (ACID)",
      "PostgreSQL & MySQL Administration & Backup Strategies",
      "Real-world Database Architecture Capstone",
    ],
    curriculum: [
      {
        moduleNumber: "Module 01",
        title: "Database Modeling & Foundational SQL",
        topics: [
          "Relational Database Concepts & ER Diagrams",
          "DDL & DML SQL Syntax (CREATE, INSERT, UPDATE, DELETE)",
          "Data Filtering, Sorting & Aggregations (GROUP BY, HAVING)",
        ],
      },
      {
        moduleNumber: "Module 02",
        title: "Advanced SQL Queries & Window Functions",
        topics: [
          "INNER, LEFT, RIGHT & FULL OUTER Joins",
          "Subqueries, Common Table Expressions (CTEs)",
          "SQL Window Functions (ROW_NUMBER, RANK, DENSE_RANK)",
        ],
      },
      {
        moduleNumber: "Module 03",
        title: "Database Performance & Stored Procedures",
        topics: [
          "Indexes, B-Trees & Query Optimization",
          "ACID Transactions & Lock Management",
          "Stored Procedures, Triggers & Real-world Capstone",
        ],
      },
    ],
    eligibility: [
      "Data analysts, software engineers, backend developers, and CS students wanting strong database skills",
    ],
    careerOptions: [
      "Database Administrator (DBA)",
      "SQL Data Analyst",
      "Database Engineer",
    ],
    prerequisites: "No prior experience required; starts with fundamental concepts.",
  },
  {
    id: "14",
    slug: "custom-tech-track",
    title: "Your Choice / Custom Tech Track",
    tagline: "Design a customized curriculum tailored specifically to your project requirements, tech stack preference, or career goals.",
    category: "Web Engineering",
    duration: "Custom Duration • 1-on-1 Mentorship",
    level: "Beginner to Advanced",
    mode: "1-on-1 Tailored Mentorship",
    rating: 5.0,
    studentsEnrolled: 340,
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
    shortDescription: "Design a customized curriculum tailored specifically to your project requirements, tech stack preference, or career goals.",
    overview:
      "Need a specialized tech stack, targeted framework, or customized project guidance? Our Custom Tech Track allows you to co-design your learning path directly with senior engineering mentors based on your exact requirements and goals.",
    whatYouWillLearn: [
      "1-on-1 Tech Mentorship & Tailored Curriculum Design",
      "Flexible Choice of Languages, Tools & Frameworks",
      "Custom Live Project & Dedicated Code Reviews",
      "Personalized Career & Portfolio Guidance",
      "Direct Assistance on Personal or Client Projects",
    ],
    curriculum: [
      {
        moduleNumber: "Module 01",
        title: "Requirement Scoping & Customized Roadmap",
        topics: [
          "1-on-1 Goal Scoping & Skill Assessment",
          "Selecting Languages, Frameworks & Tech Stack",
          "Defining Tailored Project Deliverables",
        ],
      },
      {
        moduleNumber: "Module 02",
        title: "Targeted Hands-on Engineering & Mentorship",
        topics: [
          "Live Code Reviews & Pair Programming",
          "Building Custom Features & Architecture",
          "Best Practices & Security Hardening",
        ],
      },
      {
        moduleNumber: "Module 03",
        title: "Project Delivery & Deployment Mentorship",
        topics: [
          "Testing, Debugging & Performance Optimization",
          "Live Production Deployment",
          "Career & Freelance Strategy Session",
        ],
      },
    ],
    eligibility: [
      "Anyone looking for a personalized, 1-on-1 tailored learning track or specialized stack mentorship",
    ],
    careerOptions: [
      "Custom Technology Specialist",
      "Full-Stack Solution Engineer",
    ],
    prerequisites: "Tailored based on your chosen track.",
  },
];
