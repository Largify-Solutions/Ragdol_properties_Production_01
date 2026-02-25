'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'
import {
  LayoutDashboard, Building2, FolderOpen, Tag,
  UserCog, FileText, Handshake, Star,
  Users, MessageSquare, Calculator, Home,
  Settings, LogOut, Menu, X, ChevronRight,
} from 'lucide-react'

interface NavItem { name: string; href: string; icon: React.ReactNode }
interface NavSection { label: string; items: NavItem[] }

const sections: NavSection[] = [
  {
    label: 'Overview',
    items: [
      { name: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
    ],
  },
  {
    label: 'Listings',
    items: [
      { name: 'Properties', href: '/admin/properties', icon: <Building2 className="h-4 w-4" /> },
      { name: 'Projects', href: '/admin/projects', icon: <FolderOpen className="h-4 w-4" /> },
      { name: 'Agent Properties', href: '/admin/agentproperties', icon: <Home className="h-4 w-4" /> },
      { name: 'Categories', href: '/admin/category', icon: <Tag className="h-4 w-4" /> },
    ],
  },
  {
    label: 'People',
    items: [
      { name: 'Agents', href: '/admin/agents', icon: <UserCog className="h-4 w-4" /> },
      { name: 'Users', href: '/admin/users', icon: <Users className="h-4 w-4" /> },
      { name: 'Partners', href: '/admin/partners', icon: <Handshake className="h-4 w-4" /> },
    ],
  },
  {
    label: 'Content',
    items: [
      { name: 'Blogs', href: '/admin/blogs', icon: <FileText className="h-4 w-4" /> },
      { name: 'Testimonials', href: '/admin/testinomials', icon: <Star className="h-4 w-4" /> },
    ],
  },
  {
    label: 'Engagement',
    items: [
      { name: 'Enquiries', href: '/admin/questions', icon: <MessageSquare className="h-4 w-4" /> },
      { name: 'Valuations', href: '/admin/valuations', icon: <Calculator className="h-4 w-4" /> },
    ],
  },
  {
    label: 'System',
    items: [
      { name: 'Settings', href: '/admin/settings', icon: <Settings className="h-4 w-4" /> },
    ],
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { logout, profile, user } = useAuth()

  const isActive = (href: string) =>
    pathname === href || (href !== '/admin/dashboard' && pathname.startsWith(href))

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary text-primary-foreground shadow-lg"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-screen w-60 bg-card border-r border-border/60
          flex flex-col z-40 transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          shadow-xl lg:shadow-none
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border/60 flex-shrink-0">
          <Link href="/admin/dashboard" className="flex items-center gap-3 w-full">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-primary-foreground font-bold text-sm">R</span>
            </div>
            <div>
              <p className="font-bold text-sm text-foreground tracking-wide">RAGDOL</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Admin Portal</p>
            </div>
          </Link>
        </div>

        {/* Profile pill */}
        {profile && (
          <div className="mx-3 mt-3 flex items-center gap-2.5 bg-muted/50 rounded-lg px-3 py-2.5 flex-shrink-0">
            <div className="w-7 h-7 rounded-full bg-primary/15 ring-1 ring-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-primary">
                {(profile.full_name?.[0] || user?.email?.[0] || 'A').toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">{profile.full_name || 'Admin'}</p>
              <p className="text-[10px] text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
          {sections.map((section) => (
            <div key={section.label}>
              <p className="px-2 mb-1 text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-widest">
                {section.label}
              </p>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const active = isActive(item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`
                        group flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all duration-150
                        ${active
                          ? 'bg-primary text-primary-foreground font-medium shadow-sm'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }
                      `}
                    >
                      <span className={`flex-shrink-0 transition-colors ${active ? 'text-primary-foreground' : 'group-hover:text-foreground'}`}>
                        {item.icon}
                      </span>
                      <span className="flex-1 truncate">{item.name}</span>
                      {active && <ChevronRight className="h-3 w-3 opacity-50 flex-shrink-0" />}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Sign out */}
        <div className="border-t border-border/60 p-3 flex-shrink-0">
          <button
            onClick={logout}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all duration-150 group"
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  )
}

