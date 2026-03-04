'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'

const markerIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap()
  useEffect(() => {
    map.setView([lat, lng], map.getZoom())
  }, [lat, lng, map])
  return null
}

interface Props {
  lat: number
  lng: number
  name: string
  area?: string
  city?: string
}

export default function ProjectLocationMap({ lat, lng, name, area, city }: Props) {
  const address = [area, city].filter(Boolean).join(', ')
  const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`

  return (
    <div className="space-y-3">
      <div
        className="rounded-xl overflow-hidden border border-border"
        style={{ height: '340px', position: 'relative', zIndex: 0 }}
      >
        <MapContainer
          center={[lat, lng]}
          zoom={14}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <RecenterMap lat={lat} lng={lng} />
          <Marker position={[lat, lng]} icon={markerIcon}>
            <Popup>
              <div style={{ minWidth: '160px' }}>
                <strong style={{ display: 'block', marginBottom: 4 }}>{name}</strong>
                {address && (
                  <span style={{ fontSize: 12, color: '#555', display: 'block', marginBottom: 4 }}>
                    {address}
                  </span>
                )}
                <span style={{ fontSize: 11, color: '#999' }}>
                  Coordinates: {lat.toFixed(5)}, {lng.toFixed(5)}
                </span>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="flex gap-3">
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold bg-[#c9a84c] text-white hover:opacity-90 transition-opacity"
        >
          📍 Get Directions
        </a>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold border border-border hover:bg-muted transition-colors"
        >
          🗺 Open in Google Maps
        </a>
      </div>
    </div>
  )
}
