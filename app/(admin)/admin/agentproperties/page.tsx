'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface AgentProperty {
  id: string
  title: string
  description: string | null
  price: number | null
  status: string | null
  published: boolean | null
  featured: boolean | null
  type: string | null
  beds: number | null
  bathrooms: number | null
  sqft: number | null
  city: string | null
  area: string | null
  address: string | null
  features: string[] | null
  amenities: string[] | null
  images: string[] | null
  agent_id: string
  views_count: number | null
  created_at: string | null
  updated_at: string | null
  submitted_at: string | null
}

interface Agent {
  id: string
  title: string
  brokerage: string
  phone?: string
  email?: string
}

export default function AdminAgentProperties() {
  const [properties, setProperties] = useState<AgentProperty[]>([])
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAgent, setSelectedAgent] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [updating, setUpdating] = useState<string | null>(null)
  const router = useRouter()

  const fetchAgentProperties = async () => {
    setLoading(true)
    try {
      // Fetch agent properties via admin API
      const propRes = await fetch('/api/admin/agent-properties?limit=500')
      const propJson = await propRes.json()
      if (!propRes.ok) throw new Error(propJson.error || 'Failed to load properties')
      const propertiesData = (propJson.agent_properties || []) as AgentProperty[]
      setProperties(propertiesData)

      // Fetch agents list via admin API
      const agentRes = await fetch('/api/admin/agents?limit=500')
      const agentJson = await agentRes.json()
      if (!agentRes.ok) throw new Error(agentJson.error || 'Failed to load agents')
      const agentsData = (agentJson.agents || []) as Agent[]
      setAgents(agentsData)

    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAgentProperties()
    
    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchAgentProperties, 60000)
    
    return () => clearInterval(interval)
  }, [])

  const updatePropertyStatus = async (propertyId: string, published: boolean) => {
    const action = published ? 'publish' : 'unpublish'
    if (!confirm(`Are you sure you want to ${action} this property?`)) return
    
    setUpdating(propertyId)
    try {
      const res = await fetch('/api/admin/agent-properties', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: propertyId,
          published,
          updated_at: new Date().toISOString()
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to update property')

      setProperties(prev => prev.map(prop => 
        prop.id === propertyId 
          ? { ...prop, published, updated_at: new Date().toISOString() }
          : prop
      ))
      
      alert(`Property ${action}ed successfully!`)
    } catch (error) {
      console.error('Error updating property:', error)
      alert('Error updating property status')
    } finally {
      setUpdating(null)
    }
  }

  const toggleFeatured = async (propertyId: string, featured: boolean) => {
    setUpdating(propertyId)
    try {
      const res = await fetch('/api/admin/agent-properties', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: propertyId,
          featured,
          updated_at: new Date().toISOString()
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to update property')

      setProperties(prev => prev.map(prop => 
        prop.id === propertyId 
          ? { ...prop, featured, updated_at: new Date().toISOString() }
          : prop
      ))
    } catch (error) {
      console.error('Error updating property:', error)
    } finally {
      setUpdating(null)
    }
  }

  const updateSaleStatus = async (propertyId: string, status: 'sale' | 'rent' | 'sold' | 'rented') => {
    if (!confirm(`Change property status to ${status}?`)) return
    
    setUpdating(propertyId)
    try {
      const res = await fetch('/api/admin/agent-properties', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: propertyId,
          status: status,
          updated_at: new Date().toISOString()
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to update property')

      // Update local state
      setProperties(prev => prev.map(prop => 
        prop.id === propertyId 
          ? { 
              ...prop, 
              status: status,
              updated_at: new Date().toISOString()
            }
          : prop
      ))
      
      alert(`Property status updated to ${status}!`)
    } catch (error) {
      console.error('Error updating property:', error)
      alert('Error updating property status')
    } finally {
      setUpdating(null)
    }
  }

  // Filter properties
  const filteredProperties = properties.filter(property => {
    if (selectedAgent !== 'all' && property.agent_id !== selectedAgent) return false
    
    if (selectedStatus !== 'all') {
      if (selectedStatus === 'published' && !property.published) return false
      if (selectedStatus === 'unpublished' && property.published) return false
      if (selectedStatus === 'featured' && !property.featured) return false
    }
    
    if (searchTerm && !property.title?.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !(property.city || '').toLowerCase().includes(searchTerm.toLowerCase()) &&
        !(property.area || '').toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }
    
    return true
  })

  // Stats
  const stats = {
    total: properties.length,
    published: properties.filter(p => p.published).length,
    unpublished: properties.filter(p => !p.published).length,
    featured: properties.filter(p => p.featured).length,
  }

  const getSaleStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'sale': 'bg-purple-100 text-purple-800',
      'rent': 'bg-indigo-100 text-indigo-800',
      'sold': 'bg-green-100 text-green-800',
      'rented': 'bg-teal-100 text-teal-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading agent properties...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Agent Properties Management</h1>
            <p className="text-gray-600 mt-2">Review and manage properties submitted by agents</p>
          </div>
          <button
            onClick={fetchAgentProperties}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Total Properties</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <p className="text-sm text-gray-500">Published</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.published}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
            <p className="text-sm text-gray-500">Unpublished</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.unpublished}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
            <p className="text-sm text-gray-500">Featured</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.featured}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow mb-8">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Properties</label>
              <input
                type="text"
                placeholder="Search by title, agent, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Filter by Agent */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Agent</label>
              <select
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Agents</option>
                {agents.map(agent => (
                  <option key={agent.id} value={agent.id}>
                    {agent.title} ({agent.brokerage})
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="unpublished">Unpublished</option>
                <option value="featured">Featured</option>
              </select>
            </div>

            {/* Actions */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSelectedAgent('all')
                  setSelectedStatus('all')
                  setSearchTerm('')
                }}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Agent Properties ({filteredProperties.length})
          </h2>
          <p className="text-sm text-gray-500">Manage and review agent-submitted properties</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Published
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProperties.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="text-gray-400 text-4xl mb-4">🏠</div>
                    <p className="text-gray-500">No properties found</p>
                    {searchTerm || selectedAgent !== 'all' || selectedStatus !== 'all' ? (
                      <p className="text-sm text-gray-400 mt-1">Try adjusting your filters</p>
                    ) : null}
                  </td>
                </tr>
              ) : (
                filteredProperties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50">
                    {/* Property Details */}
                    <td className="px-6 py-4">
                      <div className="flex items-start space-x-4">
                        {property.images && property.images.length > 0 ? (
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-16 h-16 object-cover rounded-lg"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100x100?text=Property'
                            }}
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-400">🏠</span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {property.title}
                          </h3>
                          <p className="text-sm text-gray-500 truncate">
                            {property.type || 'Property'} • {property.beds || 0} Beds • {property.bathrooms || 0} Baths
                          </p>
                          <p className="text-xs text-gray-400 truncate mt-1">
                            {property.address || `${property.area || ''}, ${property.city || ''}`}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Submitted: {property.submitted_at ? new Date(property.submitted_at).toLocaleDateString() : 'N/A'}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Agent Info */}
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">
                          {agents.find(a => a.id === property.agent_id)?.title || 'Unknown Agent'}
                        </p>
                        <p className="text-gray-500 text-xs">ID: {property.agent_id.substring(0, 8)}...</p>
                        <p className="text-gray-400 text-xs mt-1">
                          {agents.find(a => a.id === property.agent_id)?.brokerage || 'Unknown Brokerage'}
                        </p>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <p className="font-bold text-gray-900">
                          AED {(property.price || 0).toLocaleString()}
                        </p>
                        <span className={`inline-flex text-xs px-2 py-1 rounded-full mt-1 ${getSaleStatusColor(property.status || '')}`}>
                          {(property.status || 'N/A').toUpperCase()}
                        </span>
                      </div>
                    </td>

                    {/* Sale Status */}
                    <td className="px-6 py-4">
                      <select
                        value={property.status || 'sale'}
                        onChange={(e) => updateSaleStatus(property.id, e.target.value as any)}
                        disabled={updating === property.id}
                        className={`text-sm border rounded-md px-2 py-1 ${updating === property.id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <option value="sale">For Sale</option>
                        <option value="rent">For Rent</option>
                        <option value="sold">Sold</option>
                        <option value="rented">Rented</option>
                      </select>
                      {property.published && (
                        <p className="text-xs text-green-600 mt-1">✓ Published on site</p>
                      )}
                    </td>

                    {/* Published Status */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex text-xs font-medium px-2 py-1 rounded-full ${property.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {property.published ? 'PUBLISHED' : 'DRAFT'}
                      </span>
                      {property.featured && (
                        <span className="inline-flex text-xs font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-800 ml-1">
                          FEATURED
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-2">
                        {!property.published ? (
                          <button
                            onClick={() => updatePropertyStatus(property.id, true)}
                            disabled={updating === property.id}
                            className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                          >
                            {updating === property.id ? 'Processing...' : 'Publish'}
                          </button>
                        ) : (
                          <button
                            onClick={() => updatePropertyStatus(property.id, false)}
                            disabled={updating === property.id}
                            className="text-sm px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
                          >
                            {updating === property.id ? 'Processing...' : 'Unpublish'}
                          </button>
                        )}
                        <button
                          onClick={() => toggleFeatured(property.id, !property.featured)}
                          disabled={updating === property.id}
                          className="text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 disabled:opacity-50"
                        >
                          {property.featured ? 'Unfeature' : 'Feature'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination/Info */}
        <div className="px-6 py-4 border-t flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Showing {filteredProperties.length} of {properties.length} properties
          </p>
          <div className="text-sm text-gray-500">
            Auto-refreshes every 60 seconds
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="mt-8 bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Bulk Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={async () => {
              const unpublished = properties.filter(p => !p.published)
              if (unpublished.length === 0) {
                alert('No unpublished properties')
                return
              }
              if (confirm(`Publish all ${unpublished.length} unpublished properties?`)) {
                for (const prop of unpublished) {
                  await fetch('/api/admin/agent-properties', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: prop.id, published: true, updated_at: new Date().toISOString() }),
                  })
                }
                fetchAgentProperties()
              }
            }}
            className="px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100"
          >
            Publish All Unpublished ({stats.unpublished})
          </button>
          <button
            onClick={async () => {
              const published = properties.filter(p => p.published)
              if (published.length === 0) {
                alert('No published properties to unpublish')
                return
              }
              if (confirm(`Unpublish all ${published.length} published properties?`)) {
                for (const prop of published) {
                  await fetch('/api/admin/agent-properties', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: prop.id, published: false, updated_at: new Date().toISOString() }),
                  })
                }
                fetchAgentProperties()
              }
            }}
            className="px-4 py-3 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100"
          >
            Unpublish All ({stats.published})
          </button>
          <button
            onClick={() => fetchAgentProperties()}
            className="px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100"
          >
            🔄 Refresh All
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Status Legend:</h4>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Published</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Draft (Unpublished)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Featured</span>
          </div>
        </div>
      </div>
    </div>
  )
}