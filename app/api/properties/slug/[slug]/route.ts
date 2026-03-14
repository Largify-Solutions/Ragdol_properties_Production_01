import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const supabase = await createClient()

    // Fetch property by slug with agent details
    const { data, error } = await supabase
      .from('properties')
      .select('*, agents(id, title, profile_image, phone, whatsapp, rating, review_count, user_id, profiles:user_id(full_name, email, avatar_url))')
      .eq('slug', slug)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Property not found' }, { status: 404 })
      }
      throw error
    }

    if (!data) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 })
    }

    // Track property view
    try {
      const { data: { user } } = await supabase.auth.getUser()
      await supabase.from('property_views').insert({
        property_id: data.id,
        user_id: user?.id || null,
        viewed_at: new Date().toISOString(),
      })
    } catch (err) {
      // Silently fail if view tracking fails
    }

    // Increment views count
    try {
      await supabase
        .from('properties')
        .update({
          views_count: (data.views_count || 0) + 1,
          last_viewed: new Date().toISOString(),
        })
        .eq('id', data.id)
    } catch (err) {
      // Silently fail if update fails
    }

    return NextResponse.json({ data })
  } catch (error: any) {
    console.error('Error fetching property by slug:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
