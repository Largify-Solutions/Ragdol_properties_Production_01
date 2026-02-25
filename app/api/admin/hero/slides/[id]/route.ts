import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// PATCH /api/admin/hero/slides/[id] — update a slide
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await req.json()

  const { data, error } = await supabaseAdmin
    .from('hero_slides')
    .update(body)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ slide: data })
}

// DELETE /api/admin/hero/slides/[id] — delete a slide + its storage file
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  // Get the slide to find its storage path
  const { data: slide } = await supabaseAdmin
    .from('hero_slides')
    .select('image_url')
    .eq('id', id)
    .single()

  // Delete storage file if it's a Supabase storage URL
  if (slide?.image_url) {
    const url = slide.image_url as string
    const storageMarker = '/storage/v1/object/public/hero-media/'
    if (url.includes(storageMarker)) {
      const filePath = url.split(storageMarker)[1]
      await supabaseAdmin.storage.from('hero-media').remove([filePath])
    }
  }

  const { error } = await supabaseAdmin
    .from('hero_slides')
    .delete()
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
