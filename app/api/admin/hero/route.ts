import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase-server'

// GET /api/admin/hero — fetch hero settings + ALL slides (including inactive for admin)
export async function GET() {
  const db = createServiceClient()

  const { data: settings, error } = await db
    .from('hero_settings')
    .select('*')
    .eq('is_active', true)
    .maybeSingle()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!settings) {
    return NextResponse.json({ settings: null, slides: [] })
  }

  const { data: slides } = await db
    .from('hero_slides')
    .select('*')
    .eq('hero_setting_id', settings.id)
    .order('sort_order', { ascending: true })

  return NextResponse.json({ settings, slides: slides || [] })
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
