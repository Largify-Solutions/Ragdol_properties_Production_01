import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase-server'

// POST /api/admin/hero/slides/reorder
// Body: { orderedIds: string[] } — slide IDs in desired order
export async function POST(req: NextRequest) {
  const { orderedIds } = await req.json()

  if (!Array.isArray(orderedIds)) {
    return NextResponse.json({ error: 'orderedIds must be an array' }, { status: 400 })
  }

  const db = createServiceClient()

  const updates = orderedIds.map((id: string, index: number) =>
    db
      .from('hero_slides')
      .update({ sort_order: index })
      .eq('id', id)
  )

  await Promise.all(updates)

  return NextResponse.json({ success: true })
}
