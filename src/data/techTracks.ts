export interface TechTrack {
  id: string;
  title: string;
  badge: string;
  description: string;
  deliverables: string[];
  options: ("Live" | "Recorded")[];
  capstone: boolean;
  interviewPrep: boolean;
  iconName: string;
}

export const TECH_TRACKS: TechTrack[] = [
  {
    id: "php",
    title: "PHP & Laravel Mastery",
    badge: "Web Core",
    description: "Build robust dynamic web applications with Modern PHP 8+, Object-Oriented Architecture, MySQL, and Laravel framework.",
    deliverables: [
      "Modern PHP 8+ OOP Concepts & MVC Pattern",
      "Laravel Framework, Blade Engine & Eloquent ORM",
      "RESTful APIs, Session Management & Authentication",
      "Real-world E-Commerce or Portal Capstone Project",
    ],
    options: ["Live", "Recorded"],
    capstone: true,
    interviewPrep: true,
    iconName: "Code2",
  },
  {
    id: "dotnet",
    title: ".NET & C# Enterprise Engineering",
    badge: "Enterprise",
    description: "Enterprise software development using C#, .NET 8 Web API, Entity Framework Core, SQL Server, and Microservice Architecture.",
    deliverables: [
      "C# Language Fundamentals & Object-Oriented Design",
      "ASP.NET Core Web API & Dependency Injection",
      "Entity Framework Core, Migrations & LINQ Queries",
      "Production Enterprise Management System Capstone",
    ],
    options: ["Live", "Recorded"],
    capstone: true,
    interviewPrep: true,
    iconName: "Cpu",
  },
  {
    id: "java",
    title: "Java & Spring Boot Full-Stack",
    badge: "Enterprise Core",
    description: "Master Java programming, Object-Oriented Design, Spring Boot microservices, Hibernate ORM, and RESTful web service architecture.",
    deliverables: [
      "Java 17+ Modern Syntax & Collections Framework",
      "Spring Boot Microservices & Spring Security",
      "Hibernate ORM, JPA & MySQL/PostgreSQL Integrations",
      "Enterprise Banking or SaaS API Capstone",
    ],
    options: ["Live", "Recorded"],
    capstone: true,
    interviewPrep: true,
    iconName: "Coffee",
  },
  {
    id: "python",
    title: "Python Full-Stack & Automation",
    badge: "High Demand",
    description: "Master Python from foundations to building APIs with Django / FastAPI, web scraping, and database management.",
    deliverables: [
      "Python 3.12 Core Syntax, Data Structures & Modules",
      "Django & FastAPI Backend Development",
      "PostgreSQL Integration & ORM Queries",
      "Automated Web Scrapers & Dynamic Web Portal Capstone",
    ],
    options: ["Live", "Recorded"],
    capstone: true,
    interviewPrep: true,
    iconName: "Terminal",
  },
  {
    id: "nodejs-react",
    title: "Node.js & React Modern Stack",
    badge: "Most Popular",
    description: "Build ultra-fast single-page and full-stack applications with React 18, TypeScript, Express, and MongoDB / PostgreSQL.",
    deliverables: [
      "React Components, Hooks & State Management",
      "Node.js Runtime & Express Server Development",
      "REST & GraphQL APIs, JWT Auth & WebSockets",
      "Real-Time SaaS Collaboration Portal Capstone",
    ],
    options: ["Live", "Recorded"],
    capstone: true,
    interviewPrep: true,
    iconName: "Layers",
  },
  {
    id: "wordpress",
    title: "WordPress Custom Development",
    badge: "CMS & Freelance",
    description: "Master custom WordPress theme development, plugin development, WooCommerce customization, and headless CMS integrations.",
    deliverables: [
      "Custom PHP Theme & Child Theme Development",
      "Custom Plugin Hooks, Actions & Filters",
      "WooCommerce E-Commerce Store Engineering",
      "Page Speed Optimization & Security Hardening",
    ],
    options: ["Live", "Recorded"],
    capstone: true,
    interviewPrep: true,
    iconName: "Globe",
  },
  {
    id: "sql-databases",
    title: "SQL & Relational Databases",
    badge: "Data Core",
    description: "Master relational database design, complex SQL queries, index optimization, stored procedures, and PostgreSQL / MySQL administration.",
    deliverables: [
      "Relational Schema Normalization & Entity Relationship Modeling",
      "Complex SQL Joins, Aggregations, Window Functions & Subqueries",
      "Indexing, Performance Query Tuning & Stored Procedures",
      "Real-world Database Architecture Capstone",
    ],
    options: ["Live", "Recorded"],
    capstone: true,
    interviewPrep: true,
    iconName: "Database",
  },
  {
    id: "custom-track",
    title: "Your Choice / Custom Tech Track",
    badge: "Tailored",
    description: "Design a customized curriculum tailored specifically to your project requirements, tech stack preference, or career goals.",
    deliverables: [
      "1-on-1 Tech Mentorship & Tailored Curriculum",
      "Flexible Choice of Languages, Tools & Frameworks",
      "Custom Live Project & Dedicated Code Reviews",
      "Personalized Career & Portfolio Guidance",
    ],
    options: ["Live"],
    capstone: true,
    interviewPrep: true,
    iconName: "Sliders",
  },
];
