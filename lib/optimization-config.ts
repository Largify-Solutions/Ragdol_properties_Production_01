/**
 * Data Fetching Optimization Configuration
 * Customize these settings based on your application needs
 */

export const OPTIMIZATION_CONFIG = {
  // Cache configuration
  cache: {
    // Global cache duration in milliseconds
    defaultDuration: 5 * 60 * 1000, // 5 minutes

    // Per-resource cache durations
    properties: 5 * 60 * 1000, // 5 minutes
    agents: 10 * 60 * 1000, // 10 minutes
    projects: 15 * 60 * 1000, // 15 minutes
    enquiries: 1 * 60 * 1000, // 1 minute
    categories: 60 * 60 * 1000, // 1 hour
    users: 30 * 60 * 1000, // 30 minutes

    // Cache size limits
    maxCacheSize: 50, // Number of cached entries
    maxCacheMemory: 50 * 1024 * 1024, // 50MB
  },

  // Request configuration
  requests: {
    // Timeout in milliseconds
    timeout: 30000,

    // Request deduplication timeout
    dedupeTimeout: 1000,

    // Retry configuration
    maxRetries: 3,
    baseDelay: 1000, // milliseconds
    backoffMultiplier: 2,

    // Rate limiting
    maxConcurrentRequests: 6,
    requestQueueTimeout: 60000,
  },

  // Pagination configuration
  pagination: {
    // Default page sizes
    defaultPageSize: 20,
    maxPageSize: 100,

    // Per-resource page sizes
    properties: {
      desktop: 12,
      tablet: 8,
      mobile: 6,
    },
    agents: {
      desktop: 20,
      tablet: 12,
      mobile: 8,
    },
    projects: {
      desktop: 10,
      tablet: 8,
      mobile: 5,
    },
    enquiries: {
      desktop: 25,
      tablet: 15,
      mobile: 10,
    },

    // Preload configuration
    preloadPages: 2,
    preloadDelay: 500, // milliseconds
  },

  // API optimization
  api: {
    // Field selection for reducing payload
    defaultFields: {
      properties: [
        'id',
        'title',
        'price',
        'image',
        'thumbnail',
        'type',
        'location',
        'beds',
        'baths',
        'area',
        'agent_name',
      ],
      agents: ['id', 'title', 'profile_image', 'verified', 'rating', 'office'],
      projects: [
        'id',
        'name',
        'developer',
        'image',
        'status',
        'city',
        'starting_price',
      ],
    },

    // Response compression
    compression: {
      enabled: true,
      minSize: 1024, // bytes
      algorithms: ['gzip', 'deflate', 'br'],
    },

    // ETag support for HTTP caching
    etag: {
      enabled: true,
      generateETag: true,
    },

    // CORS configuration
    cors: {
      credentials: 'include',
      headers: ['Content-Type', 'Authorization'],
    },
  },

  // Lazy loading configuration
  lazyLoad: {
    // Intersection Observer settings
    threshold: 0.1,
    rootMargin: '50px',

    // Image loading
    imageOptimization: true,
    blurupEffect: true,
    nativeLoading: 'lazy',

    // Progressive rendering
    progressiveLoad: true,
    loadCriticalFirst: true,
  },

  // Skeleton loader configuration
  skeleton: {
    // Animation duration in milliseconds
    animationDuration: 2000,

    // Number of skeleton lines for text
    textLines: 3,

    // Show skeleton or empty state
    showSkeleton: true,

    // Types of skeletons to use
    defaultType: 'property', // 'property', 'agent', 'list', 'card', 'text'
  },

  // Performance monitoring
  monitoring: {
    enabled: true,
    logPerformanceMetrics: true,
    trackApiCalls: true,
    trackCacheHits: true,

    // Thresholds for warnings
    thresholds: {
      slowRequest: 3000, // ms
      largePayload: 1024 * 1024, // 1MB
    },
  },

  // Feature flags
  features: {
    // Enable/disable optimization features
    requestDeduplication: true,
    responseCaching: true,
    lazyLoading: true,
    progressiveLoading: true,
    imageBlurup: true,
    virtualScrolling: true,
    infiniteScroll: true,
    requestQueueing: true,
    retryOnFailure: true,

    // Device-specific features
    mobileOptimized: true,
    reduceDataUsage: false, // For data-saver mode
  },

  // Network conditions
  network: {
    // Detect network speed
    detectNetworkSpeed: true,

    // Adaptive loading based on connection
    adaptive: {
      '4g': {
        pageSize: 50,
        preloadPages: 3,
        imageBlurup: true,
      },
      '3g': {
        pageSize: 20,
        preloadPages: 1,
        imageBlurup: true,
      },
      '2g': {
        pageSize: 10,
        preloadPages: 0,
        imageBlurup: false,
      },
      'slow-2g': {
        pageSize: 5,
        preloadPages: 0,
        imageBlurup: false,
      },
    },
  },

  // Development settings
  development: {
    // Log cache operations
    logCache: false,

    // Log API calls
    logApiCalls: false,

    // Log performance metrics
    logMetrics: false,

    // Disable cache in development
    disableCache: false,

    // Verbose error messages
    verboseErrors: true,
  },
};

/**
 * Get optimization config for current environment
 */
export function getOptimizationConfig() {
  const isDev = process.env.NODE_ENV === 'development';
  const config = { ...OPTIMIZATION_CONFIG };

  if (isDev) {
    config.development.logCache = true;
    config.development.logApiCalls = true;
    config.development.logMetrics = false; // Set to true to enable
  }

  return config;
}

/**
 * Get page size based on device and network
 */
export function getOptimalPageSize(resource: string): number {
  const config = getOptimizationConfig();
  const defaultSize = config.pagination.defaultPageSize;

  if (!config.pagination[resource as keyof typeof config.pagination]) {
    return defaultSize;
  }

  const resourceConfig = config.pagination[resource as keyof typeof config.pagination];

  // Type guard to check if resourceConfig is an object with device properties
  if (typeof resourceConfig === 'number') {
    return resourceConfig;
  }

  // Detect device
  if (typeof window === 'undefined') {
    return resourceConfig.desktop || defaultSize;
  }

  if (window.innerWidth < 768) {
    return resourceConfig.mobile || defaultSize;
  } else if (window.innerWidth < 1024) {
    return resourceConfig.tablet || defaultSize;
  } else {
    return resourceConfig.desktop || defaultSize;
  }
}

/**
 * Get fields to request for specific resource
 */
export function getOptimalFields(resource: string): string[] {
  const config = getOptimizationConfig();
  const defaultFields = config.api.defaultFields[resource as keyof typeof config.api.defaultFields];
  return defaultFields || [];
}

/**
 * Get cache duration for resource
 */
export function getCacheDuration(resource: string): number {
  const config = getOptimizationConfig();
  const duration = config.cache[resource as keyof typeof config.cache];
  return typeof duration === 'number' ? duration : config.cache.defaultDuration;
}
