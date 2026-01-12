import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function Advisory() {
  const [advisories, setAdvisories] = useState([])
  const [form, setForm] = useState({ title: '', body: '' })

  useEffect(() => { api.get('/advisory').then(res => setAdvisories(res.data)).catch(() => {}) }, [])

  const create = async (e) => {
    e.preventDefault()
    const res = await api.post('/advisory', form)
    setAdvisories([...advisories, res.data])
    setForm({ title: '', body: '' })
  }

  return (
    <div>
      <header className="service-hero small">
        <div className="service-hero-inner">
          <h1>Personalized Advisory</h1>
          <p>Get feeding, breeding, and vaccination advice in your local language.</p>
          <a className="btn-voice" href="#advisories">View Advisory</a>
        </div>
      </header>

      <main className="container" id="advisories">
        <section style={{ marginTop: 24 }}>
          <h2>Advisory</h2>
          <form onSubmit={create}>
            <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            <input placeholder="Body" value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} />
            <button type="submit">Add Advisory</button>
          </form>

          <ul style={{ marginTop: 18 }}>
            {advisories.map(a => <li key={a._id}><strong>{a.title}</strong>: {a.body}</li>)}
          </ul>
        </section>
      </main>
    </div>
  )
}
