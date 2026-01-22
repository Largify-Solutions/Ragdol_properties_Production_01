import React from 'react';

interface SkeletonLoaderProps {
  count?: number;
  type?: 'text' | 'card' | 'image' | 'property' | 'agent' | 'list' | 'table';
  className?: string;
  height?: number;
  width?: number;
}

// Reusable skeleton shimmer effect component
const SkeletonShimmer = ({ className = '', style }: { className?: string; style?: React.CSSProperties }) => (
  <div
    className={`${className} animate-pulse bg-linear-to-r from-slate-200 via-slate-100 to-slate-200 bg-size-[200%_100%]`}
    style={{
      animation: 'shimmer 2s infinite',
      ...style,
    }}
  />
);

/**
 * Smooth skeleton loader component that replaces spinning spinners
 * Provides better UX by showing content shape while loading
 */
export function SkeletonLoader({
  count = 1,
  type = 'text',
  className = '',
  height = 20,
  width = 100,
}: SkeletonLoaderProps) {
  const skeletons = Array.from({ length: count });

  return (
    <style>{`
      @keyframes shimmer {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
    `}</style>
  );

  // Text skeleton
  if (type === 'text') {
    return (
      <div className={`space-y-2 ${className}`}>
        {skeletons.map((_, i) => (
          <SkeletonShimmer
            key={i}
            className={`h-${height} w-${i === skeletons.length - 1 ? '4/5' : 'full'} rounded`}
          />
        ))}
      </div>
    );
  }

  // Image skeleton
  if (type === 'image') {
    return (
      <SkeletonShimmer
        className={`rounded-lg ${className}`}
        style={{ height: `${height}px`, width: `${width}px`, display: 'block' }}
      />
    );
  }

  // Property card skeleton
  if (type === 'property') {
    return (
      <div className={`space-y-3 ${className}`}>
        <SkeletonShimmer className="h-48 w-full rounded-lg" />
        <SkeletonShimmer className="h-6 w-3/4 rounded" />
        <SkeletonShimmer className="h-4 w-1/2 rounded" />
        <div className="flex gap-2">
          <SkeletonShimmer className="h-4 w-1/4 rounded" />
          <SkeletonShimmer className="h-4 w-1/4 rounded" />
        </div>
        <SkeletonShimmer className="h-8 w-full rounded" />
      </div>
    );
  }

  // Agent card skeleton
  if (type === 'agent') {
    return (
      <div className={`space-y-3 ${className}`}>
        <SkeletonShimmer className="h-40 w-40 rounded-full mx-auto" />
        <SkeletonShimmer className="h-5 w-3/4 rounded mx-auto" />
        <SkeletonShimmer className="h-4 w-1/2 rounded mx-auto" />
        <SkeletonShimmer className="h-8 w-full rounded" />
      </div>
    );
  }

  // List item skeleton
  if (type === 'list') {
    return (
      <div className={`space-y-3 ${className}`}>
        {skeletons.map((_, i) => (
          <div key={i} className="flex gap-4">
            <SkeletonShimmer className="h-12 w-12 rounded-full shrink-0" />
            <div className="flex-1 space-y-2">
              <SkeletonShimmer className="h-4 w-3/4 rounded" />
              <SkeletonShimmer className="h-3 w-1/2 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Table row skeleton
  if (type === 'table') {
    return (
      <div className={`space-y-2 ${className}`}>
        {skeletons.map((_, i) => (
          <div key={i} className="flex gap-3">
            <SkeletonShimmer className="h-8 w-8 rounded" />
            <SkeletonShimmer className="h-8 flex-1 rounded" />
            <SkeletonShimmer className="h-8 flex-1 rounded" />
            <SkeletonShimmer className="h-8 w-20 rounded" />
          </div>
        ))}
      </div>
    );
  }

  // Default card skeleton
  return (
    <div className={`space-y-3 ${className}`}>
      <SkeletonShimmer className="h-6 w-3/4 rounded" />
      <SkeletonShimmer className="h-4 w-full rounded" />
      <SkeletonShimmer className="h-4 w-full rounded" />
      <SkeletonShimmer className="h-8 w-full rounded" />
    </div>
  );
}

/**
 * Grid of skeleton loaders
 */
export function SkeletonGrid({
  count = 6,
  type = 'property',
  columns = 3,
}: {
  count?: number;
  type?: SkeletonLoaderProps['type'];
  columns?: number;
}) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonLoader key={i} type={type} />
      ))}
    </div>
  );
}

/**
 * Progressive skeleton loader with multiple animation phases
 */
export function ProgressiveSkeletonLoader({
  phase = 1,
  maxPhases = 3,
}: {
  phase?: number;
  maxPhases?: number;
}) {
  return (
    <div className="space-y-4">
      {Array.from({ length: Math.min(phase, maxPhases) }).map((_, i) => (
        <SkeletonLoader key={i} count={2} type="text" />
      ))}
    </div>
  );
}
