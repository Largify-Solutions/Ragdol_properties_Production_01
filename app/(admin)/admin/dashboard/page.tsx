'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase-browser'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts'
import {
  Building2, Users, MessageSquare, Briefcase,
  ArrowUpRight, Plus, RefreshCw, Star, CheckCircle2,
} from 'lucide-react'

const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6366f1', '#ef4444', '#8b5cf6']
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

interface Stats {
  totalProperties: number; publishedProperties: number
  totalAgents: number; approvedAgents: number
  totalEnquiries: number; newEnquiries: number
  totalProjects: number; totalValuations: number; pendingValuations: number
}

interface RecentEnquiry {
  id: string; name: string; email: string; status: string
  created_at: string; property_title: string | null
}

interface TopAgent {
  id: string; full_name: string; rating: number
  review_count: number; total_sales: number; approved: boolean
}

interface PropertyTypeStat { name: string; value: number }
interface MonthlyEnquiry { month: string; enquiries: number }

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProperties: 0, publishedProperties: 0,
    totalAgents: 0, approvedAgents: 0,
    totalEnquiries: 0, newEnquiries: 0,
    totalProjects: 0, totalValuations: 0, pendingValuations: 0,
  })
  const [recentEnquiries, setRecentEnquiries] = useState<RecentEnquiry[]>([])
  const [topAgents, setTopAgents] = useState<TopAgent[]>([])
  const [propertyTypes, setPropertyTypes] = useState<PropertyTypeStat[]>([])
  const [monthlyEnquiries, setMonthlyEnquiries] = useState<MonthlyEnquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState(new Date())

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [propertiesRes, agentsRes, enquiriesRes, projectsRes, valuationsRes, enquiriesRecentRes, agentsTopRes] =
        await Promise.all([
          supabase.from('properties').select('id, type, published'),
          supabase.from('agents').select('id, approved'),
          supabase.from('enquiries').select('id, status, created_at'),
          supabase.from('projects').select('id').eq('published', true),
          supabase.from('property_valuations').select('id, status'),
          supabase.from('enquiries')
            .select('id, name, email, status, created_at, properties!enquiries_property_id_fkey(title)')
            .order('created_at', { ascending: false }).limit(8),
          supabase.from('agents')
            .select('id, rating, review_count, total_sales, approved, profiles!agents_user_id_fkey(full_name)')
            .order('total_sales', { ascending: false }).limit(5),
        ])

      const properties = propertiesRes.data || []
      const agents = agentsRes.data || []
      const enquiries = enquiriesRes.data || []

      setStats({
        totalProperties: properties.length,
        publishedProperties: properties.filter((p: any) => p.published).length,
        totalAgents: agents.length,
        approvedAgents: agents.filter((a: any) => a.approved).length,
        totalEnquiries: enquiries.length,
        newEnquiries: enquiries.filter((e: any) => e.status === 'new').length,
        totalProjects: projectsRes.data?.length || 0,
        totalValuations: valuationsRes.data?.length || 0,
        pendingValuations: (valuationsRes.data || []).filter((v: any) => v.status === 'pending').length,
      })

      // Property type breakdown
      const typeCounts: Record<string, number> = {}
      properties.forEach((p: any) => {
        const t = p.type || 'other'
        typeCounts[t] = (typeCounts[t] || 0) + 1
      })
      setPropertyTypes(
        Object.entries(typeCounts)
          .map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }))
          .sort((a, b) => b.value - a.value).slice(0, 6)
      )

      // Monthly enquiries (last 6 months)
      const now = new Date()
      const months: any[] = Array.from({ length: 6 }, (_, i) => {
        const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1)
        return { month: MONTHS[d.getMonth()], enquiries: 0, _y: d.getFullYear(), _m: d.getMonth() }
      })
      enquiries.forEach((e: any) => {
        const d = new Date(e.created_at)
        const idx = months.findIndex((m) => m._y === d.getFullYear() && m._m === d.getMonth())
        if (idx !== -1) months[idx].enquiries++
      })
      setMonthlyEnquiries(months.map(({ month, enquiries }) => ({ month, enquiries })))

      setRecentEnquiries(
        (enquiriesRecentRes.data || []).map((e: any) => ({
          id: e.id, name: e.name, email: e.email,
          status: e.status, created_at: e.created_at,
          property_title: (e.properties as any)?.title || null,
        }))
      )

      setTopAgents(
        (agentsTopRes.data || []).map((a: any) => ({
          id: a.id, full_name: (a.profiles as any)?.full_name || 'Agent',
          rating: a.rating || 0, review_count: a.review_count || 0,
          total_sales: a.total_sales || 0, approved: a.approved,
        }))
      )
    } catch (err) {
      console.error('Dashboard fetch error:', err)
    } finally {
      setLoading(false)
      setLastRefresh(new Date())
    }
  }

  useEffect(() => { fetchAll() }, [])

  const statusColor = (s: string) =>
    ({ new: 'bg-blue-100 text-blue-700', contacted: 'bg-yellow-100 text-yellow-700',
       qualified: 'bg-purple-100 text-purple-700', closed: 'bg-green-100 text-green-700',
       lost: 'bg-red-100 text-red-700' } as Record<string, string>)[s] || 'bg-gray-100 text-gray-700'

  if (loading && stats.totalProperties === 0) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-6 w-32 bg-muted animate-pulse rounded" />
            <div className="h-4 w-48 bg-muted animate-pulse rounded" />
          </div>
          <div className="h-9 w-28 bg-muted animate-pulse rounded-md" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-card rounded-xl border p-5 space-y-3">
              <div className="flex justify-between"><div className="h-9 w-9 bg-muted animate-pulse rounded-lg" /><div className="h-4 w-4 bg-muted animate-pulse rounded" /></div>
              <div className="h-3 w-16 bg-muted animate-pulse rounded" />
              <div className="h-7 w-12 bg-muted animate-pulse rounded" />
              <div className="h-3 w-20 bg-muted animate-pulse rounded" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card rounded-xl border p-6">
            <div className="h-4 w-40 bg-muted animate-pulse rounded mb-6" />
            <div className="h-[240px] bg-muted/40 animate-pulse rounded-lg" />
          </div>
          <div className="bg-card rounded-xl border p-6">
            <div className="h-4 w-28 bg-muted animate-pulse rounded mb-6" />
            <div className="h-[200px] bg-muted/40 animate-pulse rounded-lg" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 bg-card rounded-xl border">
            <div className="px-6 py-4 border-b"><div className="h-4 w-32 bg-muted animate-pulse rounded" /></div>
            <div className="divide-y">{[...Array(5)].map((_, i) => <div key={i} className="px-6 py-3.5 flex gap-4"><div className="h-4 w-28 bg-muted animate-pulse rounded" /><div className="h-4 w-32 bg-muted animate-pulse rounded" /><div className="h-5 w-16 bg-muted animate-pulse rounded-full" /></div>)}</div>
          </div>
          <div className="lg:col-span-2 bg-card rounded-xl border p-6 space-y-4">
            <div className="h-4 w-24 bg-muted animate-pulse rounded" />
            {[...Array(4)].map((_, i) => <div key={i} className="flex items-center gap-3"><div className="h-9 w-9 bg-muted animate-pulse rounded-full" /><div className="flex-1 space-y-1.5"><div className="h-3 w-24 bg-muted animate-pulse rounded" /><div className="h-3 w-16 bg-muted animate-pulse rounded" /></div><div className="h-4 w-16 bg-muted animate-pulse rounded" /></div>)}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Live data &middot; refreshed {lastRefresh.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchAll} disabled={loading}
            className="inline-flex items-center gap-2 text-sm border border-input bg-background hover:bg-muted rounded-md px-3 py-2 transition-colors disabled:opacity-50">
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <Link href="/admin/properties"
            className="inline-flex items-center gap-2 text-sm bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-3 py-2 transition-colors">
            <Plus className="h-4 w-4" /> Add Property
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Properties" value={stats.totalProperties} sub={`${stats.publishedProperties} published`}
          icon={<Building2 className="h-5 w-5 text-blue-500" />} href="/admin/properties" accentClass="bg-blue-50 dark:bg-blue-500/10" />
        <StatCard label="Agents" value={stats.totalAgents} sub={`${stats.approvedAgents} approved`}
          icon={<Users className="h-5 w-5 text-emerald-500" />} href="/admin/agents" accentClass="bg-emerald-50 dark:bg-emerald-500/10" />
        <StatCard label="Enquiries" value={stats.totalEnquiries} sub={`${stats.newEnquiries} new`}
          icon={<MessageSquare className="h-5 w-5 text-violet-500" />} href="/admin/questions" accentClass="bg-violet-50 dark:bg-violet-500/10" />
        <StatCard label="Projects" value={stats.totalProjects} sub="published"
          icon={<Briefcase className="h-5 w-5 text-orange-500" />} href="/admin/projects" accentClass="bg-orange-50 dark:bg-orange-500/10" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-xl border shadow-sm p-6">
          <div className="mb-5">
            <h3 className="font-semibold text-base">Enquiries — Last 6 Months</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{stats.totalEnquiries} total</p>
          </div>
          {loading ? (
            <div className="h-[240px] bg-muted/30 animate-pulse rounded-lg" />
          ) : (
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyEnquiries}>
                  <defs>
                    <linearGradient id="eg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={8} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} allowDecimals={false} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                    formatter={(v: number) => [v, 'Enquiries']} />
                  <Area type="monotone" dataKey="enquiries" stroke="#3b82f6" strokeWidth={2} fill="url(#eg)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        <div className="bg-card rounded-xl border shadow-sm p-6">
          <h3 className="font-semibold text-base mb-1">Property Types</h3>
          <p className="text-xs text-muted-foreground mb-4">{stats.totalProperties} total</p>
          {loading ? (
            <div className="h-[200px] bg-muted/30 animate-pulse rounded-lg" />
          ) : propertyTypes.length === 0 ? (
            <div className="h-[200px] flex items-center justify-center text-sm text-muted-foreground">No data yet</div>
          ) : (
            <>
              <div className="h-[170px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={propertyTypes as any[]} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                      {propertyTypes.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => [v, 'Properties']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 space-y-1.5">
                {propertyTypes.map((item, i) => (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Recent Enquiries */}
        <div className="lg:col-span-3 bg-card rounded-xl border shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <h3 className="font-semibold text-base">Recent Enquiries</h3>
            <Link href="/admin/questions" className="text-sm text-primary hover:underline flex items-center gap-1">
              View all <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {loading ? (
            <div className="divide-y">{[...Array(5)].map((_, i) => <div key={i} className="px-5 py-3.5 flex gap-6"><div className="space-y-1.5"><div className="h-3 w-24 bg-muted animate-pulse rounded" /><div className="h-3 w-28 bg-muted animate-pulse rounded" /></div><div className="h-3 w-28 bg-muted animate-pulse rounded mt-1" /><div className="h-5 w-16 bg-muted animate-pulse rounded-full" /></div>)}</div>
          ) : recentEnquiries.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">No enquiries yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/40 text-muted-foreground text-xs uppercase tracking-wide">
                  <tr>
                    <th className="px-5 py-3">Client</th>
                    <th className="px-5 py-3">Property</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {recentEnquiries.map((e) => (
                    <tr key={e.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3">
                        <p className="font-medium truncate max-w-[130px]">{e.name}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[130px]">{e.email}</p>
                      </td>
                      <td className="px-5 py-3 text-muted-foreground text-xs max-w-[140px] truncate">
                        {e.property_title ?? <span className="italic">—</span>}
                      </td>
                      <td className="px-5 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${statusColor(e.status)}`}>
                          {e.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-muted-foreground text-xs whitespace-nowrap">
                        {new Date(e.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Top Agents */}
        <div className="lg:col-span-2 bg-card rounded-xl border shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-base">Top Agents</h3>
            <Link href="/admin/agents" className="text-sm text-primary hover:underline flex items-center gap-1">
              View all <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {loading ? (
            <div className="space-y-4">{[...Array(4)].map((_, i) => <div key={i} className="flex items-center gap-3"><div className="h-9 w-9 bg-muted animate-pulse rounded-full flex-shrink-0" /><div className="flex-1 space-y-1.5"><div className="h-3 w-24 bg-muted animate-pulse rounded" /><div className="h-3 w-16 bg-muted animate-pulse rounded" /></div><div className="h-4 w-16 bg-muted animate-pulse rounded" /></div>)}</div>
          ) : topAgents.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">No agents yet</div>
          ) : (
            <div className="space-y-5">
              {topAgents.map((agent) => (
                <div key={agent.id} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm flex-shrink-0">
                    {agent.full_name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="font-medium text-sm truncate">{agent.full_name}</p>
                      {agent.approved && <CheckCircle2 className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      <span>{agent.rating > 0 ? agent.rating.toFixed(1) : '—'}</span>
                      {agent.review_count > 0 && <span>({agent.review_count})</span>}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-primary">
                      {agent.total_sales > 0 ? `AED ${(agent.total_sales / 1_000_000).toFixed(1)}M` : '—'}
                    </p>
                    <p className="text-xs text-muted-foreground">sales</p>
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

function StatCard({ label, value, sub, icon, href, accentClass }: {
  label: string; value: number; sub: string; icon: React.ReactNode; href: string; accentClass?: string
}) {
  return (
    <Link href={href} className="bg-card rounded-xl border shadow-sm p-5 hover:shadow-md transition-all duration-150 block group">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2.5 rounded-lg ${accentClass || 'bg-muted'}`}>{icon}</div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</p>
      <h4 className="text-2xl font-bold mt-1">{value.toLocaleString()}</h4>
      <p className="text-xs text-muted-foreground mt-1">{sub}</p>
    </Link>
  )
}
