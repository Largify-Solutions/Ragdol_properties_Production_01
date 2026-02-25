'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import AgentSidebar from '@/components/layouts/AgentSidebar'

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, profile, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || (profile?.role !== 'agent' && profile?.role !== 'admin'))) {
      router.push('/admin/login')
    }
  }, [user, profile, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user || (profile?.role !== 'agent' && profile?.role !== 'admin')) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AgentSidebar />
      <main className="flex-1 lg:ml-64">
        <div className="pt-20 lg:pt-0">
          {children}
        </div>
      </main>
    </div>
  )
}
