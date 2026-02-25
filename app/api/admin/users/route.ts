import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const role = searchParams.get('role')
    const search = searchParams.get('search')
    const offset = (page - 1) * limit

    let query = supabase
      .from('profiles')
      .select('*', { count: 'exact' })

    if (role) query = query.eq('role', role)
    if (search) {
      query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`)
    }

    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error

    return NextResponse.json({
      data,
      pagination: { page, limit, total: count || 0, totalPages: Math.ceil((count || 0) / limit) },
    })
  } catch (error: any) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await req.json()

    // If password is provided, create via Supabase Auth (proper flow)
    if (body.password) {
      const serviceClient = createServiceClient()
      const { data: newUser, error: createError } = await serviceClient.auth.admin.createUser({
        email: body.email,
        password: body.password,
        email_confirm: true,
        user_metadata: {
          full_name: body.full_name || '',
          role: body.role || 'customer',
          phone: body.phone || '',
        },
      })

      if (createError) throw createError

      // Update additional profile fields
      if (newUser.user) {
        await serviceClient.from('profiles').update({
          phone: body.phone || null,
          avatar_url: body.avatar_url || null,
          bio: body.bio || null,
          location: body.location || null,
        }).eq('id', newUser.user.id)
      }

      return NextResponse.json(
        {
          data: { id: newUser.user?.id, email: body.email, full_name: body.full_name, role: body.role },
          message: 'User created successfully'
        },
        { status: 201 }
      )
    }

    // Fallback: update existing profile (no auth user creation)
    const { data, error } = await supabase
      .from('profiles')
      .update({
        full_name: body.full_name,
        phone: body.phone || null,
        avatar_url: body.avatar_url || null,
        role: body.role || 'customer',
        bio: body.bio || null,
        location: body.location || null,
      })
      .eq('id', body.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data, message: 'User updated successfully' }, { status: 200 })
  } catch (error: any) {
    console.error('Error creating user:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await req.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('profiles')
      .update({ ...updateData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data, message: 'User updated successfully' })
  } catch (error: any) {
    console.error('Error updating user:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Delete from auth.users (cascade will delete profile)
    const serviceClient = createServiceClient()
    const { error } = await serviceClient.auth.admin.deleteUser(id)

    if (error) throw error

    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting user:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
