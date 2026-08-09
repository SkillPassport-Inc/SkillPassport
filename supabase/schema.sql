-- ====================================================================
-- SkillPassport Supabase Database Schema & RLS Policies
-- Execute this file in your Supabase SQL Editor:
-- https://app.supabase.com/project/_/sql
-- ====================================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Linked with Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    title TEXT DEFAULT 'Software Engineer',
    role TEXT DEFAULT 'developer' CHECK (role IN ('developer', 'recruiter', 'admin')),
    bio TEXT,
    avatar_url TEXT,
    github_username TEXT,
    leetcode_username TEXT,
    gitlab_username TEXT,
    stackoverflow_id TEXT,
    overall_score INT DEFAULT 0,
    subscription_plan TEXT DEFAULT 'Free',
    subscription_status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Core',
    score INT NOT NULL DEFAULT 75 CHECK (score BETWEEN 0 AND 100),
    verified BOOLEAN DEFAULT TRUE,
    projects_count INT DEFAULT 1,
    commits_count INT DEFAULT 50,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. REPOSITORIES TABLE
CREATE TABLE IF NOT EXISTS public.repositories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    primary_language TEXT NOT NULL DEFAULT 'JavaScript',
    language_color TEXT DEFAULT '#F7DF1E',
    overall_score INT DEFAULT 85 CHECK (overall_score BETWEEN 0 AND 100),
    architecture_rating TEXT DEFAULT 'A',
    security_rating TEXT DEFAULT 'A',
    testing_percentage TEXT DEFAULT '90%',
    docs_rating TEXT DEFAULT 'A',
    performance_rating TEXT DEFAULT 'A',
    stars_count INT DEFAULT 0,
    forks_count INT DEFAULT 0,
    repo_url TEXT,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. CERTIFICATIONS TABLE (.webp storage supported)
CREATE TABLE IF NOT EXISTS public.certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_date TEXT DEFAULT '2026',
    credential_id TEXT NOT NULL,
    certificate_image_url TEXT, -- Base64 Data URI or WebP storage URL
    file_size_kb INT DEFAULT 45, -- Compressed WebP size in KB
    verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. JOBS TABLE (Posted by Recruiters)
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recruiter_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT DEFAULT 'Remote',
    salary_range TEXT DEFAULT '₹18L – ₹24L',
    required_skills TEXT[] DEFAULT '{}',
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. SUBSCRIPTIONS & RAZORPAY TRANSACTIONS
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    plan_name TEXT NOT NULL,
    amount_inr NUMERIC NOT NULL,
    payment_id TEXT UNIQUE NOT NULL,
    order_id TEXT,
    status TEXT DEFAULT 'success',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. ACTIVITIES AUDIT LOG
CREATE TABLE IF NOT EXISTS public.activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    icon TEXT DEFAULT '✓',
    text TEXT NOT NULL,
    color TEXT DEFAULT 'var(--sp-success)',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.repositories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- Public Profiles Policy (Anyone can view public profiles)
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Skills Policies
CREATE POLICY "Skills viewable by everyone" 
ON public.skills FOR SELECT USING (true);

CREATE POLICY "Users can insert their own skills" 
ON public.skills FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own skills" 
ON public.skills FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own skills" 
ON public.skills FOR DELETE USING (auth.uid() = user_id);

-- Jobs Policies (Everyone views, recruiters manage)
CREATE POLICY "Jobs viewable by everyone" 
ON public.jobs FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create jobs" 
ON public.jobs FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- ====================================================================
-- AUTOMATIC PROFILE CREATION TRIGGER ON SIGNUP
-- ====================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (
        new.id, 
        new.email, 
        COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
        COALESCE(new.raw_user_meta_data->>'role', 'developer')
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger definition
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
