/**
 * Data Fetching Optimization Utilities
 * Provides helpers for faster and more efficient data loading
 */

// Configuration for different data types
export const PAGINATION_CONFIG = {
  properties: { pageSize: 12, preloadPages: 2 },
  agents: { pageSize: 20, preloadPages: 1 },
  projects: { pageSize: 10, preloadPages: 1 },
  enquiries: { pageSize: 25, preloadPages: 1 },
};

// Batch operation configuration
export const BATCH_CONFIG = {
  maxBatchSize: 100,
  batchTimeout: 50, // ms
};

/**
 * Compress response payload by selecting only needed fields
 * Reduces bandwidth and improves performance
 */
export function selectFields<T extends Record<string, any>>(
  data: T[],
  fields: (keyof T)[]
): Partial<T>[] {
  return data.map((item) => {
    const selected: Partial<T> = {};
    fields.forEach((field) => {
      selected[field] = item[field];
    });
    return selected;
  });
}

/**
 * Batch multiple requests into single fetch call
 * Reduces network overhead
 */
export async function batchFetch<T>(
  urls: string[],
  options?: RequestInit
): Promise<(T | null)[]> {
  try {
    const responses = await Promise.all(
      urls.map((url) =>
        fetch(url, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
          },
        }).then((res) => (res.ok ? res.json() : null))
      )
    );
    return responses;
  } catch (error) {
    console.error('Batch fetch error:', error);
    return urls.map(() => null);
  }
}

/**
 * Implement request queuing to prevent server overload
 */
export class RequestQueue {
  private queue: Array<() => Promise<any>> = [];
  private running = false;
  private concurrency: number;

  constructor(concurrency = 3) {
    this.concurrency = concurrency;
  }

  async add<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await fn();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      this.process();
    });
  }

  private async process() {
    if (this.running) return;
    this.running = true;

    while (this.queue.length > 0) {
      const batch = this.queue.splice(0, this.concurrency);
      await Promise.all(batch.map((fn) => fn()));
    }

    this.running = false;
  }
}

/**
 * Intelligent pagination helper
 * Preloads next pages in background
 */
export class PaginationManager<T> {
  private cache: Map<number, T[]> = new Map();
  private preloadQueue: Set<number> = new Set();
  private pageSize: number;

  constructor(pageSize = 12) {
    this.pageSize = pageSize;
  }

  setPage(page: number, data: T[]) {
    this.cache.set(page, data);
  }

  getPage(page: number): T[] | undefined {
    return this.cache.get(page);
  }

  schedulePreload(pages: number[]) {
    pages.forEach((p) => this.preloadQueue.add(p));
  }

  getPreloadQueue(): number[] {
    return Array.from(this.preloadQueue);
  }

  clearPreloadQueue() {
    this.preloadQueue.clear();
  }

  clear() {
    this.cache.clear();
    this.preloadQueue.clear();
  }
}

/**
 * Progressive data loading strategy
 * Load critical data first, then secondary data
 */
export interface DataLoadingStrategy {
  critical: string[]; // Essential API endpoints
  secondary: string[]; // Nice-to-have endpoints
  background: string[]; // Low priority endpoints
}

export async function progressiveLoad(
  strategy: DataLoadingStrategy,
  fetchFn: (url: string) => Promise<any>
): Promise<{ critical: any[]; secondary: any[]; background: any[] }> {
  const results = {
    critical: [] as any[],
    secondary: [] as any[],
    background: [] as any[],
  };

  // Load critical data first
  try {
    results.critical = await Promise.all(strategy.critical.map(fetchFn));
  } catch (error) {
    console.error('Critical data load error:', error);
  }

  // Load secondary data
  Promise.all(strategy.secondary.map(fetchFn))
    .then((data) => {
      results.secondary = data;
    })
    .catch((error) => console.error('Secondary data load error:', error));

  // Load background data
  Promise.all(strategy.background.map(fetchFn))
    .then((data) => {
      results.background = data;
    })
    .catch((error) => console.error('Background data load error:', error));

  return results;
}

/**
 * Debounce API calls to prevent excessive requests
 */
export function debounce<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  delay = 300
): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>> | null> {
  let timeout: NodeJS.Timeout;
  let lastResult: Awaited<ReturnType<T>> | null = null;

  return async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>> | null> => {
    return new Promise<Awaited<ReturnType<T>> | null>((resolve) => {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        try {
          lastResult = await fn(...args);
          resolve(lastResult);
        } catch (error) {
          console.error('Debounced function error:', error);
          resolve(null);
        }
      }, delay);
    });
  };
}

/**
 * Throttle API calls
 */
export function throttle<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  limit = 1000
): (...args: Parameters<T>) => Promise<Awaited<ReturnType<T>> | null> {
  let lastCall = 0;
  let timeout: NodeJS.Timeout;
  let pending = false;
  let lastResult: Awaited<ReturnType<T>> | null = null;

  return async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>> | null> => {
    return new Promise<Awaited<ReturnType<T>> | null>((resolve) => {
      const now = Date.now();

      if (now - lastCall >= limit && !pending) {
        lastCall = now;
        pending = true;
        fn(...args)
          .then((result) => {
            lastResult = result;
            pending = false;
            resolve(result);
          })
          .catch((error) => {
            console.error('Throttled function error:', error);
            pending = false;
            resolve(null);
          });
      } else {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          resolve(lastResult);
        }, limit - (now - lastCall));
      }
    });
  };
}

/**
 * Retry failed requests with exponential backoff
 */
export async function retryFetch<T>(
  url: string,
  options: RequestInit & { maxRetries?: number; baseDelay?: number } = {}
): Promise<T> {
  const { maxRetries = 3, baseDelay = 1000, ...fetchOptions } = options;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, fetchOptions);

      if (!response.ok) {
        if (response.status === 429 || response.status >= 500) {
          throw new Error(`Server error: ${response.status}`);
        }
        throw new Error(`HTTP error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (attempt === maxRetries - 1) throw error;

      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error('Max retries exceeded');
}

/**
 * Stream large responses progressively
 * Useful for large lists or real-time data
 */
export async function* streamFetch<T>(
  url: string,
  chunkSize = 10
): AsyncGenerator<T[], void> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const data = await response.json();
    const items = Array.isArray(data) ? data : data.data || [];

    for (let i = 0; i < items.length; i += chunkSize) {
      yield items.slice(i, i + chunkSize);
    }
  } catch (error) {
    console.error('Stream fetch error:', error);
    throw error;
  }
}

/**
 * Calculate optimal chunk size based on network speed
 */
export async function calculateOptimalChunkSize(): Promise<number> {
  if (typeof navigator === 'undefined') return 10;

  const connection = (navigator as any).connection;
  if (!connection) return 10;

  const effectiveType = connection.effectiveType;

  switch (effectiveType) {
    case '4g':
      return 50;
    case '3g':
      return 20;
    case '2g':
      return 10;
    case 'slow-2g':
      return 5;
    default:
      return 10;
  }
}

/**
 * Implement SWR-like revalidation strategy
 */
export class DataRevalidator {
  private revalidateIntervals: Map<string, NodeJS.Timeout> = new Map();

  revalidate(key: string, fn: () => Promise<void>, interval = 30000) {
    // Clear existing interval
    if (this.revalidateIntervals.has(key)) {
      clearInterval(this.revalidateIntervals.get(key)!);
    }

    // Set new interval
    const timeoutId = setInterval(fn, interval);
    this.revalidateIntervals.set(key, timeoutId);
  }

  stop(key: string) {
    if (this.revalidateIntervals.has(key)) {
      clearInterval(this.revalidateIntervals.get(key)!);
      this.revalidateIntervals.delete(key);
    }
  }

  stopAll() {
    this.revalidateIntervals.forEach((interval) => clearInterval(interval));
    this.revalidateIntervals.clear();
  }
}
