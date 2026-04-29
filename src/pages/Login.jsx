import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, loginAdmin, requestEmailCode } = useAuth()

  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [sending, setSending] = useState(false)
  const [loggingIn, setLoggingIn] = useState(false)
  const [mode, setMode] = useState(new URLSearchParams(location.search).get('mode') === 'admin' ? 'admin' : 'user')

  const redirectTo = location.state?.from || '/shop'

  const sendCode = async () => {
    if (!/\S+@\S+\.\S+/.test(email.trim().toLowerCase())) {
      return toast.error('Enter valid email first')
    }
    setSending(true)
    try {
      await requestEmailCode(email)
      toast.success('OTP sent to your email')
    } catch (error) {
      toast.error(error?.message || 'Failed to send OTP')
    } finally {
      setSending(false)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoggingIn(true)
    try {
      if (mode === 'admin') {
        await loginAdmin({ email, password })
        toast.success('Admin login successful')
      } else {
        await login({ email, code })
        toast.success('Login successful')
      }
      navigate(redirectTo, { replace: true })
    } catch (error) {
      toast.error(error?.message || 'Login failed')
    } finally {
      setLoggingIn(false)
    }
  }

  return (
    <div className="container-page py-12">
      <div className="max-w-lg mx-auto card p-8">
        <div className="flex gap-2 rounded-2xl bg-white/50 p-1 ring-1 ring-forest/10">
          <button
            type="button"
            className={[
              'flex-1 rounded-2xl px-4 py-2 text-sm font-semibold transition-colors',
              mode === 'user' ? 'bg-forest text-cream' : 'text-charcoal/70 hover:bg-forest/5',
            ].join(' ')}
            onClick={() => setMode('user')}
          >
            User Login
          </button>
          <button
            type="button"
            className={[
              'flex-1 rounded-2xl px-4 py-2 text-sm font-semibold transition-colors',
              mode === 'admin' ? 'bg-forest text-cream' : 'text-charcoal/70 hover:bg-forest/5',
            ].join(' ')}
            onClick={() => setMode('admin')}
          >
            Admin Login
          </button>
        </div>

        <h1 className="mt-6 font-heading text-3xl">
          {mode === 'admin' ? 'Admin Sign In' : 'Login to Continue'}
        </h1>
        <p className="mt-2 text-sm text-charcoal/70">
          {mode === 'admin'
            ? 'Use your admin email and password to open the admin dashboard at /admin.'
            : 'Verify your email ID first. You must login before using cart and checkout.'}
        </p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label htmlFor="login-email" className="text-sm font-semibold">
              {mode === 'admin' ? 'Admin Email ID' : 'Email ID'}
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 h-11 w-full rounded-2xl bg-white/60 ring-1 ring-forest/10 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/70"
              required
            />
          </div>
          {mode === 'user' ? (
            <>
              <button type="button" className="btn-outline w-full" onClick={sendCode} disabled={sending}>
                {sending ? 'Sending OTP...' : 'Verify Email ID (Send OTP)'}
              </button>
              <div>
                <label htmlFor="login-code" className="text-sm font-semibold">
                  Verification Code
                </label>
                <input
                  id="login-code"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="mt-2 h-11 w-full rounded-2xl bg-white/60 ring-1 ring-forest/10 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/70"
                  required
                />
              </div>
            </>
          ) : (
            <div>
              <label htmlFor="admin-password" className="text-sm font-semibold">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 h-11 w-full rounded-2xl bg-white/60 ring-1 ring-forest/10 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/70"
                required
              />
            </div>
          )}
          <button type="submit" className="btn-primary w-full" disabled={loggingIn}>
            {loggingIn ? 'Please wait...' : mode === 'admin' ? 'Login as Admin' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-xs text-charcoal/70">
          Want to continue browsing? <Link to="/shop" className="text-forest font-semibold">Go to shop</Link>
        </p>
      </div>
    </div>
  )
}
