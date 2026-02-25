import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: 'Schema managed via migrations. Use `supabase db push` or `supabase migration up` to apply schema changes.' })
}

export async function POST(req: NextRequest) {
  return NextResponse.json({ message: 'Schema managed via migrations. Use `supabase db push` or `supabase migration up` to apply schema changes.' })
}
