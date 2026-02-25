import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase-server'

// Only these columns exist in the properties table — strip anything else
const ALLOWED_COLUMNS = new Set([
  'title', 'slug', 'description', 'type', 'status', 'property_status',
  'price', 'currency', 'beds', 'baths', 'sqft', 'images', 'image_url',
  'floorplans', 'features', 'amenities', 'address', 'city', 'area',
  'coords', 'published', 'featured', 'agent_id', 'category_id',
  'project_id', 'developer_id', 'furnishing', 'parking_spaces',
  'video_url', 'virtual_tour_url', 'views_count', 'inquiries_count',
  'created_at', 'updated_at', 'seo_title', 'seo_description', 'seo_keywords',
  'district', 'landmark', 'floor_number', 'total_floors', 'built_up_area',
  'plot_size', 'year_built', 'neighborhood', 'location', 'meta_data',
  'short_description', 'premium', 'urgent', 'verified', 'original_price',
  'price_per_sqft', 'favorites_count', 'expires_at', 'last_viewed',
  'title_ar', 'title_fr', 'description_ar', 'description_fr',
])

function sanitize(body: Record<string, any>): Record<string, any> {
  const clean: Record<string, any> = {}
  for (const key of Object.keys(body)) {
    if (ALLOWED_COLUMNS.has(key)) {
      clean[key] = body[key]
    }
  }
  return clean
}

export async function GET(req: NextRequest) {
  const supabase = createServiceClient()
  const { searchParams } = new URL(req.url)
  const limit = parseInt(searchParams.get('limit') || '50')
  const offset = parseInt(searchParams.get('offset') || '0')
  const status = searchParams.get('status')
  const type = searchParams.get('type')
  const search = searchParams.get('search')

  try {
    let query = supabase
      .from('properties')
      .select('*, agents(id, title, profile_image)', { count: 'exact' })

    if (status) query = query.eq('status', status)
    if (type) query = query.eq('type', type)
    if (search) query = query.or(`title.ilike.%${search}%,area.ilike.%${search}%`)

    query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1)

    const { data, error, count } = await query
    if (error) throw error

    return NextResponse.json({ properties: data || [], total: count || 0, limit, offset })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const supabase = createServiceClient()
  try {
    const body = await req.json()
    const clean = sanitize(body)
    const { data, error } = await supabase.from('properties').insert(clean as any).select().single()
    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (error: any) {
    console.error('POST /api/admin/properties error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const supabase = createServiceClient()
  try {
    const body = await req.json()
    const { id, ...rest } = body
    const clean = sanitize(rest)
    clean.updated_at = new Date().toISOString()
    const { data, error } = await supabase
      .from('properties')
      .update(clean)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('PUT /api/admin/properties error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const supabase = createServiceClient()
  try {
    const { id } = await req.json()
    const { error } = await supabase.from('properties').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ message: 'Property deleted' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
