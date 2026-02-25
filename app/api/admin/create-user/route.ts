import { NextRequest, NextResponse } from 'next/server'
import { createClient, createServiceClient } from '@/lib/supabase-server'

/**
 * POST /api/admin/create-user
 * 
 * Creates a new user via Supabase Auth (auth.users) which automatically
 * triggers the handle_new_user() function to create a profiles row.
 * 
 * Required: SUPABASE_SERVICE_ROLE_KEY in env
 * 
 * Body: { email, password, full_name, role, phone? }
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Verify the caller is an admin using cookie-based session client
    const userClient = await createClient()
    const { data: { user: currentUser } } = await userClient.auth.getUser()

    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const serviceClient = createServiceClient()
    const { data: callerProfile } = await serviceClient
      .from('profiles')
      .select('role')
      .eq('id', currentUser.id)
      .single()

    if (!callerProfile || callerProfile.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    // 2. Parse request body
    const body = await req.json()
    const { email, password, full_name, role, phone } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // 3. Create user via Supabase Auth Admin API (requires service role key)
    const { data: newUser, error: createError } = await serviceClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email for admin-created users
      user_metadata: {
        full_name: full_name || '',
        role: role || 'customer',
        phone: phone || '',
      },
    })

    if (createError) {
      console.error('Error creating auth user:', createError)
      return NextResponse.json(
        { error: createError.message },
        { status: 400 }
      )
    }

    // 4. The trigger handle_new_user() auto-creates the profiles row.
    //    Update any additional fields the trigger didn't set.
    if (newUser.user) {
      await serviceClient.from('profiles').update({
        phone: phone || null,
        role: role || 'customer',
      }).eq('id', newUser.user.id)
    }

    // 5. If role is 'agent', also create an agents row linked to the profile
    if (role === 'agent' && newUser.user) {
      await serviceClient.from('agents').insert({
        user_id: newUser.user.id,
        title: full_name || 'New Agent',
        brokerage: 'RAGDOL Properties',
        approved: false,
        verified: false,
        rating: 0,
        review_count: 0,
        experience_years: 0,
      })
    }

    return NextResponse.json(
      {
        data: {
          id: newUser.user?.id,
          email: newUser.user?.email,
          full_name,
          role: role || 'customer',
        },
        message: `User created successfully${role === 'agent' ? ' with agent profile' : ''}`,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Error in create-user API:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
