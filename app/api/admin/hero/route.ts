import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// GET /api/admin/hero — fetch hero settings + slides
export async function GET() {
  const { data: settings, error } = await supabaseAdmin
    .from('hero_settings')
    .select('*')
    .eq('is_active', true)
    .single()

  if (error && error.code !== 'PGRST116') {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!settings) {
    return NextResponse.json({ settings: null, slides: [] })
  }

  const { data: slides } = await supabaseAdmin
    .from('hero_slides')
    .select('*')
    .eq('hero_setting_id', settings.id)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  return NextResponse.json({ settings, slides: slides || [] })
}

// PATCH /api/admin/hero — update hero settings
export async function PATCH(req: NextRequest) {
  const body = await req.json()

  // Get existing active settings
  const { data: existing } = await supabaseAdmin
    .from('hero_settings')
    .select('id')
    .eq('is_active', true)
    .single()

  if (!existing) {
    // Create new settings if none exist
    const { data, error } = await supabaseAdmin
      .from('hero_settings')
      .insert([{ ...body, is_active: true }])
      .select()
      .single()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ settings: data })
  }

  const { data, error } = await supabaseAdmin
    .from('hero_settings')
    .update(body)
    .eq('id', existing.id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ settings: data })
}
