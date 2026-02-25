-- ============================================================================
-- RAGDOL Real Estate Platform - Complete Supabase Schema
-- Migration: Initial Schema
-- Date: 2026-02-24
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- ENUMS
-- ============================================================================

CREATE TYPE user_role AS ENUM ('customer', 'agent', 'admin');
CREATE TYPE property_status AS ENUM ('sale', 'rent', 'buy', 'sold', 'rented', 'draft', 'archived');
CREATE TYPE property_type AS ENUM ('apartment', 'villa', 'townhouse', 'penthouse', 'studio', 'duplex', 'land', 'commercial', 'office', 'warehouse', 'retail', 'hotel_apartment');
CREATE TYPE furnishing_type AS ENUM ('furnished', 'semi-furnished', 'unfurnished');
CREATE TYPE enquiry_status AS ENUM ('new', 'contacted', 'viewing', 'negotiating', 'closed', 'lost');
CREATE TYPE enquiry_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE application_status AS ENUM ('pending', 'under_review', 'approved', 'rejected', 'completed', 'cancelled');
CREATE TYPE application_type AS ENUM ('buy', 'rent', 'mortgage', 'investment', 'agent_application');
CREATE TYPE valuation_status AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');
CREATE TYPE notification_type AS ENUM ('info', 'success', 'warning', 'error', 'enquiry', 'property', 'system');
CREATE TYPE post_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE project_status AS ENUM ('upcoming', 'under_construction', 'ready', 'completed', 'sold_out');
CREATE TYPE download_status AS ENUM ('new', 'contacted', 'converted', 'not_interested');
CREATE TYPE question_status AS ENUM ('pending', 'answered', 'closed');
CREATE TYPE seo_link_status AS ENUM ('active', 'broken', 'removed');
CREATE TYPE system_health_status AS ENUM ('healthy', 'degraded', 'down');
CREATE TYPE log_level AS ENUM ('info', 'warning', 'error', 'critical');

-- ============================================================================
-- 1. PROFILES TABLE (extends auth.users)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  role user_role NOT NULL DEFAULT 'customer',
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE,
  preferences JSONB DEFAULT '{}',
  social_links JSONB DEFAULT '{}',
  last_login TIMESTAMPTZ,
  login_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 2. ADMIN CREDENTIALS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.admin_credentials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 3. DEVELOPERS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.developers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  website TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  founded_year INTEGER,
  total_projects INTEGER DEFAULT 0,
  active_projects INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT FALSE,
  social_links JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 4. CATEGORIES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  icon TEXT,
  color TEXT,
  parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 5. AGENTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT,
  office TEXT,
  license_no TEXT,
  brokerage TEXT,
  bio TEXT,
  areas TEXT[] DEFAULT '{}',
  location TEXT,
  whatsapp TEXT,
  telegram TEXT,
  instagram_handle TEXT,
  linkedin_url TEXT,
  website_url TEXT,
  social JSONB DEFAULT '{}',
  profile_image TEXT,
  profile_images TEXT[] DEFAULT '{}',
  languages TEXT[] DEFAULT '{}',
  specializations TEXT[] DEFAULT '{}',
  certifications TEXT[] DEFAULT '{}',
  experience_years INTEGER DEFAULT 0,
  total_sales NUMERIC DEFAULT 0,
  commission_rate NUMERIC(5,2),
  rating NUMERIC(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  approved BOOLEAN DEFAULT FALSE,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_agents_user_id ON public.agents(user_id);
CREATE INDEX idx_agents_approved ON public.agents(approved);
CREATE INDEX idx_agents_verified ON public.agents(verified);
CREATE INDEX idx_agents_areas ON public.agents USING GIN(areas);

-- ============================================================================
-- 6. PROJECTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  developer_id UUID REFERENCES public.developers(id) ON DELETE SET NULL,
  status project_status DEFAULT 'upcoming',
  address TEXT,
  area TEXT,
  district TEXT,
  city TEXT DEFAULT 'Dubai',
  coords JSONB,
  hero_image_url TEXT,
  images TEXT[] DEFAULT '{}',
  video_url TEXT,
  brochure_url TEXT,
  property_types TEXT[] DEFAULT '{}',
  amenities TEXT[] DEFAULT '{}',
  facilities TEXT[] DEFAULT '{}',
  total_units INTEGER,
  available_units INTEGER,
  sold_units INTEGER DEFAULT 0,
  starting_price NUMERIC,
  min_price NUMERIC,
  max_price NUMERIC,
  currency TEXT DEFAULT 'AED',
  payment_plan TEXT,
  payment_terms JSONB DEFAULT '{}',
  launch_date DATE,
  completion_date DATE,
  handover_date DATE,
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT TRUE,
  views_count INTEGER DEFAULT 0,
  inquiries_count INTEGER DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_projects_developer_id ON public.projects(developer_id);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_projects_featured ON public.projects(featured) WHERE featured = TRUE;
CREATE INDEX idx_projects_slug ON public.projects(slug);

-- ============================================================================
-- 7. PROPERTIES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  short_description TEXT,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  price_per_sqft NUMERIC,
  currency TEXT DEFAULT 'AED',
  type property_type DEFAULT 'apartment',
  status property_status DEFAULT 'sale',
  property_status TEXT DEFAULT 'available',
  furnishing furnishing_type,
  beds INTEGER DEFAULT 0,
  baths INTEGER DEFAULT 0,
  sqft NUMERIC DEFAULT 0,
  built_up_area NUMERIC,
  plot_size NUMERIC,
  floor_number INTEGER,
  total_floors INTEGER,
  parking_spaces INTEGER DEFAULT 0,
  year_built INTEGER,
  address TEXT,
  area TEXT,
  district TEXT,
  city TEXT DEFAULT 'Dubai',
  neighborhood TEXT,
  landmark TEXT,
  location TEXT,
  coords JSONB,
  image_url TEXT,
  images TEXT[] DEFAULT '{}',
  floorplans TEXT[] DEFAULT '{}',
  video_url TEXT,
  virtual_tour_url TEXT,
  amenities TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  agent_id UUID REFERENCES public.agents(id) ON DELETE SET NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  developer_id UUID REFERENCES public.developers(id) ON DELETE SET NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  featured BOOLEAN DEFAULT FALSE,
  premium BOOLEAN DEFAULT FALSE,
  urgent BOOLEAN DEFAULT FALSE,
  verified BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT TRUE,
  favorites_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  inquiries_count INTEGER DEFAULT 0,
  last_viewed TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  meta_data JSONB DEFAULT '{}',
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_properties_agent_id ON public.properties(agent_id);
CREATE INDEX idx_properties_status ON public.properties(status);
CREATE INDEX idx_properties_type ON public.properties(type);
CREATE INDEX idx_properties_price ON public.properties(price);
CREATE INDEX idx_properties_featured ON public.properties(featured) WHERE featured = TRUE;
CREATE INDEX idx_properties_published ON public.properties(published) WHERE published = TRUE;
CREATE INDEX idx_properties_slug ON public.properties(slug);
CREATE INDEX idx_properties_area ON public.properties(area);
CREATE INDEX idx_properties_city ON public.properties(city);
CREATE INDEX idx_properties_beds ON public.properties(beds);
CREATE INDEX idx_properties_created_at ON public.properties(created_at DESC);
CREATE INDEX idx_properties_amenities ON public.properties USING GIN(amenities);

-- ============================================================================
-- 8. ENQUIRIES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  agent_id UUID REFERENCES public.agents(id) ON DELETE SET NULL,
  assigned_to UUID REFERENCES public.agents(id) ON DELETE SET NULL,
  property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  source TEXT DEFAULT 'website',
  status enquiry_status DEFAULT 'new',
  priority enquiry_priority DEFAULT 'medium',
  tags TEXT[] DEFAULT '{}',
  notes TEXT,
  nationality TEXT,
  occupation TEXT,
  employer TEXT,
  monthly_income NUMERIC,
  residency_status TEXT,
  financing_needed BOOLEAN DEFAULT FALSE,
  mortgage_preferred BOOLEAN DEFAULT FALSE,
  financing_amount NUMERIC,
  down_payment NUMERIC,
  budget_min NUMERIC,
  budget_max NUMERIC,
  timeline TEXT,
  property_requirements JSONB DEFAULT '{}',
  contact_count INTEGER DEFAULT 0,
  last_contacted TIMESTAMPTZ,
  follow_up_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_enquiries_user_id ON public.enquiries(user_id);
CREATE INDEX idx_enquiries_agent_id ON public.enquiries(agent_id);
CREATE INDEX idx_enquiries_property_id ON public.enquiries(property_id);
CREATE INDEX idx_enquiries_status ON public.enquiries(status);
CREATE INDEX idx_enquiries_created_at ON public.enquiries(created_at DESC);

-- ============================================================================
-- 9. ENQUIRY ACTIVITIES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.enquiry_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  enquiry_id UUID REFERENCES public.enquiries(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES public.agents(id) ON DELETE SET NULL,
  activity_type TEXT NOT NULL,
  description TEXT,
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_enquiry_activities_enquiry_id ON public.enquiry_activities(enquiry_id);

-- ============================================================================
-- 10. ENQUIRY MESSAGES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.enquiry_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  enquiry_id UUID REFERENCES public.enquiries(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('customer', 'agent', 'admin')),
  message TEXT NOT NULL,
  message_type TEXT DEFAULT 'text',
  attachments TEXT[] DEFAULT '{}',
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_enquiry_messages_enquiry_id ON public.enquiry_messages(enquiry_id);

-- ============================================================================
-- 11. INQUIRIES TABLE (simple contact form inquiries)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID REFERENCES public.agents(id) ON DELETE SET NULL,
  property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,
  message TEXT NOT NULL,
  agent_reply TEXT,
  replied_at TIMESTAMPTZ,
  status TEXT DEFAULT 'new',
  priority TEXT DEFAULT 'medium',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_inquiries_agent_id ON public.inquiries(agent_id);
CREATE INDEX idx_inquiries_property_id ON public.inquiries(property_id);

-- ============================================================================
-- 12. APPLICATIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  assigned_agent_id UUID REFERENCES public.agents(id) ON DELETE SET NULL,
  enquiry_id UUID REFERENCES public.enquiries(id) ON DELETE SET NULL,
  last_updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  application_type application_type NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  nationality TEXT,
  occupation TEXT,
  employer TEXT,
  monthly_income NUMERIC,
  annual_income NUMERIC,
  residency_status TEXT,
  credit_score INTEGER,
  bank_name TEXT,
  financing_needed BOOLEAN DEFAULT FALSE,
  mortgage_preferred BOOLEAN DEFAULT FALSE,
  financing_amount NUMERIC,
  down_payment NUMERIC,
  budget_min NUMERIC,
  budget_max NUMERIC,
  timeline TEXT,
  preferred_contact_method TEXT DEFAULT 'email',
  property_requirements JSONB DEFAULT '{}',
  cover_letter TEXT,
  additional_documents TEXT[] DEFAULT '{}',
  special_requests TEXT,
  notes TEXT,
  internal_notes TEXT,
  status application_status DEFAULT 'pending',
  priority TEXT DEFAULT 'medium',
  contact_count INTEGER DEFAULT 0,
  last_contacted TIMESTAMPTZ,
  follow_up_date DATE,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  rejected_at TIMESTAMPTZ,
  rejection_reason TEXT,
  completion_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_applications_user_id ON public.applications(user_id);
CREATE INDEX idx_applications_status ON public.applications(status);
CREATE INDEX idx_applications_agent_id ON public.applications(assigned_agent_id);

-- ============================================================================
-- 13. APPLICATION ACTIVITIES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.application_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  activity_type TEXT NOT NULL,
  description TEXT,
  notes TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_application_activities_app_id ON public.application_activities(application_id);

-- ============================================================================
-- 14. VIEWINGS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.viewings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  agent_id UUID REFERENCES public.agents(id) ON DELETE SET NULL,
  enquiry_id UUID REFERENCES public.enquiries(id) ON DELETE SET NULL,
  scheduled_date TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'scheduled',
  notes TEXT,
  feedback TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_viewings_property_id ON public.viewings(property_id);
CREATE INDEX idx_viewings_agent_id ON public.viewings(agent_id);

-- ============================================================================
-- 15. PROPERTY VALUATIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.property_valuations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  property_type TEXT NOT NULL,
  location TEXT NOT NULL,
  bedrooms INTEGER,
  bathrooms INTEGER,
  size_sqm NUMERIC,
  year_built INTEGER,
  condition TEXT,
  additional_features TEXT,
  contact_method TEXT DEFAULT 'email',
  urgency TEXT DEFAULT 'normal',
  status valuation_status DEFAULT 'pending',
  estimated_value NUMERIC,
  valuation_notes TEXT,
  admin_notes TEXT,
  reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_valuations_status ON public.property_valuations(status);
CREATE INDEX idx_valuations_user_id ON public.property_valuations(user_id);

-- ============================================================================
-- 16. SAVED PROPERTIES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.saved_properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, property_id)
);

CREATE INDEX idx_saved_properties_user_id ON public.saved_properties(user_id);

-- ============================================================================
-- 17. SAVED SEARCHES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.saved_searches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  filters JSONB NOT NULL DEFAULT '{}',
  notification_enabled BOOLEAN DEFAULT FALSE,
  last_run TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_saved_searches_user_id ON public.saved_searches(user_id);

-- ============================================================================
-- 18. NOTIFICATIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  type notification_type DEFAULT 'info',
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB DEFAULT '{}',
  action_url TEXT,
  read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(user_id, read) WHERE read = FALSE;

-- ============================================================================
-- 19. NOTIFICATION TEMPLATES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.notification_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL,
  subject TEXT,
  content TEXT NOT NULL,
  variables JSONB DEFAULT '{}',
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 20. POSTS (Blog) TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT,
  slug TEXT UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  images TEXT[] DEFAULT '{}',
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  status post_status DEFAULT 'draft',
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_posts_author_id ON public.posts(author_id);
CREATE INDEX idx_posts_status ON public.posts(status);
CREATE INDEX idx_posts_slug ON public.posts(slug);
CREATE INDEX idx_posts_published_at ON public.posts(published_at DESC);

-- ============================================================================
-- 21. POST LIKES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.post_likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

-- ============================================================================
-- 22. CUSTOMER QUESTIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.customer_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  admin_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  status question_status DEFAULT 'pending',
  admin_response TEXT,
  admin_response_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_customer_questions_user_id ON public.customer_questions(user_id);
CREATE INDEX idx_customer_questions_status ON public.customer_questions(status);

-- ============================================================================
-- 23. PROPERTY VIEWS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.property_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  session_id TEXT,
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  source TEXT,
  duration_seconds INTEGER,
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_property_views_property_id ON public.property_views(property_id);
CREATE INDEX idx_property_views_viewed_at ON public.property_views(viewed_at DESC);

-- ============================================================================
-- 24. ANALYTICS EVENTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  session_id TEXT,
  url TEXT,
  referrer TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_analytics_events_type ON public.analytics_events(event_type);
CREATE INDEX idx_analytics_events_created_at ON public.analytics_events(created_at DESC);

-- ============================================================================
-- 25. MARKET DATA TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.market_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  area TEXT NOT NULL,
  property_type TEXT NOT NULL,
  metric_type TEXT NOT NULL,
  value NUMERIC NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  data_source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_market_data_area ON public.market_data(area);
CREATE INDEX idx_market_data_period ON public.market_data(period_start, period_end);

-- ============================================================================
-- 26. DASHBOARD METRICS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.dashboard_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  metric_type TEXT NOT NULL,
  metric_value JSONB NOT NULL,
  date_recorded DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_dashboard_metrics_date ON public.dashboard_metrics(date_recorded DESC);

-- ============================================================================
-- 27. DOWNLOAD INTERESTS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.download_interests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  assigned_agent_id UUID REFERENCES public.agents(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  download_type TEXT NOT NULL,
  nationality TEXT,
  occupation TEXT,
  employer TEXT,
  monthly_income NUMERIC,
  budget_range TEXT,
  timeline TEXT,
  interested_in_financing BOOLEAN DEFAULT FALSE,
  additional_notes TEXT,
  status download_status DEFAULT 'new',
  ip_address INET,
  user_agent TEXT,
  contacted_at TIMESTAMPTZ,
  converted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_download_interests_property_id ON public.download_interests(property_id);
CREATE INDEX idx_download_interests_status ON public.download_interests(status);

-- ============================================================================
-- 28. SEO TABLES
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.seo_keywords (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  keyword TEXT NOT NULL UNIQUE,
  search_volume INTEGER,
  competition NUMERIC(5,4),
  cpc NUMERIC(10,2),
  trend TEXT,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.seo_pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT NOT NULL UNIQUE,
  title TEXT,
  meta_description TEXT,
  seo_score INTEGER,
  word_count INTEGER,
  images_count INTEGER,
  internal_links INTEGER,
  external_links INTEGER,
  h1_tags TEXT[] DEFAULT '{}',
  issues TEXT[] DEFAULT '{}',
  last_crawled TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.seo_backlinks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_url TEXT NOT NULL,
  target_url TEXT NOT NULL,
  anchor_text TEXT,
  link_type TEXT,
  domain_authority INTEGER,
  status seo_link_status DEFAULT 'active',
  first_seen TIMESTAMPTZ,
  last_seen TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 29. SYSTEM TABLES
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.system_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  category TEXT,
  description TEXT,
  updated_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.system_health (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_name TEXT NOT NULL,
  status system_health_status NOT NULL DEFAULT 'healthy',
  response_time INTEGER,
  uptime_percentage NUMERIC(5,2),
  details JSONB DEFAULT '{}',
  last_check TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.system_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  level log_level NOT NULL DEFAULT 'info',
  message TEXT NOT NULL,
  context JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_system_logs_level ON public.system_logs(level);
CREATE INDEX idx_system_logs_created_at ON public.system_logs(created_at DESC);

-- ============================================================================
-- 30. ADMIN AUDIT TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.admin_audit (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_admin_audit_admin_id ON public.admin_audit(admin_id);
CREATE INDEX idx_admin_audit_created_at ON public.admin_audit(created_at DESC);

-- ============================================================================
-- 31. PARTNERS TABLE (for website partners section)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  description TEXT,
  category TEXT DEFAULT 'partner',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 32. TESTIMONIALS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  avatar_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 33. NEWS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  category TEXT DEFAULT 'general',
  author TEXT,
  source TEXT,
  source_url TEXT,
  tags TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT TRUE,
  views_count INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_news_slug ON public.news(slug);
CREATE INDEX idx_news_published_at ON public.news(published_at DESC);

-- ============================================================================
-- 34. AGENT PROPERTIES TABLE (properties listed by agents)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.agent_properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  type property_type DEFAULT 'apartment',
  status property_status DEFAULT 'sale',
  beds INTEGER DEFAULT 0,
  bathrooms INTEGER DEFAULT 0,
  sqft NUMERIC DEFAULT 0,
  address TEXT,
  area TEXT,
  city TEXT DEFAULT 'Dubai',
  images TEXT[] DEFAULT '{}',
  amenities TEXT[] DEFAULT '{}',
  features TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_agent_properties_agent_id ON public.agent_properties(agent_id);
CREATE INDEX idx_agent_properties_status ON public.agent_properties(status);

-- ============================================================================
-- TRIGGERS: auto-update updated_at
-- ============================================================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN
    SELECT table_name FROM information_schema.columns
    WHERE table_schema = 'public'
    AND column_name = 'updated_at'
    AND table_name NOT IN ('analytics_events', 'property_views', 'post_likes', 'admin_audit', 'system_logs')
  LOOP
    EXECUTE format(
      'CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at()',
      tbl
    );
  END LOOP;
END;
$$;

-- ============================================================================
-- TRIGGER: auto-create profile on user signup
-- ============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _role user_role;
BEGIN
  -- Safely cast the role from user metadata; default to 'customer'
  BEGIN
    _role := (NEW.raw_user_meta_data->>'role')::user_role;
  EXCEPTION WHEN OTHERS THEN
    _role := 'customer';
  END;

  IF _role IS NULL THEN
    _role := 'customer';
  END IF;

  INSERT INTO public.profiles (id, email, full_name, role, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    _role,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    email      = EXCLUDED.email,
    full_name  = COALESCE(NULLIF(EXCLUDED.full_name, ''), profiles.full_name),
    updated_at = NOW();

  RETURN NEW;
END;
$$;

-- Drop and recreate trigger to ensure clean state
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.developers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiry_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiry_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.viewings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_valuations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dashboard_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.download_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_backlinks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_health ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_properties ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- HELPER: Check if current user is admin
-- ============================================================================

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- HELPER: Check if current user is agent
CREATE OR REPLACE FUNCTION public.is_agent()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role = 'agent'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- PROFILES POLICIES
-- ============================================================================

CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can manage all profiles"
  ON public.profiles FOR ALL
  USING (public.is_admin());

-- ============================================================================
-- PROPERTIES POLICIES
-- ============================================================================

CREATE POLICY "Published properties are viewable by everyone"
  ON public.properties FOR SELECT
  USING (published = true OR auth.uid() IS NOT NULL);

CREATE POLICY "Agents can insert properties"
  ON public.properties FOR INSERT
  WITH CHECK (public.is_agent() OR public.is_admin());

CREATE POLICY "Agents can update own properties"
  ON public.properties FOR UPDATE
  USING (
    agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid())
    OR public.is_admin()
  );

CREATE POLICY "Admins can delete properties"
  ON public.properties FOR DELETE
  USING (public.is_admin());

-- ============================================================================
-- AGENTS POLICIES
-- ============================================================================

CREATE POLICY "Approved agents are viewable by everyone"
  ON public.agents FOR SELECT
  USING (true);

CREATE POLICY "Users can insert agent profile"
  ON public.agents FOR INSERT
  WITH CHECK (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Agents can update own profile"
  ON public.agents FOR UPDATE
  USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Admins can delete agents"
  ON public.agents FOR DELETE
  USING (public.is_admin());

-- ============================================================================
-- AGENT PROPERTIES POLICIES
-- ============================================================================

CREATE POLICY "Published agent properties viewable by everyone"
  ON public.agent_properties FOR SELECT
  USING (published = true OR auth.uid() IS NOT NULL);

CREATE POLICY "Agents can manage own properties"
  ON public.agent_properties FOR INSERT
  WITH CHECK (
    agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid())
    OR public.is_admin()
  );

CREATE POLICY "Agents can update own agent properties"
  ON public.agent_properties FOR UPDATE
  USING (
    agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid())
    OR public.is_admin()
  );

CREATE POLICY "Agents can delete own agent properties"
  ON public.agent_properties FOR DELETE
  USING (
    agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid())
    OR public.is_admin()
  );

-- ============================================================================
-- PROJECTS POLICIES
-- ============================================================================

CREATE POLICY "Published projects are viewable by everyone"
  ON public.projects FOR SELECT
  USING (published = true OR auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage projects"
  ON public.projects FOR ALL
  USING (public.is_admin());

-- ============================================================================
-- DEVELOPERS POLICIES
-- ============================================================================

CREATE POLICY "Developers are viewable by everyone"
  ON public.developers FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage developers"
  ON public.developers FOR ALL
  USING (public.is_admin());

-- ============================================================================
-- CATEGORIES POLICIES
-- ============================================================================

CREATE POLICY "Categories are viewable by everyone"
  ON public.categories FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage categories"
  ON public.categories FOR ALL
  USING (public.is_admin());

-- ============================================================================
-- ENQUIRIES POLICIES
-- ============================================================================

CREATE POLICY "Users can view own enquiries"
  ON public.enquiries FOR SELECT
  USING (
    user_id = auth.uid()
    OR agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid())
    OR assigned_to IN (SELECT id FROM public.agents WHERE user_id = auth.uid())
    OR public.is_admin()
  );

CREATE POLICY "Anyone can create enquiries"
  ON public.enquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Agents and admins can update enquiries"
  ON public.enquiries FOR UPDATE
  USING (
    agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid())
    OR assigned_to IN (SELECT id FROM public.agents WHERE user_id = auth.uid())
    OR public.is_admin()
  );

-- ============================================================================
-- ENQUIRY ACTIVITIES POLICIES
-- ============================================================================

CREATE POLICY "Enquiry activities viewable by related users"
  ON public.enquiry_activities FOR SELECT
  USING (
    enquiry_id IN (
      SELECT id FROM public.enquiries WHERE
        user_id = auth.uid()
        OR agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid())
    )
    OR public.is_admin()
  );

CREATE POLICY "Agents/admins can insert enquiry activities"
  ON public.enquiry_activities FOR INSERT
  WITH CHECK (public.is_agent() OR public.is_admin());

-- ============================================================================
-- ENQUIRY MESSAGES POLICIES
-- ============================================================================

CREATE POLICY "Users can view messages for their enquiries"
  ON public.enquiry_messages FOR SELECT
  USING (
    enquiry_id IN (
      SELECT id FROM public.enquiries WHERE
        user_id = auth.uid()
        OR agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid())
    )
    OR public.is_admin()
  );

CREATE POLICY "Auth users can send messages"
  ON public.enquiry_messages FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================================================
-- INQUIRIES POLICIES
-- ============================================================================

CREATE POLICY "Agents can view their inquiries"
  ON public.inquiries FOR SELECT
  USING (
    agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid())
    OR public.is_admin()
  );

CREATE POLICY "Anyone can create inquiries"
  ON public.inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Agents can update their inquiries"
  ON public.inquiries FOR UPDATE
  USING (
    agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid())
    OR public.is_admin()
  );

-- ============================================================================
-- APPLICATIONS POLICIES
-- ============================================================================

CREATE POLICY "Users can view own applications"
  ON public.applications FOR SELECT
  USING (
    user_id = auth.uid()
    OR assigned_agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid())
    OR public.is_admin()
  );

CREATE POLICY "Auth users can create applications"
  ON public.applications FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Agents/admins can update applications"
  ON public.applications FOR UPDATE
  USING (
    assigned_agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid())
    OR public.is_admin()
  );

-- ============================================================================
-- APPLICATION ACTIVITIES POLICIES
-- ============================================================================

CREATE POLICY "App activities viewable by related users"
  ON public.application_activities FOR SELECT
  USING (public.is_agent() OR public.is_admin());

CREATE POLICY "Agents/admins can insert app activities"
  ON public.application_activities FOR INSERT
  WITH CHECK (public.is_agent() OR public.is_admin());

-- ============================================================================
-- VIEWINGS POLICIES
-- ============================================================================

CREATE POLICY "Users can view relevant viewings"
  ON public.viewings FOR SELECT
  USING (
    agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid())
    OR public.is_admin()
  );

CREATE POLICY "Agents can manage viewings"
  ON public.viewings FOR ALL
  USING (
    agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid())
    OR public.is_admin()
  );

-- ============================================================================
-- PROPERTY VALUATIONS POLICIES
-- ============================================================================

CREATE POLICY "Users can view own valuations"
  ON public.property_valuations FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Auth users can submit valuations"
  ON public.property_valuations FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can update valuations"
  ON public.property_valuations FOR UPDATE
  USING (public.is_admin());

-- ============================================================================
-- SAVED PROPERTIES POLICIES
-- ============================================================================

CREATE POLICY "Users can manage own saved properties"
  ON public.saved_properties FOR ALL
  USING (user_id = auth.uid());

-- ============================================================================
-- SAVED SEARCHES POLICIES
-- ============================================================================

CREATE POLICY "Users can manage own saved searches"
  ON public.saved_searches FOR ALL
  USING (user_id = auth.uid());

-- ============================================================================
-- NOTIFICATIONS POLICIES
-- ============================================================================

CREATE POLICY "Users can view own notifications"
  ON public.notifications FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "System can create notifications"
  ON public.notifications FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL OR public.is_admin());

CREATE POLICY "Users can update own notifications (mark read)"
  ON public.notifications FOR UPDATE
  USING (user_id = auth.uid());

-- ============================================================================
-- NOTIFICATION TEMPLATES POLICIES
-- ============================================================================

CREATE POLICY "Admins can manage notification templates"
  ON public.notification_templates FOR ALL
  USING (public.is_admin());

-- ============================================================================
-- POSTS POLICIES
-- ============================================================================

CREATE POLICY "Published posts viewable by everyone"
  ON public.posts FOR SELECT
  USING (status = 'published' OR auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage posts"
  ON public.posts FOR ALL
  USING (public.is_admin());

-- ============================================================================
-- POST LIKES POLICIES
-- ============================================================================

CREATE POLICY "Post likes viewable by everyone"
  ON public.post_likes FOR SELECT
  USING (true);

CREATE POLICY "Auth users can like posts"
  ON public.post_likes FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can remove own likes"
  ON public.post_likes FOR DELETE
  USING (user_id = auth.uid());

-- ============================================================================
-- CUSTOMER QUESTIONS POLICIES
-- ============================================================================

CREATE POLICY "Users can view own questions"
  ON public.customer_questions FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Auth users can submit questions"
  ON public.customer_questions FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can update questions"
  ON public.customer_questions FOR UPDATE
  USING (public.is_admin());

-- ============================================================================
-- PROPERTY VIEWS POLICIES
-- ============================================================================

CREATE POLICY "Anyone can insert property views"
  ON public.property_views FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view property views"
  ON public.property_views FOR SELECT
  USING (public.is_admin() OR public.is_agent());

-- ============================================================================
-- ANALYTICS EVENTS POLICIES
-- ============================================================================

CREATE POLICY "Anyone can insert analytics events"
  ON public.analytics_events FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view analytics"
  ON public.analytics_events FOR SELECT
  USING (public.is_admin());

-- ============================================================================
-- MARKET DATA POLICIES
-- ============================================================================

CREATE POLICY "Market data viewable by everyone"
  ON public.market_data FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage market data"
  ON public.market_data FOR ALL
  USING (public.is_admin());

-- ============================================================================
-- DASHBOARD METRICS POLICIES
-- ============================================================================

CREATE POLICY "Dashboard metrics viewable by admins/agents"
  ON public.dashboard_metrics FOR SELECT
  USING (public.is_admin() OR public.is_agent());

CREATE POLICY "Admins can manage dashboard metrics"
  ON public.dashboard_metrics FOR ALL
  USING (public.is_admin());

-- ============================================================================
-- DOWNLOAD INTERESTS POLICIES
-- ============================================================================

CREATE POLICY "Anyone can submit download interest"
  ON public.download_interests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins/agents can view download interests"
  ON public.download_interests FOR SELECT
  USING (public.is_admin() OR public.is_agent());

CREATE POLICY "Admins can update download interests"
  ON public.download_interests FOR UPDATE
  USING (public.is_admin());

-- ============================================================================
-- SEO TABLES POLICIES
-- ============================================================================

CREATE POLICY "SEO keywords viewable by admins"
  ON public.seo_keywords FOR ALL
  USING (public.is_admin());

CREATE POLICY "SEO pages viewable by admins"
  ON public.seo_pages FOR ALL
  USING (public.is_admin());

CREATE POLICY "SEO backlinks viewable by admins"
  ON public.seo_backlinks FOR ALL
  USING (public.is_admin());

-- ============================================================================
-- SYSTEM TABLES POLICIES
-- ============================================================================

CREATE POLICY "System settings viewable by admins"
  ON public.system_settings FOR ALL
  USING (public.is_admin());

CREATE POLICY "System health viewable by admins"
  ON public.system_health FOR ALL
  USING (public.is_admin());

CREATE POLICY "System logs viewable by admins"
  ON public.system_logs FOR SELECT
  USING (public.is_admin());

CREATE POLICY "System can insert logs"
  ON public.system_logs FOR INSERT
  WITH CHECK (true);

-- ============================================================================
-- ADMIN AUDIT POLICIES
-- ============================================================================

CREATE POLICY "Admin audit viewable by admins"
  ON public.admin_audit FOR SELECT
  USING (public.is_admin());

CREATE POLICY "System can insert audit records"
  ON public.admin_audit FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- ============================================================================
-- ADMIN CREDENTIALS POLICIES
-- ============================================================================

CREATE POLICY "Admin credentials viewable by admins"
  ON public.admin_credentials FOR ALL
  USING (public.is_admin());

-- ============================================================================
-- PARTNERS POLICIES
-- ============================================================================

CREATE POLICY "Active partners viewable by everyone"
  ON public.partners FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage partners"
  ON public.partners FOR ALL
  USING (public.is_admin());

-- ============================================================================
-- TESTIMONIALS POLICIES
-- ============================================================================

CREATE POLICY "Active testimonials viewable by everyone"
  ON public.testimonials FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage testimonials"
  ON public.testimonials FOR ALL
  USING (public.is_admin());

-- ============================================================================
-- NEWS POLICIES
-- ============================================================================

CREATE POLICY "Published news viewable by everyone"
  ON public.news FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage news"
  ON public.news FOR ALL
  USING (public.is_admin());

-- ============================================================================
-- STORAGE BUCKETS
-- ============================================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('property-images', 'property-images', true, 10485760, ARRAY['image/jpeg','image/png','image/webp','image/gif']),
  ('agent-images', 'agent-images', true, 5242880, ARRAY['image/jpeg','image/png','image/webp']),
  ('project-images', 'project-images', true, 10485760, ARRAY['image/jpeg','image/png','image/webp','image/gif']),
  ('documents', 'documents', false, 20971520, ARRAY['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document']),
  ('avatars', 'avatars', true, 2097152, ARRAY['image/jpeg','image/png','image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Storage policies for property images
CREATE POLICY "Property images are publicly viewable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'property-images');

CREATE POLICY "Auth users can upload property images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'property-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can update own property images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'property-images' AND auth.uid() IS NOT NULL);

-- Storage policies for agent images
CREATE POLICY "Agent images are publicly viewable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'agent-images');

CREATE POLICY "Agents can upload agent images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'agent-images' AND auth.uid() IS NOT NULL);

-- Storage policies for project images
CREATE POLICY "Project images are publicly viewable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-images');

CREATE POLICY "Admins can upload project images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'project-images' AND auth.uid() IS NOT NULL);

-- Storage policies for avatars
CREATE POLICY "Avatars are publicly viewable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars' AND auth.uid() IS NOT NULL);

-- Storage policies for documents (private)
CREATE POLICY "Users can view own documents"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'documents' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can upload documents"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'documents' AND auth.uid() IS NOT NULL);

-- ============================================================================
-- USEFUL DATABASE FUNCTIONS
-- ============================================================================

-- Get property stats for dashboard
CREATE OR REPLACE FUNCTION public.get_property_stats()
RETURNS JSON AS $$
  SELECT json_build_object(
    'total_properties', (SELECT COUNT(*) FROM public.properties),
    'for_sale', (SELECT COUNT(*) FROM public.properties WHERE status = 'sale'),
    'for_rent', (SELECT COUNT(*) FROM public.properties WHERE status = 'rent'),
    'featured', (SELECT COUNT(*) FROM public.properties WHERE featured = true),
    'total_views', (SELECT COALESCE(SUM(views_count), 0) FROM public.properties),
    'avg_price', (SELECT COALESCE(AVG(price), 0) FROM public.properties WHERE status = 'sale')
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Get agent stats
CREATE OR REPLACE FUNCTION public.get_agent_stats(agent_uuid UUID)
RETURNS JSON AS $$
  SELECT json_build_object(
    'total_properties', (SELECT COUNT(*) FROM public.properties WHERE agent_id IN (SELECT id FROM public.agents WHERE user_id = agent_uuid)),
    'total_enquiries', (SELECT COUNT(*) FROM public.enquiries WHERE agent_id IN (SELECT id FROM public.agents WHERE user_id = agent_uuid)),
    'active_enquiries', (SELECT COUNT(*) FROM public.enquiries WHERE agent_id IN (SELECT id FROM public.agents WHERE user_id = agent_uuid) AND status = 'new'),
    'total_viewings', (SELECT COUNT(*) FROM public.viewings WHERE agent_id IN (SELECT id FROM public.agents WHERE user_id = agent_uuid)),
    'total_views', (SELECT COALESCE(SUM(views_count), 0) FROM public.properties WHERE agent_id IN (SELECT id FROM public.agents WHERE user_id = agent_uuid))
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Search properties with full text
CREATE OR REPLACE FUNCTION public.search_properties(
  search_query TEXT DEFAULT NULL,
  property_type_filter TEXT DEFAULT NULL,
  status_filter TEXT DEFAULT NULL,
  min_price_filter NUMERIC DEFAULT NULL,
  max_price_filter NUMERIC DEFAULT NULL,
  min_beds_filter INTEGER DEFAULT NULL,
  area_filter TEXT DEFAULT NULL,
  city_filter TEXT DEFAULT NULL,
  sort_by TEXT DEFAULT 'created_at',
  sort_order TEXT DEFAULT 'desc',
  page_limit INTEGER DEFAULT 20,
  page_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  slug TEXT,
  price NUMERIC,
  type property_type,
  status property_status,
  beds INTEGER,
  baths INTEGER,
  sqft NUMERIC,
  area TEXT,
  city TEXT,
  address TEXT,
  image_url TEXT,
  images TEXT[],
  featured BOOLEAN,
  agent_id UUID,
  created_at TIMESTAMPTZ,
  total_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id, p.title, p.slug, p.price, p.type, p.status,
    p.beds, p.baths, p.sqft, p.area, p.city, p.address,
    p.image_url, p.images, p.featured, p.agent_id, p.created_at,
    COUNT(*) OVER() as total_count
  FROM public.properties p
  WHERE p.published = true
    AND (search_query IS NULL OR (
      p.title ILIKE '%' || search_query || '%'
      OR p.description ILIKE '%' || search_query || '%'
      OR p.area ILIKE '%' || search_query || '%'
      OR p.address ILIKE '%' || search_query || '%'
    ))
    AND (property_type_filter IS NULL OR p.type::TEXT = property_type_filter)
    AND (status_filter IS NULL OR p.status::TEXT = status_filter)
    AND (min_price_filter IS NULL OR p.price >= min_price_filter)
    AND (max_price_filter IS NULL OR p.price <= max_price_filter)
    AND (min_beds_filter IS NULL OR p.beds >= min_beds_filter)
    AND (area_filter IS NULL OR p.area ILIKE '%' || area_filter || '%')
    AND (city_filter IS NULL OR p.city ILIKE '%' || city_filter || '%')
  ORDER BY
    CASE WHEN sort_by = 'price' AND sort_order = 'asc' THEN p.price END ASC,
    CASE WHEN sort_by = 'price' AND sort_order = 'desc' THEN p.price END DESC,
    CASE WHEN sort_by = 'created_at' AND sort_order = 'asc' THEN p.created_at END ASC,
    CASE WHEN sort_by = 'created_at' AND sort_order = 'desc' THEN p.created_at END DESC,
    p.featured DESC NULLS LAST
  LIMIT page_limit
  OFFSET page_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Increment property view count
CREATE OR REPLACE FUNCTION public.increment_property_views(property_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.properties SET views_count = COALESCE(views_count, 0) + 1, last_viewed = NOW()
  WHERE id = property_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- REQUEST INFORMATION TABLE (contact/valuation/inquiry forms)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.request_information (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  property_type TEXT,
  property_title TEXT,
  agent_id UUID REFERENCES public.agents(id) ON DELETE SET NULL,
  source TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_request_information_email ON public.request_information(email);
CREATE INDEX idx_request_information_status ON public.request_information(status);
CREATE INDEX idx_request_information_agent_id ON public.request_information(agent_id);

-- RLS for request_information
ALTER TABLE public.request_information ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert request_information"
  ON public.request_information FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins and agents can view request_information"
  ON public.request_information FOR SELECT
  USING (public.is_admin() OR public.is_agent());

CREATE POLICY "Admins can manage request_information"
  ON public.request_information FOR ALL
  USING (public.is_admin());

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
