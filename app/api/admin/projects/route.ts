import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  const supabase = createServiceClient()
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    let query = supabase.from('projects').select('*, developers(name)', { count: 'exact' })

    if (status) query = query.eq('status', status)
    if (search) query = query.or(`name.ilike.%${search}%,area.ilike.%${search}%,city.ilike.%${search}%`)

    query = query.order('created_at', { ascending: false }).range(offset, offset + limit - 1)

    const { data, error, count } = await query
    if (error) throw error

    return NextResponse.json({ projects: data || [], total: count || 0, limit, offset })
  } catch (error: any) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const supabase = createServiceClient()
  try {
    const contentType = request.headers.get('content-type') || ''
    let body: Record<string, any> = {}
    let imageFiles: File[] = []
    let brochureEnFile: File | null = null
    let brochureArFile: File | null = null
    let factSheetFile: File | null = null
    let floorPlansFile: File | null = null
    let floorPlanImageFiles: File[] = []
    let masterplanFile: File | null = null
    let materialBoardFile: File | null = null
    let onePagerFile: File | null = null
    let paymentPlanFile: File | null = null
    let videoFilesList: File[] = []

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData()
      
      // Extract form fields
      formData.forEach((value, key) => {
        if (key === 'images' && value instanceof File) {
          imageFiles.push(value)
        } else if (key === 'brochure_en_file' && value instanceof File) {
          brochureEnFile = value
        } else if (key === 'brochure_ar_file' && value instanceof File) {
          brochureArFile = value
        } else if (key === 'fact_sheet_file' && value instanceof File) {
          factSheetFile = value
        } else if (key === 'floor_plans_file' && value instanceof File) {
          floorPlansFile = value
        } else if (key === 'floor_plan_images' && value instanceof File) {
          floorPlanImageFiles.push(value)
        } else if (key === 'masterplan_file' && value instanceof File) {
          masterplanFile = value
        } else if (key === 'material_board_file' && value instanceof File) {
          materialBoardFile = value
        } else if (key === 'one_pager_file' && value instanceof File) {
          onePagerFile = value
        } else if (key === 'payment_plan_file' && value instanceof File) {
          paymentPlanFile = value
        } else if (key === 'video_files' && value instanceof File) {
          videoFilesList.push(value)
        } else if (typeof value === 'string') {
          try {
            body[key] = JSON.parse(value)
          } catch {
            body[key] = value
          }
        }
      })
    } else {
      body = await request.json()
    }

    // Generate slug from name
    const slug = body.slug || body.name?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

    // Upload files to storage
    const uploadedImageUrls: string[] = []
    const uploadedFloorPlanUrls: string[] = []
    const uploadedVideoUrls: string[] = []
    let brochureEnUrl = body.brochure_en_url || null
    let brochureArUrl = body.brochure_ar_url || null
    let factSheetUrl = body.fact_sheet_url || null
    let floorPlansUrl = body.floor_plans_url || null
    let masterplanUrl = body.masterplan_url || null
    let materialBoardUrl = body.material_board_url || null
    let onePagerUrl = body.one_pager_url || null
    let paymentPlanUrl = body.payment_plan_url || null

    // Upload project images
    for (const file of imageFiles) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${slug}/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(fileName, file, { cacheControl: '3600', upsert: false })
      
      if (!uploadError && uploadData) {
        const { data: { publicUrl } } = supabase.storage.from('project-images').getPublicUrl(uploadData.path)
        uploadedImageUrls.push(publicUrl)
      }
    }

    // Upload document files
    const uploadDocument = async (file: File | null, folder: string): Promise<string | null> => {
      if (!file) return null
      const fileExt = file.name.split('.').pop()
      const fileName = `${slug}/${folder}/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, file, { cacheControl: '3600', upsert: false })
      
      if (!uploadError && uploadData) {
        const { data: { publicUrl } } = supabase.storage.from('documents').getPublicUrl(uploadData.path)
        return publicUrl
      }
      return null
    }

    // Upload all document files
    brochureEnUrl = (await uploadDocument(brochureEnFile, 'brochures')) || brochureEnUrl
    brochureArUrl = (await uploadDocument(brochureArFile, 'brochures')) || brochureArUrl
    factSheetUrl = (await uploadDocument(factSheetFile, 'fact-sheets')) || factSheetUrl
    floorPlansUrl = (await uploadDocument(floorPlansFile, 'floor-plans')) || floorPlansUrl
    masterplanUrl = (await uploadDocument(masterplanFile, 'masterplans')) || masterplanUrl
    materialBoardUrl = (await uploadDocument(materialBoardFile, 'material-boards')) || materialBoardUrl
    onePagerUrl = (await uploadDocument(onePagerFile, 'one-pagers')) || onePagerUrl
    paymentPlanUrl = (await uploadDocument(paymentPlanFile, 'payment-plans')) || paymentPlanUrl

    // Upload floor plan images
    for (const file of floorPlanImageFiles) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${slug}/floor-plans/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(fileName, file, { cacheControl: '3600', upsert: false })
      
      if (!uploadError && uploadData) {
        const { data: { publicUrl } } = supabase.storage.from('project-images').getPublicUrl(uploadData.path)
        uploadedFloorPlanUrls.push(publicUrl)
      }
    }

    // Upload video files
    for (const file of videoFilesList) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${slug}/videos/${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('hero-media')
        .upload(fileName, file, { cacheControl: '3600', upsert: false })
      
      if (!uploadError && uploadData) {
        const { data: { publicUrl } } = supabase.storage.from('hero-media').getPublicUrl(uploadData.path)
        uploadedVideoUrls.push(publicUrl)
      }
    }

    const projectData = {
      name: body.name,
      slug: slug,
      status: body.status || 'planned',
      developer_id: body.developer_id || null,
      city: body.city || 'Dubai',
      area: body.area,
      district: body.district,
      address: body.address,
      hero_image_url: body.hero_image_url,
      description: body.description,
      starting_price: body.starting_price,
      min_price: body.min_price,
      max_price: body.max_price,
      currency: body.currency || 'AED',
      total_units: body.total_units,
      available_units: body.available_units,
      sold_units: body.sold_units,
      amenities: body.amenities || [],
      facilities: body.facilities || [],
      property_types: body.property_types || [],
      featured: body.featured || false,
      published: body.published || false,
      launch_date: body.launch_date,
      completion_date: body.completion_date,
      handover_date: body.handover_date,
      payment_plan: body.payment_plan,
      payment_terms: body.payment_terms,
      brochure_url: body.brochure_url,
      video_url: body.video_url,
      images: uploadedImageUrls.length > 0 ? uploadedImageUrls : (body.images || []),
      videos: uploadedVideoUrls.length > 0 ? uploadedVideoUrls : (body.videos || []),
      brochure_en_url: brochureEnUrl,
      brochure_ar_url: brochureArUrl,
      fact_sheet_url: factSheetUrl,
      floor_plans_url: floorPlansUrl,
      floor_plans: uploadedFloorPlanUrls.length > 0 ? uploadedFloorPlanUrls : (body.floor_plans || []),
      masterplan_url: masterplanUrl,
      material_board_url: materialBoardUrl,
      one_pager_url: onePagerUrl,
      payment_plan_url: paymentPlanUrl,
      documents: body.documents || [],
      seo_title: body.seo_title,
      seo_description: body.seo_description,
      seo_keywords: body.seo_keywords || [],
      coords: body.coords,
      inquiries_count: body.inquiries_count ?? 0,
      views_count: body.views_count ?? 0,
      created_at: body.created_at || new Date().toISOString(),
    }

    const { data, error } = await supabase.from('projects').insert(projectData).select().single()
    if (error) throw error

    return NextResponse.json({ project: data, message: 'Project created successfully' }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating project:', error)
    return NextResponse.json({ error: error.message || 'Failed to create project', details: error.details || error.hint || null }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const supabase = createServiceClient()
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('projects')
      .update({ ...updateData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ project: data, message: 'Project updated successfully' })
  } catch (error: any) {
    console.error('Error updating project:', error)
    return NextResponse.json({ error: error.message || 'Failed to update project', details: error.details || error.hint || null }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const supabase = createServiceClient()
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 })
    }

    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) throw error

    return NextResponse.json({ message: 'Project deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting project:', error)
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}