'use client'

import { useState, useEffect } from 'react'
import { PlusIcon, PencilIcon, TrashIcon, FolderIcon, DocumentArrowUpIcon, DocumentTextIcon, PhotoIcon, VideoCameraIcon, CheckCircleIcon, XMarkIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline'


interface Project {
  id: string
  name: string
  slug?: string
  status: string
  developer_id?: string
  city: string
  area?: string
  district?: string
  address?: string
  hero_image_url?: string
  description?: string
  starting_price?: number
  min_price?: number
  max_price?: number
  currency: string
  total_units?: number
  available_units?: number
  sold_units?: number
  amenities?: string[]
  facilities?: string[]
  property_types?: string[]
  featured: boolean
  published: boolean
  launch_date?: string
  completion_date?: string
  handover_date?: string
  payment_plan?: string
  payment_terms?: any
  brochure_url?: string
  video_url?: string
  images?: string[]
  // Extended document fields
  brochure_en_url?: string
  brochure_ar_url?: string
  fact_sheet_url?: string
  floor_plans_url?: string
  masterplan_url?: string
  material_board_url?: string
  one_pager_url?: string
  payment_plan_url?: string
  videos?: string[]
  documents?: { name: string; url: string }[]
  seo_title?: string
  seo_description?: string
  seo_keywords?: string[]
  coords?: any
  created_at: string
  updated_at?: string
  inquiries_count?: number
  views_count?: number
}

export default function ProjectManagement() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'planned' | 'in-progress' | 'completed'>('all')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [docUploading, setDocUploading] = useState<Record<string, boolean>>({})
  const [tempInput, setTempInput] = useState({
    amenity: '',
    facility: '',
    property_type: '',
    seo_keyword: '',
    image_url: ''
  })

  const [formData, setFormData] = useState({
    name: '',
    status: 'planned',
    developer_id: '',
    city: 'Dubai',
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
    available_units: '',
    sold_units: '',
    amenities: [] as string[],
    facilities: [] as string[],
    property_types: [] as string[],
    featured: false,
    published: false,
    launch_date: '',
    completion_date: '',
    handover_date: '',
    payment_plan: '',
    payment_terms: '',
    brochure_url: '',
    video_url: '',
    images: [] as string[],
    brochure_en_url: '',
    brochure_ar_url: '',
    fact_sheet_url: '',
    floor_plans_url: '',
    masterplan_url: '',
    material_board_url: '',
    one_pager_url: '',
    payment_plan_url: '',
    videos: [] as string[],
    documents: [] as { name: string; url: string }[],
    seo_title: '',
    seo_description: '',
    seo_keywords: [] as string[],
    coords_lat: '',
    coords_lng: ''
  })

  const [newDoc, setNewDoc] = useState({ name: '', url: '' })

  // Load projects from Firebase
  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
  try {
    setLoadingData(true);
    const res = await fetch('/api/admin/projects?limit=200');
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to load projects');
    const projectsList: Project[] = (json.projects || []).map((item: any) => ({
      id: item.id,
      ...item,
      created_at: item.created_at || new Date().toISOString(),
      updated_at: item.updated_at || new Date().toISOString()
    })) as Project[];
    projectsList.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    setProjects(projectsList);
  } catch (error) {
    console.error('Error loading projects:', error);
  } finally {
    setLoadingData(false);
  }
};

 
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    // Prepare data with proper types
    const projectData: any = {
      name: formData.name.trim(),
      status: formData.status,
      developer_id: formData.developer_id.trim() || null,
      city: formData.city.trim(),
      area: formData.area.trim() || null,
      district: formData.district.trim() || null,
      address: formData.address.trim() || null,
      hero_image_url: formData.hero_image_url.trim() || null,
      description: formData.description.trim() || null,
      currency: formData.currency,
      amenities: formData.amenities.length > 0 ? formData.amenities : [],
      facilities: formData.facilities.length > 0 ? formData.facilities : [],
      property_types: formData.property_types.length > 0 ? formData.property_types : [],
      featured: formData.featured,
      published: formData.published,
      launch_date: formData.launch_date || null,
      completion_date: formData.completion_date || null,
      handover_date: formData.handover_date || null,
      payment_plan: formData.payment_plan.trim() || null,
      payment_terms: formData.payment_terms || null,
      brochure_url: formData.brochure_url.trim() || null,
      video_url: formData.video_url.trim() || null,
      images: formData.images.length > 0 ? formData.images : [],
      // Extended document fields
      brochure_en_url: formData.brochure_en_url.trim() || null,
      brochure_ar_url: formData.brochure_ar_url.trim() || null,
      fact_sheet_url: formData.fact_sheet_url.trim() || null,
      floor_plans_url: formData.floor_plans_url.trim() || null,
      masterplan_url: formData.masterplan_url.trim() || null,
      material_board_url: formData.material_board_url.trim() || null,
      one_pager_url: formData.one_pager_url.trim() || null,
      payment_plan_url: formData.payment_plan_url.trim() || null,
      videos: formData.videos.length > 0 ? formData.videos : [],
      documents: formData.documents.length > 0 ? formData.documents : [],
      seo_title: formData.seo_title.trim() || null,
      seo_description: formData.seo_description.trim() || null,
      seo_keywords: formData.seo_keywords.length > 0 ? formData.seo_keywords : [],
      updated_at: new Date().toISOString(),
      inquiries_count: 0,
      views_count: 0
    };

    // Add numeric fields only if they have values
    if (formData.starting_price.trim()) {
      projectData.starting_price = parseFloat(formData.starting_price);
    }
    if (formData.min_price.trim()) {
      projectData.min_price = parseFloat(formData.min_price);
    }
    if (formData.max_price.trim()) {
      projectData.max_price = parseFloat(formData.max_price);
    }
    if (formData.total_units.trim()) {
      projectData.total_units = parseInt(formData.total_units);
    }
    if (formData.available_units.trim()) {
      projectData.available_units = parseInt(formData.available_units);
    }
    if (formData.sold_units.trim()) {
      projectData.sold_units = parseInt(formData.sold_units);
    }

    // Add coordinates if available
    if (formData.coords_lat.trim() && formData.coords_lng.trim()) {
      projectData.coords = {
        lat: parseFloat(formData.coords_lat),
        lng: parseFloat(formData.coords_lng)
      };
    }

    console.log('Submitting project:', projectData);

    if (editingProject) {
      // Update existing project via service-role API
      projectData.created_at = editingProject.created_at;
      
      const res = await fetch('/api/admin/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editingProject.id, ...projectData }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to update project');
      console.log('Project updated:', editingProject.id);
      
      // Update local state
      const updatedProject = {
        id: editingProject.id,
        ...projectData
      } as Project;
      
      setProjects(projects.map(p => p.id === editingProject.id ? updatedProject : p));
    } else {
      // Create new project via service-role API
      projectData.created_at = new Date().toISOString();
      
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to create project');
      const newDoc = json.project;
      console.log('Project created with ID:', newDoc?.id);
      
      // Add to beginning of list
      const newProject = {
        id: newDoc?.id,
        ...projectData
      } as Project;
      
      setProjects([newProject, ...projects]);
    }
    
    // Success
    closeModal();
    resetForm();
    
    alert(editingProject ? 'Project updated successfully!' : 'Project created successfully!');
    
  } catch (error: any) {
    console.error('Error saving project:', error);
    
    let errorMessage = 'Error saving project. Please try again.';
    
    if (error.code === 'permission-denied') {
      errorMessage = 'Permission denied. Please check if you have write access.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    alert(errorMessage);
    
  } finally {
    setIsSubmitting(false);
  }
};


  const handleDeleteProject = async (projectId: string) => {
  if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) return;

  try {
    const res = await fetch(`/api/admin/projects?id=${projectId}`, { method: 'DELETE' });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to delete project');
    
    // Update local state
    setProjects(projects.filter(p => p.id !== projectId));
    
    alert('Project deleted successfully!');
    
  } catch (error: any) {
    console.error('Error deleting project:', error);
    
    if (error.code === 'permission-denied') {
      alert('Delete permission denied. Please check your access.');
    } else {
      alert('Error deleting project. Please try again.');
    }
  }
};

  const handleEditProject = (project: Project) => {
    setEditingProject(project)
    setFormData({
      name: project.name,
      status: project.status,
      developer_id: project.developer_id || '',
      city: project.city,
      area: project.area || '',
      district: project.district || '',
      address: project.address || '',
      hero_image_url: project.hero_image_url || '',
      description: project.description || '',
      starting_price: project.starting_price?.toString() || '',
      min_price: project.min_price?.toString() || '',
      max_price: project.max_price?.toString() || '',
      currency: project.currency,
      total_units: project.total_units?.toString() || '',
      available_units: project.available_units?.toString() || '',
      sold_units: project.sold_units?.toString() || '',
      amenities: project.amenities || [],
      facilities: project.facilities || [],
      property_types: project.property_types || [],
      featured: project.featured,
      published: project.published,
      launch_date: project.launch_date || '',
      completion_date: project.completion_date || '',
      handover_date: project.handover_date || '',
      payment_plan: project.payment_plan || '',
      payment_terms: project.payment_terms || '',
      brochure_url: project.brochure_url || '',
      video_url: project.video_url || '',
      images: project.images || [],
      brochure_en_url: project.brochure_en_url || '',
      brochure_ar_url: project.brochure_ar_url || '',
      fact_sheet_url: project.fact_sheet_url || '',
      floor_plans_url: project.floor_plans_url || '',
      masterplan_url: project.masterplan_url || '',
      material_board_url: project.material_board_url || '',
      one_pager_url: project.one_pager_url || '',
      payment_plan_url: project.payment_plan_url || '',
      videos: project.videos || [],
      documents: (project.documents as { name: string; url: string }[]) || [],
      seo_title: project.seo_title || '',
      seo_description: project.seo_description || '',
      seo_keywords: project.seo_keywords || [],
      coords_lat: project.coords?.lat?.toString() || '',
      coords_lng: project.coords?.lng?.toString() || ''
    })
    setShowModal(true)
  }

  // DUPLICATE PROJECT
  const handleDuplicateProject = async (project: Project) => {
    if (!confirm('Duplicate this project? The copy will be published and active.')) return

    try {
      // Create new project data with copy title
      const duplicateData: any = {
        name: `${project.name} (Copy)`,
        slug: `${project.slug || 'project'}-copy-${Date.now()}`,
        status: project.status,
        developer_id: project.developer_id || null,
        city: project.city,
        area: project.area || null,
        district: project.district || null,
        address: project.address || null,
        hero_image_url: project.hero_image_url || null,
        description: project.description || null,
        starting_price: project.starting_price || null,
        min_price: project.min_price || null,
        max_price: project.max_price || null,
        currency: project.currency,
        total_units: project.total_units || null,
        available_units: project.available_units || null,
        sold_units: project.sold_units || null,
        amenities: project.amenities || [],
        facilities: project.facilities || [],
        property_types: project.property_types || [],
        featured: project.featured,
        published: true, // Make it active
        launch_date: project.launch_date || null,
        completion_date: project.completion_date || null,
        handover_date: project.handover_date || null,
        payment_plan: project.payment_plan || null,
        payment_terms: project.payment_terms || null,
        brochure_url: project.brochure_url || null,
        video_url: project.video_url || null,
        images: project.images || [],
        brochure_en_url: project.brochure_en_url || null,
        brochure_ar_url: project.brochure_ar_url || null,
        fact_sheet_url: project.fact_sheet_url || null,
        floor_plans_url: project.floor_plans_url || null,
        masterplan_url: project.masterplan_url || null,
        material_board_url: project.material_board_url || null,
        one_pager_url: project.one_pager_url || null,
        payment_plan_url: project.payment_plan_url || null,
        videos: project.videos || [],
        documents: project.documents || [],
        seo_title: project.seo_title || null,
        seo_description: project.seo_description || null,
        seo_keywords: project.seo_keywords || [],
        coords: project.coords || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        views_count: 0,
        inquiries_count: 0
      }

      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(duplicateData)
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to duplicate project')

      // Add to list
      const newProject = { id: json.project?.id, ...duplicateData } as Project
      setProjects([newProject, ...projects])

      alert('Project duplicated successfully! The copy is now active.')
    } catch (error: any) {
      console.error('Error duplicating project:', error)
      alert(error.message || 'Error duplicating project. Please try again.')
    }
  }

  const openAddModal = () => {
    setEditingProject(null)
    resetForm()
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingProject(null)
    resetForm()
    setTempInput({
      amenity: '',
      facility: '',
      property_type: '',
      seo_keyword: '',
      image_url: ''
    })
  }

  const resetForm = () => {
    setFormData({
      name: '',
      status: 'planned',
      developer_id: '',
      city: 'Dubai',
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
      available_units: '',
      sold_units: '',
      amenities: [],
      facilities: [],
      property_types: [],
      featured: false,
      published: false,
      launch_date: '',
      completion_date: '',
      handover_date: '',
      payment_plan: '',
      payment_terms: '',
      brochure_url: '',
      video_url: '',
      images: [],
      brochure_en_url: '',
      brochure_ar_url: '',
      fact_sheet_url: '',
      floor_plans_url: '',
      masterplan_url: '',
      material_board_url: '',
      one_pager_url: '',
      payment_plan_url: '',
      videos: [],
      documents: [],
      seo_title: '',
      seo_description: '',
      seo_keywords: [],
      coords_lat: '',
      coords_lng: ''
    })
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.area?.toLowerCase().includes(searchTerm.toLowerCase()) || false
    const matchesFilter = filterStatus === 'all' || project.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const addToArray = (field: 'amenities' | 'facilities' | 'property_types' | 'seo_keywords' | 'images', value: string) => {
    if (value.trim() && !formData[field].includes(value.trim())) {
      setFormData({
        ...formData,
        [field]: [...formData[field], value.trim()]
      })
    }
  }

  const removeFromArray = (field: 'amenities' | 'facilities' | 'property_types' | 'seo_keywords' | 'images', value: string) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter(item => item !== value)
    })
  }

  const handleArrayInput = (field: 'amenity' | 'facility' | 'property_type' | 'seo_keyword' | 'image_url', arrayField: 'amenities' | 'facilities' | 'property_types' | 'seo_keywords' | 'images') => {
    if (tempInput[field].trim()) {
      addToArray(arrayField, tempInput[field])
      setTempInput({ ...tempInput, [field]: '' })
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent, field: 'amenity' | 'facility' | 'property_type' | 'seo_keyword' | 'image_url', arrayField: 'amenities' | 'facilities' | 'property_types' | 'seo_keywords' | 'images') => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleArrayInput(field, arrayField)
    }
  }

  // ── File upload helper ────────────────────────────────────────────────────
  const uploadProjectFile = async (file: File, type: string): Promise<string> => {
    const fd = new FormData()
    fd.append('file', file)
    fd.append('type', type)
    fd.append('project_name', formData.name.trim() || 'project')
    const res = await fetch('/api/admin/projects/upload-files', { method: 'POST', body: fd })
    
    // Check content type before parsing JSON
    const contentType = res.headers.get('content-type') || ''
    let json: any
    
    if (contentType.includes('application/json')) {
      json = await res.json()
    } else {
      const text = await res.text()
      throw new Error(`Invalid response format. Status: ${res.status} ${res.statusText}. Response: ${text.substring(0, 100)}`)
    }
    
    if (!res.ok) throw new Error(json.error || 'Upload failed')
    return json.url as string
  }

  // Upload a single-file document field (brochure_en, fact_sheet, etc.)
  const handleDocFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: string, field: keyof typeof formData) => {
    const file = e.target.files?.[0]
    if (!file) return
    setDocUploading(p => ({ ...p, [type]: true }))
    try {
      const url = await uploadProjectFile(file, type)
      setFormData(f => ({ ...f, [field]: url }))
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`)
    } finally {
      setDocUploading(p => ({ ...p, [type]: false }))
      e.target.value = ''
    }
  }

  // Upload multiple render images
  const handleRenderImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setDocUploading(p => ({ ...p, render_images: true }))
    try {
      const urls = await Promise.all(files.map(f => uploadProjectFile(f, 'image')))
      setFormData(f => ({ ...f, images: [...f.images, ...urls] }))
    } catch (err: any) {
      alert(`Image upload failed: ${err.message}`)
    } finally {
      setDocUploading(p => ({ ...p, render_images: false }))
      e.target.value = ''
    }
  }

  // Upload multiple project videos
  const handleVideoFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setDocUploading(p => ({ ...p, videos: true }))
    try {
      const urls = await Promise.all(files.map(f => uploadProjectFile(f, 'video')))
      setFormData(f => ({ ...f, videos: [...f.videos, ...urls] }))
    } catch (err: any) {
      alert(`Video upload failed: ${err.message}`)
    } finally {
      setDocUploading(p => ({ ...p, videos: false }))
      e.target.value = ''
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Projects</h1>
            <p className="text-gray-600 mt-2">
              Manage real estate development projects (Firebase Connected)
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add New Project
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="planned">Planned</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {loadingData ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading projects from Firebase...</p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No projects found. Click "Add New Project" to create one.</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {filteredProjects.map((project) => (
                  <li key={project.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {project.hero_image_url && (
                          <img
                            className="h-12 w-12 rounded-lg object-cover mr-4"
                            src={project.hero_image_url}
                            alt={project.name}
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none'
                            }}
                          />
                        )}
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                          <p className="text-sm text-gray-600">
                            {project.city} • {project.area || 'No area'} • {project.status}
                          </p>
                          <p className="text-sm text-gray-500">
                            {project.currency} {project.starting_price?.toLocaleString() || '0'} - {project.max_price?.toLocaleString() || '0'}
                          </p>
                          <p className="text-xs text-gray-400">
                            Created: {new Date(project.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          project.published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {project.published ? 'Published' : 'Draft'}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          project.featured
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {project.featured ? 'Featured' : 'Standard'}
                        </span>
                        <button
                          onClick={() => handleEditProject(project)}
                          className="p-1 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded"
                          title="Edit"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDuplicateProject(project)}
                          className="p-1 text-green-600 hover:text-green-900 hover:bg-green-100 rounded"
                          title="Duplicate"
                        >
                          <DocumentDuplicateIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-1 text-red-600 hover:text-red-900 hover:bg-red-100 rounded"
                          title="Delete"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-4 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                  <span className="text-sm text-gray-500 ml-2">(Firebase)</span>
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-500 text-2xl"
                  disabled={isSubmitting}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Project Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    >
                      <option value="planned">Planned</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">City *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Area</label>
                    <input
                      type="text"
                      value={formData.area}
                      onChange={(e) => setFormData({...formData, area: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">District</label>
                    <input
                      type="text"
                      value={formData.district}
                      onChange={(e) => setFormData({...formData, district: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <textarea
                      rows={2}
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Starting Price</label>
                    <input
                      type="number"
                      value={formData.starting_price}
                      onChange={(e) => setFormData({...formData, starting_price: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Min Price</label>
                    <input
                      type="number"
                      value={formData.min_price}
                      onChange={(e) => setFormData({...formData, min_price: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Max Price</label>
                    <input
                      type="number"
                      value={formData.max_price}
                      onChange={(e) => setFormData({...formData, max_price: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Currency</label>
                    <select
                      value={formData.currency}
                      onChange={(e) => setFormData({...formData, currency: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    >
                      <option value="AED">AED</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </div>
                </div>

                {/* Units */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Total Units</label>
                    <input
                      type="number"
                      value={formData.total_units}
                      onChange={(e) => setFormData({...formData, total_units: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Available Units</label>
                    <input
                      type="number"
                      value={formData.available_units}
                      onChange={(e) => setFormData({...formData, available_units: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Sold Units</label>
                    <input
                      type="number"
                      value={formData.sold_units}
                      onChange={(e) => setFormData({...formData, sold_units: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Launch Date</label>
                    <input
                      type="date"
                      value={formData.launch_date}
                      onChange={(e) => setFormData({...formData, launch_date: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Completion Date</label>
                    <input
                      type="date"
                      value={formData.completion_date}
                      onChange={(e) => setFormData({...formData, completion_date: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Handover Date</label>
                    <input
                      type="date"
                      value={formData.handover_date}
                      onChange={(e) => setFormData({...formData, handover_date: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Media URLs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Hero Image URL</label>
                    <input
                      type="url"
                      value={formData.hero_image_url}
                      onChange={(e) => setFormData({...formData, hero_image_url: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Video URL (YouTube / external)</label>
                    <input
                      type="url"
                      value={formData.video_url}
                      onChange={(e) => setFormData({...formData, video_url: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* ── RENDER IMAGES ─────────────────────────────────────────── */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <PhotoIcon className="h-4 w-4 text-blue-500" />
                    Render Images
                  </h4>

                  {/* File picker */}
                  <label className={`flex items-center justify-center gap-2 w-full border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors ${docUploading.render_images ? 'border-blue-300 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'}`}>
                    {docUploading.render_images ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600" />
                        <span className="text-sm text-blue-600">Uploading…</span>
                      </>
                    ) : (
                      <>
                        <DocumentArrowUpIcon className="h-5 w-5 text-gray-400" />
                        <span className="text-sm text-gray-500">Click to upload render images (JPG, PNG — multiple allowed)</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      disabled={isSubmitting || docUploading.render_images}
                      onChange={handleRenderImagesChange}
                    />
                  </label>

                  {/* Also allow adding by URL */}
                  <div className="flex gap-2 mt-3">
                    <input
                      type="url"
                      placeholder="Or paste image URL and click Add"
                      value={tempInput.image_url}
                      onChange={(e) => setTempInput({...tempInput, image_url: e.target.value})}
                      onKeyPress={(e) => handleKeyPress(e, 'image_url', 'images')}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      onClick={() => handleArrayInput('image_url', 'images')}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200 disabled:opacity-50"
                      disabled={isSubmitting}
                    >
                      Add URL
                    </button>
                  </div>

                  {/* Uploaded tiles */}
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mt-3">
                      {formData.images.map((img, i) => (
                        <div key={i} className="relative group">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img} alt={`Render ${i + 1}`} className="w-full h-16 object-cover rounded border border-gray-200" />
                          <button
                            type="button"
                            onClick={() => removeFromArray('images', img)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            disabled={isSubmitting}
                          >
                            <XMarkIcon className="h-3 w-3" />
                          </button>
                          <p className="text-xs text-center text-gray-500 mt-0.5">#{i + 1}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ── PROJECT DOCUMENTS ─────────────────────────────────────── */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FolderIcon className="h-4 w-4 text-amber-500" />
                    Project Documents
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Helper sub-component rendered inline */}
                    {(
                      [
                        { label: 'Brochure (English)',  type: 'brochure_en',    field: 'brochure_en_url'    },
                        { label: 'Brochure (Arabic)',   type: 'brochure_ar',    field: 'brochure_ar_url'    },
                        { label: 'Fact Sheet',          type: 'fact_sheet',     field: 'fact_sheet_url'     },
                        { label: 'Floor Plans',         type: 'floor_plans',    field: 'floor_plans_url'    },
                        { label: 'Masterplan',          type: 'masterplan',     field: 'masterplan_url'     },
                        { label: 'Material Board',      type: 'material_board', field: 'material_board_url' },
                        { label: 'One Pager',           type: 'one_pager',      field: 'one_pager_url'      },
                        { label: 'Payment Plan (PDF)',  type: 'payment_plan',   field: 'payment_plan_url'   },
                      ] as { label: string; type: string; field: keyof typeof formData }[]
                    ).map(({ label, type, field }) => {
                      const url = formData[field] as string
                      const uploading = docUploading[type]
                      return (
                        <div key={type} className="flex flex-col gap-1">
                          <label className="block text-xs font-medium text-gray-600">{label}</label>
                          {url ? (
                            <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-md">
                              <CheckCircleIcon className="h-4 w-4 text-green-600 shrink-0" />
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-green-700 underline truncate flex-1"
                              >
                                {url.split('/').pop()}
                              </a>
                              <button
                                type="button"
                                onClick={() => setFormData(f => ({ ...f, [field]: '' }))}
                                className="text-red-400 hover:text-red-600"
                                disabled={isSubmitting}
                                title="Remove"
                              >
                                <XMarkIcon className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          ) : (
                            <label className={`flex items-center gap-2 px-3 py-2 border border-dashed rounded-md cursor-pointer transition-colors ${uploading ? 'border-blue-300 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}`}>
                              {uploading ? (
                                <>
                                  <div className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-blue-600" />
                                  <span className="text-xs text-blue-600">Uploading…</span>
                                </>
                              ) : (
                                <>
                                  <DocumentArrowUpIcon className="h-3.5 w-3.5 text-gray-400" />
                                  <span className="text-xs text-gray-500">Upload PDF</span>
                                </>
                              )}
                              <input
                                type="file"
                                accept=".pdf,application/pdf"
                                className="hidden"
                                disabled={isSubmitting || uploading}
                                onChange={(e) => handleDocFileChange(e, type, field)}
                              />
                            </label>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* ── PROJECT VIDEOS (uploaded files) ───────────────────────── */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <VideoCameraIcon className="h-4 w-4 text-purple-500" />
                    Project Videos
                  </h4>

                  <label className={`flex items-center justify-center gap-2 w-full border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors ${docUploading.videos ? 'border-purple-300 bg-purple-50' : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50'}`}>
                    {docUploading.videos ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600" />
                        <span className="text-sm text-purple-600">Uploading…</span>
                      </>
                    ) : (
                      <>
                        <DocumentArrowUpIcon className="h-5 w-5 text-gray-400" />
                        <span className="text-sm text-gray-500">Click to upload video files (MP4, MOV — multiple allowed)</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="video/*"
                      multiple
                      className="hidden"
                      disabled={isSubmitting || docUploading.videos}
                      onChange={handleVideoFilesChange}
                    />
                  </label>

                  {formData.videos.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {formData.videos.map((vid, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-2 bg-purple-50 border border-purple-200 rounded-md">
                          <VideoCameraIcon className="h-4 w-4 text-purple-500 shrink-0" />
                          <a
                            href={vid}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-purple-700 underline truncate flex-1"
                          >
                            {vid.split('/').pop()}
                          </a>
                          <button
                            type="button"
                            onClick={() => setFormData(f => ({ ...f, videos: f.videos.filter((_, idx) => idx !== i) }))}
                            className="text-red-400 hover:text-red-600 shrink-0"
                            disabled={isSubmitting}
                          >
                            <XMarkIcon className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ── CUSTOM DOCUMENT LINKS ─────────────────────────────────── */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <DocumentTextIcon className="h-4 w-4 text-blue-500" />
                    Document Links
                    <span className="text-xs font-normal text-gray-500 ml-1">— shown as download buttons on the project page</span>
                  </h4>

                  {/* Existing documents */}
                  {formData.documents.length > 0 && (
                    <div className="mb-3 space-y-2">
                      {formData.documents.map((doc, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-md">
                          <DocumentTextIcon className="h-4 w-4 text-blue-500 shrink-0" />
                          <span className="text-xs font-medium text-blue-800 truncate w-28">{doc.name}</span>
                          <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 underline truncate flex-1">{doc.url}</a>
                          <button
                            type="button"
                            onClick={() => setFormData(f => ({ ...f, documents: f.documents.filter((_, idx) => idx !== i) }))}
                            className="text-red-400 hover:text-red-600 shrink-0"
                            disabled={isSubmitting}
                          >
                            <XMarkIcon className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add new document row */}
                  <div className="flex gap-2 items-end">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1">Document Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Brochure, Floor Plan, Fact Sheet"
                        value={newDoc.name}
                        onChange={(e) => setNewDoc(d => ({ ...d, name: e.target.value }))}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="flex-[2]">
                      <label className="block text-xs text-gray-500 mb-1">URL</label>
                      <input
                        type="url"
                        placeholder="https://..."
                        value={newDoc.url}
                        onChange={(e) => setNewDoc(d => ({ ...d, url: e.target.value }))}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isSubmitting}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (newDoc.name.trim() && newDoc.url.trim()) {
                          setFormData(f => ({ ...f, documents: [...f.documents, { name: newDoc.name.trim(), url: newDoc.url.trim() }] }))
                          setNewDoc({ name: '', url: '' })
                        }
                      }}
                      className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 disabled:opacity-50 whitespace-nowrap"
                      disabled={isSubmitting || !newDoc.name.trim() || !newDoc.url.trim()}
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Arrays */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Amenities</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Add amenity"
                        value={tempInput.amenity}
                        onChange={(e) => setTempInput({...tempInput, amenity: e.target.value})}
                        onKeyPress={(e) => handleKeyPress(e, 'amenity', 'amenities')}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isSubmitting}
                      />
                      <button
                        type="button"
                        onClick={() => handleArrayInput('amenity', 'amenities')}
                        className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                        disabled={isSubmitting}
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.amenities.map((amenity, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                          {amenity}
                          <button
                            type="button"
                            onClick={() => removeFromArray('amenities', amenity)}
                            className="ml-1 text-blue-600 hover:text-blue-800"
                            disabled={isSubmitting}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Property Types</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Add property type"
                        value={tempInput.property_type}
                        onChange={(e) => setTempInput({...tempInput, property_type: e.target.value})}
                        onKeyPress={(e) => handleKeyPress(e, 'property_type', 'property_types')}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isSubmitting}
                      />
                      <button
                        type="button"
                        onClick={() => handleArrayInput('property_type', 'property_types')}
                        className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                        disabled={isSubmitting}
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.property_types.map((type, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          {type}
                          <button
                            type="button"
                            onClick={() => removeFromArray('property_types', type)}
                            className="ml-1 text-green-600 hover:text-green-800"
                            disabled={isSubmitting}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Facilities */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Facilities</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Add facility"
                      value={tempInput.facility}
                      onChange={(e) => setTempInput({...tempInput, facility: e.target.value})}
                      onKeyPress={(e) => handleKeyPress(e, 'facility', 'facilities')}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                    <button
                      type="button"
                      onClick={() => handleArrayInput('facility', 'facilities')}
                      className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                      disabled={isSubmitting}
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.facilities.map((facility, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                        {facility}
                        <button
                          type="button"
                          onClick={() => removeFromArray('facilities', facility)}
                          className="ml-1 text-yellow-600 hover:text-yellow-800"
                          disabled={isSubmitting}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* SEO */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">SEO Title</label>
                    <input
                      type="text"
                      value={formData.seo_title}
                      onChange={(e) => setFormData({...formData, seo_title: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">SEO Keywords</label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Add keyword"
                        value={tempInput.seo_keyword}
                        onChange={(e) => setTempInput({...tempInput, seo_keyword: e.target.value})}
                        onKeyPress={(e) => handleKeyPress(e, 'seo_keyword', 'seo_keywords')}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isSubmitting}
                      />
                      <button
                        type="button"
                        onClick={() => handleArrayInput('seo_keyword', 'seo_keywords')}
                        className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                        disabled={isSubmitting}
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.seo_keywords.map((keyword, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                          {keyword}
                          <button
                            type="button"
                            onClick={() => removeFromArray('seo_keywords', keyword)}
                            className="ml-1 text-purple-600 hover:text-purple-800"
                            disabled={isSubmitting}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">SEO Description</label>
                  <textarea
                    rows={2}
                    value={formData.seo_description}
                    onChange={(e) => setFormData({...formData, seo_description: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Coordinates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Latitude</label>
                    <input
                      type="number"
                      step="any"
                      value={formData.coords_lat}
                      onChange={(e) => setFormData({...formData, coords_lat: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Longitude</label>
                    <input
                      type="number"
                      step="any"
                      value={formData.coords_lng}
                      onChange={(e) => setFormData({...formData, coords_lng: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                {/* Payment Plan */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Payment Plan</label>
                  <textarea
                    rows={2}
                    value={formData.payment_plan}
                    onChange={(e) => setFormData({...formData, payment_plan: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Checkboxes */}
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <input
                      id="featured"
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      disabled={isSubmitting}
                    />
                    <label htmlFor="featured" className="ml-2 text-sm text-gray-700">Featured</label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="published"
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({...formData, published: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      disabled={isSubmitting}
                    />
                    <label htmlFor="published" className="ml-2 text-sm text-gray-700">Published</label>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3 pt-6 border-t">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={isSubmitting}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {editingProject ? 'Updating...' : 'Creating...'}
                      </span>
                    ) : (
                      editingProject ? 'Update Project' : 'Create Project'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}