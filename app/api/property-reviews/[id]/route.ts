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
      .select('id, title, slug, description, price, type, status, property_status, image_url, images, address, area, city, agent_id, verified, published, created_at, updated_at')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Property not found' }, { status: 404 })
      }
      throw error
    }

    return NextResponse.json({ data })
  } catch (error: any) {
    console.error('Error fetching property for review:', error)
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

    const updateData: Record<string, any> = {
      updated_at: new Date().toISOString(),
    }

    if (body.property_status !== undefined) updateData.property_status = body.property_status
    if (body.verified !== undefined) updateData.verified = body.verified
    if (body.published !== undefined) updateData.published = body.published

    const { data, error } = await supabase
      .from('properties')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Property not found' }, { status: 404 })
      }
      throw error
    }

    return NextResponse.json({ data, message: 'Property review status updated successfully' })
  } catch (error: any) {
    console.error('Error updating property review:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
