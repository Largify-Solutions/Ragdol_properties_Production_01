'use client';

import { useState, useEffect } from 'react'
import { directUpload } from '@/lib/direct-upload'
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  EyeIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'

interface Blog {
  id: string
  title: string
  content: string
  excerpt?: string
  author_id?: string
  status: 'draft' | 'published' | 'archived'
  created_at: string
  updated_at: string
  tags?: string[]
  slug?: string
  featured_image?: string
  category?: string
  published_at?: string
  likes_count?: number
  comments_count?: number
  views_count?: number
  seo_title?: string
  seo_description?: string
  seo_keywords?: string[]
}

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddBlog, setShowAddBlog] = useState(false)
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [publishLoading, setPublishLoading] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    status: 'draft' as 'draft' | 'published' | 'archived',
    tags: '',
    slug: '',
    featured_image: '',
    category: '',
    seo_title: '',
    seo_description: ''
  })

  // Fetch blogs from Supabase
  const fetchBlogs = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/blogs?limit=200')
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to load blogs')
      const blogsData: Blog[] = (json.blogs || []).map((item: any) => ({
        id: item.id,
        title: item.title || '',
        content: item.content || '',
        excerpt: item.excerpt || '',
        author_id: item.author_id || undefined,
        status: item.status || 'draft',
        created_at: item.created_at,
        updated_at: item.updated_at,
        tags: item.tags || [],
        slug: item.slug || '',
        featured_image: item.featured_image || '',
        category: item.category || '',
        published_at: item.published_at || undefined,
        likes_count: item.likes_count || 0,
        comments_count: item.comments_count || 0,
        views_count: item.views_count || 0,
        seo_title: item.seo_title || '',
        seo_description: item.seo_description || '',
        seo_keywords: item.seo_keywords || []
      }))
      setBlogs(blogsData)
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  // Filter blogs based on search term
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (blog.category || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // handleCheckboxChange removed — status is now a select dropdown

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Title and content are required')
      return
    }

    try {
      const generatedSlug = formData.slug.trim() || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      const blogData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        excerpt: formData.excerpt.trim() || null,
        status: formData.status as any,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        slug: generatedSlug,
        featured_image: formData.featured_image?.trim() || null,
        category: formData.category.trim() || null,
        seo_title: formData.seo_title?.trim() || null,
        seo_description: formData.seo_description?.trim() || null,
        updated_at: new Date().toISOString(),
        published_at: formData.status === 'published' ? new Date().toISOString() : null
      }

      if (editingBlog) {
        // Update existing blog via service-role API route
        const res = await fetch('/api/admin/blogs', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingBlog.id, ...blogData }),
        })
        const json = await res.json()
        if (!res.ok) throw new Error(json.error || 'Failed to update blog')
        alert('Blog updated successfully!')
      } else {
        // Add new blog via service-role API route
        const res = await fetch('/api/admin/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(blogData),
        })
        const json = await res.json()
        if (!res.ok) throw new Error(json.error || 'Failed to add blog')
        alert('Blog added successfully!')
      }

      // Reset form and refresh list
      resetForm()
      fetchBlogs()
    } catch (error) {
      console.error('Error saving blog:', error)
      alert('Error saving blog. Please try again.')
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      status: 'draft' as 'draft' | 'published' | 'archived',
      tags: '',
      slug: '',
      featured_image: '',
      category: '',
      seo_title: '',
      seo_description: ''
    })
    setShowAddBlog(false)
    setEditingBlog(null)
  }

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog)
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt || '',
      status: blog.status,
      tags: blog.tags?.join(', ') || '',
      slug: blog.slug || '',
      featured_image: blog.featured_image || '',
      category: blog.category || '',
      seo_title: blog.seo_title || '',
      seo_description: blog.seo_description || ''
    })
    setShowAddBlog(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) return

    try {
      const res = await fetch(`/api/admin/blogs?id=${id}`, { method: 'DELETE' })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to delete blog')

      setBlogs(blogs.filter(blog => blog.id !== id))
      alert('Blog deleted successfully!')
    } catch (error) {
      console.error('Error deleting blog:', error)
      alert('Failed to delete blog. Please try again.')
    }
  }

  const togglePublishStatus = async (blog: Blog) => {
    try {
      setPublishLoading(blog.id)
      const newStatus = blog.status === 'published' ? 'draft' : 'published'
      const updateData: Record<string, any> = {
        status: newStatus,
        updated_at: new Date().toISOString()
      }
      if (newStatus === 'published') {
        updateData.published_at = new Date().toISOString()
      }
      const res = await fetch('/api/admin/blogs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: blog.id, ...updateData }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to update status')
      
      // Update local state
      setBlogs(blogs.map(b => 
        b.id === blog.id ? { ...b, status: newStatus } : b
      ))
    } catch (error) {
      console.error('Error updating publish status:', error)
      alert('Failed to update publish status')
    } finally {
      setPublishLoading(null)
    }
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A'
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch (error) {
      return 'N/A'
    }
  }

  // Calculate read time (display only, not stored in DB)
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.trim().split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min read`
  }

  // Auto-generate slug from title
  useEffect(() => {
    if (formData.title && !formData.slug && !editingBlog) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
      setFormData(prev => ({ ...prev, slug }))
    }
  }, [formData.title, editingBlog])

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Blogs</h1>
          <p className="text-muted-foreground">Create and manage blog posts for your website.</p>
        </div>
        <button
          onClick={() => {
            setEditingBlog(null)
            resetForm()
            setShowAddBlog(true)
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Blog Post
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search blogs by title, content, category, or tags..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Blogs</h3>
          <p className="text-2xl font-bold text-gray-900">{blogs.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Published</h3>
          <p className="text-2xl font-bold text-green-600">
            {blogs.filter(blog => blog.status === 'published').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Drafts</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {blogs.filter(blog => blog.status !== 'published').length}
          </p>
        </div>
      </div>

      {/* Add/Edit Blog Modal */}
      {showAddBlog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-white py-2 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                {editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}
              </h3>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter blog title"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Author
                  </label>
                  <input
                    type="text"
                    value="RAGDOL"
                    disabled
                    className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500">Author is set automatically</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Slug
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="blog-url-slug"
                  />
                  <p className="text-xs text-gray-500">
                    Leave empty to auto-generate from title
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select category</option>
                    <option value="Technology">Technology</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Business">Business</option>
                    <option value="Travel">Travel</option>
                    <option value="Food">Food</option>
                    <option value="Health">Health</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Featured Image
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    name="featured_image"
                    value={formData.featured_image}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com/image.jpg or upload →"
                  />
                  <label className="mt-1 cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 whitespace-nowrap">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        try {
                          const ext = file.name.split('.').pop() || 'jpg'
                          const filePath = `blog/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
                          const url = await directUpload(file, 'documents', filePath)
                          setFormData(prev => ({ ...prev, featured_image: url }))
                        } catch (err: any) {
                          alert('Upload failed: ' + err.message)
                        }
                      }}
                    />
                  </label>
                </div>
                {formData.featured_image && (
                  <img src={formData.featured_image} alt="Preview" className="mt-2 h-32 w-auto rounded-lg object-cover" />
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Excerpt
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Short description for blog preview"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Content *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  rows={15}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
                  placeholder="Write your blog content here..."
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Read time: {formData.content.trim() ? calculateReadTime(formData.content) : '0 min read'}</span>
                  <span>{formData.content.length} characters</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="tag1, tag2, tag3"
                  />
                  <p className="text-xs text-gray-500">
                    Separate tags with commas
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  {editingBlog ? 'Update Blog' : 'Add Blog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Blogs List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md border">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Blog Posts ({filteredBlogs.length})
            </h3>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear search
              </button>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <ArrowPathIcon className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {searchTerm ? 'No matching blogs found' : 'No blog posts yet'}
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                {searchTerm
                  ? 'Try a different search term'
                  : 'Get started by creating your first blog post.'}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setShowAddBlog(true)}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Create Blog Post
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {blog.title}
                        </h4>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            blog.status === 'published'
                              ? 'bg-green-100 text-green-800'
                              : blog.status === 'archived'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {blog.status === 'published' ? 'Published' : blog.status === 'archived' ? 'Archived' : 'Draft'}
                        </span>
                        {blog.category && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {blog.category}
                          </span>
                        )}
                      </div>

                      {blog.excerpt && (
                        <p className="text-gray-600 mb-3">{blog.excerpt}</p>
                      )}

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {formatDate(blog.created_at)}
                        </span>
                        <span>By RAGDOL</span>
                        {blog.content && <span>• {calculateReadTime(blog.content)}</span>}
                        {blog.tags && blog.tags.length > 0 && (
                          <div className="flex items-center gap-1">
                            <span>Tags:</span>
                            <div className="flex flex-wrap gap-1">
                              {blog.tags.slice(0, 3).map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-0.5 bg-gray-100 rounded text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                              {blog.tags.length > 3 && (
                                <span className="text-xs">+{blog.tags.length - 3} more</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => togglePublishStatus(blog)}
                        disabled={publishLoading === blog.id}
                        className={`p-2 rounded-md ${
                          blog.status === 'published'
                            ? 'text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50'
                            : 'text-green-600 hover:text-green-800 hover:bg-green-50'
                        } transition-colors`}
                        title={blog.status === 'published' ? 'Unpublish' : 'Publish'}
                      >
                        {publishLoading === blog.id ? (
                          <ArrowPathIcon className="h-5 w-5 animate-spin" />
                        ) : blog.status === 'published' ? (
                          <XCircleIcon className="h-5 w-5" />
                        ) : (
                          <CheckCircleIcon className="h-5 w-5" />
                        )}
                      </button>
                      <button
                        onClick={() => handleEdit(blog)}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                        title="Edit"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}