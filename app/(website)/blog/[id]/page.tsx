'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  CalendarDaysIcon,
  UserIcon,
  ClockIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ShareIcon,
  TagIcon,
  EyeIcon,
} from '@heroicons/react/24/outline'
import { supabase } from '@/lib/supabase-browser'

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
  updated_at: string | null
  views_count: number | null
  seo_title: string | null
  seo_description: string | null
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function estimateReadTime(content: string) {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min read`
}

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [prevPost, setPrevPost] = useState<Pick<BlogPost, 'id' | 'title'> | null>(null)
  const [nextPost, setNextPost] = useState<Pick<BlogPost, 'id' | 'title'> | null>(null)

  const fetchPost = useCallback(async () => {
    const id = params.id as string
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .eq('status', 'published')
        .single()

      if (error || !data) {
        router.push('/blog')
        return
      }

      setPost(data as BlogPost)

      // Increment view count (fire-and-forget)
      supabase
        .from('posts')
        .update({ views_count: (data.views_count || 0) + 1 })
        .eq('id', id)
        .then(() => {})

      // Fetch related posts (same category, excluding current)
      const { data: related } = await supabase
        .from('posts')
        .select('id, title, excerpt, featured_image, category, published_at, created_at, views_count, content, status, author_id, images, tags, seo_title, seo_description, updated_at, likes_count, comments_count')
        .eq('status', 'published')
        .eq('category', data.category || '')
        .neq('id', id)
        .limit(3)

      if (related && related.length > 0) {
        setRelatedPosts(related as BlogPost[])
      } else {
        // Fallback: any 3 recent posts
        const { data: fallback } = await supabase
          .from('posts')
          .select('*')
          .eq('status', 'published')
          .neq('id', id)
          .order('published_at', { ascending: false })
          .limit(3)
        setRelatedPosts((fallback || []) as BlogPost[])
      }

      // Fetch prev/next posts by publish date
      const { data: allPosts } = await supabase
        .from('posts')
        .select('id, title, published_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false })

      if (allPosts) {
        const idx = allPosts.findIndex((p) => p.id === id)
        setPrevPost(idx < allPosts.length - 1 ? allPosts[idx + 1] as any : null)
        setNextPost(idx > 0 ? allPosts[idx - 1] as any : null)
      }
    } catch (err) {
      console.error('Error loading blog post:', err)
      router.push('/blog')
    } finally {
      setLoading(false)
    }
  }, [params.id, router])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post?.title || '', url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!post) return null

  const readTime = estimateReadTime(post.content)
  const publishDate = formatDate(post.published_at || post.created_at)

  return (
    <div className="min-h-screen bg-white">
      {/* Back navigation */}
      <div className="border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary transition-colors"
          >
            <ShareIcon className="h-4 w-4" />
            Share
          </button>
        </div>
      </div>

      {/* Hero image */}
      {post.featured_image && (
        <div className="relative w-full h-72 md:h-[480px] bg-gray-100">
          <Image
            src={post.featured_image}
            alt={post.title || 'Blog post'}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
          {post.category && (
            <div className="absolute bottom-8 left-8">
              <span className="px-5 py-2 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-full shadow-xl">
                {post.category}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
          {!post.featured_image && post.category && (
            <span className="px-4 py-1.5 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-full">
              {post.category}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <CalendarDaysIcon className="h-4 w-4" />
            {publishDate}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ClockIcon className="h-4 w-4" />
            {readTime}
          </span>
          {post.views_count != null && (
            <span className="inline-flex items-center gap-1.5">
              <EyeIcon className="h-4 w-4" />
              {post.views_count.toLocaleString()} views
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-6 tracking-tight">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-xl text-gray-500 leading-relaxed mb-8 font-medium border-l-4 border-primary pl-5">
            {post.excerpt}
          </p>
        )}

        {/* Author row */}
        <div className="flex items-center gap-4 mb-10 pb-10 border-b border-gray-100">
          <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <UserIcon className="h-6 w-6" />
          </div>
          <div>
            <div className="font-bold text-gray-900">Ragdoll Properties</div>
            <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold">{publishDate}</div>
          </div>
        </div>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none
            prose-headings:font-black prose-headings:text-gray-900 prose-headings:tracking-tight
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-li:text-gray-700
            prose-strong:text-gray-900
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-2xl prose-img:shadow-lg
            prose-blockquote:border-primary prose-blockquote:text-gray-600
            prose-hr:border-gray-200
            prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1 prose-code:rounded"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-100">
            <div className="flex items-center gap-2 flex-wrap">
              <TagIcon className="h-4 w-4 text-gray-400" />
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-semibold hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Prev / Next navigation */}
        {(prevPost || nextPost) && (
          <div className="mt-12 pt-8 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.id}`}
                className="flex items-start gap-3 p-5 rounded-2xl border border-gray-200 hover:border-primary/40 hover:shadow-md transition-all group"
              >
                <ArrowLeftIcon className="h-5 w-5 text-primary shrink-0 mt-0.5 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <div className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Previous</div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                    {prevPost.title}
                  </div>
                </div>
              </Link>
            ) : <div />}

            {nextPost ? (
              <Link
                href={`/blog/${nextPost.id}`}
                className="flex items-start gap-3 p-5 rounded-2xl border border-gray-200 hover:border-primary/40 hover:shadow-md transition-all group text-right sm:flex-row-reverse"
              >
                <ArrowRightIcon className="h-5 w-5 text-primary shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform" />
                <div>
                  <div className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Next</div>
                  <div className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                    {nextPost.title}
                  </div>
                </div>
              </Link>
            ) : <div />}
          </div>
        )}

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-black text-gray-900 mb-8">
              More Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.id}`}
                  className="group block rounded-2xl border border-gray-200 overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all"
                >
                  <div className="relative h-40 bg-gray-100">
                    {related.featured_image ? (
                      <Image
                        src={related.featured_image}
                        alt={related.title || ''}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-linear-to-br from-amber-50 to-primary/10 flex items-center justify-center">
                        <span className="text-4xl font-black text-primary/20">
                          {(related.title || 'B').charAt(0)}
                        </span>
                      </div>
                    )}
                    {related.category && (
                      <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                        {related.category}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-gray-400 font-semibold mb-2">
                      {formatDate(related.published_at || related.created_at)}
                    </p>
                    <h3 className="text-sm font-black text-gray-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {related.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 p-10 rounded-3xl bg-gray-900 text-center">
          <h3 className="text-2xl font-black text-white mb-3">
            Looking for your dream property?
          </h3>
          <p className="text-gray-400 mb-6">
            Our team of experts is ready to guide you through Dubai&apos;s real estate market.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-gray-900 font-bold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all"
          >
            Get in Touch
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </article>
    </div>
  )
}
