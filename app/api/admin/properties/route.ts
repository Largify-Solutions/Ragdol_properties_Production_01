import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
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
  const supabase = await createClient()
  try {
    const body = await req.json()
    const { data, error } = await supabase.from('properties').insert(body).select().single()
    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const supabase = await createClient()
  try {
    const body = await req.json()
    const { id, ...updates } = body
    const { data, error } = await supabase
      .from('properties')
      .update({ ...updates, updated_at: new Date().toISOString() })
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
  const supabase = await createClient()
  try {
    const { id } = await req.json()
    const { error } = await supabase.from('properties').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ message: 'Property deleted' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
