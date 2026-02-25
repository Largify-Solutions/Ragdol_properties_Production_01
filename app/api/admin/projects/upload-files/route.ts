import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase-server'

/**
 * POST /api/admin/projects/upload-files
 * Uploads a project document/image/video to the appropriate Supabase Storage bucket.
 *
 * Body: FormData
 *   file         File     — the file to upload
 *   type         string   — one of: brochure_en | brochure_ar | fact_sheet | floor_plans |
 *                           masterplan | material_board | one_pager | payment_plan | image | video
 *   project_name string   — used to scope the storage path (e.g. "marina-shores")
 *
 * Response: { url: string }
 */

const BUCKET_MAP: Record<string, { bucket: string; folder: string }> = {
  brochure_en:    { bucket: 'documents',      folder: 'projects/brochures' },
  brochure_ar:    { bucket: 'documents',      folder: 'projects/brochures' },
  fact_sheet:     { bucket: 'documents',      folder: 'projects/fact-sheets' },
  floor_plans:    { bucket: 'documents',      folder: 'projects/floor-plans' },
  masterplan:     { bucket: 'documents',      folder: 'projects/masteplans' },
  material_board: { bucket: 'documents',      folder: 'projects/material-boards' },
  one_pager:      { bucket: 'documents',      folder: 'projects/one-pagers' },
  payment_plan:   { bucket: 'documents',      folder: 'projects/payment-plans' },
  image:          { bucket: 'project-images', folder: 'renders' },
  video:          { bucket: 'hero-media',     folder: 'project-videos' },
}

export async function POST(req: NextRequest) {
  const supabase = createServiceClient()

  try {
    const formData = await req.formData()
    const file        = formData.get('file')         as File   | null
    const type        = (formData.get('type')         as string) || 'image'
    const projectName = (formData.get('project_name') as string) || 'project'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const config     = BUCKET_MAP[type] ?? BUCKET_MAP['image']
    const fileExt    = file.name.split('.').pop()
    const safeName   = projectName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
    // suffix with type suffix to keep brochure_en / brochure_ar distinct
    const typeSuffix = type === 'brochure_en' ? 'EN' : type === 'brochure_ar' ? 'AR' : type
    const fileName   = `${config.folder}/${safeName}/${typeSuffix}-${Date.now()}.${fileExt}`

    const { data, error } = await supabase.storage
      .from(config.bucket)
      .upload(fileName, file, { cacheControl: '3600', upsert: false })

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from(config.bucket)
      .getPublicUrl(data.path)

    return NextResponse.json({ url: publicUrl })
  } catch (error: any) {
    console.error('[project upload]', error)
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 })
  }
}
