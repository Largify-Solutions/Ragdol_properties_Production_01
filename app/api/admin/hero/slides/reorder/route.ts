import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// POST /api/admin/hero/slides/reorder
// Body: { orderedIds: string[] } — slide IDs in desired order
export async function POST(req: NextRequest) {
  const { orderedIds } = await req.json()

  if (!Array.isArray(orderedIds)) {
    return NextResponse.json({ error: 'orderedIds must be an array' }, { status: 400 })
  }

  // Update sort_order for each slide
  const updates = orderedIds.map((id: string, index: number) =>
    supabaseAdmin
      .from('hero_slides')
      .update({ sort_order: index })
      .eq('id', id)
  )

  await Promise.all(updates)

  return NextResponse.json({ success: true })
}
