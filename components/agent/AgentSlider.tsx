'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid'
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  ArrowRightIcon, 
  UserIcon,
  XMarkIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  MapPinIcon,
  CheckBadgeIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  LanguageIcon,
  BuildingOffice2Icon,
  ShieldCheckIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

// Firebase imports
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

interface Agent {
  id: string
  title?: string | null
  bio?: string | null
  experience_years?: number | null
  rating?: number | null
  review_count?: number | null
  total_sales?: number | null
  profile_image?: string | null
  office?: string | null
  license_no?: string | null
  brokerage?: string | null
  commission_rate?: number | null
  languages?: string[] | null
  certifications?: string[] | null
  specializations?: string[] | null
  whatsapp?: string | null
  instagram_handle?: string | null
  linkedin_url?: string | null
  website_url?: string | null
  telegram?: string | null
  verified?: boolean | null
  created_at?: string | null
  updated_at?: string | null
  profiles?: {
    full_name?: string | null
    avatar_url?: string | null
  } | null
}

interface AgentSliderProps {
  agents: Agent[]
  showCount?: number
}

// Agent Details Modal Component
function AgentDetailsModal({ 
  agent, 
  onClose 
}: { 
  agent: Agent | null; 
  onClose: () => void 
}) {
  if (!agent) return null;

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatLanguages = (languages?: string[] | null) => {
    if (!languages || languages.length === 0) return 'English';
    return languages.join(', ');
  };

  const formatSales = (sales?: number | null) => {
    if (!sales) return '0';
    if (sales >= 1000000) return `${(sales / 1000000).toFixed(1)}M+`;
    if (sales >= 1000) return `${(sales / 1000).toFixed(1)}K+`;
    return formatNumber(sales);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in mt-30">
      <div className="relative w-full max-w-4xl h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up flex flex-col">
        {/* Header */}
        <div className="shrink-0 p-6 border-b border-slate-100 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900">
                Agent Profile
              </h2>
              <div className="flex items-center gap-2 text-slate-600 mt-1">
                <MapPinIcon className="h-4 w-4" />
                <span className="font-medium">{agent.office || 'Dubai Office'}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:text-primary hover:bg-slate-200 transition-colors"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Main Content with Scroll */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-6 space-y-8">
            {/* Agent Header with Image */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profile Image */}
              <div className="shrink-0 relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden ring-4 ring-primary/20">
                  <img
                    src={agent.profiles?.avatar_url || agent.profile_image || '/api/placeholder/160/160'}
                    alt={agent.profiles?.full_name || agent.title || 'Agent'}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Verified Badge */}
                {agent.verified && (
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-2 shadow-lg">
                    <ShieldCheckIcon className="h-5 w-5" />
                  </div>
                )}
              </div>

              {/* Agent Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900">
                      {agent.profiles?.full_name || agent.title || 'Agent'}
                    </h3>
                    <p className="text-primary font-bold uppercase tracking-widest text-sm">
                      {agent.title || 'Real Estate Agent'}
                    </p>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <StarSolidIcon 
                          key={i} 
                          className={`h-5 w-5 ${i < Math.floor(agent.rating || 0) ? 'text-yellow-400' : 'text-slate-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="font-bold text-slate-900">{agent.rating || '5.0'}</span>
                    <span className="text-slate-500 text-sm">
                      ({agent.review_count || 0} reviews)
                    </span>
                  </div>
                </div>

                {/* Brokerage Info */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <BuildingOffice2Icon className="h-5 w-5 text-slate-400" />
                    <span className="font-medium text-slate-700">{agent.brokerage || 'Independent Broker'}</span>
                  </div>
                  <div className="h-4 w-px bg-slate-300"></div>
                  <div className="flex items-center gap-2">
                    <CheckBadgeIcon className="h-5 w-5 text-slate-400" />
                    <span className="font-medium text-slate-700">License: {agent.license_no || 'N/A'}</span>
                  </div>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-black text-primary">{agent.experience_years || 0}+</div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Years Exp</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-black text-primary">{formatSales(agent.total_sales)}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Total Sales</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-black text-primary">{agent.commission_rate || 0}%</div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Commission</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-black text-primary">{agent.review_count || 0}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">Reviews</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="bg-slate-50 rounded-2xl p-6">
              <h3 className="text-lg font-black text-slate-900 mb-3">About Me</h3>
              <p className="text-slate-600 leading-relaxed">
                {agent.bio || 'Experienced real estate professional with a proven track record of successful transactions. Specialized in luxury properties and client-focused service.'}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Specializations */}
                <div>
                  <h3 className="text-lg font-black text-slate-900 mb-3">Specializations</h3>
                  <div className="flex flex-wrap gap-2">
                    {(agent.specializations || ['Residential Properties']).map((spec, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                {agent.certifications && agent.certifications.length > 0 && (
                  <div>
                    <h3 className="text-lg font-black text-slate-900 mb-3">Certifications</h3>
                    <ul className="space-y-2">
                      {agent.certifications.map((cert, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <CheckBadgeIcon className="h-5 w-5 text-green-500" />
                          <span className="text-slate-700">{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Languages */}
                <div>
                  <h3 className="text-lg font-black text-slate-900 mb-3">Languages</h3>
                  <div className="flex items-center gap-2">
                    <LanguageIcon className="h-5 w-5 text-slate-400" />
                    <span className="text-slate-700">{formatLanguages(agent.languages)}</span>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-black text-slate-900 mb-3">Contact Information</h3>
                  <div className="space-y-3">
                    {agent.whatsapp && (
                      <a 
                        href={`https://wa.me/${agent.whatsapp}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-slate-700 hover:text-primary transition-colors"
                      >
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <PhoneIcon className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium">WhatsApp</div>
                          <div className="text-sm text-slate-500">{agent.whatsapp}</div>
                        </div>
                      </a>
                    )}

                    {agent.telegram && (
                      <a 
                        href={agent.telegram.startsWith('http') ? agent.telegram : `https://t.me/${agent.telegram}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-slate-700 hover:text-primary transition-colors"
                      >
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <GlobeAltIcon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">Telegram</div>
                          <div className="text-sm text-slate-500">@{agent.telegram.replace('@', '')}</div>
                        </div>
                      </a>
                    )}
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="text-lg font-black text-slate-900 mb-3">Social Links</h3>
                  <div className="flex gap-3">
                    {agent.instagram_handle && (
                      <a 
                        href={agent.instagram_handle.startsWith('http') ? agent.instagram_handle : `https://instagram.com/${agent.instagram_handle}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 hover:bg-pink-200 transition-colors"
                      >
                        <span className="font-bold text-sm">IG</span>
                      </a>
                    )}
                    
                    {agent.website_url && (
                      <a 
                        href={agent.website_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-colors"
                      >
                        <GlobeAltIcon className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Member Since */}
                <div className="flex items-center gap-3">
                  <CalendarIcon className="h-5 w-5 text-slate-400" />
                  <div>
                    <div className="text-sm text-slate-500">Member Since</div>
                    <div className="font-medium text-slate-900">{formatDate(agent.created_at)}</div>
                  </div>
                </div>
              </div>
            </div>

           
          </div>
        </div>
      </div>

      {/* Custom Scrollbar CSS */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}

export default function AgentSlider({ agents, showCount = 4 }: AgentSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [agentDetails, setAgentDetails] = useState<Agent | null>(null)
  const [loadingDetails, setLoadingDetails] = useState(false)

  const nextSlide = () => {
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) =>
      prevIndex + showCount >= agents.length ? 0 : prevIndex + showCount
    )
    setTimeout(() => setIsTransitioning(false), 300)
  }

  const prevSlide = () => {
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) =>
      prevIndex - showCount < 0 ? Math.max(0, agents.length - showCount) : prevIndex - showCount
    )
    setTimeout(() => setIsTransitioning(false), 300)
  }

  // Function to fetch complete agent details from Firebase
  const fetchAgentDetails = async (agentId: string) => {
    try {
      setLoadingDetails(true)
      console.log(`Fetching details for agent: ${agentId}`)
      
      const docRef = doc(db, 'agents', agentId)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        const data = docSnap.data()
        console.log('Agent details fetched:', data)
        
        const detailedAgent: Agent = {
          id: docSnap.id,
          title: data.title || null,
          bio: data.bio || null,
          experience_years: data.experience_years || null,
          rating: data.rating || null,
          review_count: data.review_count || null,
          total_sales: data.total_sales || null,
          profile_image: data.profile_image || null,
          office: data.office || null,
          license_no: data.license_no || null,
          brokerage: data.brokerage || null,
          commission_rate: data.commission_rate || null,
          languages: data.languages || null,
          certifications: data.certifications || null,
          specializations: data.specializations || null,
          whatsapp: data.whatsapp || null,
          instagram_handle: data.instagram_handle || null,
          linkedin_url: data.linkedin_url || null,
          website_url: data.website_url || null,
          telegram: data.telegram || null,
          verified: data.verified || null,
          created_at: data.created_at || null,
          updated_at: data.updated_at || null,
          profiles: null
        }
        
        setAgentDetails(detailedAgent)
        setSelectedAgent(detailedAgent)
      } else {
        console.log('No agent found with ID:', agentId)
        // Fallback to basic agent data
        const basicAgent = agents.find(a => a.id === agentId)
        if (basicAgent) {
          setSelectedAgent(basicAgent)
        }
      }
    } catch (error) {
      console.error('Error fetching agent details:', error)
      // Fallback to basic agent data
      const basicAgent = agents.find(a => a.id === agentId)
      if (basicAgent) {
        setSelectedAgent(basicAgent)
      }
    } finally {
      setLoadingDetails(false)
    }
  }

  // Handle View Profile Click
  const handleViewProfile = async (agent: Agent) => {
    setSelectedAgent(null) // Reset first
    await fetchAgentDetails(agent.id)
  }

  // Close Modal
  const closeModal = () => {
    setSelectedAgent(null)
    setAgentDetails(null)
  }

  const visibleAgents = agents.slice(currentIndex, currentIndex + showCount)

  return (
    <div className="container-custom">
      {/* Agent Details Modal */}
      {selectedAgent && (
        <AgentDetailsModal 
          agent={agentDetails || selectedAgent} 
          onClose={closeModal} 
        />
      )}

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideOut {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(-20px);
          }
        }

        .slide-item {
          animation: slideIn 0.5s ease-out forwards;
        }

        .slide-item.transitioning {
          animation: slideOut 0.3s ease-in forwards;
        }
      `}</style>

      <div className="flex gap-2 ml-8">
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="p-3 rounded-full border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
        >
          <ChevronLeftIcon className="h-5 w-5 text-slate-600" />
        </button>
        <button
          onClick={nextSlide}
          disabled={currentIndex + showCount >= agents.length}
          className="p-3 rounded-full border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
        >
          <ChevronRightIcon className="h-5 w-5 text-slate-600" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 overflow-hidden ">
        {visibleAgents.map((agent, idx) => (
          <div
            key={agent.id}
            className={`slide-item h-full`}
          >
            <div className="card-custom group p-8 text-center">
              <div className="relative mb-6 inline-block">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-slate-50 group-hover:ring-primary/20 transition-all duration-500">
                  <img
                    src={agent.profiles?.avatar_url || agent.profile_image || '/api/placeholder/128/128'}
                    alt={agent.profiles?.full_name || agent.title || 'Agent'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <StarSolidIcon className="h-4 w-4 text-yellow-400" />
                  <span className="text-xs font-bold text-slate-900">{agent.rating || '5.0'}</span>
                </div>
              </div>

              <h3 className="font-black text-2xl text-slate-900 mb-1 group-hover:text-primary transition-colors">
                {agent.profiles?.full_name || agent.title || 'Agent'}
              </h3>
              <p className="text-sm text-primary font-bold uppercase tracking-widest mb-4">{agent.title}</p>

              <div className="flex justify-center gap-6 py-4 border-y border-slate-50 mb-6">
                <div className="text-center">
                  <div className="font-black text-slate-900">{agent.experience_years || '8'}+</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Years</div>
                </div>
                <div className="text-center">
                  <div className="font-black text-slate-900">{agent.total_sales ? Math.floor(agent.total_sales / 1000000) : '45'}M+</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Sales</div>
                </div>
              </div>


              {/* VIEW PROFILE BUTTON */}
              <button 
                onClick={() => handleViewProfile(agent)}
                className="w-full  bg-white text-primary font-bold py-4 px-6 rounded-3xl border-2 border-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
              >
                
                View Profile
               
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        {/* Loading indicator for modal */}
        {loadingDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-slate-700 font-medium">Loading agent details...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}