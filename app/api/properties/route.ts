import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(req.url)
  const limit = parseInt(searchParams.get('limit') || '20')
  const offset = parseInt(searchParams.get('offset') || '0')
  const type = searchParams.get('type')
  const status = searchParams.get('status')
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')
  const area = searchParams.get('area')
  const city = searchParams.get('city')
  const beds = searchParams.get('beds')
  const featured = searchParams.get('featured')
  const search = searchParams.get('search')
  const sort = searchParams.get('sort') || 'created_at'
  const order = searchParams.get('order') || 'desc'

  try {
    let query = supabase.from('properties').select('*, agents(id, title, profile_image)', { count: 'exact' })

    if (type) query = query.eq('type', type)
    if (status) query = query.eq('status', status)
    if (minPrice) query = query.gte('price', parseInt(minPrice))
    if (maxPrice) query = query.lte('price', parseInt(maxPrice))
    if (area) query = query.ilike('area', `%${area}%`)
    if (city) query = query.ilike('city', `%${city}%`)
    if (beds) query = query.eq('beds', parseInt(beds))
    if (featured === 'true') query = query.eq('featured', true)
    if (search) query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%,area.ilike.%${search}%`)

    query = query.eq('published', true)
    query = query.order(sort, { ascending: order === 'asc' })
    query = query.range(offset, offset + limit - 1)

    const { data, error, count } = await query

    if (error) throw error

    return NextResponse.json({
      properties: data || [],
      total: count || 0,
      limit,
      offset,
    })
  } catch (error: any) {
    console.error('Error fetching properties:', error)
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
