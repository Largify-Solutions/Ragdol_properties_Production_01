import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  try {
    const supabase = createServiceClient()
    const body = await req.json()

    if (!Array.isArray(body.agents) || body.agents.length === 0) {
      return NextResponse.json({ error: 'agents array is required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('agents')
      .upsert(body.agents, { onConflict: 'id' })
      .select()

    if (error) throw error

    return NextResponse.json({ data, message: `${data.length} agents populated successfully` }, { status: 201 })
  } catch (error: any) {
    console.error('Error populating agents:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
