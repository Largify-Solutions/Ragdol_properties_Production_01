import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('properties')
      .select('*, agents(id, title, profile_image, phone, whatsapp, rating, review_count, user_id, profiles:user_id(full_name, email))')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Property not found' }, { status: 404 })
      }
      throw error
    }

    // Track view
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('property_views').insert({
      property_id: id,
      user_id: user?.id || null,
      viewed_at: new Date().toISOString(),
    })

    // Increment views_count
    await supabase
      .from('properties')
      .update({
        views_count: (data.views_count || 0) + 1,
        last_viewed: new Date().toISOString(),
      })
      .eq('id', id)

    return NextResponse.json({ data })
  } catch (error: any) {
    console.error('Error fetching property:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const body = await req.json()

    const { data, error } = await supabase
      .from('properties')
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Property not found' }, { status: 404 })
      }
      throw error
    }

    return NextResponse.json({ data, message: 'Property updated successfully' })
  } catch (error: any) {
    console.error('Error updating property:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ message: 'Property deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting property:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
