import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function ProfileIcon({ user, onSignOut }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [])

  const name = user?.name || user?.email || 'User'
  const initials = (name.split(' ').map(s => s[0]).slice(0, 2).join('') || 'U').toUpperCase()

  return (
    <div className="profile-wrap" ref={ref}>
      <button
        className="profile-icon"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-label={open ? 'Close profile menu' : 'Open profile menu'}
      >
        {initials}
      </button>

      {open && (
        <div className="profile-menu" role="menu">
          <div className="profile-info">
            <div className="profile-name">{user?.name || user?.email}</div>
            <div className="profile-email">{user?.email}</div>
          </div>

          <hr />

          <Link to="/settings" className="profile-menu-item" role="menuitem" onClick={() => setOpen(false)}>Settings</Link>
          <Link to="/dashboard" className="profile-menu-item" role="menuitem" onClick={() => setOpen(false)}>Dashboard</Link>
          <button className="profile-menu-item" role="menuitem" onClick={() => { setOpen(false); onSignOut && onSignOut() }}>Sign out</button>
        </div>
      )}
    </div>
  )
}
