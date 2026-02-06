"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

type Props = {
  initialValue?: string
}

const popularLocations = [
  'Dubai Marina',
  'Palm Jumeirah',
  'Downtown Dubai',
  'Jumeirah Bay',
  'Business Bay',
  'Emirates Hills'
]

export default function HeroSearch({ initialValue = '' }: Props) {
  const { t } = useTranslation()
  const [term, setTerm] = useState(initialValue)
  const [activeTab, setActiveTab] = useState<'buy' | 'rent'>('buy')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const router = useRouter()

  const handleSearch = () => {
    const trimmed = (term || '').trim()
    const params = new URLSearchParams()
    params.set('action', activeTab)
    if (trimmed) params.set('search', trimmed)
    const query = params.toString()
    const url = query ? `/properties?${query}` : '/properties'
    router.push(url)
    setShowSuggestions(false)
  }

  const handleLocationClick = (location: string) => {
    setTerm(location)
    setShowSuggestions(false)
    // Auto-search after selecting location
    const params = new URLSearchParams()
    params.set('action', activeTab)
    params.set('search', location)
    router.push(`/properties?${params.toString()}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const filteredLocations = term.length > 0 
    ? popularLocations.filter(loc => loc.toLowerCase().includes(term.toLowerCase()))
    : popularLocations

  return (
    <div className="w-full max-w-4xl mx-auto animate-slide-up">
      {/* Tabs */}
      <div className="flex space-x-1 mb-1 ml-1">
        <button
          onClick={() => setActiveTab('buy')}
          className={`px-6 py-2.5 rounded-t-xl text-sm font-bold transition-all duration-300 ${
            activeTab === 'buy' 
              ? 'bg-white text-slate-900 shadow-sm' 
              : 'bg-slate-900/40 text-white hover:bg-slate-900/60 backdrop-blur-md'
          }`}
        >
          {t('common.buy').toUpperCase()}
        </button>
        <button
          onClick={() => setActiveTab('rent')}
          className={`px-6 py-2.5 rounded-t-xl text-sm font-bold transition-all duration-300 ${
            activeTab === 'rent' 
              ? 'bg-white text-slate-900 shadow-sm' 
              : 'bg-slate-900/40 text-white hover:bg-slate-900/60 backdrop-blur-md'
          }`}
        >
          {t('common.rent').toUpperCase()}
        </button>
      </div>

      {/* Search Box */}
      <div className="bg-white p-1 md:p-2 rounded-2xl md:rounded-3xl shadow-2xl">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          <div className="relative flex-1">
            <MapPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by location, project, or developer..."
              value={term}
              onChange={(e) => {
                setTerm(e.target.value)
                setShowSuggestions(true)
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={handleKeyDown}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-xl md:rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400 font-medium"
            />
            
            {/* Suggestions Dropdown */}
            {showSuggestions && filteredLocations.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50">
                {filteredLocations.map((location) => (
                  <button
                    key={location}
                    onClick={() => handleLocationClick(location)}
                    className="w-full text-left px-4 py-3 hover:bg-slate-50 border-b border-slate-100 last:border-b-0 transition-colors flex items-center gap-2 text-slate-700 font-medium"
                  >
                    <MapPinIcon className="h-4 w-4 text-slate-400" />
                    {location}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button
            onClick={handleSearch}
            className="w-full md:w-auto btn-primary py-4! px-10! rounded-xl! md:rounded-2xl! shadow-xl shadow-primary/20 flex items-center justify-center gap-2 font-bold"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
            Search
          </button>
        </div>
      </div>
      
      {/* Quick Links */}
      <div className="mt-4 flex flex-wrap justify-center gap-3 text-white/80 text-sm font-medium">
        <span className="opacity-60">Popular:</span>
        {['Dubai Marina', 'Palm Jumeirah', 'Downtown Dubai', 'Business Bay'].map((loc) => (
          <button 
            key={loc}
            onClick={() => handleLocationClick(loc)} 
            className="hover:text-white transition-colors underline underline-offset-4 decoration-primary/40 hover:decoration-primary/80"
          >
            {loc}
          </button>
        ))}
      </div>
    </div>
  )
}
