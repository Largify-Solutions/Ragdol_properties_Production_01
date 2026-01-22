import { useEffect, useRef, useState, useCallback } from 'react';

// Cache to prevent duplicate requests
const fetchCache = new Map<string, { data: any; timestamp: number; promise: Promise<any> }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const REQUEST_TIMEOUT = 30000; // 30 seconds
const DEDUPE_TIMEOUT = 1000; // 1 second - prevent rapid duplicate requests

interface UseFetchOptions {
  cacheKey?: string;
  cacheDuration?: number;
  skip?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  headers?: Record<string, string>;
}

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Advanced data fetching hook with:
 * - Built-in caching with configurable duration
 * - Request deduplication (prevents multiple concurrent requests to same endpoint)
 * - Automatic timeout handling
 * - Request cancellation on unmount
 * - Type-safe responses
 */
export function useDataFetch<T>(
  url: string,
  options: UseFetchOptions = {}
): UseFetchResult<T> {
  const {
    cacheKey = url,
    cacheDuration = CACHE_DURATION,
    skip = false,
    onSuccess,
    onError,
    headers = {},
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);

  const fetchData = useCallback(async () => {
    if (skip) return;

    // Check cache first
    const cached = fetchCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < cacheDuration) {
      if (isMountedRef.current) {
        setData(cached.data);
        setLoading(false);
        setError(null);
        onSuccess?.(cached.data);
      }
      return;
    }

    // If request is already in flight, return the same promise (request deduplication)
    if (cached && cached.promise) {
      try {
        const result = await cached.promise;
        if (isMountedRef.current) {
          setData(result);
          setLoading(false);
          setError(null);
          onSuccess?.(result);
        }
        return;
      } catch (err) {
        if (isMountedRef.current) {
          const error = err instanceof Error ? err : new Error(String(err));
          setError(error);
          setLoading(false);
          onError?.(error);
        }
        return;
      }
    }

    // Cancel previous request
    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    if (isMountedRef.current) {
      setLoading(true);
      setError(null);
    }

    // Create timeout promise
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), REQUEST_TIMEOUT)
    );

    // Create fetch promise
    const fetchPromise = (async () => {
      try {
        const response = await Promise.race([
          fetch(url, {
            headers: {
              'Content-Type': 'application/json',
              ...headers,
            },
            signal: abortControllerRef.current?.signal,
          }),
          timeoutPromise,
        ]);

        if (!response || typeof response !== 'object' || !('json' in response)) {
          throw new Error('Invalid response');
        }

        const typedResponse = response as Response;
        const result = await typedResponse.json();

        if (!typedResponse.ok) {
          throw new Error(result.error || 'Failed to fetch data');
        }

        // Cache the result
        fetchCache.set(cacheKey, {
          data: result,
          timestamp: Date.now(),
          promise: Promise.resolve(),
        });

        if (isMountedRef.current) {
          setData(result);
          setLoading(false);
          setError(null);
          onSuccess?.(result);
        }

        return result;
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return; // Request was cancelled, don't update state
        }

        const error = err instanceof Error ? err : new Error(String(err));

        if (isMountedRef.current) {
          setError(error);
          setLoading(false);
          onError?.(error);
        }

        throw error;
      }
    })();

    // Store the promise to enable request deduplication
    fetchCache.set(cacheKey, {
      data: cached?.data || null,
      timestamp: cached?.timestamp || 0,
      promise: fetchPromise,
    });
  }, [url, cacheKey, cacheDuration, skip, onSuccess, onError, headers]);

  useEffect(() => {
    isMountedRef.current = true;
    fetchData();

    return () => {
      isMountedRef.current = false;
      abortControllerRef.current?.abort();
    };
  }, [fetchData]);

  const refetch = useCallback(async () => {
    // Clear cache for this key to force fresh request
    fetchCache.delete(cacheKey);
    await fetchData();
  }, [cacheKey, fetchData]);

  return { data, loading, error, refetch };
}

/**
 * Hook for batch fetching multiple endpoints in parallel
 * with optimized caching and error handling
 */
export function useBatchFetch<T extends Record<string, any>>(
  endpoints: Record<keyof T, string>,
  options: UseFetchOptions = {}
): { data: Partial<T>; loading: boolean; errors: Record<keyof T, Error | null> } {
  const [data, setData] = useState<Partial<T>>({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<keyof T, Error | null>>({} as Record<
    keyof T,
    Error | null
  >);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const results = await Promise.all(
          Object.entries(endpoints).map(async ([key, url]) => {
            try {
              const response = await fetch(url, {
                headers: {
                  'Content-Type': 'application/json',
                  ...options.headers,
                },
              });
              const result = await response.json();
              return [key, result, null];
            } catch (err) {
              return [key, null, err instanceof Error ? err : new Error(String(err))];
            }
          })
        );

        const newData: Partial<T> = {};
        const newErrors: Record<keyof T, Error | null> = {} as Record<keyof T, Error | null>;

        results.forEach(([key, result, error]) => {
          if (!error) {
            newData[key as keyof T] = result;
            newErrors[key as keyof T] = null;
          } else {
            newErrors[key as keyof T] = error;
          }
        });

        setData(newData);
        setErrors(newErrors);
        setLoading(false);
      } catch (err) {
        console.error('Batch fetch error:', err);
        setLoading(false);
      }
    };

    fetchAllData();
  }, [endpoints, options.headers]);

  return { data, loading, errors };
}

// Invalidate cache for a specific key or all keys
export function invalidateCache(key?: string) {
  if (key) {
    fetchCache.delete(key);
  } else {
    fetchCache.clear();
  }
}
