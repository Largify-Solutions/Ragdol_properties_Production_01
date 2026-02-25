'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRealtimeMulti } from '@/lib/hooks/useRealtimeSubscription'
import Link from 'next/link'
import { 
  NewspaperIcon, 
  CalendarDaysIcon, 
  UserIcon, 
  ArrowRightIcon, 
  MagnifyingGlassIcon,
  ClockIcon,
  XMarkIcon,
  TagIcon,
  ShareIcon,
  BookmarkIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid'

// Supabase import
import { supabase } from '@/lib/supabase-browser'

// Blog type definition
type Blog = {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  category: string
  readTime: string
  imageUrl: string
  published: boolean
  createdAt: any
  updatedAt: any
  slug: string
  tags: string[]
}

// Function to fetch blogs from Supabase
async function fetchBlogs() {
  try {
    console.log('📝 Fetching blogs from Supabase...')
    
    // Fetch only published blogs
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'published');
    
    if (error) throw error;
    
    console.log(`✅ Found ${data?.length || 0} published blogs`)
    
    const blogs: Blog[] = (data || []).map((row: any) => {
      // Compute read time from content length (~200 words per minute)
      const wordCount = (row.content || '').split(/\s+/).length;
      const readMinutes = Math.max(1, Math.ceil(wordCount / 200));
      
      return {
        id: row.id,
        title: row.title || 'Untitled Blog',
        excerpt: row.excerpt || '',
        content: row.content || '',
        author: 'RAGDOLL Properties',
        category: row.category || 'Uncategorized',
        readTime: `${readMinutes} min read`,
        imageUrl: row.featured_image || '/api/placeholder/800/450',
        published: row.status === 'published',
        createdAt: row.created_at || new Date().toISOString(),
        updatedAt: row.updated_at || new Date().toISOString(),
        slug: row.slug || row.id,
        tags: row.tags || []
      };
    });
    
    // Sort by creation date (newest first)
    blogs.sort((a, b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)
      return dateB.getTime() - dateA.getTime()
    })
    
    return blogs
    
  } catch (error: any) {
    console.error('❌ Error fetching blogs:', error.message)
    return []
  }
}

// Format date function
function formatDate(dateInput: any): string {
  try {
    let date: Date
    
    if (typeof dateInput === 'string') {
      // ISO string
      date = new Date(dateInput)
    } else if (dateInput instanceof Date) {
      // Date object
      date = dateInput
    } else {
      // Fallback to current date
      date = new Date()
    }
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (error) {
    return 'Recent'
  }
}

// Get unique categories from blogs
function getCategoriesFromBlogs(blogs: Blog[]): string[] {
  const categories = blogs.map(blog => blog.category)
  return ['All', ...Array.from(new Set(categories))]
}

export default function NewsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('latest')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [savedBlogs, setSavedBlogs] = useState<string[]>([])
  const [imageLoaded, setImageLoaded] = useState<{[key: string]: boolean}>({})

  // Reload function (used by mount effect and realtime)
  const loadBlogs = useCallback(async () => {
    const fetchedBlogs = await fetchBlogs()
    setBlogs(fetchedBlogs)
  }, [])

  // Fetch blogs on component mount
  useEffect(() => {
    setLoading(true)
    loadBlogs().finally(() => setLoading(false))
  }, [loadBlogs])

  // Real-time: auto-refresh when posts table changes
  useRealtimeMulti([
    { table: 'posts', onChange: () => { loadBlogs() } }
  ])

  // Filter blogs based on category and search
  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.content.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Handle Read More click
  const handleReadMore = (blog: Blog) => {
    setSelectedBlog(blog)
    setIsModalOpen(true)
    // Reset image loaded state for this blog
    setImageLoaded(prev => ({...prev, [blog.id]: false}))
  }

  // Handle Save Blog
  const handleSaveBlog = (blogId: string) => {
    if (savedBlogs.includes(blogId)) {
      setSavedBlogs(savedBlogs.filter(id => id !== blogId))
    } else {
      setSavedBlogs([...savedBlogs, blogId])
    }
  }

  // Handle Share
  const handleShare = (blog: Blog) => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.origin + `/news/${blog.slug || blog.id}`,
      })
    } else {
      navigator.clipboard.writeText(window.location.origin + `/news/${blog.slug || blog.id}`)
      alert('Link copied to clipboard!')
    }
  }

  // Handle Image Load
  const handleImageLoad = (blogId: string) => {
    setImageLoaded(prev => ({...prev, [blogId]: true}))
  }

  // Get categories from blogs
  const categories = getCategoriesFromBlogs(blogs)

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-slate-600 font-medium">Loading blogs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative py-20 bg-linear-to-br from-primary/5 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-black text-secondary mb-6 tracking-tight">
              <span className="text-secondary">Real Estate</span> <span className="text-primary">Blog</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-slate-600 max-w-3xl mx-auto">
              Stay informed with the latest Dubai real estate market insights and industry updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
             
              <Link href={'/why-invest-dubai'} className="px-8 py-4 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary hover:text-secondary transition-all">
                Market Reports
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {['latest', 'market-reports', 'developments', 'insights'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-slate-600 hover:text-primary'
                }`}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {activeTab === 'latest' && (
          <div className="space-y-12">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative flex-1 max-w-md">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? 'bg-primary text-secondary'
                        : 'bg-slate-100 text-slate-700 hover:bg-primary hover:text-secondary'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* 4 News Boxes in One Line */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBlogs.map((blog) => (
                <div 
                  key={blog.id}
                  className="rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-lg group relative"
                >
                  <div className="relative">
                    {/* READ MORE BUTTON */}
                    <button
                      onClick={() => handleReadMore(blog)}
                      className="absolute top-3 right-3 z-10 px-3 py-1.5 bg-black/70 hover:bg-black text-white text-xs font-bold rounded-lg backdrop-blur-sm flex items-center gap-1 transition-all hover:scale-105"
                    >
                      <EyeIcon className="h-3 w-3" />
                      Read More
                    </button>
                    
                    {/* Image Container with High Quality */}
                    <div 
                      className="h-48 bg-cover bg-center group-hover:scale-105 transition-transform duration-300 cursor-pointer relative overflow-hidden bg-linear-to-br from-slate-200 to-slate-300"
                      onClick={() => handleReadMore(blog)}
                    >
                      {/* High Quality Image */}
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                          imageLoaded[blog.id] ? 'opacity-100' : 'opacity-0'
                        }`}
                        loading="lazy"
                        onLoad={() => handleImageLoad(blog.id)}
                        onError={(e) => {
                          console.error('Image failed to load:', blog.imageUrl);
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      
                      {/* Loading Skeleton */}
                      {!imageLoaded[blog.id] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-slate-200 to-slate-300">
                          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold uppercase tracking-widest border border-slate-200">
                        {blog.category}
                      </span>
                      <span className="text-xs text-slate-500">
                        {blog.readTime}
                      </span>
                    </div>
                    <h3 
                      className="text-base font-bold text-secondary mb-3 group-hover:text-primary transition-colors leading-tight line-clamp-2 cursor-pointer"
                      onClick={() => handleReadMore(blog)}
                    >
                      {blog.title}
                    </h3>
                    <p 
                      className="text-sm text-slate-600 mb-4 leading-relaxed line-clamp-2 cursor-pointer"
                      onClick={() => handleReadMore(blog)}
                    >
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="truncate">{blog.author}</span>
                      <span>{formatDate(blog.createdAt)}</span>
                    </div>
                    
                    {/* Bottom Action Buttons */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSaveBlog(blog.id)
                        }}
                        className={`flex items-center gap-1 text-xs ${
                          savedBlogs.includes(blog.id) 
                            ? 'text-primary' 
                            : 'text-slate-500 hover:text-primary'
                        }`}
                      >
                        {savedBlogs.includes(blog.id) ? (
                          <BookmarkSolidIcon className="h-4 w-4" />
                        ) : (
                          <BookmarkIcon className="h-4 w-4" />
                        )}
                        Save
                      </button>
                      
                      <button
                        onClick={() => handleReadMore(blog)}
                        className="flex items-center gap-1 text-xs text-slate-500 hover:text-primary"
                      >
                        <ArrowRightIcon className="h-3 w-3" />
                        Read Full
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleShare(blog)
                        }}
                        className="flex items-center gap-1 text-xs text-slate-500 hover:text-primary"
                      >
                        <ShareIcon className="h-3 w-3" />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Blogs Message */}
            {filteredBlogs.length === 0 && (
              <div className="text-center py-12">
                <NewspaperIcon className="h-16 w-16 mx-auto mb-4 text-slate-300" />
                <h3 className="text-xl font-bold text-slate-700 mb-2">No blogs found</h3>
                <p className="text-slate-500">
                  {searchTerm 
                    ? `No blogs found for "${searchTerm}"`
                    : 'No blogs available at the moment. Please check back soon.'
                  }
                </p>
              </div>
            )}
          </div>
        )}

        {/* Other Tabs - You can customize these based on categories */}
        {activeTab === 'market-reports' && (
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-secondary tracking-tight text-center mb-12">
              <span className="text-secondary">Market Reports</span> <span className="text-primary">& Analysis</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogs
                .filter(blog => blog.category.toLowerCase().includes('market') || blog.category.toLowerCase().includes('report'))
                .map((blog) => (
                <div key={blog.id} className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-lg">
                  <h3 className="text-xl font-bold text-secondary mb-3 hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                  <p className="mb-4 text-slate-600 leading-relaxed">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">{formatDate(blog.createdAt)}</span>
                    <button
                      onClick={() => handleReadMore(blog)}
                      className="font-bold text-primary hover:text-primary/80 transition-colors"
                    >
                      Read Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'developments' && (
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-secondary tracking-tight text-center mb-12">
              <span className="text-secondary">New Developments</span> <span className="text-primary">& Projects</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogs
                .filter(blog => blog.category.toLowerCase().includes('development') || blog.category.toLowerCase().includes('project'))
                .map((blog) => (
                <div key={blog.id} className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-lg">
                  <h3 className="text-xl font-bold text-secondary mb-3 hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                  <p className="mb-4 text-slate-600 leading-relaxed">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">{formatDate(blog.createdAt)}</span>
                    <button
                      onClick={() => handleReadMore(blog)}
                      className="font-bold text-primary hover:text-primary/80 transition-colors"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-secondary tracking-tight text-center mb-12">
              <span className="text-secondary">Investment Insights</span> <span className="text-primary">& Trends</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogs
                .filter(blog => 
                  blog.category.toLowerCase().includes('investment') || 
                  blog.category.toLowerCase().includes('insight') ||
                  blog.category.toLowerCase().includes('trend')
                )
                .map((blog) => (
                <div key={blog.id} className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-md">
                  <h3 className="text-xl font-bold text-secondary mb-3 hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                  <p className="mb-4 text-slate-600 leading-relaxed">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">{formatDate(blog.createdAt)}</span>
                    <button
                      onClick={() => handleReadMore(blog)}
                      className="font-bold text-primary hover:text-secondary transition-colors"
                    >
                      Read Analysis
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Newsletter Signup */}
      <div className="py-16 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <NewspaperIcon className="h-16 w-16 mx-auto mb-6 text-primary" />
          <h2 className="text-3xl md:text-4xl font-black text-secondary tracking-tight mb-4">
           <span className="text-primary"> Stay Updated  with Latest News</span>
          </h2>
          <p className="text-lg mb-8 text-slate-300 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive market insights and property updates.
          </p>
          
        </div>
      </div>

      {/* BEAUTIFUL POPUP MODAL WITH HIGH QUALITY IMAGE */}
      {isModalOpen && selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm h-full w-full mt-25">
          <div className="relative w-full h-full bg-white rounded-3xl shadow-2xl animate-fadeIn overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-700 hover:text-primary transition-colors shadow-lg hover:shadow-xl"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            {/* Scrollable Content Container */}
            <div className="h-full overflow-y-auto modal-scrollbar">
              {/* Hero Image - Fixed at top with HIGH QUALITY */}
              <div className="top-0 z-10">
                <div className="relative h-64 md:h-80">
                  {/* High Quality Image Container */}
                  <div className="absolute inset-0 overflow-hidden">
                    {/* Main High Quality Image */}
                    <img
                      src={selectedBlog.imageUrl}
                      alt={selectedBlog.title}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      loading="eager"
                      onLoad={() => handleImageLoad(selectedBlog.id)}
                      onError={(e) => {
                        console.error('Modal image failed to load:', selectedBlog.imageUrl);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  
                  {/* Gradient Overlay for better text readability */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {/* Overlay Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white z-20">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-primary text-secondary rounded-full text-xs font-bold uppercase tracking-widest">
                        {selectedBlog.category}
                      </span>
                      <span className="text-sm text-white/80">•</span>
                      <span className="text-sm flex items-center gap-1 text-white/90">
                        <ClockIcon className="h-4 w-4" />
                        {selectedBlog.readTime}
                      </span>
                      <span className="text-sm text-white/80">•</span>
                      <span className="text-sm text-white/90">{formatDate(selectedBlog.createdAt)}</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black mb-2 text-white drop-shadow-lg">
                      {selectedBlog.title}
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-white/90">
                      <UserIcon className="h-4 w-4" />
                      <span>By {selectedBlog.author}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="p-6 md:p-8">
                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                   
                    
                    <button
                      onClick={() => handleShare(selectedBlog)}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-primary/10 hover:text-primary"
                    >
                      <ShareIcon className="h-5 w-5" />
                      Share
                    </button>
                  </div>
                  
                
                </div>

                {/* Excerpt */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-secondary mb-4">Overview</h2>
                  <p className="text-slate-600 leading-relaxed text-lg bg-slate-50 p-6 rounded-xl border border-slate-200">
                    {selectedBlog.excerpt}
                  </p>
                </div>

                {/* Full Content */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-secondary mb-4">Full Article</h2>
                  <div className="prose prose-lg max-w-none">
                    <div className="text-slate-700 leading-relaxed whitespace-pre-line bg-white p-6 rounded-xl border border-slate-200">
                      {selectedBlog.content}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                {selectedBlog.tags && selectedBlog.tags.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                      <TagIcon className="h-5 w-5" />
                      Tags
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {selectedBlog.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm border border-slate-200 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Article Meta */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <h3 className="text-lg font-bold text-secondary mb-4">Article Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <div className="text-sm text-slate-500">Category</div>
                      <div className="font-bold text-slate-800">{selectedBlog.category}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-slate-500">Reading Time</div>
                      <div className="font-bold text-slate-800">{selectedBlog.readTime}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-slate-500">Published Date</div>
                      <div className="font-bold text-slate-800">{formatDate(selectedBlog.createdAt)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Scrollbar CSS */}
      <style jsx>{`
        .modal-scrollbar {
          max-height: 90vh;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 #f1f5f9;
        }
        
        .modal-scrollbar::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        
        .modal-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
          margin: 4px;
        }
        
        .modal-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #cbd5e1 0%, #94a3b8 100%);
          border-radius: 10px;
          border: 3px solid #f1f5f9;
          min-height: 40px;
        }
        
        .modal-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #94a3b8 0%, #64748b 100%);
        }
        
        .modal-scrollbar::-webkit-scrollbar-thumb:active {
          background: linear-gradient(180deg, #64748b 0%, #475569 100%);
        }
        
        .modal-scrollbar::-webkit-scrollbar-corner {
          background: #f1f5f9;
        }
        
        /* For Firefox */
        .modal-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 #f1f5f9;
          scrollbar-gutter: stable;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        /* Smooth scrolling */
        .modal-scrollbar {
          scroll-behavior: smooth;
        }
        
        /* Image loading animation */
        img {
          transition: opacity 0.3s ease-in-out;
        }
      `}</style>
    </div>
  )
}