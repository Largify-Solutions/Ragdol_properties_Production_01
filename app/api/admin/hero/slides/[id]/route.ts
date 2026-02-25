import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase-server'

// PATCH /api/admin/hero/slides/[id] — update a slide
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const db = createServiceClient()
  const raw = await req.json()

  // Strip non-updatable fields
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id: _id, hero_setting_id, created_at, updated_at, ...body } = raw

  const { data, error } = await db
    .from('hero_slides')
    .update(body)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('[slide PATCH]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ slide: data })
}

// DELETE /api/admin/hero/slides/[id] — delete slide + remove Storage file
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const db = createServiceClient()

  // Get the slide to find its storage path
  const { data: slide } = await db
    .from('hero_slides')
    .select('image_url')
    .eq('id', id)
    .single()

  // Delete storage file if it belongs to our hero-media bucket
  if (slide?.image_url) {
    const storageMarker = '/storage/v1/object/public/hero-media/'
    if (slide.image_url.includes(storageMarker)) {
      const filePath = slide.image_url.split(storageMarker)[1]
      await db.storage.from('hero-media').remove([filePath])
    }
  }

  const { error } = await db
    .from('hero_slides')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('[slide DELETE]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ success: true })
}
