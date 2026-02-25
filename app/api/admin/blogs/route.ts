import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase-server'

const ALLOWED_COLUMNS = new Set([
  'title', 'content', 'excerpt', 'featured_image', 'images', 'category',
  'tags', 'status', 'author_id', 'published_at', 'seo_title',
  'seo_description', 'seo_keywords', 'created_at', 'updated_at',
  'views_count', 'likes_count', 'comments_count',
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
  const limit = parseInt(searchParams.get('limit') || '100')
  const status = searchParams.get('status')

  try {
    let query = supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(limit)

    if (status) query = query.eq('status', status)

    const { data, error, count } = await query
    if (error) throw error

    return NextResponse.json({ blogs: data || [], total: count || 0 })
  } catch (error: any) {
    console.error('[admin/blogs GET]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const supabase = createServiceClient()
  try {
    const body = await req.json()
    const clean = sanitize(body)
    const { data, error } = await supabase.from('posts').insert(clean as any).select().single()
    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (error: any) {
    console.error('[admin/blogs POST]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const supabase = createServiceClient()
  try {
    const body = await req.json()
    const { id, ...updates } = body
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

    const clean = sanitize(updates)
    clean.updated_at = new Date().toISOString()
    const { data, error } = await supabase
      .from('posts')
      .update(clean)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('[admin/blogs PUT]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const supabase = createServiceClient()
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

    const { error } = await supabase.from('posts').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('[admin/blogs DELETE]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
