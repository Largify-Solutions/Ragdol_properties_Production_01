
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

// ─── Types ────────────────────────────────────────────────────────────────────

interface HeroSlide {
  id: string
  image_url: string
  title: string | null
  subtitle: string | null
  sort_order: number
  is_active: boolean
}

interface HeroSettings {
  id: string
  mode: 'slider' | 'video'
  heading: string
  subheading: string
  overlay_opacity: number
  auto_play: boolean
  slide_duration: number
  video_url: string | null
  video_poster_url: string | null
  video_muted: boolean
  video_loop: boolean
  search_enabled: boolean
  primary_cta_text: string
  primary_cta_url: string
  secondary_cta_text: string | null
  secondary_cta_url: string | null
}

// ─── Fallback defaults (used when DB has no data yet) ────────────────────────

const DEFAULT_SETTINGS: Omit<HeroSettings, 'id'> = {
  mode: 'slider',
  heading: 'Find Your Dream Home in Dubai',
  subheading: "Discover luxury properties, premium apartments and exclusive villas across Dubai's most prestigious communities.",
  overlay_opacity: 0.55,
  auto_play: true,
  slide_duration: 5000,
  video_url: null,
  video_poster_url: null,
  video_muted: true,
  video_loop: true,
  search_enabled: true,
  primary_cta_text: 'Explore Properties',
  primary_cta_url: '/properties',
  secondary_cta_text: 'Contact an Agent',
  secondary_cta_url: '/contact',
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HeroImageSlider() {
  const [settings, setSettings] = useState<HeroSettings | null>(null)
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // ── Fetch CMS settings from API ──
  useEffect(() => {
    fetch('/api/admin/hero')
      .then((r) => r.json())
      .then(({ settings: s, slides: sl }) => {
        setSettings(s ?? { id: '', ...DEFAULT_SETTINGS })
        setSlides((sl ?? []).filter((s: HeroSlide) => s.is_active))
      })
      .catch(() => {
        setSettings({ id: '', ...DEFAULT_SETTINGS })
        setSlides([])
      })
  }, [])

  // ── Slider auto-advance ──
  const advance = useCallback((dir: 'next' | 'prev') => {
    if (!slides.length) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) =>
        dir === 'next'
          ? (prev + 1) % slides.length
          : (prev - 1 + slides.length) % slides.length
      )
      setIsTransitioning(false)
    }, 500)
  }, [slides.length])

  useEffect(() => {
    if (!settings?.auto_play || userPaused || slides.length <= 1 || settings.mode !== 'slider') return
    const t = setInterval(() => advance('next'), settings.slide_duration ?? 5000)
    return () => clearInterval(t)
  }, [settings, slides.length, userPaused, advance])

  // ── Video autoplay ──
  useEffect(() => {
    if (settings?.mode === 'video' && videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [settings?.mode, settings?.video_url])

  // ── Loading skeleton ──
  if (!settings) {
    return (
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 animate-pulse" />
    )
  }

  const overlay = `rgba(0,0,0,${settings.overlay_opacity})`
  const activeSlides = slides.length > 0 ? slides : []
  const currentSlide = activeSlides[currentIndex]

  return (
    <>
      <style>{`
        @keyframes heroZoom {
          from { transform: scale(1); }
          to   { transform: scale(1.08); }
        }
        .hero-zoom { animation: heroZoom 10s ease-in-out infinite alternate; }
      `}</style>

      {/* ── Background layer ── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {settings.mode === 'slider' ? (
          <>
            {activeSlides.length > 0 ? (
              activeSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={slide.image_url}
                    alt={slide.title || `Slide ${index + 1}`}
                    className={`w-full h-full object-cover ${index === currentIndex ? 'hero-zoom' : ''}`}
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              ))
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
            )}
          </>
        ) : (
          <>
            {settings.video_url ? (
              <video
                ref={videoRef}
                src={settings.video_url}
                poster={settings.video_poster_url ?? undefined}
                className="w-full h-full object-cover"
                autoPlay
                muted={settings.video_muted}
                loop={settings.video_loop}
                playsInline
                preload="auto"
              />
            ) : settings.video_poster_url ? (
              <img
                src={settings.video_poster_url}
                alt="Hero background"
                className="w-full h-full object-cover hero-zoom"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
            )}
          </>
        )}

        {/* Colour overlay for text contrast */}
        <div className="absolute inset-0 z-10" style={{ background: overlay }} />
        {/* Bottom vignette */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>

      {/* ── Slider controls (slider mode + more than 1 slide) ── */}
      {settings.mode === 'slider' && activeSlides.length > 1 && (
        <div className="absolute bottom-12 left-12 z-30 flex items-center gap-3">
          <button
            onClick={() => { advance('prev'); setUserPaused(true) }}
            className="p-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-primary hover:border-primary transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => { advance('next'); setUserPaused(true) }}
            className="p-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-primary hover:border-primary transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dot indicators */}
          <div className="flex gap-2 ml-2">
            {activeSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrentIndex(i); setUserPaused(true) }}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === currentIndex ? 'bg-primary w-8' : 'bg-white/40 w-4 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <span className="ml-2 text-white/60 text-sm font-mono select-none">
            {currentIndex + 1} / {activeSlides.length}
          </span>
        </div>
      )}

      {/* ── Per-slide label (shown top-right when slide has custom title) ── */}
      {settings.mode === 'slider' && currentSlide?.title && (
        <div className="absolute top-8 right-8 z-30 hidden lg:block">
          <p className="text-white/90 text-xs font-medium bg-black/30 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/10 max-w-[200px] text-right">
            {currentSlide.title}
            {currentSlide.subtitle && (
              <span className="block text-white/60 mt-0.5">{currentSlide.subtitle}</span>
            )}
          </p>
        </div>
      )}
    </>
  )
}

// ─── CTA Buttons — exported so page.tsx can render them in the hero overlay ──

export function HeroCtaButtons() {
  const [settings, setSettings] = useState<Pick<
    HeroSettings,
    'primary_cta_text' | 'primary_cta_url' | 'secondary_cta_text' | 'secondary_cta_url'
  > | null>(null)

  useEffect(() => {
    fetch('/api/admin/hero')
      .then((r) => r.json())
      .then(({ settings: s }) => setSettings(s ?? DEFAULT_SETTINGS))
      .catch(() => setSettings(DEFAULT_SETTINGS))
  }, [])

  if (!settings?.primary_cta_text) return null

  return (
    <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
      <Link
        href={settings.primary_cta_url || '/properties'}
        className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
      >
        {settings.primary_cta_text}
      </Link>
      {settings.secondary_cta_text && settings.secondary_cta_url && (
        <Link
          href={settings.secondary_cta_url}
          className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-sm hover:bg-white/20 transition-all hover:-translate-y-0.5"
        >
          {settings.secondary_cta_text}
        </Link>
      )}
    </div>
  )
}

