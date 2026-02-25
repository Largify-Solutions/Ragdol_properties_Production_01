import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  const supabase = createServiceClient()
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    let query = supabase.from('projects').select('*, developers(name)', { count: 'exact' })

    if (status) query = query.eq('status', status)
    if (search) query = query.or(`name.ilike.%${search}%,area.ilike.%${search}%,city.ilike.%${search}%`)

    query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1)

    const { data, error, count } = await query
    if (error) throw error

    return NextResponse.json({ projects: data || [], total: count || 0, limit, offset })
  } catch (error: any) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const supabase = createServiceClient()
  try {
    const body = await request.json()

    const projectData = {
      name: body.name,
      slug: body.name?.toLowerCase().replace(/\s+/g, '-'),
      status: body.status || 'planned',
      developer_id: body.developer_id || null,
      city: body.city || 'Dubai',
      area: body.area,
      district: body.district,
      address: body.address,
      hero_image_url: body.hero_image_url,
      description: body.description,
      starting_price: body.starting_price,
      min_price: body.min_price,
      max_price: body.max_price,
      currency: body.currency || 'AED',
      total_units: body.total_units,
      available_units: body.available_units,
      amenities: body.amenities || [],
      facilities: body.facilities || [],
      property_types: body.property_types || [],
      featured: body.featured || false,
      published: body.published || false,
      launch_date: body.launch_date,
      completion_date: body.completion_date,
      handover_date: body.handover_date,
      payment_plan: body.payment_plan,
      payment_terms: body.payment_terms,
      brochure_url: body.brochure_url,
      video_url: body.video_url,
      images: body.images || [],
      seo_title: body.seo_title,
      seo_description: body.seo_description,
      seo_keywords: body.seo_keywords || [],
      coords: body.coords,
    }

    const { data, error } = await supabase.from('projects').insert(projectData).select().single()
    if (error) throw error

    return NextResponse.json({ project: data, message: 'Project created successfully' }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating project:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}