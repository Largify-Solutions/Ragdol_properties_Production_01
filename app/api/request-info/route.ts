import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase-server'

const ALLOWED_COLUMNS = new Set([
  'name', 'email', 'phone', 'message', 'property_id', 'property_type',
  'property_title', 'agent_id', 'source', 'status', 'created_at', 'updated_at',
])

function sanitize(body: Record<string, any>): Record<string, any> {
  const clean: Record<string, any> = {}
  for (const key of Object.keys(body)) {
    if (ALLOWED_COLUMNS.has(key)) clean[key] = body[key]
  }
  return clean
}

export async function POST(req: NextRequest) {
  const supabase = createServiceClient()
  try {
    const body = await req.json()

    // Basic validation
    if (!body.name?.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }
    if (!body.email?.trim()) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const clean = sanitize(body)
    clean.status = clean.status || 'new'
    clean.created_at = new Date().toISOString()
    clean.updated_at = new Date().toISOString()

    const { data, error } = await supabase
      .from('request_information')
      .insert(clean as any)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (error: any) {
    console.error('[api/request-info POST]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
