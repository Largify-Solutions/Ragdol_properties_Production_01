'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { PropertyFilters } from '@/lib/hooks/usePropertyListings'

interface PropertyFiltersProps {
  filters: PropertyFilters
  onFilterChange: (key: keyof PropertyFilters, value: string) => void
  onReset: () => void
  onSubmit?: () => void
  preset: 'all' | 'sale' | 'rent' | 'commercial' | 'luxe'
}

// Location options based on actual Dubai areas
const LOCATION_OPTIONS = [
  { value: '', label: 'All Areas' },
  { value: 'Dubai Marina', label: 'Dubai Marina' },
  { value: 'Downtown Dubai', label: 'Downtown Dubai' },
  { value: 'Palm Jumeirah', label: 'Palm Jumeirah' },
  { value: 'Business Bay', label: 'Business Bay' },
  { value: 'Jumeirah', label: 'Jumeirah' },
  { value: 'Dubai Hills Estate', label: 'Dubai Hills Estate' },
  { value: 'Dubai Creek Harbour', label: 'Dubai Creek Harbour' },
  { value: 'Emirates Hills', label: 'Emirates Hills' },
  { value: 'Arabian Ranches', label: 'Arabian Ranches' },
  { value: 'Dubai South', label: 'Dubai South' },
  { value: 'Al Barsha', label: 'Al Barsha' },
  { value: 'Jumeirah Beach Residence', label: 'JBR' },
  { value: 'Dubai Islands', label: 'Dubai Islands' },
  { value: 'DIFC', label: 'DIFC' },
  { value: 'City Walk', label: 'City Walk' },
  { value: 'Bluewaters Island', label: 'Bluewaters Island' },
]

// Property types for residential
const RESIDENTIAL_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'apartment', label: 'Apartments' },
  { value: 'villa', label: 'Villas' },
  { value: 'townhouse', label: 'Townhouses' },
  { value: 'penthouse', label: 'Penthouses' },
  { value: 'studio', label: 'Studios' },
  { value: 'duplex', label: 'Duplex' },
]

// Property types for commercial
const COMMERCIAL_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'office', label: 'Offices' },
  { value: 'shop', label: 'Retail Shops' },
  { value: 'warehouse', label: 'Warehouses' },
  { value: 'building', label: 'Buildings' },
  { value: 'showroom', label: 'Showrooms' },
]

// Completion status options
const COMPLETION_OPTIONS = [
  { value: '', label: 'Any' },
  { value: 'ready', label: 'Ready' },
  { value: 'off-plan', label: 'Off-Plan' },
]

// Bedrooms options
const BEDROOM_OPTIONS = ['', '1', '2', '3', '4', '5']
const BATHROOM_OPTIONS = ['', '1', '2', '3', '4', '5']

export default function PropertyFiltersPanel({
  filters,
  onFilterChange,
  onReset,
  onSubmit,
  preset
}: PropertyFiltersProps) {
  const isCommercial = preset === 'commercial'
  const propertyTypes = isCommercial ? COMMERCIAL_TYPES : RESIDENTIAL_TYPES
  
  // Show action filter only for 'all' preset
  const showActionFilter = preset === 'all'
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.()
  }

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/50 p-4 sm:p-8 border border-slate-100">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-black text-slate-900">Filters</h3>
        <button 
          type="button" 
          onClick={onReset}
          className="text-xs font-bold text-primary uppercase tracking-widest hover:text-primary/80 transition-colors"
        >
          Reset All
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Search */}
        <div className="space-y-3">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Keywords</label>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input 
              name="search" 
              type="text" 
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              placeholder="Search by name, location..." 
              className="w-full bg-slate-50 border-none rounded-2xl pl-12 pr-4 py-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 transition-all font-medium" 
            />
          </div>
        </div>

        {/* Action (Rent/Sale) - Only for 'all' preset */}
        {showActionFilter && (
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Property For</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'all', label: 'All' },
                { value: 'rent', label: 'Rent' },
                { value: 'buy', label: 'Buy' }
              ].map((opt) => (
                <label key={opt.value} className="relative cursor-pointer group">
                  <input 
                    type="radio" 
                    name="action" 
                    value={opt.value} 
                    checked={filters.action === opt.value}
                    onChange={(e) => onFilterChange('action', e.target.value)}
                    className="peer sr-only" 
                  />
                  <div className="flex items-center justify-center py-3 rounded-xl bg-slate-50 text-slate-600 font-bold text-sm peer-checked:bg-primary peer-checked:text-white group-hover:bg-slate-100 transition-all">
                    {opt.label}
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Property Type */}
        <div className="space-y-3">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Property Type</label>
          <select 
            name="type" 
            value={filters.type}
            onChange={(e) => onFilterChange('type', e.target.value)}
            className="w-full bg-slate-50 border-none rounded-2xl px-4 py-4 text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all font-medium appearance-none cursor-pointer"
          >
            {propertyTypes.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="space-y-3">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Location</label>
          <select 
            name="area" 
            value={filters.area}
            onChange={(e) => onFilterChange('area', e.target.value)}
            className="w-full bg-slate-50 border-none rounded-2xl px-4 py-4 text-slate-900 focus:ring-2 focus:ring-primary/20 transition-all font-medium appearance-none cursor-pointer"
          >
            {LOCATION_OPTIONS.map((loc) => (
              <option key={loc.value} value={loc.value}>{loc.label}</option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Price Range (AED)</label>
          <div className="grid grid-cols-2 gap-3">
            <input
              name="minPrice"
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => onFilterChange('minPrice', e.target.value)}
              className="w-full bg-slate-50 border-none rounded-2xl px-4 py-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 transition-all font-medium"
            />
            <input
              name="maxPrice"
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => onFilterChange('maxPrice', e.target.value)}
              className="w-full bg-slate-50 border-none rounded-2xl px-4 py-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-primary/20 transition-all font-medium"
            />
          </div>
        </div>

        {/* Bedrooms - Only for non-commercial */}
        {!isCommercial && (
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Bedrooms</label>
            <div className="flex flex-wrap gap-2">
              {BEDROOM_OPTIONS.map((val) => (
                <label key={val} className="relative cursor-pointer group">
                  <input 
                    type="radio" 
                    name="beds" 
                    value={val}
                    checked={filters.beds === val}
                    onChange={(e) => onFilterChange('beds', e.target.value)}
                    className="peer sr-only" 
                  />
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 text-slate-600 font-bold text-sm peer-checked:bg-primary peer-checked:text-white group-hover:bg-slate-100 transition-all">
                    {val === '' ? 'Any' : val === '5' ? '5+' : val}
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Bathrooms - Only for non-commercial */}
        {!isCommercial && (
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Bathrooms</label>
            <div className="flex flex-wrap gap-2">
              {BATHROOM_OPTIONS.map((val) => (
                <label key={val} className="relative cursor-pointer group">
                  <input 
                    type="radio" 
                    name="baths" 
                    value={val}
                    checked={filters.baths === val}
                    onChange={(e) => onFilterChange('baths', e.target.value)}
                    className="peer sr-only" 
                  />
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 text-slate-600 font-bold text-sm peer-checked:bg-primary peer-checked:text-white group-hover:bg-slate-100 transition-all">
                    {val === '' ? 'Any' : val === '5' ? '5+' : val}
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Furnished - Only for rent */}
        {(preset === 'rent' || preset === 'all') && !isCommercial && (
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Furnished</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: '', label: 'Any' },
                { value: 'true', label: 'Yes' },
                { value: 'false', label: 'No' }
              ].map((opt) => (
                <label key={opt.value} className="relative cursor-pointer group">
                  <input 
                    type="radio" 
                    name="furnished" 
                    value={opt.value}
                    checked={filters.furnished === opt.value}
                    onChange={(e) => onFilterChange('furnished', e.target.value)}
                    className="peer sr-only" 
                  />
                  <div className="flex items-center justify-center py-3 rounded-xl bg-slate-50 text-slate-600 font-bold text-sm peer-checked:bg-primary peer-checked:text-white group-hover:bg-slate-100 transition-all">
                    {opt.label}
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Completion Status - For sale/off-plan */}
        {(preset === 'sale' || preset === 'all' || preset === 'luxe') && (
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Completion</label>
            <div className="grid grid-cols-3 gap-2">
              {COMPLETION_OPTIONS.map((opt) => (
                <label key={opt.value} className="relative cursor-pointer group">
                  <input 
                    type="radio" 
                    name="completion" 
                    value={opt.value}
                    checked={filters.completion === opt.value}
                    onChange={(e) => onFilterChange('completion', e.target.value)}
                    className="peer sr-only" 
                  />
                  <div className="flex items-center justify-center py-3 rounded-xl bg-slate-50 text-slate-600 font-bold text-sm peer-checked:bg-primary peer-checked:text-white group-hover:bg-slate-100 transition-all">
                    {opt.label}
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Video Filter */}
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={filters.hasVideo === 'true'}
              onChange={(e) => onFilterChange('hasVideo', e.target.checked ? 'true' : '')}
              className="w-5 h-5 text-primary bg-slate-50 border-slate-300 rounded focus:ring-primary/20 focus:ring-2 cursor-pointer" 
            />
            <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
              Has Video Tour
            </span>
          </label>
        </div>

        {/* Apply button for mobile */}
        <button 
          type="submit" 
          className="w-full lg:hidden bg-primary text-white font-bold py-4 rounded-2xl hover:bg-primary/90 transition-colors"
        >
          Apply Filters
        </button>
      </form>
    </div>
  )
}
