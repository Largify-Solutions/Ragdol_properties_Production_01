import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// GET /api/admin/hero/slides — all slides (including inactive)
export async function GET() {
  const { data: settings } = await supabaseAdmin
    .from('hero_settings')
    .select('id')
    .eq('is_active', true)
    .single()

  if (!settings) return NextResponse.json({ slides: [] })

  const { data: slides, error } = await supabaseAdmin
    .from('hero_slides')
    .select('*')
    .eq('hero_setting_id', settings.id)
    .order('sort_order', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ slides: slides || [] })
}

// POST /api/admin/hero/slides — add a new slide
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { image_url, title, subtitle } = body

  const { data: settings } = await supabaseAdmin
    .from('hero_settings')
    .select('id')
    .eq('is_active', true)
    .single()

  if (!settings) {
    return NextResponse.json({ error: 'No active hero settings found' }, { status: 404 })
  }

  // Determine next sort order
  const { count } = await supabaseAdmin
    .from('hero_slides')
    .select('*', { count: 'exact', head: true })
    .eq('hero_setting_id', settings.id)

  const { data, error } = await supabaseAdmin
    .from('hero_slides')
    .insert([{
      hero_setting_id: settings.id,
      image_url,
      title: title || null,
      subtitle: subtitle || null,
      sort_order: count ?? 0,
      is_active: true,
    }])
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ slide: data }, { status: 201 })
}
