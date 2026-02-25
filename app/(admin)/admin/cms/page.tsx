'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '@/lib/supabase-browser'
import {
  ImageIcon, Video, Sliders, Layout, Save, Upload, Trash2,
  Plus, GripVertical, Eye, EyeOff, ChevronUp, ChevronDown,
  RefreshCw, PlayCircle, PauseCircle, Globe, Link2, Loader2,
  CheckCircle2, AlertCircle, X, Settings2
} from 'lucide-react'

// ─── Types ──────────────────────────────────────────────────────────────────

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

// ─── Supabase client — uses authenticated session (required for Storage RLS) ─
// imported from @/lib/supabase-browser which holds the user's auth session

// ─── Toast helper ────────────────────────────────────────────────────────────

type ToastType = 'success' | 'error' | 'loading'
interface Toast { id: string; message: string; type: ToastType }

// ─── Slide row component ─────────────────────────────────────────────────────

function SlideRow({
  slide,
  index,
  total,
  onMoveUp,
  onMoveDown,
  onToggle,
  onDelete,
  onChange,
}: {
  slide: HeroSlide
  index: number
  total: number
  onMoveUp: () => void
  onMoveDown: () => void
  onToggle: () => void
  onDelete: () => void
  onChange: (field: keyof HeroSlide, value: string) => void
}) {
  return (
    <div className={`group flex gap-3 p-3 rounded-xl border transition-all ${
      slide.is_active
        ? 'border-border bg-card'
        : 'border-border/40 bg-muted/30 opacity-60'
    }`}>
      {/* Drag handle (visual) */}
      <div className="flex flex-col items-center justify-center gap-1 text-muted-foreground/40 cursor-grab active:cursor-grabbing select-none">
        <GripVertical className="w-4 h-4" />
        <span className="text-[10px] font-mono">{index + 1}</span>
      </div>

      {/* Thumbnail */}
      <div className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-muted border border-border">
        {slide.image_url ? (
          <img src={slide.image_url} alt={slide.title || ''} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="w-6 h-6 text-muted-foreground/40" />
          </div>
        )}
      </div>

      {/* Text fields */}
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <input
          type="text"
          value={slide.title || ''}
          onChange={(e) => onChange('title', e.target.value)}
          placeholder="Slide title (optional)"
          className="w-full px-3 py-1.5 text-sm rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
        />
        <input
          type="text"
          value={slide.subtitle || ''}
          onChange={(e) => onChange('subtitle', e.target.value)}
          placeholder="Slide subtitle (optional)"
          className="w-full px-3 py-1.5 text-sm rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-1 flex-shrink-0">
        <button onClick={onMoveUp} disabled={index === 0} className="p-1.5 rounded hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed text-muted-foreground hover:text-foreground transition-colors">
          <ChevronUp className="w-3.5 h-3.5" />
        </button>
        <button onClick={onMoveDown} disabled={index === total - 1} className="p-1.5 rounded hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed text-muted-foreground hover:text-foreground transition-colors">
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
        <button onClick={onToggle} className={`p-1.5 rounded transition-colors ${slide.is_active ? 'text-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
          {slide.is_active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
        </button>
        <button onClick={onDelete} className="p-1.5 rounded text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

// ─── Main CMS Page ────────────────────────────────────────────────────────────

export default function CMSPage() {
  const [activeTab, setActiveTab] = useState<'hero'>('hero')
  const [settings, setSettings] = useState<HeroSettings | null>(null)
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [uploadingSlide, setUploadingSlide] = useState(false)
  const [uploadingVideo, setUploadingVideo] = useState(false)
  const [uploadingPoster, setUploadingPoster] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const slideInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const posterInputRef = useRef<HTMLInputElement>(null)

  // ── Toast helpers ──
  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { id, message, type }])
    if (type !== 'loading') {
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500)
    }
    return id
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  // ── Fetch data ──
  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/hero')
      const json = await res.json()
      if (json.error) throw new Error(json.error)
      if (json.settings) {
        setSettings(json.settings)
      } else {
        // No settings in DB yet — use defaults in state (will be created on first save)
        setSettings({
          id: '',
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
        })
      }
      setSlides(json.slides || [])
    } catch (err) {
      console.error('[CMS fetchData]', err)
      addToast('Failed to load hero settings', 'error')
    } finally {
      setLoading(false)
    }
  }, [addToast])

  useEffect(() => { fetchData() }, [fetchData])

  // ── Save settings ──
  const handleSaveSettings = async () => {
    if (!settings) return
    setSaving(true)
    const tid = addToast('Saving changes…', 'loading')
    try {
      const res = await fetch('/api/admin/hero', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      const json = await res.json()
      if (!res.ok || json.error) throw new Error(json.error || 'Save failed')

      // Update local settings id in case this was the first save (insert)
      if (json.settings?.id) {
        setSettings((prev) => prev ? { ...prev, id: json.settings.id } : prev)
      }

      // Save per-slide changes (only for slides that already have an id)
      const savedSlides = slides.filter((s) => s.id)
      await Promise.all(
        savedSlides.map((slide) =>
          fetch(`/api/admin/hero/slides/${slide.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: slide.title,
              subtitle: slide.subtitle,
              is_active: slide.is_active,
            }),
          })
        )
      )

      // Save sort order
      if (savedSlides.length > 0) {
        await fetch('/api/admin/hero/slides/reorder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderedIds: slides.map((s) => s.id).filter(Boolean) }),
        })
      }

      removeToast(tid)
      addToast('Hero section saved!', 'success')
    } catch (err) {
      console.error('[CMS save]', err)
      removeToast(tid)
      addToast(err instanceof Error ? err.message : 'Failed to save changes', 'error')
    } finally {
      setSaving(false)
    }
  }

  // ── Upload slide image ──
  const handleSlideUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    setUploadingSlide(true)
    const tid = addToast(`Uploading ${files.length} image(s)…`, 'loading')

    try {
      for (const file of Array.from(files)) {
        const ext = file.name.split('.').pop()
        const path = `slides/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

        const { error: uploadErr } = await supabase.storage
          .from('hero-media')
          .upload(path, file, { upsert: false })

        if (uploadErr) {
          console.error('[storage upload]', uploadErr)
          throw new Error(uploadErr.message)
        }

        const { data: { publicUrl } } = supabase.storage
          .from('hero-media')
          .getPublicUrl(path)

        const res = await fetch('/api/admin/hero/slides', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image_url: publicUrl, title: '', subtitle: '' }),
        })
        const json = await res.json()
        if (!res.ok || json.error) throw new Error(json.error || 'Failed to save slide')
        if (json.slide) {
          setSlides((prev) => [...prev, json.slide])
        }
      }
      removeToast(tid)
      addToast('Images uploaded!', 'success')
    } catch (err: unknown) {
      console.error('[slide upload error]', err)
      removeToast(tid)
      addToast(err instanceof Error ? err.message : 'Upload failed', 'error')
    } finally {
      setUploadingSlide(false)
      if (slideInputRef.current) slideInputRef.current.value = ''
    }
  }

  // ── Upload video ──
  const handleVideoUpload = async (file: File | null, type: 'video' | 'poster') => {
    if (!file) return
    const setter = type === 'video' ? setUploadingVideo : setUploadingPoster
    setter(true)
    const tid = addToast(`Uploading ${type}…`, 'loading')

    try {
      const ext = file.name.split('.').pop()
      const folder = type === 'video' ? 'videos' : 'posters'
      const path = `${folder}/${Date.now()}.${ext}`

      const { error: uploadErr } = await supabase.storage
        .from('hero-media')
        .upload(path, file, { upsert: false })

      if (uploadErr) {
        console.error('[video/poster upload]', uploadErr)
        throw new Error(uploadErr.message)
      }

      const { data: { publicUrl } } = supabase.storage
        .from('hero-media')
        .getPublicUrl(path)

      setSettings((prev) =>
        prev
          ? { ...prev, [type === 'video' ? 'video_url' : 'video_poster_url']: publicUrl }
          : prev
      )
      removeToast(tid)
      addToast(`${type === 'video' ? 'Video' : 'Poster'} uploaded!`, 'success')
    } catch (err: unknown) {
      console.error('[upload error]', err)
      removeToast(tid)
      addToast(err instanceof Error ? err.message : 'Upload failed', 'error')
    } finally {
      setter(false)
    }
  }

  // ── Slide mutations ──
  const moveSlide = (index: number, direction: 'up' | 'down') => {
    setSlides((prev) => {
      const next = [...prev]
      const swapIdx = direction === 'up' ? index - 1 : index + 1
      ;[next[index], next[swapIdx]] = [next[swapIdx], next[index]]
      return next
    })
  }

  const toggleSlide = (index: number) => {
    setSlides((prev) =>
      prev.map((s, i) => (i === index ? { ...s, is_active: !s.is_active } : s))
    )
  }

  const deleteSlide = async (index: number) => {
    const slide = slides[index]
    if (!confirm('Delete this slide?')) return
    try {
      await fetch(`/api/admin/hero/slides/${slide.id}`, { method: 'DELETE' })
      setSlides((prev) => prev.filter((_, i) => i !== index))
      addToast('Slide deleted', 'success')
    } catch {
      addToast('Failed to delete slide', 'error')
    }
  }

  const updateSlide = (index: number, field: keyof HeroSlide, value: string) => {
    setSlides((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    )
  }

  // ── Field helper ──
  const setField = <K extends keyof HeroSettings>(key: K, value: HeroSettings[K]) => {
    setSettings((prev) => (prev ? { ...prev, [key]: value } : prev))
  }

  // ─────────────────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="p-6">
        <div className="h-8 w-48 bg-muted animate-pulse rounded mb-2" />
        <div className="h-4 w-72 bg-muted animate-pulse rounded mb-8" />
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'hero', label: 'Hero Section', icon: <Layout className="w-4 h-4" /> },
  ]

  return (
    <div className="p-6 max-w-5xl">
      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">Website CMS</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Customize content displayed on your public website
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreviewMode((p) => !p)}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-border bg-card hover:bg-muted text-foreground transition-colors"
          >
            {previewMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {previewMode ? 'Hide Preview' : 'Preview'}
          </button>
          <button
            onClick={handleSaveSettings}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60 transition-colors"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Changes
          </button>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1 mb-6 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'hero')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-primary text-primary bg-primary/5'
                : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── HERO SECTION TAB ── */}
      {activeTab === 'hero' && settings && (
        <div className="space-y-6">
          {/* ── Live Preview ── */}
          {previewMode && (
            <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-border shadow-lg">
              {settings.mode === 'slider' && slides.filter((s) => s.is_active).length > 0 ? (
                <>
                  <img
                    src={slides.find((s) => s.is_active)?.image_url}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: `rgba(0,0,0,${settings.overlay_opacity})` }}
                  />
                </>
              ) : settings.mode === 'video' && settings.video_poster_url ? (
                <>
                  <img
                    src={settings.video_poster_url}
                    alt="poster"
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: `rgba(0,0,0,${settings.overlay_opacity})` }}
                  />
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">Preview (no media)</span>
                </div>
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-8 text-center gap-2">
                <h2 className="text-lg font-bold leading-tight line-clamp-2">
                  {settings.heading}
                </h2>
                <p className="text-xs text-white/80 line-clamp-2">{settings.subheading}</p>
                <div className="flex gap-2 mt-1">
                  {settings.primary_cta_text && (
                    <span className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-full font-medium">
                      {settings.primary_cta_text}
                    </span>
                  )}
                  {settings.secondary_cta_text && (
                    <span className="px-3 py-1 text-xs bg-white/20 text-white rounded-full">
                      {settings.secondary_cta_text}
                    </span>
                  )}
                </div>
              </div>
              <div className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full">
                Preview
              </div>
            </div>
          )}

          {/* ── Mode Toggle ── */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Settings2 className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">Background Mode</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setField('mode', 'slider')}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  settings.mode === 'slider'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border bg-background text-muted-foreground hover:border-border/80 hover:bg-muted'
                }`}
              >
                <ImageIcon className="w-6 h-6" />
                <span className="text-sm font-medium">Image Slider</span>
                <span className="text-[11px] text-center opacity-70">
                  Multiple images that auto-transition
                </span>
              </button>
              <button
                onClick={() => setField('mode', 'video')}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  settings.mode === 'video'
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border bg-background text-muted-foreground hover:border-border/80 hover:bg-muted'
                }`}
              >
                <Video className="w-6 h-6" />
                <span className="text-sm font-medium">Background Video</span>
                <span className="text-[11px] text-center opacity-70">
                  Looping video background
                </span>
              </button>
            </div>
          </div>

          {/* ── Hero Text Content ── */}
          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <Globe className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">Hero Content</h2>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Main Heading
              </label>
              <input
                type="text"
                value={settings.heading}
                onChange={(e) => setField('heading', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Sub-Heading
              </label>
              <textarea
                rows={2}
                value={settings.subheading}
                onChange={(e) => setField('subheading', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground text-sm resize-none"
              />
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                  <Link2 className="w-3 h-3" /> Primary CTA Text
                </label>
                <input
                  type="text"
                  value={settings.primary_cta_text}
                  onChange={(e) => setField('primary_cta_text', e.target.value)}
                  placeholder="Explore Properties"
                  className="w-full px-3 py-2 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Primary CTA URL
                </label>
                <input
                  type="text"
                  value={settings.primary_cta_url}
                  onChange={(e) => setField('primary_cta_url', e.target.value)}
                  placeholder="/properties"
                  className="w-full px-3 py-2 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Secondary CTA Text <span className="font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={settings.secondary_cta_text || ''}
                  onChange={(e) => setField('secondary_cta_text', e.target.value || null)}
                  placeholder="Contact an Agent"
                  className="w-full px-3 py-2 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Secondary CTA URL
                </label>
                <input
                  type="text"
                  value={settings.secondary_cta_url || ''}
                  onChange={(e) => setField('secondary_cta_url', e.target.value || null)}
                  placeholder="/contact"
                  className="w-full px-3 py-2 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground text-sm"
                />
              </div>
            </div>
          </div>

          {/* ── Appearance ── */}
          <div className="bg-card border border-border rounded-2xl p-5 space-y-5">
            <div className="flex items-center gap-2 mb-1">
              <Sliders className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">Appearance</h2>
            </div>

            {/* Overlay opacity */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Overlay Darkness
                </label>
                <span className="text-sm font-mono text-foreground">
                  {Math.round(settings.overlay_opacity * 100)}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={settings.overlay_opacity}
                onChange={(e) => setField('overlay_opacity', parseFloat(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground">
                <span>Transparent</span>
                <span>Dark</span>
              </div>
            </div>

            {/* Toggles row */}
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => setField('search_enabled', !settings.search_enabled)}
                  className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${
                    settings.search_enabled ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${settings.search_enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
                <span className="text-sm text-foreground">Search Bar</span>
              </label>
            </div>
          </div>

          {/* ── Image Slider Settings ── */}
          {settings.mode === 'slider' && (
            <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-primary" />
                  <h2 className="text-sm font-semibold text-foreground">Slides</h2>
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                    {slides.filter((s) => s.is_active).length} active
                  </span>
                </div>
                <button
                  onClick={() => slideInputRef.current?.click()}
                  disabled={uploadingSlide}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60 transition-colors"
                >
                  {uploadingSlide ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Plus className="w-3.5 h-3.5" />
                  )}
                  {uploadingSlide ? 'Uploading…' : 'Add Images'}
                </button>
                <input
                  ref={slideInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  multiple
                  className="hidden"
                  onChange={(e) => handleSlideUpload(e.target.files)}
                />
              </div>

              {/* Slide settings */}
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div
                    onClick={() => setField('auto_play', !settings.auto_play)}
                    className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${
                      settings.auto_play ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${settings.auto_play ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </div>
                  <span className="text-sm text-foreground">Auto Play</span>
                </label>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">
                    Slide Duration (ms)
                  </label>
                  <input
                    type="number"
                    min={1000}
                    max={15000}
                    step={500}
                    value={settings.slide_duration}
                    onChange={(e) => setField('slide_duration', parseInt(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground text-sm"
                  />
                </div>
              </div>

              {/* Slide list */}
              {slides.length === 0 ? (
                <div
                  onClick={() => slideInputRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all group"
                >
                  <Upload className="w-8 h-8 text-muted-foreground/40 group-hover:text-primary/60 mx-auto mb-3 transition-colors" />
                  <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    Click to upload slide images
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG, WebP — multiple files supported
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {slides.map((slide, index) => (
                    <SlideRow
                      key={slide.id}
                      slide={slide}
                      index={index}
                      total={slides.length}
                      onMoveUp={() => moveSlide(index, 'up')}
                      onMoveDown={() => moveSlide(index, 'down')}
                      onToggle={() => toggleSlide(index)}
                      onDelete={() => deleteSlide(index)}
                      onChange={(field, value) => updateSlide(index, field, value)}
                    />
                  ))}
                  <button
                    onClick={() => slideInputRef.current?.click()}
                    disabled={uploadingSlide}
                    className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-border rounded-xl text-sm text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4" />
                    Add more images
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── Video Background Settings ── */}
          {settings.mode === 'video' && (
            <div className="bg-card border border-border rounded-2xl p-5 space-y-5">
              <div className="flex items-center gap-2 mb-1">
                <Video className="w-4 h-4 text-primary" />
                <h2 className="text-sm font-semibold text-foreground">Video Background</h2>
              </div>

              {/* Video upload */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Background Video
                </label>
                {settings.video_url ? (
                  <div className="flex items-center gap-3 p-3 bg-background rounded-xl border border-border">
                    <PlayCircle className="w-8 h-8 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground truncate">
                        {settings.video_url.split('/').pop()}
                      </p>
                      <p className="text-[10px] text-emerald-500 mt-0.5">Uploaded ✓</p>
                    </div>
                    <button
                      onClick={() => {
                        videoInputRef.current?.click()
                      }}
                      className="text-xs px-2 py-1 rounded-lg border border-border hover:bg-muted transition-colors text-foreground"
                    >
                      Replace
                    </button>
                    <button
                      onClick={() => setField('video_url', null)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => videoInputRef.current?.click()}
                    className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all group"
                  >
                    {uploadingVideo ? (
                      <Loader2 className="w-7 h-7 text-primary mx-auto mb-2 animate-spin" />
                    ) : (
                      <Video className="w-7 h-7 text-muted-foreground/40 group-hover:text-primary/60 mx-auto mb-2 transition-colors" />
                    )}
                    <p className="text-sm text-muted-foreground group-hover:text-foreground">
                      {uploadingVideo ? 'Uploading video…' : 'Click to upload video'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">MP4, WebM — max 100MB</p>
                  </div>
                )}
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/mp4,video/webm,video/ogg"
                  className="hidden"
                  onChange={(e) => handleVideoUpload(e.target.files?.[0] || null, 'video')}
                />
              </div>

              {/* Poster image */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Fallback Poster Image <span className="font-normal">(shown while video loads)</span>
                </label>
                {settings.video_poster_url ? (
                  <div className="relative w-full h-28 rounded-xl overflow-hidden border border-border group">
                    <img src={settings.video_poster_url} alt="poster" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                      <button
                        onClick={() => posterInputRef.current?.click()}
                        className="px-3 py-1.5 bg-white text-black text-xs font-medium rounded-lg"
                      >
                        Replace
                      </button>
                      <button
                        onClick={() => setField('video_poster_url', null)}
                        className="p-1.5 bg-red-500 text-white rounded-lg"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => posterInputRef.current?.click()}
                    className="border-2 border-dashed border-border rounded-xl p-5 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all group"
                  >
                    {uploadingPoster ? (
                      <Loader2 className="w-6 h-6 text-primary mx-auto mb-1 animate-spin" />
                    ) : (
                      <ImageIcon className="w-6 h-6 text-muted-foreground/40 mx-auto mb-1" />
                    )}
                    <p className="text-sm text-muted-foreground">
                      {uploadingPoster ? 'Uploading…' : 'Upload poster image'}
                    </p>
                  </div>
                )}
                <input
                  ref={posterInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => handleVideoUpload(e.target.files?.[0] || null, 'poster')}
                />
              </div>

              {/* Video options */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div
                    onClick={() => setField('video_muted', !settings.video_muted)}
                    className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${
                      settings.video_muted ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${settings.video_muted ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </div>
                  <span className="text-sm text-foreground">Muted</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <div
                    onClick={() => setField('video_loop', !settings.video_loop)}
                    className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${
                      settings.video_loop ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${settings.video_loop ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </div>
                  <span className="text-sm text-foreground">Loop</span>
                </label>
              </div>
            </div>
          )}

          {/* ── Refresh ── */}
          <div className="flex justify-end">
            <button
              onClick={fetchData}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reload from database
            </button>
          </div>
        </div>
      )}

      {/* ── Toast Stack ── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border backdrop-blur-md text-sm font-medium transition-all ${
              toast.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-200'
                : toast.type === 'error'
                ? 'bg-red-50 dark:bg-red-950/80 border-red-200 dark:border-red-800 text-red-700 dark:text-red-200'
                : 'bg-card border-border text-foreground'
            }`}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 flex-shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 flex-shrink-0" />}
            {toast.type === 'loading' && <Loader2 className="w-4 h-4 flex-shrink-0 animate-spin" />}
            {toast.message}
            <button onClick={() => removeToast(toast.id)} className="ml-1 opacity-60 hover:opacity-100">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
