import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(req.url)
    const enquiry_id = searchParams.get('enquiry_id')

    if (!enquiry_id) {
      return NextResponse.json({ error: 'enquiry_id is required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('enquiry_messages')
      .select('*, profiles:sender_id(full_name, avatar_url)')
      .eq('enquiry_id', enquiry_id)
      .order('created_at', { ascending: true })

    if (error) throw error

    return NextResponse.json({ data })
  } catch (error: any) {
    console.error('Error fetching enquiry messages:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await req.json()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const messageData = {
      enquiry_id: body.enquiry_id,
      sender_id: user.id,
      sender_type: body.sender_type || 'customer',
      message: body.message,
      message_type: body.message_type || 'text',
      attachments: body.attachments || [],
    }

    const { data, error } = await supabase
      .from('enquiry_messages')
      .insert(messageData)
      .select('*, profiles:sender_id(full_name, avatar_url)')
      .single()

    if (error) throw error

    return NextResponse.json({ data, message: 'Message sent successfully' }, { status: 201 })
  } catch (error: any) {
    console.error('Error sending message:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
