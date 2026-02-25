-- ============================================================================
-- RAGDOL Real Estate Platform — Unified Production Schema
-- Single migration that creates ALL tables, indexes, triggers, functions,
-- RLS policies, and storage buckets from scratch.
-- Run the companion  drop_all.sql  FIRST on a live database.
-- ============================================================================

-- ============================================================================
-- 0. EXTENSIONS
-- ============================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. ENUM TYPES
-- ============================================================================
DO $$ BEGIN
  CREATE TYPE user_role             AS ENUM ('customer','agent','admin');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE property_status       AS ENUM ('sale','rent','buy','sold','rented','draft','archived');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE property_type         AS ENUM ('apartment','villa','townhouse','penthouse','studio','duplex','land','commercial','office','warehouse','retail','hotel_apartment');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE furnishing_type       AS ENUM ('furnished','semi-furnished','unfurnished');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE enquiry_status        AS ENUM ('new','contacted','viewing','negotiating','closed','lost');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE enquiry_priority      AS ENUM ('low','medium','high','urgent');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE application_status    AS ENUM ('pending','under_review','approved','rejected','completed','cancelled');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE application_type      AS ENUM ('buy','rent','mortgage','investment','agent_application');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE valuation_status      AS ENUM ('pending','in_progress','completed','cancelled');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE notification_type     AS ENUM ('info','success','warning','error','enquiry','property','system');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE post_status           AS ENUM ('draft','published','archived');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE project_status        AS ENUM ('upcoming','under_construction','ready','completed','sold_out');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE download_status       AS ENUM ('new','contacted','converted','not_interested');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE question_status       AS ENUM ('pending','answered','closed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE seo_link_status       AS ENUM ('active','broken','removed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE system_health_status  AS ENUM ('healthy','degraded','down');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE log_level             AS ENUM ('info','warning','error','critical');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ============================================================================
-- 2. TABLES
-- ============================================================================

-- 2.1 profiles (extends auth.users) -------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name       TEXT,
  email           TEXT UNIQUE,
  phone           TEXT,
  avatar_url      TEXT,
  bio             TEXT,
  location        TEXT,
  role            user_role NOT NULL DEFAULT 'customer',
  status          TEXT DEFAULT 'active',
  email_verified  BOOLEAN DEFAULT FALSE,
  phone_verified  BOOLEAN DEFAULT FALSE,
  preferences     JSONB DEFAULT '{}',
  social_links    JSONB DEFAULT '{}',
  last_login      TIMESTAMPTZ,
  login_count     INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 2.2 admin_credentials -------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_credentials (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email           TEXT NOT NULL UNIQUE,
  password_hash   TEXT NOT NULL,
  role            TEXT DEFAULT 'admin',
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 2.3 developers --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.developers (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            TEXT NOT NULL,
  description     TEXT,
  logo_url        TEXT,
  website         TEXT,
  contact_email   TEXT,
  contact_phone   TEXT,
  founded_year    INTEGER,
  total_projects  INTEGER DEFAULT 0,
  active_projects INTEGER DEFAULT 0,
  verified        BOOLEAN DEFAULT FALSE,
  social_links    JSONB DEFAULT '{}',
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 2.4 categories --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.categories (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            TEXT NOT NULL,
  slug            TEXT UNIQUE,
  description     TEXT,
  icon            TEXT,
  color           TEXT,
  parent_id       UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  sort_order      INTEGER DEFAULT 0,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 2.5 agents ------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.agents (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id           UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title             TEXT,
  office            TEXT,
  license_no        TEXT,
  brokerage         TEXT,
  bio               TEXT,
  areas             TEXT[] DEFAULT '{}',
  location          TEXT,
  whatsapp          TEXT,
  telegram          TEXT,
  instagram_handle  TEXT,
  linkedin_url      TEXT,
  website_url       TEXT,
  social            JSONB DEFAULT '{}',
  profile_image     TEXT,
  profile_images    TEXT[] DEFAULT '{}',
  languages         TEXT[] DEFAULT '{}',
  specializations   TEXT[] DEFAULT '{}',
  certifications    TEXT[] DEFAULT '{}',
  experience_years  INTEGER DEFAULT 0,
  total_sales       NUMERIC DEFAULT 0,
  commission_rate   NUMERIC(5,2),
  rating            NUMERIC(3,2) DEFAULT 0,
  review_count      INTEGER DEFAULT 0,
  approved          BOOLEAN DEFAULT FALSE,
  verified          BOOLEAN DEFAULT FALSE,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_agents_user_id   ON public.agents(user_id);
CREATE INDEX IF NOT EXISTS idx_agents_approved  ON public.agents(approved);
CREATE INDEX IF NOT EXISTS idx_agents_verified  ON public.agents(verified);
CREATE INDEX IF NOT EXISTS idx_agents_areas     ON public.agents USING GIN(areas);

-- 2.6 projects ----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.projects (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name              TEXT NOT NULL,
  slug              TEXT UNIQUE,
  description       TEXT,
  developer_id      UUID REFERENCES public.developers(id) ON DELETE SET NULL,
  status            project_status DEFAULT 'upcoming',
  address           TEXT,
  area              TEXT,
  district          TEXT,
  city              TEXT DEFAULT 'Dubai',
  coords            JSONB,
  hero_image_url    TEXT,
  images            TEXT[] DEFAULT '{}',
  video_url         TEXT,
  videos            TEXT[] DEFAULT '{}',
  brochure_url      TEXT,
  brochure_en_url   TEXT,
  brochure_ar_url   TEXT,
  fact_sheet_url    TEXT,
  floor_plans_url   TEXT,
  floor_plans       TEXT[] DEFAULT '{}',
  masterplan_url    TEXT,
  material_board_url TEXT,
  one_pager_url     TEXT,
  payment_plan_url  TEXT,
  property_types    TEXT[] DEFAULT '{}',
  amenities         TEXT[] DEFAULT '{}',
  facilities        TEXT[] DEFAULT '{}',
  total_units       INTEGER,
  available_units   INTEGER,
  sold_units        INTEGER DEFAULT 0,
  starting_price    NUMERIC,
  min_price         NUMERIC,
  max_price         NUMERIC,
  currency          TEXT DEFAULT 'AED',
  payment_plan      TEXT,
  payment_terms     JSONB DEFAULT '{}',
  launch_date       DATE,
  completion_date   DATE,
  handover_date     DATE,
  featured          BOOLEAN DEFAULT FALSE,
  published         BOOLEAN DEFAULT TRUE,
  views_count       INTEGER DEFAULT 0,
  inquiries_count   INTEGER DEFAULT 0,
  seo_title         TEXT,
  seo_description   TEXT,
  seo_keywords      TEXT[] DEFAULT '{}',
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_developer_id ON public.projects(developer_id);
CREATE INDEX IF NOT EXISTS idx_projects_status       ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured     ON public.projects(featured) WHERE featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_projects_slug         ON public.projects(slug);

-- 2.7 properties --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.properties (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title             TEXT NOT NULL,
  slug              TEXT UNIQUE,
  description       TEXT,
  short_description TEXT,
  price             NUMERIC NOT NULL,
  original_price    NUMERIC,
  price_per_sqft    NUMERIC,
  currency          TEXT DEFAULT 'AED',
  type              property_type DEFAULT 'apartment',
  status            property_status DEFAULT 'sale',
  property_status   TEXT DEFAULT 'available',
  furnishing        furnishing_type,
  beds              INTEGER DEFAULT 0,
  baths             INTEGER DEFAULT 0,
  sqft              NUMERIC DEFAULT 0,
  built_up_area     NUMERIC,
  plot_size         NUMERIC,
  floor_number      INTEGER,
  total_floors      INTEGER,
  parking_spaces    INTEGER DEFAULT 0,
  year_built        INTEGER,
  address           TEXT,
  area              TEXT,
  district          TEXT,
  city              TEXT DEFAULT 'Dubai',
  neighborhood      TEXT,
  landmark          TEXT,
  location          TEXT,
  coords            JSONB,
  image_url         TEXT,
  images            TEXT[] DEFAULT '{}',
  floorplans        TEXT[] DEFAULT '{}',
  brochure_url      TEXT,
  fact_sheet_url    TEXT,
  material_board_url TEXT,
  video_url         TEXT,
  virtual_tour_url  TEXT,
  amenities         TEXT[] DEFAULT '{}',
  features          TEXT[] DEFAULT '{}',
  agent_id          UUID REFERENCES public.agents(id) ON DELETE SET NULL,
  category_id       UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  developer_id      UUID REFERENCES public.developers(id) ON DELETE SET NULL,
  project_id        UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  review_status     TEXT DEFAULT 'pending_review',
  featured          BOOLEAN DEFAULT FALSE,
  premium           BOOLEAN DEFAULT FALSE,
  urgent            BOOLEAN DEFAULT FALSE,
  verified          BOOLEAN DEFAULT FALSE,
  published         BOOLEAN DEFAULT TRUE,
  favorites_count   INTEGER DEFAULT 0,
  views_count       INTEGER DEFAULT 0,
  inquiries_count   INTEGER DEFAULT 0,
  last_viewed       TIMESTAMPTZ,
  expires_at        TIMESTAMPTZ,
  meta_data         JSONB DEFAULT '{}',
  seo_title         TEXT,
  seo_description   TEXT,
  seo_keywords      TEXT[] DEFAULT '{}',
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_properties_agent_id    ON public.properties(agent_id);
CREATE INDEX IF NOT EXISTS idx_properties_status      ON public.properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_type        ON public.properties(type);
CREATE INDEX IF NOT EXISTS idx_properties_price       ON public.properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_featured    ON public.properties(featured) WHERE featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_properties_published   ON public.properties(published) WHERE published = TRUE;
CREATE INDEX IF NOT EXISTS idx_properties_slug        ON public.properties(slug);
CREATE INDEX IF NOT EXISTS idx_properties_area        ON public.properties(area);
CREATE INDEX IF NOT EXISTS idx_properties_city        ON public.properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_beds        ON public.properties(beds);
CREATE INDEX IF NOT EXISTS idx_properties_created_at  ON public.properties(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_properties_amenities   ON public.properties USING GIN(amenities);

-- 2.8 enquiries ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.enquiries (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id               UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  agent_id              UUID REFERENCES public.agents(id) ON DELETE SET NULL,
  assigned_to           UUID REFERENCES public.agents(id) ON DELETE SET NULL,
  property_id           UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  name                  TEXT NOT NULL,
  email                 TEXT NOT NULL,
  phone                 TEXT,
  message               TEXT,
  source                TEXT DEFAULT 'website',
  status                enquiry_status DEFAULT 'new',
  priority              enquiry_priority DEFAULT 'medium',
  tags                  TEXT[] DEFAULT '{}',
  notes                 TEXT,
  nationality           TEXT,
  occupation            TEXT,
  employer              TEXT,
  monthly_income        NUMERIC,
  residency_status      TEXT,
  financing_needed      BOOLEAN DEFAULT FALSE,
  mortgage_preferred    BOOLEAN DEFAULT FALSE,
  financing_amount      NUMERIC,
  down_payment          NUMERIC,
  budget_min            NUMERIC,
  budget_max            NUMERIC,
  timeline              TEXT,
  property_requirements JSONB DEFAULT '{}',
  contact_count         INTEGER DEFAULT 0,
  last_contacted        TIMESTAMPTZ,
  follow_up_date        DATE,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enquiries_user_id     ON public.enquiries(user_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_agent_id    ON public.enquiries(agent_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_property_id ON public.enquiries(property_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_status      ON public.enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at  ON public.enquiries(created_at DESC);

-- 2.9 enquiry_activities ------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.enquiry_activities (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  enquiry_id    UUID REFERENCES public.enquiries(id) ON DELETE CASCADE,
  agent_id      UUID REFERENCES public.agents(id) ON DELETE SET NULL,
  activity_type TEXT NOT NULL,
  description   TEXT,
  notes         TEXT,
  metadata      JSONB DEFAULT '{}',
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enquiry_activities_enquiry_id ON public.enquiry_activities(enquiry_id);

-- 2.10 enquiry_messages -------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.enquiry_messages (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  enquiry_id   UUID REFERENCES public.enquiries(id) ON DELETE CASCADE,
  sender_id    UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  sender_type  TEXT NOT NULL CHECK (sender_type IN ('customer','agent','admin')),
  message      TEXT NOT NULL,
  message_type TEXT DEFAULT 'text',
  attachments  TEXT[] DEFAULT '{}',
  read_at      TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enquiry_messages_enquiry_id ON public.enquiry_messages(enquiry_id);

-- 2.11 inquiries (simple contact-form) ----------------------------------------
CREATE TABLE IF NOT EXISTS public.inquiries (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id      UUID REFERENCES public.agents(id) ON DELETE SET NULL,
  property_id   UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  client_name   TEXT NOT NULL,
  client_email  TEXT NOT NULL,
  client_phone  TEXT,
  message       TEXT NOT NULL,
  agent_reply   TEXT,
  replied_at    TIMESTAMPTZ,
  status        TEXT DEFAULT 'new',
  priority      TEXT DEFAULT 'medium',
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inquiries_agent_id    ON public.inquiries(agent_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_property_id ON public.inquiries(property_id);

-- 2.12 applications -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.applications (
  id                       UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id                  UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  property_id              UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  assigned_agent_id        UUID REFERENCES public.agents(id) ON DELETE SET NULL,
  enquiry_id               UUID REFERENCES public.enquiries(id) ON DELETE SET NULL,
  last_updated_by          UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  application_type         application_type NOT NULL,
  full_name                TEXT NOT NULL,
  email                    TEXT NOT NULL,
  phone                    TEXT NOT NULL,
  nationality              TEXT,
  occupation               TEXT,
  employer                 TEXT,
  monthly_income           NUMERIC,
  annual_income            NUMERIC,
  residency_status         TEXT,
  credit_score             INTEGER,
  bank_name                TEXT,
  financing_needed         BOOLEAN DEFAULT FALSE,
  mortgage_preferred       BOOLEAN DEFAULT FALSE,
  financing_amount         NUMERIC,
  down_payment             NUMERIC,
  budget_min               NUMERIC,
  budget_max               NUMERIC,
  timeline                 TEXT,
  preferred_contact_method TEXT DEFAULT 'email',
  property_requirements    JSONB DEFAULT '{}',
  cover_letter             TEXT,
  additional_documents     TEXT[] DEFAULT '{}',
  special_requests         TEXT,
  notes                    TEXT,
  internal_notes           TEXT,
  status                   application_status DEFAULT 'pending',
  priority                 TEXT DEFAULT 'medium',
  contact_count            INTEGER DEFAULT 0,
  last_contacted           TIMESTAMPTZ,
  follow_up_date           DATE,
  submitted_at             TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at              TIMESTAMPTZ,
  approved_at              TIMESTAMPTZ,
  rejected_at              TIMESTAMPTZ,
  rejection_reason         TEXT,
  completion_date          TIMESTAMPTZ,
  created_at               TIMESTAMPTZ DEFAULT NOW(),
  updated_at               TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_applications_user_id  ON public.applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_status   ON public.applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_agent_id ON public.applications(assigned_agent_id);

-- 2.13 application_activities -------------------------------------------------
CREATE TABLE IF NOT EXISTS public.application_activities (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id  UUID REFERENCES public.applications(id) ON DELETE CASCADE,
  user_id         UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  activity_type   TEXT NOT NULL,
  description     TEXT,
  notes           TEXT,
  metadata        JSONB DEFAULT '{}',
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_application_activities_app_id ON public.application_activities(application_id);

-- 2.14 viewings ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.viewings (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id    UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  agent_id       UUID REFERENCES public.agents(id) ON DELETE SET NULL,
  enquiry_id     UUID REFERENCES public.enquiries(id) ON DELETE SET NULL,
  scheduled_date TIMESTAMPTZ NOT NULL,
  status         TEXT DEFAULT 'scheduled',
  notes          TEXT,
  feedback       TEXT,
  rating         INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_viewings_property_id ON public.viewings(property_id);
CREATE INDEX IF NOT EXISTS idx_viewings_agent_id    ON public.viewings(agent_id);

-- 2.15 property_valuations ----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.property_valuations (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id              UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  property_type        TEXT NOT NULL,
  location             TEXT NOT NULL,
  bedrooms             INTEGER,
  bathrooms            INTEGER,
  size_sqm             NUMERIC,
  year_built           INTEGER,
  condition            TEXT,
  additional_features  TEXT,
  contact_method       TEXT DEFAULT 'email',
  urgency              TEXT DEFAULT 'normal',
  status               valuation_status DEFAULT 'pending',
  estimated_value      NUMERIC,
  valuation_notes      TEXT,
  admin_notes          TEXT,
  reviewed_by          UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  reviewed_at          TIMESTAMPTZ,
  created_at           TIMESTAMPTZ DEFAULT NOW(),
  updated_at           TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_valuations_status  ON public.property_valuations(status);
CREATE INDEX IF NOT EXISTS idx_valuations_user_id ON public.property_valuations(user_id);

-- 2.16 saved_properties -------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.saved_properties (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  notes       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, property_id)
);

CREATE INDEX IF NOT EXISTS idx_saved_properties_user_id ON public.saved_properties(user_id);

-- 2.17 saved_searches ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.saved_searches (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id               UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  name                  TEXT NOT NULL,
  filters               JSONB NOT NULL DEFAULT '{}',
  notification_enabled  BOOLEAN DEFAULT FALSE,
  last_run              TIMESTAMPTZ,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_saved_searches_user_id ON public.saved_searches(user_id);

-- 2.18 notifications ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notifications (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  type       notification_type DEFAULT 'info',
  title      TEXT NOT NULL,
  message    TEXT NOT NULL,
  data       JSONB DEFAULT '{}',
  action_url TEXT,
  read       BOOLEAN DEFAULT FALSE,
  read_at    TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read    ON public.notifications(user_id, read) WHERE read = FALSE;

-- 2.19 notification_templates -------------------------------------------------
CREATE TABLE IF NOT EXISTS public.notification_templates (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT NOT NULL UNIQUE,
  type       TEXT NOT NULL,
  subject    TEXT,
  content    TEXT NOT NULL,
  variables  JSONB DEFAULT '{}',
  active     BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.20 posts (blog) -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.posts (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id       UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title           TEXT,
  slug            TEXT UNIQUE,
  content         TEXT NOT NULL,
  excerpt         TEXT,
  featured_image  TEXT,
  images          TEXT[] DEFAULT '{}',
  category        TEXT,
  tags            TEXT[] DEFAULT '{}',
  status          post_status DEFAULT 'draft',
  likes_count     INTEGER DEFAULT 0,
  comments_count  INTEGER DEFAULT 0,
  views_count     INTEGER DEFAULT 0,
  published_at    TIMESTAMPTZ,
  seo_title       TEXT,
  seo_description TEXT,
  seo_keywords    TEXT[] DEFAULT '{}',
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_posts_author_id    ON public.posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_status       ON public.posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_slug         ON public.posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON public.posts(published_at DESC);

-- 2.21 post_likes -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.post_likes (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id    UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id    UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

-- 2.22 customer_questions -----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.customer_questions (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id           UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  admin_id          UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  subject           TEXT NOT NULL,
  message           TEXT NOT NULL,
  category          TEXT DEFAULT 'general',
  status            question_status DEFAULT 'pending',
  admin_response    TEXT,
  admin_response_at TIMESTAMPTZ,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_customer_questions_user_id ON public.customer_questions(user_id);
CREATE INDEX IF NOT EXISTS idx_customer_questions_status  ON public.customer_questions(status);

-- 2.23 property_views ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.property_views (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id      UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  user_id          UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  session_id       TEXT,
  ip_address       INET,
  user_agent       TEXT,
  referrer         TEXT,
  source           TEXT,
  duration_seconds INTEGER,
  viewed_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_property_views_property_id ON public.property_views(property_id);
CREATE INDEX IF NOT EXISTS idx_property_views_viewed_at   ON public.property_views(viewed_at DESC);

-- 2.24 analytics_events -------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  session_id TEXT,
  url        TEXT,
  referrer   TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_type       ON public.analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON public.analytics_events(created_at DESC);

-- 2.25 market_data ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.market_data (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  area          TEXT NOT NULL,
  property_type TEXT NOT NULL,
  metric_type   TEXT NOT NULL,
  value         NUMERIC NOT NULL,
  period_start  DATE NOT NULL,
  period_end    DATE NOT NULL,
  data_source   TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_market_data_area   ON public.market_data(area);
CREATE INDEX IF NOT EXISTS idx_market_data_period ON public.market_data(period_start, period_end);

-- 2.26 dashboard_metrics ------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.dashboard_metrics (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  metric_type   TEXT NOT NULL,
  metric_value  JSONB NOT NULL,
  date_recorded DATE NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_dashboard_metrics_date ON public.dashboard_metrics(date_recorded DESC);

-- 2.27 download_interests -----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.download_interests (
  id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id             UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  assigned_agent_id       UUID REFERENCES public.agents(id) ON DELETE SET NULL,
  full_name               TEXT NOT NULL,
  email                   TEXT NOT NULL,
  phone                   TEXT NOT NULL,
  download_type           TEXT NOT NULL,
  nationality             TEXT,
  occupation              TEXT,
  employer                TEXT,
  monthly_income          NUMERIC,
  budget_range            TEXT,
  timeline                TEXT,
  interested_in_financing BOOLEAN DEFAULT FALSE,
  additional_notes        TEXT,
  status                  download_status DEFAULT 'new',
  ip_address              INET,
  user_agent              TEXT,
  contacted_at            TIMESTAMPTZ,
  converted_at            TIMESTAMPTZ,
  created_at              TIMESTAMPTZ DEFAULT NOW(),
  updated_at              TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_download_interests_property_id ON public.download_interests(property_id);
CREATE INDEX IF NOT EXISTS idx_download_interests_status      ON public.download_interests(status);

-- 2.28 SEO tables -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.seo_keywords (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  keyword       TEXT NOT NULL UNIQUE,
  search_volume INTEGER,
  competition   NUMERIC(5,4),
  cpc           NUMERIC(10,2),
  trend         TEXT,
  last_updated  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.seo_pages (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url              TEXT NOT NULL UNIQUE,
  title            TEXT,
  meta_description TEXT,
  seo_score        INTEGER,
  word_count       INTEGER,
  images_count     INTEGER,
  internal_links   INTEGER,
  external_links   INTEGER,
  h1_tags          TEXT[] DEFAULT '{}',
  issues           TEXT[] DEFAULT '{}',
  last_crawled     TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.seo_backlinks (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source_url       TEXT NOT NULL,
  target_url       TEXT NOT NULL,
  anchor_text      TEXT,
  link_type        TEXT,
  domain_authority INTEGER,
  status           seo_link_status DEFAULT 'active',
  first_seen       TIMESTAMPTZ,
  last_seen        TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- 2.29 system tables ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.system_settings (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key         TEXT NOT NULL UNIQUE,
  value       JSONB NOT NULL,
  category    TEXT,
  description TEXT,
  updated_by  UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.system_health (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_name      TEXT NOT NULL,
  status            system_health_status NOT NULL DEFAULT 'healthy',
  response_time     INTEGER,
  uptime_percentage NUMERIC(5,2),
  details           JSONB DEFAULT '{}',
  last_check        TIMESTAMPTZ DEFAULT NOW(),
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.system_logs (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  level      log_level NOT NULL DEFAULT 'info',
  message    TEXT NOT NULL,
  context    JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_system_logs_level      ON public.system_logs(level);
CREATE INDEX IF NOT EXISTS idx_system_logs_created_at ON public.system_logs(created_at DESC);

-- 2.30 admin_audit ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_audit (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id      UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action        TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id   TEXT,
  old_values    JSONB,
  new_values    JSONB,
  ip_address    INET,
  user_agent    TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_audit_admin_id   ON public.admin_audit(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_audit_created_at ON public.admin_audit(created_at DESC);

-- 2.31 partners ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.partners (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  logo_url    TEXT,
  website_url TEXT,
  description TEXT,
  category    TEXT DEFAULT 'partner',
  featured    BOOLEAN DEFAULT FALSE,
  sort_order  INTEGER DEFAULT 0,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2.32 testimonials -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.testimonials (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  email       TEXT,
  role        TEXT,
  company     TEXT,
  content     TEXT NOT NULL,
  rating      INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  avatar_url  TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active   BOOLEAN DEFAULT TRUE,
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2.33 news -------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.news (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title        TEXT NOT NULL,
  slug         TEXT UNIQUE,
  content      TEXT NOT NULL,
  excerpt      TEXT,
  image_url    TEXT,
  category     TEXT DEFAULT 'general',
  author       TEXT,
  source       TEXT,
  source_url   TEXT,
  tags         TEXT[] DEFAULT '{}',
  published    BOOLEAN DEFAULT TRUE,
  views_count  INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_news_slug         ON public.news(slug);
CREATE INDEX IF NOT EXISTS idx_news_published_at ON public.news(published_at DESC);

-- 2.34 agent_properties (properties listed by agents) -------------------------
CREATE TABLE IF NOT EXISTS public.agent_properties (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id   UUID NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
  title      TEXT NOT NULL,
  description TEXT,
  price      NUMERIC,
  type       property_type DEFAULT 'apartment',
  status     property_status DEFAULT 'sale',
  beds       INTEGER DEFAULT 0,
  bathrooms  INTEGER DEFAULT 0,
  sqft       NUMERIC DEFAULT 0,
  address    TEXT,
  area       TEXT,
  city       TEXT DEFAULT 'Dubai',
  images     TEXT[] DEFAULT '{}',
  amenities  TEXT[] DEFAULT '{}',
  features   TEXT[] DEFAULT '{}',
  published  BOOLEAN DEFAULT TRUE,
  featured   BOOLEAN DEFAULT FALSE,
  views_count INTEGER DEFAULT 0,
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_agent_properties_agent_id ON public.agent_properties(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_properties_status   ON public.agent_properties(status);

-- 2.35 request_information ----------------------------------------------------
CREATE TABLE IF NOT EXISTS public.request_information (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name           TEXT NOT NULL,
  email          TEXT NOT NULL,
  phone          TEXT,
  message        TEXT,
  property_id    UUID REFERENCES public.properties(id) ON DELETE SET NULL,
  property_type  TEXT,
  property_title TEXT,
  agent_id       UUID REFERENCES public.agents(id) ON DELETE SET NULL,
  source         TEXT,
  status         TEXT DEFAULT 'pending',
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_request_information_email    ON public.request_information(email);
CREATE INDEX IF NOT EXISTS idx_request_information_status   ON public.request_information(status);
CREATE INDEX IF NOT EXISTS idx_request_information_agent_id ON public.request_information(agent_id);

-- 2.36 hero_settings ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.hero_settings (
  id                 UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mode               TEXT NOT NULL DEFAULT 'slider' CHECK (mode IN ('slider','video')),
  heading            TEXT NOT NULL DEFAULT 'Find Your Dream Home in Dubai',
  subheading         TEXT NOT NULL DEFAULT 'Discover luxury properties, premium apartments and exclusive villas across Dubai''s most prestigious communities.',
  overlay_opacity    NUMERIC(3,2) NOT NULL DEFAULT 0.55 CHECK (overlay_opacity BETWEEN 0 AND 1),
  auto_play          BOOLEAN NOT NULL DEFAULT TRUE,
  slide_duration     INTEGER NOT NULL DEFAULT 5000,
  video_url          TEXT,
  video_poster_url   TEXT,
  video_muted        BOOLEAN NOT NULL DEFAULT TRUE,
  video_loop         BOOLEAN NOT NULL DEFAULT TRUE,
  search_enabled     BOOLEAN NOT NULL DEFAULT TRUE,
  primary_cta_text   TEXT NOT NULL DEFAULT 'Explore Properties',
  primary_cta_url    TEXT NOT NULL DEFAULT '/properties',
  secondary_cta_text TEXT,
  secondary_cta_url  TEXT,
  is_active          BOOLEAN NOT NULL DEFAULT TRUE,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2.37 hero_slides ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.hero_slides (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hero_setting_id UUID NOT NULL REFERENCES public.hero_settings(id) ON DELETE CASCADE,
  image_url       TEXT NOT NULL,
  title           TEXT,
  subtitle        TEXT,
  sort_order      INTEGER NOT NULL DEFAULT 0,
  is_active       BOOLEAN NOT NULL DEFAULT TRUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_hero_slides_setting_id ON public.hero_slides(hero_setting_id);
CREATE INDEX IF NOT EXISTS idx_hero_slides_sort_order ON public.hero_slides(sort_order);

-- ============================================================================
-- 3. TRIGGERS — auto-update updated_at
-- ============================================================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to every table that has an updated_at column
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN
    SELECT table_name FROM information_schema.columns
    WHERE table_schema = 'public'
      AND column_name = 'updated_at'
      AND table_name NOT IN ('analytics_events','property_views','post_likes','admin_audit','system_logs')
  LOOP
    EXECUTE format(
      'DROP TRIGGER IF EXISTS set_updated_at ON public.%I', tbl);
    EXECUTE format(
      'CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at()', tbl);
  END LOOP;
END;
$$;

-- ============================================================================
-- 4. TRIGGER — auto-create profile on auth signup
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
  BEGIN
    _role := (NEW.raw_user_meta_data->>'role')::user_role;
  EXCEPTION WHEN OTHERS THEN
    _role := 'customer';
  END;
  IF _role IS NULL THEN _role := 'customer'; END IF;

  INSERT INTO public.profiles (id, email, full_name, role, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    _role,
    NOW(), NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    email      = EXCLUDED.email,
    full_name  = COALESCE(NULLIF(EXCLUDED.full_name, ''), profiles.full_name),
    updated_at = NOW();

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- 5. HELPER FUNCTIONS
-- ============================================================================

-- is_admin() — SECURITY DEFINER so RLS can call it safely
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- is_agent()
CREATE OR REPLACE FUNCTION public.is_agent()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'agent'
  );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- get_property_stats()
CREATE OR REPLACE FUNCTION public.get_property_stats()
RETURNS JSON AS $$
  SELECT json_build_object(
    'total_properties', (SELECT COUNT(*) FROM public.properties),
    'for_sale',         (SELECT COUNT(*) FROM public.properties WHERE status = 'sale'),
    'for_rent',         (SELECT COUNT(*) FROM public.properties WHERE status = 'rent'),
    'featured',         (SELECT COUNT(*) FROM public.properties WHERE featured = true),
    'total_views',      (SELECT COALESCE(SUM(views_count), 0) FROM public.properties),
    'avg_price',        (SELECT COALESCE(AVG(price), 0) FROM public.properties WHERE status = 'sale')
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- get_agent_stats(agent_uuid)
CREATE OR REPLACE FUNCTION public.get_agent_stats(agent_uuid UUID)
RETURNS JSON AS $$
  SELECT json_build_object(
    'total_properties', (SELECT COUNT(*) FROM public.properties WHERE agent_id IN (SELECT id FROM public.agents WHERE user_id = agent_uuid)),
    'total_enquiries',  (SELECT COUNT(*) FROM public.enquiries  WHERE agent_id IN (SELECT id FROM public.agents WHERE user_id = agent_uuid)),
    'active_enquiries', (SELECT COUNT(*) FROM public.enquiries  WHERE agent_id IN (SELECT id FROM public.agents WHERE user_id = agent_uuid) AND status = 'new'),
    'total_viewings',   (SELECT COUNT(*) FROM public.viewings   WHERE agent_id IN (SELECT id FROM public.agents WHERE user_id = agent_uuid)),
    'total_views',      (SELECT COALESCE(SUM(views_count), 0) FROM public.properties WHERE agent_id IN (SELECT id FROM public.agents WHERE user_id = agent_uuid))
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- search_properties(...)
CREATE OR REPLACE FUNCTION public.search_properties(
  search_query          TEXT    DEFAULT NULL,
  property_type_filter  TEXT    DEFAULT NULL,
  status_filter         TEXT    DEFAULT NULL,
  min_price_filter      NUMERIC DEFAULT NULL,
  max_price_filter      NUMERIC DEFAULT NULL,
  min_beds_filter       INTEGER DEFAULT NULL,
  area_filter           TEXT    DEFAULT NULL,
  city_filter           TEXT    DEFAULT NULL,
  sort_by               TEXT    DEFAULT 'created_at',
  sort_order            TEXT    DEFAULT 'desc',
  page_limit            INTEGER DEFAULT 20,
  page_offset           INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID, title TEXT, slug TEXT, price NUMERIC, type property_type,
  status property_status, beds INTEGER, baths INTEGER, sqft NUMERIC,
  area TEXT, city TEXT, address TEXT, image_url TEXT, images TEXT[],
  featured BOOLEAN, agent_id UUID, created_at TIMESTAMPTZ, total_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT p.id, p.title, p.slug, p.price, p.type, p.status,
         p.beds, p.baths, p.sqft, p.area, p.city, p.address,
         p.image_url, p.images, p.featured, p.agent_id, p.created_at,
         COUNT(*) OVER() AS total_count
  FROM public.properties p
  WHERE p.published = true
    AND (search_query IS NULL OR (
      p.title       ILIKE '%' || search_query || '%' OR
      p.description ILIKE '%' || search_query || '%' OR
      p.area        ILIKE '%' || search_query || '%' OR
      p.address     ILIKE '%' || search_query || '%'))
    AND (property_type_filter IS NULL OR p.type::TEXT = property_type_filter)
    AND (status_filter         IS NULL OR p.status::TEXT = status_filter)
    AND (min_price_filter      IS NULL OR p.price >= min_price_filter)
    AND (max_price_filter      IS NULL OR p.price <= max_price_filter)
    AND (min_beds_filter       IS NULL OR p.beds  >= min_beds_filter)
    AND (area_filter           IS NULL OR p.area  ILIKE '%' || area_filter || '%')
    AND (city_filter           IS NULL OR p.city  ILIKE '%' || city_filter || '%')
  ORDER BY
    CASE WHEN sort_by='price'      AND sort_order='asc'  THEN p.price      END ASC,
    CASE WHEN sort_by='price'      AND sort_order='desc' THEN p.price      END DESC,
    CASE WHEN sort_by='created_at' AND sort_order='asc'  THEN p.created_at END ASC,
    CASE WHEN sort_by='created_at' AND sort_order='desc' THEN p.created_at END DESC,
    p.featured DESC NULLS LAST
  LIMIT page_limit OFFSET page_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- increment_property_views(property_uuid)
CREATE OR REPLACE FUNCTION public.increment_property_views(property_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.properties
  SET views_count = COALESCE(views_count, 0) + 1, last_viewed = NOW()
  WHERE id = property_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- 6. ENABLE ROW LEVEL SECURITY ON ALL TABLES
-- ============================================================================
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN
    SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', tbl);
  END LOOP;
END;
$$;

-- ============================================================================
-- 7. RLS POLICIES (production-recommended)
-- ============================================================================

-- ── profiles ──────────────────────────────────────────────────────────────────
CREATE POLICY "profiles_select_all"
  ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_admin_all"
  ON public.profiles FOR ALL USING (public.is_admin());

-- ── properties ────────────────────────────────────────────────────────────────
CREATE POLICY "properties_select_public"
  ON public.properties FOR SELECT USING (published = true OR auth.uid() IS NOT NULL);
CREATE POLICY "properties_insert_agent_admin"
  ON public.properties FOR INSERT WITH CHECK (public.is_agent() OR public.is_admin());
CREATE POLICY "properties_update_owner_admin"
  ON public.properties FOR UPDATE
  USING (agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid()) OR public.is_admin());
CREATE POLICY "properties_delete_admin"
  ON public.properties FOR DELETE USING (public.is_admin());

-- ── agents ────────────────────────────────────────────────────────────────────
CREATE POLICY "agents_select_all"
  ON public.agents FOR SELECT USING (true);
CREATE POLICY "agents_insert_own_admin"
  ON public.agents FOR INSERT WITH CHECK (user_id = auth.uid() OR public.is_admin());
CREATE POLICY "agents_update_own_admin"
  ON public.agents FOR UPDATE USING (user_id = auth.uid() OR public.is_admin());
CREATE POLICY "agents_delete_admin"
  ON public.agents FOR DELETE USING (public.is_admin());

-- ── agent_properties ─────────────────────────────────────────────────────────
CREATE POLICY "agent_props_select_public"
  ON public.agent_properties FOR SELECT USING (published = true OR auth.uid() IS NOT NULL);
CREATE POLICY "agent_props_insert_owner"
  ON public.agent_properties FOR INSERT
  WITH CHECK (agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid()) OR public.is_admin());
CREATE POLICY "agent_props_update_owner"
  ON public.agent_properties FOR UPDATE
  USING (agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid()) OR public.is_admin());
CREATE POLICY "agent_props_delete_owner"
  ON public.agent_properties FOR DELETE
  USING (agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid()) OR public.is_admin());

-- ── projects ──────────────────────────────────────────────────────────────────
CREATE POLICY "projects_select_public"
  ON public.projects FOR SELECT USING (published = true OR auth.uid() IS NOT NULL);
CREATE POLICY "projects_admin_all"
  ON public.projects FOR ALL USING (public.is_admin());

-- ── developers ────────────────────────────────────────────────────────────────
CREATE POLICY "developers_select_all"
  ON public.developers FOR SELECT USING (true);
CREATE POLICY "developers_admin_all"
  ON public.developers FOR ALL USING (public.is_admin());

-- ── categories ────────────────────────────────────────────────────────────────
CREATE POLICY "categories_select_all"
  ON public.categories FOR SELECT USING (true);
CREATE POLICY "categories_admin_all"
  ON public.categories FOR ALL USING (public.is_admin());

-- ── enquiries ─────────────────────────────────────────────────────────────────
CREATE POLICY "enquiries_select_related"
  ON public.enquiries FOR SELECT
  USING (
    user_id = auth.uid()
    OR agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid())
    OR assigned_to IN (SELECT id FROM public.agents WHERE user_id = auth.uid())
    OR public.is_admin()
  );
CREATE POLICY "enquiries_insert_any"
  ON public.enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "enquiries_update_agent_admin"
  ON public.enquiries FOR UPDATE
  USING (
    agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid())
    OR assigned_to IN (SELECT id FROM public.agents WHERE user_id = auth.uid())
    OR public.is_admin()
  );
CREATE POLICY "enquiries_delete_admin"
  ON public.enquiries FOR DELETE USING (public.is_admin());

-- ── enquiry_activities ───────────────────────────────────────────────────────
CREATE POLICY "ea_select_related"
  ON public.enquiry_activities FOR SELECT
  USING (
    enquiry_id IN (
      SELECT id FROM public.enquiries WHERE
        user_id = auth.uid()
        OR agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid())
    )
    OR public.is_admin()
  );
CREATE POLICY "ea_insert_agent_admin"
  ON public.enquiry_activities FOR INSERT WITH CHECK (public.is_agent() OR public.is_admin());

-- ── enquiry_messages ─────────────────────────────────────────────────────────
CREATE POLICY "em_select_related"
  ON public.enquiry_messages FOR SELECT
  USING (
    enquiry_id IN (
      SELECT id FROM public.enquiries WHERE
        user_id = auth.uid()
        OR agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid())
    )
    OR public.is_admin()
  );
CREATE POLICY "em_insert_auth"
  ON public.enquiry_messages FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- ── inquiries ────────────────────────────────────────────────────────────────
CREATE POLICY "inquiries_select_agent_admin"
  ON public.inquiries FOR SELECT
  USING (agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid()) OR public.is_admin());
CREATE POLICY "inquiries_insert_any"
  ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "inquiries_update_agent_admin"
  ON public.inquiries FOR UPDATE
  USING (agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid()) OR public.is_admin());

-- ── applications ─────────────────────────────────────────────────────────────
CREATE POLICY "applications_select_related"
  ON public.applications FOR SELECT
  USING (
    user_id = auth.uid()
    OR assigned_agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid())
    OR public.is_admin()
  );
CREATE POLICY "applications_insert_auth"
  ON public.applications FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "applications_update_agent_admin"
  ON public.applications FOR UPDATE
  USING (
    assigned_agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid())
    OR public.is_admin()
  );

-- ── application_activities ──────────────────────────────────────────────────
CREATE POLICY "aa_select_agent_admin"
  ON public.application_activities FOR SELECT USING (public.is_agent() OR public.is_admin());
CREATE POLICY "aa_insert_agent_admin"
  ON public.application_activities FOR INSERT WITH CHECK (public.is_agent() OR public.is_admin());

-- ── viewings ─────────────────────────────────────────────────────────────────
CREATE POLICY "viewings_select_agent_admin"
  ON public.viewings FOR SELECT
  USING (agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid()) OR public.is_admin());
CREATE POLICY "viewings_all_agent_admin"
  ON public.viewings FOR ALL
  USING (agent_id IN (SELECT id FROM public.agents WHERE user_id = auth.uid()) OR public.is_admin());

-- ── property_valuations ──────────────────────────────────────────────────────
CREATE POLICY "pv_select_own_admin"
  ON public.property_valuations FOR SELECT USING (user_id = auth.uid() OR public.is_admin());
CREATE POLICY "pv_insert_auth"
  ON public.property_valuations FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "pv_update_admin"
  ON public.property_valuations FOR UPDATE USING (public.is_admin());
CREATE POLICY "pv_delete_admin"
  ON public.property_valuations FOR DELETE USING (public.is_admin());

-- ── saved_properties ────────────────────────────────────────────────────────
CREATE POLICY "sp_all_own"
  ON public.saved_properties FOR ALL USING (user_id = auth.uid());

-- ── saved_searches ──────────────────────────────────────────────────────────
CREATE POLICY "ss_all_own"
  ON public.saved_searches FOR ALL USING (user_id = auth.uid());

-- ── notifications ───────────────────────────────────────────────────────────
CREATE POLICY "notif_select_own_admin"
  ON public.notifications FOR SELECT USING (user_id = auth.uid() OR public.is_admin());
CREATE POLICY "notif_insert_auth_admin"
  ON public.notifications FOR INSERT WITH CHECK (auth.uid() IS NOT NULL OR public.is_admin());
CREATE POLICY "notif_update_own"
  ON public.notifications FOR UPDATE USING (user_id = auth.uid());

-- ── notification_templates ──────────────────────────────────────────────────
CREATE POLICY "nt_admin_all"
  ON public.notification_templates FOR ALL USING (public.is_admin());

-- ── posts ───────────────────────────────────────────────────────────────────
CREATE POLICY "posts_select_public"
  ON public.posts FOR SELECT USING (status = 'published' OR auth.uid() IS NOT NULL);
CREATE POLICY "posts_admin_all"
  ON public.posts FOR ALL USING (public.is_admin());

-- ── post_likes ──────────────────────────────────────────────────────────────
CREATE POLICY "pl_select_all"
  ON public.post_likes FOR SELECT USING (true);
CREATE POLICY "pl_insert_auth"
  ON public.post_likes FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "pl_delete_own"
  ON public.post_likes FOR DELETE USING (user_id = auth.uid());

-- ── customer_questions ──────────────────────────────────────────────────────
CREATE POLICY "cq_select_own_admin"
  ON public.customer_questions FOR SELECT USING (user_id = auth.uid() OR public.is_admin());
CREATE POLICY "cq_insert_auth"
  ON public.customer_questions FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "cq_update_admin"
  ON public.customer_questions FOR UPDATE USING (public.is_admin());
CREATE POLICY "cq_delete_admin"
  ON public.customer_questions FOR DELETE USING (public.is_admin());

-- ── property_views ──────────────────────────────────────────────────────────
CREATE POLICY "propview_insert_any"
  ON public.property_views FOR INSERT WITH CHECK (true);
CREATE POLICY "propview_select_admin_agent"
  ON public.property_views FOR SELECT USING (public.is_admin() OR public.is_agent());

-- ── analytics_events ────────────────────────────────────────────────────────
CREATE POLICY "ae_insert_any"
  ON public.analytics_events FOR INSERT WITH CHECK (true);
CREATE POLICY "ae_select_admin"
  ON public.analytics_events FOR SELECT USING (public.is_admin());

-- ── market_data ─────────────────────────────────────────────────────────────
CREATE POLICY "md_select_all"
  ON public.market_data FOR SELECT USING (true);
CREATE POLICY "md_admin_all"
  ON public.market_data FOR ALL USING (public.is_admin());

-- ── dashboard_metrics ───────────────────────────────────────────────────────
CREATE POLICY "dm_select_admin_agent"
  ON public.dashboard_metrics FOR SELECT USING (public.is_admin() OR public.is_agent());
CREATE POLICY "dm_admin_all"
  ON public.dashboard_metrics FOR ALL USING (public.is_admin());

-- ── download_interests ──────────────────────────────────────────────────────
CREATE POLICY "di_insert_any"
  ON public.download_interests FOR INSERT WITH CHECK (true);
CREATE POLICY "di_select_admin_agent"
  ON public.download_interests FOR SELECT USING (public.is_admin() OR public.is_agent());
CREATE POLICY "di_update_admin"
  ON public.download_interests FOR UPDATE USING (public.is_admin());

-- ── seo_keywords / seo_pages / seo_backlinks ────────────────────────────────
CREATE POLICY "seo_kw_admin" ON public.seo_keywords FOR ALL USING (public.is_admin());
CREATE POLICY "seo_pg_admin" ON public.seo_pages    FOR ALL USING (public.is_admin());
CREATE POLICY "seo_bl_admin" ON public.seo_backlinks FOR ALL USING (public.is_admin());

-- ── system_settings / system_health / system_logs ───────────────────────────
CREATE POLICY "sys_settings_admin" ON public.system_settings FOR ALL USING (public.is_admin());
CREATE POLICY "sys_health_admin"   ON public.system_health   FOR ALL USING (public.is_admin());
CREATE POLICY "sys_logs_select_admin" ON public.system_logs FOR SELECT USING (public.is_admin());
CREATE POLICY "sys_logs_insert_any"   ON public.system_logs FOR INSERT WITH CHECK (true);

-- ── admin_audit ─────────────────────────────────────────────────────────────
CREATE POLICY "audit_select_admin" ON public.admin_audit FOR SELECT USING (public.is_admin());
CREATE POLICY "audit_insert_auth"  ON public.admin_audit FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- ── admin_credentials ───────────────────────────────────────────────────────
CREATE POLICY "admin_creds_admin" ON public.admin_credentials FOR ALL USING (public.is_admin());

-- ── partners ────────────────────────────────────────────────────────────────
CREATE POLICY "partners_select_all"  ON public.partners FOR SELECT USING (true);
CREATE POLICY "partners_admin_all"   ON public.partners FOR ALL USING (public.is_admin());

-- ── testimonials ────────────────────────────────────────────────────────────
CREATE POLICY "testimonials_select_all" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "testimonials_admin_all"  ON public.testimonials FOR ALL USING (public.is_admin());

-- ── news ────────────────────────────────────────────────────────────────────
CREATE POLICY "news_select_all"  ON public.news FOR SELECT USING (true);
CREATE POLICY "news_admin_all"   ON public.news FOR ALL USING (public.is_admin());

-- ── request_information ─────────────────────────────────────────────────────
CREATE POLICY "ri_insert_any"          ON public.request_information FOR INSERT WITH CHECK (true);
CREATE POLICY "ri_select_admin_agent"  ON public.request_information FOR SELECT USING (public.is_admin() OR public.is_agent());
CREATE POLICY "ri_admin_all"           ON public.request_information FOR ALL USING (public.is_admin());

-- ── hero_settings ───────────────────────────────────────────────────────────
CREATE POLICY "hero_settings_select_all" ON public.hero_settings FOR SELECT USING (true);
CREATE POLICY "hero_settings_admin_all"  ON public.hero_settings FOR ALL USING (public.is_admin());

-- ── hero_slides ─────────────────────────────────────────────────────────────
CREATE POLICY "hero_slides_select_all" ON public.hero_slides FOR SELECT USING (true);
CREATE POLICY "hero_slides_admin_all"  ON public.hero_slides FOR ALL USING (public.is_admin());

-- ============================================================================
-- 8. STORAGE BUCKETS
-- ============================================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) VALUES
  ('property-images','property-images',true,10485760,ARRAY['image/jpeg','image/png','image/webp','image/gif']),
  ('agent-images','agent-images',true,5242880,ARRAY['image/jpeg','image/png','image/webp']),
  ('project-images','project-images',true,10485760,ARRAY['image/jpeg','image/png','image/webp','image/gif']),
  ('documents','documents',true,20971520,ARRAY['application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document','image/jpeg','image/png','image/webp']),
  ('logos','logos',true,5242880,ARRAY['image/jpeg','image/jpg','image/png','image/webp','image/svg+xml','image/gif']),
  ('avatars','avatars',true,2097152,ARRAY['image/jpeg','image/png','image/webp']),
  ('hero-media','hero-media',true,104857600,ARRAY['image/jpeg','image/jpg','image/png','image/webp','image/gif','video/mp4','video/webm','video/ogg','video/quicktime'])
ON CONFLICT (id) DO NOTHING;

-- ── Storage policies ────────────────────────────────────────────────────────

-- property-images
CREATE POLICY "propimg_select"  ON storage.objects FOR SELECT USING (bucket_id = 'property-images');
CREATE POLICY "propimg_insert"  ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'property-images' AND auth.uid() IS NOT NULL);
CREATE POLICY "propimg_update"  ON storage.objects FOR UPDATE USING  (bucket_id = 'property-images' AND auth.uid() IS NOT NULL);
CREATE POLICY "propimg_delete"  ON storage.objects FOR DELETE USING  (bucket_id = 'property-images' AND auth.uid() IS NOT NULL);

-- agent-images
CREATE POLICY "agentimg_select" ON storage.objects FOR SELECT USING (bucket_id = 'agent-images');
CREATE POLICY "agentimg_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'agent-images' AND auth.uid() IS NOT NULL);
CREATE POLICY "agentimg_update" ON storage.objects FOR UPDATE USING  (bucket_id = 'agent-images' AND auth.uid() IS NOT NULL);
CREATE POLICY "agentimg_delete" ON storage.objects FOR DELETE USING  (bucket_id = 'agent-images' AND auth.uid() IS NOT NULL);

-- project-images
CREATE POLICY "projimg_select"  ON storage.objects FOR SELECT USING (bucket_id = 'project-images');
CREATE POLICY "projimg_insert"  ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'project-images' AND auth.uid() IS NOT NULL);
CREATE POLICY "projimg_update"  ON storage.objects FOR UPDATE USING  (bucket_id = 'project-images' AND auth.uid() IS NOT NULL);
CREATE POLICY "projimg_delete"  ON storage.objects FOR DELETE USING  (bucket_id = 'project-images' AND auth.uid() IS NOT NULL);

-- logos (public — partner & developer logos)
CREATE POLICY "logos_select"    ON storage.objects FOR SELECT USING (bucket_id = 'logos');
CREATE POLICY "logos_insert"    ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'logos' AND auth.uid() IS NOT NULL);
CREATE POLICY "logos_update"    ON storage.objects FOR UPDATE USING  (bucket_id = 'logos' AND auth.uid() IS NOT NULL);
CREATE POLICY "logos_delete"    ON storage.objects FOR DELETE USING  (bucket_id = 'logos' AND auth.uid() IS NOT NULL);

-- avatars
CREATE POLICY "avatar_select"   ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "avatar_insert"   ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid() IS NOT NULL);

-- documents (public select so download links work without auth)
CREATE POLICY "doc_select"      ON storage.objects FOR SELECT USING (bucket_id = 'documents');
CREATE POLICY "doc_insert"      ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'documents' AND auth.uid() IS NOT NULL);
CREATE POLICY "doc_update"      ON storage.objects FOR UPDATE USING  (bucket_id = 'documents' AND auth.uid() IS NOT NULL);
CREATE POLICY "doc_delete"      ON storage.objects FOR DELETE USING  (bucket_id = 'documents' AND auth.uid() IS NOT NULL);

-- hero-media
CREATE POLICY "heromedia_select" ON storage.objects FOR SELECT USING (bucket_id = 'hero-media');
CREATE POLICY "heromedia_insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'hero-media' AND auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));
CREATE POLICY "heromedia_update" ON storage.objects FOR UPDATE USING  (bucket_id = 'hero-media' AND auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));
CREATE POLICY "heromedia_delete" ON storage.objects FOR DELETE USING  (bucket_id = 'hero-media' AND auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- ============================================================================
-- 9. SEED DATA — default hero settings
-- ============================================================================

INSERT INTO public.hero_settings (
  mode, heading, subheading, overlay_opacity,
  auto_play, slide_duration,
  primary_cta_text, primary_cta_url,
  secondary_cta_text, secondary_cta_url,
  search_enabled, is_active
) VALUES (
  'slider',
  'Find Your Dream Home in Dubai',
  'Discover luxury properties, premium apartments and exclusive villas across Dubai''s most prestigious communities.',
  0.55, true, 5000,
  'Explore Properties', '/properties',
  'Contact an Agent', '/contact',
  true, true
) ON CONFLICT DO NOTHING;

-- ============================================================================
-- END OF UNIFIED SCHEMA
-- ============================================================================
