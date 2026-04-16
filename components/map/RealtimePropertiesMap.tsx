'use client'

import { useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

const ENGLISH_TILE_URL = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
const ENGLISH_TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'

const defaultCenter: [number, number] = [25.2048, 55.2708]

const markerIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

export interface RealtimeMapProperty {
  id: string
  title: string
  price: number
  status: string
  type: string
  location: string
  lat: number
  lng: number
  updated_at: string
}

interface RealtimePropertiesMapProps {
  properties: RealtimeMapProperty[]
}

function formatCurrency(value: number) {
  return `AED ${new Intl.NumberFormat('en-US').format(value || 0)}`
}

export default function RealtimePropertiesMap({ properties }: RealtimePropertiesMapProps) {
  const safeProperties = useMemo(
    () => properties.filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lng)),
    [properties]
  )

  const center = useMemo<[number, number]>(() => {
    if (safeProperties.length === 0) return defaultCenter

    const total = safeProperties.reduce(
      (acc, p) => {
        acc.lat += p.lat
        acc.lng += p.lng
        return acc
      },
      { lat: 0, lng: 0 }
    )

    return [total.lat / safeProperties.length, total.lng / safeProperties.length]
  }, [safeProperties])

  const latestUpdate = useMemo(() => {
    if (safeProperties.length === 0) return null
    return [...safeProperties].sort(
      (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )[0]
  }, [safeProperties])

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-slate-700">
          Live markers: <span className="text-primary">{safeProperties.length}</span>
        </p>
        <p className="text-xs text-slate-500">
          Last property update:{' '}
          {latestUpdate
            ? new Date(latestUpdate.updated_at).toLocaleString('en-US')
            : 'N/A'}
        </p>
      </div>

      <div className="h-[480px] w-full" style={{ position: 'relative', zIndex: 0 }}>
        <MapContainer
          center={center}
          zoom={11}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution={ENGLISH_TILE_ATTRIBUTION}
            url={ENGLISH_TILE_URL}
          />

          {safeProperties.map((property) => (
            <Marker
              key={property.id}
              position={[property.lat, property.lng]}
              icon={markerIcon}
            >
              <Popup>
                <div className="min-w-[220px]">
                  <h4 className="font-semibold text-slate-900 mb-1">{property.title}</h4>
                  <p className="text-xs text-slate-600 mb-1">{property.location}</p>
                  <p className="text-sm font-semibold text-primary mb-2">
                    {formatCurrency(property.price)}
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 capitalize">
                      {property.status || 'sale'}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5">
                      {property.type || 'Property'}
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  )
}
