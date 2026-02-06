'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { useDataFetch } from '@/lib/hooks/useDataFetch';
import { SkeletonGrid } from '@/components/ui/SkeletonLoader';
import { InfiniteScroll, LazyLoad, ProgressiveImage } from '@/components/ui/LazyLoad';

/**
 * Optimized Property Listing Component
 * Demonstrates best practices for data fetching:
 * - Uses useDataFetch hook with built-in caching
 * - Lazy loads images with blur-up effect
 * - Uses skeleton loading instead of spinners
 * - Implements infinite scroll for better UX
 * - Progressive data loading
 */

interface Property {
  id: string;
  title: string;
  price: number;
  image: string;
  thumbnail?: string;
  type: string;
  beds?: number;
  baths?: number;
  area?: number;
  agent_name?: string;
  location?: string;
  description?: string;
}

interface PropertyListingProps {
  category?: string;
  initialPage?: number;
}

export function OptimizedPropertyListing({
  category = 'rent',
  initialPage = 1,
}: PropertyListingProps) {
  const [page, setPage] = useState(initialPage);
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [hasMore, setHasMore] = useState(true);

  // Build query URL with pagination
  const pageSize = 12;
  const offset = (page - 1) * pageSize;
  const queryUrl = `/api/properties?limit=${pageSize}&offset=${offset}&category=${category}&fields=id,title,price,image,type,beds,baths,area,agent_name,location`;

  // Use optimized data fetching hook
  const { data, loading, error, refetch } = useDataFetch<{
    properties: Property[];
    total: number;
  }>(queryUrl, {
    cacheKey: `${category}-page-${page}`,
    cacheDuration: 5 * 60 * 1000, // Cache for 5 minutes
    onSuccess: (newData) => {
      // Append new properties instead of replacing (infinite scroll pattern)
      if (newData?.properties) {
        setAllProperties((prev) => [...prev, ...newData.properties]);
        setHasMore(newData.total > offset + pageSize);
      }
    },
    onError: (error) => {
      console.error('Failed to load properties:', error);
    },
  });

  // Handle load more
  const handleLoadMore = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  // Memoize filtered/sorted properties
  const displayProperties = useMemo(() => {
    return allProperties;
  }, [allProperties]);

  if (error && page === 1) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Failed to load properties</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <InfiniteScroll
      items={displayProperties}
      isLoading={loading}
      hasMore={hasMore}
      onLoadMore={handleLoadMore}
    >
      {(properties) => (
        <>
          {/* Loading skeleton for first page */}
          {loading && page === 1 && (
            <SkeletonGrid count={pageSize} type="property" columns={3} />
          )}

          {/* Properties grid */}
          {properties.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <LazyLoad
                  key={property.id}
                  threshold={0.1}
                  rootMargin="100px"
                >
                  <OptimizedPropertyCard property={property} />
                </LazyLoad>
              ))}
            </div>
          )}

          {/* Empty state */}
          {loading! && properties.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No properties found</p>
            </div>
          )}
        </>
      )}
    </InfiniteScroll>
  );
}

/**
 * Optimized Property Card Component
 * Uses lazy loading and progressive image rendering
 */
export function OptimizedPropertyCard({ property }: { property: Property }) {
  const [favorite, setFavorite] = useState(false);

  const thumbnailUrl =
    property.thumbnail ||
    property.image?.replace(/original/, 'thumbnail') ||
    'https://via.placeholder.com/300x200?text=No+Image';

  const fullImageUrl =
    property.image || 'https://via.placeholder.com/500x400?text=No+Image';

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      {/* Image with progressive loading */}
      <div className="relative overflow-hidden bg-gray-200 h-48">
        <ProgressiveImage
          src={fullImageUrl}
          placeholder={thumbnailUrl}
          alt={property.title}
          className="w-full h-full object-cover"
        />

        {/* Favorite button */}
        <button
          onClick={() => setFavorite(!favorite)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
        >
          {favorite ? (
            <span className="text-red-500 text-lg">♥</span>
          ) : (
            <span className="text-gray-400 text-lg">♡</span>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 truncate">{property.title}</h3>
        <p className="text-sm text-gray-500 mb-3">{property.location}</p>

        {/* Features */}
        <div className="flex gap-3 text-sm mb-4">
          {property.beds && (
            <span className="flex items-center gap-1">
              🛏️ {property.beds} Beds
            </span>
          )}
          {property.baths && (
            <span className="flex items-center gap-1">
              🚿 {property.baths} Baths
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-lg font-bold">
            AED {property.price?.toLocaleString()}
          </p>
        </div>

        {/* Agent */}
        {property.agent_name && (
          <div className="text-xs text-gray-500 mb-3">By {property.agent_name}</div>
        )}

        {/* CTA */}
        <button className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}

/**
 * Optimized Property Details Modal
 * Loads agent data only when needed
 */
export function OptimizedPropertyDetailsModal({
  property,
  onClose,
}: {
  property: Property | null;
  onClose: () => void;
}) {
  if (!property) return null;

  // Lazy load agent data
  const { data: agentData, loading: agentLoading } = useDataFetch(
    `/api/agents/${property.agent_name}`,
    {
      cacheKey: `agent-${property.agent_name}`,
      cacheDuration: 10 * 60 * 1000, // Cache for 10 minutes
    }
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{property.title}</h2>
          <p className="text-xl font-bold text-primary mb-4">
            AED {property.price?.toLocaleString()}
          </p>

          {/* Image */}
          <ProgressiveImage
            src={property.image || 'https://via.placeholder.com/600x400'}
            placeholder={property.thumbnail || 'https://via.placeholder.com/100x100'}
            alt={property.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />

          {/* Details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {property.beds && (
              <div>
                <p className="text-gray-500 text-sm">Bedrooms</p>
                <p className="text-lg font-semibold">{property.beds}</p>
              </div>
            )}
            {property.baths && (
              <div>
                <p className="text-gray-500 text-sm">Bathrooms</p>
                <p className="text-lg font-semibold">{property.baths}</p>
              </div>
            )}
            {property.area && (
              <div>
                <p className="text-gray-500 text-sm">Area</p>
                <p className="text-lg font-semibold">{property.area} sqft</p>
              </div>
            )}
            {property.type && (
              <div>
                <p className="text-gray-500 text-sm">Type</p>
                <p className="text-lg font-semibold">{property.type}</p>
              </div>
            )}
          </div>

          {/* Agent info - lazy loaded */}
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Agent Information</h3>
            {agentLoading ? (
              <p className="text-sm text-gray-400">Loading agent details...</p>
            ) : agentData ? (
              <div className="flex gap-3 items-center">
                <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                <div>
                  <p className="font-semibold">{property.agent_name}</p>
                  <p className="text-sm text-gray-500">Licensed Agent</p>
                </div>
              </div>
            ) : null}
          </div>

          {/* CTA */}
          <button className="w-full mt-6 bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors">
            Contact Agent
          </button>
        </div>
      </div>
    </div>
  );
}
