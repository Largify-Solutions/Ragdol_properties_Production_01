import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  try {
    const supabase = createServiceClient()
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status')
    const offset = (page - 1) * limit

    let query = supabase
      .from('property_valuations')
      .select('*, profiles:user_id(full_name, email, phone)', { count: 'exact' })

    if (status) query = query.eq('status', status)

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error

    return NextResponse.json({
      data,
      pagination: { page, limit, total: count || 0, totalPages: Math.ceil((count || 0) / limit) },
    })
  } catch (error: any) {
    console.error('Error fetching valuations:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createServiceClient()
    const body = await req.json()

    const { data, error } = await supabase
      .from('property_valuations')
      .insert({
        user_id: body.user_id || null,
        property_type: body.property_type,
        location: body.location,
        bedrooms: body.bedrooms || null,
        bathrooms: body.bathrooms || null,
        size_sqm: body.size_sqm || null,
        year_built: body.year_built || null,
        condition: body.condition || null,
        additional_features: body.additional_features || null,
        contact_method: body.contact_method || 'email',
        urgency: body.urgency || 'normal',
        status: 'pending',
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data, message: 'Valuation created successfully' }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating valuation:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const supabase = createServiceClient()
    const body = await req.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json({ error: 'Valuation ID is required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('property_valuations')
      .update({ ...updateData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data, message: 'Valuation updated successfully' })
  } catch (error: any) {
    console.error('Error updating valuation:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const supabase = createServiceClient()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Valuation ID is required' }, { status: 400 })
    }

    const { error } = await supabase.from('property_valuations').delete().eq('id', id)
    if (error) throw error

    return NextResponse.json({ message: 'Valuation deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting valuation:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
