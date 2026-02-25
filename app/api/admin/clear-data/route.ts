import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function DELETE(req: NextRequest) {
  try {
    const supabase = await createClient()

    // Verify admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    // Clear test data from tables in order (respecting foreign keys)
    const tables = [
      'enquiry_messages',
      'enquiry_activities',
      'property_views',
      'saved_properties',
      'download_interests',
      'enquiries',
      'property_valuations',
      'customer_questions',
      'analytics_events',
      'notifications',
    ]

    const results: Record<string, string> = {}

    for (const table of tables) {
      const { error } = await supabase
        .from(table as any)
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000') // delete all rows

      results[table] = error ? `Error: ${error.message}` : 'Cleared'
    }

    return NextResponse.json({ message: 'Test data cleared', results })
  } catch (error: any) {
    console.error('Error clearing data:', error)
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 })
  }
}
