import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status')
    const offset = (page - 1) * limit

    let query = supabase
      .from('customer_questions')
      .select('*, profiles:user_id(full_name, email)', { count: 'exact' })

    if (status) {
      query = query.eq('status', status)
    }

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
    const supabase = await createClient()
    const body = await req.json()

    const { data: { user } } = await supabase.auth.getUser()

    const questionData = {
      user_id: user?.id || null,
      subject: body.subject,
      message: body.message,
      category: body.category || 'general',
      status: 'pending',
    }

    const { data, error } = await supabase
      .from('customer_questions')
      .insert(questionData)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data, message: 'Question submitted successfully' }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating question:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
