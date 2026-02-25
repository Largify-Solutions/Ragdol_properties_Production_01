'use client'

import { useEffect, useRef, useCallback } from 'react'
import { supabase } from '@/lib/supabase-browser'
import type { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js'

type ChangeEvent = 'INSERT' | 'UPDATE' | 'DELETE' | '*'

interface RealtimeOptions {
  /** Table name to subscribe to */
  table: string
  /** Schema (defaults to 'public') */
  schema?: string
  /** Event types to listen for */
  event?: ChangeEvent
  /** Optional filter (e.g. 'agent_id=eq.abc-123') */
  filter?: string
  /** Callback when data changes */
  onInsert?: (payload: RealtimePostgresChangesPayload<any>) => void
  onUpdate?: (payload: RealtimePostgresChangesPayload<any>) => void
  onDelete?: (payload: RealtimePostgresChangesPayload<any>) => void
  onChange?: (payload: RealtimePostgresChangesPayload<any>) => void
  /** Whether the subscription is active (default: true) */
  enabled?: boolean
}

/**
 * Subscribe to Supabase Realtime changes on a table.
 * Automatically manages subscription lifecycle and cleanup.
 *
 * Usage:
 * ```tsx
 * useRealtimeSubscription({
 *   table: 'properties',
 *   filter: 'agent_id=eq.some-uuid',
 *   onInsert: (payload) => setProperties(prev => [payload.new, ...prev]),
 *   onUpdate: (payload) => setProperties(prev =>
 *     prev.map(p => p.id === payload.new.id ? payload.new : p)
 *   ),
 *   onDelete: (payload) => setProperties(prev =>
 *     prev.filter(p => p.id !== payload.old.id)
 *   ),
 * })
 * ```
 */
export function useRealtimeSubscription(options: RealtimeOptions) {
  const {
    table,
    schema = 'public',
    event = '*',
    filter,
    onInsert,
    onUpdate,
    onDelete,
    onChange,
    enabled = true,
  } = options

  // Use refs to avoid re-subscribing when callbacks change
  const callbacksRef = useRef({ onInsert, onUpdate, onDelete, onChange })
  callbacksRef.current = { onInsert, onUpdate, onDelete, onChange }

  const channelRef = useRef<RealtimeChannel | null>(null)

  useEffect(() => {
    if (!enabled) return

    const channelName = `realtime:${schema}:${table}${filter ? `:${filter}` : ''}`

    const channelConfig: any = {
      event,
      schema,
      table,
    }
    if (filter) {
      channelConfig.filter = filter
    }

    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes' as any,
        channelConfig,
        (payload: RealtimePostgresChangesPayload<any>) => {
          const { onInsert, onUpdate, onDelete, onChange } = callbacksRef.current

          // Call generic onChange for any event
          onChange?.(payload)

          // Call specific event handler
          switch (payload.eventType) {
            case 'INSERT':
              onInsert?.(payload)
              break
            case 'UPDATE':
              onUpdate?.(payload)
              break
            case 'DELETE':
              onDelete?.(payload)
              break
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log(`✅ Realtime subscribed: ${table}${filter ? ` (${filter})` : ''}`)
        } else if (status === 'CHANNEL_ERROR') {
          console.warn(`⚠️ Realtime error on ${table}:`, status)
        }
      })

    channelRef.current = channel

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current)
        channelRef.current = null
      }
    }
  }, [table, schema, event, filter, enabled])

  // Manual unsubscribe
  const unsubscribe = useCallback(() => {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current)
      channelRef.current = null
    }
  }, [])

  return { unsubscribe }
}

/**
 * Subscribe to multiple tables at once.
 * Returns an unsubscribe function for all channels.
 */
export function useRealtimeMulti(subscriptions: RealtimeOptions[]) {
  const channelsRef = useRef<RealtimeChannel[]>([])

  useEffect(() => {
    const channels: RealtimeChannel[] = []

    subscriptions.forEach((sub) => {
      if (sub.enabled === false) return

      const { table, schema = 'public', event = '*', filter, onInsert, onUpdate, onDelete, onChange } = sub
      const channelName = `realtime:${schema}:${table}${filter ? `:${filter}` : ''}:${Date.now()}`

      const channelConfig: any = { event, schema, table }
      if (filter) channelConfig.filter = filter

      const channel = supabase
        .channel(channelName)
        .on(
          'postgres_changes' as any,
          channelConfig,
          (payload: RealtimePostgresChangesPayload<any>) => {
            onChange?.(payload)
            switch (payload.eventType) {
              case 'INSERT': onInsert?.(payload); break
              case 'UPDATE': onUpdate?.(payload); break
              case 'DELETE': onDelete?.(payload); break
            }
          }
        )
        .subscribe()

      channels.push(channel)
    })

    channelsRef.current = channels

    return () => {
      channels.forEach((ch) => supabase.removeChannel(ch))
      channelsRef.current = []
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(subscriptions.map(s => `${s.table}:${s.filter}:${s.enabled}`))])

  const unsubscribeAll = useCallback(() => {
    channelsRef.current.forEach((ch) => supabase.removeChannel(ch))
    channelsRef.current = []
  }, [])

  return { unsubscribeAll }
}
