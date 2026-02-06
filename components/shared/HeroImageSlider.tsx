
'use client'

import { useState, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'

interface HeroImage {
  url: string
  title: string
  description: string
}

// Comprehensive property image collection - Creek Palace Dubai Creek Harbour
const heroImages: HeroImage[] = [
  {
    url: '/CREEK_PALACE_DCH_EMAAR_1.jpg',
    title: 'Creek Palace Waterfront Living',
    description: 'Iconic waterfront community with stunning creek views'
  },
  {
    url: '/CREEK_PALACE_DCH_EMAAR_2.jpg',
    title: 'Luxury Creek Palace Apartments',
    description: 'Premium apartments overlooking Dubai Creek Harbour'
  },
  {
    url: '/CREEK_PALACE_DCH_EMAAR_3.jpg',
    title: 'Creek Palace Marina Views',
    description: 'Spectacular marina-front development with modern architecture'
  },
  {
    url: '/CREEK_PALACE_DCH_EMAAR_4.jpg',
    title: 'Creek Palace Lifestyle',
    description: 'Contemporary luxury living in Dubai\'s most sought-after location'
  },
  {
    url: '/CREEK_PALACE_DCH_EMAAR_5.jpg',
    title: 'Beachfront Entertainment',
    description: 'Exclusive beachfront amenities and leisure facilities'
  },
  {
    url: '/CREEK_PALACE_DCH_EMAAR_6.jpg',
    title: 'Creek Palace Community',
    description: 'Vibrant mixed-use community with retail and dining'
  },
  {
    url: '/CREEK_PALACE_DCH_EMAAR_7.jpg',
    title: 'Premium Residence Interiors',
    description: 'Sophisticated interior designs with panoramic views'
  },
  {
    url: '/CREEK_PALACE_DCH_EMAAR_8.jpg',
    title: 'Creek Palace Waterfront',
    description: 'Scenic waterfront promenade with world-class amenities'
  },
  {
    url: '/CREEK_PALACE_DCH_EMAAR_9.jpg',
    title: 'Modern Dubai Living',
    description: 'State-of-the-art residential towers in prestigious location'
  },
  {
    url: '/CREEK_PALACE_DCH_EMAAR_10.jpg',
    title: 'Sunset at Creek Harbour',
    description: 'Golden hour views of Dubai\'s most exclusive development'
  },
  {
    url: '/CREEK_PALACE_DCH_EMAAR_11.jpg',
    title: 'Creek Palace Elegance',
    description: 'Refined luxury with innovative design and architecture'
  },
  {
    url: '/CREEK_PALACE_DCH_EMAAR_12.jpg',
    title: 'Waterfront Excellence',
    description: 'Premium properties with exclusive creek-side location'
  },
  {
    url: '/CREEK_PALACE_DCH_EMAAR_13.jpg',
    title: 'Luxury Island Living',
    description: 'Exceptional waterfront residences with breathtaking views'
  },
  {
    url: '/CREEK_PALACE_DCH_EMAAR_14.jpg',
    title: 'Creek Palace Dining',
    description: 'World-class dining and entertainment venues'
  },
  {
    url: '/CREEK_PALACE_DCH_EMAAR_15.jpg',
    title: 'Premium Lifestyle',
    description: 'Exclusive amenities and recreational facilities'
  },
  {
    url: '/CREEK_PALACE_DCH_EMAAR_16.jpg',
    title: 'Architectural Marvel',
    description: 'Contemporary design meets luxury living'
  },
  {
    url: '/CREEK_PALACE_DCH_EMAAR_17.jpg',
    title: 'Creek Harbour Paradise',
    description: 'Ultimate waterfront destination in Dubai'
  }
]

export default function HeroImageSlider() {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      handleNext()
    }, 5000)

    return () => clearInterval(timer)
  }, [currentIndex, autoPlay])

  const handleNext = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length)
      setIsTransitioning(false)
    }, 500)
  }

  const handlePrev = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)
      setIsTransitioning(false)
    }, 500)
  }

  return (
    <>
      <style>{`
        @keyframes zoomIn {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }

        .hero-zoom {
          animation: zoomIn 10s linear infinite alternate;
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .hero-text-enter {
          animation: slideInUp 0.8s ease-out;
        }
      `}</style>

      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Image Container */}
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100 z-0' : 'opacity-0 z-0'
            }`}
          >
            <div className="absolute inset-0 bg-linear-to-b from-slate-900/80 via-slate-900/40 to-slate-900/90 z-10" />
            <img
              src={image.url}
              alt={image.title}
              className={`w-full h-full object-cover ${index === currentIndex ? 'hero-zoom' : ''}`}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {/* Removed Property Info Overlay */}

      {/* Navigation Buttons */}
      <div className="absolute bottom-12 left-12 z-30 flex space-x-4">
        <button
          onClick={() => {
            handlePrev()
            setAutoPlay(false)
          }}
          className="p-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-primary hover:border-primary transition-all duration-300"
          aria-label="Previous image"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        <button
          onClick={() => {
            handleNext()
            setAutoPlay(false)
          }}
          className="p-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-primary hover:border-primary transition-all duration-300"
          aria-label="Next image"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-12 left-32 z-30 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index)
              setAutoPlay(false)
            }}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              index === currentIndex
                ? 'bg-primary w-12'
                : 'bg-white/30 w-4 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </>
  )
}


