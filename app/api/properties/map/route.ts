import { createClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'all'
    const area = searchParams.get('area')
    const limit = parseInt(searchParams.get('limit') || '100')

    const supabase = await createClient()

    let query = supabase.from('properties').select('*')

    // Filter by area if provided
    if (area) {
      query = query.ilike('location', `%${area}%`)
    }

    // Add limit
    query = query.limit(limit)

    const { data, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch properties', details: error.message },
        { status: 500 }
      )
    }

    // Organize properties by area
    const propertiesByArea = data?.reduce((acc: any, property: any) => {
      const location = property.location || 'Unknown'
      if (!acc[location]) {
        acc[location] = []
      }
      acc[location].push(property)
      return acc
    }, {}) || {}

    // Calculate area statistics
    const areaStats = Object.entries(propertiesByArea).map(([location, props]: [string, any]) => {
      const properties = props as any[]
      const avgPrice = properties.reduce((sum, p) => sum + (p.price_per_sqft || 0), 0) / properties.length
      const underConstruction = properties.filter(p => p.status === 'under_construction').length
      
      return {
        area: location,
        totalProperties: properties.length,
        avgPriceSqft: Math.round(avgPrice),
        unitsUnderConstruction: underConstruction,
        properties: properties.slice(0, 5) // Latest 5 for preview
      }
    })

    return NextResponse.json(
      {
        success: true,
        properties: data || [],
        areaStats,
        total: data?.length || 0,
        timestamp: new Date().toISOString()
      },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0'
        }
      }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
