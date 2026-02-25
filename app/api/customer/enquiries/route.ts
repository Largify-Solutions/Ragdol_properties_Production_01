import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data, error } = await supabase
      .from('enquiries')
      .select('*, properties(id, title, slug, image, location, price, currency)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({
      enquiries: data || [],
      total: data?.length || 0,
    })
  } catch (error: any) {
    console.error('Error fetching enquiries:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  try {
    const { data: { user } } = await supabase.auth.getUser()
    const body = await req.json()

    const enquiryData = {
      ...body,
      user_id: user?.id || null,
      status: 'pending' as const,
    }

    const { data, error } = await supabase.from('enquiries').insert(enquiryData).select().single()
    if (error) throw error

    return NextResponse.json({ enquiry: data, message: 'Enquiry submitted successfully' }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}