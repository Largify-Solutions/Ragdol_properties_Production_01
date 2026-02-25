// Supabase Client Configuration
// Re-exports from browser and server clients for compatibility

export { createClient as createBrowserClient, supabase, getServiceRoleClient } from './supabase-browser'
export { createClient as createServerClient } from './supabase-server'

