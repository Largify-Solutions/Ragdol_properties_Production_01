'use client'

import { useState, useEffect } from 'react'
import { 
  Search, Filter, MoreVertical, UserPlus, Mail, 
  Phone, Calendar, Shield, Trash2, Edit2, CheckCircle, XCircle, Eye, EyeOff,
  Loader2
} from 'lucide-react'
import { supabase } from '@/lib/supabase-browser'

interface User {
  id: string
  email: string
  full_name: string
  role: string
  created_at: string
  last_login?: string
  status: 'active' | 'inactive' | 'suspended'
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    role: 'customer',
    status: 'active' as 'active' | 'inactive' | 'suspended'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [passwordError, setPasswordError] = useState('')

  // Load users from Supabase
  const fetchUsers = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/users?limit=200')
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to load users')
      setUsers(
        (json.data || []).map((item: any) => ({
          ...item,
          status: item.status || 'active',
          role: item.role || 'customer',
        })) as User[]
      )
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  // Initial load
  useEffect(() => {
    fetchUsers()
  }, [])

  // CREATE or UPDATE USER
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setPasswordError('')

    // Basic validation
    if (!formData.email.trim() || !formData.full_name.trim()) {
      alert('Email and name are required')
      setIsSubmitting(false)
      return
    }

    if (!editingUser && formData.password.length < 6) {
      setPasswordError('Password must be at least 6 characters long')
      setIsSubmitting(false)
      return
    }

    try {
      // Check if email already exists
      const emailExists = users.some(user => 
        user.email.toLowerCase() === formData.email.trim().toLowerCase()
      )
      
      if (emailExists && !editingUser) {
        alert('Email already exists. Please use a different email.')
        setIsSubmitting(false)
        return
      }

      if (editingUser) {
        // UPDATE EXISTING USER (profile only, no auth change needed)
        const updateData = {
          full_name: formData.full_name.trim(),
          role: formData.role,
          updated_at: new Date().toISOString()
        }
        
        const { error } = await supabase.from('profiles').update(updateData).eq('id', editingUser.id)
        if (error) throw error
        
        // Update local state
        const updatedUser = {
          ...editingUser,
          ...updateData
        }
        
        setUsers(users.map(u => u.id === editingUser.id ? updatedUser : u))
        
        alert('User updated successfully!')
        
      } else {
        // CREATE NEW USER via Supabase Auth Admin API
        // This creates auth.users row → trigger creates profiles row automatically
        const response = await fetch('/api/admin/create-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email.trim(),
            password: formData.password,
            full_name: formData.full_name.trim(),
            role: formData.role,
          }),
        })

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || 'Failed to create user')
        }
        
        console.log('User created:', result.data)

        // Update local state
        const newUser = {
          id: result.data.id,
          email: result.data.email,
          full_name: result.data.full_name,
          role: result.data.role,
          created_at: new Date().toISOString(),
          status: 'active' as const,
        } as User

        setUsers([newUser, ...users])
        
        alert(result.message || 'User created successfully!')
      }
      
      // Reset and close
      setShowAddModal(false)
      resetForm()
      setShowPassword(false)
      
    } catch (error: any) {
      console.error('Error saving user:', error)
      
      let errorMessage = 'Error saving user. Please try again.'
      
      if (error.code === 'permission-denied') {
        errorMessage = 'Permission denied. Admin access required.'
      } else if (error.code === 'already-exists' || error.message?.includes('already')) {
        errorMessage = 'A user with this email already exists.'
      } else if (error.message) {
        errorMessage = error.message
      }
      
      alert(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  // DELETE USER FROM SUPABASE
  const handleDeleteUser = async (userId: string, userEmail: string) => {
    if (!confirm(`Are you sure you want to delete user: ${userEmail}? This action cannot be undone.`)) {
      return
    }

    try {
      // Delete via API (removes from auth.users, cascade deletes profile)
      const response = await fetch(`/api/admin/users?id=${userId}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        const result = await response.json()
        throw new Error(result.error || 'Failed to delete user')
      }
      
      // Update local state
      setUsers(users.filter(u => u.id !== userId))
      
      alert('User deleted successfully!')
      
    } catch (error: any) {
      console.error('Error deleting user:', error)
      alert('Error deleting user. Please try again.')
    }
  }

  // TOGGLE USER STATUS
  const handleToggleStatus = async (user: User) => {
    const newStatus: User['status'] = user.status === 'active' ? 'inactive' : 'active'
    
    try {
      // Update in Supabase
      const { error } = await supabase.from('profiles').update({
        status: newStatus,
        updated_at: new Date().toISOString()
      }).eq('id', user.id)
      if (error) throw error
      
      // Update local state
      const updatedUser: User = {
        ...user,
        status: newStatus
      }
      
      setUsers(users.map(u => u.id === user.id ? updatedUser : u))
      
      alert(`User ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully!`)
      
    } catch (error: any) {
      console.error('Error updating user status:', error)
      alert('Error updating user status. Please try again.')
    }
  }

  const resetForm = () => {
    setFormData({
      full_name: '',
      email: '',
      password: '',
      role: 'customer',
      status: 'active'
    })
    setPasswordError('')
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  // Statistics
  const totalUsers = users.length
  const activeUsers = users.filter(u => u.status === 'active').length
  const adminUsers = users.filter(u => u.role === 'admin').length

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Users</h1>
          <p className="text-muted-foreground text-sm mt-0.5">{users.length} registered users</p>
        </div>
        <button 
          onClick={() => { setEditingUser(null); resetForm(); setShowAddModal(true) }}
          className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <UserPlus className="h-4 w-4" />
          Add User
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded-xl border shadow-sm">
          <p className="text-2xl font-bold">{totalUsers}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Total Users</p>
        </div>
        <div className="bg-card p-4 rounded-xl border shadow-sm">
          <p className="text-2xl font-bold text-emerald-600">{activeUsers}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Active</p>
        </div>
        <div className="bg-card p-4 rounded-xl border shadow-sm">
          <p className="text-2xl font-bold text-violet-600">{adminUsers}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Admins</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-card p-4 rounded-xl border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search users by name or email..." 
            className="w-full pl-10 pr-4 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select 
            className="px-3 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="agent">Agent</option>
            <option value="customer">Customer</option>
          </select>
          <button 
            onClick={fetchUsers}
            className="inline-flex items-center px-3 py-2 rounded-md border bg-background hover:bg-accent transition-colors"
          >
            <Filter className="mr-2 h-4 w-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-muted-foreground font-medium">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Joined Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                [...Array(6)].map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="h-9 w-9 rounded-full bg-muted animate-pulse" /><div className="space-y-1.5"><div className="h-3 w-28 bg-muted animate-pulse rounded" /><div className="h-3 w-36 bg-muted animate-pulse rounded" /></div></div></td>
                    <td className="px-6 py-4"><div className="h-5 w-16 bg-muted animate-pulse rounded-full" /></td>
                    <td className="px-6 py-4"><div className="h-5 w-16 bg-muted animate-pulse rounded-full" /></td>
                    <td className="px-6 py-4"><div className="h-3 w-24 bg-muted animate-pulse rounded" /></td>
                    <td className="px-6 py-4 text-right"><div className="h-7 w-16 bg-muted animate-pulse rounded ml-auto" /></td>
                  </tr>
                ))
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">
                    No users found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                          {user.full_name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{user.full_name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                        user.role === 'agent' ? 'bg-blue-100 text-blue-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(user)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer ${
                          user.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-200' : 
                          user.status === 'suspended' ? 'bg-red-100 text-red-800 hover:bg-red-200' : 
                          'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        }`}
                        title="Click to toggle status"
                      >
                        {user.status === 'active' ? <CheckCircle className="mr-1 h-3 w-3" /> : <XCircle className="mr-1 h-3 w-3" />}
                        {user.status}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => {
                            setEditingUser(user)
                            setFormData({
                              full_name: user.full_name,
                              email: user.email,
                              password: '', // Don't show existing password
                              role: user.role,
                              status: user.status
                            })
                            setShowAddModal(true)
                          }}
                          className="p-2 hover:bg-muted rounded-md transition-colors text-muted-foreground hover:text-foreground"
                          title="Edit User"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user.id, user.email)}
                          className="p-2 hover:bg-red-50 rounded-md transition-colors text-muted-foreground hover:text-red-600"
                          title="Delete User"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl shadow-xl max-w-md w-full border">
            <div className="border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-base font-semibold">{editingUser ? 'Edit User' : 'Add User'}</h2>
              <button onClick={() => { setShowAddModal(false); setEditingUser(null); resetForm(); setShowPassword(false) }} className="text-muted-foreground hover:text-foreground">
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Full Name *</label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full px-3 py-2 text-sm border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 outline-none"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 outline-none"
                  required
                  disabled={isSubmitting || !!editingUser}
                />
                {editingUser && (
                  <p className="text-xs text-muted-foreground">Email cannot be changed for existing users.</p>
                )}
              </div>

              {!editingUser && (
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Password *</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => { setFormData({ ...formData, password: e.target.value }); setPasswordError('') }}
                      className="w-full px-3 py-2 text-sm border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 outline-none pr-10"
                      required
                      disabled={isSubmitting}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {passwordError && <p className="text-xs text-red-600">{passwordError}</p>}
                  <p className="text-xs text-muted-foreground">Minimum 6 characters</p>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Role *</label>
                <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 text-sm border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 outline-none"
                  required disabled={isSubmitting}>
                  <option value="customer">Customer</option>
                  <option value="agent">Agent</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Status *</label>
                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 text-sm border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 outline-none"
                  required disabled={isSubmitting}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t">
                <button type="button"
                  onClick={() => { setShowAddModal(false); setEditingUser(null); resetForm(); setShowPassword(false) }}
                  className="px-4 py-2 text-sm border rounded-lg hover:bg-muted transition-colors disabled:opacity-50"
                  disabled={isSubmitting}>
                  Cancel
                </button>
                <button type="submit"
                  className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                  disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />{editingUser ? 'Updating...' : 'Creating...'}</span>
                  ) : (editingUser ? 'Update User' : 'Create User')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


