import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = await createClient()

    // Fetch all published properties with the fields we need for aggregation
    const [propertiesResult, projectsResult] = await Promise.all([
      supabase
        .from('properties')
        .select('id, area, city, type, status, property_status, price, price_per_sqft, sqft, beds, baths, views_count, created_at, published, furnishing')
        .eq('published', true),
      supabase
        .from('projects')
        .select('id, area, city, status, min_price, max_price, starting_price, total_units, available_units, sold_units, created_at, published, property_types')
        .eq('published', true),
    ])

    const properties = propertiesResult.data || []
    const projects = projectsResult.data || []

    // ── Total counts ──────────────────────────────────────────────
    const totalListings = properties.length
    const forSale = properties.filter(p => p.status === 'sale').length
    const forRent = properties.filter(p => p.status === 'rent').length
    const offPlan = properties.filter(p => p.property_status === 'off-plan').length
    const ready = properties.filter(p => p.property_status === 'ready').length
    const totalProjects = projects.length

    // ── Price stats ───────────────────────────────────────────────
    const pricesWithValues = properties.filter(p => p.price > 0)
    const avgPrice = pricesWithValues.length
      ? Math.round(pricesWithValues.reduce((sum, p) => sum + p.price, 0) / pricesWithValues.length)
      : 0
    const avgPricePerSqft = properties.filter(p => p.price_per_sqft && p.price_per_sqft > 0).length
      ? Math.round(
          properties.filter(p => p.price_per_sqft && p.price_per_sqft > 0)
            .reduce((sum, p) => sum + (p.price_per_sqft || 0), 0) /
          properties.filter(p => p.price_per_sqft && p.price_per_sqft > 0).length
        )
      : 0

    // ── By area ───────────────────────────────────────────────────
    const areaMap: Record<string, { count: number; totalPrice: number; totalPricePerSqft: number; ppsqftCount: number; totalViews: number }> = {}
    for (const p of properties) {
      const area = p.area || p.city || 'Other'
      if (!areaMap[area]) areaMap[area] = { count: 0, totalPrice: 0, totalPricePerSqft: 0, ppsqftCount: 0, totalViews: 0 }
      areaMap[area].count++
      if (p.price > 0) areaMap[area].totalPrice += p.price
      if (p.price_per_sqft && p.price_per_sqft > 0) {
        areaMap[area].totalPricePerSqft += p.price_per_sqft
        areaMap[area].ppsqftCount++
      }
      areaMap[area].totalViews += p.views_count || 0
    }
    const byArea = Object.entries(areaMap)
      .map(([name, d]) => ({
        name,
        count: d.count,
        avgPrice: d.count > 0 ? Math.round(d.totalPrice / d.count) : 0,
        avgPricePerSqft: d.ppsqftCount > 0 ? Math.round(d.totalPricePerSqft / d.ppsqftCount) : 0,
        totalViews: d.totalViews,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15)

    // ── By type ───────────────────────────────────────────────────
    const typeMap: Record<string, number> = {}
    for (const p of properties) {
      const t = p.type || 'other'
      typeMap[t] = (typeMap[t] || 0) + 1
    }
    const byType = Object.entries(typeMap)
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count)

    // ── Monthly listings (last 12 months) ─────────────────────────
    const now = new Date()
    const monthlyCounts: { month: string; count: number; saleCount: number; rentCount: number }[] = []
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const year = d.getFullYear()
      const month = d.getMonth() + 1
      const label = d.toLocaleString('default', { month: 'short', year: '2-digit' })
      const monthProps = properties.filter(p => {
        if (!p.created_at) return false
        const pd = new Date(p.created_at)
        return pd.getFullYear() === year && pd.getMonth() + 1 === month
      })
      monthlyCounts.push({
        month: label,
        count: monthProps.length,
        saleCount: monthProps.filter(p => p.status === 'sale').length,
        rentCount: monthProps.filter(p => p.status === 'rent').length,
      })
    }

    // ── Beds distribution ─────────────────────────────────────────
    const bedsMap: Record<string, number> = {}
    for (const p of properties) {
      const b = p.beds === null ? 'Studio / N/A' : `${p.beds} BR`
      bedsMap[b] = (bedsMap[b] || 0) + 1
    }
    const byBeds = Object.entries(bedsMap)
      .map(([beds, count]) => ({ beds, count }))
      .sort((a, b) => b.count - a.count)

    // ── Price ranges ──────────────────────────────────────────────
    const ranges = [
      { label: 'Under AED 500K', min: 0, max: 500000 },
      { label: 'AED 500K–1M', min: 500000, max: 1000000 },
      { label: 'AED 1M–2M', min: 1000000, max: 2000000 },
      { label: 'AED 2M–5M', min: 2000000, max: 5000000 },
      { label: 'AED 5M–10M', min: 5000000, max: 10000000 },
      { label: 'Above AED 10M', min: 10000000, max: Infinity },
    ]
    const priceRanges = ranges.map(r => ({
      label: r.label,
      count: properties.filter(p => p.price >= r.min && p.price < r.max).length,
    }))

    // ── Projects by area ──────────────────────────────────────────
    const projectAreaMap: Record<string, number> = {}
    for (const p of projects) {
      const area = p.area || p.city || 'Other'
      projectAreaMap[area] = (projectAreaMap[area] || 0) + 1
    }
    const projectsByArea = Object.entries(projectAreaMap)
      .map(([area, count]) => ({ area, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    return NextResponse.json(
      {
        summary: {
          totalListings,
          forSale,
          forRent,
          offPlan,
          ready,
          totalProjects,
          avgPrice,
          avgPricePerSqft,
        },
        byArea,
        byType,
        byBeds,
        priceRanges,
        monthlyCounts,
        projectsByArea,
        generatedAt: new Date().toISOString(),
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
        },
      }
    )
  } catch (err: any) {
    console.error('market-stats error:', err)
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 })
  }
}
