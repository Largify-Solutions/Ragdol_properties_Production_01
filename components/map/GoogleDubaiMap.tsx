'use client'

import React from 'react'

type GoogleDubaiMapProps = {
  query?: string
  className?: string
  heightClassName?: string
}

export default function GoogleDubaiMap({
  query = 'Dubai, UAE',
  className = '',
  heightClassName = 'h-[420px]'
}: GoogleDubaiMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const embedSrc = apiKey
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(query)}`
    : `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=12&output=embed`

  return (
    <div className={`w-full ${heightClassName} overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`.trim()}>
      <iframe
        title="Dubai Map"
        src={embedSrc}
        className="h-full w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  )
}
