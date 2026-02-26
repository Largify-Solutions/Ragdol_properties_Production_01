import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase-server'

export const runtime = 'nodejs'

/**
 * POST /api/admin/signed-upload-url
 * Body: { bucket: string, path: string, contentType: string }
 * Returns: { signedUrl: string, publicUrl: string }
 *
 * The client uses signedUrl to PUT the file directly to Supabase Storage —
 * the file bytes never pass through Vercel, bypassing the 4.5MB function limit.
 */
export async function POST(req: NextRequest) {
  try {
    const { bucket, path, contentType } = await req.json()

    if (!bucket || !path) {
      return NextResponse.json({ error: 'bucket and path are required' }, { status: 400 })
    }

    const supabase = createServiceClient()

    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUploadUrl(path)

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(path)

    return NextResponse.json({ signedUrl: data.signedUrl, token: data.token, path: data.path, publicUrl })
  } catch (error: any) {
    console.error('[signed-upload-url]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
