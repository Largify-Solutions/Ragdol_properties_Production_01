'use client';

import React, { useEffect, useRef, useState } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

interface LazyLoadProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  onVisible?: () => void;
  placeholder?: React.ReactNode;
}

/**
 * Lazy loading component with intersection observer
 * Loads content only when visible in viewport
 */
export function LazyLoad({
  children,
  threshold = 0.1,
  rootMargin = '50px',
  onVisible,
  placeholder = null,
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          onVisible?.();
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin, onVisible]);

  return (
    <div ref={ref}>
      {isVisible ? children : placeholder}
    </div>
  );
}

/**
 * Progressive image loading with blur effect
 */
export function ProgressiveImage({
  src,
  placeholder,
  alt = 'Image',
  className = '',
  onLoad,
}: {
  src: string;
  placeholder: string;
  alt?: string;
  className?: string;
  onLoad?: () => void;
}) {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      onLoad?.();
    };
  }, [src, onLoad]);

  return (
    <img
      ref={setImageRef}
      src={imageSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${className}`}
      style={{
        opacity: imageSrc === src ? 1 : 0.7,
        filter: imageSrc === placeholder ? 'blur(8px)' : 'blur(0px)',
      }}
    />
  );
}

/**
 * Virtual scrolling for large lists
 * Only renders visible items to improve performance
 */
export function VirtualList<T>({
  items,
  itemHeight,
  renderItem,
  containerHeight = 600,
  overscan = 5,
}: {
  items: T[];
  itemHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  containerHeight?: number;
  overscan?: number;
}) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalHeight = items.length * itemHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );
  const visibleItems = items.slice(startIndex, endIndex);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        height: containerHeight,
        overflow: 'auto',
      }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${startIndex * itemHeight}px)`,
          }}
        >
          {visibleItems.map((item, i) => (
            <div
              key={startIndex + i}
              style={{ height: itemHeight }}
            >
              {renderItem(item, startIndex + i)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Infinite scroll component
 * Automatically loads more items when scrolling to bottom
 */
export function InfiniteScroll<T>({
  items,
  isLoading,
  hasMore,
  onLoadMore,
  children,
  threshold = 200,
}: {
  items: T[];
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  children: (items: T[]) => React.ReactNode;
  threshold?: number;
}) {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading) {
          onLoadMore();
        }
      },
      {
        rootMargin: `${threshold}px`,
      }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, isLoading, onLoadMore, threshold]);

  return (
    <>
      {children(items)}
      <div ref={observerTarget} className="py-8 text-center">
        {isLoading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
      </div>
    </>
  );
}

/**
 * Intersection observer hook for custom implementations
 */
export function useIntersectionObserver(
  options: IntersectionObserverOptions = {}
): [React.RefObject<HTMLDivElement | null>, boolean] {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref as React.RefObject<HTMLDivElement | null>, isVisible];
}

/**
 * Request idle callback wrapper
 * Defers non-critical work until browser is idle
 */
export function useIdleCallback(
  callback: () => void,
  dependencies: any[] = []
) {
  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = (window as any).requestIdleCallback(callback);
      return () => (window as any).cancelIdleCallback(id);
    } else {
      // Fallback for browsers that don't support requestIdleCallback
      const timeoutId = setTimeout(callback, 0);
      return () => clearTimeout(timeoutId);
    }
  }, dependencies);
}

/**
 * Preload resources (images, scripts, styles)
 */
export function preloadResource(
  url: string,
  type: 'image' | 'script' | 'style' | 'fetch' = 'image'
) {
  if (typeof document === 'undefined') return;

  switch (type) {
    case 'image': {
      const img = new Image();
      img.src = url;
      break;
    }
    case 'script': {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'script';
      link.href = url;
      document.head.appendChild(link);
      break;
    }
    case 'style': {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = url;
      document.head.appendChild(link);
      break;
    }
    case 'fetch': {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
      break;
    }
  }
}

/**
 * Prefetch data for next page
 */
export function usePrefetch<T>(
  url: string,
  options: { delay?: number; threshold?: number } = {}
): void {
  const { delay = 1000, threshold = 0.7 } = options;

  useEffect(() => {
    const timer = setTimeout(() => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);

      // Also fetch the data
      fetch(url).catch((err) => console.log('Prefetch failed:', err));
    }, delay);

    return () => clearTimeout(timer);
  }, [url, delay]);
}
