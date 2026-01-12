import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import api from '../services/api'

export default function Dashboard() {
  const [metrics, setMetrics] = useState([])

  useEffect(() => {
    api.get('/health/metrics').then(res => setMetrics(res.data)).catch(() => {})
  }, [])

  const data = metrics.slice(-12).map(m => ({ name: m.timestamp, temp: m.temperature }))

  return (
    <div>
      <h2>Dashboard</h2>
      <section>
        <h3>Recent Temperatures</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line dataKey="temp" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  )
}
