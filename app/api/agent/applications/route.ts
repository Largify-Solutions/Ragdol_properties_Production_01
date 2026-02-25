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
      .from('enquiries')
      .select('*, properties(id, title)', { count: 'exact' })
      .eq('agent_id', agent?.id || '')

    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1)

    const { data, error, count } = await query
    if (error) throw error

    const applications = (data || []).map((e: any) => ({
      id: e.id,
      name: e.name,
      email: e.email,
      phone: e.phone,
      message: e.message,
      property_title: e.properties?.title || 'Unknown Property',
      property_id: e.property_id,
      status: e.status,
      created_at: e.created_at,
      responded_at: e.responded_at,
    }))

    return NextResponse.json({ applications, total: count || 0, limit, offset })
  } catch (error: any) {
    console.error('Error fetching applications:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  try {
    const body = await req.json()
    const { data, error } = await supabase.from('enquiries').insert(body).select().single()
    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
