import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  try {
    const { data: { user } } = await supabase.auth.getUser()

    let query = supabase.from('property_valuations').select('*', { count: 'exact' })

    if (user) {
      query = query.eq('user_id', user.id)
    }

    query = query.order('created_at', { ascending: false })

    const { data, error, count } = await query
    if (error) throw error

    return NextResponse.json({
      valuations: data || [],
      total: count || 0,
    })
  } catch (error: any) {
    console.error('Error fetching valuations:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  try {
    const body = await req.json()
    const { full_name, email, phone, message, user_id, type } = body

    if (!full_name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields: full_name, email, phone' },
        { status: 400 },
      )
    }

    const valuationData = {
      property_type: type || 'general',
      location: 'Dubai',
      additional_features: `Name: ${full_name.trim()}, Email: ${email.trim()}, Phone: ${phone.trim()}`,
      valuation_notes: message?.trim() || '',
      status: 'pending' as const,
      user_id: user_id || null,
      contact_method: 'email',
    }

    const { data, error } = await supabase
      .from('property_valuations')
      .insert(valuationData as any)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(
      { ...data, message: 'Valuation request submitted successfully' },
      { status: 201 },
    )
  } catch (error: any) {
    console.error('Error saving valuation:', error)
    return NextResponse.json(
      { error: 'Failed to submit valuation request. Please try again.' },
      { status: 500 },
    )
  }
}