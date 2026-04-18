import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data: propertyData, error: propertyError } = await supabase
      .from('properties')
      .select('*, agents(id, title, profile_image, phone, whatsapp, rating, review_count, user_id, profiles:user_id(full_name, email, avatar_url))')
      .eq('id', id)
      .single()

    if (propertyError && propertyError.code !== 'PGRST116') {
      throw propertyError
    }

    // Fallback: some agent cards are sourced from agent_properties.
    if (propertyError?.code === 'PGRST116' || !propertyData) {
      const { data: agentPropertyData, error: agentPropertyError } = await supabase
        .from('agent_properties')
        .select('*, agents(id, title, profile_image, phone, whatsapp, rating, review_count, user_id, profiles:user_id(full_name, email, avatar_url))')
        .eq('id', id)
        .single()

      if (agentPropertyError) {
        if (agentPropertyError.code === 'PGRST116') {
          return NextResponse.json({ error: 'Property not found' }, { status: 404 })
        }
        throw agentPropertyError
      }

      // Normalize agent_properties shape to match properties detail page expectations.
      const normalizedData = {
        ...agentPropertyData,
        beds: agentPropertyData.beds ?? 0,
        baths: agentPropertyData.bathrooms ?? 0,
        sqft: agentPropertyData.sqft ?? 0,
        property_status: (agentPropertyData as any).property_status ?? 'ready',
        slug: (agentPropertyData as any).slug ?? id,
      }

      return NextResponse.json({ data: normalizedData })
    }

    // Track view (non-blocking)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      await supabase.from('property_views').insert({
        property_id: id,
        user_id: user?.id || null,
        viewed_at: new Date().toISOString(),
      })
    } catch {
      // Ignore tracking failures for public reads.
    }

    // Increment views_count (non-blocking)
    try {
      await supabase
        .from('properties')
        .update({
          views_count: (propertyData.views_count || 0) + 1,
          last_viewed: new Date().toISOString(),
        })
        .eq('id', id)
    } catch {
      // Ignore views_count update failures for public reads.
    }

    return NextResponse.json({ data: propertyData })
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
