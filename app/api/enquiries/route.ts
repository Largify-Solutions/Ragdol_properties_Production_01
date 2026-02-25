import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status')
    const agent_id = searchParams.get('agent_id')
    const offset = (page - 1) * limit

    let query = supabase
      .from('enquiries')
      .select('*, properties(id, title, image_url), agents(id, title, profile_image)', { count: 'exact' })

    if (status) query = query.eq('status', status)
    if (agent_id) query = query.eq('agent_id', agent_id)

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error

    return NextResponse.json({
      data,
      pagination: { page, limit, total: count || 0, totalPages: Math.ceil((count || 0) / limit) },
    })
  } catch (error: any) {
    console.error('Error fetching enquiries:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await req.json()

    const { data: { user } } = await supabase.auth.getUser()

    const enquiryData = {
      user_id: user?.id || null,
      agent_id: body.agent_id || null,
      property_id: body.property_id || null,
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      message: body.message || null,
      source: body.source || 'website',
      status: 'new',
      priority: body.priority || 'medium',
      nationality: body.nationality || null,
      budget_min: body.budget_min || null,
      budget_max: body.budget_max || null,
      timeline: body.timeline || null,
      financing_needed: body.financing_needed || false,
    }

    const { data, error } = await supabase
      .from('enquiries')
      .insert(enquiryData)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data, message: 'Enquiry created successfully' }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating enquiry:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await req.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json({ error: 'Enquiry ID is required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('enquiries')
      .update({ ...updateData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data, message: 'Enquiry updated successfully' })
  } catch (error: any) {
    console.error('Error updating enquiry:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Enquiry ID is required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('enquiries')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ message: 'Enquiry deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting enquiry:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
