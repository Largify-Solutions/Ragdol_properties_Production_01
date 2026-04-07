'use client'

import { usePathname } from 'next/navigation'
import Header from '@/components/layouts/Header'
import Footer from '@/components/layouts/Footer'
import FloatingActionButtons from '@/components/shared/FloatingActionButtons'
import FloatingTools from '@/components/shared/FloatingTools'

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname()

  const isPortalRoute = (basePath: string) => {
    if (!pathname) return false
    return pathname === basePath || pathname.startsWith(`${basePath}/`)
  }

  const isAgentPortal = isPortalRoute('/agent')
  const isAdminPortal = isPortalRoute('/admin')
  const isCustomerPortal = isPortalRoute('/customer')

  const isPortal = isAgentPortal || isAdminPortal || isCustomerPortal

  return (
    <>
      {!isPortal && <Header />}
      <main className={`flex-2 ${!isPortal ? 'pt-20' : ''}`}>
        {children}
      </main>
      {!isPortal && <Footer />}
      {!isPortal && <FloatingActionButtons />}
      {!isPortal && <FloatingTools />}
    </>
  )
}