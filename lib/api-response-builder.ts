import { NextResponse } from 'next/server';

/**
 * Optimized API Response Builder
 * Handles pagination, compression, caching headers, and selective field returns
 */

export interface PaginationParams {
  limit?: number;
  offset?: number;
  page?: number;
  pageSize?: number;
}

export interface ApiResponseOptions<T = any> {
  data: T;
  meta?: {
    total?: number;
    limit?: number;
    offset?: number;
    page?: number;
    pageSize?: number;
    hasMore?: boolean;
    cacheDuration?: number;
  };
  message?: string;
  status?: number;
  headers?: Record<string, string>;
}

/**
 * Build optimized API response with caching and compression
 */
export function buildApiResponse<T>(
  options: ApiResponseOptions<T>,
  statusCode: number = 200
): NextResponse {
  const {
    data,
    meta = {},
    message = 'Success',
    headers = {},
  } = options;

  const response: any = {
    success: statusCode >= 200 && statusCode < 300,
    data,
    message,
    ...(Object.keys(meta).length > 0 && { meta }),
  };

  // Set cache headers based on cacheDuration
  const cacheHeaders: Record<string, string> = {
    ...headers,
    'Content-Type': 'application/json',
  };

  if (meta.cacheDuration) {
    cacheHeaders['Cache-Control'] = `public, max-age=${meta.cacheDuration}`;
  } else {
    cacheHeaders['Cache-Control'] = 'public, max-age=300'; // Default 5 minutes
  }

  return NextResponse.json(response, {
    status: statusCode,
    headers: cacheHeaders,
  });
}

/**
 * Parse pagination parameters from request
 */
export function parsePagination(
  params: URLSearchParams,
  defaults = { limit: 20, offset: 0 }
): { limit: number; offset: number; page?: number; pageSize?: number } {
  const limit = Math.min(parseInt(params.get('limit') || String(defaults.limit)), 100); // Max 100
  const page = parseInt(params.get('page') || '1');
  const pageSize = parseInt(params.get('pageSize') || String(defaults.limit));

  // Support both offset-based and page-based pagination
  let offset = parseInt(params.get('offset') || String(defaults.offset));
  if (!params.has('offset') && params.has('page')) {
    offset = (page - 1) * pageSize;
  }

  return {
    limit,
    offset,
    page,
    pageSize,
  };
}

/**
 * Select specific fields from objects to reduce payload size
 */
export function selectFields<T extends Record<string, any>>(
  data: T[],
  fields?: (keyof T)[]
): Partial<T>[] {
  if (!fields || fields.length === 0) return data;

  return data.map((item) => {
    const selected: Partial<T> = {};
    fields.forEach((field) => {
      if (field in item) {
        selected[field] = item[field];
      }
    });
    return selected;
  });
}

/**
 * Apply filters to data
 */
export function applyFilters<T extends Record<string, any>>(
  data: T[],
  filters: Record<string, any>
): T[] {
  if (!filters || Object.keys(filters).length === 0) return data;

  return data.filter((item) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;

      if (Array.isArray(value)) {
        return value.includes(item[key]);
      }

      if (typeof value === 'object' && value !== null) {
        // Handle range filters
        if ('min' in value && item[key] < value.min) return false;
        if ('max' in value && item[key] > value.max) return false;
        return true;
      }

      return item[key] === value || String(item[key]).toLowerCase().includes(String(value).toLowerCase());
    });
  });
}

/**
 * Sort data by field
 */
export function applySorting<T extends Record<string, any>>(
  data: T[],
  sortBy?: string,
  sortOrder: 'asc' | 'desc' = 'asc'
): T[] {
  if (!sortBy) return data;

  const sorted = [...data].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];

    if (aVal === bVal) return 0;
    if (aVal === null || aVal === undefined) return 1;
    if (bVal === null || bVal === undefined) return -1;

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    }

    const aStr = String(aVal).toLowerCase();
    const bStr = String(bVal).toLowerCase();
    return sortOrder === 'asc'
      ? aStr.localeCompare(bStr)
      : bStr.localeCompare(aStr);
  });

  return sorted;
}

/**
 * Create paginated response with metadata
 */
export function createPaginatedResponse<T>(
  items: T[],
  total: number,
  limit: number,
  offset: number,
  cacheDuration?: number
): ApiResponseOptions<T[]> {
  const page = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  return {
    data: items,
    meta: {
      total,
      limit,
      offset,
      page,
      pageSize: limit,
      hasMore: page < totalPages,
      cacheDuration: cacheDuration || 300, // Default 5 minutes
    },
  };
}

/**
 * Stream response for large datasets
 */
export async function* streamLargeResponse<T>(
  items: T[],
  chunkSize: number = 50
): AsyncGenerator<T[]> {
  for (let i = 0; i < items.length; i += chunkSize) {
    yield items.slice(i, i + chunkSize);
  }
}

/**
 * Batch multiple requests efficiently
 */
export async function batchProcess<T, R>(
  items: T[],
  processor: (item: T) => Promise<R>,
  batchSize: number = 10,
  delayMs: number = 0
): Promise<R[]> {
  const results: R[] = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(processor));
    results.push(...batchResults);

    if (delayMs > 0 && i + batchSize < items.length) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return results;
}

/**
 * Compress response by removing null/undefined values
 */
export function compressResponse<T extends Record<string, any>>(data: T[]): Partial<T>[] {
  return data.map((item) => {
    const compressed: Partial<T> = {};
    Object.entries(item).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        compressed[key as keyof T] = value;
      }
    });
    return compressed;
  });
}

/**
 * Add ETag support for caching
 */
export function generateETag(data: any): string {
  const json = JSON.stringify(data);
  let hash = 0;
  for (let i = 0; i < json.length; i++) {
    const char = json.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return `"${Math.abs(hash).toString(16)}"`;
}

/**
 * Check if cached response is still valid
 */
export function isCacheValid(req: any, data: any): boolean {
  const ifNoneMatch = req.headers?.get('if-none-match');
  if (!ifNoneMatch) return false;

  const currentETag = generateETag(data);
  return ifNoneMatch === currentETag;
}
