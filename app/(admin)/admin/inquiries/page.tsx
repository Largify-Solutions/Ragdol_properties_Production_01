'use client'

import { useState, useEffect } from 'react'
import {
  MessageSquare, Search, Trash2, Eye,
  CheckCircle, Clock, Mail, Phone, User
} from 'lucide-react'

interface Inquiry {
  id: string
  client_name: string
  client_email: string
  client_phone: string | null
  message: string
  status: string
  agent_reply: string | null
  replied_at: string | null
  created_at: string
}

const STATUS_STYLES: Record<string, string> = {
  new:       'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  resolved:  'bg-green-100 text-green-700',
  closed:    'bg-slate-100 text-slate-500',
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selected, setSelected] = useState<Inquiry | null>(null)
  const [replyText, setReplyText] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => { fetchInquiries() }, [])

  const fetchInquiries = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/inquiries?limit=500')
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to load')
      setInquiries(json.data || [])
    } catch (err) {
      console.error('Error fetching inquiries:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      if (!res.ok) throw new Error('Failed to update')
      setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i))
      if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null)
    } catch (err) {
      console.error('Error updating status:', err)
    }
  }

  const sendReply = async () => {
    if (!selected || !replyText.trim()) return
    setSaving(true)
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selected.id,
          agent_reply: replyText.trim(),
          replied_at: new Date().toISOString(),
          status: 'contacted',
        }),
      })
      if (!res.ok) throw new Error('Failed to save reply')
      await fetchInquiries()
      setReplyText('')
      setSelected(null)
    } catch (err) {
      console.error('Error saving reply:', err)
    } finally {
      setSaving(false)
    }
  }

  const deleteInquiry = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      setInquiries(prev => prev.filter(i => i.id !== id))
      if (selected?.id === id) setSelected(null)
    } catch (err) {
      console.error('Error deleting:', err)
    }
  }

  const filtered = inquiries.filter(i => {
    if (statusFilter !== 'all' && i.status !== statusFilter) return false
    if (searchTerm) {
      const t = searchTerm.toLowerCase()
      return (
        i.client_name.toLowerCase().includes(t) ||
        i.client_email.toLowerCase().includes(t) ||
        i.message.toLowerCase().includes(t)
      )
    }
    return true
  })

  const counts = {
    all: inquiries.length,
    new: inquiries.filter(i => i.status === 'new').length,
    contacted: inquiries.filter(i => i.status === 'contacted').length,
    resolved: inquiries.filter(i => i.status === 'resolved').length,
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <MessageSquare className="w-7 h-7 text-[#c5a059]" />
          <h1 className="text-2xl font-bold text-slate-900">Contact Inquiries</h1>
        </div>
        <p className="text-slate-500 text-sm">Messages submitted via the contact page</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total', value: counts.all, color: 'text-slate-700' },
          { label: 'New', value: counts.new, color: 'text-blue-600' },
          { label: 'Contacted', value: counts.contacted, color: 'text-yellow-600' },
          { label: 'Resolved', value: counts.resolved, color: 'text-green-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <p className="text-xs text-slate-500 font-medium uppercase">{s.label}</p>
            <p className={`text-3xl font-black mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex-1 min-w-48 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, message..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40"
          />
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40"
        >
          <option value="all">All Status ({counts.all})</option>
          <option value="new">New ({counts.new})</option>
          <option value="contacted">Contacted ({counts.contacted})</option>
          <option value="resolved">Resolved ({counts.resolved})</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-16 text-center text-slate-400">Loading inquiries...</div>
        ) : filtered.length === 0 ? (
          <div className="p-16 text-center text-slate-400">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No inquiries found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Client</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Message</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Date</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(inquiry => (
                  <tr key={inquiry.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#c5a059]/10 rounded-full flex items-center justify-center shrink-0">
                          <User className="w-4 h-4 text-[#c5a059]" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{inquiry.client_name}</p>
                          <p className="text-xs text-slate-500 flex items-center gap-1">
                            <Mail className="w-3 h-3" />{inquiry.client_email}
                          </p>
                          {inquiry.client_phone && (
                            <p className="text-xs text-slate-500 flex items-center gap-1">
                              <Phone className="w-3 h-3" />{inquiry.client_phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 max-w-xs">
                      <p className="text-slate-700 line-clamp-2">{inquiry.message}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[inquiry.status] || 'bg-slate-100 text-slate-500'}`}>
                        {inquiry.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                      {new Date(inquiry.created_at).toLocaleDateString('en-GB', {
                        day: '2-digit', month: 'short', year: 'numeric'
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => { setSelected(inquiry); setReplyText(inquiry.agent_reply || '') }}
                          className="p-1.5 text-slate-500 hover:text-[#c5a059] hover:bg-[#c5a059]/10 rounded-lg transition-colors"
                          title="View / Reply"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {inquiry.status === 'new' && (
                          <button
                            onClick={() => updateStatus(inquiry.id, 'contacted')}
                            className="p-1.5 text-slate-500 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                            title="Mark Contacted"
                          >
                            <Clock className="w-4 h-4" />
                          </button>
                        )}
                        {inquiry.status !== 'resolved' && (
                          <button
                            onClick={() => updateStatus(inquiry.id, 'resolved')}
                            className="p-1.5 text-slate-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Mark Resolved"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteInquiry(inquiry.id)}
                          className="p-1.5 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail / Reply Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-linear-to-r from-[#c5a059] to-[#996515] p-6 text-white">
              <h3 className="text-xl font-bold">{selected.client_name}</h3>
              <p className="text-white/80 text-sm">{selected.client_email}</p>
              {selected.client_phone && (
                <p className="text-white/80 text-sm">{selected.client_phone}</p>
              )}
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Message</p>
                <p className="text-slate-700 bg-slate-50 rounded-xl p-3 text-sm">{selected.message}</p>
              </div>
              {selected.agent_reply && (
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Previous Reply</p>
                  <p className="text-slate-700 bg-yellow-50 rounded-xl p-3 text-sm">{selected.agent_reply}</p>
                </div>
              )}
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Reply / Notes</p>
                <textarea
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  rows={3}
                  placeholder="Add your reply or internal note..."
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setSelected(null)}
                  className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={sendReply}
                  disabled={saving || !replyText.trim()}
                  className="flex-1 px-4 py-2.5 bg-[#c5a059] text-white rounded-xl text-sm font-semibold hover:bg-[#996515] transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save & Mark Contacted'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
