import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase-server'

/**
 * POST /api/admin/agents/upload-image
 * Uploads an agent profile image to the agent-images storage bucket.
 * Body: FormData with `file` (File) and optional `agent_name` (string)
 */
export async function POST(req: NextRequest) {
  const supabase = createServiceClient()
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const agentName = (formData.get('agent_name') as string) || 'agent'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const fileExt = file.name.split('.').pop()
    const safeName = agentName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
    const fileName = `${safeName}-${Date.now()}.${fileExt}`

    const { data, error } = await supabase.storage
      .from('agent-images')
      .upload(fileName, file, { cacheControl: '3600', upsert: false })

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage.from('agent-images').getPublicUrl(data.path)

    return NextResponse.json({ url: publicUrl })
  } catch (error: any) {
    console.error('Error uploading agent image:', error)
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 })
  }
}
