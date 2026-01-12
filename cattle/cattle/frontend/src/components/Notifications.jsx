import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Notifications({ unread = 0 }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [])

  function capitalizeFirst(s) {
    if (!s || typeof s !== 'string') return s
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  // Placeholder items - in a real app these would come from an API
  const items = [
    { id: 1, text: 'new advisory for herd health', href: '/advisory' },
    { id: 2, text: 'grant application deadline approaching', href: '/grants' },
    { id: 3, text: 'trade request received', href: '/trade' },
  ]

  return (
    <div className="notif-wrap" ref={ref}>
      <button
        className="notif-button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-label={open ? 'Close notifications' : 'Open notifications'}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {unread > 0 && <span className="notif-badge">{unread}</span>}
      </button>

      {open && (
        <div className="notif-menu" role="menu">
          <div className="notif-title" style={{ padding: 8, fontWeight: 700, color: '#fff' }}>Notifications</div>
          <div style={{ maxHeight: 200, overflow: 'auto' }}>
            {items.map(i => (
              <Link key={i.id} to={i.href} className="notif-item" onClick={() => setOpen(false)}>
                {capitalizeFirst(i.text)}
              </Link>
            ))}
          </div>
          <hr />
          <Link to="/alerts" className="notif-view-all" onClick={() => setOpen(false)}>View All Alerts</Link>
        </div>
      )}
    </div>
  )
}
