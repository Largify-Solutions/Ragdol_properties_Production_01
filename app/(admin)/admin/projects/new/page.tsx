'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeftIcon, PhotoIcon, MapPinIcon, CurrencyDollarIcon, CalendarIcon, DocumentIcon, VideoCameraIcon } from '@heroicons/react/24/outline'

export default function NewProjectPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    status: 'upcoming',
    city: '',
    area: '',
    district: '',
    address: '',
    hero_image_url: '',
    description: '',
    starting_price: '',
    min_price: '',
    max_price: '',
    currency: 'AED',
    total_units: '',
    amenities: [] as string[],
    facilities: [] as string[],
    property_types: [] as string[],
    featured: false,
    published: false,
    launch_date: '',
    completion_date: '',
    handover_date: '',
    payment_plan: '',
    brochure_url: '',
    video_url: '',
    seo_title: '',
    seo_description: '',
    seo_keywords: [] as string[],
    // Document fields
    brochure_en_url: '',
    brochure_ar_url: '',
    fact_sheet_url: '',
    floor_plans_url: '',
    masterplan_url: '',
    material_board_url: '',
    one_pager_url: '',
    payment_plan_url: ''
  })

  // Document file states
  const [brochureEnFile, setBrochureEnFile] = useState<File | null>(null)
  const [brochureArFile, setBrochureArFile] = useState<File | null>(null)
  const [factSheetFile, setFactSheetFile] = useState<File | null>(null)
  const [floorPlansFile, setFloorPlansFile] = useState<File | null>(null)
  const [floorPlanImages, setFloorPlanImages] = useState<File[]>([])
  const [masterplanFile, setMasterplanFile] = useState<File | null>(null)
  const [materialBoardFile, setMaterialBoardFile] = useState<File | null>(null)
  const [onePagerFile, setOnePagerFile] = useState<File | null>(null)
  const [paymentPlanFile, setPaymentPlanFile] = useState<File | null>(null)
  const [videoFiles, setVideoFiles] = useState<File[]>([])

  const [images, setImages] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Create FormData for file upload
      const submitData = new FormData()

      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          submitData.append(key, JSON.stringify(value))
        } else {
          submitData.append(key, value.toString())
        }
      })

      // Add images
      images.forEach((image, index) => {
        submitData.append(`images`, image)
      })

      // Add document files
      if (brochureEnFile) submitData.append('brochure_en_file', brochureEnFile)
      if (brochureArFile) submitData.append('brochure_ar_file', brochureArFile)
      if (factSheetFile) submitData.append('fact_sheet_file', factSheetFile)
      if (floorPlansFile) submitData.append('floor_plans_file', floorPlansFile)
      if (masterplanFile) submitData.append('masterplan_file', masterplanFile)
      if (materialBoardFile) submitData.append('material_board_file', materialBoardFile)
      if (onePagerFile) submitData.append('one_pager_file', onePagerFile)
      if (paymentPlanFile) submitData.append('payment_plan_file', paymentPlanFile)

      // Add floor plan images array
      floorPlanImages.forEach((file) => {
        submitData.append('floor_plan_images', file)
      })

      // Add video files
      videoFiles.forEach((file) => {
        submitData.append('video_files', file)
      })

      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        body: submitData,
      })

      if (response.ok) {
        router.push('/admin/projects')
      } else {
        console.error('Failed to create project')
      }
    } catch (error) {
      console.error('Error creating project:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files))
    }
  }

  const addArrayItem = (field: 'amenities' | 'facilities' | 'property_types' | 'seo_keywords', value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }))
    }
  }

  const removeArrayItem = (field: 'amenities' | 'facilities' | 'property_types' | 'seo_keywords', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Projects
          </button>
          <h1 className="text-3xl font-bold text-foreground">Add New Project</h1>
          <p className="text-muted-foreground mt-2">
            Create a new real estate development project
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Project Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Currency</label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="AED">AED</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Location</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">City *</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Area</label>
                <input
                  type="text"
                  value={formData.area}
                  onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">District</label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Starting Price</label>
                <input
                  type="number"
                  value={formData.starting_price}
                  onChange={(e) => setFormData(prev => ({ ...prev, starting_price: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Min Price</label>
                <input
                  type="number"
                  value={formData.min_price}
                  onChange={(e) => setFormData(prev => ({ ...prev, min_price: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Max Price</label>
                <input
                  type="number"
                  value={formData.max_price}
                  onChange={(e) => setFormData(prev => ({ ...prev, max_price: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Images */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <PhotoIcon className="h-5 w-5" />
              Images & Renders
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Project Images (Renders)</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-xs text-muted-foreground mt-1">Upload project render images (JPG, PNG)</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Hero Image URL</label>
                <input
                  type="url"
                  value={formData.hero_image_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, hero_image_url: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          {/* Brochures & Documents */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <DocumentIcon className="h-5 w-5" />
              Brochures & Documents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Brochure (English) PDF</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setBrochureEnFile(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {brochureEnFile && <p className="text-xs text-green-600 mt-1">Selected: {brochureEnFile.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Brochure (Arabic) PDF</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setBrochureArFile(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {brochureArFile && <p className="text-xs text-green-600 mt-1">Selected: {brochureArFile.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Fact Sheet PDF</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFactSheetFile(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {factSheetFile && <p className="text-xs text-green-600 mt-1">Selected: {factSheetFile.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">One Pager PDF</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setOnePagerFile(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {onePagerFile && <p className="text-xs text-green-600 mt-1">Selected: {onePagerFile.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Material Board PDF</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setMaterialBoardFile(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {materialBoardFile && <p className="text-xs text-green-600 mt-1">Selected: {materialBoardFile.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Payment Plan PDF</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setPaymentPlanFile(e.target.files?.[0] || null)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {paymentPlanFile && <p className="text-xs text-green-600 mt-1">Selected: {paymentPlanFile.name}</p>}
              </div>
            </div>
          </div>

          {/* Floor Plans & Masterplan */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MapPinIcon className="h-5 w-5" />
              Floor Plans & Masterplan
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Floor Plans PDF</label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFloorPlansFile(e.target.files?.[0] || null)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {floorPlansFile && <p className="text-xs text-green-600 mt-1">Selected: {floorPlansFile.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Masterplan PDF</label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setMasterplanFile(e.target.files?.[0] || null)}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {masterplanFile && <p className="text-xs text-green-600 mt-1">Selected: {masterplanFile.name}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Floor Plan Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setFloorPlanImages(e.target.files ? Array.from(e.target.files) : [])}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-xs text-muted-foreground mt-1">Upload multiple floor plan images (JPG, PNG)</p>
                {floorPlanImages.length > 0 && (
                  <p className="text-xs text-green-600 mt-1">{floorPlanImages.length} files selected</p>
                )}
              </div>
            </div>
          </div>

          {/* Videos */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <VideoCameraIcon className="h-5 w-5" />
              Videos
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Video URL</label>
                <input
                  type="url"
                  value={formData.video_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, video_url: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Video Files</label>
                <input
                  type="file"
                  multiple
                  accept="video/*"
                  onChange={(e) => setVideoFiles(e.target.files ? Array.from(e.target.files) : [])}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-xs text-muted-foreground mt-1">Upload video files (MP4, MOV)</p>
                {videoFiles.length > 0 && (
                  <p className="text-xs text-green-600 mt-1">{videoFiles.length} video(s) selected</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-border rounded-lg hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
            >
              {isSubmitting ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}