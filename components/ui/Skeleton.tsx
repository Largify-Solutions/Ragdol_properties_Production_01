import React from 'react';
import clsx from 'clsx';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave';
}

export function Skeleton({
  className = '',
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
}: SkeletonProps) {
  const baseClasses = clsx(
    'bg-gray-300',
    animation === 'pulse' ? 'animate-pulse' : 'animate-shimmer',
    variant === 'circular' && 'rounded-full',
    variant === 'rectangular' && 'rounded-md',
    variant === 'text' && 'rounded-full h-4',
    className
  );

  return (
    <div
      className={baseClasses}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  );
}
