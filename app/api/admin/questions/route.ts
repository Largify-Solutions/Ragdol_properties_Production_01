import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  try {
    const supabase = createServiceClient()
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const offset = (page - 1) * limit

    let query = supabase
      .from('customer_questions')
      .select('*, profiles:user_id(full_name, email), admin:admin_id(full_name)', { count: 'exact' })

    if (status) query = query.eq('status', status)
    if (category) query = query.eq('category', category)

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error

    return NextResponse.json({
      data,
      pagination: { page, limit, total: count || 0, totalPages: Math.ceil((count || 0) / limit) },
    })
  } catch (error: any) {
    console.error('Error fetching questions:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = createServiceClient()
    const body = await req.json()

    const { data, error } = await supabase
      .from('customer_questions')
      .insert({
        user_id: body.user_id || null,
        subject: body.subject,
        message: body.message,
        category: body.category || 'general',
        status: 'pending',
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data, message: 'Question created successfully' }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating question:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const supabase = createServiceClient()
    const body = await req.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json({ error: 'Question ID is required' }, { status: 400 })
    }

    const { data: { user } } = await supabase.auth.getUser()

    // If answering the question, set admin fields
    if (updateData.admin_response) {
      updateData.admin_id = user?.id || null
      updateData.admin_response_at = new Date().toISOString()
      updateData.status = updateData.status || 'answered'
    }

    const { data, error } = await supabase
      .from('customer_questions')
      .update({ ...updateData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data, message: 'Question updated successfully' })
  } catch (error: any) {
    console.error('Error updating question:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
