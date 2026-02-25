import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data, error } = await supabase
      .from('saved_properties')
      .select('*, properties(id, title, slug, type, status, price, currency, beds, baths, sqft, image, location, area, city, featured)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({
      savedProperties: data || [],
      total: data?.length || 0,
    })
  } catch (error: any) {
    console.error('Error fetching saved properties:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { property_id } = await req.json()
    const { data, error } = await supabase
      .from('saved_properties')
      .insert({ user_id: user.id, property_id })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const supabase = await createClient()
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { property_id } = await req.json()
    const { error } = await supabase
      .from('saved_properties')
      .delete()
      .eq('user_id', user.id)
      .eq('property_id', property_id)

    if (error) throw error
    return NextResponse.json({ message: 'Property unsaved' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}