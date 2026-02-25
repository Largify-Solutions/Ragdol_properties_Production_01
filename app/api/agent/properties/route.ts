import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(req.url)
  const limit = parseInt(searchParams.get('limit') || '20')
  const offset = parseInt(searchParams.get('offset') || '0')
  const status = searchParams.get('status')

  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: agent } = await supabase
      .from('agents')
      .select('id')
      .eq('user_id', user.id)
      .single()

    let query = supabase
      .from('properties')
      .select('*', { count: 'exact' })
      .eq('agent_id', agent?.id || '')

    if (status === 'published') query = query.eq('published', true)
    else if (status) query = query.eq('status', status)

    query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1)

    const { data, error, count } = await query
    if (error) throw error

    return NextResponse.json({ properties: data || [], total: count || 0, limit, offset })
  } catch (error: any) {
    console.error('Error fetching agent properties:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: agent } = await supabase
      .from('agents')
      .select('id')
      .eq('user_id', user.id)
      .single()

    const body = await req.json()
    const propertyData = {
      ...body,
      agent_id: agent?.id || null,
      review_status: body.review_status || 'pending_review',
      published: body.published || false,
    }

    const { data, error } = await supabase.from('properties').insert(propertyData).select().single()
    if (error) throw error

    return NextResponse.json(data, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
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
    return NextResponse.json({ success: true, data })
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
