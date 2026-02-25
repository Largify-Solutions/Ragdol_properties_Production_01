import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(req.url)
  const limit = parseInt(searchParams.get('limit') || '10')
  const offset = parseInt(searchParams.get('offset') || '0')
  const search = searchParams.get('search')

  try {
    let query = supabase.from('agents').select('*', { count: 'exact' })

    if (search) {
      query = query.or(`title.ilike.%${search}%,office.ilike.%${search}%,brokerage.ilike.%${search}%`)
    }

    query = query.eq('approved', true)
    query = query.order('rating', { ascending: false })
    query = query.range(offset, offset + limit - 1)

    const { data, error, count } = await query
    if (error) throw error

    return NextResponse.json({
      agents: data || [],
      total: count || 0,
      limit,
      offset,
    })
  } catch (error: any) {
    console.error('Error fetching agents:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  try {
    const body = await req.json()
    const { data, error } = await supabase.from('agents').insert(body).select().single()
    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
