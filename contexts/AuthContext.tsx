'use client'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react'
import { supabase } from '@/lib/supabase-browser'
import type { User, Session } from '@supabase/supabase-js'

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type UserType = {
  id: string
  uid?: string
  email: string
  displayName?: string | null
}

type ProfileType = {
  id: string
  email: string
  full_name?: string
  phone?: string
  avatar_url?: string
  role: 'customer' | 'agent' | 'admin'
  user_type?: string
  status?: string
  location?: string
  bio?: string
  preferences?: any
  created_at?: any
  updated_at?: any
}

type AuthContextType = {
  user: UserType | null
  profile: ProfileType | null
  loading: boolean
  signUp: (
    email: string,
    password: string,
    userData?: Partial<ProfileType>,
  ) => Promise<any>
  signIn: (email: string, password: string, role?: string) => Promise<any>
  signInAsAgent: (email: string, password: string) => Promise<any>
  signInAsAdmin: (email: string, password: string) => Promise<any>
  refreshProfile: () => Promise<void>
  logout: () => Promise<void>
  signOut: () => Promise<void>
}
/* -------------------------------------------------------------------------- */

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

/* -------------------------------------------------------------------------- */
/*                              AUTH PROVIDER                                 */
/* -------------------------------------------------------------------------- */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null)
  const [profile, setProfile] = useState<ProfileType | null>(null)
  const [loading, setLoading] = useState(true)

  /* ---------------------------------------------------------------------- */
  /*                    FETCH PROFILE FROM SUPABASE                          */
  /* ---------------------------------------------------------------------- */

  const fetchProfile = useCallback(async (supabaseUser: User) => {
    try {
      const timeout = new Promise<null>((resolve) =>
        setTimeout(() => resolve(null), 8000)
      )
      const query = supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.error('Error fetching profile:', error)
            return null
          }
          return { ...data, email: supabaseUser.email || '' } as ProfileType
        })

      return await Promise.race([query, timeout])
    } catch (error) {
      console.error('Error fetching profile:', error)
      return null
    }
  }, [])

  /* ---------------------------------------------------------------------- */
  /*                    SUPABASE SESSION LISTENER                            */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    let mounted = true

    // onAuthStateChange fires INITIAL_SESSION immediately from the local
    // cache — no network round-trip, so there's nothing that can time out.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return

        if (event === 'INITIAL_SESSION') {
          if (session?.user) {
            const userData: UserType = {
              id: session.user.id,
              uid: session.user.id,
              email: session.user.email!,
              displayName: session.user.user_metadata?.full_name || null,
            }
            setUser(userData)
            // Await profile before clearing the loading flag so that
            // role-gated layouts (admin/agent/customer) always have the
            // profile available when they first evaluate auth state.
            // Without this, AdminLayout would see profile=null and redirect
            // every authenticated user to the login page on page refresh.
            const profileData = await fetchProfile(session.user)
            if (!mounted) return
            setProfile(profileData)
            setLoading(false)
          } else {
            setUser(null)
            setProfile(null)
            setLoading(false)
          }
          return
        }

        if (event === 'SIGNED_IN' && session?.user) {
          const userData: UserType = {
            id: session.user.id,
            uid: session.user.id,
            email: session.user.email!,
            displayName: session.user.user_metadata?.full_name || null,
          }
          setUser(userData)

          const profileData = await fetchProfile(session.user)
          if (profileData) {
            setProfile(profileData)
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
          setProfile(null)
        } else if (event === 'TOKEN_REFRESHED' && session?.user) {
          const profileData = await fetchProfile(session.user)
          if (profileData) {
            setProfile(profileData)
          }
        } else if (event === 'USER_UPDATED' && session?.user) {
          const profileData = await fetchProfile(session.user)
          if (profileData) setProfile(profileData)
        } else if ((event as string) === 'TOKEN_REFRESH_FAILED' || (event as string) === 'TOKEN_REFRESH_FAILURE') {
          // Refresh token rejected by Supabase — clear everything and let the
          // middleware redirect the user back to the login page on next navigation.
          console.warn('Auth: token refresh failed — signing out')
          await supabase.auth.signOut()
          setUser(null)
          setProfile(null)
        }

        setLoading(false)
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [fetchProfile])

  /* ---------------------------------------------------------------------- */
  /*                               SIGN UP                                   */
  /* ---------------------------------------------------------------------- */

  const signUp = async (
    email: string,
    password: string,
    userData?: Partial<ProfileType>
  ) => {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData?.full_name || '',
            role: userData?.role || 'customer',
            phone: userData?.phone || '',
          },
        },
      })

      if (error) {
        return { error: { message: error.message } }
      }

      // Profile is auto-created via database trigger
      // Update additional fields if provided
      if (data.user && userData) {
        await supabase.from('profiles').update({
          phone: userData.phone || null,
          avatar_url: userData.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
          location: userData.location || null,
          bio: userData.bio || null,
        }).eq('id', data.user.id)
      }

      return { error: null }
    } catch (error: any) {
      return { error: { message: error.message } }
    } finally {
      setLoading(false)
    }
  }

  /* ---------------------------------------------------------------------- */
  /*                         SIGN IN (GENERIC)                               */
  /* ---------------------------------------------------------------------- */

  const signIn = async (email: string, password: string, role?: string) => {
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return {
          error: {
            message: error.message === 'Invalid login credentials'
              ? 'Invalid email or password'
              : error.message,
          },
        }
      }

      // Check role if specified
      if (role && data.user) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single()

        if (profileError || !profileData) {
          await supabase.auth.signOut()
          return { error: { message: 'Profile not found' } }
        }

        if (profileData.role !== role) {
          await supabase.auth.signOut()
          return {
            error: {
              message: `Access denied. ${role.charAt(0).toUpperCase() + role.slice(1)} only.`,
            },
          }
        }
      }

      return { error: null }
    } catch (error: any) {
      return { error: { message: error.message || 'Login failed' } }
    } finally {
      setLoading(false)
    }
  }

  /* ---------------------------------------------------------------------- */
  /*                              SIGN IN (AGENT)                            */
  /* ---------------------------------------------------------------------- */

  const signInAsAgent = async (email: string, password: string) => {
    return await signIn(email, password, 'agent')
  }

  /* ---------------------------------------------------------------------- */
  /*                              SIGN IN (ADMIN)                            */
  /* ---------------------------------------------------------------------- */

  const signInAsAdmin = async (email: string, password: string) => {
    return await signIn(email, password, 'admin')
  }

  /* ---------------------------------------------------------------------- */
  /*                              REFRESH PROFILE                            */
  /* ---------------------------------------------------------------------- */

  const refreshProfile = async () => {
    const { data: { user: currentUser } } = await supabase.auth.getUser()
    if (!currentUser) return

    const profileData = await fetchProfile(currentUser)
    if (profileData) {
      setUser({
        id: currentUser.id,
        uid: currentUser.id,
        email: currentUser.email!,
        displayName: currentUser.user_metadata?.full_name || profileData.full_name || null,
      })
      setProfile(profileData)
    }
  }

  /* ---------------------------------------------------------------------- */
  /*                                  LOGOUT                                 */
  /* ---------------------------------------------------------------------- */

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  /* ---------------------------------------------------------------------- */

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signUp,
        signIn,
        signInAsAgent,
        signInAsAdmin,
        refreshProfile,
        logout,
        signOut: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}