-- =============================================================================
-- Admin RLS Policies Migration
-- Grants admin role full read/write access to all core tables.
-- Run this in the Supabase SQL Editor for your project.
-- =============================================================================

-- ---------------------
-- Helper function: check if current user is an admin
-- Must live in public schema (auth schema is restricted in Supabase)
-- ---------------------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ---------------------
-- PROPERTIES
-- ---------------------
DROP POLICY IF EXISTS "admin_full_access_properties" ON public.properties;
CREATE POLICY "admin_full_access_properties" ON public.properties
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "public_read_published_properties" ON public.properties;
CREATE POLICY "public_read_published_properties" ON public.properties
  FOR SELECT TO anon, authenticated
  USING (published = true);

-- ---------------------
-- PROFILES
-- ---------------------
DROP POLICY IF EXISTS "admin_full_access_profiles" ON public.profiles;
CREATE POLICY "admin_full_access_profiles" ON public.profiles
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "users_read_own_profile" ON public.profiles;
CREATE POLICY "users_read_own_profile" ON public.profiles
  FOR SELECT TO authenticated
  USING (id = auth.uid());

DROP POLICY IF EXISTS "users_update_own_profile" ON public.profiles;
CREATE POLICY "users_update_own_profile" ON public.profiles
  FOR UPDATE TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- ---------------------
-- AGENTS
-- ---------------------
DROP POLICY IF EXISTS "admin_full_access_agents" ON public.agents;
CREATE POLICY "admin_full_access_agents" ON public.agents
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "public_read_approved_agents" ON public.agents;
CREATE POLICY "public_read_approved_agents" ON public.agents
  FOR SELECT TO anon, authenticated
  USING (approved = true);

DROP POLICY IF EXISTS "agents_manage_own" ON public.agents;
CREATE POLICY "agents_manage_own" ON public.agents
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ---------------------
-- ENQUIRIES
-- ---------------------
DROP POLICY IF EXISTS "admin_full_access_enquiries" ON public.enquiries;
CREATE POLICY "admin_full_access_enquiries" ON public.enquiries
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "anyone_can_create_enquiry" ON public.enquiries;
CREATE POLICY "anyone_can_create_enquiry" ON public.enquiries
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "users_read_own_enquiries" ON public.enquiries;
CREATE POLICY "users_read_own_enquiries" ON public.enquiries
  FOR SELECT TO authenticated
  USING (email = (SELECT email FROM public.profiles WHERE id = auth.uid()));

-- ---------------------
-- PROJECTS
-- ---------------------
DROP POLICY IF EXISTS "admin_full_access_projects" ON public.projects;
CREATE POLICY "admin_full_access_projects" ON public.projects
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "public_read_published_projects" ON public.projects;
CREATE POLICY "public_read_published_projects" ON public.projects
  FOR SELECT TO anon, authenticated
  USING (published = true);

-- ---------------------
-- PROPERTY_VALUATIONS
-- ---------------------
DROP POLICY IF EXISTS "admin_full_access_valuations" ON public.property_valuations;
CREATE POLICY "admin_full_access_valuations" ON public.property_valuations
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "anyone_can_submit_valuation" ON public.property_valuations;
CREATE POLICY "anyone_can_submit_valuation" ON public.property_valuations
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "users_read_own_valuations" ON public.property_valuations;
CREATE POLICY "users_read_own_valuations" ON public.property_valuations
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- ---------------------
-- CUSTOMER_QUESTIONS
-- ---------------------
DROP POLICY IF EXISTS "admin_full_access_questions" ON public.customer_questions;
CREATE POLICY "admin_full_access_questions" ON public.customer_questions
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "anyone_can_ask_question" ON public.customer_questions;
CREATE POLICY "anyone_can_ask_question" ON public.customer_questions
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- ---------------------
-- POSTS (BLOGS)
-- ---------------------
DROP POLICY IF EXISTS "admin_full_access_posts" ON public.posts;
CREATE POLICY "admin_full_access_posts" ON public.posts
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "public_read_published_posts" ON public.posts;
CREATE POLICY "public_read_published_posts" ON public.posts
  FOR SELECT TO anon, authenticated
  USING (status = 'published');

-- ---------------------
-- CATEGORIES
-- ---------------------
DROP POLICY IF EXISTS "admin_full_access_categories" ON public.categories;
CREATE POLICY "admin_full_access_categories" ON public.categories
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "public_read_categories" ON public.categories;
CREATE POLICY "public_read_categories" ON public.categories
  FOR SELECT TO anon, authenticated
  USING (true);

-- ---------------------
-- DOWNLOAD_INTERESTS
-- ---------------------
DROP POLICY IF EXISTS "admin_full_access_download_interests" ON public.download_interests;
CREATE POLICY "admin_full_access_download_interests" ON public.download_interests
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "anyone_can_submit_interest" ON public.download_interests;
CREATE POLICY "anyone_can_submit_interest" ON public.download_interests
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- ---------------------
-- SAVED_PROPERTIES
-- ---------------------
DROP POLICY IF EXISTS "admin_full_access_saved_properties" ON public.saved_properties;
CREATE POLICY "admin_full_access_saved_properties" ON public.saved_properties
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "users_manage_own_saved" ON public.saved_properties;
CREATE POLICY "users_manage_own_saved" ON public.saved_properties
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ---------------------
-- NOTIFICATIONS
-- ---------------------
DROP POLICY IF EXISTS "admin_full_access_notifications" ON public.notifications;
CREATE POLICY "admin_full_access_notifications" ON public.notifications
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "users_read_own_notifications" ON public.notifications;
CREATE POLICY "users_read_own_notifications" ON public.notifications
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- ---------------------
-- ANALYTICS_EVENTS (read-only for admin)
-- ---------------------
DROP POLICY IF EXISTS "admin_full_access_analytics" ON public.analytics_events;
CREATE POLICY "admin_full_access_analytics" ON public.analytics_events
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "anyone_can_log_event" ON public.analytics_events;
CREATE POLICY "anyone_can_log_event" ON public.analytics_events
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- ---------------------
-- ADMIN_AUDIT
-- ---------------------
DROP POLICY IF EXISTS "admin_full_access_audit" ON public.admin_audit;
CREATE POLICY "admin_full_access_audit" ON public.admin_audit
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ---------------------
-- SYSTEM_SETTINGS
-- ---------------------
DROP POLICY IF EXISTS "admin_full_access_system_settings" ON public.system_settings;
CREATE POLICY "admin_full_access_system_settings" ON public.system_settings
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- system_settings is admin-only (no is_public column in schema)
DROP POLICY IF EXISTS "public_read_public_settings" ON public.system_settings;

-- ---------------------
-- HERO_SETTINGS (already in hero_cms migration, but ensure admin access)
-- ---------------------
DROP POLICY IF EXISTS "admin_full_access_hero_settings" ON public.hero_settings;
CREATE POLICY "admin_full_access_hero_settings" ON public.hero_settings
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "public_read_hero_settings" ON public.hero_settings;
CREATE POLICY "public_read_hero_settings" ON public.hero_settings
  FOR SELECT TO anon, authenticated
  USING (true);

-- ---------------------
-- HERO_SLIDES
-- ---------------------
DROP POLICY IF EXISTS "admin_full_access_hero_slides" ON public.hero_slides;
CREATE POLICY "admin_full_access_hero_slides" ON public.hero_slides
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "public_read_active_hero_slides" ON public.hero_slides;
CREATE POLICY "public_read_active_hero_slides" ON public.hero_slides
  FOR SELECT TO anon, authenticated
  USING (is_active = true);

-- Storage: hero-media bucket — admins can upload/delete, public can view
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('hero-media', 'hero-media', true, 104857600, ARRAY['image/jpeg','image/png','image/webp','image/gif','video/mp4','video/webm'])
ON CONFLICT (id) DO UPDATE SET public = true, file_size_limit = 104857600;

DROP POLICY IF EXISTS "admin_upload_hero_media" ON storage.objects;
CREATE POLICY "admin_upload_hero_media" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'hero-media' AND public.is_admin());

DROP POLICY IF EXISTS "admin_delete_hero_media" ON storage.objects;
CREATE POLICY "admin_delete_hero_media" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'hero-media' AND public.is_admin());

DROP POLICY IF EXISTS "public_read_hero_media" ON storage.objects;
CREATE POLICY "public_read_hero_media" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'hero-media');
