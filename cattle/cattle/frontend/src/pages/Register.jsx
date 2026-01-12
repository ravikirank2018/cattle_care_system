import React, { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import api from '../services/api'
import { setAuth } from '../services/auth'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  function validatePassword(pwd) {
    if (typeof pwd !== 'string') return 'Invalid password'
    if (pwd.length < 8) return 'Password must be at least 8 characters'
    if (!/[a-z]/.test(pwd)) return 'Password must include a lowercase letter'
    if (!/[A-Z]/.test(pwd)) return 'Password must include an uppercase letter'
    if (!/[0-9]/.test(pwd)) return 'Password must include a number'
    if (!/[!@#\$%\^&\*\(\)_\+=\-\[\]\{\};:'"\\|,.<>\/?`~]/.test(pwd)) return 'Password must include a special character'
    if (/\s/.test(pwd)) return 'Password must not contain spaces'
    return null
  }

  function getPasswordChecks(pwd) {
    const s = typeof pwd === 'string' ? pwd : ''
    return {
      length: s.length >= 8,
      lower: /[a-z]/.test(s),
      upper: /[A-Z]/.test(s),
      number: /[0-9]/.test(s),
      special: /[!@#\$%\^&\*\(\)_\+=\-\[\]\{\};:'"\\|,.<>\/?`~]/.test(s),
      noSpace: !/\s/.test(s),
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!name || !email || !password) return setError('Please fill out all fields')
    const pwdErr = validatePassword(password)
    if (pwdErr) return setError(pwdErr)
    if (password !== confirm) return setError('Passwords do not match')
    setLoading(true)
    try {
      const res = await api.post('/auth/register', { name, email, password })
      const token = res?.data?.token
      if (token) setAuth({ token, user: res?.data?.user || { name, email } })
      // Redirect to services or dashboard (prefer the original destination if present)
      const dest = (location?.state && location.state.from && (location.state.from.pathname || location.state.from)) || '/services'
      navigate(dest, { replace: true })
    } catch (err) {
      // Simulate success when backend not available
      if (err?.response?.status === 404 || err?.code === 'ERR_NETWORK') {
        setAuth({ token: 'dev-token', user: { name, email } })
        navigate('/services')
      } else {
        setError(err?.response?.data?.message || 'Registration failed')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container" style={{ maxWidth: 640 }}>
      <header className="service-hero small">
        <div className="service-hero-inner">
          <h1>Create an account</h1>
          <p>Sign up to access personalized recommendations and your cattle dashboard.</p>
        </div>
      </header>

      <main style={{ marginTop: 22 }}>
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="form-error">{error}</div>}

          <label>
            Full name
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
          </label>

          <label>
            Email
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@farm.co" />
          </label>

          <label>
            Password
            <div className="pw-input-row">
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 8 characters, upper/lower, number, symbol" aria-describedby="pw-desc" />
              <button type="button" className="pw-toggle" onClick={() => setShowPassword(v => !v)} aria-pressed={showPassword} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M10.58 10.58A3 3 0 0 0 13.42 13.42" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                )}
              </button>
            </div>
            <small id="pw-desc" className="muted" style={{ display: 'block', marginTop: 6 }}>Must include 8+ chars, upper and lower case, a number, and a special character.</small>

            {/* Live rule checklist */}
            {(() => {
              const checks = getPasswordChecks(password)
              return (
                <ul className="pw-checklist" aria-live="polite" style={{ marginTop: 8 }}>
                  <li className={`pw-check ${checks.length ? 'ok' : 'fail'}`}>{checks.length ? '✅' : '❌'} At least 8 characters</li>
                  <li className={`pw-check ${checks.lower ? 'ok' : 'fail'}`}>{checks.lower ? '✅' : '❌'} Lowercase letter</li>
                  <li className={`pw-check ${checks.upper ? 'ok' : 'fail'}`}>{checks.upper ? '✅' : '❌'} Uppercase letter</li>
                  <li className={`pw-check ${checks.number ? 'ok' : 'fail'}`}>{checks.number ? '✅' : '❌'} Number</li>
                  <li className={`pw-check ${checks.special ? 'ok' : 'fail'}`}>{checks.special ? '✅' : '❌'} Special character</li>
                  <li className={`pw-check ${checks.noSpace ? 'ok' : 'fail'}`}>{checks.noSpace ? '✅' : '❌'} No spaces</li>
                </ul>
              )
            })()}
          </label>

          <label>
            Confirm Password
            <div className="pw-input-row">
              <input type={showConfirm ? 'text' : 'password'} value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat password" />
              <button type="button" className="pw-toggle" onClick={() => setShowConfirm(v => !v)} aria-pressed={showConfirm} aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}>
                {showConfirm ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M10.58 10.58A3 3 0 0 0 13.42 13.42" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                )}
              </button>
            </div>
          </label>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button className="btn-voice" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
            <Link to="/login" style={{ marginLeft: 8 }}>Have an account? Login</Link>
          </div>
        </form>
      </main>
    </div>
  )
}