-- ============================================================
-- LEARNBUILD HUB - COMPLETE SUPABASE DATABASE SETUP & SCHEMA
-- Copy and run this script in your Supabase SQL Editor
-- (Supabase Dashboard -> SQL Editor -> New Query -> Paste & Run)
-- ============================================================

-- 1. WORKSHOPS TABLE
CREATE TABLE IF NOT EXISTS public.workshops (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    tagline TEXT,
    description TEXT,
    category TEXT DEFAULT 'Engineering',
    event_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
    duration TEXT DEFAULT '2 Hours',
    mode TEXT DEFAULT 'Live Online Masterclass',
    price NUMERIC DEFAULT 0,
    speaker_name TEXT DEFAULT 'Saurabh Upadhyay',
    speaker_role TEXT DEFAULT 'Senior Software Architect',
    speaker_avatar TEXT,
    cover_image TEXT,
    agenda JSONB DEFAULT '[]'::jsonb,
    what_you_will_learn JSONB DEFAULT '[]'::jsonb,
    status TEXT DEFAULT 'upcoming',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Seed initial workshop into Supabase if empty
INSERT INTO public.workshops (
    slug, title, tagline, description, category, event_date, duration, mode, price,
    speaker_name, speaker_role, speaker_avatar, cover_image, agenda, what_you_will_learn, status
)
SELECT 
    'generative-ai-llm-agent-workshop',
    'Building Production Generative AI & Autonomous LLM Agents',
    'Hands-on Live Masterclass on RAG, LangChain & Vector Databases',
    'Join Senior AI Engineers to build and deploy production-ready LLM agents, vector database search systems, and custom RAG microservices in Python.',
    'Artificial Intelligence',
    '2026-10-18T14:00:00Z',
    '2.5 Hours • Live Interactive',
    'Live Online Masterclass',
    0,
    'Saurabh Upadhyay',
    'Senior AI & Cloud Solutions Architect',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80',
    '["Architecture of Generative AI Systems & Transformer Models", "Building Custom Retrieval Augmented Generation (RAG) with Pinecone & LangChain", "Developing Autonomous AI Agents with Tool Calling Capabilities", "Deploying AI API Microservices on AWS & Vercel Edge"]'::jsonb,
    '["How to build production LLM agents using Python & LangChain", "Vector Indexing & Embedding Search with Qdrant / Pinecone", "Deploying & Monitoring AI Services with FastAPI & Docker"]'::jsonb,
    'upcoming'
WHERE NOT EXISTS (SELECT 1 FROM public.workshops WHERE slug = 'generative-ai-llm-agent-workshop');


-- 2. WORKSHOP REGISTRATIONS TABLE
CREATE TABLE IF NOT EXISTS public.workshop_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workshop_id TEXT,
    workshop_title TEXT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    qualification TEXT,
    status TEXT DEFAULT 'confirmed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);


-- 3. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hero_title TEXT,
    hero_subtitle TEXT,
    announcement_banner TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    whatsapp_phone TEXT,
    students_trained_count TEXT,
    placement_rate TEXT,
    projects_delivered_count TEXT,
    satisfaction_rate TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);


-- 4. BLOGS TABLE
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    category TEXT DEFAULT 'Engineering',
    author_name TEXT DEFAULT 'LearnBuild Hub Tech Team',
    author_avatar TEXT,
    cover_image TEXT,
    read_time TEXT DEFAULT '5 min read',
    external_url TEXT,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    featured BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);


-- 5. COURSES TABLE
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT DEFAULT 'Web Engineering',
    description TEXT,
    price NUMERIC DEFAULT 0,
    original_price NUMERIC DEFAULT 0,
    duration TEXT DEFAULT '12 Weeks',
    badge TEXT DEFAULT 'Popular',
    rating NUMERIC DEFAULT 4.9,
    students_count INT DEFAULT 1000,
    image TEXT,
    instructor_name TEXT DEFAULT 'Senior Engineer',
    syllabus JSONB DEFAULT '[]'::jsonb,
    skills JSONB DEFAULT '[]'::jsonb,
    featured BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);


-- 6. SOLUTIONS TABLE
CREATE TABLE IF NOT EXISTS public.solutions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT DEFAULT 'Software Suite',
    tag TEXT DEFAULT 'Enterprise Grade',
    description TEXT,
    image TEXT,
    demo_url TEXT DEFAULT '/admin/demos',
    price_estimate TEXT DEFAULT '₹1,49,000',
    features JSONB DEFAULT '[]'::jsonb,
    tech_stack JSONB DEFAULT '[]'::jsonb,
    featured BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);


-- 7. INSTRUCTORS TABLE
CREATE TABLE IF NOT EXISTS public.instructors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT DEFAULT 'Architect & Mentor',
    bio TEXT,
    avatar TEXT,
    expertise JSONB DEFAULT '[]'::jsonb,
    experience_years INT DEFAULT 5,
    rating NUMERIC DEFAULT 4.9,
    students_count INT DEFAULT 500,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);


-- 8. ENROLLMENTS TABLE
CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    course_title TEXT NOT NULL,
    instructor_name TEXT,
    qualification TEXT,
    message TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);


-- 9. CLIENTS TABLE (CRM LEADS)
CREATE TABLE IF NOT EXISTS public.clients (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    company TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    status TEXT DEFAULT 'lead',
    service_interested TEXT,
    contract_value NUMERIC DEFAULT 0,
    assigned_employee_name TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);


-- 10. DEMO REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.demo_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    solution_title TEXT NOT NULL,
    company_name TEXT,
    project_requirements TEXT,
    budget_range TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);


-- 11. CONTACT SUBMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);


-- 12. INTERNSHIP APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.internship_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    track TEXT NOT NULL,
    experience TEXT,
    duration TEXT,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);


-- ENABLE ROW LEVEL SECURITY (RLS) FOR ALL TABLES
ALTER TABLE public.workshops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workshop_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.internship_applications ENABLE ROW LEVEL SECURITY;


-- GRANT FULL ACCESS POLICIES FOR PUBLIC & SERVICE ROLE APIS
DO $$
DECLARE
    tbl text;
BEGIN
    FOR tbl IN SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' LOOP
        EXECUTE format('DROP POLICY IF EXISTS "Allow all access" ON public.%I', tbl);
        EXECUTE format('CREATE POLICY "Allow all access" ON public.%I FOR ALL USING (true) WITH CHECK (true)', tbl);
    END LOOP;
END $$;
