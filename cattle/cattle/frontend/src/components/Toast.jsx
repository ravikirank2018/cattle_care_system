import React, { useEffect, useState } from 'react'

export default function Toast() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    function onSessionExpired(e) {
      const message = (e && e.detail && e.detail.message) || 'Session expired. Please sign in again.'
      const id = Date.now()
      setToasts(t => [...t, { id, message }])
      // auto-dismiss
      setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4200)
    }

    function onShowToast(e) {
      const message = (e && e.detail && e.detail.message) || 'Notification'
      const id = Date.now()
      setToasts(t => [...t, { id, message }])
      setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4200)
    }

    window.addEventListener('sessionExpired', onSessionExpired)
    window.addEventListener('showToast', onShowToast)
    return () => {
      window.removeEventListener('sessionExpired', onSessionExpired)
      window.removeEventListener('showToast', onShowToast)
    }
  }, [])

  if (toasts.length === 0) return null

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map(t => (
        <div key={t.id} className="toast">
          <div className="toast-message">{t.message}</div>
          <button className="toast-close" onClick={() => setToasts(ts => ts.filter(x => x.id !== t.id))} aria-label="Dismiss">×</button>
        </div>
      ))}
    </div>
  )
}
