import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  try {
    const { id } = await params
    const { data, error } = await supabase
      .from('projects')
      .select('*, developers(name)')
      .eq('id', id)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json({ project: data })
  } catch (error: any) {
    console.error('Error fetching project:', error)
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  try {
    const { id } = await params
    const body = await request.json()

    const { data, error } = await supabase
      .from('projects')
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ project: data, message: 'Project updated successfully' })
  } catch (error: any) {
    console.error('Error updating project:', error)
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  try {
    const { id } = await params
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) throw error

    return NextResponse.json({ message: 'Project deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting project:', error)
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}