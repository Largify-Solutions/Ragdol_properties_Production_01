import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase-server'

// Use nodejs runtime for larger file handling  
// Body size limit is configured in next.config.ts (50MB)
export const runtime = 'nodejs'
export const maxDuration = 60 // Allow up to 60 seconds for large uploads

/**
 * POST /api/admin/properties/upload-files
 * Uploads property files (images, videos, floorplans, brochures, documents) to Supabase Storage.
 * Body: FormData with `file` (File) and `type` (string: images|videos|floorplans|brochures|documents)
 * Returns: { url: string }
 */
export async function POST(req: NextRequest) {
  const supabase = createServiceClient()
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const type = (formData.get('type') as string) || 'images'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file size
    const maxSize = (type === 'documents' || type === 'brochures') ? 20 * 1024 * 1024 : 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File too large. Maximum size is ${maxSize / (1024 * 1024)}MB.` },
        { status: 400 }
      )
    }

    // Determine bucket and path
    let bucket = 'property-images'
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'bin'
    const safeName = file.name.replace(/[^a-z0-9._-]/gi, '-').replace(/-+/g, '-')
    const filePath = `properties/${type}/${Date.now()}_${safeName}`

    // Use different buckets for different file types
    if (type === 'documents' || type === 'brochures') {
      bucket = 'documents'
    } else if (type === 'videos') {
      bucket = 'hero-media'
    }

    // Convert File to Buffer for upload
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      console.error('Supabase storage error:', { bucket, filePath, mimeType: file.type, error })
      throw error
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path)

    return NextResponse.json({ url: publicUrl })
  } catch (error: any) {
    console.error('Error uploading property file:', error)
    return NextResponse.json(
      { error: error.message || 'Upload failed', details: error.statusCode || error.code },
      { status: 500 }
    )
  }
}
