import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase-server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createServiceClient()

    const { data: agent, error } = await supabase
      .from('agents')
      .select('*, profiles:user_id(full_name, email, phone, avatar_url, role)')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
      }
      throw error
    }

    // Get properties count for this agent
    const { count: propertiesCount } = await supabase
      .from('properties')
      .select('*', { count: 'exact', head: true })
      .eq('agent_id', id)

    // Get enquiries count
    const { count: enquiriesCount } = await supabase
      .from('enquiries')
      .select('*', { count: 'exact', head: true })
      .eq('agent_id', id)

    return NextResponse.json({
      data: {
        ...agent,
        properties_count: propertiesCount || 0,
        enquiries_count: enquiriesCount || 0,
      },
    })
  } catch (error: any) {
    console.error('Error fetching agent:', error)
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

    const { data, error } = await supabase
      .from('agents')
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Agent not found' }, { status: 404 })
      }
      throw error
    }

    return NextResponse.json({ data, message: 'Agent updated successfully' })
  } catch (error: any) {
    console.error('Error updating agent:', error)
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
      .from('agents')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ message: 'Agent deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting agent:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
