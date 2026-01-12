import React, { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import api from '../services/api'
import { setAuth } from '../services/auth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!email || !password) return setError('Please enter email and password')
    setLoading(true)
    try {
      // Try to call backend if available
      const res = await api.post('/auth/login', { email, password })
      const token = res?.data?.token
      if (token) {
        // store token + user and notify app
        setAuth({ token, user: res?.data?.user || { email } })
      }
      // Redirect on success (back to where user intended if available)
      const dest = (location?.state && location.state.from && (location.state.from.pathname || location.state.from)) || '/services'
      navigate(dest, { replace: true })
    } catch (err) {
      // If backend not present, simulate success for local demo
      if (err?.response?.status === 404 || err?.code === 'ERR_NETWORK') {
        // Simulate login for dev
        setAuth({ token: 'dev-token', user: { name: 'Local User', email } })
        const dest = (location?.state && location.state.from && (location.state.from.pathname || location.state.from)) || '/services'
        navigate(dest, { replace: true })
      } else {
        setError(err?.response?.data?.message || 'Login failed')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container" style={{ maxWidth: 520 }}>
      <header className="service-hero small">
        <div className="service-hero-inner">
          <h1>Login</h1>
          <p>Access your dashboard and personalized services.</p>
        </div>
      </header>

      <main style={{ marginTop: 22 }}>
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="form-error">{error}</div>}
          <label>
            Email
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@farm.co" />
          </label>

          <label>
            Password
            <div className="pw-input-row">
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
              <button type="button" className="pw-toggle" onClick={() => setShowPassword(v => !v)} aria-pressed={showPassword} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M10.58 10.58A3 3 0 0 0 13.42 13.42" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                )}
              </button>
            </div>
          </label>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button className="btn-voice" type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}</button>
            <Link to="/register" style={{ marginLeft: 8 }}>Create account</Link>
          </div>
        </form>
      </main>
    </div>
  )
}
