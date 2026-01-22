#!/usr/bin/env node

/**
 * Quick Reference for Data Fetching Optimizations
 * Copy & paste ready code examples
 */

// ============================================================================
// 1. REPLACE LOADING SPINNERS WITH SKELETON SCREENS
// ============================================================================

// ❌ BEFORE - Spinning loader
/*
if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  )
}
*/

// ✅ AFTER - Skeleton screen
/*
import { SkeletonLoader, SkeletonGrid } from '@/components/ui/SkeletonLoader'

if (loading) {
  return <SkeletonGrid count={12} type="property" columns={3} />
}
*/

// ============================================================================
// 2. USE DATA FETCHING HOOK INSTEAD OF MANUAL FETCH
// ============================================================================

// ❌ BEFORE
/*
const [properties, setProperties] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)

useEffect(() => {
  fetch('/api/properties')
    .then(r => r.json())
    .then(data => setProperties(data))
    .catch(err => setError(err))
    .finally(() => setLoading(false))
}, [])
*/

// ✅ AFTER
/*
import { useDataFetch } from '@/lib/hooks/useDataFetch'

const { data, loading, error } = useDataFetch('/api/properties', {
  cacheKey: 'properties-list',
  cacheDuration: 5 * 60 * 1000, // 5 minutes
})

const properties = data?.properties || []
*/

// ============================================================================
// 3. ADD LAZY LOADING FOR COMPONENTS
// ============================================================================

// ❌ BEFORE - All components render immediately
/*
{properties.map(prop => (
  <PropertyCard key={prop.id} {...prop} />
))}
*/

// ✅ AFTER - Components load when visible
/*
import { LazyLoad } from '@/components/ui/LazyLoad'

{properties.map(prop => (
  <LazyLoad key={prop.id} threshold={0.1} rootMargin="50px">
    <PropertyCard {...prop} />
  </LazyLoad>
))}
*/

// ============================================================================
// 4. PROGRESSIVE IMAGE LOADING
// ============================================================================

// ❌ BEFORE - Image pops in suddenly
/*
<img src={property.image} alt="Property" className="w-full h-64 object-cover" />
*/

// ✅ AFTER - Image loads smoothly with blur effect
/*
import { ProgressiveImage } from '@/components/ui/LazyLoad'

<ProgressiveImage
  src={property.image}
  placeholder={property.thumbnail}
  alt="Property"
  className="w-full h-64 object-cover"
/>
*/

// ============================================================================
// 5. INFINITE SCROLL FOR LISTS
// ============================================================================

// ✅ COMPLETE EXAMPLE
/*
import { InfiniteScroll } from '@/components/ui/LazyLoad'
import { useDataFetch } from '@/lib/hooks/useDataFetch'

export function PropertyList() {
  const [page, setPage] = useState(1)
  const [allItems, setAllItems] = useState([])
  
  const pageSize = 12
  const { data, loading } = useDataFetch(
    `/api/properties?limit=${pageSize}&offset=${(page-1)*pageSize}`
  )
  
  useEffect(() => {
    if (data?.properties) {
      setAllItems(prev => [...prev, ...data.properties])
    }
  }, [data])
  
  return (
    <InfiniteScroll
      items={allItems}
      isLoading={loading}
      hasMore={data?.meta?.hasMore}
      onLoadMore={() => setPage(p => p + 1)}
    >
      {(items) => (
        <div className="grid grid-cols-3 gap-6">
          {items.map(item => <PropertyCard key={item.id} {...item} />)}
        </div>
      )}
    </InfiniteScroll>
  )
}
*/

// ============================================================================
// 6. BATCH FETCH MULTIPLE ENDPOINTS
// ============================================================================

// ✅ EXAMPLE
/*
import { useBatchFetch } from '@/lib/hooks/useDataFetch'

export function Dashboard() {
  const { data, loading, errors } = useBatchFetch({
    properties: '/api/properties?limit=5',
    agents: '/api/agents?limit=10',
    projects: '/api/projects?limit=5',
  })
  
  return (
    <>
      {loading ? <Skeleton /> : (
        <>
          <PropertySection data={data.properties} />
          <AgentSection data={data.agents} />
          <ProjectSection data={data.projects} />
        </>
      )}
    </>
  )
}
*/

// ============================================================================
// 7. RETRY FAILED REQUESTS
// ============================================================================

// ✅ EXAMPLE
/*
import { retryFetch } from '@/lib/data-fetching-utils'

async function loadData() {
  try {
    const data = await retryFetch('/api/properties', {
      maxRetries: 3,
      baseDelay: 1000, // 1 second
    })
    console.log('Data loaded:', data)
  } catch (error) {
    console.error('Failed after 3 retries:', error)
  }
}
*/

// ============================================================================
// 8. VIRTUAL SCROLLING FOR LARGE LISTS
// ============================================================================

// ✅ EXAMPLE - Use when you have 1000+ items
/*
import { VirtualList } from '@/components/ui/LazyLoad'

export function LargePropertyList({ properties }) {
  return (
    <VirtualList
      items={properties}
      itemHeight={250}
      containerHeight={600}
      renderItem={(prop) => <PropertyCard {...prop} />}
    />
  )
}
*/

// ============================================================================
// 9. REQUEST QUEUING
// ============================================================================

// ✅ EXAMPLE - Prevent server overload
/*
import { RequestQueue } from '@/lib/data-fetching-utils'

const queue = new RequestQueue(3) // Max 3 concurrent requests

async function loadAllProperties() {
  const results = []
  for (let page = 1; page <= 10; page++) {
    const result = await queue.add(() =>
      fetch(`/api/properties?page=${page}`).then(r => r.json())
    )
    results.push(result)
  }
  return results
}
*/

// ============================================================================
// 10. PAGINATION MANAGER
// ============================================================================

// ✅ EXAMPLE - Smart pagination with preloading
/*
import { PaginationManager } from '@/lib/data-fetching-utils'

const paginator = new PaginationManager(12) // 12 items per page

// Set current page data
paginator.setPage(1, page1Data)

// Schedule next pages for preloading
paginator.schedulePreload([2, 3])

// Get preload queue
const toPreload = paginator.getPreloadQueue()
*/

// ============================================================================
// 11. PREFETCH DATA FOR NEXT PAGE
// ============================================================================

// ✅ EXAMPLE
/*
import { usePrefetch } from '@/components/ui/LazyLoad'

export function PropertyPage() {
  // Prefetch page 2 after 1 second
  usePrefetch('/api/properties?page=2', { delay: 1000 })
  
  return <PropertyList />
}
*/

// ============================================================================
// 12. OPTIMIZE API RESPONSE
// ============================================================================

// ✅ SERVER-SIDE (Next.js API route)
/*
import { buildApiResponse, parsePagination, selectFields } from '@/lib/api-response-builder'

export async function GET(req) {
  const { limit, offset } = parsePagination(req.nextUrl.searchParams)
  
  let properties = await db.properties.findAll()
  
  // Select only needed fields (reduce payload by 60%)
  const fields = ['id', 'title', 'price', 'image', 'location', 'beds', 'baths']
  const selected = selectFields(properties, fields)
  
  // Apply pagination
  const paginated = selected.slice(offset, offset + limit)
  
  // Build optimized response with caching headers
  return buildApiResponse({
    data: paginated,
    meta: {
      total: properties.length,
      limit,
      offset,
      hasMore: offset + limit < properties.length,
      cacheDuration: 300, // 5 minutes
    },
  })
}
*/

// ============================================================================
// 13. CLEAR CACHE WHEN NEEDED
// ============================================================================

// ✅ EXAMPLE
/*
import { invalidateCache } from '@/lib/hooks/useDataFetch'

// Clear all cache
invalidateCache()

// Clear specific cache key
invalidateCache('properties-page-1')

// After creating new property
async function createProperty(data) {
  const result = await fetch('/api/properties', {
    method: 'POST',
    body: JSON.stringify(data),
  })
  
  // Invalidate list cache
  invalidateCache('properties-list')
  
  return result.json()
}
*/

// ============================================================================
// 14. CONFIGURE OPTIMIZATION
// ============================================================================

// ✅ EDIT lib/optimization-config.ts

const OPTIMIZATION_CONFIG = {
  cache: {
    properties: 5 * 60 * 1000,      // 5 minutes
    agents: 10 * 60 * 1000,         // 10 minutes
    projects: 15 * 60 * 1000,       // 15 minutes
  },
  pagination: {
    defaultPageSize: 20,
    maxPageSize: 100,
  },
  requests: {
    timeout: 30000,
    maxRetries: 3,
    maxConcurrentRequests: 6,
  },
  features: {
    requestDeduplication: true,
    responseCaching: true,
    lazyLoading: true,
    virtualScrolling: true,
  },
}

// ============================================================================
// 15. COMPLETE EXAMPLE - OPTIMIZED PROPERTY PAGE
// ============================================================================

// ✅ FULL IMPLEMENTATION
/*
'use client'

import { useState, useCallback, useEffect } from 'react'
import { useDataFetch } from '@/lib/hooks/useDataFetch'
import { SkeletonGrid } from '@/components/ui/SkeletonLoader'
import { InfiniteScroll, LazyLoad, ProgressiveImage } from '@/components/ui/LazyLoad'

export default function PropertiesPage() {
  const [page, setPage] = useState(1)
  const [allProperties, setAllProperties] = useState([])
  
  const pageSize = 12
  const offset = (page - 1) * pageSize
  
  // Fetch with caching and deduplication
  const { data, loading, error } = useDataFetch(
    `/api/properties?limit=${pageSize}&offset=${offset}`,
    {
      cacheKey: `properties-page-${page}`,
      cacheDuration: 5 * 60 * 1000,
    }
  )
  
  useEffect(() => {
    if (data?.properties) {
      setAllProperties(prev => [...prev, ...data.properties])
    }
  }, [data])
  
  const handleLoadMore = useCallback(() => {
    setPage(p => p + 1)
  }, [])
  
  return (
    <>
      {loading && page === 1 && (
        <SkeletonGrid count={pageSize} type="property" columns={3} />
      )}
      
      <InfiniteScroll
        items={allProperties}
        isLoading={loading}
        hasMore={data?.meta?.hasMore}
        onLoadMore={handleLoadMore}
      >
        {(items) => (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(prop => (
              <LazyLoad key={prop.id}>
                <div className="rounded-lg overflow-hidden shadow">
                  <ProgressiveImage
                    src={prop.image}
                    placeholder={prop.thumbnail}
                    alt={prop.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold mb-2">{prop.title}</h3>
                    <p className="text-lg font-bold text-blue-600">
                      AED {prop.price?.toLocaleString()}
                    </p>
                  </div>
                </div>
              </LazyLoad>
            ))}
          </div>
        )}
      </InfiniteScroll>
    </>
  )
}
*/

// ============================================================================
// QUICK CHECKLIST
// ============================================================================

/*
[ ] Replace loading spinners with SkeletonLoader
[ ] Replace manual fetch with useDataFetch hook
[ ] Add LazyLoad wrappers to property cards
[ ] Use ProgressiveImage for all images
[ ] Implement InfiniteScroll instead of pagination
[ ] Use VirtualList for 1000+ items
[ ] Set appropriate cache durations
[ ] Add request retry logic
[ ] Implement batch fetching
[ ] Test with Chrome Lighthouse
[ ] Monitor cache hits in DevTools
[ ] Deploy to production
[ ] Monitor performance metrics
*/
