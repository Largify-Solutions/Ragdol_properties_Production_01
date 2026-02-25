-- ============================================================================
-- RAGDOL — Drop ALL public tables, types, triggers, functions, storage
-- Run this BEFORE applying the unified schema migration.
-- WARNING: This DESTROYS all data. Back up first.
-- ============================================================================

-- ============================================================================
-- 1. DROP ALL STORAGE POLICIES  (storage.objects)
-- ============================================================================
DO $$
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN
    SELECT policyname FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON storage.objects', pol.policyname);
  END LOOP;
END;
$$;

-- ============================================================================
-- 2. DROP ALL STORAGE BUCKETS (via Supabase storage functions)
-- ============================================================================
DO $$
DECLARE
  bucket TEXT;
BEGIN
  FOREACH bucket IN ARRAY ARRAY['property-images','agent-images','project-images','documents','avatars','hero-media']
  LOOP
    BEGIN
      -- Empty the bucket first (removes all objects via Storage API)
      PERFORM storage.empty_bucket(bucket);
      -- Then delete the bucket itself
      PERFORM storage.delete_bucket(bucket);
    EXCEPTION WHEN OTHERS THEN
      -- Bucket may not exist — skip silently
      NULL;
    END;
  END LOOP;
END;
$$;

-- ============================================================================
-- 3. DROP ALL RLS POLICIES ON public TABLES
-- ============================================================================
DO $$
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN
    SELECT schemaname, tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'public'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I',
      pol.policyname, pol.schemaname, pol.tablename);
  END LOOP;
END;
$$;

-- ============================================================================
-- 4. DROP TRIGGERS on auth.users (profile auto-create)
-- ============================================================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- ============================================================================
-- 5. DROP ALL TRIGGERS on public tables
-- ============================================================================
DO $$
DECLARE
  trg RECORD;
BEGIN
  FOR trg IN
    SELECT trigger_name, event_object_table
    FROM information_schema.triggers
    WHERE trigger_schema = 'public'
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS %I ON public.%I',
      trg.trigger_name, trg.event_object_table);
  END LOOP;
END;
$$;

-- ============================================================================
-- 6. DROP ALL FUNCTIONS in public schema
-- ============================================================================
DO $$
DECLARE
  fn RECORD;
BEGIN
  FOR fn IN
    SELECT n.nspname, p.proname,
           pg_catalog.pg_get_function_identity_arguments(p.oid) AS args
    FROM   pg_catalog.pg_proc p
    JOIN   pg_catalog.pg_namespace n ON n.oid = p.pronamespace
    WHERE  n.nspname = 'public'
  LOOP
    EXECUTE format('DROP FUNCTION IF EXISTS public.%I(%s) CASCADE',
      fn.proname, fn.args);
  END LOOP;
END;
$$;

-- ============================================================================
-- 7. DROP ALL TABLES in public schema (cascade FKs)
-- ============================================================================
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN
    SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
  LOOP
    EXECUTE format('DROP TABLE IF EXISTS public.%I CASCADE', tbl);
  END LOOP;
END;
$$;

-- ============================================================================
-- 8. DROP ALL CUSTOM ENUM TYPES in public schema
-- ============================================================================
DO $$
DECLARE
  t RECORD;
BEGIN
  FOR t IN
    SELECT typname FROM pg_type
    WHERE typnamespace = 'public'::regnamespace
      AND typtype = 'e'  -- enum
  LOOP
    EXECUTE format('DROP TYPE IF EXISTS public.%I CASCADE', t.typname);
  END LOOP;
END;
$$;

-- ============================================================================
-- DONE — database is now clean. Apply 00000000000000_unified_schema.sql next.
-- ============================================================================
