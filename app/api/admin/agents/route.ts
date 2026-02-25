import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
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

export async function PUT(req: NextRequest) {
  const supabase = await createClient()
  try {
    const body = await req.json()
    const { id, ...updates } = body
    const { data, error } = await supabase
      .from('agents')
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
    const { error } = await supabase.from('agents').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ message: 'Agent deleted' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
