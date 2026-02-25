import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data: enquiry, error } = await supabase
      .from('enquiries')
      .select('*, properties(id, title, image_url, price, location), agents(id, title, profile_image)')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 })
      }
      throw error
    }

    // Fetch activities for this enquiry
    const { data: activities } = await supabase
      .from('enquiry_activities')
      .select('*')
      .eq('enquiry_id', id)
      .order('created_at', { ascending: false })

    return NextResponse.json({ data: { ...enquiry, activities: activities || [] } })
  } catch (error: any) {
    console.error('Error fetching enquiry:', error)
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
      .from('enquiries')
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 })
      }
      throw error
    }

    // Log activity
    if (body.status) {
      await supabase.from('enquiry_activities').insert({
        enquiry_id: id,
        activity_type: 'status_change',
        description: `Status changed to ${body.status}`,
      })
    }

    return NextResponse.json({ data, message: 'Enquiry updated successfully' })
  } catch (error: any) {
    console.error('Error updating enquiry:', error)
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
