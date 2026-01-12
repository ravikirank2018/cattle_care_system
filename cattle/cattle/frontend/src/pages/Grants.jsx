import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function Grants() {
  const [grants, setGrants] = useState([])
  const [form, setForm] = useState({ name: '', amount: '', description: '' })

  useEffect(() => { api.get('/grants').then(res => setGrants(res.data)).catch(() => {}) }, [])

  const create = async (e) => {
    e.preventDefault()
    const res = await api.post('/grants', form)
    setGrants([...grants, res.data])
    setForm({ name: '', amount: '', description: '' })
  }

  return (
    <div>
      <header className="service-hero small">
        <div className="service-hero-inner">
          <h1>Government Grants</h1>
          <p>Find available grants and subsidies for vaccination, feed, and farm improvements to support smallholders.</p>
          <a className="btn-voice" href="#grants">Find Grants</a>
        </div>
      </header>

      <main className="container" id="grants">
        <section style={{ marginTop: 24 }}>
          <h2>Grants</h2>
          <form onSubmit={create}>
            <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input placeholder="Amount" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
            <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            <button type="submit">Add Grant</button>
          </form>

          <ul style={{ marginTop: 18 }}>
            {grants.map(g => <li key={g._id}>{g.name} (${g.amount}) - {g.description}</li>)}
          </ul>
        </section>
      </main>
    </div>
  )
}
