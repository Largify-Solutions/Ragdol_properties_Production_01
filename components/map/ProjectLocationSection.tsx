'use client'

import dynamic from 'next/dynamic'
import { GlobeAltIcon } from '@heroicons/react/24/outline'

const ProjectLocationMap = dynamic(
  () => import('./ProjectLocationMap'),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-video bg-muted rounded-xl animate-pulse flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading map…</p>
      </div>
    ),
  }
)

interface Props {
  coords?: { lat: number; lng: number } | null | any
  name: string
  area?: string | null
  city?: string
}

export default function ProjectLocationSection({ coords, name, area, city }: Props) {
  const lat = coords?.lat != null ? parseFloat(coords.lat) : null
  const lng = coords?.lng != null ? parseFloat(coords.lng) : null

  if (!lat || !lng || isNaN(lat) || isNaN(lng)) {
    return (
      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <GlobeAltIcon className="w-12 h-12 mx-auto mb-2" />
          <p>No location set for this project</p>
        </div>
      </div>
    )
  }

  return (
    <ProjectLocationMap
      lat={lat}
      lng={lng}
      name={name}
      area={area ?? undefined}
      city={city}
    />
  )
}
