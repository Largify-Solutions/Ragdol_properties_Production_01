import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get agent record joined with profile
    const { data: agent, error } = await supabase
      .from('agents')
      .select('*, profiles:user_id(full_name, email, phone, avatar_url, bio, location, role)')
      .eq('user_id', user.id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Agent profile not found' }, { status: 404 })
      }
      throw error
    }

    return NextResponse.json({ data: agent })
  } catch (error: any) {
    console.error('Error fetching agent profile:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()

    // Separate profile fields from agent fields
    const { full_name, email, phone, avatar_url, bio: profileBio, location: profileLocation, ...agentFields } = body

    // Update profile fields if provided
    if (full_name || email || phone || avatar_url || profileBio || profileLocation) {
      const profileUpdate: Record<string, any> = { updated_at: new Date().toISOString() }
      if (full_name !== undefined) profileUpdate.full_name = full_name
      if (phone !== undefined) profileUpdate.phone = phone
      if (avatar_url !== undefined) profileUpdate.avatar_url = avatar_url
      if (profileBio !== undefined) profileUpdate.bio = profileBio
      if (profileLocation !== undefined) profileUpdate.location = profileLocation

      await supabase
        .from('profiles')
        .update(profileUpdate)
        .eq('id', user.id)
    }

    // Update agent fields
    const { data, error } = await supabase
      .from('agents')
      .update({ ...agentFields, updated_at: new Date().toISOString() })
      .eq('user_id', user.id)
      .select('*, profiles:user_id(full_name, email, phone, avatar_url, bio, location, role)')
      .single()

    if (error) throw error

    return NextResponse.json({ data, message: 'Agent profile updated successfully' })
  } catch (error: any) {
    console.error('Error updating agent profile:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
