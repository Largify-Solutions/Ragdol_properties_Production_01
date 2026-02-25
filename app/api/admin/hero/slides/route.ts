import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase-server'

// GET /api/admin/hero/slides — all slides (including inactive) for admin
export async function GET() {
  const db = createServiceClient()

  const { data: settings } = await db
    .from('hero_settings')
    .select('id')
    .eq('is_active', true)
    .maybeSingle()

  if (!settings) return NextResponse.json({ slides: [] })

  const { data: slides, error } = await db
    .from('hero_slides')
    .select('*')
    .eq('hero_setting_id', settings.id)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('[slides GET]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ slides: slides || [] })
}

// POST /api/admin/hero/slides — add a new slide
export async function POST(req: NextRequest) {
  const db = createServiceClient()
  const body = await req.json()
  const { image_url, title, subtitle } = body

  if (!image_url) {
    return NextResponse.json({ error: 'image_url is required' }, { status: 400 })
  }

  // Ensure hero_settings exists; create default if not
  let { data: settings } = await db
    .from('hero_settings')
    .select('id')
    .eq('is_active', true)
    .maybeSingle()

  if (!settings) {
    const { data: newSettings, error: settingsError } = await db
      .from('hero_settings')
      .insert([{
        mode: 'slider',
        heading: 'Find Your Dream Home in Dubai',
        subheading: "Discover luxury properties across Dubai's most prestigious communities.",
        overlay_opacity: 0.55,
        auto_play: true,
        slide_duration: 5000,
        primary_cta_text: 'Explore Properties',
        primary_cta_url: '/properties',
        search_enabled: true,
        is_active: true,
      }])
      .select('id')
      .single()

    if (settingsError) {
      console.error('[slides POST create settings]', settingsError)
      return NextResponse.json({ error: 'Failed to initialise hero settings: ' + settingsError.message }, { status: 500 })
    }
    settings = newSettings
  }

  // Determine next sort_order
  const { count } = await db
    .from('hero_slides')
    .select('*', { count: 'exact', head: true })
    .eq('hero_setting_id', settings!.id)

  const { data, error } = await db
    .from('hero_slides')
    .insert([{
      hero_setting_id: settings!.id,
      image_url,
      title: title || null,
      subtitle: subtitle || null,
      sort_order: count ?? 0,
      is_active: true,
    }])
    .select()
    .single()

  if (error) {
    console.error('[slides POST insert]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ slide: data }, { status: 201 })
}
