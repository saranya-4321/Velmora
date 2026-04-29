import { createContext, useContext, useMemo, useState } from 'react'
import { adminLogin, sendEmailOtp, verifyEmailOtp } from '../lib/backend.js'

const AuthContext = createContext(null)
const STORAGE_KEY = 'velmora.auth.v1'

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { isAuthenticated: false, email: '', role: 'guest', adminToken: '' }
    const parsed = JSON.parse(raw)
    return {
      isAuthenticated: Boolean(parsed?.isAuthenticated),
      email: String(parsed?.email || ''),
      role: parsed?.role === 'admin' ? 'admin' : 'user',
      adminToken: String(parsed?.adminToken || ''),
    }
  } catch {
    return { isAuthenticated: false, email: '', role: 'guest', adminToken: '' }
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(readStored)

  const setAndStore = (next) => {
    setAuth(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  const logout = () => setAndStore({ isAuthenticated: false, email: '', role: 'guest', adminToken: '' })

  const requestEmailCode = async (email) => {
    const normalizedEmail = email.trim().toLowerCase()
    if (!/\S+@\S+\.\S+/.test(normalizedEmail)) {
      throw new Error('Please enter a valid email ID')
    }
    return sendEmailOtp(normalizedEmail)
  }

  const login = async ({ email, code }) => {
    const normalizedEmail = email.trim().toLowerCase()
    if (!/\S+@\S+\.\S+/.test(normalizedEmail)) {
      throw new Error('Please enter a valid email ID')
    }
    if (!code) throw new Error('Please enter OTP code')
    const verified = await verifyEmailOtp({ email: normalizedEmail, code: String(code).trim() })
    if (!verified?.ok) throw new Error('OTP verification failed')
    setAndStore({ isAuthenticated: true, email: normalizedEmail, role: 'user', adminToken: '' })
  }

  const loginAdmin = async ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase()
    if (!/\S+@\S+\.\S+/.test(normalizedEmail)) {
      throw new Error('Please enter a valid admin email ID')
    }
    if (!password?.trim()) throw new Error('Please enter admin password')

    const session = await adminLogin({ email: normalizedEmail, password })
    if (!session?.ok) throw new Error('Admin login failed')

    setAndStore({
      isAuthenticated: true,
      email: normalizedEmail,
      role: 'admin',
      adminToken: String(session.adminToken || ''),
    })
  }

  const value = useMemo(
    () => ({
      ...auth,
      login,
      loginAdmin,
      logout,
      requestEmailCode,
    }),
    [auth],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
