import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase-server'

const ALLOWED_COLUMNS = new Set([
  'title', 'bio', 'profile_image', 'profile_images', 'office', 'brokerage',
  'license_no', 'areas', 'specializations', 'languages', 'certifications',
  'experience_years', 'total_sales', 'commission_rate', 'rating', 'review_count',
  'location', 'website_url', 'linkedin_url', 'instagram_handle', 'whatsapp',
  'telegram', 'social', 'approved', 'verified', 'user_id',
  'created_at', 'updated_at',
])

function sanitize(body: Record<string, any>): Record<string, any> {
  const clean: Record<string, any> = {}
  for (const key of Object.keys(body)) {
    if (ALLOWED_COLUMNS.has(key)) clean[key] = body[key]
  }
  return clean
}

export async function GET(req: NextRequest) {
  const supabase = createServiceClient()
  const { searchParams } = new URL(req.url)
  const limit = parseInt(searchParams.get('limit') || '50')
  const offset = parseInt(searchParams.get('offset') || '0')
  const search = searchParams.get('search')

  try {
    let query = supabase.from('agents').select('*', { count: 'exact' })

    if (search) {
      query = query.or(`title.ilike.%${search}%,office.ilike.%${search}%,brokerage.ilike.%${search}%`)
    }

    query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1)

    const { data, error, count } = await query
    if (error) throw error

    return NextResponse.json({ agents: data || [], total: count || 0, limit, offset })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const supabase = createServiceClient()
  try {
    const body = await req.json()
    const clean = sanitize(body)
    const { data, error } = await supabase.from('agents').insert(clean as any).select().single()
    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const supabase = createServiceClient()
  try {
    const body = await req.json()
    const { id, ...updates } = body
    const clean = sanitize(updates)
    clean.updated_at = new Date().toISOString()
    const { data, error } = await supabase
      .from('agents')
      .update(clean)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const supabase = createServiceClient()
  try {
    const { id } = await req.json()
    const { error } = await supabase.from('agents').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ message: 'Agent deleted' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
