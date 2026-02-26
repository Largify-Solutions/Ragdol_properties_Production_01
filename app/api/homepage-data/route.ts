import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase-server'

// Server-side fetch — runs close to DB, no browser auth overhead
export async function GET() {
  const supabase = createServiceClient()

  try {
    const [
      featuredResult,
      rentalResult,
      projectVideosResult,
      newProjectsResult,
      partnersResult,
      agentsResult,
      testimonialsResult,
      blogsResult,
    ] = await Promise.all([
      // 1. Featured sale/buy properties
      supabase
        .from('properties')
        .select('id,title,price,status,images,image_url,address,area,city,location,beds,baths,sqft,built_up_area,type,featured')
        .in('status', ['buy', 'sale'])
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(4),

      // 2. Rental properties
      supabase
        .from('properties')
        .select('id,title,price,status,images,image_url,address,area,city,location,beds,baths,sqft,built_up_area,type,featured')
        .eq('status', 'rent')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(4),

      // 3. Project videos
      supabase
        .from('projects')
        .select('id,name,city,area,address,status,hero_image_url,images,video_url,starting_price,min_price')
        .eq('published', true)
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(5),

      // 4. New projects
      supabase
        .from('projects')
        .select('id,name,city,area,address,status,hero_image_url,images,video_url,starting_price,min_price,description,available_units,total_units,developers(name)')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(4),

      // 5. Partners
      supabase
        .from('partners')
        .select('id,name,logo_url,category')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(12),

      // 6. Top agents
      supabase
        .from('agents')
        .select('id,title,bio,experience_years,rating,review_count,total_sales,profile_image,office,license_no,approved,brokerage,languages,areas,verified,user_id,whatsapp,location,specializations,profiles(avatar_url,full_name)')
        .eq('approved', true)
        .order('rating', { ascending: false })
        .limit(4),

      // 7. Testimonials
      supabase
        .from('testimonials')
        .select('id,name,role,company,content,avatar_url,rating,created_at')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(3),

      // 8. Blog posts
      supabase
        .from('posts')
        .select('id,title,created_at,category,featured_image,excerpt,slug')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(4),
    ])

    return NextResponse.json(
      {
        featuredProperties: featuredResult.data || [],
        rentalProperties: rentalResult.data || [],
        projectVideos: projectVideosResult.data || [],
        newProjects: newProjectsResult.data || [],
        partners: partnersResult.data || [],
        agents: agentsResult.data || [],
        testimonials: testimonialsResult.data || [],
        blogPosts: blogsResult.data || [],
      },
      {
        headers: {
          // Cache at CDN/edge for 60 s, stale-while-revalidate for 120 s
          'Cache-Control': 's-maxage=60, stale-while-revalidate=120',
        },
      }
    )
  } catch (error: any) {
    console.error('homepage-data API error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
