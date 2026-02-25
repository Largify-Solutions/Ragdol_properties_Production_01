import { createBrowserClient } from '@supabase/ssr'
import { Database } from './database.types'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    '⚠️ Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
  )
}

// Singleton browser client
let browserClient: ReturnType<typeof createBrowserClient<Database>> | null = null

export function createClient() {
  if (browserClient) return browserClient

  browserClient = createBrowserClient<Database>(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  )

  return browserClient
}

// Convenience export for backward compatibility
export const supabase = createClient()

// Service role client for admin operations (server-only)
export function getServiceRoleClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  if (!serviceKey) {
    console.warn('⚠️ Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
  }
  const { createClient: createServiceClient } = require('@supabase/supabase-js') as { createClient: typeof import('@supabase/supabase-js').createClient }
  return createServiceClient<Database>(
    SUPABASE_URL,
    serviceKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}
