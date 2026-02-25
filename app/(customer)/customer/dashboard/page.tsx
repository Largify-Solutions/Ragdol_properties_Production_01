'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  HeartIcon, 
  ChatBubbleLeftRightIcon, 
  ChartBarIcon,
  BellIcon,
  Cog6ToothIcon,
  SparklesIcon,
  HomeIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import { supabase } from '@/lib/supabase-browser'

interface SavedProperty {
  id: string
  property_id: string
  saved_at: string
  property: {
    id: string
    title: string
    slug: string
    type: string
    status: string
    price: number
    currency: string
    beds: number
    baths: number
    sqft: number
    image: string
    location: string
    area: string
    city: string
    featured: boolean
  } | null
}

export default function CustomerDashboard() {
  const { user, profile } = useAuth()
  const [savedProperties, setSavedProperties] = useState<SavedProperty[]>([])
  const [inquiriesCount, setInquiriesCount] = useState(0)
  const [valuationsCount, setValuationsCount] = useState(0)
  const [propertiesCount, setPropertiesCount] = useState(0)
  const [loading, setLoading] = useState(true)

  // Simple function to fetch all counts
  const fetchAllCounts = async () => {
    try {
      if (!user?.email) {
        console.log('User not logged in')
        return
      }

      setLoading(true)
      
      console.log('🔍 Fetching all counts...')
      
      // 1. Saved Properties from API
      try {
        const savedResponse = await fetch('/api/customer/saved-properties')
        const savedData = await savedResponse.json()
        const savedProps = savedData.savedProperties || []
        setSavedProperties(savedProps.slice(0, 3))
        console.log('✅ Saved properties:', savedProps.length)
      } catch (error) {
        console.log('❌ Saved properties error:', error)
      }

      // 2. Count ALL Properties from Supabase
      try {
        const { count: totalProperties, error: propError } = await supabase
          .from('properties')
          .select('*', { count: 'exact', head: true })
        
        if (propError) throw propError
        setPropertiesCount(totalProperties || 0)
        console.log('✅ Total properties count:', totalProperties)
      } catch (error) {
        console.log('❌ Properties count error:', error)
      }

      // 3. Count Inquiries for this user
      try {
        const { count: userInquiries, error: inqError } = await supabase
          .from('inquiries')
          .select('*', { count: 'exact', head: true })
          .eq('client_email', user.email)
        
        if (inqError) throw inqError
        setInquiriesCount(userInquiries || 0)
        console.log('✅ User inquiries count:', userInquiries)
      } catch (error) {
        console.log('❌ Inquiries count error:', error)
      }

      // 4. Count Valuations for this user
      try {
        const { count: userValuations, error: valError } = await supabase
          .from('property_valuations')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.uid || '')
        
        if (valError) throw valError
        setValuationsCount(userValuations || 0)
        console.log('✅ User valuations count:', userValuations)
      } catch (error) {
        console.log('❌ Valuations count error:', error)
      }

      console.log('📊 Final Counts:', {
        properties: propertiesCount,
        saved: savedProperties.length,
        inquiries: inquiriesCount,
        valuations: valuationsCount
      })

    } catch (error) {
      console.error('❌ Error in fetchAllCounts:', error)
    } finally {
      setLoading(false)
      console.log('✅ Loading completed')
    }
  }

  useEffect(() => {
    if (user?.email) {
      fetchAllCounts()
    }
  }, [user?.email])

  const stats = [
    { 
      label: 'Total Properties', 
      value: propertiesCount.toString(), 
      icon: BuildingOfficeIcon,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      description: 'All properties in database'
    },
   
    { 
      label: 'Your Inquiries', 
      value: inquiriesCount.toString(), 
      icon: ChatBubbleLeftRightIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Your property inquiries'
    },
    { 
      label: 'Valuations', 
      value: valuationsCount.toString(), 
      icon: ChartBarIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Property valuations requested'
    },
  ]

  // Sample inquiries data for display
  const sampleInquiries = [
    { id: 1, title: 'Emirates Hills Villa Inquiry', date: '2 days ago', status: 'pending' },
    { id: 2, title: 'Palm Jumeirah Apartment Questions', date: '1 week ago', status: 'completed' },
    { id: 3, title: 'Downtown Dubai Penthouse Details', date: '3 days ago', status: 'in progress' },
  ]

  // Sample valuations data for display
  const sampleValuations = [
    { id: 1, title: '4 Bedroom Villa Valuation', date: 'Yesterday', status: 'pending' },
    { id: 2, title: 'Commercial Property Appraisal', date: '5 days ago', status: 'completed' },
  ]

  return (
    <div className="min-h-screen bg-slate-50 p-8 md:p-12">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-serif text-secondary mb-2">
            Welcome back, <span className="text-primary italic">{profile?.full_name?.split(' ')[0] || 'Client'}</span>
          </h1>
          <p className="text-slate-500">Manage your luxury real estate portfolio and inquiries.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-3 bg-white rounded-xl border border-slate-200 text-slate-400 hover:text-primary transition-all relative">
            <BellIcon className="h-6 w-6" />
            <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-bold text-secondary">{profile?.full_name || user?.email}</div>
              <div className="text-xs text-slate-400 uppercase tracking-widest">Private Client</div>
            </div>
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary font-bold text-lg">
              {profile?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || 'C'}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid - REAL COUNTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${stat.bgColor} rounded-xl group-hover:scale-105 transition-transform`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">
                Live
              </span>
            </div>
            <div className="text-2xl font-bold text-secondary mb-1">
              {loading ? (
                <div className="h-8 w-16 bg-slate-200 rounded animate-pulse"></div>
              ) : (
                <div className="flex items-end gap-1">
                  <span>{stat.value}</span>
                  {index === 0 && (
                    <span className="text-xs text-slate-500 font-normal">
                      properties
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="text-slate-700 font-medium mb-1">{stat.label}</div>
            <div className="text-xs text-slate-500">{stat.description}</div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-8">
         

          {/* Recent Activity */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-serif text-secondary">Your Activity</h3>
                <p className="text-slate-500 text-sm">
                  Real-time counts from Firebase
                </p>
              </div>
              <div className="flex gap-2">
                <div className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                  {inquiriesCount} Inquiries
                </div>
                <div className="text-xs font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                  {valuationsCount} Valuations
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Inquiries Card */}
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-secondary">Your Inquiries</h4>
                    <div className="text-3xl font-bold text-blue-700">{inquiriesCount}</div>
                  </div>
                </div>
                
                {inquiriesCount > 0 ? (
                  <div className="space-y-3">
                    <div className="text-sm text-slate-600">
                      Latest inquiries:
                    </div>
                    {sampleInquiries.slice(0, Math.min(2, inquiriesCount)).map((inquiry) => (
                      <div key={inquiry.id} className="p-3 bg-white rounded-lg border border-blue-100">
                        <div className="font-medium text-sm text-secondary truncate">{inquiry.title}</div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-slate-500">{inquiry.date}</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                            inquiry.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {inquiry.status}
                          </span>
                        </div>
                      </div>
                    ))}
                    {inquiriesCount > 2 && (
                      <Link 
                        href="/customer/inquiries" 
                        className="block text-center text-blue-600 hover:text-blue-800 text-sm font-bold pt-2"
                      >
                        View all {inquiriesCount} inquiries →
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-slate-500 mb-4">No inquiries yet</p>
                    <Link 
                      href="/customer/questions" 
                      className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700"
                    >
                      Make Inquiry
                    </Link>
                  </div>
                )}
              </div>

              {/* Valuations Card */}
              <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <ChartBarIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-secondary">Valuations</h4>
                    <div className="text-3xl font-bold text-purple-700">{valuationsCount}</div>
                  </div>
                </div>
                
                {valuationsCount > 0 ? (
                  <div className="space-y-3">
                    <div className="text-sm text-slate-600">
                      Recent valuations:
                    </div>
                    {sampleValuations.slice(0, Math.min(2, valuationsCount)).map((valuation) => (
                      <div key={valuation.id} className="p-3 bg-white rounded-lg border border-purple-100">
                        <div className="font-medium text-sm text-secondary truncate">{valuation.title}</div>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-slate-500">{valuation.date}</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                            valuation.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {valuation.status}
                          </span>
                        </div>
                      </div>
                    ))}
                    {valuationsCount > 2 && (
                      <Link 
                        href="/customer/valuations" 
                        className="block text-center text-purple-600 hover:text-purple-800 text-sm font-bold pt-2"
                      >
                        View all {valuationsCount} valuations →
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-slate-500 mb-4">No valuations yet</p>
                    <Link 
                      href="/customer/property-valuation" 
                      className="inline-block px-4 py-2 bg-purple-600 text-white text-sm font-bold rounded-lg hover:bg-purple-700"
                    >
                      Get Valuation
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8">
            <h3 className="text-xl font-serif text-secondary mb-6">Quick Actions</h3>
            <div className="grid gap-4">
              <Link href="/customer/property-valuation" className="flex items-center gap-4 p-4 bg-slate-50 hover:bg-primary/10 rounded-2xl transition-all group">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <ChartBarIcon className="h-6 w-6 text-primary" />
                </div>
                <span className="font-bold text-secondary group-hover:text-primary">Get Valuation</span>
              </Link>
              <Link href="/customer/questions" className="flex items-center gap-4 p-4 bg-slate-50 hover:bg-primary/10 rounded-2xl transition-all group">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <ChatBubbleLeftRightIcon className="h-6 w-6 text-primary" />
                </div>
                <span className="font-bold text-secondary group-hover:text-primary">Get Inquiry</span>
              </Link>
             
            </div>
          </div>

          {/* Dashboard Summary */}
          <div className="bg-primary/10 rounded-[2.5rem] p-8 border border-primary/20">
            <h3 className="text-xl font-serif text-secondary mb-6">Dashboard Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-primary/20">
                <span className="text-slate-700">Total Properties:</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-secondary text-lg">{propertiesCount}</span>
                  <BuildingOfficeIcon className="h-4 w-4 text-emerald-600" />
                </div>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-primary/20">
                <span className="text-slate-700">Your Inquiries:</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-secondary text-lg">{inquiriesCount}</span>
                  <ChatBubbleLeftRightIcon className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-primary/20">
                <span className="text-slate-700">Valuations:</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-secondary text-lg">{valuationsCount}</span>
                  <ChartBarIcon className="h-4 w-4 text-purple-600" />
                </div>
              </div>
            
            </div>
          </div>

          {/* Firebase Status */}
          <div className="bg-linear-to-r from-emerald-50 to-green-50 rounded-[2.5rem] p-6 border border-emerald-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white rounded-full shadow-sm">
                <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
             
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                <span className="text-emerald-700">Properties Collection:</span>
                <span className="font-bold bg-emerald-100 text-emerald-800 px-2 py-1 rounded">
                  {propertiesCount}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                <span className="text-blue-700">Inquiries Collection:</span>
                <span className="font-bold bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {inquiriesCount}
                </span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white/50 rounded-lg">
                <span className="text-purple-700">Valuations Collection:</span>
                <span className="font-bold bg-purple-100 text-purple-800 px-2 py-1 rounded">
                  {valuationsCount}
                </span>
              </div>
              <div className="pt-2 text-xs text-emerald-600 bg-white/30 p-2 rounded">
                <div className="font-bold mb-1">Collections Status:</div>
                <div>• properties: {propertiesCount > 0 ? '✅' : '📁'}</div>
                <div>• inquiries: {inquiriesCount > 0 ? '✅' : '📁'}</div>
                <div>• valuations: {valuationsCount > 0 ? '✅' : '📁'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}