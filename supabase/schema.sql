-- ==========================================
-- LEARNBUILD HUB SUPABASE SCHEMA & SEED DATA
-- ==========================================

-- 1. COURSES TABLE
CREATE TABLE IF NOT EXISTS public.courses (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  tagline TEXT NOT NULL,
  category TEXT NOT NULL,
  duration TEXT NOT NULL,
  level TEXT NOT NULL,
  mode TEXT NOT NULL,
  rating NUMERIC(3,2) DEFAULT 4.9,
  students_enrolled INT DEFAULT 500,
  image TEXT NOT NULL,
  short_description TEXT NOT NULL,
  overview TEXT NOT NULL,
  what_you_will_learn JSONB DEFAULT '[]'::jsonb,
  curriculum JSONB DEFAULT '[]'::jsonb,
  eligibility JSONB DEFAULT '[]'::jsonb,
  career_options JSONB DEFAULT '[]'::jsonb,
  prerequisites TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. INSTRUCTORS TABLE
CREATE TABLE IF NOT EXISTS public.instructors (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  gender TEXT DEFAULT 'male',
  avatar TEXT NOT NULL,
  skills JSONB DEFAULT '[]'::jsonb,
  bio TEXT NOT NULL,
  courses_taught JSONB DEFAULT '[]'::jsonb,
  rating NUMERIC(3,2) DEFAULT 4.9,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. READY-MADE BUILD SOLUTIONS TABLE
CREATE TABLE IF NOT EXISTS public.solutions (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  tech_stack JSONB DEFAULT '[]'::jsonb,
  features JSONB DEFAULT '[]'::jsonb,
  price_range TEXT NOT NULL,
  deliverables JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. ENROLLMENT LEADS TABLE
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  course_title TEXT NOT NULL,
  instructor_name TEXT DEFAULT 'Any Available Senior Mentor',
  qualification TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. DEMO REQUEST LEADS TABLE
CREATE TABLE IF NOT EXISTS public.demo_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  solution_title TEXT NOT NULL,
  company_name TEXT,
  project_requirements TEXT,
  budget_range TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. CONTACT FORM SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. BLOG POSTS & ARTICLES TABLE
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Engineering',
  author_name TEXT NOT NULL DEFAULT 'LearnBuild Hub Tech Team',
  author_avatar TEXT,
  cover_image TEXT,
  read_time TEXT DEFAULT '5 min read',
  external_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. EMPLOYEES & EXPERTS TABLE
CREATE TABLE IF NOT EXISTS public.employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  designation TEXT NOT NULL,
  department TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'expert',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public Read Courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Public Read Instructors" ON public.instructors FOR SELECT USING (true);
CREATE POLICY "Public Read Solutions" ON public.solutions FOR SELECT USING (true);
CREATE POLICY "Public Read Blogs" ON public.blogs FOR SELECT USING (true);

-- Public Insert Policies for Leads & Forms
CREATE POLICY "Public Submit Enrollments" ON public.enrollments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Submit Demo Requests" ON public.demo_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Submit Contact Form" ON public.contact_submissions FOR INSERT WITH CHECK (true);

-- ==========================================
-- SEED DATA
-- ==========================================

-- Seed Instructors
INSERT INTO public.instructors (id, name, role, gender, avatar, skills, bio, courses_taught, rating)
VALUES
(
  'saurabh-upadhyay',
  'Saurabh Upadhyay',
  '.NET / Cloud & Backend Instructor',
  'male',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
  '[".NET / .NET Core", "C#", "Azure", "Python", "SQL / MS SQL Server", "Backend Development", "REST APIs", "GenAI Integration"]'::jsonb,
  'Specializes in enterprise .NET Core backend engineering, Microsoft Azure cloud architecture, SQL Server optimization, REST API systems, and Generative AI / LLM integrations.',
  '[".NET & C# Enterprise Engineering", "Cloud Computing & DevOps Track", "AI & Machine Learning Engineering Track", "Python Full-Stack & Automation", "SQL & Relational Databases", "Java & Spring Boot Full-Stack"]'::jsonb,
  4.9
),
(
  'manisha-singh',
  'Manisha Singh',
  'Digital Marketing & Graphics Design Instructor',
  'female',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
  '["Digital Marketing", "SEO", "Graphics Designing", "Project Management", "Team Leadership", "Brand Strategy"]'::jsonb,
  'Specializes in organic SEO ranking, performance digital marketing, creative graphics designing, project management, and team leadership for scaling digital brands.',
  '["Digital Marketing & Growth Track", "Your Choice / Custom Tech Track"]'::jsonb,
  4.9
),
(
  'saurabh-srivastava',
  'Saurabh Srivastava',
  'Software Development & Technology Instructor',
  'male',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
  '["HTML & CSS", "PHP & CodeIgniter", "MySQL & SQL", "WordPress", ".NET / C#", "Python", "Selenium QA", "ServiceNow & Jira", "AI Automation & Azure"]'::jsonb,
  'Specializes in full-stack web software engineering, PHP & CodeIgniter frameworks, WordPress customization, automated QA testing with Selenium, ServiceNow, Jira administration, and AI automation.',
  '["Full-Stack Web Engineering Track", "PHP & Laravel Mastery", "WordPress Custom Development", "Python Full-Stack & Automation", "Mobile Application Engineering Track", "Data Science & Business Analytics Track", "Node.js & React Modern Stack"]'::jsonb,
  4.9
),
(
  'rahul-s',
  'Rahul S.',
  'Python & Backend Instructor',
  'male',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop',
  '["Python", "Django", "SQL", "React", "Node.js"]'::jsonb,
  'Specializes in Python backend systems, Django REST framework, database query tuning, and modern web application development.',
  '["Full-Stack Web Engineering Track", "Python Full-Stack & Automation", "Node.js & React Modern Stack"]'::jsonb,
  4.9
),
(
  'priya-k',
  'Priya K.',
  'Python & Data Science Instructor',
  'female',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
  '["Python", "Data Analysis", "Machine Learning", "SQL", "Data Visualization"]'::jsonb,
  'Specializes in Python programming, data analysis, and machine learning. Focuses on practical, project-based learning to help students build real-world skills and grow in their careers.',
  '["AI & Machine Learning Engineering Track", "Data Science & Business Analytics Track", "Python Programming", "Data Analysis with Python", "Machine Learning Basics"]'::jsonb,
  4.9
),
(
  'amit-r',
  'Amit R.',
  'Python & Automation Specialist',
  'male',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
  '["Python", "Scripting", "Automation", "React Native", "Redux"]'::jsonb,
  'Specializes in Python web scraping, shell scripting automation, cross-platform app dev, and CI/CD pipeline automation.',
  '["Mobile Application Engineering Track", "Python Full-Stack & Automation"]'::jsonb,
  4.8
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  avatar = EXCLUDED.avatar,
  skills = EXCLUDED.skills,
  bio = EXCLUDED.bio,
  courses_taught = EXCLUDED.courses_taught;

-- Seed Sample Courses
INSERT INTO public.courses (
  id, slug, title, tagline, category, duration, level, mode, rating, students_enrolled, image, short_description, overview, what_you_will_learn, curriculum, eligibility, career_options, prerequisites
)
VALUES
(
  '1',
  'full-stack-web-engineering',
  'Full-Stack Web Engineering Track',
  'Master modern web engineering from front-end UI design to scalable server APIs.',
  'Web Engineering',
  '10 Weeks • Hands-on Projects',
  'Beginner to Advanced',
  'Live Mentorship & Internship Track',
  4.9,
  840,
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
  'Build enterprise SaaS applications using React 18, Next.js 14, Node.js, and PostgreSQL. Includes 1-on-1 code reviews and industry internship capstone.',
  'The Full-Stack Web Engineering Track is designed for students and developers aiming to master full-stack software development. You will work on real industry projects, master modern front-end frameworks, build robust REST and GraphQL APIs, and gain hands-on internship experience.',
  '["Frontend Architecture with React 18 & Next.js 14 App Router", "Server-side API Engineering with Node.js & Express", "Relational Database Design with PostgreSQL & Prisma ORM", "Authentication, Authorization & JWT Token Management", "Docker Containerization & AWS/Vercel Cloud Deployment", "Automated Testing, CI/CD Pipelines & Production Monitoring"]'::jsonb,
  '[{"moduleNumber": "Module 01", "title": "Frontend Foundations & Modern CSS Architecture", "topics": ["HTML5 Semantic Layouts & Accessibility", "Tailwind CSS Grid & Flexbox Mastery", "Responsive Mobile-First UI Engineering"]}, {"moduleNumber": "Module 02", "title": "Advanced JavaScript ES6+ & TypeScript Essentials", "topics": ["Async/Await, Promises & Event Loop", "TypeScript Types, Interfaces & Generics", "DOM Manipulation & Modular Architecture"]}, {"moduleNumber": "Module 03", "title": "React 18 & Next.js 14 Production Architecture", "topics": ["Server Components & Client Components", "State Management & React Query", "Next.js App Router & Server Actions"]}, {"moduleNumber": "Module 04", "title": "Backend API Engineering & Database Systems", "topics": ["Node.js Server Setup & Middleware", "RESTful & GraphQL API Design", "PostgreSQL Relational Schemas & Indexing"]}, {"moduleNumber": "Module 05", "title": "Capstone Project & Internship Track", "topics": ["Full-Stack SaaS Platform Development", "Git Collaboration & Pull Request Workflows", "Production Cloud Deployment & Monitoring"]}]'::jsonb,
  '["Undergraduate B.Tech, BCA, B.Sc students", "Working professionals pivoting to Software Engineering", "Self-taught coders looking for structured live mentorship"]'::jsonb,
  '["Full-Stack Web Developer", "Frontend React Engineer", "Backend Node.js Engineer", "Software Development Engineer (SDE-1)"]'::jsonb,
  'Basic understanding of programming logic is helpful. Open to motivated beginners.'
),
(
  '6',
  'digital-marketing-growth-track',
  'Digital Marketing & Growth Track',
  'Master SEO, Social Media Marketing, PPC Ads, Content Strategy, and Analytics.',
  'Digital Marketing',
  '6 Weeks • Hands-on Projects',
  'Beginner to Advanced',
  'Live Mentorship & Practical Campaigns',
  4.8,
  610,
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
  'Learn to build high-converting marketing funnels, run Google & Meta ads, optimize SEO ranking, and drive organic business growth.',
  'The Digital Marketing & Growth Track equips you with high-demand marketing skills required by modern businesses and tech startups. Master organic search engine optimization (SEO), performance marketing on Google & Meta, social media branding, content strategy, and conversion rate analytics.',
  '["Search Engine Optimization (SEO) & Technical On-Page/Off-Page Strategies", "Google Ads (PPC, Search, Display, Video Campaigns)", "Meta Ads (Facebook & Instagram Ad Strategy, Targeting & Conversion Retargeting)", "Social Media Marketing & Brand Content Strategy", "Email Marketing & Funnel Automation Systems", "Google Analytics 4 (GA4) & Conversion Rate Optimization (CRO)"]'::jsonb,
  '[{"moduleNumber": "Module 01", "title": "SEO Foundations & Technical Optimization", "topics": ["Keyword Research & Intent Mapping", "On-Page SEO, Metadata & Schema Markup", "Technical Audit & Backlink Link Building Strategies"]}, {"moduleNumber": "Module 02", "title": "Performance Marketing: Google & Meta Ads", "topics": ["Google Search, Display & YouTube Ad Campaigns", "Meta Ads Manager, Audience Targeting & Retargeting Funnels", "Ad Copywriting, Creative Testing & Budget Scaling"]}, {"moduleNumber": "Module 03", "title": "Brand Strategy, Analytics & Funnel Automation", "topics": ["Content Marketing & Social Media Brand Building", "Google Analytics 4 Setup, Tracking & Attribution Models", "Email Marketing Automation & Lead Conversion Funnels"]}]'::jsonb,
  '["Students, graduates, entrepreneurs, freelancers, and marketing enthusiasts looking for practical growth skills"]'::jsonb,
  '["Digital Marketing Specialist", "SEO Strategist", "PPC / Performance Marketing Lead", "Growth Marketer"]'::jsonb,
  'No coding background needed. Open to all backgrounds.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  tagline = EXCLUDED.tagline,
  category = EXCLUDED.category,
  image = EXCLUDED.image,
  overview = EXCLUDED.overview,
  what_you_will_learn = EXCLUDED.what_you_will_learn,
  curriculum = EXCLUDED.curriculum;
