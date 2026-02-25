-- =================================================================
-- Supabase Storage Buckets & Policies Fix
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)
-- =================================================================

-- 1. Update the property-images bucket to allow more MIME types
-- (Some browsers/cameras send different MIME types for the same file format)
UPDATE storage.buckets 
SET allowed_mime_types = ARRAY[
  'image/jpeg',
  'image/jpg',  -- Some systems use this non-standard type
  'image/png',
  'image/webp',
  'image/gif',
  'image/heic',  -- iPhone photos
  'image/heif',  -- iPhone photos
  'image/avif'   -- Modern format
]::text[],
file_size_limit = 15728640  -- 15MB to accommodate high-res photos
WHERE id = 'property-images';

-- 2. Update agent-images bucket similarly
UPDATE storage.buckets 
SET allowed_mime_types = ARRAY[
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/heic',
  'image/heif'
]::text[]
WHERE id = 'agent-images';

-- 3. Update project-images bucket
UPDATE storage.buckets 
SET allowed_mime_types = ARRAY[
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/heic',
  'image/heif',
  'image/avif'
]::text[]
WHERE id = 'project-images';

-- 4. Update documents bucket to support more document types
UPDATE storage.buckets 
SET allowed_mime_types = ARRAY[
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
  'text/csv',
  'image/jpeg',  -- For brochures with embedded images
  'image/png'
]::text[]
WHERE id = 'documents';

-- 5. Create storage policies for service role access (if not exists)
-- Allow service role to do everything on all buckets

-- property-images policies
DO $$
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Service role can upload property images" ON storage.objects;
  DROP POLICY IF EXISTS "Public can view property images" ON storage.objects;
  DROP POLICY IF EXISTS "Service role can delete property images" ON storage.objects;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;

-- Policy: Service role can upload to property-images
CREATE POLICY "Service role can upload property images"
ON storage.objects
FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'property-images');

-- Policy: Anyone can view property-images (public bucket)
CREATE POLICY "Public can view property images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'property-images');

-- Policy: Service role can delete from property-images
CREATE POLICY "Service role can delete property images"
ON storage.objects
FOR DELETE
TO service_role
USING (bucket_id = 'property-images');

-- Policy: Service role can update property-images
CREATE POLICY "Service role can update property images"
ON storage.objects
FOR UPDATE
TO service_role
USING (bucket_id = 'property-images');

-- 6. Same policies for agent-images
DO $$
BEGIN
  DROP POLICY IF EXISTS "Service role can upload agent images" ON storage.objects;
  DROP POLICY IF EXISTS "Public can view agent images" ON storage.objects;
  DROP POLICY IF EXISTS "Service role can delete agent images" ON storage.objects;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;

CREATE POLICY "Service role can upload agent images"
ON storage.objects FOR INSERT TO service_role
WITH CHECK (bucket_id = 'agent-images');

CREATE POLICY "Public can view agent images"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'agent-images');

CREATE POLICY "Service role can delete agent images"
ON storage.objects FOR DELETE TO service_role
USING (bucket_id = 'agent-images');

-- 7. Same policies for documents
DO $$
BEGIN
  DROP POLICY IF EXISTS "Service role can upload documents" ON storage.objects;
  DROP POLICY IF EXISTS "Service role can view documents" ON storage.objects;
  DROP POLICY IF EXISTS "Service role can delete documents" ON storage.objects;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;

CREATE POLICY "Service role can upload documents"
ON storage.objects FOR INSERT TO service_role
WITH CHECK (bucket_id = 'documents');

CREATE POLICY "Service role can view documents"
ON storage.objects FOR SELECT TO service_role
USING (bucket_id = 'documents');

CREATE POLICY "Service role can delete documents"
ON storage.objects FOR DELETE TO service_role
USING (bucket_id = 'documents');

-- 8. Same policies for hero-media
DO $$
BEGIN
  DROP POLICY IF EXISTS "Service role can upload hero media" ON storage.objects;
  DROP POLICY IF EXISTS "Public can view hero media" ON storage.objects;
  DROP POLICY IF EXISTS "Service role can delete hero media" ON storage.objects;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;

CREATE POLICY "Service role can upload hero media"
ON storage.objects FOR INSERT TO service_role
WITH CHECK (bucket_id = 'hero-media');

CREATE POLICY "Public can view hero media"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'hero-media');

CREATE POLICY "Service role can delete hero media"
ON storage.objects FOR DELETE TO service_role
USING (bucket_id = 'hero-media');

-- 9. Verify the changes
SELECT id, name, public, file_size_limit, allowed_mime_types 
FROM storage.buckets 
ORDER BY name;
