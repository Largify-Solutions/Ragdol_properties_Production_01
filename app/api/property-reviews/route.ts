import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const supabase = await createClient()
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status') || 'pending_review'

  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*, agents(id, title, profile_image, office)')
      .eq('review_status', status)
      .order('created_at', { ascending: false })

    if (error) throw error

    const properties = (data || []).map((prop: any) => ({
      id: prop.id,
      title: prop.title,
      description: prop.description || '',
      type: prop.type,
      category: prop.category_id,
      price: prop.price,
      currency: prop.currency,
      beds: prop.beds,
      baths: prop.baths,
      sqft: prop.sqft,
      address: prop.location || prop.address,
      area: prop.area,
      city: prop.city,
      images: prop.images || [prop.image],
      review_status: prop.review_status,
      submitted_at: prop.created_at,
      created_at: prop.created_at,
      name: prop.agents?.title || 'Agent Submission',
      email: 'agent@ragdol.com',
      user_role: 'agent',
    }))

    return NextResponse.json({ properties, success: true })
  } catch (error: any) {
    console.error('Error fetching property reviews:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  try {
    const { property_id, action } = await req.json()

    const updateData =
      action === 'approve'
        ? { review_status: 'approved', published: true }
        : { review_status: 'rejected', published: false }

    const { error } = await supabase
      .from('properties')
      .update({ ...updateData, updated_at: new Date().toISOString() })
      .eq('id', property_id)

    if (error) throw error

    return NextResponse.json({
      success: true,
      message: `Property ${action === 'approve' ? 'approved' : 'rejected'} successfully`,
    })
  } catch (error: any) {
    console.error('Error updating property review:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
