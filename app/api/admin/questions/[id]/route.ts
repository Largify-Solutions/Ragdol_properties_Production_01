import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase-server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createServiceClient()

    const { data, error } = await supabase
      .from('customer_questions')
      .select('*, profiles:user_id(full_name, email), admin:admin_id(full_name)')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Question not found' }, { status: 404 })
      }
      throw error
    }

    return NextResponse.json({ data })
  } catch (error: any) {
    console.error('Error fetching question:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createServiceClient()
    const body = await req.json()

    const { data: { user } } = await supabase.auth.getUser()

    const updateData: Record<string, any> = {
      ...body,
      updated_at: new Date().toISOString(),
    }

    if (body.admin_response) {
      updateData.admin_id = user?.id || null
      updateData.admin_response_at = new Date().toISOString()
      updateData.status = body.status || 'answered'
    }

    const { data, error } = await supabase
      .from('customer_questions')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Question not found' }, { status: 404 })
      }
      throw error
    }

    return NextResponse.json({ data, message: 'Question updated successfully' })
  } catch (error: any) {
    console.error('Error updating question:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createServiceClient()

    const { error } = await supabase
      .from('customer_questions')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ message: 'Question deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting question:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
