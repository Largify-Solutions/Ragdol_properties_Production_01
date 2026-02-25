'use client'

import { useState, useEffect } from 'react'
import Properties from '@/components/admin/Properties'
import { supabase } from '@/lib/supabase-browser'

export default function PropertiesPage() {
  const [properties, setProperties] = useState<any[]>([])
  const [agents, setAgents] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    // Fetch agents and categories directly from Supabase — no API route overhead
    Promise.all([
      supabase.from('agents').select('id, user_id, approved, profiles!agents_user_id_fkey(full_name)').eq('approved', true).order('created_at', { ascending: false }),
      supabase.from('categories').select('id, name, slug').order('name'),
    ]).then(([agentsRes, categoriesRes]) => {
      if (!agentsRes.error) {
        setAgents((agentsRes.data || []).map((a: any) => ({
          ...a,
          full_name: a.profiles?.full_name || 'Agent',
        })))
      }
      if (!categoriesRes.error) setCategories(categoriesRes.data || [])
    })
  }, [])

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-foreground">Properties</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Manage all property listings</p>
      </div>
      <Properties
        activeTab="properties"
        properties={properties}
        setProperties={setProperties}
        agents={agents}
        categories={categories}
      />
    </div>
  )
}
