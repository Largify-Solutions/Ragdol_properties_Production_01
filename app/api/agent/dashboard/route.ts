import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Get agent record
    const { data: agent } = await supabase
      .from('agents')
      .select('id')
      .eq('user_id', user.id)
      .single()

    const agentId = agent?.id || ''

    // Parallel stat queries
    const [propertiesRes, activeRes, enquiriesRes, pendingEnqRes] = await Promise.all([
      supabase.from('properties').select('id', { count: 'exact', head: true }).eq('agent_id', agentId),
      supabase.from('properties').select('id', { count: 'exact', head: true }).eq('agent_id', agentId).eq('status', 'active'),
      supabase.from('enquiries').select('id', { count: 'exact', head: true }).eq('agent_id', agentId),
      supabase.from('enquiries').select('id', { count: 'exact', head: true }).eq('agent_id', agentId).eq('status', 'new' as any),
    ])

    // Recent properties
    const { data: recentProperties } = await supabase
      .from('properties')
      .select('id, title, status, created_at, price')
      .eq('agent_id', agentId)
      .order('created_at', { ascending: false })
      .limit(5)

    // Recent enquiries
    const { data: recentEnquiries } = await supabase
      .from('enquiries')
      .select('id, name, email, status, created_at, properties(title)')
      .eq('agent_id', agentId)
      .order('created_at', { ascending: false })
      .limit(5)

    return NextResponse.json({
      stats: {
        totalProperties: propertiesRes.count || 0,
        activeProperties: activeRes.count || 0,
        totalEnquiries: enquiriesRes.count || 0,
        pendingEnquiries: pendingEnqRes.count || 0,
      },
      recentProperties: recentProperties || [],
      recentEnquiries: (recentEnquiries || []).map((e: any) => ({
        ...e,
        property_title: e.properties?.title || 'Unknown Property',
      })),
    })
  } catch (error: any) {
    console.error('Error fetching agent dashboard:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}