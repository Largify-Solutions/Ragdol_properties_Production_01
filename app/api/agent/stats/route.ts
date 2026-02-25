import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get agent record
    const { data: agent, error: agentError } = await supabase
      .from('agents')
      .select('id')
      .eq('user_id', user.id)
      .single()

    if (agentError || !agent) {
      return NextResponse.json({ error: 'Agent profile not found' }, { status: 404 })
    }

    // Get properties count
    const { count: totalProperties } = await supabase
      .from('properties')
      .select('*', { count: 'exact', head: true })
      .eq('agent_id', agent.id)

    // Get active listings
    const { count: activeListings } = await supabase
      .from('properties')
      .select('*', { count: 'exact', head: true })
      .eq('agent_id', agent.id)
      .eq('published', true)

    // Get total enquiries
    const { count: totalEnquiries } = await supabase
      .from('enquiries')
      .select('*', { count: 'exact', head: true })
      .eq('agent_id', agent.id)

    // Get new enquiries
    const { count: newEnquiries } = await supabase
      .from('enquiries')
      .select('*', { count: 'exact', head: true })
      .eq('agent_id', agent.id)
      .eq('status', 'new')

    // Get total views across all properties
    const { data: properties } = await supabase
      .from('properties')
      .select('views_count')
      .eq('agent_id', agent.id)

    const totalViews = properties?.reduce((sum, p) => sum + (p.views_count || 0), 0) || 0

    // Get recent enquiries
    const { data: recentEnquiries } = await supabase
      .from('enquiries')
      .select('id, name, email, status, created_at, properties(title)')
      .eq('agent_id', agent.id)
      .order('created_at', { ascending: false })
      .limit(5)

    return NextResponse.json({
      data: {
        totalProperties: totalProperties || 0,
        activeListings: activeListings || 0,
        totalEnquiries: totalEnquiries || 0,
        newEnquiries: newEnquiries || 0,
        totalViews,
        recentEnquiries: recentEnquiries || [],
      },
    })
  } catch (error: any) {
    console.error('Error fetching agent stats:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
