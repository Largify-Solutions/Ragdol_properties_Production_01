import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase-server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createServiceClient()

    const { data, error } = await supabase
      .from('property_valuations')
      .select('*, profiles:user_id(full_name, email, phone)')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Valuation not found' }, { status: 404 })
      }
      throw error
    }

    return NextResponse.json({ data })
  } catch (error: any) {
    console.error('Error fetching valuation:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createServiceClient()
    const body = await req.json()

    const { data: { user } } = await supabase.auth.getUser()

    const updateData: Record<string, any> = {
      ...body,
      updated_at: new Date().toISOString(),
    }

    // If status is being changed to completed, set reviewer info
    if (body.status === 'completed' || body.status === 'in_progress') {
      updateData.reviewed_by = user?.id || null
      updateData.reviewed_at = new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('property_valuations')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Valuation not found' }, { status: 404 })
      }
      throw error
    }

    return NextResponse.json({ data, message: 'Valuation updated successfully' })
  } catch (error: any) {
    console.error('Error updating valuation:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createServiceClient()

    const { error } = await supabase
      .from('property_valuations')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ message: 'Valuation deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting valuation:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
