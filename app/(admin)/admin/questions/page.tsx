'use client'

import { useState, useEffect } from 'react'
import { 
  MessageSquare, Search, Filter, CheckCircle, 
  Clock, AlertCircle, Reply, Trash2,
  Send, X
} from 'lucide-react'
import { supabase } from '@/lib/supabase-browser'

interface CustomerQuestion {
  id: string
  user_id: string | null
  admin_id: string | null
  subject: string
  message: string
  category: string
  status: 'pending' | 'answered' | 'closed'
  admin_response: string | null
  admin_response_at: string | null
  created_at: string
  updated_at: string | null
  // Joined from profiles
  user_email?: string
  user_name?: string
}

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<CustomerQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyMessage, setReplyMessage] = useState('')
  const [sendingReply, setSendingReply] = useState(false)

  // Fetch all customer questions from Supabase
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/admin/questions?limit=500')
        const json = await res.json()
        if (!res.ok) throw new Error(json.error || 'Failed to load questions')
        const questionsData: CustomerQuestion[] = (json.data || []).map((item: any) => ({
          id: item.id,
          user_id: item.user_id,
          admin_id: item.admin_id,
          subject: item.subject || 'No Subject',
          message: item.message || '',
          category: item.category || 'general',
          status: item.status || 'pending',
          admin_response: item.admin_response,
          admin_response_at: item.admin_response_at,
          created_at: item.created_at || new Date().toISOString(),
          updated_at: item.updated_at,
          user_email: item.profiles?.email || 'Unknown',
          user_name: item.profiles?.full_name || 'Customer',
        }))
        setQuestions(questionsData)
      } catch (err) {
        console.error('Error fetching questions:', err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchQuestions()
  }, [])

  const filteredQuestions = questions.filter(q => {
    if (statusFilter !== 'all' && q.status !== statusFilter) return false
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      return (
        q.subject.toLowerCase().includes(term) ||
        q.message.toLowerCase().includes(term) ||
        q.category.toLowerCase().includes(term) ||
        (q.user_name?.toLowerCase().includes(term) || false) ||
        (q.user_email?.toLowerCase().includes(term) || false)
      )
    }
    return true
  })

  const handleSendReply = async (questionId: string) => {
    if (!replyMessage.trim()) {
      alert('Please enter a reply message')
      return
    }

    setSendingReply(true)
    
    try {
      // Update the customer_question with the admin response
      const { error } = await supabase
        .from('customer_questions')
        .update({
          admin_response: replyMessage,
          admin_response_at: new Date().toISOString(),
          status: 'answered' as any,
        })
        .eq('id', questionId)

      if (error) throw error

      // Update local state
      setQuestions(prev => prev.map(q => 
        q.id === questionId 
          ? { ...q, admin_response: replyMessage, admin_response_at: new Date().toISOString(), status: 'answered' as const }
          : q
      ))

      setReplyMessage('')
      setReplyingTo(null)
      alert('Reply sent successfully!')
    } catch (err) {
      console.error('Error sending reply:', err)
      alert('Failed to send reply. Please try again.')
    } finally {
      setSendingReply(false)
    }
  }

  const handleDelete = async (questionId: string) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return
    try {
      const { error } = await supabase
        .from('customer_questions')
        .delete()
        .eq('id', questionId)
      if (error) throw error
      setQuestions(prev => prev.filter(q => q.id !== questionId))
    } catch (err) {
      console.error('Error deleting question:', err)
      alert('Failed to delete question.')
    }
  }

  const handleClose = async (questionId: string) => {
    try {
      const { error } = await supabase
        .from('customer_questions')
        .update({ status: 'closed' as any })
        .eq('id', questionId)
      if (error) throw error
      setQuestions(prev => prev.map(q => 
        q.id === questionId ? { ...q, status: 'closed' as const } : q
      ))
    } catch (err) {
      console.error('Error closing question:', err)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'answered':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'closed':
        return <AlertCircle className="h-4 w-4 text-gray-500" />
      default:
        return <MessageSquare className="h-4 w-4 text-blue-500" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Enquiries</h1>
          <p className="text-muted-foreground">Manage and respond to customer questions</p>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-xl border shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Questions</p>
            <p className="text-2xl font-bold">{questions.length}</p>
          </div>
        </div>
        <div className="bg-card p-4 rounded-xl border shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold">{questions.filter(q => q.status === 'pending').length}</p>
          </div>
        </div>
        <div className="bg-card p-4 rounded-xl border shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-full bg-green-100 text-green-600">
            <CheckCircle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Answered</p>
            <p className="text-2xl font-bold">{questions.filter(q => q.status === 'answered').length}</p>
          </div>
        </div>
        <div className="bg-card p-4 rounded-xl border shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-full bg-gray-100 text-gray-600">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Closed</p>
            <p className="text-2xl font-bold">{questions.filter(q => q.status === 'closed').length}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-card p-4 rounded-xl border shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search by subject, message, category, or user..." 
            className="w-full pl-10 pr-4 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="px-3 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="answered">Answered</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12 bg-card rounded-xl border">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading questions...</p>
          </div>
        ) : filteredQuestions.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-xl border">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No questions found.</p>
          </div>
        ) : (
          filteredQuestions.map((q) => (
            <div key={q.id} className="bg-card p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary mt-1">
                    {(q.user_name || 'C').charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{q.user_name || 'Customer'}</h3>
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full capitalize">
                        {q.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {q.user_email} &bull; {formatDate(q.created_at)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                    q.status === 'answered' ? 'bg-green-100 text-green-800' : 
                    q.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {getStatusIcon(q.status)}
                    {q.status}
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">{q.subject}</h4>
                <div className="bg-gray-50 p-3 rounded-lg border">
                  <p className="text-sm text-foreground leading-relaxed">
                    {q.message}
                  </p>
                </div>
              </div>

              {/* Existing Admin Response */}
              {q.admin_response && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Admin Response</h4>
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-900">{q.admin_response}</p>
                    {q.admin_response_at && (
                      <p className="text-xs text-blue-600 mt-1">
                        Replied {formatDate(q.admin_response_at)}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Reply Section */}
              {replyingTo === q.id ? (
                <div className="mb-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium text-gray-700">
                      {q.admin_response ? 'Update Response' : 'Send Response'}
                    </h4>
                    <button
                      onClick={() => {
                        setReplyingTo(null)
                        setReplyMessage('')
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Type your response here..."
                    rows={3}
                    className="w-full px-3 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setReplyingTo(null)
                        setReplyMessage('')
                      }}
                      className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSendReply(q.id)}
                      disabled={sendingReply || !replyMessage.trim()}
                      className="inline-flex items-center px-4 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {sendingReply ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Response
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-end gap-2 pt-4 border-t">
                  <button 
                    className="p-2 hover:bg-red-50 rounded-md transition-colors text-muted-foreground hover:text-red-600"
                    onClick={() => handleDelete(q.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  {q.status !== 'closed' && (
                    <button
                      className="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      onClick={() => handleClose(q.id)}
                    >
                      Close
                    </button>
                  )}
                  <button 
                    className="inline-flex items-center px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                    onClick={() => {
                      setReplyingTo(q.id)
                      setReplyMessage(q.admin_response || '')
                    }}
                  >
                    <Reply className="mr-2 h-4 w-4" />
                    {q.admin_response ? 'Update Response' : 'Reply'}
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}