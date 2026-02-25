import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await req.json()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const profileData = {
      id: user.id,
      email: user.email,
      full_name: body.full_name || null,
      phone: body.phone || null,
      avatar_url: body.avatar_url || null,
      bio: body.bio || null,
      location: body.location || null,
      role: body.role || 'customer',
      preferences: body.preferences || {},
      social_links: body.social_links || {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase
      .from('profiles')
      .upsert(profileData, { onConflict: 'id' })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data, message: 'Profile created successfully' }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating profile:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
