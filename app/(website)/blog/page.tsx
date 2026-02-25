'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { CalendarIcon, UserIcon, ArrowRightIcon, SparklesIcon, ChartBarIcon, NewspaperIcon } from '@heroicons/react/24/outline'
import { supabase } from '@/lib/supabase-browser'
import { useRealtimeMulti } from '@/lib/hooks/useRealtimeSubscription'

interface BlogPost {
  id: string
  title: string | null
  excerpt: string | null
  content: string
  category: string | null
  featured_image: string | null
  images: string[] | null
  tags: string[] | null
  status: string | null
  author_id: string | null
  published_at: string | null
  created_at: string | null
  views_count: number | null
}

// Module cache
const CACHE_DURATION = 3 * 60 * 1000
let blogCache: { data: BlogPost[] | null; timestamp: number } = { data: null, timestamp: 0 }

function getCachedBlogs() {
  if (blogCache.data && Date.now() - blogCache.timestamp < CACHE_DURATION) return blogCache.data
  return null
}
function setCachedBlogs(data: BlogPost[]) { blogCache.data = data; blogCache.timestamp = Date.now() }
function clearBlogCache() { blogCache.data = null; blogCache.timestamp = 0 }

function formatDate(dateStr: string | null) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All Posts')

  const fetchPosts = useCallback(async (silent = false) => {
    if (!silent) {
      const cached = getCachedBlogs()
      if (cached) { setPosts(cached); setLoading(false); return }
    }
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(50)
      if (error) throw error
      const result = (data || []) as BlogPost[]
      setPosts(result)
      setCachedBlogs(result)
    } catch (err) {
      console.error('Error fetching blog posts:', err)
    } finally {
      if (!silent) setLoading(false)
    }
  }, [])

  useEffect(() => { fetchPosts() }, [fetchPosts])

  useRealtimeMulti([
    { table: 'posts', onChange: () => { clearBlogCache(); fetchPosts(true) } }
  ])

  const categories = ['All Posts', ...Array.from(new Set(posts.map(p => p.category).filter((c): c is string => !!c)))]
  const filteredPosts = activeCategory === 'All Posts' ? posts : posts.filter(p => p.category === activeCategory)
  const featuredPost = filteredPosts[0]
  const gridPosts = filteredPosts.slice(1)

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-secondary">
          <div className="absolute inset-0">
            <Image 
              src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Blog Hero"
              fill
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-linear-to-b from-secondary/60 via-secondary/40 to-white"></div>
          </div>
          <div className="container-custom relative z-10 text-center">
            <h2 className="text-primary font-bold tracking-[0.4em] uppercase text-sm mb-6">Insights & News</h2>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8">RAGDOLL <span className="text-gradient">Journal</span></h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium">No posts published yet. Check back soon!</p>
          </div>
        </section>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-secondary">
        <div className="absolute inset-0">
          <Image 
            src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Blog Hero"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-linear-to-b from-secondary/60 via-secondary/40 to-white"></div>
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-primary font-bold tracking-[0.4em] uppercase text-sm mb-6 animate-slide-up">
            Insights & News
          </h2>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8 animate-slide-up [animation-delay:100ms]">
            RAGDOLL <span className="text-gradient">Journal</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto font-medium animate-slide-up [animation-delay:200ms]">
            Stay ahead of the curve with expert market analysis, investment guides, and the latest real estate news from Dubai.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
      <section className="py-24">
        <div className="container-custom">
          <div className="group relative bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row animate-slide-up">
            <div className="lg:w-1/2 relative h-96 lg:h-auto overflow-hidden">
              <img 
                src={featuredPost.featured_image || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800'} 
                alt={featuredPost.title || 'Blog post'}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute top-8 left-8">
                <span className="px-6 py-2 bg-primary text-secondary text-xs font-black uppercase tracking-widest rounded-full shadow-xl">
                  Featured Article
                </span>
              </div>
            </div>
            <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
              <div className="flex items-center gap-4 text-primary text-xs font-bold uppercase tracking-widest mb-6">
                <span>{featuredPost.category || 'Blog'}</span>
                <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                <span>{formatDate(featuredPost.published_at || featuredPost.created_at)}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight group-hover:text-primary transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed mb-10 font-medium">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-white/10 rounded-full flex items-center justify-center text-white">
                    <UserIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-white font-bold">RAGDOLL</div>
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">{formatDate(featuredPost.published_at || featuredPost.created_at)}</div>
                  </div>
                </div>
                <Link href={`/blog/${featuredPost.id}`} className="h-14 w-14 bg-primary rounded-2xl flex items-center justify-center text-secondary hover:bg-white transition-all">
                  <ArrowRightIcon className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Categories */}
      <section className="py-12 border-y border-slate-100">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)} 
                className={`px-8 py-3 rounded-full border text-sm font-bold transition-all ${
                  activeCategory === cat 
                    ? 'border-primary bg-primary text-white' 
                    : 'border-slate-200 text-slate-600 hover:border-primary hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {gridPosts.map((post, i) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="group animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="relative aspect-[16/10] rounded-4xl overflow-hidden mb-8 shadow-xl">
                  <img 
                    src={post.featured_image || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800'} 
                    alt={post.title || 'Blog post'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                      {post.category || 'Blog'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                  <span>{formatDate(post.published_at || post.created_at)}</span>
                  <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                  <span>{post.views_count || 0} views</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors leading-tight mb-4">
                  {post.title}
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-20">
            <button className="btn-outline rounded-full! !px-12 !py-4">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-black text-secondary mb-8 tracking-tight">
                Get the Latest <span className="text-white">Insights</span>
              </h2>
              <p className="text-xl text-secondary/80 mb-12 font-medium">
                Subscribe to our newsletter and receive the most important Dubai real estate news and market reports directly in your inbox.
              </p>
              <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                <input 
                  type="email" 
                  placeholder="Your Email Address" 
                  className="flex-1 px-8 py-5 rounded-2xl bg-white/20 border border-white/30 text-secondary placeholder:text-secondary/50 focus:outline-none focus:ring-2 focus:ring-white/50 font-bold"
                />
                <button className="px-10 py-5 bg-secondary text-white font-black uppercase tracking-widest rounded-2xl hover:bg-white hover:text-secondary transition-all">
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
