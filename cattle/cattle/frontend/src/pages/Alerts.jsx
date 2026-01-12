import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function Alerts() {
  const [alerts, setAlerts] = useState([])

  useEffect(() => {
    // Try to fetch health metrics and convert to alerts if available
    api.get('/health/metrics').then(res => {
      const m = res.data || []
      const derived = m.slice(0, 10).map(item => ({ id: item._id || item.id, text: `Cow ID ${item.cowId}: Temp ${item.temperature || 'N/A'}` }))
      setAlerts(derived)
    }).catch(() => {
      setAlerts([
        { id: 1, text: 'Cow ID #23: Early fever symptoms detected' },
        { id: 2, text: 'Cow ID #11: Vaccination due tomorrow' },
        { id: 3, text: 'Milk yield dropped for Cow ID #07' }
      ])
    })
  }, [])

  return (
    <div>
      <header className="service-hero small">
        <div className="service-hero-inner">
          <h1>Health Notifications & Alerts</h1>
          <p>Recent alerts and health signals from monitored cattle.</p>
        </div>
      </header>

      <main className="container" style={{ marginTop: 24 }}>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {alerts.map(a => (
            <li key={a.id} style={{ background: '#fff7e6', borderLeft: '6px solid #f2b226', padding: 12, borderRadius: 4, marginBottom: 10 }}>{a.text}</li>
          ))}
        </ul>
      </main>
    </div>
  )
}
