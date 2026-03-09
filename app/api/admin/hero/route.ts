import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase-server'

// GET /api/admin/hero — fetch hero settings + ALL slides (including inactive for admin)
export async function GET() {
  const db = createServiceClient()

  // Fetch settings and slides in parallel
  const [settingsResult, allSlidesResult] = await Promise.all([
    db.from('hero_settings').select('*').eq('is_active', true).maybeSingle(),
    db.from('hero_slides').select('*').order('sort_order', { ascending: true }),
  ])

  if (settingsResult.error) {
    return NextResponse.json({ error: settingsResult.error.message }, { status: 500 })
  }

  const settings = settingsResult.data
  if (!settings) {
    return NextResponse.json({ settings: null, slides: [] }, {
      headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=120' },
    })
  }

  // Filter slides by the active setting
  const slides = (allSlidesResult.data || []).filter(
    (s: any) => s.hero_setting_id === settings.id
  )

  return NextResponse.json({ settings, slides }, {
    headers: { 'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=120' },
  })
}

// PATCH /api/admin/hero — create or update hero settings
export async function PATCH(req: NextRequest) {
  const db = createServiceClient()
  const raw = await req.json()

  // Strip non-updatable fields
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, created_at, updated_at, ...body } = raw

  // Get existing active settings
  const { data: existing } = await db
    .from('hero_settings')
    .select('id')
    .eq('is_active', true)
    .maybeSingle()

  if (!existing) {
    // No settings yet — insert defaults + any provided values
    const { data, error } = await db
      .from('hero_settings')
      .insert([{ ...body, is_active: true }])
      .select()
      .single()
    if (error) {
      console.error('[hero PATCH insert]', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ settings: data })
  }

  const { data, error } = await db
    .from('hero_settings')
    .update(body)
    .eq('id', existing.id)
    .select()
    .single()

  if (error) {
    console.error('[hero PATCH update]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ settings: data })
}
