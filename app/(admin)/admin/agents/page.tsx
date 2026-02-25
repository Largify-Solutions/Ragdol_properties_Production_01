'use client'

import Agents from '@/components/admin/Agents'

export default function AgentManagementPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold">Agents</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Manage all registered agents</p>
      </div>
      <Agents />
    </div>
  )
}

