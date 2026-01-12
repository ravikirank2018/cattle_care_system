import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { setAuth, getUser, clearAuth } from '../services/auth'

export default function Settings() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('')
  const [phone, setPhone] = useState('')

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('')

  const [preferences, setPreferences] = useState({ notificationsEmail: true, pushNotifications: true, profileVisibility: 'public' })
  const [language, setLanguage] = useState('en')
  const [theme, setTheme] = useState('system')

  useEffect(() => {
    let mounted = true
    async function load() {
      try {
        const res = await api.get('/users/me')
        const u = res.data
        if (!mounted) return
        setName(u.name || '')
        setEmail(u.email || '')
        setProfilePhotoUrl(u.profilePhotoUrl || '')
        setPhone(u.phone || '')
        setPreferences(Object.assign({ notificationsEmail: true, pushNotifications: true, profileVisibility: 'public' }, u.preferences || {}))
        setLanguage(u.language || 'en')
        setTheme(u.theme || 'system')
      } catch (err) {
        console.error('Failed to load profile', err)
        setError(err?.response?.data?.message || 'Failed to load profile')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  function showToast(message) {
    window.dispatchEvent(new CustomEvent('showToast', { detail: { message } }))
  }

  async function handleSave(e) {
    e.preventDefault()
    setError('')
    if (newPassword && newPassword !== newPasswordConfirm) return setError('New passwords do not match')

    setSaving(true)
    try {
      // Email is not editable here, omit it from the update payload
      const body = { name, profilePhotoUrl, phone, preferences, language, theme }
      if (newPassword) {
        body.currentPassword = currentPassword
        body.newPassword = newPassword
      }
      const res = await api.put('/users/me', body)
      showToast('Profile updated')
      // update local auth user copy
      setAuth({ user: res.data })
      window.dispatchEvent(new Event('authChanged'))
    } catch (err) {
      console.error('Save profile error', err)
      setError(err?.response?.data?.message || 'Failed to save profile')
      showToast(err?.response?.data?.message || 'Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  async function handleLogoutAll() {
    try {
      await api.post('/users/me/logoutAll')
      showToast('Logged out from all devices')
      // Also sign out locally
      clearAuth()
      window.dispatchEvent(new Event('authChanged'))
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to logout from all devices')
      showToast('Failed to logout from all devices')
    }
  }

  async function handleLink(provider) {
    // Placeholder: simulate linking via providerId prompt
    const providerId = window.prompt(`Enter ${provider} id to link (demo)`)
    if (!providerId) return
    try {
      const res = await api.post(`/users/me/link/${provider}`, { providerId })
      showToast(`${provider} linked`)
      window.dispatchEvent(new Event('authChanged'))
    } catch (err) {
      showToast(`Failed to link ${provider}`)
    }
  }

  async function handleUnlink(provider) {
    try {
      const res = await api.post(`/users/me/unlink/${provider}`)
      showToast(`${provider} unlinked`)
      window.dispatchEvent(new Event('authChanged'))
    } catch (err) {
      showToast(`Failed to unlink ${provider}`)
    }
  }

  if (loading) return <div className="container">Loading...</div>

  return (
    <div className="container" style={{ maxWidth: 920 }}>
      <header className="service-hero small">
        <div className="service-hero-inner">
          <h1>Settings</h1>
          <p>Manage your account settings and preferences.</p>
        </div>
      </header>

      <main className="settings-main" style={{ marginTop: 22 }}>
        <form className="card" style={{ padding: 20 }} onSubmit={handleSave}>
          <h3>Account</h3>
          {error && <div className="form-error">{error}</div>}

          <label>
            Profile photo URL
            <input value={profilePhotoUrl} onChange={e => setProfilePhotoUrl(e.target.value)} placeholder="https://..." />
          </label>

          <label>
            Full name
            <input value={name} onChange={e => setName(e.target.value)} />
          </label>

          <label>
            Email
            <input type="email" value={email} readOnly className="muted-input" aria-readonly="true" />
            <small className="muted">Email cannot be changed here. Contact support to update your email.</small>
          </label>

          <label>
            Phone number
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1-555-555-5555" />
          </label>

          <fieldset style={{ marginTop: 12 }}>
            <legend>Change password</legend>
            <label>
              Current password
              <input type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
            </label>
            <label>
              New password
              <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            </label>
            <label>
              Confirm new password
              <input type="password" value={newPasswordConfirm} onChange={e => setNewPasswordConfirm(e.target.value)} />
            </label>
          </fieldset>

          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <button className="btn-voice" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save changes'}</button>
            <button type="button" className="btn-voice" onClick={handleLogoutAll}>Logout all devices</button>
          </div>
        </form>

        <form className="card" style={{ padding: 20, marginTop: 12 }} onSubmit={e => e.preventDefault()}>
          <h3>Preferences</h3>

          <label>
            Email notifications
            <input type="checkbox" checked={preferences.notificationsEmail} onChange={e => setPreferences(p => ({ ...p, notificationsEmail: e.target.checked }))} />
          </label>

          <label>
            Push notifications
            <input type="checkbox" checked={preferences.pushNotifications} onChange={e => setPreferences(p => ({ ...p, pushNotifications: e.target.checked }))} />
          </label>

          <label>
            Profile visibility
            <select value={preferences.profileVisibility} onChange={e => setPreferences(p => ({ ...p, profileVisibility: e.target.value }))}>
              <option value="public">Public</option>
              <option value="contacts">Contacts only</option>
              <option value="private">Private</option>
            </select>
          </label>

          <label>
            Language
            <select value={language} onChange={e => setLanguage(e.target.value)}>
              <option value="en">English</option>
              <option value="es">Spanish</option>
            </select>
          </label>

          <label>
            Theme
            <select value={theme} onChange={e => setTheme(e.target.value)}>
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>

          <div style={{ marginTop: 12 }}>
            <button className="btn-voice" onClick={async () => { setSaving(true); try { await api.put('/users/me', { preferences, language, theme }); showToast('Preferences saved') } catch (err) { showToast('Failed to save preferences') } finally { setSaving(false) } }}>Save preferences</button>
          </div>
        </form>

        <div className="card" style={{ padding: 20, marginTop: 12 }}>
          <h3>Linked accounts</h3>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-voice" onClick={() => handleLink('google')}>Link Google</button>
            <button className="btn-voice" onClick={() => handleLink('github')}>Link GitHub</button>
            <button className="btn-voice" onClick={() => handleUnlink('google')} style={{ marginLeft: 8 }}>Unlink Google</button>
            <button className="btn-voice" onClick={() => handleUnlink('github')}>Unlink GitHub</button>
          </div>
        </div>

        <div className="card" style={{ padding: 20, marginTop: 12 }}>
          <h3>Security</h3>
          <p>Two-Factor Authentication: (coming soon) — toggle will be added.</p>
          <p>Logout from all devices: use the button in the account section.</p>
        </div>
      </main>
    </div>
  )
}
