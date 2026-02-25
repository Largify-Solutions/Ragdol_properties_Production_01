import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase-server'

export async function GET() {
  const supabase = createServiceClient()
  try {
    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) throw error
    return NextResponse.json({ partners: data || [] })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const supabase = createServiceClient()
  try {
    const body = await req.json()
    const { data, error } = await supabase
      .from('partners')
      .insert({
        name: body.name,
        description: body.description || null,
        logo_url: body.logo_url || null,
        website_url: body.website_url || null,
        category: body.category || 'partner',
        featured: body.featured ?? false,
        sort_order: body.sort_order ?? 0,
        is_active: body.is_active ?? true,
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ partner: data }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const supabase = createServiceClient()
  try {
    const body = await req.json()
    const { id, ...updates } = body
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const { data, error } = await supabase
      .from('partners')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ partner: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const supabase = createServiceClient()
  try {
    const { searchParams } = new URL(req.url)
    let id = searchParams.get('id')
    if (!id) {
      const body = await req.json().catch(() => ({}))
      id = body.id
    }
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const { error } = await supabase.from('partners').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ message: 'Partner deleted' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
