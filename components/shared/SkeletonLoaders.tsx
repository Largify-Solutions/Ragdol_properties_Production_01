'use client'

/**
 * Premium Skeleton Loading Components
 * Provides smooth shimmer animations for data loading states
 */

// Base shimmer animation className
const shimmer = "animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%]"

// Property Card Skeleton
export function PropertyCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
      {/* Image placeholder */}
      <div className={`h-48 md:h-56 ${shimmer}`} />
      
      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Price */}
        <div className={`h-6 w-32 rounded ${shimmer}`} />
        
        {/* Title */}
        <div className={`h-5 w-full rounded ${shimmer}`} />
        
        {/* Location */}
        <div className={`h-4 w-3/4 rounded ${shimmer}`} />
        
        {/* Details */}
        <div className="flex gap-4">
          <div className={`h-4 w-16 rounded ${shimmer}`} />
          <div className={`h-4 w-16 rounded ${shimmer}`} />
          <div className={`h-4 w-20 rounded ${shimmer}`} />
        </div>
        
        {/* Type */}
        <div className={`h-4 w-24 rounded ${shimmer}`} />
      </div>
    </div>
  )
}

// Project Card Skeleton
export function ProjectCardSkeleton() {
  return (
    <div className="group">
      {/* Image */}
      <div className={`aspect-4/5 rounded-3xl ${shimmer} mb-6`} />
      
      {/* Title */}
      <div className={`h-6 w-3/4 rounded mb-2 ${shimmer}`} />
      
      {/* Location */}
      <div className={`h-4 w-1/2 rounded mb-2 ${shimmer}`} />
      
      {/* Price */}
      <div className={`h-5 w-2/3 rounded ${shimmer}`} />
    </div>
  )
}

// Partner Card Skeleton
export function PartnerCardSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-2xl bg-slate-50 border border-slate-100">
      {/* Logo */}
      <div className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-3 sm:mb-4 rounded-xl ${shimmer}`} />
      
      {/* Name */}
      <div className={`h-5 w-20 rounded ${shimmer}`} />
    </div>
  )
}

// Blog Card Skeleton
export function BlogCardSkeleton() {
  return (
    <div className="group">
      {/* Image */}
      <div className={`aspect-16/10 rounded-3xl mb-6 ${shimmer}`} />
      
      {/* Meta */}
      <div className="flex justify-between mb-3">
        <div className={`h-3 w-20 rounded ${shimmer}`} />
        <div className={`h-3 w-16 rounded ${shimmer}`} />
      </div>
      
      {/* Title */}
      <div className={`h-7 w-full rounded mb-2 ${shimmer}`} />
      <div className={`h-7 w-3/4 rounded mb-2 ${shimmer}`} />
      
      {/* Excerpt */}
      <div className={`h-4 w-full rounded mb-1 ${shimmer}`} />
      <div className={`h-4 w-2/3 rounded mb-3 ${shimmer}`} />
      
      {/* Read time */}
      <div className={`h-3 w-16 rounded ${shimmer}`} />
    </div>
  )
}

// Agent Card Skeleton
export function AgentCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      {/* Avatar */}
      <div className={`w-24 h-24 rounded-full mx-auto mb-4 ${shimmer}`} />
      
      {/* Name */}
      <div className={`h-5 w-32 mx-auto rounded mb-2 ${shimmer}`} />
      
      {/* Title */}
      <div className={`h-4 w-24 mx-auto rounded mb-4 ${shimmer}`} />
      
      {/* Stats */}
      <div className="flex justify-center gap-4">
        <div className={`h-8 w-16 rounded ${shimmer}`} />
        <div className={`h-8 w-16 rounded ${shimmer}`} />
      </div>
    </div>
  )
}

// Testimonial Card Skeleton
export function TestimonialCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
      {/* Quote icon */}
      <div className={`w-14 h-14 rounded-2xl mb-4 ${shimmer}`} />
      
      {/* Content */}
      <div className="space-y-2 mb-8">
        <div className={`h-4 w-full rounded ${shimmer}`} />
        <div className={`h-4 w-full rounded ${shimmer}`} />
        <div className={`h-4 w-3/4 rounded ${shimmer}`} />
      </div>
      
      {/* Author */}
      <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
        <div className={`w-14 h-14 rounded-full ${shimmer}`} />
        <div className="flex-1">
          <div className={`h-5 w-32 rounded mb-2 ${shimmer}`} />
          <div className={`h-4 w-24 rounded ${shimmer}`} />
        </div>
      </div>
    </div>
  )
}

// Property Slider Skeleton (shows 4 cards)
export function PropertySliderSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="container-custom">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <PropertyCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

// Video Showcase Skeleton
export function VideoShowcaseSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="relative aspect-video rounded-3xl overflow-hidden">
          <div className={`w-full h-full ${shimmer}`} />
        </div>
      ))}
    </div>
  )
}
