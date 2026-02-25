import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase-server'

/**
 * POST /api/admin/partners/upload-logo
 * Uploads a partner logo to the documents storage bucket.
 * Body: FormData with `file` (File) and optional `partner_name` (string)
 */
export async function POST(req: NextRequest) {
  const supabase = createServiceClient()
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const partnerName = (formData.get('partner_name') as string) || 'partner'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const fileExt = file.name.split('.').pop()
    const safeName = partnerName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
    const fileName = `${safeName}-${Date.now()}.${fileExt}`

    const { data, error } = await supabase.storage
      .from('logos')
      .upload(fileName, file, { cacheControl: '3600', upsert: false })

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage.from('logos').getPublicUrl(data.path)

    return NextResponse.json({ url: publicUrl })
  } catch (error: any) {
    console.error('Error uploading partner logo:', error)
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 })
  }
}
